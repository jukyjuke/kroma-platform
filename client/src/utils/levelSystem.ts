export const TITLES = [
  "Novice",
  "Apprenti",
  "Initié",
  "Explorateur",
  "Aventurier",
  "Architecte",
  "Maître",
  "Grand Maître",
  "Légende",
  "Divinité",
];

const XP_PER_LEVEL = 1000;

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getLevelTitle(level: number): string {
  const index = Math.min(level - 1, TITLES.length - 1);
  return TITLES[index];
}

export function calculateProgress(xp: number): number {
  const currentLevelInfo = getLevelInfo(xp);
  const xpInCurrentLevel = xp - currentLevelInfo.minXp;
  return (xpInCurrentLevel / XP_PER_LEVEL) * 100;
}

export function getLevelInfo(xp: number) {
  const level = calculateLevel(xp);
  const minXp = (level - 1) * XP_PER_LEVEL;
  const maxXp = level * XP_PER_LEVEL;
  return {
    level,
    minXp,
    maxXp,
    title: getLevelTitle(level),
  };
}
