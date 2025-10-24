import AsyncStorage from '@react-native-async-storage/async-storage';

// Master shape:
//
// {
//   virtues: { ... },
//   streakCount: number,
//   lastPlayedDate: string|null,
//
//   playerName: string|null,
//   favoriteVerseText: string|null,
//   favoriteVerseRef: string|null,
//
//   // Encouragement
//   sentEncouragements: [
//     { id, toName, messageId, messageText, createdAt }
//   ],
//   receivedEncouragements: [
//     { id, fromName, messageId, messageText, createdAt, read: boolean }
//   ],
//
//   // Prayer
//   prayerRequests: [
//     {
//       id,
//       title,
//       note,
//       createdAt,
//       lastPrayedDate,
//       answered: boolean,
//     },
//   ],
// }

const KEY = 'GRACEQUEST_PLAYER_STATE';

function makeId() {
  return Date.now().toString() + '_' + Math.floor(Math.random() * 1000000);
}

const DEFAULT_STATE = {
  virtues: {},
  streakCount: 0,
  lastPlayedDate: null,

  playerName: null,
  favoriteVerseText: null,
  favoriteVerseRef: null,

  sentEncouragements: [],
  receivedEncouragements: [],

  prayerRequests: [],
};

// -------------- core load/save --------------

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

// Shallow merge
export async function updatePlayerState(patch) {
  const current = await loadPlayerState();
  const updated = { ...current, ...patch };
  await savePlayerState(updated);
  return updated;
}

// -------------- ENCOURAGEMENT --------------

// called when I "send" encouragement to someone
export async function sendEncouragement({
  toName,
  fromName,
  messageId,
  messageText,
  createdAt,
}) {
  const current = await loadPlayerState();

  const newSent = {
    id: makeId(),
    toName,
    messageId,
    messageText,
    createdAt,
  };

  const newReceived = {
    id: makeId(),
    fromName,
    messageId,
    messageText,
    createdAt,
    read: false,
  };

  const updated = {
    ...current,
    sentEncouragements: [newSent, ...(current.sentEncouragements || [])],
    receivedEncouragements: [
      newReceived,
      ...(current.receivedEncouragements || []),
    ],
  };

  await savePlayerState(updated);
  return updated;
}

// mark first unread as read (or mark by id)
export async function markEncouragementRead(id) {
  const current = await loadPlayerState();
  const list = current.receivedEncouragements || [];

  const newList = list.map((item) => {
    if (item.id === id) {
      return { ...item, read: true };
    }
    return item;
  });

  const updated = { ...current, receivedEncouragements: newList };
  await savePlayerState(updated);
  return updated;
}

// -------------- PRAYER --------------

export async function addPrayerRequest({ title, note, createdAt }) {
  const current = await loadPlayerState();
  const list = current.prayerRequests || [];

  const newItem = {
    id: makeId(),
    title,
    note,
    createdAt,
    lastPrayedDate: null,
    answered: false,
  };

  const newList = [newItem, ...list];

  const updated = { ...current, prayerRequests: newList };
  await savePlayerState(updated);
  return updated;
}

export async function markPrayerPrayed(id, todayStr) {
  const current = await loadPlayerState();
  const list = current.prayerRequests || [];

  const newList = list.map((req) => {
    if (req.id === id) {
      return { ...req, lastPrayedDate: todayStr };
    }
    return req;
  });

  const updated = { ...current, prayerRequests: newList };
  await savePlayerState(updated);
  return updated;
}

export async function markPrayerAnswered(id) {
  const current = await loadPlayerState();
  const list = current.prayerRequests || [];

  const newList = list.map((req) => {
    if (req.id === id) {
      return { ...req, answered: true };
    }
    return req;
  });

  const updated = { ...current, prayerRequests: newList };
  await savePlayerState(updated);
  return updated;
}

export async function deletePrayersByIds(idsToDelete) {
  const current = await loadPlayerState();
  const list = current.prayerRequests || [];

  const filtered = list.filter((req) => !idsToDelete.includes(req.id));

  const updated = { ...current, prayerRequests: filtered };
  await savePlayerState(updated);
  return updated;
}
