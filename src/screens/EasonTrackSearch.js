import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";

export default function App() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async () => {
    if (!songName.trim()) {
      Alert.alert("Error", "Please enter a song name");
      return;
    }
  
    setLoading(true);
    setTracks([]);
  
    try {
      // Initialize URLSearchParams
      const params = new URLSearchParams({
        query: `recording:"${songName}"`,
        fmt: 'json',
        limit: '10',
      });
  
      // Append artist name if provided
      if (artistName.trim()) {
        params.set('query', `recording:"${songName}" AND artist:"${artistName}"`);
      }
  
      // Construct the full URL
      const queryUrl = `https://musicbrainz.org/ws/2/recording/?${params.toString()}`;
  
      console.log("API Request URL:", queryUrl); // Debug: Check if query is formatted correctly
  
      const response = await axios.get(queryUrl);
  
      if (response.data.recordings.length > 0) {
        const trackResults = await Promise.all(
          response.data.recordings.map(async (track) => {
            const release = track.releases?.[0]; // Get first release
            const releaseId = release?.id || null;
  
            if (!releaseId) return null; // Skip if no release ID
  
            const coverArtUrl = `https://coverartarchive.org/release/${releaseId}/front`;
  
            // Check if album cover is available
            try {
              await axios.get(coverArtUrl);
            } catch (err) {
              return null; // Exclude tracks with missing album covers
            }
  
            return {
              id: track.id,
              title: track.title,
              artist: track["artist-credit"]?.[0]?.name || "Unknown Artist",
              album: release?.title || "Unknown Album",
              coverArtUrl,
            };
          })
        );
  
        // Remove null values (tracks without covers)
        const filteredTracks = trackResults.filter(Boolean);
  
        if (filteredTracks.length > 0) {
          setTracks(filteredTracks);
        } else {
          Alert.alert("No results", "No matching tracks with album covers found.");
        }
      } else {
        Alert.alert("No results", "No matching tracks found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch track data.");
      console.error("API Error:", error);
    }
  
    setLoading(false);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Song</Text>

      <TextInput
        style={styles.input}
        value={songName}
        onChangeText={setSongName}
        placeholder="Enter song name (e.g., Shape of You)"
      />

      <TextInput
        style={styles.input}
        value={artistName}
        onChangeText={setArtistName}
        placeholder="Enter artist name (optional)"
      />

      <Button title="GET TRACK DETAILS" onPress={fetchTracks} />

      {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trackContainer}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.info}>🎤 Artist: {item.artist}</Text>
            <Text style={styles.info}>💿 Album: {item.album}</Text>
            <Image source={{ uri: item.coverArtUrl }} style={styles.coverArt} />
          </View>
        )}
      />
    </View>
  );
}

// ✅ Styles for better UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  loader: {
    marginTop: 10,
  },
  trackContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.3,
    width: "90%",
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    marginVertical: 2,
  },
  coverArt: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});
