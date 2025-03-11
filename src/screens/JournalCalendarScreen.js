import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';

export default function JournalCalendarScreen() {
  return (
    <View style={styles.container}>
        <Text>
            Journal Calendar Screen
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