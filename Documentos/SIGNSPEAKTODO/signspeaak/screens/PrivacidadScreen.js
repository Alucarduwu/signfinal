import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import '../screens/components/i18n'; // asegúrate de importar la configuración

import ProfileModal from './components/ProfileModal';
import NavigationBar from './components/NavigationBar';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 80 },
  lastUpdate: { fontSize: 14, color: '#666', marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 15, marginBottom: 5 },
  text: { fontSize: 16, color: '#333', marginBottom: 15, textAlign: 'justify' },
  email: { color: '#007AFF' },
});

export default PrivacyPolicyScreen;
