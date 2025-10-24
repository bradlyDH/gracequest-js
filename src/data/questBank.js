// Each virtue gets:
// - virtue name
// - questions (same shape as before)
// - rewardVerse
// - baseXp

export const QUEST_BANK = {
  PATIENCE: {
    virtue: 'PATIENCE',
    emoji: '⏳',
    color: '#4b6fff',
    questions: [
      {
        id: 'patience_q1',
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
        id: 'patience_q2',
        text: "Who was thrown into the lions' den?",
        answers: ['Daniel', 'Jonah', 'Moses'],
        bestAnswerIndex: 0,
        feedback:
          'Daniel remained faithful in prayer even when it was dangerous.',
      },
      {
        id: 'patience_q3',
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
    baseXp: 12,
  },

  KINDNESS: {
    virtue: 'KINDNESS',
    emoji: '💗',
    color: '#ff6fb1',
    questions: [
      {
        id: 'kindness_q1',
        text: 'You see someone sitting alone at lunch looking sad. What do you do?',
        answers: [
          "Leave them alone. It's not your problem.",
          "Pray they feel better but don't approach.",
          "Go sit with them and ask how they're doing.",
        ],
        bestAnswerIndex: 2,
        feedback:
          'Kindness is active love: drawing near to people who feel unseen.',
      },
      {
        id: 'kindness_q2',
        text: 'Which verse points to kindness?',
        answers: [
          '"Be kind and compassionate to one another."',
          '"An eye for an eye."',
          '"Store up treasures on earth."',
        ],
        bestAnswerIndex: 0,
        feedback:
          'Ephesians 4:32 calls us to kindness and compassion, just as Christ forgave us.',
      },
      {
        id: 'kindness_q3',
        text: 'Someone spills their drink on you by accident. The kind response is:',
        answers: [
          'Roll your eyes so they feel bad.',
          "Laugh it off and tell them it's okay.",
          'Make a joke about them in front of others.',
        ],
        bestAnswerIndex: 1,
        feedback:
          'Kindness absorbs little offenses instead of paying them back.',
      },
    ],
    rewardVerse: {
      text: 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.',
      ref: 'Ephesians 4:32',
    },
    baseXp: 12,
  },

  FAITH: {
    virtue: 'FAITH',
    emoji: '✝️',
    color: '#6b4bff',
    questions: [
      {
        id: 'faith_q1',
        text: 'Faith means trusting God when:',
        answers: [
          'Things are easy and I get what I want.',
          "I feel nothing but still choose to believe He's good.",
          'I can prove every detail scientifically.',
        ],
        bestAnswerIndex: 1,
        feedback:
          "Faith is trust in God's character, not just good circumstances.",
      },
      {
        id: 'faith_q2',
        text: 'Hebrews 11:1 describes faith as:',
        answers: [
          'Doing enough good deeds to earn heaven.',
          'Confidence in what we hope for and assurance about what we do not see.',
          'Giving money to the church.',
        ],
        bestAnswerIndex: 1,
        feedback:
          "Faith is a deep trust in God's promises, even when we can't see them yet.",
      },
      {
        id: 'faith_q3',
        text: "You're anxious about the future. A faithful response is:",
        answers: [
          "Remind yourself of God's promises and pray honestly.",
          "Pretend you're fine and shove it down.",
          'Blame God for not making life easier.',
        ],
        bestAnswerIndex: 0,
        feedback:
          "Faith isn't fake calm — it's taking fear to the Lord instead of carrying it alone.",
      },
    ],
    rewardVerse: {
      text: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      ref: 'Hebrews 11:1',
    },
    baseXp: 14,
  },

  LOVE: {
    virtue: 'LOVE',
    emoji: '❤️',
    color: '#ff4b4b',
    questions: [
      {
        id: 'love_q1',
        text: 'Biblical love means:',
        answers: [
          'Only caring about people who treat me well.',
          'Laying myself down for others like Christ did.',
          'Never telling anyone hard truth.',
        ],
        bestAnswerIndex: 1,
        feedback: 'Real love looks like self-giving, not just warm feelings.',
      },
      {
        id: 'love_q2',
        text: 'Which one best reflects 1 Corinthians 13?',
        answers: [
          'Love keeps a record of wrongs.',
          'Love always protects, always trusts, always hopes, always perseveres.',
          'Love is rude when people deserve it.',
        ],
        bestAnswerIndex: 1,
        feedback:
          'Love is patient, kind, not proud, not rude, and always seeks the good of others.',
      },
      {
        id: 'love_q3',
        text: "Someone snaps at you because they're having a bad day. The most loving response is:",
        answers: [
          'Snap back harder.',
          "Pray for them, and gently ask if they're okay instead of attacking.",
          'Talk trash about them to your group chat.',
        ],
        bestAnswerIndex: 1,
        feedback:
          'Love moves toward wounded people with care instead of defending ego.',
      },
    ],
    rewardVerse: {
      text: 'Let all that you do be done in love.',
      ref: '1 Corinthians 16:14',
    },
    baseXp: 14,
  },
};
