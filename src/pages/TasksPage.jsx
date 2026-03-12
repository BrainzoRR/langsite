import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { dailyGoalOptions } from '../data/lessons'
import { CheckCircle2, Calendar } from 'lucide-react'

const achievements = [
  { icon: '🌱', title: 'Первый урок',   desc: 'Пройди первый урок',    key: u => (u?.completedLessons?.length || 0) > 0 },
  { icon: '🔥', title: 'Полная неделя', desc: '7 дней подряд',         key: u => (u?.streak || 0) >= 7 },
  { icon: '📚', title: 'Грамматик',     desc: 'Пройди 10 уроков',      key: u => (u?.completedLessons?.length || 0) >= 10 },
  { icon: '🌍', title: 'Полиглот',      desc: 'Изучай 2 языка',        key: () => false },
  { icon: '⚡', title: 'Скоростной',    desc: '500 XP за всё время',   key: u => (u?.xp || 0) >= 500 },
  { icon: '🏁', title: 'Отличник',      desc: 'Сдай контрольную 100%', key: () => false },
]

function TaskCard({ t }) {
  const pct = Math.min(t.cur / t.max * 100, 100)
  const done = t.cur >= t.max
  return (
    <div className="card p-4 flex items-center gap-4 mb-3" style={{ border: `1px solid ${done ? 'rgba(63,185,80,.2)' : '#21262d'}` }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: t.col + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{t.icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">{t.title}</span>
          {t.xp && <span className="text-xs font-mono text-yellow-400">+{t.xp} XP</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
            <div style={{ height: '100%', width: `${pct}%`, background: t.col, borderRadius: 999, transition: 'width .5s' }} />
          </div>
          <span className="text-[10px] text-[#8b949e] font-mono whitespace-nowrap">{t.cur}/{t.max}</span>
        </div>
        {done && <div className="text-xs text-[#3fb950] font-semibold mt-1 flex items-center gap-1"><CheckCircle2 size={11} /> Выполнено!</div>}
      </div>
    </div>
  )
}

export default function TasksPage() {
  const { user, updateUser } = useApp()
  const [tab, setTab] = useState('daily')
  const [showGoal, setShowGoal] = useState(false)

  const curGoal = dailyGoalOptions.find(g => g.minutes === (user?.dailyGoal || 30)) || dailyGoalOptions[2]

  const daily = [
    { id: 'dt1', title: `Заработай ${curGoal.minutes * 2} XP`,    icon: '⚡', cur: Math.min(user?.xp || 0, curGoal.minutes * 2), max: curGoal.minutes * 2, col: '#58a6ff' },
    { id: 'dt2', title: 'Пройди 3 урока',                          icon: '📚', cur: Math.min(user?.completedLessons?.length || 0, 3), max: 3, col: '#3fb950' },
    { id: 'dt3', title: 'Серия ответов ×10',                       icon: '🔥', cur: 6, max: 10, col: '#f78166' },
    { id: 'dt4', title: 'Посмотри видеоурок',                      icon: '🎬', cur: Math.min(user?.completedVideos?.length || 0, 1), max: 1, col: '#bc8cff' },
  ]
  const weekly = [
    { id: 'w1', title: 'Пройди 10 уроков',              icon: '📘', cur: Math.min(user?.completedLessons?.length || 0, 10), max: 10, xp: 50, col: '#58a6ff' },
    { id: 'w2', title: `Набери ${curGoal.minutes * 10} XP`, icon: '⚡', cur: Math.min(user?.xp || 0, curGoal.minutes * 10), max: curGoal.minutes * 10, xp: 80, col: '#d29922' },
    { id: 'w3', title: 'Посмотри 5 видео',              icon: '🎬', cur: Math.min(user?.completedVideos?.length || 0, 5), max: 5, xp: 40, col: '#bc8cff' },
    { id: 'w4', title: '7-дневная серия',                icon: '🔥', cur: user?.streak || 0, max: 7, xp: 100, col: '#f78166' },
  ]

  return (
    <Layout title="Задания">
      <div className="max-w-2xl mx-auto">
        {/* Daily goal block */}
        <div style={{ background: 'rgba(88,166,255,.06)', border: '1px solid rgba(88,166,255,.15)', borderRadius: 16, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#8b949e', marginBottom: 2 }}>Интенсивность обучения</div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{curGoal.label} — {curGoal.desc}</div>
          </div>
          <button onClick={() => setShowGoal(!showGoal)} style={{ background: '#21262d', border: '1px solid #30363d', borderRadius: 10, color: '#8b949e', cursor: 'pointer', fontSize: 13, padding: '7px 14px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
            {showGoal ? 'Закрыть' : 'Изменить'}
          </button>
        </div>

        {showGoal && (
          <div className="card p-4 mb-5" style={{ border: '1px solid #21262d' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 14 }}>Выбери цель на каждый день</div>
            <div className="space-y-2">
              {dailyGoalOptions.map(g => (
                <button key={g.id} onClick={() => { updateUser({ dailyGoal: g.minutes }); setShowGoal(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, border: `1px solid ${curGoal.id === g.id ? '#58a6ff' : '#21262d'}`, background: curGoal.id === g.id ? 'rgba(88,166,255,.08)' : 'transparent', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                  <span style={{ fontSize: 22 }}>{g.label.split(' ')[0]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{g.label.split(' ').slice(1).join(' ')}</div>
                    <div style={{ fontSize: 12, color: '#8b949e' }}>{g.desc}</div>
                  </div>
                  {curGoal.id === g.id && <span style={{ color: '#58a6ff', fontSize: 18 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: '#161b22', padding: 6, borderRadius: 16, border: '1px solid #21262d' }}>
          {[{ id: 'daily', l: '☀️ Ежедневные' }, { id: 'weekly', l: '📅 Еженедельные' }, { id: 'ach', l: '🏆 Достижения' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1px solid ${tab === t.id ? '#21262d' : 'transparent'}`, background: tab === t.id ? '#0d1117' : 'transparent', color: tab === t.id ? '#fff' : '#8b949e', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === 'daily' && (
          <div>
            <p className="text-sm text-[#8b949e] mb-4 flex items-center gap-2"><Calendar size={13} /> Обновляются каждый день в 00:00</p>
            {daily.map(t => <TaskCard key={t.id} t={t} />)}
          </div>
        )}
        {tab === 'weekly' && (
          <div>
            <p className="text-sm text-[#8b949e] mb-4">Обновляются каждый понедельник</p>
            {weekly.map(t => <TaskCard key={t.id} t={t} />)}
          </div>
        )}
        {tab === 'ach' && (
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a, i) => {
              const unlocked = a.key(user)
              return (
                <div key={i} className="card p-4 animate-fade-up" style={{ border: `1px solid ${unlocked ? 'rgba(210,153,34,.2)' : '#21262d'}`, opacity: unlocked ? 1 : 0.65, animationDelay: `${i * 60}ms` }}>
                  <div style={{ fontSize: 32, marginBottom: 8, filter: unlocked ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{a.title}</div>
                  <div className="text-xs text-[#8b949e]">{a.desc}</div>
                  {unlocked && <div style={{ fontSize: 11, color: '#d29922', fontWeight: 600, marginTop: 6 }}>✓ Получено!</div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
