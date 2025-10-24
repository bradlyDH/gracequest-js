import { QUEST_BANK } from '../data/questBank';
import { getTodayString } from './dateUtils';

// Decide which virtue to focus on today.
// You can tune this mapping however you want.
// 0 = Sunday, 1 = Monday, ... 6 = Saturday
function virtueForDayIndex(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'FAITH'; // Sunday
    case 1:
      return 'PATIENCE'; // Monday
    case 2:
      return 'KINDNESS'; // Tuesday
    case 3:
      return 'LOVE'; // Wednesday
    case 4:
      return 'PATIENCE'; // Thursday
    case 5:
      return 'KINDNESS'; // Friday
    case 6:
      return 'LOVE'; // Saturday
    default:
      return 'PATIENCE';
  }
}

export function getTodaysQuest() {
  const now = new Date();
  const dayIdx = now.getDay(); // 0-6
  const virtueKey = virtueForDayIndex(dayIdx);

  // fallback safety
  const quest = QUEST_BANK[virtueKey] || QUEST_BANK['PATIENCE'];

  // We also include today's date in case we want to display it later or cache future logic
  return {
    ...quest,
    today: getTodayString(),
  };
}
