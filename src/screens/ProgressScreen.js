import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { loadProgress } from '../storage/progressStorage';
import VirtueBar from '../components/VirtueBar';

export default function ProgressScreen({ navigation }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    (async () => {
      const p = await loadProgress();
      setProgress(p);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Growth in Grace 🌱</Text>
      <Text style={styles.meta}>Streak: (coming soon)</Text>
      <Text style={styles.meta}>Last played: (coming soon)</Text>

      <VirtueBar
        virtue="FAITH"
        level={progress.FAITH?.level || 1}
        xp={progress.FAITH?.xp || 0}
      />
      <VirtueBar
        virtue="LOVE"
        level={progress.LOVE?.level || 1}
        xp={progress.LOVE?.xp || 0}
      />
      <VirtueBar
        virtue="PATIENCE"
        level={progress.PATIENCE?.level || 1}
        xp={progress.PATIENCE?.xp || 0}
      />
      <VirtueBar
        virtue="KINDNESS"
        level={progress.KINDNESS?.level || 1}
        xp={progress.KINDNESS?.xp || 0}
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
