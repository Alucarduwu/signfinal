import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileModal from '../screens/components/ProfileModal';
import NavigationBar from '../screens/components/NavigationBar';

const AyudaScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleSave = () => {
    Alert.alert(t('help.commentSaved'));
  };

  return (
    <View style={styles.container}>
      <ProfileModal navigation={navigation} />

      <ScrollView contentContainerStyle={[styles.content, isLandscape && styles.contentLandscape]}>
        <View style={isLandscape ? styles.leftColumn : null}>
          <Text style={styles.title}>{t('help.title')}</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://tutorial.link')}
            accessibilityRole="link"
          >
            {t('help.tutorialLink')}
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://privacidad.link')}
            accessibilityRole="link"
          >
            {t('help.privacyLink')}
          </Text>
          <Text style={styles.question}>{t('help.question')}</Text>
        </View>

        <View style={isLandscape ? styles.rightColumn : null}>
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder={t('help.placeholder')}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('help.save')}</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>{t('help.footer')}</Text>
        </View>
      </ScrollView>

      <NavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flexGrow: 1,
    padding: 20,
    marginTop: 80,
    marginBottom: 60,
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: '#3B82F6',
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  question: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  inputLandscape: {
    height: 200,
  },
  saveButton: {
    backgroundColor: '#E9D5FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});

export default AyudaScreen;
