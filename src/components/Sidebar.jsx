import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { Home, BookOpen, Gamepad2, ClipboardList, ShoppingBag, User, LogOut, Zap } from 'lucide-react'

const NAV = [
  { path: '/home',     icon: Home,          label: 'Обучение'   },
  { path: '/lessons',  icon: BookOpen,       label: 'Видеоуроки' },
  { path: '/training', icon: Gamepad2,       label: 'Тренировка' },
  { path: '/tasks',    icon: ClipboardList,  label: 'Задания'    },
  { path: '/shop',     icon: ShoppingBag,    label: 'Магазин'    },
  { path: '/profile',  icon: User,           label: 'Профиль'    },
]

const FLAGS = { english: '🇺🇸', japanese: '🇯🇵', korean: '🇰🇷' }
const NAMES = { english: 'English', japanese: 'Japanese', korean: 'Korean' }

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const curLevel = user?.levels?.[user?.language] || 'A1'

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d1117] border-r border-[#21262d] flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-[#21262d] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">L</div>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif' }} className="font-bold text-white text-lg leading-none">LinguaQuest</div>
          <div className="text-xs text-[#8b949e] mt-0.5">Учи языки играя</div>
        </div>
      </div>

      {/* Current language badge */}
      {user && (
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161b22] border border-[#21262d]">
            <span className="text-xl">{FLAGS[user.language]}</span>
            <div>
              <div className="text-[10px] text-[#8b949e]">Изучаю</div>
              <div className="text-sm font-semibold text-white">{NAMES[user.language]}</div>
            </div>
            <span className="ml-auto text-xs font-bold text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-md">
              {curLevel}
            </span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 pt-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* XP bar */}
      {user && (
        <div className="px-3 pb-2">
          <div className="card px-3 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-semibold">
                <Zap size={13} />
                <span>{user.xp} XP</span>
              </div>
              <span className="text-[10px] text-[#8b949e]">до уровня</span>
            </div>
            <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
              <div className="progress-bar h-full" style={{ width: `${Math.min(user.xp % 100, 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 pb-3 border-t border-[#21262d] pt-3">
        <button
          onClick={() => { logout(); navigate('/') }}
          className="nav-item text-red-400 hover:text-red-300 hover:!bg-red-500/10"
        >
          <LogOut size={18} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  )
}
