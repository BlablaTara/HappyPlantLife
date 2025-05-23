import { View, Text, StyleSheet } from 'react-native';
import { getGreeting } from '../../components/dashboard/Greeting.js';
import { getRandomFact } from '../../components/dashboard/PlantFacts.js';
import PlantCalendar from '../../components/dashboard/PlantCalendar.js';
import OverallPlantsState from '../../components/dashboard/OverallPlantsState.js';

const DashboardScreenUI = ({
  userName,
  overallHealthScore,
  markedDates,
  selectedDate,
  setSelectedDate,
  plantsForSelectedDate,
  onDayPress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting(userName)}</Text>
      <OverallPlantsState score={overallHealthScore} />
      <PlantCalendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        plantsForSelectedDate={plantsForSelectedDate}
      />
      <Text style={styles.factHeading}>🌟 Fun Plant Facts 🌟</Text>
      <Text style={styles.fact}>Vidste du: ...{getRandomFact()}</Text>
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
  factHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#4d774e',
    },
  fact: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default DashboardScreenUI;
