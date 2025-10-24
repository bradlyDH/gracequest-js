// Simple rule: every 100 XP = new level
// 0-99 => level 1
// 100-199 => level 2
// etc
export function levelFromXp(xp) {
  return Math.floor(xp / 100) + 1;
}

// Give XP to a virtue and return updated progress object + the new level
export function awardVirtueXp(currentProgress, virtue, xpAward) {
  const oldEntry = currentProgress[virtue] || { xp: 0, level: 1 };

  const newXp = oldEntry.xp + xpAward;
  const newLevel = levelFromXp(newXp);

  const updated = {
    ...currentProgress,
    [virtue]: {
      xp: newXp,
      level: newLevel,
    },
  };

  return { newProgressObj: updated, newLevel };
}
