import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Plant from '../components/plants/Plants.js';
import AddPlant from '../components/plants/AddPlant.js';
import SearchPlant from '../components/plants/SearchPlant.js';
import supabase from '../utils/supabaseConnection.js';

const PlantScreen = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      
      // Fetch plants from Supabase
      const { data, error } = await supabase
        .from('plants')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPlants(data);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
      setError('Kunne ikke hente planter fra databasen');
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (newPlant) => {
    try {
      // Add plant to Supabase
      const { data, error } = await supabase
        .from('plants')
        .insert([
          { 
            name: newPlant.name, 
            image: newPlant.image_url 
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Refresh plants list after adding new plant
        fetchPlants();
      }
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Indlæser planter...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Plant name={item.name} image={item.image} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Ingen planter fundet. Tilføj din første plante!</Text>
        }
      />
      <AddPlant onPress={() => setModalVisible(true)} />
      <SearchPlant
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectPlant={addPlant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }
});

export default PlantScreen;