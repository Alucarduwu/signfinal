import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileModal from './components/ProfileModal'; // Importa ProfileModal
import NavigationBar from './components/NavigationBar'; // Importa NavigationBar

const AyudaScreen = () => {
  const navigation = useNavigation();

  const handleSave = () => {
    alert('Comentario guardado. Te contactaremos pronto.');
  };

  return (
    <View style={styles.container}>
      {/* Header: ProfileModal */}
      <ProfileModal navigation={navigation} />

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <Text style={styles.title}>Deja tus dudas/comentarios</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://tutorial.link')}>
          - Si tienes duda de la funcionalidad en configuraciones puedes acceder a un mini tutorial.
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://privacidad.link')}>
          - ¿Quiénes somos? Checa las políticas de privacidad.
        </Text>

        <Text style={styles.question}>¿Tienes alguna otra duda? Háznosla saber:</Text>
        <TextInput style={styles.input} placeholder="Escribe aquí..." multiline={true} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          - Serás contactado vía correo electrónico en caso de ser necesario seguimiento.
        </Text>
      </View>

      {/* NavigationBar en la parte inferior */}
      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 80, // Ajusta este valor según la altura del header
    marginBottom: 60, // Ajusta este valor según la altura del NavigationBar
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: '#3B82F6',
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  question: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#E9D5FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});

export default AyudaScreen;