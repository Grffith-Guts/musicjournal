import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EasonTrackSearch from './src/screens/EasonTrackSearch';

export default function App() {
  
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Statistics" component={EasonTrackSearch}/>
        <Tab.Screen name="Home" component={EasonTrackSearch}/>
        <Tab.Screen name="Journal Calendar" component={EasonTrackSearch}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 10,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  trackContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.3,
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginVertical: 3,
  },
});
