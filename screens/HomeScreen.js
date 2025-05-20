import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthCard from '../components/auth/AuthCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleLogin = (session) => {
    if (session) {
      navigation.navigate('Dashboard'); // Gå videre til appen
    }
  };

  return (
    <View style={styles.container}>
      <AuthCard onLogin={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
