import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = "43f009e21f9e4965a74f251e6871b969";
const REDIRECT_URI = "http://localhost:8081/--/expo-auth-session";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token"; 

const discovery = {
  authorizationEndpoint: AUTH_ENDPOINT,
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["user-read-private", "user-read-email"],
      redirectUri: REDIRECT_URI,
      responseType: RESPONSE_TYPE,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const params = new URLSearchParams(response.url.split("#")[1]);
      const token = params.get("access_token");
      setAccessToken(token);
      AsyncStorage.setItem("spotify_token", token);
      navigation.replace("Profile");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Spotify</Text>
      <Button title="Login with Spotify" onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
