import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

const TextToSign = ({ navigation }) => {
  const [window, setWindow] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => setWindow(window);

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
  }, []);

  const isLandscape = window.width > window.height;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileModal navigation={navigation} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isLandscape ? styles.containerLandscape : styles.containerPortrait,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.videoContainer,
            isLandscape ? styles.videoContainerLandscape : styles.videoContainerPortrait,
          ]}
          accessible
          accessibilityLabel="Video or camera view"
        />

        <FontAwesome
          name="volume-up"
          size={44}
          color="black"
          style={isLandscape ? styles.soundButtonLandscape : styles.soundButtonPortrait}
          accessibilityRole="button"
          accessibilityLabel="Sound toggle button"
          accessibilityHint="Tap to toggle sound"
        />

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Iniciar traducción"
              color="#d8b3ff"
              accessibilityLabel="Start translation"
              onPress={() => {}}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Detener"
              color="#d8b3ff"
              accessibilityLabel="Stop translation"
              onPress={() => {}}
            />
          </View>
        </View>

        <View
          style={[
            styles.textContainer,
            isLandscape ? styles.textContainerLandscape : styles.textContainerPortrait,
          ]}
          accessible
          accessibilityLabel="Text output area"
        />
      </ScrollView>

      <NavigationBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? 5 : 0, // Más arriba
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  containerPortrait: {
    flexDirection: 'column',
  },
  containerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  videoContainer: {
    backgroundColor: '#d3d3d3',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  videoContainerPortrait: {
    width: '100%',
    height: 180,
    marginBottom: 14,
  },
  videoContainerLandscape: {
    width: '45%',
    height: 250,
    marginBottom: 0,
  },
  soundButtonPortrait: {
    marginBottom: 14,
  },
  soundButtonLandscape: {
    marginHorizontal: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 14,
  },
  buttonWrapper: {
    marginHorizontal: 10,
    minWidth: 130,
  },
  textContainer: {
    backgroundColor: '#d3d3d3',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainerPortrait: {
    width: '100%',
    height: 100,
    marginBottom: 0,
  },
  textContainerLandscape: {
    width: '45%',
    height: 250,
  },
});

export default TextToSign;
