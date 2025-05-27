import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

import { useTranslation } from "react-i18next";
import "../screens/components/i18n";

const Datos = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    const { uid: passedUid, email: passedEmail } = route.params || {};
    if (!passedUid || !passedEmail) {
      Alert.alert(t("datos.error"), t("datos.errorNoUid"));
      navigation.navigate("RegisterScreen");
      return;
    }
    setUid(passedUid);
    setEmail(passedEmail);
  }, []);

  const handleRegister = async () => {
    if (!uid) {
      Alert.alert(t("datos.error"), t("datos.errorNoUid"));
      return;
    }
    if (!nombre.trim() || !apellidos.trim() || !edad.trim() || !genero.trim()) {
      Alert.alert(t("datos.error"), t("datos.errorMissing"));
      return;
    }
    if (isNaN(edad) || parseInt(edad) <= 0) {
      Alert.alert(t("datos.error"), t("datos.errorInvalidAge"));
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
      // Solo log en consola, no llamada externa
      console.log(`📋 Evento: completado_datos - Usuario completó su perfil (${email}) (UID: ${uid})`);

      Alert.alert(t("datos.successRegister"), "", [
        { text: t("datos.ok"), onPress: () => navigation.navigate("LoginScreen") },
      ]);
    } catch (error) {
      Alert.alert(t("datos.error"), t("datos.errorSave"));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.scrollContainerLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, isLandscape && styles.containerLandscape]}>
          {/* Columna 1 */}
          <View style={[styles.column, isLandscape && styles.columnLandscape]}>
            <Text style={styles.header}>{t("datos.header")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("datos.nombre")}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder={t("datos.apellidos")}
              value={apellidos}
              onChangeText={setApellidos}
            />
          </View>

          {/* Columna 2 */}
          <View style={[styles.column, isLandscape && styles.columnLandscape]}>
            <TextInput
              style={styles.input}
              placeholder={t("datos.edad")}
              value={edad}
              onChangeText={setEdad}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder={t("datos.genero")}
              value={genero}
              onChangeText={setGenero}
            />
            <Text style={styles.notice}>{t("datos.notice")}</Text>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>{t("datos.buttonRegister")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainerLandscape: {
    paddingHorizontal: 60,
  },
  container: {
    width: "100%",
  },
  containerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "100%",
  },
  columnLandscape: {
    width: "48%",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6a1b9a",
    marginBottom: 30,
    textAlign: "center",
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
