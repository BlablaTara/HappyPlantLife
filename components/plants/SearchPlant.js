import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';

const SearchPlant = ({ visible, onClose, onSelectPlant }) => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlants = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const token = Constants.expoConfig.extra.PERENUAL_TOKEN;
      const response = await fetch(`https://perenual.com/api/v2/species-list?key=${token}&indoor=1&page=1`);
      
      const contentType = response.headers.get("content-type");
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.warn("Fik ikke JSON - måske forkert URL eller TOKEN?", text);
        return;
      }

      const json = await response.json();

      const filtered = json.data.filter((plant) => 
        plant.common_name &&
        plant.common_name.toLowerCase().includes(query.toLowerCase())
        );

      setPlants(filtered);
    } catch (error) {
      console.log("Fejl ved hentning:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (plant) => {
    onSelectPlant(plant);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Søg efter plante..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchPlants}
          returnKeyType="search"
        />
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                {item.default_image && item.default_image.small_url ? (
                  <Image source={{ uri: item.default_image.small_url }} style={styles.image} />
                ) : (
                  <View style={styles.placeholder}><Text>🌿</Text></View>
                )}
                <Text style={styles.name}>{item.common_name ? item.common_name : item.other_name}</Text>
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
  }
});

export default SearchPlant;
