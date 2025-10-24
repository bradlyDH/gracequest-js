import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import VirtueBar from '../components/VirtueBar';
import { loadPlayerState } from '../storage/progressStorage';
import { dailyQuest } from '../data/dailyQuest_sample';

export default function HomeScreen({ navigation }) {
  const [virtues, setVirtues] = useState({});

  useEffect(() => {
    (async () => {
      const state = await loadPlayerState();
      setVirtues(state.virtues || {});
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hi there 👋</Text>
      <Text style={styles.subtitle}>Your quest for today is ready.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Quest</Text>
        <Text style={styles.cardVirtue}>Virtue: {dailyQuest.virtue}</Text>
        <Text style={styles.cardLength}>Length: ~2 minutes</Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            navigation.navigate('Quest', { quest: dailyQuest });
          }}
        >
          <Text style={styles.startButtonText}>Start Quest ▶</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Your Growth</Text>

      <VirtueBar
        virtue="FAITH"
        level={virtues.FAITH?.level || 1}
        xp={virtues.FAITH?.xp || 0}
      />
      <VirtueBar
        virtue="LOVE"
        level={virtues.LOVE?.level || 1}
        xp={virtues.LOVE?.xp || 0}
      />
      <VirtueBar
        virtue="PATIENCE"
        level={virtues.PATIENCE?.level || 1}
        xp={virtues.PATIENCE?.xp || 0}
      />
      <VirtueBar
        virtue="KINDNESS"
        level={virtues.KINDNESS?.level || 1}
        xp={virtues.KINDNESS?.xp || 0}
      />

      <TouchableOpacity
        style={styles.progressButton}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.progressButtonText}>View Full Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  greeting: { fontSize: 24, fontWeight: '600' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardVirtue: { marginTop: 8, fontSize: 16 },
  cardLength: { fontSize: 14, color: '#666', marginBottom: 12 },
  startButton: {
    backgroundColor: '#4b6fff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: { color: '#fff', fontWeight: '600' },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  progressButton: { marginTop: 24, alignSelf: 'center' },
  progressButtonText: { color: '#4b6fff', fontWeight: '600' },
});
