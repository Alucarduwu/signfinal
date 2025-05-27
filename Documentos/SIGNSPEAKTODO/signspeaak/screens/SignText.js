import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';
import { FontAwesome } from '@expo/vector-icons';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig'; // Ajusta esta ruta según dónde tengas tu archivo

import ProfileModal from './components/ProfileModal'; // Asegúrate de que la ruta sea correcta
import NavigationBar from './components/NavigationBar'; // Barra de navegación

const storage = getStorage(app);
const firestore = getFirestore(app);

const SignText = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const cameraRef = useRef(null);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const speakText = () => {
    Speech.speak(translatedText || "Texto de ejemplo");
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      await uploadVideo(video.uri);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const uploadVideo = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `videos/${Date.now()}.mp4`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      await addDoc(collection(firestore, "videos"), { url: downloadURL });
      setVideoURL(downloadURL);
      console.log("Video guardado en:", downloadURL);
    } catch (error) {
      console.error("Error subiendo el video:", error);
    }
    setUploading(false);
  };

  if (hasPermission === null) return <ActivityIndicator size="large" />;
  if (hasPermission === false) return <Text>No hay acceso a la cámara</Text>;

  return (
    
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />
      <View style={styles.cameraContainer}>
        {isCameraOpen && (
          <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Iniciar" onPress={() => setIsCameraOpen(true)} color={isCameraOpen ? "#ccc" : "#4CAF50"} />
        <Button title="Detener" onPress={() => setIsCameraOpen(false)} color={!isCameraOpen ? "#ccc" : "#f44336"} />
      </View>

      <View style={styles.textContainer}>
        <Text>{translatedText || "Texto traducido aparecerá aquí..."}</Text>
      </View>

      <TouchableOpacity onPress={speakText} style={styles.voiceButton}>
        <FontAwesome name="volume-up" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? "Detener Grabación" : "Grabar Video"}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={uploading}
        />
      </View>

      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {videoURL && <Text>Video subido exitosamente: {videoURL}</Text>}
      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  cameraContainer: { flex: 4, backgroundColor: 'black', borderRadius: 10 },
  camera: { flex: 1 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  textContainer: { flex: 2, backgroundColor: '#fff', padding: 15, borderRadius: 10 },
  voiceButton: { backgroundColor: '#2196F3', padding: 15, borderRadius: 30, alignSelf: 'center' }
});

export default SignText;
