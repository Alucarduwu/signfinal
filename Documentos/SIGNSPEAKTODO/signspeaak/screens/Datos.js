import React, { useState, useEffect } from "react";
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
import { logEvent } from "../screens/utils/logEevents";

const Datos = ({ navigation, route }) => {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    const { uid: passedUid, email: passedEmail } = route.params || {};
    if (!passedUid || !passedEmail) {
      Alert.alert("Error", "Faltan datos del usuario.");
      navigation.navigate("RegisterScreen");
      return;
    }

    setUid(passedUid);
    setEmail(passedEmail);
    console.log("✅ UID recibido:", passedUid);
    console.log("✅ Email recibido:", passedEmail);
  }, []);

  const handleRegister = async () => {
    if (!uid) {
      Alert.alert("Error", "No se puede registrar sin UID válido.");
      return;
    }

    if (!nombre.trim() || !apellidos.trim() || !edad.trim() || !genero.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(edad) || parseInt(edad) <= 0) {
      Alert.alert("Error", "La edad debe ser un número válido mayor a 0.");
      return;
    }

    try {
      const userData = {
        uid,
        email,
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        edad: parseInt(edad),
        genero: genero.trim(),
      };

      await setDoc(doc(firestore, "users", uid), userData, { merge: true });
      await logEvent("completado_datos", `Usuario completó su perfil (${email})`, uid);

      console.log("✅ Usuario guardado exitosamente en Firestore");

      Alert.alert("Registro Exitoso", "Tu cuenta ha sido completada.", [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ]);
    } catch (error) {
      console.error("❌ Error guardando en Firestore:", error);
      Alert.alert("Error", "Hubo un problema al guardar tus datos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ingresa Datos</Text>
      <TextInput style={styles.input} placeholder="Nombre(s)" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
      <TextInput style={styles.input} placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={setGenero} />
      <Text style={styles.notice}>
        Al registrarte, aceptas que usemos tu información con fines estadísticos.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
  notice: {
    fontSize: 13,
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
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

export default Datos;
