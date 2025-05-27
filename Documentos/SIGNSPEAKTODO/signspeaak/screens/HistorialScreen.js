import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
} from 'react-native';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../firebaseConfig';
import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

const HistorialScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const uid = userData ? JSON.parse(userData).localId : null;

        if (!uid) return;

        const q = query(
          collection(firestore, 'logs'),
          where('uid', '==', uid),
          orderBy('fecha', 'desc')
        );

        const snapshot = await getDocs(q);
        const result = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLogs(result);
      } catch (error) {
        console.error('❌ Error al obtener logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const logsFiltrados = logs.filter((log) =>
    log.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
    log.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />

      <View style={styles.content}>
        <TextInput
          style={styles.search}
          placeholder="Filtrar por..."
          value={filtro}
          onChangeText={setFiltro}
        />
        <ScrollView>
          {logsFiltrados.map((log, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.tipo}>{log.tipo}</Text>
              <Text style={styles.descripcion}>{log.descripcion}</Text>
              <Text style={styles.fecha}>
                {log.fecha?.toDate().toLocaleString() || 'Fecha desconocida'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 20, marginTop: 80, marginBottom: 60 },
  search: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginVertical: 4,
    borderRadius: 8,
  },
  tipo: { fontWeight: 'bold', color: '#4a148c' },
  descripcion: { color: '#333' },
  fecha: { fontSize: 12, color: '#999' },
});

export default HistorialScreen;
