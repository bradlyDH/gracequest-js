import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { loadPlayerState, updatePlayerState } from '../storage/progressStorage';

export default function ProfileScreen({ navigation }) {
  const [playerName, setPlayerName] = useState('');
  const [favoriteVerseText, setFavoriteVerseText] = useState('');
  const [favoriteVerseRef, setFavoriteVerseRef] = useState('');
  const [savedNotice, setSavedNotice] = useState('');

  // Load existing profile info so user can edit it
  useEffect(() => {
    (async () => {
      const state = await loadPlayerState();
      if (state.playerName) setPlayerName(state.playerName);
      if (state.favoriteVerseText)
        setFavoriteVerseText(state.favoriteVerseText);
      if (state.favoriteVerseRef) setFavoriteVerseRef(state.favoriteVerseRef);
    })();
  }, []);

  async function handleSave() {
    await updatePlayerState({
      playerName: playerName.trim() || null,
      favoriteVerseText: favoriteVerseText.trim() || null,
      favoriteVerseRef: favoriteVerseRef.trim() || null,
    });

    setSavedNotice('Saved 🙏');
    // little UX sugar: clear the notice after a few seconds
    setTimeout(() => setSavedNotice(''), 3000);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Profile 🙌</Text>
      <Text style={styles.sub}>
        This helps GraceQuest encourage you by name and remind you of truth.
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="e.g. Bradly"
          placeholderTextColor="#999"
        />
        <Text style={styles.hint}>
          We'll greet you with this on the home screen.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Favorite verse text</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={favoriteVerseText}
          onChangeText={setFavoriteVerseText}
          placeholder={`"Let all that you do be done in love."`}
          placeholderTextColor="#999"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Verse reference</Text>
        <TextInput
          style={styles.input}
          value={favoriteVerseRef}
          onChangeText={setFavoriteVerseRef}
          placeholder="1 Corinthians 16:14"
          placeholderTextColor="#999"
        />
        <Text style={styles.hint}>
          We'll show this verse on Home as a reminder. This is also good for
          working on memory verses.
        </Text>
      </View>

      {savedNotice ? (
        <Text style={styles.savedNotice}>{savedNotice}</Text>
      ) : null}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Profile</Text>
      </TouchableOpacity>

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
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
  },
  sub: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccd2ff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f8f9ff',
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
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
    marginBottom: 12,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backBtnText: {
    color: '#4b6fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
