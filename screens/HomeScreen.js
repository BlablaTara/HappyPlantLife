import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Velkommen til Home!</Text>
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

export default HomeScreen;