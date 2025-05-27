import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

import NavigationBar from '../screens/components/NavigationBar';
import ProfileModal from '../screens/components/ProfileModal';
import { useTheme } from '../screens/context/ThemeContext';

// ✅ Importación para traducciones
import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // Asegúrate de que se cargue una vez

const { width } = Dimensions.get('window');

const Perfil = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({ nombre: '', apellido: '' });
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation(); // ✅ Hook para traducción

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataRaw = await AsyncStorage.getItem('user');
        if (userDataRaw) {
          const parsedUser = JSON.parse(userDataRaw);
          const uid = parsedUser.localId;

          const userRef = doc(firestore, 'users', uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
            console.log('✅ Usuario cargado correctamente:', userSnap.data());
          } else {
            console.warn('⚠️ Usuario no encontrado en Firestore');
          }
        } else {
          console.warn('⚠️ No hay sesión iniciada');
          Alert.alert('Error', 'No se encontró usuario en sesión. Inicia sesión nuevamente.');
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const closeModal = () => setModalVisible(false);
  const handleThemeChange = (value) => {
    toggleTheme(value ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0' }]}>
      <ProfileModal navigation={navigation} visible={modalVisible} onClose={closeModal} />

      <View style={styles.header}>
        <Text style={styles.greeting}>
          {t('hola')}, {userData.nombre || t('usuario')} {userData.apellido || ''}
        </Text>
        <Image source={require('../assets/LOGO.12345678.jpg')} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SignText')}>
        <Text style={styles.buttonText}>{t('Señas a Texto')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('TexttoSign')}>
        <Text style={styles.buttonText}>{t('Texto a Señas')}</Text>
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.buttonText,
            {
              fontWeight: theme === 'dark' ? 'normal' : 'bold',
              color: theme === 'dark' ? '#fff' : '#000',
            },
          ]}
        >
          {t('modo')} {theme === 'dark' ? t('oscuro') : t('claro')}
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={handleThemeChange}
          trackColor={{ false: '#767577', true: '#4a148c' }}
          thumbColor={theme === 'dark' ? '#fff' : '#4a148c'}
        />
      </View>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  actionButton: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#4a148c',
    borderRadius: 25,
    marginVertical: 15,
    alignItems: 'center',
  },
  switchContainer: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Perfil;
