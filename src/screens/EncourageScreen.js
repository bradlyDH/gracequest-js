import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { ENCOURAGEMENT_TEMPLATES } from '../data/encouragementTemplates';
import { sendEncouragement } from '../storage/progressStorage';
import { getTodayString } from '../logic/dateUtils';

// For now, we'll assume the sender name is YOU (from your profile later).
// We'll just hardcode "Someone who cares" until we wire playerName in.
const FALLBACK_SENDER_NAME = 'Someone who cares';

export default function EncourageScreen({ navigation }) {
  const [toName, setToName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [notice, setNotice] = useState('');

  async function handleSend() {
    if (!toName.trim()) {
      setNotice('Please enter who this is for 🙏');
      return;
    }
    if (!selectedTemplateId) {
      setNotice('Please choose an encouragement to send 💬');
      return;
    }

    const template = ENCOURAGEMENT_TEMPLATES.find(
      (t) => t.id === selectedTemplateId
    );
    if (!template) {
      setNotice('Please choose a valid message 🙏');
      return;
    }

    await sendEncouragement({
      toName: toName.trim(),
      fromName: FALLBACK_SENDER_NAME,
      messageId: template.id,
      messageText: template.text,
      createdAt: getTodayString(),
    });

    setToName('');
    setSelectedTemplateId(null);
    setNotice('Sent 💌');

    setTimeout(() => setNotice(''), 3000);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Send Encouragement 💬</Text>
      <Text style={styles.sub}>
        Choose who you're lifting up, then pick a Christ-centered message. (No
        custom messages yet — we keep GraceQuest safe and encouraging.)
      </Text>

      {/* Recipient */}
      <View style={styles.section}>
        <Text style={styles.label}>Who is this for?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Sarah, Dad, Youth Group"
          placeholderTextColor="#999"
          value={toName}
          onChangeText={setToName}
        />
        <Text style={styles.hint}>
          Later this will be your actual friends list.
        </Text>
      </View>

      {/* Templates */}
      <Text style={styles.label}>Pick an encouragement to send:</Text>
      <View style={styles.templatesWrapper}>
        {ENCOURAGEMENT_TEMPLATES.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={[
              styles.templateCard,
              selectedTemplateId === template.id && styles.templateCardSelected,
            ]}
            onPress={() => setSelectedTemplateId(template.id)}
          >
            <Text style={styles.templateText}>"{template.text}"</Text>
            {selectedTemplateId === template.id && (
              <Text style={styles.templateCheck}>✓ Chosen</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
        <Text style={styles.sendBtnText}>Send 💌</Text>
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
  container: { padding: 24, backgroundColor: '#fff' },

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
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
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
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },

  templatesWrapper: {
    marginBottom: 20,
  },

  templateCard: {
    borderWidth: 2,
    borderColor: '#ccd2ff',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  templateCardSelected: {
    borderColor: '#4b6fff',
    backgroundColor: '#eef2ff',
  },
  templateText: {
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },
  templateCheck: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#4b6fff',
  },

  notice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b6fff',
    marginBottom: 16,
  },

  sendBtn: {
    backgroundColor: '#4b6fff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  sendBtnText: {
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
