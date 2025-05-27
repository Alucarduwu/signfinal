import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import '../screens/components/i18n';
import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

const IdiomaScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t, i18n } = useTranslation();

  const cambiarIdioma = (index) => {
    const idioma = index === 0 ? 'es' : 'en';
    i18n.changeLanguage(idioma);
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.header}>{t('idioma')}</Text>
        <View style={styles.contentBox}>
          <Text style={styles.label}>{t('idioma')}</Text>
          <View style={styles.buttonGroup}>
            {[t('espanol'), t('ingles')].map((idioma, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedIndex === index && styles.selectedButton,
                ]}
                onPress={() => cambiarIdioma(index)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedIndex === index && styles.selectedButtonText,
                  ]}
                >
                  {idioma}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  content: { flex: 1, padding: 20, marginTop: 80, marginBottom: 60 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  contentBox: {
    backgroundColor: '#e0e0e0', borderRadius: 15, padding: 20, alignItems: 'center',
  },
  label: { fontSize: 18, marginBottom: 15 },
  buttonGroup: {
    flexDirection: 'row', justifyContent: 'space-around', width: '90%',
  },
  button: {
    paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#ccc', borderRadius: 10,
  },
  selectedButton: { backgroundColor: '#6200ee' },
  buttonText: { fontSize: 16, color: '#000' },
  selectedButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default IdiomaScreen;
