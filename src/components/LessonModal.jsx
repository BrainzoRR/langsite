import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, XCircle, Zap } from 'lucide-react'

export default function LessonModal({ lesson, onClose, onComplete }) {
  const [qi, setQi] = useState(0)
  const [sel, setSel] = useState(null)
  const [arr, setArr] = useState([])
  const [rem, setRem] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = lesson.questions[qi]

  useEffect(() => {
    if (q?.type === 'arrange') {
      setRem([...q.words].sort(() => Math.random() - 0.5))
      setArr([])
    }
    setSel(null); setChecked(false); setCorrect(null)
  }, [qi])

  const check = () => {
    if (checked) return
    const ok = q.type === 'choice' ? sel === q.ans : arr.join(' ') === q.ans
    setCorrect(ok); setChecked(true); if (ok) setScore(s => s + 1)
  }

  const next = () => qi < lesson.questions.length - 1 ? setQi(i => i + 1) : setDone(true)

  const addWord = (w, i) => { setArr(a => [...a, w]); setRem(r => r.filter((_, j) => j !== i)) }
  const removeWord = (w, i) => { setRem(r => [...r, w]); setArr(a => a.filter((_, j) => j !== i)) }

  const pct = done ? Math.round(score / lesson.questions.length * 100) : 0
  const earned = done ? Math.round(lesson.xp * (pct / 100)) : 0

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {done ? (
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in border border-[#21262d]">
          <div className="text-6xl mb-4">{lesson.isExam ? (pct >= 70 ? '🎓' : '📚') : (pct >= 70 ? '🏆' : '📚')}</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white mb-2">
            {lesson.isExam ? (pct >= 70 ? 'Контрольная сдана!' : 'Попробуй ещё раз') : (pct >= 70 ? 'Отлично!' : 'Неплохо!')}
          </h2>
          <p className="text-[#8b949e] mb-4">{score} из {lesson.questions.length} правильных ({pct}%)</p>
          {lesson.isExam && pct >= 70 && (
            <div className="mb-4 p-3 rounded-xl bg-[#3fb950]/10 border border-[#3fb950]/25 text-[#3fb950] text-sm font-semibold">
              🎉 Модуль завершён! Открывается следующий уровень
            </div>
          )}
          <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-xl mb-6">
            <Zap size={20} /> +{earned} XP
          </div>
          <button onClick={() => { onComplete(lesson.id, earned); onClose() }} className="btn-primary w-full py-3 text-base">
            Продолжить
          </button>
        </div>
      ) : (
        <div className="card max-w-lg w-full p-6 animate-fade-up border border-[#21262d]">
          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-5">
            <button onClick={onClose} className="text-[#8b949e] hover:text-white transition-colors cursor-pointer" style={{ background: 'none', border: 'none', padding: 4 }}>
              <X size={20} />
            </button>
            <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
              <div className="progress-bar h-full" style={{ width: `${(qi / lesson.questions.length) * 100}%` }} />
            </div>
            <span className="text-xs text-[#8b949e] font-mono">{qi + 1}/{lesson.questions.length}</span>
          </div>

          {lesson.isExam && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#d29922]/08 border border-[#d29922]/20 text-[#d29922] text-xs font-semibold">
              🏁 Контрольная — нужно 70%+ для прохождения
            </div>
          )}

          <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-lg font-bold text-white mb-5">{q.q}</h3>

          {q.type === 'choice' && (
            <div className="grid grid-cols-2 gap-3">
              {q.opts.map((opt, i) => {
                let borderCol = '#21262d', bgCol = 'transparent', textCol = '#8b949e'
                if (!checked && sel === i)  { borderCol = '#58a6ff'; bgCol = 'rgba(88,166,255,.1)'; textCol = '#58a6ff' }
                if (checked && i === q.ans) { borderCol = '#3fb950'; bgCol = 'rgba(63,185,80,.1)';  textCol = '#3fb950' }
                if (checked && sel === i && i !== q.ans) { borderCol = '#ef4444'; bgCol = 'rgba(239,68,68,.1)'; textCol = '#ef4444' }
                return (
                  <button
                    key={i}
                    onClick={() => !checked && setSel(i)}
                    className={checked && sel === i && i !== q.ans ? 'animate-shake' : ''}
                    style={{ padding: '13px 12px', borderRadius: 12, textAlign: 'left', cursor: checked ? 'default' : 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif', border: `1px solid ${borderCol}`, background: bgCol, color: textCol, transition: 'all .15s' }}
                  >
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {q.type === 'arrange' && (
            <div>
              <div style={{ minHeight: 52, border: '1px dashed #30363d', borderRadius: 12, padding: 10, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, background: '#0d1117' }}>
                {arr.map((w, i) => (
                  <button key={i} onClick={() => !checked && removeWord(w, i)} style={{ padding: '6px 12px', background: 'rgba(88,166,255,.15)', border: '1px solid rgba(88,166,255,.3)', borderRadius: 8, color: '#58a6ff', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>{w}</button>
                ))}
                {arr.length === 0 && <span style={{ color: '#484f58', fontSize: 13 }}>Нажимай на слова ниже...</span>}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {rem.map((w, i) => (
                  <button key={i} onClick={() => !checked && addWord(w, i)} style={{ padding: '6px 12px', background: '#21262d', border: '1px solid #30363d', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>{w}</button>
                ))}
              </div>
            </div>
          )}

          {checked && (
            <div className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-sm font-semibold ${correct ? 'bg-[#3fb950]/08 border border-[#3fb950]/25 text-[#3fb950]' : 'bg-red-500/08 border border-red-500/20 text-red-400'}`}>
              {correct ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
              {correct ? 'Правильно! 🎉' : 'Неправильно'}
            </div>
          )}

          <div className="mt-5">
            {!checked ? (
              <button
                onClick={check}
                disabled={q.type === 'choice' ? sel === null : arr.length === 0}
                className="btn-primary w-full py-3 text-base"
              >
                Проверить
              </button>
            ) : (
              <button onClick={next} className="btn-primary w-full py-3 text-base" style={{ background: 'linear-gradient(135deg,#58a6ff,#8b5cf6)' }}>
                {qi < lesson.questions.length - 1 ? 'Следующий вопрос →' : 'Завершить'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
