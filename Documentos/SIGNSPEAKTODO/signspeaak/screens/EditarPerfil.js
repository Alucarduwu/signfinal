import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';
import { firestore } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { useTranslation } from 'react-i18next';
import '../screens/components/i18n';

const PerfilScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    genero: '',
    email: '',
    telefono: '',
  });

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const uid = parsedUser.localId;
          setUserId(uid);

          const userRef = doc(firestore, 'users', uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setFormData(userSnap.data());
          } else {
            console.log('⚠️ No se encontraron datos del usuario');
          }
        } else {
          console.log('⚠️ Usuario no autenticado');
          Alert.alert(t('perfil.error'), t('perfil.notAuthenticated'));
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos del perfil:', error);
        Alert.alert(t('perfil.error'), t('perfil.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert(t('perfil.error'), t('perfil.notAuthenticated'));
      return;
    }
    try {
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, formData);
      Alert.alert(t('perfil.success'), t('perfil.successUpdate'));
    } catch (error) {
      console.error('❌ Error al actualizar perfil:', error);
      Alert.alert(t('perfil.error'), t('perfil.errorUpdate'));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#FFF' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ProfileModal navigation={navigation} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          isLandscape && styles.contentLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#D3B0FF" />
        ) : (
          <>
            <Text style={styles.greeting}>
              {t('perfil.hola')} {formData.nombre || t('perfil.usuario')}
            </Text>

            <View style={[styles.form, isLandscape && styles.formLandscape]}>
              {['nombre', 'apellidos', 'edad', 'genero', 'email', 'telefono'].map(
                (field, idx) => (
                  <TextInput
                    key={idx}
                    style={[styles.input, isLandscape && styles.inputLandscape]}
                    placeholder={t(`perfil.${field}`)}
                    placeholderTextColor="#666"
                    value={formData[field]?.toString() || ''}
                    onChangeText={(text) => handleChange(field, text)}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                )
              )}

              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{t('perfil.guardar')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <NavigationBar navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: {
    flexGrow: 1,
    padding: 20,
    marginTop: 80,
    marginBottom: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  form: { alignItems: 'center', width: '100%' },
  formLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    width: '90%',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputLandscape: { width: '45%' },
  button: {
    backgroundColor: '#D3B0FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default PerfilScreen;
