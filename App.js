import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlantScreen from './screens/PlantScreen';
import Navigation from './components/Navigation';


export default function App() {
  return (
    <>
    <Navigation />
    <StatusBar style="auto" />
    </>
  );
}


