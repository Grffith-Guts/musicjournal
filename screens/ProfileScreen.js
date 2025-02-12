import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetchTodayPlaylist();
  }, []);

  const fetchTodayPlaylist = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("spotify_token");

      if (!accessToken) {
        Alert.alert("Error", "Spotify token is missing. Please log in again.");
        return;
      }

      const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.json();

      // ✅ Fix: Handle API error responses properly
      if (!response.ok || !data.items) {
        Alert.alert("Error", "Failed to fetch playlist.");
        return;
      }

      setPlaylist(data.items);
    } catch (error) {
      Alert.alert("Error", "Network issue: Failed to fetch playlist.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Playlist</Text>

      {playlist.length === 0 ? (
        <Text style={styles.info}>
          No recent tracks found. Play some music on Spotify and check back later!
        </Text>
      ) : (
        <FlatList
          data={playlist}
          keyExtractor={(item) => item.track.id}
          renderItem={({ item }) => (
            <View style={styles.track}>
              <Image
                source={{ uri: item.track.album.images?.[0]?.url || "https://via.placeholder.com/60" }}
                style={styles.albumArt}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{item.track.name}</Text>
                <Text style={styles.artist}>
                  {item.track.artists.map((a) => a.name).join(", ")}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

// 🟢 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 20 },
  info: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  track: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  albumArt: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  trackInfo: { flex: 1 },
  trackName: { fontSize: 16, fontWeight: "bold", color: "white" },
  artist: { fontSize: 14, color: "gray" },
});

