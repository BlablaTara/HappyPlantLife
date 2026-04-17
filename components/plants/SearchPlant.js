import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabaseConnection";
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
  Alert,
} from "react-native";
import { getPlantStageImage } from "../../utils/plantStageImage.js";

const SearchPlant = ({ visible, onClose, onSelectPlant }) => {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchPlants();
    }
  }, [visible]);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("plants")
        .select("id, name, plant_stages(stage, image)");

      if (error) throw error;

      setPlants(data);
    } catch (error) {
      Alert.alert("Fejl!", "Kunne ikke hente planterne. Prøv igen");
    } finally {
      setLoading(false);
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (plant) => {
    onSelectPlant(plant);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Søg planter..."
          value={query}
          onChangeText={setQuery}
        />

        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <FlatList
            data={filteredPlants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const healthyImage = getPlantStageImage(item, "healthy");

              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  {healthyImage ? (
                    <Image
                      source={{ uri: healthyImage }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.placeholder}>
                      <Text>🌿</Text>
                    </View>
                  )}
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
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
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
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
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  name: { fontSize: 16 },
  close: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 50,
    padding: 8,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchPlant;
