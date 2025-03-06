import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return navigation.replace("Login");

      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchPlaylists = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchProfile();
    fetchPlaylists();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={styles.container}>
      {profile && (
        <View style={styles.profileContainer}>
          <Image source={{ uri: profile?.images?.[0]?.url }} style={styles.profileImage} />
          <Text style={styles.name}>{profile.display_name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      )}

      <Text style={styles.heading}>Your Playlists</Text>
      {playlists.map((playlist) => (
        <View key={playlist.id} style={styles.playlist}>
          <Image source={{ uri: playlist.images?.[0]?.url }} style={styles.playlistImage} />
          <Text style={styles.playlistName}>{playlist.name}</Text>
        </View>
      ))}

      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, fontWeight: "bold", color: "white" },
  email: { fontSize: 16, color: "gray" },
  heading: { fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 10 },
  playlist: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  playlistImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  playlistName: { fontSize: 16, color: "white" },
});
