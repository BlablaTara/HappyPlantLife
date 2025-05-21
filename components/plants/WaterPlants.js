import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { differenceInCalendarDays, differenceInDays, addDays, parseISO } from 'date-fns';
import supabase from "../../utils/supabaseConnection.js";
import { Audio } from 'expo-av';
import { Vibration } from "react-native";


const WaterPlant = ({ plantId, lastWatered, waterNeeds, onWatered }) => {
    
    const playDropSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/water-bubble.wav')
        );
        await sound.playAsync();
    };

    const daysUntilNextWatering = () => {
        if (!lastWatered || !waterNeeds) return 'Ukendt';
        const nextWateringDate = addDays(parseISO(lastWatered), waterNeeds);
        const days = differenceInCalendarDays(nextWateringDate, new Date());
        return `${days} dage til vanding`;
    };

    const handleWater = async () => {
        const { error } = await supabase
        .from('user_plants')
        .update({ last_watered: new Date().toISOString() })
        .eq('plant_id', plantId);

        if (error) {
            console.error('Fejl ved vanding:', error.message);
        } else {
            onWatered(); //callback til parent (refresher)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {daysUntilNextWatering()}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                handleWater();
                playDropSound();
                Vibration.vibrate(10);
            }}>
                <Text style={styles.buttonText}>💧</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },

});

export default WaterPlant;