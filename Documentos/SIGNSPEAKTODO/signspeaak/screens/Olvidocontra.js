import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const PasswordRecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDCwimcnbbSAoQ9CEg4JxMdnPFx4H2ixA0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Correo Enviado",
          "Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.",
          [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
        );
      } else {
        Alert.alert("Error", data.error?.message || "No se pudo enviar el correo.");
      }
    } catch (error) {
      Alert.alert("Error", "Error de red o conexión.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recuperación de contraseña</Text>
      <Text style={styles.subText}>
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Restablecer Contraseña</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6a1b9a",
    marginBottom: 30,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0e6f6",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d1a3ff",
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PasswordRecoveryScreen;
