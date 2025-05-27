import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

import '../screens/components/i18n'; // Asegúrate de que la configuración i18n esté cargada

const IdiomaScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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

      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        <Text style={styles.title}>{t('idioma.titulo')}</Text>
        <View style={[styles.buttonGroup, isLandscape && styles.buttonGroupLandscape]}>
          {[t('idioma.espanol'), t('idioma.ingles')].map((idioma, index) => (
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

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 80,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  buttonGroupLandscape: {
    width: '40%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: '#6a1b9a',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IdiomaScreen;
