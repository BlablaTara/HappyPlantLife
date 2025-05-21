import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import supabase from '../utils/supabaseConnection.js';
import AddPlantButton from '../components/plants/AddPlantButton';
import SearchPlant from '../components/plants/SearchPlant.js';
import Plant from '../components/plants/Plants.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlantScreen = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUserPlants();
  }, []);

  const fetchUserPlants = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Bruger ikke logget ind');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('user_plants')
      .select('plant_id, plants(name, image)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fejl ved hentning af brugerens planter:', error);
    } else {
      setUserPlants(data);
    }

    setLoading(false);
  };

  const addPlantToUser = async (plantId) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Bruger ikke logget ind');
      return;
    }

    console.log('Tilføjer plante:', plantId);

    // Tjek for eksisterende plante
    const { data: existing, error: checkError } = await supabase
      .from('user_plants')
      .select('*')
      .eq('user_id', user.id)
      .eq('plant_id', plantId);

    if (checkError) {
      console.error('Fejl ved duplikat-tjek:', checkError.message);
      return;
    }

    if (existing.length > 0) {
      console.log('🌱 Planten er allerede tilføjet');
      return;
    }

    const { error } = await supabase
      .from('user_plants')
      .insert([{ plant_id: plantId, user_id: user.id }]);

    if (error) {
      console.error('Fejl ved tilføjelse af plante:', error.message);
    } else {
      console.log('✅ Plante tilføjet til brugerens samling!');
      fetchUserPlants(); // opdater listen
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mine Planter</Text>

      {userPlants.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Du har endnu ikke valgt nogen planter. Tryk på + for at tilføje en af dine planter.
          </Text>
        </View>
      ) : (
        <FlatList
          data={userPlants}
          keyExtractor={(item) => item.plant_id.toString()}
          renderItem={({ item }) => (
            <Plant name={item.plants?.name} image={item.plants?.image} />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      )}
    
      <AddPlantButton onPress={() => setModalVisible(true)} />
      <SearchPlant
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectPlant={async (plant) => {
          await addPlantToUser(plant.id);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: { 
    flex: 1, 
    paddingHorizontal: 10 
  },

  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginVertical: 20 
  },

  listContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlantScreen;