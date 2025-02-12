import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🎵 Spotify Credentials
const CLIENT_ID = "26fe5510403e496d9ea1edd38f2926ca"; 
const CLIENT_SECRET = "9014a00f12034208862afe088162bea9"; // ⚠️ Keep secret in production!
const REDIRECT_URI = "https://auth.expo.io/@yongchengzhang/mymusicjournal";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [debugLogs, setDebugLogs] = useState(["App started..."]); // 📝 Store logs to display on UI

  // Function to update debug messages
  const addLog = (message) => {
    setDebugLogs((prevLogs) => [...prevLogs, message]);
  };

  // 🟢 Using `useAuthRequest` Instead of `startAsync()`
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["user-read-private", "user-read-email", "user-top-read"],
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      addLog(`✅ Login success! Code: ${code}`);
      exchangeCodeForToken(code);
    } else if (response) {
      addLog(`❌ Login Failed: ${JSON.stringify(response)}`);
    }
  }, [response]);

  const exchangeCodeForToken = async (code) => {
    addLog("🔄 Exchanging code for access token...");

    try {
      const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      });

      const response = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();
      if (data.access_token) {
        addLog("✅ Token received!");
        await AsyncStorage.setItem("spotify_token", data.access_token);
        fetchUserData(data.access_token);
      } else {
        addLog(`❌ Token Exchange Failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      addLog(`🚨 Error: ${error.message}`);
    }
  };

  const fetchUserData = async (accessToken) => {
    addLog("📡 Fetching user data...");

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      addLog(`👤 User Data: ${JSON.stringify(data)}`);
      navigation.replace("Profile", { user: data });
    } catch (error) {
      addLog("❌ Failed to fetch user data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Spotify</Text>
      <Button title="Connect to Spotify" onPress={() => promptAsync()} disabled={!request} />

      <Text style={styles.debugTitle}>🛠 Debug Logs:</Text>
      <ScrollView style={styles.logContainer}>
        {debugLogs.map((log, index) => (
          <Text key={index} style={styles.log}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 },
  debugTitle: { fontSize: 18, fontWeight: "bold", color: "#1DB954", marginTop: 20 },
  logContainer: { width: "100%", maxHeight: 200, backgroundColor: "#1c1c1c", padding: 10, borderRadius: 5, marginTop: 10 },
  log: { fontSize: 14, color: "lightgray", marginBottom: 5 },
});
