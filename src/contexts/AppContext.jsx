import React, { createContext, useContext, useState, useEffect } from 'react'
const AppContext = createContext()

const defaultUser = {
  name: '', email: '',
  language: 'english',
  levels: { english: 'A1', japanese: 'A1', korean: 'A1' },
  dailyGoal: 30,
  xp: 0, streak: 0, coins: 0,
  completedLessons: [],
  completedVideos: [],
  completedExams: [],    // { id, score, xp, date }
  perfectExams: [],      // ids экзаменов со 100%
  earnedBadges: [],      // ids полученных бейджей
  isPremium: false,
  subscriptionEnds: null,
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('lq2_user'); return s ? JSON.parse(s) : null } catch { return null }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('lq2_user'))

  useEffect(() => { if (user) localStorage.setItem('lq2_user', JSON.stringify(user)) }, [user])

  const login = (data) => {
    const u = { ...defaultUser, ...data, levels: { ...defaultUser.levels, ...(data.levels || {}) } }
    setUser(u); setIsAuthenticated(true); localStorage.setItem('lq2_user', JSON.stringify(u))
  }
  const logout = () => { setUser(null); setIsAuthenticated(false); localStorage.removeItem('lq2_user') }

  // Обновление + автоматическая проверка бейджей
  const updateUser = (up) => setUser(p => {
    const next = { ...p, ...up }
    // Проверяем новые бейджи
    const newBadges = BADGES
      .filter(b => !next.earnedBadges.includes(b.id) && b.check(next))
      .map(b => b.id)
    if (newBadges.length) next.earnedBadges = [...next.earnedBadges, ...newBadges]
    return next
  })

  // Завершить обычный урок
  const completeLesson = (id, xpBase = 10, correctCount = null, totalCount = null) => {
    setUser(p => {
      const xpEarned = (correctCount !== null && totalCount !== null)
        ? calcXP(xpBase, correctCount, totalCount, p.streak)
        : xpBase
      const next = {
        ...p,
        xp: p.xp + xpEarned,
        coins: p.coins + Math.floor(xpEarned / 5),
        completedLessons: p.completedLessons.includes(id) ? p.completedLessons : [...p.completedLessons, id]
      }
      const newBadges = BADGES.filter(b => !next.earnedBadges.includes(b.id) && b.check(next)).map(b => b.id)
      if (newBadges.length) next.earnedBadges = [...next.earnedBadges, ...newBadges]
      return next
    })
  }

  // Завершить экзамен
  const completeExam = (id, correctCount, totalCount, baseXP) => {
    setUser(p => {
      const score = Math.round(correctCount / totalCount * 100)
      const xpEarned = calcXP(baseXP, correctCount, totalCount, p.streak)
      const isPerfect = score === 100
      const record = { id, score, xp: xpEarned, date: new Date().toISOString() }
      const alreadyDone = p.completedExams.find(e => e.id === id)
      const next = {
        ...p,
        xp: p.xp + xpEarned,
        coins: p.coins + Math.floor(xpEarned / 4),
        completedExams: alreadyDone
          ? p.completedExams.map(e => e.id === id ? record : e)
          : [...p.completedExams, record],
        perfectExams: isPerfect && !p.perfectExams.includes(id)
          ? [...p.perfectExams, id]
          : p.perfectExams,
      }
      const newBadges = BADGES.filter(b => !next.earnedBadges.includes(b.id) && b.check(next)).map(b => b.id)
      if (newBadges.length) next.earnedBadges = [...next.earnedBadges, ...newBadges]
      return next
    })
  }

  const completeVideo = (id) => setUser(p => {
    const next = {
      ...p, xp: p.xp + 8,
      completedVideos: p.completedVideos.includes(id) ? p.completedVideos : [...p.completedVideos, id]
    }
    const newBadges = BADGES.filter(b => !next.earnedBadges.includes(b.id) && b.check(next)).map(b => b.id)
    if (newBadges.length) next.earnedBadges = [...next.earnedBadges, ...newBadges]
    return next
  })

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, completeLesson, completeExam, completeVideo }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
