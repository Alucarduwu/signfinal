import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, useWindowDimensions,Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation } from 'react-i18next';
import '../components/i18n'; // Asegúrate de importar la configuración i18n

const NavigationBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  const handleLogout = () => {
    Alert.alert(
      t('nav.cerrarSesionTitle'),
      t('nav.cerrarSesionMessage'),
      [
        { text: t('nav.cancelar'), style: 'cancel' },
        { text: t('nav.cerrarSesion'), onPress: () => navigation.navigate('LoginScreen') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={[
        styles.navBar,
        isLandscape ? styles.navBarLandscape : styles.navBarPortrait,
        { paddingBottom: insets.bottom || (Platform.OS === 'android' ? 15 : 0) },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
        <FontAwesome name="user" size={28} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <FontAwesome name="home" size={28} color="#4a148c" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
        <FontAwesome name="question-circle" size={28} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome name="sign-out" size={28} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
  },
  navBarPortrait: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 0,
    paddingTop: 10,
  },
  navBarLandscape: {
    height: '100%',
    width: 80,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    right: 0,
    top: 0,
    paddingTop: 20,
    borderLeftWidth: 1,
    borderTopWidth: 0,
  },
});

export default NavigationBar;
