// components/plants/ShowPlant.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import WaterPlant from './WaterPlants.js';

const ShowPlant = ({ visible, onClose, plant, onDelete, onWatered }) => {
  const [localPlant, setLocalPlant] = useState(null);

  const dropletOpacity = useRef(new Animated.Value(0)).current;

  const playDropletAnimation = () => {
    dropletOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(dropletOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dropletOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setLocalPlant(plant);
  }, [plant]);


  if (!localPlant) return null;

  const handleWatered = () => {
    const now = new Date().toISOString();
    setLocalPlant({ ...localPlant, last_watered: now });
    playDropletAnimation();
    onWatered(); //Opdaterer også globalt
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Animated.Text style={[styles.droplet, { opacity: dropletOpacity}]}>
            💧
          </Animated.Text>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>

          <Image source={{ uri: localPlant.image }} style={styles.image} />
          <Text style={styles.name}>{localPlant.name}</Text>

            <WaterPlant
                plantId={localPlant.plant_id}
                lastWatered={localPlant.last_watered}
                waterNeeds={localPlant.water_needs}
                onWatered={handleWatered}
            />

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>🗑️ Slet plante</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeIconText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  droplet: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 5,
    transform: [{ translateY: -10 }],
  },
  
});

export default ShowPlant;
