import { StreakData } from '../types';

const STREAK_STORAGE_KEY = 'pahadi_pathshala_streak_v1';

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

export function getInitialStreak(): StreakData {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  if (typeof window === 'undefined') {
    return {
      count: 1,
      lastActiveDate: today,
      isActiveToday: true,
      activeDates: [today],
      longestStreak: 1,
    };
  }

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (raw) {
      const parsed: StreakData = JSON.parse(raw);
      const isToday = parsed.lastActiveDate === today;
      const isYesterday = parsed.lastActiveDate === yesterday;

      if (isToday) {
        return {
          ...parsed,
          isActiveToday: true,
        };
      } else if (isYesterday) {
        // Streak is safe from yesterday, waiting for today's engagement
        return {
          ...parsed,
          isActiveToday: false,
        };
      } else {
        // Missed one or more days
        return {
          count: 0,
          lastActiveDate: parsed.lastActiveDate,
          isActiveToday: false,
          activeDates: parsed.activeDates || [],
          longestStreak: parsed.longestStreak || parsed.count || 1,
        };
      }
    }
  } catch {
    // Ignore error
  }

  // Default first time user
  const initial: StreakData = {
    count: 1,
    lastActiveDate: today,
    isActiveToday: true,
    activeDates: [today],
    longestStreak: 1,
  };

  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Ignore error
  }

  return initial;
}

export function recordActivity(current: StreakData): { data: StreakData; didIncrement: boolean } {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  // If already logged activity today
  if (current.isActiveToday && current.lastActiveDate === today) {
    return { data: current, didIncrement: false };
  }

  let newCount = 1;
  if (current.lastActiveDate === yesterday) {
    newCount = current.count + 1;
  } else if (current.lastActiveDate === today) {
    newCount = current.count;
  } else {
    newCount = 1;
  }

  const activeDatesSet = new Set(current.activeDates || []);
  activeDatesSet.add(today);

  const updated: StreakData = {
    count: newCount,
    lastActiveDate: today,
    isActiveToday: true,
    activeDates: Array.from(activeDatesSet).slice(-30), // keep last 30 days
    longestStreak: Math.max(current.longestStreak || 0, newCount),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }

  return { data: updated, didIncrement: true };
}
