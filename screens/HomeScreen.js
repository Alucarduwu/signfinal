import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const navigation = useNavigation();
  const logoScale = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(() => navigation.navigate('RegisterScreen'), 300);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignSpeak</Text>
      <Animated.Image source={require('../assets/LOGO.12345678.jpg')} style={[styles.logo, { transform: [{ scale: logoScale }] }]} />
      <Text style={styles.description}>
        Una aplicación innovadora que traduce lenguaje de señas a texto y voz en tiempo real, facilitando la comunicación entre personas sordas y oyentes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f3e5f5' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#6a1b9a', marginBottom: 20 },
  logo: { width: 200, height: 200, marginVertical: 20 },
  description: { fontSize: 16, textAlign: 'center', color: '#4a148c' },
});
