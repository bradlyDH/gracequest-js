// Returns "YYYY-MM-DD" for today's local date
export function getTodayString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // month is 0-based
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Returns true if dateA is exactly 1 day before dateB
// Both must be in "YYYY-MM-DD"
export function isYesterday(dateA, dateB) {
  if (!dateA || !dateB) return false;

  const [aY, aM, aD] = dateA.split('-').map(Number);
  const [bY, bM, bD] = dateB.split('-').map(Number);

  const aDate = new Date(aY, aM - 1, aD);
  const bDate = new Date(bY, bM - 1, bD);

  const diffMs = bDate.getTime() - aDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays === 1;
}
