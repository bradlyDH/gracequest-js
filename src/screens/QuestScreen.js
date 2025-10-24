import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AnswerOption from '../components/AnswerOption';

export default function QuestScreen({ route, navigation }) {
  const { quest } = route.params;
  const { virtue, emoji, color } = quest;

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = quest.questions[qIndex];

  function handleSubmit() {
    if (selected === null) return;

    const isBest = selected === question.bestAnswerIndex;
    if (isBest) {
      setScore((prev) => prev + 1);
    }

    setShowFeedback(true);
  }

  function handleNext() {
    const nextIndex = qIndex + 1;
    if (nextIndex < quest.questions.length) {
      setQIndex(nextIndex);
      setSelected(null);
      setShowFeedback(false);
    } else {
      navigation.navigate('Result', {
        virtue: quest.virtue,
        score,
        total: quest.questions.length,
        rewardVerse: quest.rewardVerse,
        baseXp: quest.baseXp,
        color: quest.color,
        emoji: quest.emoji,
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.virtueLabel, { color }]}>
        {emoji} {virtue} Quest
      </Text>
      <Text style={styles.progressText}>
        Question {qIndex + 1} of {quest.questions.length}
      </Text>

      <Text style={styles.questionText}>{question.text}</Text>

      {question.answers.map((ans, idx) => (
        <AnswerOption
          key={idx}
          text={ans}
          selected={selected === idx}
          disabled={showFeedback}
          onPress={() => setSelected(idx)}
        />
      ))}

      {!showFeedback && (
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: color }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>Submit Answer</Text>
        </TouchableOpacity>
      )}

      {showFeedback && (
        <View style={[styles.feedbackBlock, { borderColor: color + '55' }]}>
          <Text style={styles.feedbackTitle}>Thanks for your answer 🙌</Text>
          <Text style={styles.feedbackText}>{question.feedback}</Text>

          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>Next ▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  virtueLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
  },
  submitBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  feedbackBlock: {
    marginTop: 24,
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  feedbackTitle: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  feedbackText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  nextBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
