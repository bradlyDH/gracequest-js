import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import VirtueBar from '../components/VirtueBar';
import { loadPlayerState } from '../storage/progressStorage';
import { getTodayString } from '../logic/dateUtils';
import { getTodaysQuest } from '../logic/todaysQuest';

export default function HomeScreen({ navigation }) {
  const [virtues, setVirtues] = useState({});
  const [streakCount, setStreakCount] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);

  const [playerName, setPlayerName] = useState(null);
  const [favoriteVerseText, setFavoriteVerseText] = useState(null);
  const [favoriteVerseRef, setFavoriteVerseRef] = useState(null);

  const [receivedEncouragements, setReceivedEncouragements] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);

  const todaysQuest = useMemo(() => getTodaysQuest(), []);
  const { virtue, emoji, color } = todaysQuest;

  const today = getTodayString();
  const alreadyCompletedToday = lastPlayedDate === today;

  // We'll pick the first encouragement and first prayer for now.
  const todaysEncouragement =
    encouragementNotes.length > 0 ? encouragementNotes[0] : null;

  // pick the first active (unanswered) request
  const activeOnly = prayerRequests.filter((r) => !r.answered);
  const todaysPrayer = activeOnly.length > 0 ? activeOnly[0] : null;

  useEffect(() => {
    (async () => {
      const state = await loadPlayerState();

      setVirtues(state.virtues || {});
      setStreakCount(state.streakCount || 0);
      setLastPlayedDate(state.lastPlayedDate || null);

      setPlayerName(state.playerName || null);
      setFavoriteVerseText(state.favoriteVerseText || null);
      setFavoriteVerseRef(state.favoriteVerseRef || null);

      setEncouragementNotes(state.encouragementNotes || []);
      setPrayerRequests(state.prayerRequests || []);
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting / Profile */}
      <View style={styles.headerBlock}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>
            {playerName ? `Welcome back, ${playerName} 🙏` : 'Hi there 👋'}
          </Text>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {favoriteVerseText ? (
          <View style={styles.favoriteVerseBox}>
            <Text style={styles.favoriteVerseText}>"{favoriteVerseText}"</Text>
            {favoriteVerseRef ? (
              <Text style={styles.favoriteVerseRef}>{favoriteVerseRef}</Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.favoriteVerseHint}>
            Add your favorite verse so you see truth first thing.
          </Text>
        )}
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <Text style={styles.streakMain}>
          {streakCount} day{streakCount === 1 ? '' : 's'} in a row 🔥
        </Text>
        {lastPlayedDate ? (
          <Text style={styles.streakSub}>Last played: {lastPlayedDate}</Text>
        ) : (
          <Text style={styles.streakSub}>Start your first day today 🙏</Text>
        )}
      </View>

      {/* Today's Encouragement */}
      <View style={styles.blockCard}>
        <View style={styles.blockHeaderRow}>
          <Text style={styles.blockTitle}>Today’s Encouragement 💬</Text>
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() => navigation.navigate('Encourage')}
          >
            <Text style={styles.smallBtnText}>Write One</Text>
          </TouchableOpacity>
        </View>

        {todaysEncouragement ? (
          <>
            {todaysEncouragement.toName ? (
              <Text style={styles.blockMeta}>
                For {todaysEncouragement.toName}
              </Text>
            ) : null}
            <Text style={styles.blockBody}>{todaysEncouragement.text}</Text>
          </>
        ) : (
          <Text style={styles.blockEmpty}>
            You haven't written an encouragement yet. Speak life into someone
            you love.
          </Text>
        )}
      </View>

      {/* Prayer Focus */}
      <View style={styles.blockCard}>
        <View style={styles.blockHeaderRow}>
          <Text style={styles.blockTitle}>Prayer Focus 🙏</Text>
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() => navigation.navigate('Prayer')}
          >
            <Text style={styles.smallBtnText}>Add Prayer</Text>
          </TouchableOpacity>
        </View>

        {todaysPrayer ? (
          <>
            <Text style={styles.blockMeta}>{todaysPrayer.title}</Text>
            {todaysPrayer.note ? (
              <Text style={styles.blockBody}>{todaysPrayer.note}</Text>
            ) : null}
            <Text style={styles.blockFoot}>
              Last prayed:{' '}
              {todaysPrayer.lastPrayedDate ? todaysPrayer.lastPrayedDate : '—'}
            </Text>
          </>
        ) : (
          <Text style={styles.blockEmpty}>
            No requests yet. Add someone (or yourself) to pray for today.
          </Text>
        )}
      </View>

      {/* Today's Quest */}
      <View style={[styles.card, { borderColor: color + '55' }]}>
        {!alreadyCompletedToday ? (
          <>
            <Text style={styles.cardTitle}>Today's Quest</Text>
            <Text style={styles.cardVirtue}>
              Virtue: {emoji} {virtue}
            </Text>
            <Text style={styles.cardLength}>Length: ~2 minutes</Text>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: color }]}
              onPress={() => {
                navigation.navigate('Quest', { quest: todaysQuest });
              }}
            >
              <Text style={styles.startButtonText}>Start Quest ▶</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>Today's Quest is Complete 🙌</Text>
            <Text style={styles.cardDoneText}>
              You’ve already grown in {virtue.toLowerCase()} today. Come back
              tomorrow to keep your streak going.
            </Text>

            <TouchableOpacity
              style={[styles.progressLinkButton, { backgroundColor: color }]}
              onPress={() => navigation.navigate('Progress')}
            >
              <Text style={styles.progressLinkButtonText}>
                View My Progress 🌱
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Growth bars */}
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
        <Text style={styles.progressButtonText}>See My Progress ➜</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },

  headerBlock: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    maxWidth: '70%',
  },
  profileButton: {
    backgroundColor: '#4b6fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  favoriteVerseBox: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  favoriteVerseText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 20,
  },
  favoriteVerseRef: {
    fontSize: 13,
    color: '#4b6fff',
    fontWeight: '500',
    marginTop: 6,
  },
  favoriteVerseHint: {
    fontSize: 13,
    color: '#777',
    marginTop: 12,
  },

  streakCard: {
    backgroundColor: '#fff6e0',
    borderColor: '#ffdd8a',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  streakMain: {
    fontSize: 16,
    fontWeight: '600',
  },
  streakSub: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },

  blockCard: {
    borderRadius: 16,
    backgroundColor: '#f8f9ff',
    borderWidth: 2,
    borderColor: '#ccd2ff',
    padding: 16,
    marginBottom: 24,
  },
  blockHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  smallBtn: {
    backgroundColor: '#4b6fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  smallBtnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  blockMeta: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 4,
  },
  blockBody: {
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },
  blockFoot: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  blockEmpty: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardVirtue: { marginTop: 8, fontSize: 16, fontWeight: '500' },
  cardLength: { fontSize: 14, color: '#666', marginBottom: 12 },

  startButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  cardDoneText: {
    fontSize: 15,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },

  progressLinkButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  progressLinkButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  progressButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
  progressButtonText: {
    color: '#4b6fff',
    fontWeight: '600',
  },
});
