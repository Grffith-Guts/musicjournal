import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
        <Text>
            This is the Stats Screen
        </Text>
    </View>
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
});
  