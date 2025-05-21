import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { differenceInDays, addDays, parseISO } from 'date-fns';
import supabase from "../../utils/supabaseConnection.js";
import { FontAwesome } from '@expo/vector-icons';


const WaterPlant = ({ plantId, lastWatered, waterNeeds, onWatered }) => {
    const daysUntilNextWatering = () => {
        if (!lastWatered || !waterNeeds) return 'Ukendt';
        const nextWateringDate = addDays(parseISO(lastWatered), waterNeeds);
        const days = differenceInDays(nextWateringDate, new Date());
        return `${days} dage`;
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
                Næste vanding: om {daysUntilNextWatering()}
            </Text>
            <TouchableOpacity onPress={handleWater} style={styles.button}>
                <FontAwesome name="tint" size={24} color="white" />
                <Text style={styles.buttonText}>Vand</Text>
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
    backgroundColor: 'deepskyblue',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WaterPlant;