import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from '../utils/supabaseConnection.js';
import AddPlantButton from '../components/plants/AddPlantButton';
import SearchPlant from '../components/plants/SearchPlant.js';
import ShowPlant from '../components/plants/ShowPlant.js';
import { deleteUserPlant } from '../components/plants/DeletePlant.js';
import { fetchUserPlants } from '../components/plants/FetchUserPlants.js';
import { addPlantToUser } from '../components/plants/AddPlant.js';
import Plants from '../components/plants/Plants.js';


const PlantScreen = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [refreshOnClose, setRefreshOnClose] = useState(false);


  const loadPlants = async () => {
    setLoading(true);
    const { data } = await fetchUserPlants();
    if (data) setUserPlants(data);
    console.log("Henter userPlants data fra Supabase:", data);
    setLoading(false);
  };

  useEffect(() => {
    loadPlants();
  }, []);

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
            <TouchableOpacity
              onPress={async () => {
                const {
                  data: { user },
                } = await supabase.auth.getUser();

                const { data, error } = await supabase
                  .from('user_plants')
                  .select('plant_id, last_watered, plants(name, image, water_needs)')
                  .eq('user_id', user.id)
                  .eq('plant_id', item.plant_id)
                  .single();

                if (!error && data) {
                  setSelectedPlant({
                    plant_id: data.plant_id,
                    name: data.plants?.name,
                    image: data.plants?.image,
                    last_watered: data.last_watered,
                    water_needs: data.plants?.water_needs,
                  });
                }
              }}

            >
              <Plants 
                name={item.plants?.name} 
                image={item.plants?.image} 
                lastWatered={item.last_watered}
                waterNeeds={item.plants?.water_needs}
              />
            </TouchableOpacity>
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
          const success = await addPlantToUser(plant.id);
          if (success) {
            await loadPlants();
          } 
          setModalVisible(false);
        }}
      />

      <ShowPlant
        visible={!!selectedPlant}
        plant={selectedPlant}
        onClose={ async() =>{ setSelectedPlant(null);
          if (refreshOnClose) {
            await loadPlants();
            setRefreshOnClose(false);
          }
        }}
        onDelete={async () => {
          const success = await deleteUserPlant(selectedPlant.plant_id);
          if (success) {
            setSelectedPlant(null);
            loadPlants();
          }
        }}
        onWatered={ async () => {
          const now = new Date().toISOString();
          setSelectedPlant(prev => ({
            ...prev,
            last_watered: now
          }));
          setRefreshOnClose(true);

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