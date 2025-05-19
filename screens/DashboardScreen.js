import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Dette er dit Dashboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default DashboardScreen;
