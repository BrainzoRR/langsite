import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const DEFAULT_USER = {
  username: '',
  email: '',
  avatar: null,
  language: 'english',
  level: 'A1',
  xp: 0,
  streak: 7,
  coins: 350,
  gems: 12,
  completedLessons: [],
  completedVideos: [],
  subscriptionStart: null,
  subscriptionEnd: null,
  joinDate: new Date().toISOString(),
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lingua_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('lingua_user')
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('lingua_user', JSON.stringify(user))
    }
  }, [user])

  const login = (userData) => {
    const fullUser = { ...DEFAULT_USER, ...userData, joinDate: new Date().toISOString() }
    setUser(fullUser)
    setIsLoggedIn(true)
    localStorage.setItem('lingua_user', JSON.stringify(fullUser))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('lingua_user')
  }

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const addXP = (amount) => {
    setUser(prev => ({ ...prev, xp: (prev.xp || 0) + amount }))
  }

  const completeLesson = (lessonId) => {
    setUser(prev => ({
      ...prev,
      completedLessons: [...new Set([...(prev.completedLessons || []), lessonId])],
      xp: (prev.xp || 0) + 15,
    }))
  }

  const completeVideo = (videoId) => {
    setUser(prev => ({
      ...prev,
      completedVideos: [...new Set([...(prev.completedVideos || []), videoId])],
      xp: (prev.xp || 0) + 10,
    }))
  }

  return (
    <AppContext.Provider value={{
      user, isLoggedIn, login, logout, updateUser, addXP, completeLesson, completeVideo
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
