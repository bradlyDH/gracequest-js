import AsyncStorage from '@react-native-async-storage/async-storage';

// Shape we'll store:
// {
//   virtues: {
//     PATIENCE: { xp: 50, level: 2 },
//     FAITH:    { xp: 10, level: 1 },
//     ...
//   },
//   streakCount: 3,
//   lastPlayedDate: "2025-10-24"
// }

const KEY = 'GRACEQUEST_PLAYER_STATE';

export async function loadPlayerState() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw
      ? JSON.parse(raw)
      : {
          virtues: {},
          streakCount: 0,
          lastPlayedDate: null,
        };
  } catch (e) {
    console.warn('loadPlayerState error', e);
    return {
      virtues: {},
      streakCount: 0,
      lastPlayedDate: null,
    };
  }
}

export async function savePlayerState(stateObj) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(stateObj));
  } catch (e) {
    console.warn('savePlayerState error', e);
  }
}
