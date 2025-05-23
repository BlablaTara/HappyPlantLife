import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getGreeting } from '../../components/dashboard/Greeting.js';
import { getRandomFact } from '../../components/dashboard/PlantFacts.js';
import PlantCalendar from '../../components/dashboard/PlantCalendar.js';

const DashboardScreenUI = ({
  userName,
  markedDates,
  selectedDate,
  setSelectedDate,
  plantsForSelectedDate,
  onDayPress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting(userName)}</Text>
      <PlantCalendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        plantsForSelectedDate={plantsForSelectedDate}
      />
      <Text style={styles.fact}>Vidste du: {getRandomFact()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
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

export default DashboardScreenUI;
