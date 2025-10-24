import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { loadPlayerState } from '../storage/progressStorage';
import VirtueBar from '../components/VirtueBar';

export default function ProgressScreen({ navigation }) {
  const [virtues, setVirtues] = useState({});
  const [streakCount, setStreakCount] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);

  useEffect(() => {
    (async () => {
      const state = await loadPlayerState();
      setVirtues(state.virtues || {});
      setStreakCount(state.streakCount || 0);
      setLastPlayedDate(state.lastPlayedDate || null);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Growth in Grace 🌱</Text>

      <Text style={styles.meta}>
        Streak: {streakCount} day{streakCount === 1 ? '' : 's'} in a row 🔥
      </Text>

      <Text style={styles.meta}>
        Last played: {lastPlayedDate ? lastPlayedDate : '—'}
      </Text>

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
        style={styles.homeBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600' },
  meta: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    marginBottom: 12,
  },
  homeBtn: {
    marginTop: 24,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#4b6fff',
    fontWeight: '600',
  },
});
