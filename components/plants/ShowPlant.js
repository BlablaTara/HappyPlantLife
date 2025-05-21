// components/plants/ShowPlant.js
import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ShowPlant = ({ visible, onClose, plant, onDelete }) => {
  if (!plant) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Image source={{ uri: plant.image }} style={styles.image} />
          <Text style={styles.name}>{plant.name}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>🗑️ Slet plante</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Luk</Text>
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
  closeButton: {
    marginTop: 12,
    padding: 8,
  },
  closeText: {
    color: '#333',
  },
});

export default ShowPlant;
