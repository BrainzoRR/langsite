import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { Flame, Coins, Gem, ChevronDown } from 'lucide-react'

const LANGUAGES = [
  { id: 'english', flag: '🇺🇸', name: 'English' },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese' },
  { id: 'korean', flag: '🇰🇷', name: 'Korean' },
]

export default function Header({ title }) {
  const { user, updateUser } = useApp()
  const [langOpen, setLangOpen] = useState(false)

  const currentLang = LANGUAGES.find(l => l.id === user?.language) || LANGUAGES[0]

  const changeLang = (lang) => {
    updateUser({ language: lang.id })
    setLangOpen(false)
  }

  return (
    <header className="h-16 bg-[#0d1117]/80 backdrop-blur-sm border-b border-[#21262d] flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="font-display font-bold text-white text-xl">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Stats */}
        {user && (
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-sm">
              <Flame size={16} className="text-orange-400" />
              <span>{user.streak}</span>
            </div>
            <div className="w-px h-4 bg-[#21262d]" />
            <div className="flex items-center gap-1.5 text-yellow-400 font-semibold text-sm">
              <span className="text-base">🪙</span>
              <span>{user.coins}</span>
            </div>
            <div className="w-px h-4 bg-[#21262d]" />
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-sm">
              <span className="text-base">💎</span>
              <span>{user.gems}</span>
            </div>
          </div>
        )}

        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161b22] border border-[#21262d] hover:border-[#30363d] transition-colors"
          >
            <span className="text-lg">{currentLang.flag}</span>
            <span className="text-sm font-medium text-white hidden sm:block">{currentLang.name}</span>
            <ChevronDown size={14} className={`text-[#8b949e] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-2 bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => changeLang(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#21262d] transition-colors text-left
                    ${lang.id === currentLang.id ? 'text-[#58a6ff]' : 'text-white'}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {lang.id === currentLang.id && <span className="ml-auto text-[#58a6ff]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
