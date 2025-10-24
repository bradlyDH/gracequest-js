import AsyncStorage from '@react-native-async-storage/async-storage';

// We'll store data shaped like:
// {
//   "PATIENCE": { xp: 50, level: 2 },
//   "FAITH":    { xp: 10, level: 1 },
//   ...
// }

const KEY = 'GRACEQUEST_VIRTUE_PROGRESS';

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('loadProgress error', e);
    return {};
  }
}

export async function saveProgress(progressObj) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(progressObj));
  } catch (e) {
    console.warn('saveProgress error', e);
  }
}
