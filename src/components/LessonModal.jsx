import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, XCircle, Zap } from 'lucide-react'
import { calcXP } from '../data/leaderboard'
import { useApp } from '../contexts/AppContext'

export default function LessonModal({ lesson, onClose, onComplete }) {
  const { user } = useApp()
  const [qi, setQi] = useState(0)
  const [sel, setSel] = useState(null)
  const [arr, setArr] = useState([])
  const [rem, setRem] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!lesson) return null
  const q = lesson.questions[qi]

  useEffect(() => {
    if (!q) return
    if (q.type === 'arrange') {
      setRem([...q.words].sort(() => Math.random() - .5))
      setArr([])
    }
    setSel(null); setChecked(false); setCorrect(null)
  }, [qi])

  const check = () => {
    if (checked || !q) return
    const ok = q.type === 'choice' ? sel === q.ans : arr.join(' ') === q.ans
    setCorrect(ok); setChecked(true)
    if (ok) setScore(s => s + 1)
  }

  const next = () => {
    if (qi < lesson.questions.length - 1) setQi(i => i + 1)
    else setDone(true)
  }

  const addWord = (w, i) => { setArr(a => [...a, w]); setRem(r => r.filter((_, j) => j !== i)) }
  const removeWord = (_, i) => {
    const word = arr[i]
    setArr(a => a.filter((_, j) => j !== i))
    setRem(r => [...r, word])
  }

  const totalQ = lesson.questions.length
  const pct = done ? Math.round(score / totalQ * 100) : 0
  const earnedXP = done ? calcXP({ baseXP: lesson.xp, correct: score, total: totalQ, streak: user?.streak || 0 }) : 0

  const handleFinish = () => {
    onComplete(lesson.id, earnedXP, score, totalQ)
    onClose()
  }

  const OL = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.88)',
    backdropFilter: 'blur(10px)', zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
  }
  const MC = {
    background: '#161b22', border: '1px solid #21262d',
    borderRadius: 20, padding: 24, width: '100%', maxWidth: 520
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (done) return (
    <div style={OL}>
      <div style={{ ...MC, textAlign: 'center' }} className="animate-bounce-in">
        <div style={{ fontSize: 58, marginBottom: 12 }}>
          {lesson.isExam ? (pct >= 70 ? '🎓' : '📚') : (pct >= 70 ? '🏆' : '📚')}
        </div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
          {lesson.isExam ? (pct >= 70 ? 'Контрольная сдана!' : 'Попробуй ещё раз') : (pct >= 70 ? 'Отлично!' : 'Неплохо!')}
        </h2>
        <p style={{ color: '#8b949e', marginBottom: 16 }}>{score} из {totalQ} правильных ({pct}%)</p>
        {lesson.isExam && pct >= 70 && (
          <div style={{ padding: '10px 14px', background: 'rgba(63,185,80,.08)', border: '1px solid rgba(63,185,80,.2)', borderRadius: 12, color: '#3fb950', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            🎉 Модуль завершён! Открывается следующий уровень
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#fbbf24', fontWeight: 800, fontSize: 22, marginBottom: 20 }}>
          <Zap size={20} /> +{earnedXP} XP
        </div>
        <button onClick={handleFinish} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }}>
          Продолжить
        </button>
      </div>
    </div>
  )

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  return (
    <div style={OL}>
      <div style={MC} className="animate-fade-up">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: lesson.isExam ? 0 : 20 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', padding: 4 }}>
            <X size={20} />
          </button>
          <div style={{ flex: 1, height: 6, background: '#21262d', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(qi / totalQ) * 100}%`, background: 'linear-gradient(90deg,#58a6ff,#bc8cff)', borderRadius: 999, transition: 'width .4s' }} />
          </div>
          <span style={{ fontSize: 12, color: '#8b949e', fontFamily: 'monospace' }}>{qi + 1}/{totalQ}</span>
        </div>

        {lesson.isExam && (
          <div style={{ margin: '12px 0 20px', padding: '8px 12px', background: 'rgba(210,153,34,.08)', border: '1px solid rgba(210,153,34,.2)', borderRadius: 10, color: '#d29922', fontSize: 12, fontWeight: 600 }}>
            🏁 Контрольная — нужно 70%+ для перехода
          </div>
        )}

        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 20, lineHeight: 1.4 }}>{q?.q}</h3>

        {q?.type === 'choice' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.opts.map((opt, i) => {
              let bc = '#21262d', bg = 'transparent', tc = '#8b949e'
              if (!checked && sel === i)            { bc = '#58a6ff'; bg = 'rgba(88,166,255,.1)'; tc = '#58a6ff' }
              if (checked && i === q.ans)            { bc = '#3fb950'; bg = 'rgba(63,185,80,.1)'; tc = '#3fb950' }
              if (checked && sel === i && i !== q.ans) { bc = '#ef4444'; bg = 'rgba(239,68,68,.1)'; tc = '#ef4444' }
              return (
                <button key={i} onClick={() => !checked && setSel(i)}
                  className={checked && sel === i && i !== q.ans ? 'animate-shake' : ''}
                  style={{ padding: '13px 12px', borderRadius: 12, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', border: `1px solid ${bc}`, background: bg, color: tc, transition: 'all .15s' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              )
            })}
          </div>
        )}

        {q?.type === 'arrange' && (
          <div>
            <div style={{ minHeight: 52, border: '1px dashed #30363d', borderRadius: 12, padding: 10, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, background: '#0d1117' }}>
              {arr.map((w, i) => (
                <button key={i} onClick={() => !checked && removeWord(w, i)}
                  style={{ padding: '6px 12px', background: 'rgba(88,166,255,.15)', border: '1px solid rgba(88,166,255,.3)', borderRadius: 8, color: '#58a6ff', cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {w}
                </button>
              ))}
              {arr.length === 0 && <span style={{ color: '#484f58', fontSize: 13 }}>Собери предложение...</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {rem.map((w, i) => (
                <button key={i} onClick={() => !checked && addWord(w, i)}
                  style={{ padding: '6px 12px', background: '#21262d', border: '1px solid #30363d', borderRadius: 8, color: '#e6edf3', cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {checked && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderRadius: 12, background: correct ? 'rgba(63,185,80,.07)' : 'rgba(239,68,68,.07)', border: `1px solid ${correct ? 'rgba(63,185,80,.2)' : 'rgba(239,68,68,.2)'}`, color: correct ? '#3fb950' : '#f87171', fontSize: 13, fontWeight: 600 }}>
            {correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {correct ? 'Правильно! 🎉' : 'Неверно'}
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          {!checked ? (
            <button onClick={check}
              disabled={q?.type === 'choice' ? sel === null : arr.length === 0}
              className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }}>
              Проверить
            </button>
          ) : (
            <button onClick={next} className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: 15, background: 'linear-gradient(135deg,#58a6ff,#8b5cf6)' }}>
              {qi < totalQ - 1 ? 'Следующий →' : 'Завершить'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
