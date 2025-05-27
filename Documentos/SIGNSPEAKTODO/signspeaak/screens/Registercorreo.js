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
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

// Reemplazo de logEvent para que solo registre en consola
const logEvent = (evento, mensaje, uid = null) => {
  console.log(`📋 Evento: ${evento} - ${mensaje}${uid ? ` (UID: ${uid})` : ""}`);
};

const Registercorreo = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCwimcnbbSAoQ9CEg4JxMdnPFx4H2ixA0",
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
      if (!response.ok) {
        throw new Error(data.error.message || "No se pudo registrar.");
      }

      const uid = data.localId;

      await setDoc(doc(firestore, "users", uid), {
        email,
        createdAt: new Date(),
      });

      logEvent("registro", `Nuevo usuario registrado con el correo ${email}`, uid);

      await new Promise((resolve) => {
        Alert.alert("Éxito", "Registro exitoso.", [{ text: "OK", onPress: resolve }]);
      });

      navigation.replace("Datos", { uid, email });
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa la contraseña"
          secureTextEntry
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Vuelve a ingresar la contraseña"
          secureTextEntry
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.textCenter}>o Iniciar sesión en</Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.linkText}>Iniciar sesión</Text>
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
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4a148c",
    marginBottom: 25,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
  button: {
    backgroundColor: "#6a1b9a",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
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

export default Registercorreo;
