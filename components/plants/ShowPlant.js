import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { getWaterStatusColor } from "../../utils/waterStatus.js";
import { getPlantStageImage } from "../../utils/getPlantStages.js";
import WaterPlant from "./WaterPlants.js";

const ShowPlant = ({ visible, onClose, plant, onDelete, onWatered }) => {
  const [localPlant, setLocalPlant] = useState(null);
  const overlayColor = getWaterStatusColor(
    localPlant?.last_watered,
    localPlant?.water_needs
  );

  const dropletOpacity = useRef(new Animated.Value(0)).current;
  const dropletY = useRef(new Animated.Value(0)).current;

  const playDropletAnimation = () => {
    dropletOpacity.setValue(0);
    dropletY.setValue(-40);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(dropletOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dropletY, {
          toValue: 20,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(dropletOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setLocalPlant(plant);
  }, [plant]);

  if (!localPlant) return null;

  const healthyImage = getPlantStageImage(localPlant, "healthy");

  const handleWateredUI = () => {
    const now = new Date().toISOString();
    setLocalPlant({ ...localPlant, last_watered: now });
    playDropletAnimation();
    onWatered();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: healthyImage || "" }}
              style={styles.image}
            />
            {overlayColor !== "transparent" && (
              <View
                style={[styles.overlay, { backgroundColor: overlayColor }]}
              />
            )}
            <Animated.Text
              style={[
                styles.droplet,
                {
                  opacity: dropletOpacity,
                  transform: [{ translateY: dropletY }],
                },
              ]}
            >
              💧
            </Animated.Text>
          </View>

          <Text style={styles.name}>{localPlant?.name}</Text>

          <WaterPlant
            plantId={localPlant.plant_id}
            lastWatered={localPlant.last_watered}
            waterNeeds={localPlant?.water_needs}
            onWatered={handleWateredUI}
          />
          
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => {
              Alert.alert(
                "Slet plante",
                `Er du sikker på, at du vil slette ${localPlant.name}?`,
                [
                  { text: "Annullér", style: "cancel" },
                  { text: "Slet", style: "destructive", onPress: onDelete },
                ]
              );
            }}
          >
            <Text style={styles.deleteSymbol}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  imageWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "visible",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  deleteIcon: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 2,
  },
  deleteSymbol: {
    fontSize: 22,
    color: "#8B0000",
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeIconText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  droplet: {
    position: "absolute",
    top: 0,
    fontSize: 30,
    zIndex: 2,
  },
});

export default ShowPlant;
