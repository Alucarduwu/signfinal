import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Log en consola únicamente
const logEvent = (evento, mensaje) => {
  console.log(`📋 Evento: ${evento} - ${mensaje}`);
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCwimcnbbSAoQ9CEg4JxMdnPFx4H2ixA0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        console.log("✅ Usuario autenticado:", data.email);
        logEvent("inicio_sesion", `Usuario ${data.email} inició sesión`);

        Alert.alert("Inicio de Sesión Exitoso", `Bienvenido: ${data.email}`);
        navigation.navigate("Perfil");
      } else {
        console.log("❌ Error en login:", data.error.message);
        Alert.alert("Error", data.error.message || "Ocurrió un error");
      }
    } catch (error) {
      console.log("⚠️ Error de red:", error.message);
      Alert.alert("Error", error.message || "Error de red");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/LOGO.12345678.jpg")} style={styles.logo} />
      <Text style={styles.header}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Olvidocontra")}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.textCenter}>o Registrarse en</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Registercorreo")}>
        <Text style={styles.linkText}>Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0e6f6",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4a148c",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1a3ff",
  },
  forgotPassword: {
    textAlign: "right",
    width: "100%",
    color: "#6a1b9a",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  textCenter: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginVertical: 10,
  },
  linkText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6a1b9a",
    fontWeight: "700",
  },
});

export default LoginScreen;
