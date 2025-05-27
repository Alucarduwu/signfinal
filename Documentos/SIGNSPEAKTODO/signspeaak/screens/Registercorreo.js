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

import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // Importa la configuración i18n global

// Reemplazo de logEvent para que solo registre en consola
const logEvent = (evento, mensaje, uid = null) => {
  console.log(`📋 Evento: ${evento} - ${mensaje}${uid ? ` (UID: ${uid})` : ""}`);
};

const Registercorreo = ({ navigation }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('register.errorTitle'), t('register.errorFillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('register.errorTitle'), t('register.errorPasswordMismatch'));
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
        throw new Error(data.error.message || t('register.errorDefault'));
      }

      const uid = data.localId;

      await setDoc(doc(firestore, "users", uid), {
        email,
        createdAt: new Date(),
      });

      logEvent("registro", `${t('register.newUserRegistered')} ${email}`, uid);

      await new Promise((resolve) => {
        Alert.alert(t('register.successTitle'), t('register.successMessage'), [{ text: t('ok'), onPress: resolve }]);
      });

      navigation.replace("Datos", { uid, email });
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      Alert.alert(t('register.errorTitle'), error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t('register.header')}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('register.emailPlaceholder')}
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder={t('register.passwordPlaceholder')}
          secureTextEntry
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder={t('register.confirmPasswordPlaceholder')}
          secureTextEntry
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t('register.registerButton')}</Text>
      </TouchableOpacity>
      <Text style={styles.textCenter}>{t('register.orLogin')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.linkText}>{t('register.loginLink')}</Text>
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
