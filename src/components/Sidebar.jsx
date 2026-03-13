import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { Home, BookOpen, Gamepad2, ClipboardList, ShoppingBag, User, LogOut, Zap, Trophy, GraduationCap } from 'lucide-react'
import { xpProgress, levelTitle } from '../data/leaderboard'

const NAV = [
  { path: '/home',        icon: Home,          label: 'Обучение'   },
  { path: '/lessons',     icon: BookOpen,       label: 'Видеоуроки' },
  { path: '/training',    icon: Gamepad2,       label: 'Тренировка' },
  { path: '/exams',       icon: GraduationCap,  label: 'Экзамены'   },
  { path: '/tasks',       icon: ClipboardList,  label: 'Задания'    },
  { path: '/shop',        icon: ShoppingBag,    label: 'Магазин'    },
  { path: '/leaderboard', icon: Trophy,         label: 'Лидерборд'  },
  { path: '/profile',     icon: User,           label: 'Профиль'    },
]

const FLAGS = { english: '🇺🇸', japanese: '🇯🇵', korean: '🇰🇷' }
const NAMES = { english: 'English', japanese: 'Japanese', korean: 'Korean' }

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  const { level, progress, needed, pct } = xpProgress(user?.xp || 0)
  const curLevel = user?.levels?.[user?.language] || 'A1'

  return (
    <aside style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: 256, background: '#0d1117', borderRight: '1px solid #21262d', display: 'flex', flexDirection: 'column', zIndex: 40 }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px', borderBottom: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,.3)', flexShrink: 0 }}>L</div>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: -0.5 }}>LinguaQuest</div>
          <div style={{ fontSize: 11, color: '#484f58', marginTop: 1 }}>Учи языки играя</div>
        </div>
      </div>

      {/* User mini-card */}
      {user && (
        <div style={{ padding: '10px 12px 0' }}>
          <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 14, flexShrink: 0 }}>
                {user?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                <div style={{ fontSize: 11, color: '#8b949e' }}>Уровень {level} · {levelTitle(level)}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#58a6ff', background: 'rgba(88,166,255,.1)', padding: '2px 6px', borderRadius: 5, fontFamily: 'Syne, sans-serif' }}>{curLevel}</span>
              </div>
            </div>
            {/* XP bar */}
            <div style={{ height: 4, background: '#21262d', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#58a6ff,#bc8cff)', borderRadius: 999, transition: 'width .6s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: '#484f58' }}>⚡ {user?.xp || 0} XP</span>
              <span style={{ fontSize: 10, color: '#484f58' }}>до Lv {level + 1}: {needed - progress} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
        {NAV.map(({ path, icon: Icon, label }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Current language */}
      {user && (
        <div style={{ padding: '0 10px 8px' }}>
          <div style={{ padding: '8px 12px', borderRadius: 10, background: '#161b22', border: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{FLAGS[user?.language] || '🌍'}</span>
            <span style={{ fontSize: 13, color: '#8b949e', flex: 1 }}>{NAMES[user?.language] || '...'}</span>
          </div>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: '0 10px 12px', borderTop: '1px solid #21262d', paddingTop: 8 }}>
        <button onClick={() => { logout(); navigate('/') }} className="nav-item" style={{ color: '#f87171' }}>
          <LogOut size={17} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  )
}
