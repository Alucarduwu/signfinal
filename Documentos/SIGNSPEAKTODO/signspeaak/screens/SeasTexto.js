import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';

const SeasTexto = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text style={styles.errorText}>No se puede acceder a la cámara</Text>;

  // Cámara toma 50% del alto en vertical, 80% en horizontal
  const cameraHeight = isLandscape ? height * 0.8 : height * 0.5;
  // Ancho máximo es el ancho disponible menos un margen pequeño
  const cameraWidth = width * 0.95;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Camera
          style={[
            styles.camera,
            {
              width: cameraWidth,
              height: cameraHeight,
            },
          ]}
        />
        <Text style={styles.infoText}>
          Cámara adaptada a la pantalla. Puedes agregar controles o contenido debajo y todo será visible.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    borderRadius: 15,
    backgroundColor: '#000',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: '#444',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default SeasTexto;
