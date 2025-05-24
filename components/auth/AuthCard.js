import React, { useState } from "react";
import supabase from "../../utils/supabaseConnection";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const AuthCard = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Fejl", "Udfyld både email og adgangskode.");
      return;
    }

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      Alert.alert("Ups!", "Noget gik galt: " + result.error.message);
    } else {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        Alert.alert("Kunne ikke hente session");
        return;
      }
      onLogin(sessionData.session);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {isLogin ? "🌿 Login 🌿" : "🌱 Signup 🌱"}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Adgangskode"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isLogin ? "Log ind" : "Opret konto"}
        </Text>
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Ingen konto? " : "Har du allerede en konto? "}
            <Text style={styles.linkText}>
              {isLogin ? "Opret dig her" : "Log ind"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    elevation: 3,
    width: "90%",
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#156130",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    color: "#444",
    fontWeight: "bold",
  },
});

export default AuthCard;
