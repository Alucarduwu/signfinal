import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // asegúrate de importar la configuración

import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <ProfileModal navigation={navigation} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isLandscape && styles.scrollContentLandscape,
        ]}
      >
        <Text style={styles.lastUpdate}>{t('ultima_actualizacion')}</Text>
        <Text style={styles.headerTitle}>{t('bienvenida')}</Text>

        <Text style={styles.sectionTitle}>{t('info_recopilada')}</Text>
        <Text style={styles.text}>{t('detalles_recopilacion')}</Text>

        <Text style={styles.sectionTitle}>{t('uso_info')}</Text>
        <Text style={styles.text}>{t('detalles_uso')}</Text>

        <Text style={styles.sectionTitle}>{t('no_compartimos')}</Text>
        <Text style={styles.text}>{t('detalles_no_compartimos')}</Text>

        <Text style={styles.sectionTitle}>{t('tus_derechos')}</Text>
        <Text style={styles.text}>{t('detalles_derechos')}</Text>

        <Text style={styles.sectionTitle}>{t('contacto')}</Text>
        <Text style={styles.text}>
          {t('correo_contacto')}
          <Text style={styles.email}> anahydlira@gmail.com</Text>
        </Text>
      </ScrollView>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  containerLandscape: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 80 },
  scrollContentLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lastUpdate: { fontSize: 14, color: '#666', marginBottom: 10, width: '100%' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 15, marginBottom: 5, width: '100%' },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'justify',
    width: '100%',
  },
  email: { color: '#007AFF' },
});

export default PrivacyPolicyScreen;
