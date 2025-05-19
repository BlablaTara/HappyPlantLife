import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Plant = ({ name, image }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    name: {
      marginTop: 5,
      fontSize: 16,
      fontWeight: '500',
    },
  });
  
  export default Plant;

  