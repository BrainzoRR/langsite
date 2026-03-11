import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { dailyTasks } from '../data/lessons'
import { CheckCircle2, Circle, Zap, Trophy, Calendar } from 'lucide-react'

const weeklyTasks = [
  { id: 'w1', title: 'Пройди 10 уроков грамматики', icon: '📘', current: 3, target: 10, xp: 50, color: '#58a6ff' },
  { id: 'w2', title: 'Набери 300 XP за неделю', icon: '⚡', current: 120, target: 300, xp: 80, color: '#d29922' },
  { id: 'w3', title: 'Посмотри 5 видеоуроков', icon: '🎬', current: 2, target: 5, xp: 40, color: '#bc8cff' },
  { id: 'w4', title: '7-дневная серия', icon: '🔥', current: 5, target: 7, xp: 100, color: '#f78166' },
]

const achievements = [
  { id: 'a1', title: 'Первый урок', icon: '🌱', desc: 'Пройди первый урок', unlocked: true },
  { id: 'a2', title: 'Полная неделя', icon: '🔥', desc: '7 дней подряд', unlocked: true },
  { id: 'a3', title: 'Грамматик', icon: '📚', desc: 'Пройди 10 уроков грамматики', unlocked: false },
  { id: 'a4', title: 'Полиглот', icon: '🌍', desc: 'Начни учить 2 языка', unlocked: false },
  { id: 'a5', title: 'Скоростной', icon: '⚡', desc: 'Набери 500 XP за день', unlocked: false },
  { id: 'a6', title: 'Мастер слов', icon: '💎', desc: 'Изучи 100 слов', unlocked: false },
]

function TaskCard({ task, type = 'daily' }) {
  const pct = Math.min(task.current / task.target * 100, 100)
  const done = task.current >= task.target
  return (
    <div className={`card p-5 border transition-all ${done ? 'border-[#3fb950]/30' : 'border-[#21262d]'}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: task.color + '20' }}>
          {task.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-white text-sm">{task.title}</h3>
            <span className="text-xs font-mono text-yellow-400 whitespace-nowrap flex items-center gap-1">
              <Zap size={11} />+{task.xp} XP
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: task.color }} />
            </div>
            <span className="text-xs font-mono text-[#8b949e] whitespace-nowrap">{task.current}/{task.target}</span>
          </div>
          {done && <div className="text-xs text-[#3fb950] font-semibold mt-1.5 flex items-center gap-1"><CheckCircle2 size={12} /> Выполнено!</div>}
        </div>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const { user } = useApp()
  const [tab, setTab] = useState('daily')

  return (
    <Layout title="Задания">
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#161b22] p-1.5 rounded-2xl border border-[#21262d]">
          {[
            { id: 'daily', label: '☀️ Ежедневные' },
            { id: 'weekly', label: '📅 Еженедельные' },
            { id: 'achievements', label: '🏆 Достижения' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${tab === t.id ? 'bg-[#0d1117] text-white border border-[#21262d]' : 'text-[#8b949e] hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'daily' && (
          <div className="space-y-3">
            <p className="text-sm text-[#8b949e] mb-4 flex items-center gap-2">
              <Calendar size={14} />
              Обновляются каждый день в 00:00
            </p>
            {dailyTasks.map((task, i) => (
              <div key={task.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        )}

        {tab === 'weekly' && (
          <div className="space-y-3">
            <p className="text-sm text-[#8b949e] mb-4">Обновляются каждый понедельник</p>
            {weeklyTasks.map((task, i) => (
              <div key={task.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <TaskCard task={task} type="weekly" />
              </div>
            ))}
          </div>
        )}

        {tab === 'achievements' && (
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((ach, i) => (
              <div
                key={ach.id}
                className={`card p-4 border transition-all animate-fade-up
                  ${ach.unlocked ? 'border-[#d29922]/30 bg-[#d29922]/5' : 'border-[#21262d] opacity-60'}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`text-3xl mb-2 ${!ach.unlocked ? 'grayscale' : ''}`}>{ach.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{ach.title}</div>
                <div className="text-xs text-[#8b949e]">{ach.desc}</div>
                {ach.unlocked && (
                  <div className="mt-2 text-xs text-[#d29922] font-semibold flex items-center gap-1">
                    <CheckCircle2 size={11} /> Получено!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
