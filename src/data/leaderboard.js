// ── XP FORMULA ──────────────────────────────────────────────────────────────
// XP за задание = baseXP × accuracy² × (1 + streakBonus)
// accuracy: доля правильных ответов (0–1)
// streakBonus: streak_days × 0.03, max 0.90 (30+ дней = +90%)
// Итог: при 100% + 30-дн стрик = baseXP × 1.90; при 50% = baseXP × 0.25 × bonus

export function calcXP({ baseXP = 20, correct, total, streak = 0 }) {
  const accuracy = total > 0 ? correct / total : 0
  const streakBonus = Math.min(streak * 0.03, 0.90)
  const earned = Math.round(baseXP * Math.pow(accuracy, 2) * (1 + streakBonus))
  return Math.max(earned, accuracy > 0 ? 1 : 0) // минимум 1 XP если хоть что-то правильно
}

// ── LEVEL SYSTEM ─────────────────────────────────────────────────────────────
// XP до следующего уровня растёт: уровень N требует N² × 80 суммарного XP
// Level 1: 80 XP, Level 2: 320 XP total, Level 3: 720 XP total...
export function xpToLevel(totalXP) {
  return Math.max(1, Math.floor(Math.sqrt(totalXP / 80)) + 1)
}

export function xpForLevel(level) {
  return Math.pow(level - 1, 2) * 80
}

export function xpProgress(totalXP) {
  const level = xpToLevel(totalXP)
  const currentLevelXP = xpForLevel(level)
  const nextLevelXP = xpForLevel(level + 1)
  const progress = totalXP - currentLevelXP
  const needed = nextLevelXP - currentLevelXP
  return { level, progress, needed, pct: Math.min(progress / needed * 100, 100) }
}

export function levelTitle(level) {
  if (level < 3)  return 'Новичок'
  if (level < 6)  return 'Ученик'
  if (level < 10) return 'Практик'
  if (level < 15) return 'Знаток'
  if (level < 20) return 'Эксперт'
  if (level < 30) return 'Мастер'
  return 'Легенда'
}

// ── BADGES ───────────────────────────────────────────────────────────────────
export const BADGES = [
  { id: 'first_lesson',   icon: '🌱', title: 'Первый шаг',      desc: 'Пройди первый урок',             check: u => (u.completedLessons?.length||0) >= 1 },
  { id: 'lessons_10',     icon: '📚', title: 'Читатель',         desc: '10 уроков пройдено',             check: u => (u.completedLessons?.length||0) >= 10 },
  { id: 'lessons_50',     icon: '📖', title: 'Книголюб',         desc: '50 уроков пройдено',             check: u => (u.completedLessons?.length||0) >= 50 },
  { id: 'lessons_100',    icon: '🏛️', title: '100 уроков',       desc: 'Настоящий студент',              check: u => (u.completedLessons?.length||0) >= 100 },
  { id: 'streak_7',       icon: '🔥', title: 'Неделя',           desc: '7 дней подряд',                  check: u => (u.streak||0) >= 7 },
  { id: 'streak_30',      icon: '💥', title: 'Месяц',            desc: '30 дней подряд',                 check: u => (u.streak||0) >= 30 },
  { id: 'perfect_test',   icon: '🎯', title: 'Идеальный тест',   desc: '100% в контрольной',             check: u => (u.perfectExams||0) >= 1 },
  { id: 'perfect_3',      icon: '🏆', title: 'Перфекционист',    desc: '3 теста на 100%',                check: u => (u.perfectExams||0) >= 3 },
  { id: 'xp_500',         icon: '⚡', title: 'Энергичный',       desc: '500 XP заработано',              check: u => (u.xp||0) >= 500 },
  { id: 'xp_2000',        icon: '💎', title: 'Ветеран',          desc: '2000 XP заработано',             check: u => (u.xp||0) >= 2000 },
  { id: 'level_5',        icon: '🌟', title: 'Уровень 5',        desc: 'Достигни 5 уровня',              check: u => xpToLevel(u.xp||0) >= 5 },
  { id: 'level_10',       icon: '👑', title: 'Уровень 10',       desc: 'Достигни 10 уровня',             check: u => xpToLevel(u.xp||0) >= 10 },
  { id: 'polyglot',       icon: '🌍', title: 'Полиглот',         desc: 'Пройди уроки на 2 языках',       check: u => (u.completedLessons?.length||0) > 0 && false /* TODO */ },
  { id: 'exam_pass',      icon: '🎓', title: 'Экзамен сдан',     desc: 'Пройди первый уровневый экзамен',check: u => (u.completedExams?.length||0) >= 1 },
  { id: 'speed_run',      icon: '⚡', title: 'Спринтер',         desc: '5 уроков за один день',          check: u => false /* TODO */ },
]

// ── MOCK LEADERBOARD DATA ────────────────────────────────────────────────────
export const mockLeaderboard = [
  { id: 'u1', name: 'Алина К.',    xp: 4820, streak: 45, avatar: '🦊', lang: '🇺🇸' },
  { id: 'u2', name: 'Дима Р.',     xp: 3910, streak: 22, avatar: '🐺', lang: '🇯🇵' },
  { id: 'u3', name: 'Катя Л.',     xp: 3540, streak: 31, avatar: '🦁', lang: '🇺🇸' },
  { id: 'u4', name: 'Артём В.',    xp: 2980, streak: 14, avatar: '🦅', lang: '🇰🇷' },
  { id: 'u5', name: 'Соня М.',     xp: 2640, streak: 18, avatar: '🐉', lang: '🇯🇵' },
  { id: 'u6', name: 'Влад П.',     xp: 2100, streak: 7,  avatar: '🦋', lang: '🇺🇸' },
  { id: 'u7', name: 'Настя Б.',    xp: 1760, streak: 12, avatar: '🌺', lang: '🇰🇷' },
  { id: 'u8', name: 'Саша Н.',     xp: 1420, streak: 5,  avatar: '🎮', lang: '🇺🇸' },
  { id: 'u9', name: 'Лера Ф.',     xp: 980,  streak: 3,  avatar: '🌊', lang: '🇯🇵' },
  { id: 'u10',name: 'Игорь С.',    xp: 640,  streak: 1,  avatar: '🏔️', lang: '🇺🇸' },
]
