import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EasyTV iOS App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Hazır!</Text>
        <Text style={styles.description}>Expo + EAS Build ile iOS uygulaması oluşturuluyor</Text>
        <Text style={styles.info}>Version: 4.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  info: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
  },
});
