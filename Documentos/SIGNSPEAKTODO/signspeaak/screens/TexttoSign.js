import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ProfileModal from './components/ProfileModal'; // Asegúrate de que la ruta sea correcta
import NavigationBar from './components/NavigationBar'; // Barra de navegación

const TextToSign = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header: ProfileModal */}
      <ProfileModal navigation={navigation} />

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Cuadro superior (para la cámara en el futuro) */}
        <View style={styles.videoContainer} />

        {/* Botón de sonido */}
        <FontAwesome name="volume-up" size={40} color="black" style={styles.soundButton} />

        {/* Botones de control */}
        <View style={styles.buttonContainer}>
          <Button title="Iniciar traducción" color="#d8b3ff" />
          <Button title="Detener" color="#d8b3ff" />
        </View>

        {/* Cuadro inferior */}
        <View style={styles.textContainer} />
      </View>

      {/* NavigationBar en la parte inferior */}
      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 80, // Ajusta según la altura del ProfileModal
    marginBottom: 60, // Ajusta según la altura de NavigationBar
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#d3d3d3', // Espacio para la cámara en el futuro
    borderRadius: 10,
    marginBottom: 20,
  },
  soundButton: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  textContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#d3d3d3', // Cuadro de texto
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default TextToSign;
