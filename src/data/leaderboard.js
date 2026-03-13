// ── XP FORMULA ───────────────────────────────────────────────────────────────
// XP = baseXP × accuracy² × (1 + streakBonus)
// accuracy = correct/total (0–1)
// streakBonus = streak_days × 0.03, cap 0.90 (30+ дней = +90%)
export function calcXP({ baseXP = 20, correct, total, streak = 0 }) {
  if (!total || total === 0) return 0
  const accuracy = correct / total
  const streakBonus = Math.min((streak || 0) * 0.03, 0.90)
  const raw = baseXP * Math.pow(accuracy, 2) * (1 + streakBonus)
  return Math.max(Math.round(raw), accuracy > 0 ? 1 : 0)
}

// ── LEVEL SYSTEM (1–300) ──────────────────────────────────────────────────────
// XP для уровня N: (N-1)² × 50
// Уровень 2: 50 XP | Уровень 10: 4050 XP | Уровень 50: 120050 XP | Уровень 300: 4,440,050 XP
export function xpForLevel(level) {
  const lv = Math.max(1, Math.min(level, 301))
  return Math.pow(lv - 1, 2) * 50
}

export function xpToLevel(totalXP) {
  const xp = Math.max(0, totalXP || 0)
  const raw = Math.floor(Math.sqrt(xp / 50)) + 1
  return Math.max(1, Math.min(raw, 300))
}

export function xpProgress(totalXP) {
  const xp = Math.max(0, totalXP || 0)
  const level = xpToLevel(xp)
  if (level >= 300) {
    return { level: 300, progress: xpForLevel(300), needed: xpForLevel(300), pct: 100, isMax: true }
  }
  const currentLevelXP = xpForLevel(level)
  const nextLevelXP = xpForLevel(level + 1)
  const needed = nextLevelXP - currentLevelXP
  const progress = xp - currentLevelXP
  const pct = needed > 0 ? Math.min((progress / needed) * 100, 100) : 100
  return { level, progress: Math.max(0, progress), needed, pct, isMax: false }
}

export function levelTitle(level) {
  if (level < 3)   return 'Новичок'
  if (level < 6)   return 'Ученик'
  if (level < 10)  return 'Практик'
  if (level < 15)  return 'Знаток'
  if (level < 25)  return 'Эксперт'
  if (level < 50)  return 'Мастер'
  if (level < 100) return 'Профи'
  if (level < 200) return 'Легенда'
  return 'Бог'
}

// ── BADGES ───────────────────────────────────────────────────────────────────
export const BADGES = [
  { id: 'first_lesson', icon: '🌱', title: 'Первый шаг',    desc: 'Пройди первый урок',              check: u => (u?.completedLessons?.length||0) >= 1 },
  { id: 'lessons_10',   icon: '📚', title: 'Читатель',      desc: '10 уроков пройдено',              check: u => (u?.completedLessons?.length||0) >= 10 },
  { id: 'lessons_50',   icon: '📖', title: 'Книголюб',      desc: '50 уроков пройдено',              check: u => (u?.completedLessons?.length||0) >= 50 },
  { id: 'lessons_100',  icon: '🏛️', title: '100 уроков',    desc: 'Настоящий студент',               check: u => (u?.completedLessons?.length||0) >= 100 },
  { id: 'streak_7',     icon: '🔥', title: 'Неделя',        desc: '7 дней подряд',                   check: u => (u?.streak||0) >= 7 },
  { id: 'streak_30',    icon: '💥', title: 'Месяц',         desc: '30 дней подряд',                  check: u => (u?.streak||0) >= 30 },
  { id: 'perfect_test', icon: '🎯', title: 'Идеальный тест',desc: '100% в экзамене',                 check: u => (u?.perfectExams||0) >= 1 },
  { id: 'perfect_3',    icon: '🏆', title: 'Перфекционист', desc: '3 теста на 100%',                 check: u => (u?.perfectExams||0) >= 3 },
  { id: 'xp_500',       icon: '⚡', title: 'Энергичный',    desc: '500 XP заработано',               check: u => (u?.xp||0) >= 500 },
  { id: 'xp_2000',      icon: '💎', title: 'Ветеран',       desc: '2000 XP заработано',              check: u => (u?.xp||0) >= 2000 },
  { id: 'xp_10000',     icon: '👑', title: 'Элита',         desc: '10000 XP заработано',             check: u => (u?.xp||0) >= 10000 },
  { id: 'level_5',      icon: '🌟', title: 'Уровень 5',     desc: 'Достигни 5 уровня',               check: u => xpToLevel(u?.xp||0) >= 5 },
  { id: 'level_20',     icon: '🚀', title: 'Уровень 20',    desc: 'Достигни 20 уровня',              check: u => xpToLevel(u?.xp||0) >= 20 },
  { id: 'exam_pass',    icon: '🎓', title: 'Первый экзамен',desc: 'Сдай первый уровневый экзамен',   check: u => (u?.completedExams?.length||0) >= 1 },
  { id: 'exam_3',       icon: '🏅', title: 'Полиглот',      desc: 'Сдай 3 экзамена',                 check: u => (u?.completedExams?.length||0) >= 3 },
]

// ── MOCK LEADERBOARD ─────────────────────────────────────────────────────────
export const mockLeaderboard = [
  { id: 'u1',  name: 'Алина К.',  xp: 4820, streak: 45, avatar: '🦊', lang: '🇺🇸' },
  { id: 'u2',  name: 'Дима Р.',   xp: 3910, streak: 22, avatar: '🐺', lang: '🇯🇵' },
  { id: 'u3',  name: 'Катя Л.',   xp: 3540, streak: 31, avatar: '🦁', lang: '🇺🇸' },
  { id: 'u4',  name: 'Артём В.',  xp: 2980, streak: 14, avatar: '🦅', lang: '🇰🇷' },
  { id: 'u5',  name: 'Соня М.',   xp: 2640, streak: 18, avatar: '🐉', lang: '🇯🇵' },
  { id: 'u6',  name: 'Влад П.',   xp: 2100, streak: 7,  avatar: '🦋', lang: '🇺🇸' },
  { id: 'u7',  name: 'Настя Б.',  xp: 1760, streak: 12, avatar: '🌺', lang: '🇰🇷' },
  { id: 'u8',  name: 'Саша Н.',   xp: 1420, streak: 5,  avatar: '🎮', lang: '🇺🇸' },
  { id: 'u9',  name: 'Лера Ф.',   xp:  980, streak: 3,  avatar: '🌊', lang: '🇯🇵' },
  { id: 'u10', name: 'Игорь С.',  xp:  640, streak: 1,  avatar: '🏔️', lang: '🇺🇸' },
]
