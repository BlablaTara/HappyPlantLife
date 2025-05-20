import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import supabase from '../../utils/supabaseConnection';

const SearchPlant = ({ visible, onClose, onSelectPlant }) => {
  //const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hent alle planter fra Supabase ved åbning
  useEffect(() => {
    if (visible) {
      fetchPlants();
    }
  }, [visible]);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*');

      if (error) throw error;

      console.log("Fetched plants from Supabase:", data);
      setPlants(data);
    } catch (error) {
      console.error('Fejl ved hentning af planter fra Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

//   const filteredPlants = plants.filter((plant) =>
//     plant.name.toLowerCase().includes(query.toLowerCase())
//   );



  const handleSelect = (plant) => {
    onSelectPlant(plant);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Alle planter fra databasen</Text>
        
        {/* <TextInput
          style={styles.input}
          placeholder="Søg planter..."
          value={query}
          onChangeText={setQuery}
        /> */}

        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                  <View style={styles.placeholder}><Text>🌿</Text></View>
                )}
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text style={styles.closeText}>Luk</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  name: { fontSize: 16 },
  close: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchPlant;
