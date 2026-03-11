import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { dailyTasks } from '../data/lessons'
import { Trophy, Radio, Gift, Zap, Flame } from 'lucide-react'

const categories = [
  { id: 'grammar', icon: '🎯', title: 'Грамматика', desc: 'Игры и упражнения', count: 24, color: 'from-blue-600/80 to-blue-800/80', border: 'border-blue-500/30', path: '/training' },
  { id: 'vocab', icon: '📚', title: 'Новые слова', desc: 'Изучение лексики', count: 150, color: 'from-violet-600/80 to-violet-800/80', border: 'border-violet-500/30', path: '/training' },
  { id: 'video', icon: '🎬', title: 'Видеоуроки', desc: 'Записанные уроки', count: 12, color: 'from-emerald-600/80 to-emerald-800/80', border: 'border-emerald-500/30', path: '/lessons' },
  { id: 'live', icon: '📡', title: 'Трансляции', desc: 'Coming soon', count: null, color: 'from-slate-700/80 to-slate-800/80', border: 'border-slate-500/30', path: null, soon: true },
  { id: 'league', icon: '🏆', title: 'Лиги', desc: 'Рейтинг игроков', count: null, color: 'from-amber-600/80 to-amber-800/80', border: 'border-amber-500/30', path: null, soon: true },
  { id: 'events', icon: '🎁', title: 'События', desc: 'Coming soon', count: null, color: 'from-rose-600/80 to-rose-800/80', border: 'border-rose-500/30', path: null, soon: true },
]

function CategoryCard({ cat, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={cat.soon}
      className={`relative overflow-hidden rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.color}
        p-6 text-left transition-all duration-300 
        ${cat.soon ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-2xl cursor-pointer'}`}
    >
      {cat.soon && (
        <span className="absolute top-3 right-3 text-xs font-mono bg-black/40 text-white px-2 py-0.5 rounded-full">
          SOON
        </span>
      )}
      <div className="text-4xl mb-3">{cat.icon}</div>
      <div className="font-display font-bold text-white text-lg leading-tight mb-1">{cat.title}</div>
      <div className="text-sm text-white/60">{cat.desc}</div>
      {cat.count && (
        <div className="mt-3 text-xs font-mono text-white/40">{cat.count} заданий</div>
      )}
    </button>
  )
}

export default function HomePage() {
  const { user } = useApp()
  const navigate = useNavigate()

  return (
    <Layout title="Обучение">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-8 animate-fade-up">
          <h2 className="font-display font-bold text-2xl text-white mb-1">
            Привет, {user?.name || 'путешественник'}! 👋
          </h2>
          <p className="text-[#8b949e]">Продолжай учиться — ты молодец!</p>
        </div>

        <div className="flex gap-6">
          {/* Main grid */}
          <div className="flex-1">
            {/* Streak / XP bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Flame size={20} className="text-orange-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">{user?.streak}</div>
                  <div className="text-xs text-[#8b949e]">Дней подряд</div>
                </div>
              </div>
              <div className="flex-1 card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-yellow-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">{user?.xp}</div>
                  <div className="text-xs text-[#8b949e]">Всего XP</div>
                </div>
              </div>
              <div className="flex-1 card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Trophy size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">{user?.completedLessons?.length || 0}</div>
                  <div className="text-xs text-[#8b949e]">Пройдено уроков</div>
                </div>
              </div>
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <div key={cat.id} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <CategoryCard cat={cat} onClick={() => cat.path && navigate(cat.path)} />
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar - daily tasks */}
          <div className="w-72 shrink-0">
            <div className="card p-5 sticky top-20">
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-lg">☀️</span> Задания дня
              </h3>
              <div className="space-y-4">
                {dailyTasks.map(task => {
                  const pct = Math.min(task.current / task.target * 100, 100)
                  const done = task.current >= task.target
                  return (
                    <div key={task.id} className={`rounded-xl p-3 border transition-colors ${done ? 'border-[#3fb950]/30 bg-[#3fb950]/5' : 'border-[#21262d]'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                          <span>{task.icon}</span>
                          <span>{task.title}</span>
                        </div>
                        <span className="text-xs font-mono text-[#8b949e]">+{task.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: task.color }} />
                        </div>
                        <span className="text-xs text-[#8b949e] whitespace-nowrap">{task.current}/{task.target}</span>
                      </div>
                      {done && <div className="text-xs text-[#3fb950] mt-1 font-semibold">✓ Выполнено!</div>}
                    </div>
                  )
                })}
              </div>

              {/* Weekly progress */}
              <div className="mt-5 pt-5 border-t border-[#21262d]">
                <h4 className="text-sm font-semibold text-[#8b949e] mb-3">Активность на неделе</h4>
                <div className="flex gap-1.5 justify-between">
                  {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((day, i) => (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs
                        ${i < 5 ? 'bg-[#58a6ff]/20 border border-[#58a6ff]/30' : 'bg-[#21262d] border border-[#21262d]'}`}>
                        {i < 5 ? '🔥' : ''}
                      </div>
                      <span className="text-[10px] text-[#8b949e]">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
