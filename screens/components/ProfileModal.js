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

import { useTranslation } from 'react-i18next';
import '../components/i18n'; // Asegúrate de cargar la configuración i18n

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

const ProfileModal = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const emails = [
    // Aquí puedes poner los emails si los tienes
  ];

  const menuOptions = [
    { name: t('menu.idioma'), screen: 'IdiomaScreen' },
    { name: t('menu.volumen'), screen: 'VolumenScreen' },
    { name: t('menu.historial'), screen: 'HistorialScreen' },
    { name: t('menu.tutorial'), screen: 'TutorialScreen' },
    { name: t('menu.ayuda'), screen: 'AyudaScreen' },
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
    Alert.alert(
      t('modal.logoutTitle'),
      t('modal.logoutMessage'),
      [
        { text: t('modal.cancel'), style: 'cancel' },
        { text: t('modal.logout'), onPress: () => navigation.navigate('LoginScreen') },
      ],
      { cancelable: false }
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* Header */}
      <LinearGradient colors={['#f0f0f0', '#e0e0e0']} style={[styles.container, {
        paddingTop: insets.top + 10,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
        paddingBottom: 10,
      }]}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>SignSpeak</Text>

        <TouchableOpacity style={styles.profileButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="user" size={24} color="#333" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Overlay para cerrar el menú */}
      {menuVisible && <Pressable style={styles.overlay} onPress={toggleMenu} />}

      {/* Menú lateral */}
      <Animated.View style={[
        styles.menuDrawer,
        { transform: [{ translateX: slideAnim }] },
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
          height: isLandscape ? '100%' : '100%',
        }
      ]}>
        <Text style={styles.menuHeader}>{t('menu.configuraciones')}</Text>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(item.screen);
              toggleMenu();
            }}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={toggleDarkMode} style={[styles.menuItem, styles.themeButton]}>
          <Text style={styles.menuText}>
            {isDarkMode ? t('menu.modoClaro') : t('menu.modoOscuro')}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={closeModal}>
        <Pressable style={[styles.modalOverlay, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]} onPress={closeModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>{t('modal.elegirCuenta')}</Text>
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
                  <Text style={styles.accountText}>{t('modal.agregarCuenta')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('PrivacidadScreen')}>
                <Text style={styles.footerText}>{t('modal.politicasPrivacidad')}</Text>
              </TouchableOpacity>
              <View style={styles.footerButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
                  <Text style={styles.footerButtonText}>{t('modal.editarPerfil')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.footerButtonText}>{t('modal.cerrarSesion')}</Text>
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
    width: '100%',
    marginTop: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    elevation: 5,
    zIndex: 1,
    overflow: 'hidden',
  },
  menuButton: {
    padding: 10,
  },
  profileButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
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
    borderWidth: 1,
    borderColor: '#ddd',
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
    color: '#333',
  },
});

export default ProfileModal;
