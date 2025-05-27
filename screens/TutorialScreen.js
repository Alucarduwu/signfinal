import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfileModal from './components/ProfileModal'; // Importa ProfileModal
import NavigationBar from './components/NavigationBar'; // Importa NavigationBar

const TutorialScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header: ProfileModal */}
      <ProfileModal navigation={navigation} />

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <Text style={styles.title}>Tutorial</Text>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Aquí se muestra la descripción paso a paso de cómo utilizar la aplicación. Sigue cada paso cuidadosamente para aprender a interpretar y traducir lenguaje de señas con SignSpeak.
          </Text>
        </ScrollView>
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
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 16,
  },
});

export default TutorialScreen;