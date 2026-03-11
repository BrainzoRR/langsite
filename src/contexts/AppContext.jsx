import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const defaultUser = {
  name: '',
  email: '',
  language: 'english',
  level: 'A1',
  xp: 0,
  streak: 7,
  coins: 340,
  gems: 12,
  completedLessons: [],
  completedVideos: [],
  subscribedAt: new Date().toISOString(),
  subscriptionEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lq_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('lq_user'))

  useEffect(() => {
    if (user) localStorage.setItem('lq_user', JSON.stringify(user))
  }, [user])

  const login = (data) => {
    const userData = { ...defaultUser, ...data }
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('lq_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('lq_user')
  }

  const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }))

  const completeLesson = (lessonId, xpGain = 10) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpGain,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }))
  }

  const completeVideo = (videoId) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 5,
      completedVideos: prev.completedVideos.includes(videoId)
        ? prev.completedVideos
        : [...prev.completedVideos, videoId],
    }))
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, completeLesson, completeVideo }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
