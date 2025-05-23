import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  const [userName, setUserName] = useState(''); // Hvis du henter brugernavn senere

  const loadDashboard = useCallback(async () => {
    const { data } = await fetchUserPlants();
    if (data) {
      setUserPlants(data);

      const dates = calculateWateringDates(data);
      setMarkedDates(dates);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleDayPress = (day) => {
    const date = day.dateString;
    if (markedDates[date]) {
      setSelectedDate(date);
      setPlantsForSelectedDate(markedDates[date].plants);
    } else {
      setSelectedDate(null);
      setPlantsForSelectedDate([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting(userName)}</Text>
      <PlantCalendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
        plantsForSelectedDate={plantsForSelectedDate}
        setSelectedDate={setSelectedDate} 
      />
      <Text style={styles.fact}>Vidste du: {getRandomFact()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    paddingTop: 70,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#173e25',
    marginBottom: 32,
  },
  fact: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default DashboardScreen;
