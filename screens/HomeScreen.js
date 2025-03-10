import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';


export default function TrackDetailsScreen({ route }) {
  const { trackId, trackName } = route.params;
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(`https://api.reccobeats.com/track/${trackId}`);
        setTrackData(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch track details');
        console.error('API Error:', error);
      }
      setLoading(false);
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading track details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trackName}</Text>
      {trackData ? (
        <>
          <Text style={styles.info}>🎤 Artist: {trackData.artist}</Text>
          <Text style={styles.info}>📅 Release Date: {trackData.release_date}</Text>
          <Text style={styles.info}>🎵 Album: {trackData.album}</Text>
        </>
      ) : (
        <Text style={styles.error}>No track details available</Text>
      )}
    </View>
  );
}

// ✅ Styles for Track Details Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});
