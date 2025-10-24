export const dailyQuest = {
  virtue: 'PATIENCE',
  questions: [
    {
      id: 'q1',
      text: "Your friend took credit for your work. What's the most Christ-like first response?",
      answers: [
        'Call them out in front of everyone so they feel it.',
        'Pray, stay calm, and talk to them privately and honestly.',
        'Never speak to them again.',
      ],
      bestAnswerIndex: 1,
      feedback:
        'Gentle truth with self-control reflects patience and honors both truth and the person.',
    },
    {
      id: 'q2',
      text: "Who was thrown into the lions' den?",
      answers: ['Daniel', 'Jonah', 'Moses'],
      bestAnswerIndex: 0,
      feedback:
        'Daniel remained faithful in prayer even when it was dangerous.',
    },
    {
      id: 'q3',
      text: "When someone is slow and you're in a hurry, patience looks like:",
      answers: [
        "Sighing loudly so they know you're annoyed.",
        'Helping if you can instead of rushing past.',
        "Thinking 'I'm better than this person.'",
      ],
      bestAnswerIndex: 1,
      feedback: "Patience isn't just waiting — it's waiting with kindness.",
    },
  ],
  rewardVerse: {
    text: 'Be completely humble and gentle; be patient, bearing with one another in love.',
    ref: 'Ephesians 4:2',
  },
  baseXp: 12, // XP you could earn for this quest
};
