import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { loadProgress, saveProgress } from '../storage/progressStorage';
import { awardVirtueXp } from '../logic/xpSystem';

export default function ResultScreen({ route, navigation }) {
  const { virtue, score, total, rewardVerse, baseXp } = route.params;
  const [newLevel, setNewLevel] = useState(null);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    (async () => {
      // load current XP from storage
      const current = await loadProgress();

      // XP is based on how many Christ-like answers they chose
      const ratio = score / total;
      const gained = Math.round(baseXp * ratio);
      setXpEarned(gained);

      const { newProgressObj, newLevel } = awardVirtueXp(
        current,
        virtue,
        gained
      );

      setNewLevel(newLevel);
      await saveProgress(newProgressObj);
    })();
  }, [virtue, score, total, rewardVerse, baseXp]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Well done 🙌</Text>

      <Text style={styles.sub}>You grew in {virtue} today.</Text>

      <Text style={styles.scoreText}>
        You chose Christ-like answers {score} / {total} times.
      </Text>

      <Text style={styles.scoreText}>
        +{xpEarned} XP in {virtue}
      </Text>

      {newLevel && (
        <Text style={styles.levelText}>
          {virtue} Level: {newLevel}
        </Text>
      )}

      <View style={styles.verseBox}>
        <Text style={styles.verseText}>"{rewardVerse.text}"</Text>
        <Text style={styles.verseRef}>{rewardVerse.ref}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.primaryBtnText}>View My Progress 🌱</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.secondaryBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  sub: {
    fontSize: 16,
    marginTop: 8,
  },
  scoreText: {
    fontSize: 16,
    marginTop: 16,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    color: '#4b6fff',
  },
  verseBox: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  verseRef: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: '#4b6fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryBtnText: {
    color: '#4b6fff',
    fontWeight: '600',
  },
});
