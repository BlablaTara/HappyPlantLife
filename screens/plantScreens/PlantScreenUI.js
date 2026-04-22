import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
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

  const positions = [
    { left: 5, top: 65 },
    { left: 100, top: 65 },
    { left: 180, top: 175 },
    { left: 260, top: 200 },

    { left: 30, top: 175 },
    { left: 110, top: 350 },
    { left: 190, top: 350 },
    { left: 270, top: 350 },
    { left: 350, top: 350 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/shelf.png")}
        style={styles.container}
        resizeMode="cover"
      >
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
          <>
            {userPlants.map((item, index) => {
              const pos = positions[index];

              if (!pos) return null;

              return (
                <TouchableOpacity
                  key={item.plant_id}
                  style={[
                    styles.plantPosition,
                    { left: pos.left, top: pos.top }
                  ]}
                  onPress={() => setSelectedPlant(item)}
                >
                  <Plants
                    plant={item}
                    lastWatered={item.last_watered}
                    waterNeeds={item.water_needs}
                  />
                </TouchableOpacity>
              );
            })}
          </>

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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#bfd9d9",
    position: "relative",
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
  plantPosition: {
    position: "absolute",
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
