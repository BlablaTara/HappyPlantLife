import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addPlantToUser } from "../../components/plants/AddPlant.js";
import Plants from "../../components/plants/Plants.js";
import AddPlantButton from "../../components/plants/AddPlantButton.js";
import SearchPlant from "../../components/plants/SearchPlant.js";

const PlantScreenUI = ({
  userPlants,
  setSelectedPlant,
  loading,
  loadPlants,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mine Planter</Text>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : userPlants.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Du har endnu ikke valgt nogen planter. Tryk på + for at tilføje en
            af dine planter.
          </Text>
        </View>
      ) : (
        <FlatList
          data={userPlants}
          keyExtractor={(item) => item.plant_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("Plant selected:", item);
                setSelectedPlant(item);
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
          if (success) await loadPlants();
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  listContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    paddingHorizontal: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlantScreenUI;
