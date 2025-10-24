import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  addPrayerRequest,
  loadPlayerState,
  markPrayerPrayed,
  markPrayerAnswered,
  deletePrayersByIds,
} from '../storage/progressStorage';
import { getTodayString } from '../logic/dateUtils';

export default function PrayerScreen({ navigation }) {
  // Form state
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [savedNotice, setSavedNotice] = useState('');

  // Requests
  const [activeRequests, setActiveRequests] = useState([]);
  const [answeredRequests, setAnsweredRequests] = useState([]);

  // Multi-select delete
  const [selectedIds, setSelectedIds] = useState([]);

  async function refresh() {
    const state = await loadPlayerState();
    const all = state.prayerRequests || [];

    const active = all.filter((r) => !r.answered);
    const answered = all.filter((r) => r.answered);

    setActiveRequests(active);
    setAnsweredRequests(answered);

    // clean up selection if some got archived/deleted
    setSelectedIds((ids) =>
      ids.filter((id) => active.some((r) => r.id === id))
    );
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd() {
    if (!title.trim() && !note.trim()) {
      setSavedNotice('Please write something to pray for 🙏');
      return;
    }

    await addPrayerRequest({
      title: title.trim() || '(no title)',
      note: note.trim() || '',
      createdAt: getTodayString(),
    });

    setTitle('');
    setNote('');
    setSavedNotice('Request added 🙏');

    await refresh();

    setTimeout(() => setSavedNotice(''), 3000);
  }

  async function handlePrayed(id) {
    await markPrayerPrayed(id, getTodayString());
    await refresh();
  }

  async function handleAnswered(id) {
    await markPrayerAnswered(id);
    await refresh();
  }

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  async function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    await deletePrayersByIds(selectedIds);
    await refresh();
  }

  async function handleDeleteSingle(id) {
    await deletePrayersByIds([id]);
    await refresh();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header / Info */}
      <View style={styles.topHeaderSection}>
        <Text style={styles.header}>Prayer Requests 🙏</Text>
        <Text style={styles.sub}>
          Bring these to the Lord. You can mark "prayed today", mark as
          answered, select and remove, and add new requests.
        </Text>
      </View>

      {/* Add Request Form */}
      <View style={styles.section}>
        <Text style={styles.label}>Request title</Text>
        <TextInput
          style={styles.input}
          placeholder="Mom's surgery, My anxiety, etc."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label2}>Details</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Tuesday morning, healing, peace..."
          placeholderTextColor="#999"
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      {savedNotice ? (
        <Text style={styles.savedNotice}>{savedNotice}</Text>
      ) : null}

      <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
        <Text style={styles.saveBtnText}>Add Request</Text>
      </TouchableOpacity>

      {/* Bulk delete bar (only shows if anything is selected) */}
      {selectedIds.length > 0 && (
        <TouchableOpacity
          style={styles.bulkDeleteBtn}
          onPress={handleDeleteSelected}
        >
          <Text style={styles.bulkDeleteBtnText}>
            Delete {selectedIds.length} Selected 🗑
          </Text>
        </TouchableOpacity>
      )}

      {/* ACTIVE SECTION WRAPPED */}
      <View style={styles.activeSection}>
        <Text style={styles.listHeader}>Active Requests</Text>

        {activeRequests.length === 0 ? (
          <Text style={styles.emptyText}>
            No active requests yet. Add one above 🙏
          </Text>
        ) : (
          activeRequests.map((req) => (
            <View
              key={req.id}
              style={[
                styles.reqCard,
                selectedIds.includes(req.id) && styles.reqCardSelected,
              ]}
            >
              <View style={styles.reqHeaderRow}>
                <TouchableOpacity
                  style={styles.checkboxArea}
                  onPress={() => toggleSelect(req.id)}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      selectedIds.includes(req.id) && styles.checkboxBoxChecked,
                    ]}
                  >
                    {selectedIds.includes(req.id) && (
                      <Text style={styles.checkboxCheck}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.reqTitle}>{req.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.smallDangerBtn}
                  onPress={() => handleDeleteSingle(req.id)}
                >
                  <Text style={styles.smallDangerBtnText}>🗑 Remove</Text>
                </TouchableOpacity>
              </View>

              {req.note ? <Text style={styles.reqNote}>{req.note}</Text> : null}

              <Text style={styles.reqMeta}>Added: {req.createdAt}</Text>
              <Text style={styles.reqMeta}>
                Last prayed: {req.lastPrayedDate ? req.lastPrayedDate : '—'}
              </Text>

              <View style={styles.reqActionsRow}>
                <TouchableOpacity
                  style={styles.reqActionBtn}
                  onPress={() => handlePrayed(req.id)}
                >
                  <Text style={styles.reqActionBtnText}>Prayed today ✔</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.reqActionBtn}
                  onPress={() => handleAnswered(req.id)}
                >
                  <Text style={styles.reqActionBtnText}>Answered 🙌</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ANSWERED SECTION WRAPPED */}
      {answeredRequests.length > 0 && (
        <View style={styles.answeredSection}>
          <Text style={styles.listHeader}>Answered / Archived 🙌</Text>

          {answeredRequests.map((req) => (
            <View key={req.id} style={styles.answeredCard}>
              <View style={styles.reqHeaderRow}>
                <Text style={styles.answeredTitle}>{req.title}</Text>

                <TouchableOpacity
                  style={styles.smallDangerBtn}
                  onPress={() => handleDeleteSingle(req.id)}
                >
                  <Text style={styles.smallDangerBtnText}>🗑 Remove</Text>
                </TouchableOpacity>
              </View>

              {req.note ? (
                <Text style={styles.answeredNote}>{req.note}</Text>
              ) : null}

              <Text style={styles.answeredMeta}>Added: {req.createdAt}</Text>
              <Text style={styles.answeredMeta}>
                Last prayed: {req.lastPrayedDate ? req.lastPrayedDate : '—'}
              </Text>
              <Text style={styles.answeredMeta}>Marked answered ✅</Text>
            </View>
          ))}
        </View>
      )}

      {/* Back nav */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },

  topHeaderSection: {
    marginBottom: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: '600',
  },
  sub: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 24,
  },

  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
  },
  label2: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccd2ff',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },

  savedNotice: {
    fontSize: 14,
    color: '#4b6fff',
    fontWeight: '600',
    marginBottom: 16,
  },

  saveBtn: {
    backgroundColor: '#4b6fff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  bulkDeleteBtn: {
    backgroundColor: '#ff4b4b',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  bulkDeleteBtnText: {
    color: '#fff',
    fontWeight: '600',
  },

  activeSection: {
    marginBottom: 24,
  },

  listHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },

  reqCard: {
    borderWidth: 2,
    borderColor: '#ffdd8a',
    backgroundColor: '#fff6e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reqCardSelected: {
    borderColor: '#ff4b4b',
    backgroundColor: '#ffecec',
  },

  reqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },

  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
  },

  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4b6fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: {
    backgroundColor: '#4b6fff',
    borderColor: '#4b6fff',
  },
  checkboxCheck: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 14,
  },

  reqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  smallDangerBtn: {
    backgroundColor: '#ff4b4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  smallDangerBtnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },

  reqNote: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  reqMeta: {
    fontSize: 12,
    color: '#555',
  },

  reqActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  reqActionBtn: {
    backgroundColor: '#4b6fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  reqActionBtnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },

  answeredSection: {
    marginBottom: 24,
  },

  answeredCard: {
    borderWidth: 2,
    borderColor: '#ccd2ff',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  answeredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  answeredNote: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  answeredMeta: {
    fontSize: 12,
    color: '#555',
  },

  backBtn: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  backBtnText: {
    color: '#4b6fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
