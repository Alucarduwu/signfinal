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
  useWindowDimensions,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // Importa la configuración i18n global

// Log en consola únicamente
const logEvent = (evento, mensaje) => {
  console.log(`📋 Evento: ${evento} - ${mensaje}`);
};

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  // Definir orientación vertical/ horizontal
  const isPortrait = height >= width;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('login.errorTitle'), t('login.errorFill'));
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

        Alert.alert(t('login.successTitle'), `${t('login.welcome')} ${data.email}`);
        navigation.navigate("Perfil");
      } else {
        console.log("❌ Error en login:", data.error.message);
        Alert.alert(t('login.errorTitle'), data.error.message || t('login.errorDefault'));
      }
    } catch (error) {
      console.log("⚠️ Error de red:", error.message);
      Alert.alert(t('login.errorTitle'), error.message || t('login.errorNetwork'));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isPortrait ? styles.portraitContainer : styles.landscapeContainer,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require("../assets/LOGO.12345678.jpg")} style={styles.logo} />
      <Text style={styles.header}>{t('login.header')}</Text>
      
      <TextInput
        style={[styles.input, isPortrait ? { width: "100%" } : { width: "45%" }]}
        placeholder={t('login.emailPlaceholder')}
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, isPortrait ? { width: "100%" } : { width: "45%" }]}
        placeholder={t('login.passwordPlaceholder')}
        secureTextEntry
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity
        style={isPortrait ? { width: "100%" } : { width: "45%", alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("Olvidocontra")}
      >
        <Text style={styles.forgotPassword}>
          {t('login.forgotPassword')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, isPortrait ? { width: "100%" } : { width: "45%" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>{t('login.loginButton')}</Text>
      </TouchableOpacity>

      <Text style={styles.textCenter}>{t('login.orRegister')}</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate("Registercorreo")}>
        <Text style={styles.linkText}>{t('login.register')}</Text>
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
  portraitContainer: {
    flexDirection: "column",
  },
  landscapeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4a148c",
    marginBottom: 25,
    width: "100%",
    textAlign: "center",
  },
  input: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1a3ff",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#6a1b9a",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 15,
    borderRadius: 10,
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
