import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

import NavigationBar from '../screens/components/NavigationBar';
import ProfileModal from '../screens/components/ProfileModal';
import { useTheme } from '../screens/context/ThemeContext';

import { useTranslation } from 'react-i18next';
import '../screens/components/i18n';

const Perfil = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({ nombre: '', apellido: '' });
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

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
          Alert.alert(t('error'), t('errorNoSesion'));
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
    <View
      style={[
        styles.outerContainer,
        { backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0' },
      ]}
    >
      <ProfileModal navigation={navigation} visible={modalVisible} onClose={closeModal} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isLandscape && styles.containerLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, isLandscape && styles.headerLandscape]}>
          <Text
            style={[
              styles.greeting,
              isLandscape && styles.greetingLandscape,
              { color: theme === 'dark' ? '#fff' : '#4a148c' },
            ]}
          >
            {t('hola')}, {userData.nombre || t('usuario')} {userData.apellido || ''}
          </Text>
          <Image
            source={require('../assets/LOGO.12345678.jpg')}
            style={[styles.logo, isLandscape && styles.logoLandscape]}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.buttonsContainer, isLandscape && styles.buttonsContainerLandscape]}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme === 'dark' ? '#7e57c2' : '#4a148c' },
              isLandscape && styles.actionButtonLandscape,
            ]}
            onPress={() => navigation.navigate('SignText')}
          >
            <Text style={styles.buttonText}>{t('senasATexto')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme === 'dark' ? '#7e57c2' : '#4a148c' },
              isLandscape && styles.actionButtonLandscape,
            ]}
            onPress={() => navigation.navigate('TexttoSign')}
          >
            <Text style={styles.buttonText}>{t('textoASenas')}</Text>
          </TouchableOpacity>
        </View>

        {/* Aquí el switch abajo en horizontal */}
        <View
          style={[
            styles.switchContainer,
            isLandscape && styles.switchContainerLandscape,
          ]}
        >
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
      </ScrollView>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  containerLandscape: {
    alignItems: 'flex-start',
    paddingHorizontal: 40,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  greetingLandscape: {
    marginRight: 15,
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoLandscape: {
    width: 120,
    height: 120,
  },
  buttonsContainer: {
    width: '80%',
  },
  buttonsContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    padding: 20,
    borderRadius: 25,
    marginVertical: 15,
    alignItems: 'center',
  },
  actionButtonLandscape: {
    width: '45%',
  },
  switchContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  switchContainerLandscape: {
    width: '80%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Perfil;
