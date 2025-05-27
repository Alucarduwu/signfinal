import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const NavigationBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // <-- Para evitar superposición con botones del sistema

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: () => navigation.navigate('LoginScreen') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.navBar, { paddingBottom: insets.bottom || (Platform.OS === 'android' ? 15 : 0) }]}>
      <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
        <FontAwesome name="user" size={28} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <FontAwesome name="home" size={28} color="#4a148c" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
        <FontAwesome name="question-circle" size={28} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome name="sign-out" size={28} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default NavigationBar;
