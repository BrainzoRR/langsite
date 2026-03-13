import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { dailyGoalOptions } from '../data/lessons'
import { Flame, Zap, BookOpen } from 'lucide-react'

const CATS = [
  { id: 'g',    icon: '🎯', title: 'Тренировка',  desc: 'Грамматика и уроки',  count: 24,  grad: 'linear-gradient(135deg,rgba(29,78,216,.8),rgba(30,58,138,.8))',  border: 'rgba(59,130,246,.3)',  path: '/training'    },
  { id: 'exam', icon: '🎓', title: 'Экзамены',    desc: 'Переход на след. уровень', count: null, grad: 'linear-gradient(135deg,rgba(210,153,34,.7),rgba(161,110,17,.8))', border: 'rgba(210,153,34,.35)', path: '/exams'    },
  { id: 'vid',  icon: '🎬', title: 'Видеоуроки',  desc: 'Записанные уроки',    count: 12,  grad: 'linear-gradient(135deg,rgba(5,150,105,.8),rgba(4,120,87,.8))',   border: 'rgba(16,185,129,.3)', path: '/lessons'     },
  { id: 'lb',   icon: '🏆', title: 'Лидерборд',   desc: 'Топ недели и месяца', count: null, grad: 'linear-gradient(135deg,rgba(180,83,9,.75),rgba(146,64,14,.8))', border: 'rgba(245,158,11,.3)', path: '/leaderboard' },
  { id: 'live', icon: '📡', title: 'Трансляции',  desc: 'Coming soon',         count: null, grad: 'linear-gradient(135deg,rgba(51,65,85,.7),rgba(30,41,59,.7))',   border: 'rgba(100,116,139,.15)', path: null },
  { id: 'ev',   icon: '🎁', title: 'События',     desc: 'Coming soon',         count: null, grad: 'linear-gradient(135deg,rgba(190,18,60,.7),rgba(136,19,55,.7))', border: 'rgba(244,63,94,.15)',  path: null },
]

export default function HomePage() {
  const { user } = useApp()
  const navigate = useNavigate()
  const goalOpt = dailyGoalOptions.find(g => g.minutes === (user?.dailyGoal || 30)) || dailyGoalOptions[2]

  const dailyTasks = [
    { id: 'dt1', title: `Заработай ${goalOpt.minutes * 2} XP`,  icon: '⚡', cur: Math.min(user?.xp || 0, goalOpt.minutes * 2), max: goalOpt.minutes * 2, col: '#58a6ff' },
    { id: 'dt2', title: 'Пройди 3 урока',                       icon: '📚', cur: Math.min(user?.completedLessons?.length || 0, 3), max: 3, col: '#3fb950' },
    { id: 'dt3', title: 'Серия ответов ×10',                    icon: '🔥', cur: 6, max: 10, col: '#f78166' },
    { id: 'dt4', title: 'Посмотри видеоурок',                   icon: '🎬', cur: Math.min(user?.completedVideos?.length || 0, 1), max: 1, col: '#bc8cff' },
  ]

  return (
    <Layout title="Обучение">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 animate-fade-up">
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white mb-1">
            Привет, {user?.name || 'путешественник'}! 👋
          </h2>
          <p className="text-[#8b949e]">Продолжай учиться — ты молодец!</p>
        </div>

        <div className="flex gap-6">
          {/* Main */}
          <div className="flex-1">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { icon: <Flame size={20} className="text-orange-400" />, val: user?.streak || 0,                        label: 'Дней подряд' },
                { icon: <Zap size={20} className="text-yellow-400" />,   val: user?.xp || 0,                            label: 'Всего XP'    },
                { icon: <BookOpen size={20} className="text-blue-400" />, val: user?.completedLessons?.length || 0,      label: 'Уроков'      },
              ].map((s, i) => (
                <div key={i} className="card p-4 flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-[#21262d] flex items-center justify-center">{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-xs text-[#8b949e]">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {CATS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => c.path && navigate(c.path)}
                  disabled={!c.path}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    position: 'relative', borderRadius: 18, border: `1px solid ${c.border}`,
                    background: c.grad, padding: '22px 18px', textAlign: 'left',
                    cursor: c.path ? 'pointer' : 'not-allowed', opacity: c.path ? 1 : 0.7,
                    transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { if (c.path) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,.3)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {!c.path && <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontFamily: 'monospace', background: 'rgba(0,0,0,.5)', color: '#fff', padding: '2px 8px', borderRadius: 99 }}>SOON</span>}
                  <div style={{ fontSize: 34, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif' }} className="text-base font-bold text-white mb-1">{c.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)' }}>{c.desc}</div>
                  {c.count && <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: 'monospace' }}>{c.count} заданий</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Daily panel */}
          <div className="w-64 shrink-0">
            <div className="card p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="font-bold text-white flex items-center gap-2">
                  ☀️ Задания дня
                </h3>
                <span className="text-[10px] text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded-full">{goalOpt.desc}</span>
              </div>

              {dailyTasks.map(t => {
                const pct = Math.min(t.cur / t.max * 100, 100)
                const done = t.cur >= t.max
                return (
                  <div key={t.id} className="mb-3 rounded-xl p-2.5" style={{ border: `1px solid ${done ? 'rgba(63,185,80,.2)' : '#21262d'}`, background: done ? 'rgba(63,185,80,.04)' : 'transparent' }}>
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-white font-medium">{t.icon} {t.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                        <div style={{ height: '100%', width: `${pct}%`, background: t.col, borderRadius: 999, transition: 'width .5s' }} />
                      </div>
                      <span className="text-[10px] text-[#8b949e] font-mono whitespace-nowrap">{t.cur}/{t.max}</span>
                    </div>
                    {done && <div className="text-[10px] text-[#3fb950] font-semibold mt-1">✓ Выполнено!</div>}
                  </div>
                )
              })}

              <div className="pt-4 border-t border-[#21262d] mt-2">
                <div className="text-xs text-[#8b949e] font-semibold mb-2">Активность</div>
                <div className="flex gap-1 justify-between">
                  {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((d, i) => (
                    <div key={d} className="flex flex-col items-center gap-1">
                      <div style={{ width: 24, height: 24, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, background: i < 5 ? 'rgba(88,166,255,.15)' : '#21262d', border: `1px solid ${i < 5 ? 'rgba(88,166,255,.2)' : '#21262d'}` }}>
                        {i < 5 ? '🔥' : ''}
                      </div>
                      <span className="text-[9px] text-[#8b949e]">{d}</span>
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
