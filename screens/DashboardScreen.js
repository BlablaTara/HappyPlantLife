import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import supabase from '../utils/supabaseConnection';
import PlantCalendar from '../components/dashboard/PlantCalendar.js';
import { getGreeting } from '../components/dashboard/Greeting.js';
import { getRandomFact } from '../components/dashboard/PlantFacts.js';
import { calculateWateringDates } from '../components/dashboard/WateringDates.js';
import { fetchUserPlants } from '../components/plants/FetchUserPlants.js';

const DashboardScreen = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [plantsForSelectedDate, setPlantsForSelectedDate] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      const { data } = await fetchUserPlants();
      if (data) {
        setUserPlants(data);
        const dates = calculateWateringDates(data);
        setMarkedDates(dates);
      }
    };

    loadDashboard();
  }, []);

  const handleDayPress = (day) => {
    const date = day.dateString;
    if (markedDates[date]) {
      setSelectedDate(date);
      setPlantsForSelectedDate(markedDates[date].plants);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting(userName)}</Text>
      <Text style={styles.fact}>Vidste du at... {getRandomFact()}</Text>
      <PlantCalendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
        plantsForSelectedDate={plantsForSelectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fact: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default DashboardScreen;
