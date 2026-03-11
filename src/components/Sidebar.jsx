import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { Home, BookOpen, Gamepad2, ClipboardList, ShoppingBag, User, LogOut, Zap } from 'lucide-react'

const navItems = [
  { path: '/home', icon: Home, label: 'Обучение' },
  { path: '/lessons', icon: BookOpen, label: 'Видеоуроки' },
  { path: '/training', icon: Gamepad2, label: 'Тренировка' },
  { path: '/tasks', icon: ClipboardList, label: 'Задания' },
  { path: '/shop', icon: ShoppingBag, label: 'Магазин' },
  { path: '/profile', icon: User, label: 'Профиль' },
]

const langFlags = { english: '🇺🇸', japanese: '🇯🇵', korean: '🇰🇷' }
const langNames = { english: 'English', japanese: 'Japanese', korean: 'Korean' }

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d1117] border-r border-[#21262d] flex flex-col z-40">
      <div className="p-6 border-b border-[#21262d]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-lg font-bold shadow-lg">L</div>
          <div>
            <div className="font-display font-bold text-white text-lg leading-none">LinguaQuest</div>
            <div className="text-xs text-[#8b949e] mt-0.5">Учи языки играя</div>
          </div>
        </div>
      </div>

      {user && (
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-[#21262d]">
            <span className="text-xl">{langFlags[user.language]}</span>
            <div>
              <div className="text-xs text-[#8b949e]">Изучаю</div>
              <div className="text-sm font-semibold text-white">{langNames[user.language]}</div>
            </div>
            <span className="ml-auto text-xs font-mono font-bold text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-md">{user.level}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 pt-4 space-y-1 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={18} />
            <span className="font-medium text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="px-4 pb-2">
          <div className="px-3 py-3 rounded-xl bg-[#161b22] border border-[#21262d]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-semibold">
                <Zap size={14} /><span>{user.xp} XP</span>
              </div>
              <span className="text-xs text-[#8b949e]">до уровня</span>
            </div>
            <div className="h-2 bg-[#21262d] rounded-full overflow-hidden">
              <div className="progress-bar h-full" style={{ width: `${Math.min((user.xp % 100) / 100 * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-[#21262d]">
        <button onClick={() => { logout(); navigate('/') }} className="nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={18} />
          <span className="font-medium text-sm">Выйти</span>
        </button>
      </div>
    </aside>
  )
}
