import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AuthCard from '../components/auth/AuthCard';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/happyplantlife.png';

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
      <Image source={logo} style={styles.logo} resizeMode="contain" />
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
  logo: {
    width: 250,
    height: 100,
    marginBottom: 32,
  },

});

export default HomeScreen;
