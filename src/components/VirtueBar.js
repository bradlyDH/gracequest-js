import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VirtueBar({ virtue, level, xp }) {
  // How far into this level are we?
  const xpInLevel = xp % 100;
  const percent = xpInLevel / 100;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.virtueText}>{virtue}</Text>
        <Text style={styles.levelText}>Lvl {level}</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent * 100}%` }]} />
      </View>

      <Text style={styles.xpText}>{xpInLevel} / 100 XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  virtueText: {
    fontWeight: '600',
    fontSize: 16,
  },
  levelText: {
    fontSize: 16,
  },
  track: {
    height: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  fill: {
    height: 10,
    backgroundColor: '#4b6fff',
  },
  xpText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});
