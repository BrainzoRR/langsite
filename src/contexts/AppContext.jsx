import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const defaultUser = {
  name: '', email: '',
  language: 'english',
  levels: { english: 'A1', japanese: 'A1', korean: 'A1' },
  dailyGoal: 30,
  xp: 0, streak: 7, coins: 340, gems: 12,
  completedLessons: [], completedVideos: [],
  subscribedAt: new Date().toISOString(),
  subscriptionEnds: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
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
  const updateUser = (up) => setUser(p => ({ ...p, ...up }))
  const completeLesson = (id, xp = 10) => setUser(p => ({
    ...p, xp: p.xp + xp,
    completedLessons: p.completedLessons.includes(id) ? p.completedLessons : [...p.completedLessons, id]
  }))
  const completeVideo = (id) => setUser(p => ({
    ...p, xp: p.xp + 5,
    completedVideos: p.completedVideos.includes(id) ? p.completedVideos : [...p.completedVideos, id]
  }))

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, completeLesson, completeVideo }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
