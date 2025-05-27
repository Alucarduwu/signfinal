// utils/logEvent.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logEvent = async (tipo, descripcion) => {
  try {
    const userData = await AsyncStorage.getItem('user');
    const uid = userData ? JSON.parse(userData).localId : null;

    await addDoc(collection(firestore, 'logs'), {
      uid: uid || 'desconocido',
      tipo,
      descripcion,
      fecha: serverTimestamp(),
    });
  } catch (error) {
    console.error('❌ Error al registrar log:', error);
  }
};
