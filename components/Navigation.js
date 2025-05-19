import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen.js';
import DashboardScreen from '../screens/DashboardScreen.js'
import PlantScreen from "../screens/PlantScreen.js";


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
                        } else if (route.namee === 'Plants') {
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
                <Tab.Screen name="Plants" component={PlantScreen} />
            </Tab.Navigator>    
        </NavigationContainer>
    );
}