import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View
        style={[
          styles.container,
          isPortrait ? styles.containerPortrait : styles.containerLandscape,
        ]}
      >
        <Image
          source={require('../assets/LOGO.12345678.jpg')}
          style={[
            styles.logo,
            isPortrait ? styles.logoPortrait : styles.logoLandscape,
          ]}
        />

        <Text style={styles.title}>Registro con redes sociales</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/facebook.12345678.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/gmail.12345678.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.emailButton,
            isPortrait ? { width: '80%' } : { width: 300 },
          ]}
          onPress={() => navigation.navigate('Registercorreo')}
        >
          <Text style={styles.emailButtonText}>Registrarse con correo electrónico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.loginLink}
        >
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
    justifyContent: 'center', // CENTRAR TODO VERTICAL Y HORIZONTAL
    padding: 20,
  },
  containerLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // CENTRAR FILAS HORIZONTALES
    alignItems: 'center',
  },
  containerPortrait: {
    flexDirection: 'column',
  },
  logo: {
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logoPortrait: {
    width: 200,
    height: 200,
  },
  logoLandscape: {
    width: 150,
    height: 150,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
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
  emailButton: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#6a1b9a',
    textAlign: 'center',
  },
});

export default RegisterScreen;
