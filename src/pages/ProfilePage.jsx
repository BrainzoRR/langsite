import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { LEVELS } from '../data/lessons'
import { Crown, Calendar } from 'lucide-react'

const LANGS = [
  { id: 'english',  flag: '🇺🇸', name: 'English'  },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese' },
  { id: 'korean',   flag: '🇰🇷', name: 'Korean'   },
]

export default function ProfilePage() {
  const { user, updateUser } = useApp()
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(user?.name || '')
  const [editLang, setEditLang] = useState(null) // id языка, чей уровень редактируем

  const sub = user?.subscriptionEnds ? new Date(user.subscriptionEnds) : null

  const saveName = () => { if (nameVal.trim()) updateUser({ name: nameVal.trim() }); setEditingName(false) }

  const setLevel = (langId, level) => {
    updateUser({ levels: { ...user.levels, [langId]: level } })
    setEditLang(null)
  }

  return (
    <Layout title="Профиль">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Avatar + Name */}
        <div className="card p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,.3)' }}>
                {user?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: 8, background: '#d29922', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>👑</div>
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex items-center gap-2 mb-1">
                  <input value={nameVal} onChange={e => setNameVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveName()} autoFocus
                    className="input-field text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif', maxWidth: 220 }} />
                  <button onClick={saveName} style={{ background: 'none', border: 'none', color: '#3fb950', cursor: 'pointer', fontSize: 20 }}>✓</button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white">{user?.name}</h2>
                  <button onClick={() => setEditingName(true)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: 14 }}>✏️</button>
                </div>
              )}
              <div className="text-sm text-[#8b949e]">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { e: '⚡', v: user?.xp || 0,                          l: 'Опыт (XP)'   },
            { e: '🔥', v: user?.streak || 0,                      l: 'Дней подряд' },
            { e: '📚', v: user?.completedLessons?.length || 0,    l: 'Уроков'      },
          ].map((s, i) => (
            <div key={i} className="card p-4">
              <div className="text-2xl mb-2">{s.e}</div>
              <div style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white">{s.v}</div>
              <div className="text-xs text-[#8b949e] mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* FIX: Per-language levels */}
        <div className="card p-5">
          <div style={{ fontFamily: 'Syne, sans-serif' }} className="font-bold text-white text-base mb-1">Уровни по языкам</div>
          <div className="text-xs text-[#8b949e] mb-4">У каждого языка свой независимый уровень</div>

          <div className="space-y-2">
            {LANGS.map(lang => {
              const curLvl = user?.levels?.[lang.id] || 'A1'
              const isEditing = editLang === lang.id
              return (
                <div key={lang.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#0d1117', borderRadius: 12, border: `1px solid ${isEditing ? '#58a6ff' : '#21262d'}`, transition: 'border-color .2s' }}>
                    <span style={{ fontSize: 22 }}>{lang.flag}</span>
                    <span className="font-semibold text-white flex-1 text-sm">{lang.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff', background: 'rgba(88,166,255,.1)', padding: '3px 10px', borderRadius: 8 }}>{curLvl}</span>
                    <button
                      onClick={() => setEditLang(isEditing ? null : lang.id)}
                      style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 8, fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {isEditing ? '✕' : 'Изменить'}
                    </button>
                  </div>

                  {isEditing && (
                    <div style={{ padding: 12, background: 'rgba(88,166,255,.04)', border: '1px solid rgba(88,166,255,.12)', borderRadius: '0 0 12px 12px', marginTop: -4 }}>
                      <div className="text-xs text-[#8b949e] mb-3">⚠️ Смена уровня меняет сложность — прогресс не сбрасывается</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                        {LEVELS.map(lv => (
                          <button key={lv} onClick={() => setLevel(lang.id, lv)}
                            style={{ padding: '10px 0', borderRadius: 10, border: `1px solid ${curLvl === lv ? '#58a6ff' : '#21262d'}`, background: curLvl === lv ? 'rgba(88,166,255,.2)' : 'transparent', color: curLvl === lv ? '#58a6ff' : '#8b949e', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                            {lv}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Subscription */}
        <div style={{ background: 'rgba(210,153,34,.06)', border: '1px solid rgba(210,153,34,.2)', borderRadius: 18, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(210,153,34,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crown size={20} style={{ color: '#d29922' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="font-semibold text-white">Premium подписка</div>
              <div className="text-xs text-[#8b949e]">{sub ? `Активна до ${sub.toLocaleDateString('ru-RU')}` : 'Нет активной подписки'}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#d29922', background: 'rgba(210,153,34,.1)', border: '1px solid rgba(210,153,34,.25)', padding: '3px 10px', borderRadius: 8 }}>PREMIUM</span>
          </div>
          {sub && (
            <div className="text-xs text-[#8b949e] mb-4 flex items-center gap-1.5">
              <Calendar size={12} /> Подписка с {new Date(user?.subscribedAt).toLocaleDateString('ru-RU')}
            </div>
          )}
          <button className="btn-primary w-full py-3">💳 Продлить подписку</button>
        </div>

        {/* Danger */}
        <div style={{ background: 'rgba(239,68,68,.04)', border: '1px solid rgba(239,68,68,.15)', borderRadius: 16, padding: 18 }}>
          <div className="font-semibold text-white mb-1">Опасная зона</div>
          <div className="text-xs text-[#8b949e] mb-4">Сброс прогресса удалит все данные об обучении</div>
          <button
            onClick={() => { if (window.confirm('Сбросить весь прогресс?')) updateUser({ xp: 0, completedLessons: [], completedVideos: [], streak: 0 }) }}
            style={{ background: 'none', border: '1px solid rgba(239,68,68,.3)', color: '#f87171', borderRadius: 10, padding: '9px 16px', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
            Сбросить прогресс
          </button>
        </div>
      </div>
    </Layout>
  )
}
