import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Modal,
  Pressable,
  Animated,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProfileModal = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro
  const emails = [
    
  ];

  // Opciones del menú con sus pantallas correspondientes
  const menuOptions = [
    { name: 'Idioma', screen: 'IdiomaScreen' },
    { name: 'Volumen', screen: 'VolumenScreen' },
    { name: 'Historial', screen: 'HistorialScreen' },
    { name: 'Tutorial', screen: 'TutorialScreen' },
    { name: 'Ayuda', screen: 'AyudaScreen' },
  ];

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    // Mostrar un mensaje de confirmación antes de cerrar sesión
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: () => navigation.navigate('LoginScreen'), // Navega a LoginScreen
        },
      ],
      { cancelable: false }
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Alterna entre modo claro y oscuro
  };

  return (
    <>
      {/* Header */}
      <LinearGradient colors={['#f0f0f0', '#e0e0e0']} style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>SignSpeak</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="user" size={24} color="#333" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Overlay para cerrar el menú */}
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={toggleMenu} />
      )}

      {/* Menú que se superpone sobre toda la pantalla */}
      <Animated.View style={[styles.menuDrawer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.menuHeader}>Configuraciones</Text>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(item.screen); // Navega a la pantalla correspondiente
              toggleMenu(); // Cierra el menú después de navegar
            }}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        
        {/* Agregamos el botón para cambiar de claro a oscuro */}
        <TouchableOpacity
          onPress={toggleDarkMode}
          style={[styles.menuItem, styles.themeButton]}
        >
          <Text style={styles.menuText}>
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Elegir cuenta</Text>
            <View style={styles.accountListContainer}>
              <View style={styles.accountList}>
                {emails.map((email, index) => (
                  <TouchableOpacity key={index} style={styles.accountItem}>
                    <FontAwesome name="circle" size={16} color="#666" />
                    <Text style={styles.accountText}>{email}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.accountItem}>
                  <FontAwesome name="plus-square" size={16} color="#666" />
                  <Text style={styles.accountText}>Agregar nueva cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('PrivacidadScreen')}>
                <Text style={styles.footerText}>Políticas de privacidad</Text>
              </TouchableOpacity>
              <View style={styles.footerButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
                  <Text style={styles.footerButtonText}>Editar perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.footerButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%', // Asegura que ocupe todo el ancho
    marginTop: 0.5, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, // Evita que la barra de estado lo oculte
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 20, // Aplica el redondeo a todos los bordes
    backgroundColor: '#f0f0f0',
    elevation: 5,
    zIndex: 1,
    overflow: 'hidden', // Asegura que los bordes redondeados se respeten
  },
  menuButton: {
    padding: 10,
  },
  profileButton: {
    padding: 10,
    backgroundColor: '#e0e0e0', // Fondo gris claro
    borderRadius: 20, // Bordes redondeados
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    zIndex: 100,
  },
  menuHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  themeButton: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1, // Borde del modal
    borderColor: '#ddd', // Color del borde
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  accountList: {
    width: '100%',
    marginBottom: 20,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  accountText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerButtonText: {
    fontSize: 14,
    color: '#333', // Color gris oscuro
  },
});

export default ProfileModal;
