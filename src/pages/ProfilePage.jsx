import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { Zap, Flame, BookOpen, Calendar, Crown, Edit2, Check } from 'lucide-react'

const langFlags = { english: '🇺🇸', japanese: '🇯🇵', korean: '🇰🇷' }
const langNames = { english: 'English', japanese: 'Japanese', korean: 'Korean' }

export default function ProfilePage() {
  const { user, updateUser } = useApp()
  const [editing, setEditing] = useState(false)
  const [nameVal, setNameVal] = useState(user?.name || '')

  const subEnd = user?.subscriptionEnds ? new Date(user.subscriptionEnds) : null
  const subStart = user?.subscribedAt ? new Date(user.subscribedAt) : null

  const saveEdit = () => {
    if (nameVal.trim()) updateUser({ name: nameVal.trim() })
    setEditing(false)
  }

  return (
    <Layout title="Профиль">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Avatar + Name */}
        <div className="card p-6 border border-[#21262d]">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center text-3xl shadow-xl">
                {user?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-[#d29922] flex items-center justify-center text-sm">
                👑
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={nameVal}
                      onChange={e => setNameVal(e.target.value)}
                      className="bg-[#0d1117] border border-[#58a6ff] rounded-lg px-3 py-1 text-white text-lg font-bold font-display focus:outline-none"
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                    <button onClick={saveEdit} className="text-[#3fb950] hover:text-green-300"><Check size={18} /></button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-2xl text-white">{user?.name}</h2>
                    <button onClick={() => setEditing(true)} className="text-[#8b949e] hover:text-white transition-colors">
                      <Edit2 size={14} />
                    </button>
                  </>
                )}
              </div>
              <p className="text-[#8b949e] text-sm">{user?.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl">{langFlags[user?.language]}</span>
                <span className="text-sm font-medium text-white">{langNames[user?.language]}</span>
                <span className="text-xs font-mono font-bold text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-md">
                  {user?.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Zap size={18} className="text-yellow-400" />, value: user?.xp || 0, label: 'Опыт (XP)', color: 'from-yellow-500/10' },
            { icon: <Flame size={18} className="text-orange-400" />, value: user?.streak || 0, label: 'Дней подряд', color: 'from-orange-500/10' },
            { icon: <BookOpen size={18} className="text-blue-400" />, value: user?.completedLessons?.length || 0, label: 'Уроков', color: 'from-blue-500/10' },
          ].map((stat, i) => (
            <div key={i} className={`card p-5 border border-[#21262d] bg-gradient-to-b ${stat.color} to-transparent`}>
              <div className="flex items-center gap-2 mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
              <div className="text-xs text-[#8b949e] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="card p-5 border border-[#d29922]/30 bg-[#d29922]/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d29922]/20 flex items-center justify-center">
                <Crown size={20} className="text-[#d29922]" />
              </div>
              <div>
                <div className="font-semibold text-white">Premium подписка</div>
                <div className="text-xs text-[#8b949e] mt-0.5">
                  {subEnd ? `Активна до ${subEnd.toLocaleDateString('ru-RU')}` : 'Нет активной подписки'}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#d29922] bg-[#d29922]/10 border border-[#d29922]/30 px-2 py-1 rounded-lg">PREMIUM</span>
          </div>
          {subStart && (
            <div className="text-xs text-[#8b949e] mt-3 flex items-center gap-1.5">
              <Calendar size={12} />
              Подписка с {subStart.toLocaleDateString('ru-RU')}
            </div>
          )}
          <button className="btn-primary w-full mt-4">
            💳 Продлить подписку
          </button>
        </div>

        {/* Video progress */}
        {user?.completedVideos?.length > 0 && (
          <div className="card p-5 border border-[#21262d]">
            <h3 className="font-display font-semibold text-white mb-3">📹 Видеоуроки</h3>
            <div className="text-sm text-[#8b949e]">
              Просмотрено видео: <span className="text-white font-semibold">{user.completedVideos.length}</span>
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div className="card p-5 border border-red-500/20">
          <h3 className="font-semibold text-white mb-1">Данные аккаунта</h3>
          <p className="text-sm text-[#8b949e] mb-4">Сброс прогресса удалит все данные</p>
          <button
            onClick={() => {
              if (window.confirm('Сбросить весь прогресс?')) {
                updateUser({ xp: 0, completedLessons: [], completedVideos: [], streak: 0 })
              }
            }}
            className="text-sm text-red-400 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            Сбросить прогресс
          </button>
        </div>
      </div>
    </Layout>
  )
}
