import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import ProfileModal from './components/ProfileModal'; // Importa ProfileModal
import NavigationBar from './components/NavigationBar'; // Importa NavigationBar

const VolumenScreen = () => {
  const [levels, setLevels] = useState([50, 30, 70, 40, 60]);

  const updateLevel = (index, value) => {
    const newLevels = [...levels];
    newLevels[index] = value;
    setLevels(newLevels);
  };

  return (
    <View style={styles.container}>
      {/* Header: ProfileModal */}
      <ProfileModal />

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <Text style={styles.title}>Volumen</Text>
        <View style={styles.slidersContainer}>
          {levels.map((level, index) => (
            <Slider
              key={index}
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={level}
              onValueChange={(value) => updateLevel(index, value)}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#4CAF50"
              orientation="vertical"
            />
          ))}
        </View>
      </View>

      {/* NavigationBar en la parte inferior */}
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 80, // Ajusta este valor según la altura del header
    marginBottom: 60, // Ajusta este valor según la altura del NavigationBar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  slidersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  slider: {
    height: 200,
    width: 40,
  },
});

export default VolumenScreen;