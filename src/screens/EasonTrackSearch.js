import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';

export default function EasonTrackSearch( { navigation } ) {
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackData, setTrackData] = useState([]);

  const fetchTrack = async () => {
    if (!songName.trim()) {
      Alert.alert('Error', 'Please enter a song name');
      return;
    }

    setLoading(true);
    setTrackData([]);

    try {
      const query = `recording:${songName}`;
      const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(query)}&fmt=json`;
      const response = await axios.get(url);

      if (response.data.recordings && response.data.recordings.length > 0) {
        setTrackData(response.data.recordings);
      } else {
        Alert.alert('No results', 'No track found for this name');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch track data');
      console.error('API Error:', error);
    }

    setLoading(false);
  };

  const renderTrack = ({ item }) => (
    <View style={styles.trackContainer}>
      <Text style={styles.trackTitle}>{item.title}</Text>
      <Text style={styles.info}>🎤 Artist: {item['artist-credit'].map(artist => artist.name).join(', ')}</Text>
      <Text style={styles.info}>💿 Releases: {item.releases ? item.releases.map(release => release.title).join(', ') : 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Song</Text>
      <TextInput
        style={styles.input}
        value={songName}
        onChangeText={setSongName}
        placeholder="e.g., Shape of You"
      />
      <Button title="Get Track Details" onPress={fetchTrack} />

      {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}

      <FlatList
        data={trackData}
        renderItem={renderTrack}
        keyExtractor={item => item.id}
        style={styles.list}
      />
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
