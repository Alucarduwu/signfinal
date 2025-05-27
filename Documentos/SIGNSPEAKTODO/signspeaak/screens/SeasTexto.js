import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const SeasTexto = () => {
  const [hasPermission, setHasPermission] = useState(null);

  // Solicitar permisos de cámara
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No se puede acceder a la cámara</Text>;

  return (
    <View style={styles.container}>
      {/* Vista de Cámara */}
      <Camera style={styles.camera} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },
});

export default SeasTexto;