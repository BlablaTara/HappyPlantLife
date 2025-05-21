// components/plants/ShowPlant.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import WaterPlant from './WaterPlants.js';

const ShowPlant = ({ visible, onClose, plant, onDelete, onWatered }) => {
  const [localPlant, setLocalPlant] = useState(null);

  useEffect(() => {
    setLocalPlant(plant);
  }, [plant]);


  if (!localPlant) return null;

  const handleWatered = () => {
    const now = new Date().toISOString();
    setLocalPlant({ ...localPlant, last_watered: now });
    onWatered(); //Opdaterer også globalt
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
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
});

export default ShowPlant;
