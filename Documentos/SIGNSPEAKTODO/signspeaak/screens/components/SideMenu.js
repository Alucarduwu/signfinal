import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SideMenu = ({ slideAnim, toggleMenu, navigation }) => {
  {menuVisible && (
          <Animated.View style={[styles.menuDrawer, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity onPress={toggleMenu} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.menuHeader}>Configuraciones</Text>
            <TouchableOpacity onPress={() => navigation.navigate('IdiomaScreen')}>
              <Text style={styles.menuText}>Idioma</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VolumenScreen')}>
              <Text style={styles.menuText}>Volumen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HistorialScreen')}>
              <Text style={styles.menuText}>Historial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TutorialScreen')}>
              <Text style={styles.menuText}>Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

const styles = StyleSheet.create({
    menu: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 250, backgroundColor: '#fff', padding: 20 },
    closeMenu: { marginBottom: 20 },
    menuItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }
  });

export default SideMenu;
