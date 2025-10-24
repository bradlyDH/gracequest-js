import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // After a short delay, go to Home
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 1200); // ~1.2s feels snappy, not laggy

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoCross}>✝️</Text>
      </View>

      <Text style={styles.appName}>GraceQuest</Text>

      <Text style={styles.tagline}>Grow in Christ, daily.</Text>

      <ActivityIndicator style={styles.spinner} size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff', // soft gentle background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4b6fff10', // faint brand color tint
    borderWidth: 2,
    borderColor: '#4b6fff55',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoCross: {
    fontSize: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  tagline: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 24,
  },
});
