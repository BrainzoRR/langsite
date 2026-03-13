import React, { useState } from 'react'
import Layout from '../components/Layout'
import LessonModal from '../components/LessonModal'
import { useApp } from '../contexts/AppContext'
import { grammarModules, LEVELS } from '../data/lessons'
import { Zap, Lock } from 'lucide-react'

// Экзамены по уровням (id из exams.js) — для проверки доступа
const LEVEL_EXAM_MAP = {
  english:  { A1: null, A2: 'exam-a1-a2', B1: 'exam-a2-b1', B2: 'exam-b1-b2', C1: 'exam-b2-c1' },
  japanese: { A1: null, A2: 'exam-ja-a1-a2', B1: null, B2: null, C1: null },
  korean:   { A1: null, A2: 'exam-ko-a1-a2', B1: null, B2: null, C1: null },
}

export default function TrainingPage() {
  const { user, completeLesson } = useApp()
  const [activeLevel, setActiveLevel] = useState(user?.levels?.[user?.language] || 'A1')
  const [activeLesson, setActiveLesson] = useState(null)

  const lang = user?.language || 'english'
  const modules = (grammarModules[lang] || []).filter(m => m.level === activeLevel)
  const completedExams = user?.completedExams || []

  // Доступен ли уровень: A1 всегда, остальные — только после сдачи предыдущего экзамена
  const isLevelUnlocked = (level) => {
    const examId = LEVEL_EXAM_MAP[lang]?.[level]
    if (!examId) return true // A1 или нет экзамена — доступен
    return completedExams.includes(examId)
  }

  const levelUnlocked = isLevelUnlocked(activeLevel)

  return (
    <Layout title="Тренировка">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Level tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
          {LEVELS.map(lv => {
            const unlocked = isLevelUnlocked(lv)
            const active = activeLevel === lv
            return (
              <button key={lv} onClick={() => setActiveLevel(lv)} style={{
                padding: '9px 22px', borderRadius: 12, flexShrink: 0,
                border: `1px solid ${active ? '#58a6ff' : unlocked ? '#21262d' : '#21262d'}`,
                background: active ? '#58a6ff' : '#161b22',
                color: active ? '#fff' : unlocked ? '#8b949e' : '#484f58',
                fontFamily: 'Syne, sans-serif', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                position: 'relative',
              }}>
                {!unlocked && <Lock size={10} style={{ position: 'absolute', top: 4, right: 4, color: '#484f58' }} />}
                {lv}
              </button>
            )
          })}
        </div>

        {/* Locked level message */}
        {!levelUnlocked && (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: '#161b22', borderRadius: 20, border: '1px solid #21262d' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔒</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Уровень {activeLevel} заблокирован</h3>
            <p style={{ color: '#8b949e', marginBottom: 20, lineHeight: 1.6 }}>
              Чтобы открыть этот уровень, сдай экзамен на переход с предыдущего.
            </p>
            <a href="/exams" style={{ display: 'inline-block', padding: '12px 24px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: 12, color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
              🎓 Перейти к экзаменам
            </a>
          </div>
        )}

        {levelUnlocked && modules.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
            <p style={{ color: '#fff', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Уроков для {activeLevel} пока нет</p>
            <p style={{ color: '#8b949e' }}>Контент скоро появится!</p>
          </div>
        )}

        {levelUnlocked && modules.map((mod, mi) => {
          const allLessonsDone = mod.lessons.every(ls => user?.completedLessons?.includes(ls.id))
          const examDone = mod.exam && user?.completedLessons?.includes(mod.exam.id)

          return (
            <div key={mod.id} className="animate-fade-up" style={{ marginBottom: 36, animationDelay: `${mi * 80}ms` }}>
              {/* Module badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 16px', borderRadius: 12, background: mod.color + '33', border: `1px solid ${mod.color}55`, color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
                {mod.title}
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 31, top: 0, bottom: 0, width: 2, background: '#21262d' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mod.lessons.map((ls, li) => {
                    const done = user?.completedLessons?.includes(ls.id)
                    const unlocked = li === 0 || user?.completedLessons?.includes(mod.lessons[li - 1]?.id)

                    return (
                      <div key={ls.id}
                        onClick={() => unlocked && setActiveLesson(ls)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: unlocked ? 'pointer' : 'not-allowed', opacity: unlocked ? 1 : 0.45 }}
                        onMouseEnter={e => { if (unlocked) { const c = e.currentTarget.querySelector('.lcard'); if (c) c.style.borderColor = '#30363d' } }}
                        onMouseLeave={e => { const c = e.currentTarget.querySelector('.lcard'); if (c) c.style.borderColor = done ? 'rgba(63,185,80,.2)' : '#21262d' }}
                      >
                        <div className={unlocked && !done ? 'animate-pulse-ring' : ''}
                          style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${done ? '#3fb950' : unlocked ? '#58a6ff' : '#30363d'}`, background: done ? 'rgba(63,185,80,.15)' : unlocked ? 'rgba(88,166,255,.15)' : '#161b22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, zIndex: 2 }}>
                          {done ? '✅' : unlocked ? ls.icon : '🔒'}
                        </div>
                        <div className="lcard" style={{ flex: 1, background: '#161b22', border: `1px solid ${done ? 'rgba(63,185,80,.2)' : '#21262d'}`, borderRadius: 14, padding: '12px 16px', transition: 'border-color .15s' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{ls.title}</div>
                              <div style={{ fontSize: 11, color: '#8b949e', marginTop: 2 }}>{ls.questions.length} вопросов</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fbbf24', fontWeight: 700, fontSize: 13 }}>
                              <Zap size={12} /> +{ls.xp}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Exam block: только после всех уроков модуля */}
                  {mod.exam && (() => {
                    const examUnlocked = allLessonsDone
                    return (
                      <div
                        onClick={() => examUnlocked && setActiveLesson(mod.exam)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: examUnlocked ? 'pointer' : 'not-allowed', opacity: examUnlocked ? 1 : 0.35, marginTop: 4 }}
                      >
                        <div style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${examDone ? '#d29922' : examUnlocked ? '#d29922' : '#30363d'}`, background: examDone ? 'rgba(210,153,34,.2)' : examUnlocked ? 'rgba(210,153,34,.1)' : '#161b22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, zIndex: 2 }}>
                          {examDone ? '🥇' : examUnlocked ? '🏁' : '🔒'}
                        </div>
                        <div style={{ flex: 1, padding: '12px 16px', borderRadius: 14, background: examUnlocked ? 'rgba(210,153,34,.06)' : '#161b22', border: `1px solid ${examDone ? 'rgba(210,153,34,.3)' : examUnlocked ? 'rgba(210,153,34,.2)' : '#21262d'}`, transition: 'all .15s' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: examUnlocked ? '#d29922' : '#8b949e', fontSize: 14 }}>
                                {mod.exam.title}
                              </div>
                              <div style={{ fontSize: 11, color: '#8b949e', marginTop: 2 }}>
                                {examUnlocked ? `${mod.exam.questions.length} заданий · нужно 70%+` : 'Сначала пройди все уроки модуля'}
                              </div>
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
