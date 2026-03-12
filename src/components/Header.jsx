import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { ChevronDown, Flame } from 'lucide-react'

const LANGS = [
  { id: 'english',  flag: '🇺🇸', name: 'English'  },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese' },
  { id: 'korean',   flag: '🇰🇷', name: 'Korean'   },
]

export default function Header({ title }) {
  const { user, updateUser } = useApp()
  const [open, setOpen] = useState(false)
  const cur = LANGS.find(l => l.id === user?.language) || LANGS[0]

  return (
    <header className="h-16 bg-[#0d1117]/80 backdrop-blur-sm border-b border-[#21262d] flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="font-bold text-white text-xl">{title}</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:flex items-center gap-3 text-sm font-semibold">
            <span className="flex items-center gap-1.5 text-orange-400">
              <Flame size={15} /> {user.streak}
            </span>
            <span className="w-px h-4 bg-[#30363d]" />
            <span className="text-yellow-400">🪙 {user.coins}</span>
            <span className="w-px h-4 bg-[#30363d]" />
            <span className="text-cyan-400">💎 {user.gems}</span>
          </div>
        )}

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161b22] border border-[#21262d] hover:border-[#30363d] text-white text-sm transition-colors cursor-pointer"
          >
            <span className="text-lg">{cur.flag}</span>
            <span className="hidden sm:block font-medium">{cur.name}</span>
            <ChevronDown size={13} className={`text-[#8b949e] transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]">
              {LANGS.map(l => (
                <button
                  key={l.id}
                  onClick={() => { updateUser({ language: l.id }); setOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#21262d] transition-colors text-left cursor-pointer"
                  style={{ color: l.id === cur.id ? '#58a6ff' : '#fff', border: 'none', background: 'transparent', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}
                >
                  <span className="text-lg">{l.flag}</span>
                  {l.name}
                  {l.id === cur.id && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
