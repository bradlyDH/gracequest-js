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
  const { virtue, score, total, rewardVerse, baseXp } = route.params;

  const [newLevel, setNewLevel] = useState(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);

  useEffect(() => {
    (async () => {
      // 1. Load current state
      const state = await loadPlayerState();
      // ensure virtues map exists
      const currentVirtues = state.virtues || {};

      // 2. Calculate XP gain for this quest
      // ratio of "Christ-like" choices
      const ratio = score / total;
      const gained = Math.round(baseXp * ratio);
      setXpEarned(gained);

      // 3. Update virtue XP/level
      const { newProgressObj, newLevel } = awardVirtueXp(
        currentVirtues,
        virtue,
        gained
      );
      setNewLevel(newLevel);

      // 4. Streak logic
      const today = getTodayString();
      let nextStreak = state.streakCount || 0;
      const lastDate = state.lastPlayedDate;

      if (!lastDate) {
        // first time ever playing
        nextStreak = 1;
      } else if (lastDate === today) {
        // already played today: streak doesn't change
        nextStreak = state.streakCount || 1;
      } else if (isYesterday(lastDate, today)) {
        // kept streak going
        nextStreak = (state.streakCount || 0) + 1;
      } else {
        // broke streak, reset
        nextStreak = 1;
      }

      setStreakCount(nextStreak);
      setLastPlayedDate(today);

      // 5. Save new state
      const newStateToSave = {
        virtues: newProgressObj,
        streakCount: nextStreak,
        lastPlayedDate: today,
      };

      await savePlayerState(newStateToSave);
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

      <View style={styles.streakBox}>
        <Text style={styles.streakTitle}>Streak 🔥</Text>
        <Text style={styles.streakText}>
          {streakCount} day{streakCount === 1 ? '' : 's'} in a row
        </Text>
        {lastPlayedDate && (
          <Text style={styles.streakMeta}>Last played: {lastPlayedDate}</Text>
        )}
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
  streakBox: {
    backgroundColor: '#fff6e0',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#ffdd8a',
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
