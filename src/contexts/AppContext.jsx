import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const defaultUser = {
  name: '', email: '',
  language: 'english',
  levels: { english: 'A1', japanese: 'A1', korean: 'A1' },
  dailyGoal: 30,
  xp: 0, streak: 0, coins: 0,
  completedLessons: [], completedVideos: [], completedExams: [],
  perfectExams: 0,
  isPremium: false,
  subscriptionEnds: null,
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('lq2_user'); return s ? JSON.parse(s) : null }
    catch { return null }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('lq2_user'))

  useEffect(() => {
    if (user) {
      try { localStorage.setItem('lq2_user', JSON.stringify(user)) }
      catch (e) { console.warn('localStorage write failed', e) }
    }
  }, [user])

  const login = (data) => {
    const u = {
      ...defaultUser, ...data,
      levels: { ...defaultUser.levels, ...(data.levels || {}) },
      completedLessons: data.completedLessons || [],
      completedVideos: data.completedVideos || [],
      completedExams: data.completedExams || [],
    }
    setUser(u); setIsAuthenticated(true)
    try { localStorage.setItem('lq2_user', JSON.stringify(u)) } catch {}
  }

  const logout = () => {
    setUser(null); setIsAuthenticated(false)
    try { localStorage.removeItem('lq2_user') } catch {}
  }

  const updateUser = (updates) => {
    setUser(prev => {
      if (!prev) return prev
      const next = { ...prev, ...updates }
      try { localStorage.setItem('lq2_user', JSON.stringify(next)) } catch {}
      return next
    })
  }

  // earnedXP = уже посчитанный через calcXP
  const completeLesson = (id, earnedXP = 5, correct = 0, total = 0) => {
    setUser(prev => {
      if (!prev) return prev
      const alreadyDone = prev.completedLessons?.includes(id)
      const next = {
        ...prev,
        xp: (prev.xp || 0) + (earnedXP || 0),
        coins: (prev.coins || 0) + Math.floor((earnedXP || 0) / 5),
        completedLessons: alreadyDone
          ? prev.completedLessons
          : [...(prev.completedLessons || []), id],
      }
      try { localStorage.setItem('lq2_user', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const completeVideo = (id) => {
    setUser(prev => {
      if (!prev) return prev
      const next = {
        ...prev,
        xp: (prev.xp || 0) + 8,
        coins: (prev.coins || 0) + 2,
        completedVideos: prev.completedVideos?.includes(id)
          ? prev.completedVideos
          : [...(prev.completedVideos || []), id],
      }
      try { localStorage.setItem('lq2_user', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const completeExam = (id, earnedXP = 50, isPerfect = false) => {
    setUser(prev => {
      if (!prev) return prev
      const next = {
        ...prev,
        xp: (prev.xp || 0) + (earnedXP || 0),
        coins: (prev.coins || 0) + Math.floor((earnedXP || 0) / 3),
        completedExams: prev.completedExams?.includes(id)
          ? prev.completedExams
          : [...(prev.completedExams || []), id],
        perfectExams: isPerfect ? (prev.perfectExams || 0) + 1 : (prev.perfectExams || 0),
      }
      try { localStorage.setItem('lq2_user', JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, completeLesson, completeVideo, completeExam }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
