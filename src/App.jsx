import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './contexts/AppContext'
import AuthPage    from './pages/AuthPage'
import HomePage    from './pages/HomePage'
import LessonsPage from './pages/LessonsPage'
import TrainingPage from './pages/TrainingPage'
import TasksPage   from './pages/TasksPage'
import ShopPage    from './pages/ShopPage'
import ProfilePage from './pages/ProfilePage'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? children : <Navigate to="/" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useApp()
  return (
    <Routes>
      <Route path="/"         element={isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage />} />
      <Route path="/home"     element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/lessons"  element={<PrivateRoute><LessonsPage /></PrivateRoute>} />
      <Route path="/training" element={<PrivateRoute><TrainingPage /></PrivateRoute>} />
      <Route path="/tasks"    element={<PrivateRoute><TasksPage /></PrivateRoute>} />
      <Route path="/shop"     element={<PrivateRoute><ShopPage /></PrivateRoute>} />
      <Route path="/profile"  element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
