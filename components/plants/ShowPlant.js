import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import WaterPlant from './WaterPlants.js';
import { getWaterStatusColor } from '../../utils/waterStatus.js'

const ShowPlant = ({ visible, onClose, plant, onDelete, onWatered }) => {
  const [localPlant, setLocalPlant] = useState(null);

  const dropletOpacity = useRef(new Animated.Value(0)).current; // fader ind og ud
  const dropletY = useRef(new Animated.Value(0)).current; // bevæger sig nedaf

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

  // useEffect(() => {
  //   setLocalPlant(plant);
  // }, [plant]);

  useEffect(() => { // chat mente dette var bedre. nu må vi se..
    if (plant?.plant_id) {
      setLocalPlant(plant);
    }
  }, [plant?.plant_id]);


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

          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.imageWrapper}>
            <Image source={{ uri: localPlant.image }} style={styles.image} />
            <View 
              style={[
                StyleSheet.absoluteFillObject, 
                  { backgroundColor: getWaterStatusColor(localPlant.last_watered, localPlant.water_needs),
                    borderRadius: 10,
                  },
              ]}
             /> 
            <Animated.Text style={[styles.droplet, 
                { 
                  opacity: dropletOpacity, 
                  transform: [{ translateY: dropletY }],
                },
              ]}
            >
              💧
            </Animated.Text>
          </View>

          <Text style={styles.name}>{localPlant.name}</Text>

            <WaterPlant
                plantId={localPlant.plant_id}
                lastWatered={localPlant.last_watered}
                waterNeeds={localPlant.water_needs}
                onWatered={handleWatered}
            />

          <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
            <Text style={styles.deleteSymbol}>🗑️</Text>
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
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },

  imageWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'visible',
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
  deleteIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
  },
  deleteSymbol: {
    fontSize: 22,
    color: '#8B0000', 
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
    position: 'absolute',
    top: 0, 
    fontSize: 30,
    zIndex: 2,
  },

});

export default ShowPlant;
