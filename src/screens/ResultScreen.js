import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { loadPlayerState, savePlayerState } from '../storage/progressStorage';
import { awardVirtueXp } from '../logic/xpSystem';
import { getTodayString, isYesterday } from '../logic/dateUtils';

export default function ResultScreen({ route, navigation }) {
  const { virtue, score, total, rewardVerse, baseXp, color, emoji } =
    route.params;

  const [newLevel, setNewLevel] = useState(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      if (saved) return;
      setSaved(true);

      const state = await loadPlayerState();
      const currentVirtues = state.virtues || {};

      // XP gain from this run
      const ratio = score / total;
      const gained = Math.round(baseXp * ratio);
      setXpEarned(gained);

      const { newProgressObj, newLevel } = awardVirtueXp(
        currentVirtues,
        virtue,
        gained
      );
      setNewLevel(newLevel);

      // streak/update last played
      const today = getTodayString();
      let nextStreak = state.streakCount || 0;
      const prevDate = state.lastPlayedDate;

      if (!prevDate) {
        nextStreak = 1;
      } else if (prevDate === today) {
        nextStreak = state.streakCount || 1;
      } else if (isYesterday(prevDate, today)) {
        nextStreak = (state.streakCount || 0) + 1;
      } else {
        nextStreak = 1;
      }

      setStreakCount(nextStreak);
      setLastPlayedDate(today);

      const newStateToSave = {
        virtues: newProgressObj,
        streakCount: nextStreak,
        lastPlayedDate: today,
      };

      await savePlayerState(newStateToSave);
    })();
  }, [virtue, score, total, rewardVerse, baseXp, saved]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color }]}>
        {emoji} You grew in {virtue} today.
      </Text>

      <Text style={styles.scoreText}>
        You chose Christ-like answers {score} / {total} times.
      </Text>

      <Text style={styles.scoreText}>
        +{xpEarned} XP in {virtue}
      </Text>

      {newLevel && (
        <Text style={[styles.levelText, { color }]}>
          {virtue} Level: {newLevel}
        </Text>
      )}

      <View style={[styles.verseBox, { borderColor: color + '55' }]}>
        <Text style={styles.verseText}>"{rewardVerse.text}"</Text>
        <Text style={styles.verseRef}>{rewardVerse.ref}</Text>
      </View>

      <View style={[styles.streakBox, { borderColor: color + '55' }]}>
        <Text style={styles.streakTitle}>Streak 🔥</Text>
        <Text style={styles.streakText}>
          {streakCount} day{streakCount === 1 ? '' : 's'} in a row
        </Text>
        {lastPlayedDate && (
          <Text style={styles.streakMeta}>Last played: {lastPlayedDate}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.primaryBtnText}>View My Progress 🌱</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[styles.secondaryBtnText, { color }]}>Back to Home</Text>
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 16,
    marginTop: 8,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  verseBox: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 2,
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
  streakBox: {
    backgroundColor: '#fff6e0',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 2,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  streakText: {
    fontSize: 16,
    marginTop: 4,
  },
  streakMeta: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  primaryBtn: {
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
    fontWeight: '600',
  },
});
