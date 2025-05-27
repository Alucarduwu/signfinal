import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';
import { firestore } from '../firebaseConfig'; // ✅ CORRECTO
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const PerfilScreen = ({ navigation }) => {
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

          const userRef = doc(firestore, 'users', uid); // ✅ CORREGIDO
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setFormData(userSnap.data());
            console.log('✅ Datos cargados del perfil');
          } else {
            console.log('⚠️ No se encontraron datos del usuario');
          }
        } else {
          console.log('⚠️ Usuario no autenticado');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos del perfil:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (userId) {
      try {
        const userRef = doc(firestore, 'users', userId); // ✅ CORREGIDO
        await updateDoc(userRef, formData);
        Alert.alert('Éxito', 'Perfil actualizado con éxito');
      } catch (error) {
        console.error('❌ Error al actualizar perfil:', error);
        Alert.alert('Error', 'No se pudo actualizar tu perfil');
      }
    } else {
      Alert.alert('Error', 'Usuario no autenticado');
    }
  };

  return (
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#D3B0FF" />
        ) : (
          <>
            <Text style={styles.greeting}>Hola {formData.nombre || 'Usuario'}</Text>
            <View style={styles.form}>
              {['nombre', 'apellidos', 'edad', 'genero', 'email', 'telefono'].map((field, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  placeholderTextColor="#666"
                  value={formData[field]?.toString() || ''}
                  onChangeText={(text) => handleChange(field, text)}
                />
              ))}
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 80,
    marginBottom: 60,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D3B0FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PerfilScreen;
