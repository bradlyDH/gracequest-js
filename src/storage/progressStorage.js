import AsyncStorage from '@react-native-async-storage/async-storage';

// Shape in storage:
// {
//   virtues: {
//     PATIENCE: { xp: number, level: number },
//     FAITH: { xp, level },
//     ...
//   },
//   streakCount: number,
//   lastPlayedDate: "YYYY-MM-DD" | null,
//   playerName: string | null,
//   favoriteVerseText: string | null,
//   favoriteVerseRef: string | null,
// }

const KEY = 'GRACEQUEST_PLAYER_STATE';

const DEFAULT_STATE = {
  virtues: {},
  streakCount: 0,
  lastPlayedDate: null,
  playerName: null,
  favoriteVerseText: null,
  favoriteVerseRef: null,
};

export async function loadPlayerState() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_STATE };
  } catch (e) {
    console.warn('loadPlayerState error', e);
    return { ...DEFAULT_STATE };
  }
}

export async function savePlayerState(stateObj) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(stateObj));
  } catch (e) {
    console.warn('savePlayerState error', e);
  }
}

// convenience: "merge" changes (like setName)
// loads current, merges keys, writes back
export async function updatePlayerState(patch) {
  const current = await loadPlayerState();
  const updated = { ...current, ...patch };
  await savePlayerState(updated);
  return updated;
}
