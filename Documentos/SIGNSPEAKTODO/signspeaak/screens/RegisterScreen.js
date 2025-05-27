import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/LOGO.12345678.jpg')} style={styles.logo} />

        <Text style={styles.title}>Registro con redes sociales</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/facebook.12345678.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/gmail.12345678.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.emailButton} onPress={() => navigation.navigate('Registercorreo')}>
          <Text style={styles.emailButtonText}>Registrarse con correo electrónico</Text>
        </TouchableOpacity>

        {/* ✅ Ya tengo cuenta separado con marginBottom */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginLink}>
          <Text style={styles.loginText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 200, // ✅ Más grande
    height: 200,
    marginTop: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
    color: '#333',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 3,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  dividerContainer: {
    width: '80%',
    marginVertical: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emailButton: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    marginBottom: 20, // ✅ Separado del borde inferior
  },
  loginText: {
    fontSize: 16,
    color: '#6a1b9a',
  },
});

export default RegisterScreen;
