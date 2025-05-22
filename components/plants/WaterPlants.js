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
    if (!lastWatered || !waterNeeds) return <Text>Ukendt</Text>;

    const nextWateringDate = addDays(parseISO(lastWatered), waterNeeds);
    const days = differenceInCalendarDays(nextWateringDate, new Date());

    if (days > 1) {
        return (
        <Text>
            <Text style={styles.daysNumber}>{days}</Text>
            <Text> : dage til vanding</Text>
        </Text>
        );
    } else if (days === 1) {
        return (
        <Text>
            <Text style={styles.daysNumber}>1</Text>
            <Text> dag til vanding</Text>
        </Text>
        );
    } else if (days === 0) {
        return <Text style={styles.today}>Skal vandes i dag!</Text>;
    } else if (days === -1) {
        return <Text style={styles.overdue}>Skulle havde været vandet i går!</Text>;
    } else if (days <= -2 && days >= -3) {
        return <Text style={styles.warning}>Åh nej, skynd dig og vand mig!</Text>;
    } else if (days <= -4 && days >= -10) {
        return <Text style={styles.urgent}>VAND VAAAND!</Text>;
    } else {
        return <Text style={styles.veryLate}>Du har glemt mig 🥀</Text>;
    }
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
          <View style={styles.label}>
            {daysUntilNextWatering()}
          </View>
            <TouchableOpacity style={styles.button} onPress={ async() => {
                await handleWater();
                await playDropSound();
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
    textAlign: 'center',
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

  daysNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  today: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overdue: {
    color: '#FF9500',
    fontWeight: 'bold',
    fontSize: 16,
  },
  warning: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  urgent: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  veryLate: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 14,
  },

});

export default WaterPlant;