import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { levelExams } from '../data/exams'
import { calcXP, xpToLevel } from '../data/leaderboard'
import { Clock, ChevronRight, CheckCircle2, XCircle, Award } from 'lucide-react'

const SECTION_COLORS = { grammar: '#3b82f6', vocabulary: '#8b5cf6', reading: '#059669' }

// ── EXAM MODAL ────────────────────────────────────────────────────────────────
function ExamModal({ exam, onClose, onComplete }) {
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // sectionId-qIdx → {sel, correct}
  const [sel, setSel] = useState(null)
  const [arr, setArr] = useState([])
  const [rem, setRem] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(null)
  const [phase, setPhase] = useState('quiz') // quiz | results

  const section = exam.sections[sectionIdx]
  const q = section?.questions[qIdx]
  const totalQ = exam.sections.reduce((s, sec) => s + sec.questions.length, 0)
  const answeredQ = Object.keys(answers).length

  React.useEffect(() => {
    if (q?.type === 'arrange') { setRem([...q.words].sort(() => Math.random() - .5)); setArr([]) }
    setSel(null); setChecked(false); setCorrect(null)
  }, [sectionIdx, qIdx])

  const check = () => {
    if (checked) return
    const ok = q.type === 'choice' ? sel === q.ans : arr.join(' ') === q.ans
    setCorrect(ok); setChecked(true)
    setAnswers(a => ({ ...a, [`${section.id}-${qIdx}`]: { sel, correct: ok } }))
  }

  const next = () => {
    if (qIdx < section.questions.length - 1) { setQIdx(i => i + 1) }
    else if (sectionIdx < exam.sections.length - 1) { setSectionIdx(i => i + 1); setQIdx(0) }
    else { setPhase('results') }
  }

  const addWord = (w, i) => { setArr(a => [...a, w]); setRem(r => r.filter((_, j) => j !== i)) }
  const removeWord = (w, i) => { setRem(r => [...r, w]); setArr(a => a.filter((_, j) => j !== i)) }

  // Results
  if (phase === 'results') {
    const totalCorrect = Object.values(answers).filter(a => a.correct).length
    const pct = Math.round(totalCorrect / totalQ * 100)
    const passed = pct >= exam.passPercent
    const earnedXP = calcXP({ baseXP: exam.totalXP, correct: totalCorrect, total: totalQ, streak: 0 })
    const sectionResults = exam.sections.map(s => {
      const sq = s.questions.length
      const sc = s.questions.filter((_, i) => answers[`${s.id}-${i}`]?.correct).length
      return { ...s, correct: sc, total: sq, pct: Math.round(sc / sq * 100) }
    })

    return (
      <div style={overlayStyle}>
        <div style={{ ...modalStyle, maxWidth: 480 }} className="animate-bounce-in">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>{passed ? '🎓' : '📚'}</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>
              {passed ? `Переход на ${exam.targetLevel}!` : 'Попробуй ещё раз'}
            </h2>
            <p style={{ color: '#8b949e', marginTop: 8 }}>{totalCorrect} из {totalQ} правильных</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '16px 0' }}>
              <div style={{ fontSize: 48, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: passed ? '#3fb950' : '#ef4444' }}>{pct}%</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: '#8b949e' }}>нужно</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#8b949e' }}>{exam.passPercent}%</div>
              </div>
            </div>

            {passed && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: 'rgba(251,191,36,.1)', border: '1px solid rgba(251,191,36,.25)', color: '#fbbf24', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
                ⚡ +{earnedXP} XP
              </div>
            )}
          </div>

          {/* Section breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {sectionResults.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: '#0d1117', border: '1px solid #21262d' }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ flex: 1, fontWeight: 500, color: '#e6edf3', fontSize: 14 }}>{s.title}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.pct >= exam.passPercent ? '#3fb950' : '#f87171' }}>{s.correct}/{s.total}</span>
                <div style={{ width: 60, height: 4, borderRadius: 999, background: '#21262d', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.pct >= exam.passPercent ? '#3fb950' : '#ef4444', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {!passed && (
              <button onClick={() => { setSectionIdx(0); setQIdx(0); setAnswers({}); setPhase('quiz') }}
                style={{ flex: 1, padding: '13px', borderRadius: 12, border: '1px solid #30363d', background: 'transparent', color: '#8b949e', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14 }}>
                Попробовать снова
              </button>
            )}
            <button onClick={() => onComplete(exam, passed, earnedXP, pct === 100)} className="btn-primary"
              style={{ flex: 1, padding: '13px', fontSize: 15, background: passed ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : '#58a6ff' }}>
              {passed ? '🚀 Получить уровень!' : 'Закрыть'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Overall progress
  const overallPct = (answeredQ / totalQ) * 100
  const sectionColor = SECTION_COLORS[section.id] || '#58a6ff'

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: 540 }} className="animate-fade-up">
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', padding: 4, fontSize: 18 }}>✕</button>
          <div style={{ flex: 1, height: 6, background: '#21262d', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${overallPct}%`, background: `linear-gradient(90deg, ${sectionColor}, #bc8cff)`, borderRadius: 999, transition: 'width .4s' }} />
          </div>
          <span style={{ fontSize: 12, color: '#8b949e', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{answeredQ}/{totalQ}</span>
        </div>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {exam.sections.map((s, i) => {
            const isDone = i < sectionIdx
            const isCurrent = i === sectionIdx
            return (
              <div key={s.id} style={{ flex: 1, padding: '8px 10px', borderRadius: 10, border: `1px solid ${isCurrent ? sectionColor : '#21262d'}`, background: isCurrent ? `${sectionColor}15` : isDone ? '#161b22' : 'transparent', textAlign: 'center', transition: 'all .2s' }}>
                <div style={{ fontSize: 14 }}>{isDone ? '✅' : s.icon}</div>
                <div style={{ fontSize: 10, color: isCurrent ? '#e6edf3' : '#484f58', fontWeight: 600, marginTop: 2 }}>{s.title}</div>
              </div>
            )
          })}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: sectionColor, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
          {section.icon} {section.title} · Вопрос {qIdx + 1}/{section.questions.length}
        </div>

        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 20, lineHeight: 1.4 }}>{q.q}</h3>

        {q.type === 'choice' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.opts.map((opt, i) => {
              let bc = '#21262d', bg = 'transparent', tc = '#8b949e'
              if (!checked && sel === i)        { bc = sectionColor; bg = `${sectionColor}18`; tc = sectionColor }
              if (checked && i === q.ans)        { bc = '#3fb950'; bg = 'rgba(63,185,80,.1)'; tc = '#3fb950' }
              if (checked && sel === i && i !== q.ans) { bc = '#ef4444'; bg = 'rgba(239,68,68,.1)'; tc = '#ef4444' }
              return (
                <button key={i} onClick={() => !checked && setSel(i)}
                  className={checked && sel === i && i !== q.ans ? 'animate-shake' : ''}
                  style={{ padding: '13px 12px', borderRadius: 12, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', border: `1px solid ${bc}`, background: bg, color: tc, transition: 'all .15s' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, marginRight: 8 }}>{String.fromCharCode(65+i)}.</span>{opt}
                </button>
              )
            })}
          </div>
        )}

        {q.type === 'arrange' && (
          <div>
            <div style={{ minHeight: 48, border: '1px dashed #30363d', borderRadius: 12, padding: 10, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, background: '#0d1117' }}>
              {arr.map((w, i) => <button key={i} onClick={() => !checked && removeWord(w, i)} style={{ padding: '6px 12px', background: `${sectionColor}18`, border: `1px solid ${sectionColor}44`, borderRadius: 8, color: sectionColor, cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif' }}>{w}</button>)}
              {arr.length === 0 && <span style={{ color: '#484f58', fontSize: 13 }}>Собери предложение...</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {rem.map((w, i) => <button key={i} onClick={() => !checked && addWord(w, i)} style={{ padding: '6px 12px', background: '#21262d', border: '1px solid #30363d', borderRadius: 8, color: '#e6edf3', cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif' }}>{w}</button>)}
            </div>
          </div>
        )}

        {checked && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderRadius: 12, background: correct ? 'rgba(63,185,80,.07)' : 'rgba(239,68,68,.07)', border: `1px solid ${correct ? 'rgba(63,185,80,.2)' : 'rgba(239,68,68,.2)'}`, color: correct ? '#3fb950' : '#f87171', fontSize: 13, fontWeight: 600 }}>
            {correct ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
            {correct ? 'Правильно! 🎉' : 'Неверно'}
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          {!checked
            ? <button onClick={check} disabled={q.type === 'choice' ? sel === null : arr.length === 0} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15 }}>Проверить</button>
            : <button onClick={next} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15, background: `linear-gradient(135deg, ${sectionColor}, #bc8cff)` }}>
                {qIdx < section.questions.length - 1 || sectionIdx < exam.sections.length - 1 ? 'Следующий →' : 'Завершить экзамен'}
              </button>}
        </div>
      </div>
    </div>
  )
}

const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }
const modalStyle = { background: '#161b22', border: '1px solid #21262d', borderRadius: 20, padding: 24, width: '100%' }

// ── EXAMS PAGE ───────────────────────────────────────────────────────────────
export default function ExamsPage() {
  const { user, completeLesson, updateUser } = useApp()
  const [active, setActive] = useState(null)
  const [toast, setToast] = useState(null)

  const exams = levelExams[user?.language || 'english'] || []
  const completedExams = user?.completedExams || []

  const handleComplete = (exam, passed, earnedXP, isPerfect) => {
    setActive(null)
    if (!passed) return

    const updates = { xp: (user?.xp || 0) + earnedXP }
    if (!completedExams.includes(exam.id)) {
      updates.completedExams = [...completedExams, exam.id]
    }
    if (isPerfect) {
      updates.perfectExams = (user?.perfectExams || 0) + 1
    }
    updateUser(updates)
    showToast(isPerfect ? `🎯 Идеальный результат! +${earnedXP} XP` : `🎓 Уровень ${exam.targetLevel} открыт! +${earnedXP} XP`, true)
  }

  const showToast = (text, ok) => { setToast({ text, ok }); setTimeout(() => setToast(null), 3000) }

  const curLevel = user?.levels?.[user?.language] || 'A1'

  return (
    <Layout title="Экзамены">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,.12), rgba(139,92,246,.12))', border: '1px solid rgba(88,166,255,.2)', borderRadius: 20, padding: '24px 28px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 52 }}>🎓</div>
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>Уровневые экзамены</h2>
            <p style={{ color: '#8b949e', marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>
              Проверь грамматику, словарный запас и понимание текста — и перейди на следующий уровень.
              Нужно набрать 75%+ для перехода.
            </p>
          </div>
        </div>

        {exams.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
            <p style={{ color: '#fff', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Экзамены для этого языка скоро появятся</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {exams.map((exam, i) => {
            const done = completedExams.includes(exam.id)
            const isCurrentLevel = exam.level === curLevel
            const isLocked = !done && !isCurrentLevel && i > 0 && !completedExams.includes(exams[i-1]?.id)

            return (
              <div key={exam.id} className="card animate-fade-up" style={{ padding: 22, border: `1px solid ${done ? 'rgba(63,185,80,.25)' : isCurrentLevel ? 'rgba(88,166,255,.3)' : '#21262d'}`, opacity: isLocked ? .5 : 1, animationDelay: `${i*80}ms`, transition: 'border-color .2s' }}
                onMouseEnter={e => { if (!isLocked) e.currentTarget.style.borderColor = done ? 'rgba(63,185,80,.4)' : '#30363d' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = done ? 'rgba(63,185,80,.25)' : isCurrentLevel ? 'rgba(88,166,255,.3)' : '#21262d' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Level badge */}
                  <div style={{ width: 64, height: 64, borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: done ? 'rgba(63,185,80,.12)' : isCurrentLevel ? 'rgba(88,166,255,.12)' : '#21262d', border: `2px solid ${done ? '#3fb950' : isCurrentLevel ? '#58a6ff' : '#30363d'}`, flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: done ? '#3fb950' : isCurrentLevel ? '#58a6ff' : '#8b949e' }}>{exam.level}</span>
                    <span style={{ fontSize: 18, marginTop: -2 }}>{done ? '✅' : isCurrentLevel ? '🎯' : '🔒'}</span>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: done ? '#3fb950' : isCurrentLevel ? '#58a6ff' : '#8b949e' }}>{exam.targetLevel}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', margin: 0, fontSize: 16 }}>{exam.title}</h3>
                      {isCurrentLevel && <span style={{ fontSize: 10, fontWeight: 700, color: '#58a6ff', background: 'rgba(88,166,255,.1)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(88,166,255,.2)' }}>ДОСТУПЕН</span>}
                      {done && <span style={{ fontSize: 10, fontWeight: 700, color: '#3fb950', background: 'rgba(63,185,80,.1)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(63,185,80,.2)' }}>СДАН</span>}
                    </div>
                    <div style={{ fontSize: 13, color: '#8b949e', marginBottom: 10 }}>{exam.subtitle}</div>

                    {/* Sections preview */}
                    <div style={{ display: 'flex', gap: 6 }}>
                      {exam.sections.map(s => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 8, background: '#0d1117', border: '1px solid #21262d', fontSize: 11, color: '#8b949e' }}>
                          {s.icon} {s.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>⚡ +{exam.totalXP}</div>
                    <div style={{ color: '#484f58', fontSize: 11, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                      <Clock size={10}/> {exam.estimatedMin} мин
                    </div>
                    {!isLocked && !done && (
                      <button onClick={() => setActive(exam)} className="btn-primary" style={{ marginTop: 10, padding: '8px 16px', fontSize: 13 }}>
                        Начать <ChevronRight size={13} style={{ display: 'inline' }}/>
                      </button>
                    )}
                    {done && (
                      <button onClick={() => setActive(exam)} style={{ marginTop: 10, padding: '8px 14px', fontSize: 12, background: 'transparent', border: '1px solid #30363d', borderRadius: 10, color: '#8b949e', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}>
                        Пройти снова
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {active && <ExamModal exam={active} onClose={() => setActive(null)} onComplete={handleComplete} />}

      {toast && (
        <div style={{ position: 'fixed', top: 80, right: 24, padding: '12px 20px', borderRadius: 12, background: 'rgba(63,185,80,.15)', border: '1px solid rgba(63,185,80,.3)', color: '#3fb950', fontWeight: 700, fontSize: 14, zIndex: 200, boxShadow: '0 8px 30px rgba(0,0,0,.4)', maxWidth: 300 }}>
          {toast.text}
        </div>
      )}
    </Layout>
  )
}
