import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../../screens/HomeScreen.js';
import DashboardScreen from '../../screens/DashboardScreen.js'
import PlantScreen from "../../screens/PlantScreen.js";
import PlantContainer from "../../components/plants/PlantContainer.js";



const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Home') {
                            return <Ionicons name="home-outline" size={size} color={color} />
                        } else if (route.name === 'Dashboard') {
                            return <Ionicons name="speedometer-outline" size={size} color={color} />
                        } else if (route.name === 'Plants') {
                            return <MaterialCommunityIcons name="leaf" size={size} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Plants" component={PlantContainer} options={{ tabBarIcon: ({ color, size }) => (
                    <Image 
                    source={{ uri: 'https://img.icons8.com/?size=100&id=E7W8jFv4qjui&format=png&color=000000' }}
                    style={{ width: size, height: size, tintColor: color }}
                    />
                ),}} 
                />
            </Tab.Navigator>    
        </NavigationContainer>
    );
}