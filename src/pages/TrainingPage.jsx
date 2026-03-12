import React, { useState } from 'react'
import Layout from '../components/Layout'
import LessonModal from '../components/LessonModal'
import { useApp } from '../contexts/AppContext'
import { grammarModules, LEVELS } from '../data/lessons'
import { Zap } from 'lucide-react'

export default function TrainingPage() {
  const { user, completeLesson } = useApp()
  const [activeLevel, setActiveLevel] = useState(user?.levels?.[user?.language] || 'A1')
  const [activeLesson, setActiveLesson] = useState(null)

  const modules = (grammarModules[user?.language || 'english'] || []).filter(m => m.level === activeLevel)

  return (
    <Layout title="Тренировка">
      <div className="max-w-2xl mx-auto">
        {/* Level tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {LEVELS.map(lv => (
            <button key={lv} onClick={() => setActiveLevel(lv)}
              style={{ padding: '9px 22px', borderRadius: 12, border: `1px solid ${activeLevel === lv ? '#58a6ff' : '#21262d'}`, background: activeLevel === lv ? '#58a6ff' : '#161b22', color: activeLevel === lv ? '#fff' : '#8b949e', fontFamily: 'Syne, sans-serif', fontWeight: 700, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {lv}
            </button>
          ))}
        </div>

        {modules.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔒</div>
            <p className="text-lg font-semibold text-white mb-2">Уровень пока недоступен</p>
            <p className="text-[#8b949e]">Контент для {activeLevel} скоро появится!</p>
          </div>
        )}

        {modules.map((mod, mi) => {
          const allLessonsDone = mod.lessons.every(ls => user?.completedLessons?.includes(ls.id))
          const examDone = mod.exam && user?.completedLessons?.includes(mod.exam.id)

          return (
            <div key={mod.id} className="mb-10 animate-fade-up" style={{ animationDelay: `${mi * 80}ms` }}>
              {/* Module badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 16px', borderRadius: 12, background: mod.color + '33', border: `1px solid ${mod.color}55`, color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
                {mod.title}
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: 31, top: 0, bottom: 0, width: 2, background: '#21262d' }} />

                <div className="flex flex-col gap-3">
                  {/* Lessons */}
                  {mod.lessons.map((ls, li) => {
                    const done = user?.completedLessons?.includes(ls.id)
                    const unlocked = li === 0 || user?.completedLessons?.includes(mod.lessons[li - 1]?.id)

                    return (
                      // FIX: вся строка — одна кнопка
                      <div
                        key={ls.id}
                        onClick={() => unlocked && setActiveLesson(ls)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: unlocked ? 'pointer' : 'not-allowed', opacity: unlocked ? 1 : 0.45 }}
                        onMouseEnter={e => { if (unlocked) e.currentTarget.querySelector('.lesson-card').style.borderColor = '#30363d' }}
                        onMouseLeave={e => { if (unlocked && e.currentTarget.querySelector('.lesson-card')) e.currentTarget.querySelector('.lesson-card').style.borderColor = done ? 'rgba(63,185,80,.2)' : '#21262d' }}
                      >
                        {/* Circle */}
                        <div
                          className={unlocked && !done ? 'animate-pulse-ring' : ''}
                          style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${done ? '#3fb950' : unlocked ? '#58a6ff' : '#30363d'}`, background: done ? 'rgba(63,185,80,.15)' : unlocked ? 'rgba(88,166,255,.15)' : '#161b22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, zIndex: 2, transition: 'transform .15s' }}
                          onMouseEnter={e => { if (unlocked) e.currentTarget.style.transform = 'scale(1.1)' }}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          {done ? '✅' : unlocked ? ls.icon : '🔒'}
                        </div>

                        {/* Card — FIX: кликается вся карточка */}
                        <div className="lesson-card flex-1 card p-3.5" style={{ border: `1px solid ${done ? 'rgba(63,185,80,.2)' : '#21262d'}`, transition: 'border-color .15s' }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-white text-sm">{ls.title}</div>
                              <div className="text-xs text-[#8b949e] mt-0.5">{ls.questions.length} вопросов</div>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                              <Zap size={13} /> +{ls.xp}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Exam — контрольная в конце модуля */}
                  {mod.exam && (() => {
                    const examUnlocked = allLessonsDone
                    return (
                      <div
                        onClick={() => examUnlocked && setActiveLesson(mod.exam)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: examUnlocked ? 'pointer' : 'not-allowed', opacity: examUnlocked ? 1 : 0.35, marginTop: 4 }}
                      >
                        <div
                          style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${examDone ? '#d29922' : examUnlocked ? '#d29922' : '#30363d'}`, background: examDone ? 'rgba(210,153,34,.2)' : examUnlocked ? 'rgba(210,153,34,.1)' : '#161b22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, zIndex: 2, transition: 'transform .15s' }}
                          onMouseEnter={e => { if (examUnlocked) e.currentTarget.style.transform = 'scale(1.1)' }}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          {examDone ? '🥇' : examUnlocked ? '🏁' : '🔒'}
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl" style={{ background: examUnlocked ? 'rgba(210,153,34,.06)' : '#161b22', border: `1px solid ${examDone ? 'rgba(210,153,34,.3)' : examUnlocked ? 'rgba(210,153,34,.2)' : '#21262d'}`, transition: 'all .15s' }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div style={{ fontWeight: 700, color: examUnlocked ? '#d29922' : '#8b949e', fontSize: 14 }}>{mod.exam.title}</div>
                              <div className="text-xs text-[#8b949e] mt-0.5">{mod.exam.questions.length} заданий · нужно 70%+</div>
                            </div>
                            <div style={{ color: '#d29922', fontWeight: 700, fontSize: 13 }}>⚡ +{mod.exam.xp}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          )
        })}

        {activeLesson && (
          <LessonModal lesson={activeLesson} onClose={() => setActiveLesson(null)} onComplete={completeLesson} />
        )}
      </div>
    </Layout>
  )
}
