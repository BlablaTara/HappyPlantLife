import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Plant from '../components/plants/Plants.js';
import AddPlant from '../components/plants/AddPlant.js';
import SearchPlant from '../components/plants/SearchPlant.js';


const PlantScreen = () => {
    // const [plants, setPlants] = useState([
    //   {
    //     id: '1',
    //     name: 'Monstera',
    //     image: 'https://images.pexels.com/photos/6555215/pexels-photo-6555215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //   },
    //   {
    //     id: '2',
    //     name: 'Ficus',
    //     image: 'https://images.pexels.com/photos/6843858/pexels-photo-6843858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //   },
    // ]);

    const [plants, setPlants] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    const addPlant = (newPlant) => {
      const added = {
        id: Date.now().toString(),
        name: newPlant.common_name || newPlant.scientific_name,
        image: newPlant.image_url,
      };
      setPlants([...plants, added]);
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
  });
  
  export default PlantScreen;