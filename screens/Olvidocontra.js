import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";

import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // Asegúrate que la configuración i18n se cargue

const PasswordRecoveryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert(t('passwordRecovery.errorTitle'), t('passwordRecovery.errorEmail'));
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
          t('passwordRecovery.emailSentTitle'),
          t('passwordRecovery.emailSentMessage'),
          [{ text: t('ok'), onPress: () => navigation.navigate("LoginScreen") }]
        );
      } else {
        Alert.alert(t('error'), data.error?.message || t('passwordRecovery.errorSend'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('passwordRecovery.errorNetwork'));
    }
  };

  const isPortrait = height >= width;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isPortrait ? styles.portraitContainer : styles.landscapeContainer,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>{t('passwordRecovery.header')}</Text>
      <Text style={styles.subText}>{t('passwordRecovery.subText')}</Text>
      <TextInput
        style={[styles.input, { width: isPortrait ? "100%" : "50%" }]}
        placeholder={t('passwordRecovery.emailPlaceholder')}
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, { width: isPortrait ? "100%" : "50%" }]}
        onPress={handlePasswordReset}
      >
        <Text style={styles.buttonText}>{t('passwordRecovery.resetButton')}</Text>
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
  portraitContainer: {
    flexDirection: "column",
  },
  landscapeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PasswordRecoveryScreen;
