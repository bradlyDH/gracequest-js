import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AnswerOption({ text, selected, disabled, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        selected && styles.optionSelected,
        disabled && styles.optionDisabled,
      ]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionText,
          selected && styles.optionTextSelected,
          disabled && styles.optionTextDisabled,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 2,
    borderColor: '#4b6fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: '#4b6fff',
  },
  optionDisabled: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 16,
    color: '#4b6fff',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
  },
  optionTextDisabled: {
    // we can tweak later
  },
});
