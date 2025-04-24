import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import Plant from '../components/Plants.js';

const PlantScreen = () => {
    const [plants, setPlants] = useState([
      {
        id: '1',
        name: 'Monstera',
        image: 'https://images.pexels.com/photos/6555215/pexels-photo-6555215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '2',
        name: 'Ficus',
        image: 'https://images.pexels.com/photos/6843858/pexels-photo-6843858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ]);
  
    const addPlant = () => {
      const newPlant = {
        id: Date.now().toString(),
        name: 'Ny plante',
        image: 'https://example.com/default-plant.jpg',
      };
      setPlants([...plants, newPlant]);
    };
  
    return (
      <View style={styles.screen}>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Plant name={item.name} image={item.image} />
          )}
        />
        <Button title="Tilføj plante" onPress={addPlant} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
    },
  });
  
  export default PlantScreen;