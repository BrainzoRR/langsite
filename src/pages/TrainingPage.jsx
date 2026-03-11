import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { grammarModules } from '../data/lessons'
import { X, CheckCircle2, XCircle, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

function LessonModal({ lesson, onClose, onComplete }) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [arranged, setArranged] = useState([])
  const [remaining, setRemaining] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = lesson.questions[qIdx]

  useEffect(() => {
    if (q?.type === 'arrange') {
      setRemaining([...q.words].sort(() => Math.random() - 0.5))
      setArranged([])
    }
    setSelected(null)
    setChecked(false)
    setCorrect(null)
  }, [qIdx])

  const check = () => {
    if (checked) return
    let isCorrect = false
    if (q.type === 'choice') isCorrect = selected === q.answer
    if (q.type === 'arrange') isCorrect = arranged.join(' ') === q.answer
    setCorrect(isCorrect)
    setChecked(true)
    if (isCorrect) setScore(s => s + 1)
  }

  const next = () => {
    if (qIdx < lesson.questions.length - 1) setQIdx(i => i + 1)
    else setDone(true)
  }

  const addWord = (word, idx) => {
    setArranged(a => [...a, word])
    setRemaining(r => r.filter((_, i) => i !== idx))
  }

  const removeWord = (word, idx) => {
    setRemaining(r => [...r, word])
    setArranged(a => a.filter((_, i) => i !== idx))
  }

  if (done) {
    const pct = Math.round(score / lesson.questions.length * 100)
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="text-6xl mb-4">{pct >= 70 ? '🏆' : '📚'}</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">
            {pct >= 70 ? 'Отлично!' : 'Неплохо!'}
          </h2>
          <p className="text-[#8b949e] mb-6">
            {score} из {lesson.questions.length} правильных ответов ({pct}%)
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold text-xl mb-6">
            <Zap size={20} /> +{Math.round(lesson.xp * pct / 100)} XP
          </div>
          <button onClick={() => { onComplete(lesson.id, Math.round(lesson.xp * pct / 100)); onClose() }} className="btn-primary w-full">
            Продолжить
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full p-6 animate-fade-up">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-[#8b949e] hover:text-white transition-colors"><X size={20} /></button>
          <div className="flex-1 mx-4 h-2 bg-[#21262d] rounded-full overflow-hidden">
            <div className="progress-bar h-full" style={{ width: `${(qIdx / lesson.questions.length) * 100}%` }} />
          </div>
          <span className="text-sm font-mono text-[#8b949e]">{qIdx + 1}/{lesson.questions.length}</span>
        </div>

        <h3 className="font-display font-bold text-lg text-white mb-6">{q.question}</h3>

        {/* Choice type */}
        {q.type === 'choice' && (
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !checked && setSelected(i)}
                className={`p-4 rounded-xl border text-sm font-medium transition-all text-left
                  ${!checked && selected === i ? 'border-[#58a6ff] bg-[#58a6ff]/10 text-white' : ''}
                  ${!checked && selected !== i ? 'border-[#21262d] text-[#8b949e] hover:border-[#30363d] hover:text-white' : ''}
                  ${checked && i === q.answer ? 'border-[#3fb950] bg-[#3fb950]/10 text-[#3fb950]' : ''}
                  ${checked && selected === i && i !== q.answer ? 'border-red-500 bg-red-500/10 text-red-400 animate-shake' : ''}
                `}
              >
                <span className="font-display font-bold text-lg mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Arrange type */}
        {q.type === 'arrange' && (
          <div>
            <div className="min-h-14 border border-dashed border-[#30363d] rounded-xl p-3 flex flex-wrap gap-2 mb-4 bg-[#0d1117]">
              {arranged.map((w, i) => (
                <button key={i} onClick={() => !checked && removeWord(w, i)}
                  className="px-3 py-1.5 bg-[#58a6ff]/20 border border-[#58a6ff]/40 text-[#58a6ff] rounded-lg text-sm font-medium hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-colors">
                  {w}
                </button>
              ))}
              {arranged.length === 0 && <span className="text-[#484f58] text-sm">Нажимай на слова ниже...</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {remaining.map((w, i) => (
                <button key={i} onClick={() => !checked && addWord(w, i)}
                  className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] text-white rounded-lg text-sm font-medium hover:bg-[#1c2330] transition-colors">
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {checked && (
          <div className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-sm font-semibold
            ${correct ? 'bg-[#3fb950]/10 border border-[#3fb950]/30 text-[#3fb950]' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            {correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {correct ? 'Правильно! 🎉' : 'Неправильно. Попробуй ещё!'}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          {!checked ? (
            <button
              onClick={check}
              disabled={q.type === 'choice' ? selected === null : arranged.length === 0}
              className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Проверить
            </button>
          ) : (
            <button onClick={next} className="btn-primary flex-1">
              {qIdx < lesson.questions.length - 1 ? 'Следующий вопрос →' : 'Завершить'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TrainingPage() {
  const { user, completeLesson } = useApp()
  const [activeLevel, setActiveLevel] = useState(user?.level || 'A1')
  const [activeLesson, setActiveLesson] = useState(null)

  const modules = grammarModules[user?.language || 'english'] || []
  const filteredModules = modules.filter(m => m.level === activeLevel)

  return (
    <Layout title="Тренировка">
      <div className="max-w-2xl mx-auto">
        {/* Level tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-5 py-2.5 rounded-xl font-display font-bold text-sm whitespace-nowrap transition-all
                ${activeLevel === lvl
                  ? 'bg-[#58a6ff] text-white shadow-lg'
                  : 'bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:text-white'}`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-20 text-[#8b949e]">
            <div className="text-5xl mb-4">🔒</div>
            <p className="text-lg font-semibold text-white mb-2">Уровень пока недоступен</p>
            <p>Контент для {activeLevel} скоро появится!</p>
          </div>
        )}

        {filteredModules.map((module, mi) => (
          <div key={module.id} className="mb-10 animate-fade-up" style={{ animationDelay: `${mi * 100}ms` }}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${module.color} text-white text-sm font-bold mb-6`}>
              <span>{module.title}</span>
            </div>

            {/* Lesson path */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#21262d]" />
              <div className="space-y-4">
                {module.lessons.map((lesson, li) => {
                  const isCompleted = user?.completedLessons?.includes(lesson.id)
                  const isUnlocked = li === 0 || user?.completedLessons?.includes(module.lessons[li - 1]?.id)

                  return (
                    <div key={lesson.id} className="relative flex items-center gap-4 pl-0">
                      {/* Circle */}
                      <button
                        onClick={() => isUnlocked && setActiveLesson(lesson)}
                        disabled={!isUnlocked}
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl z-10 transition-all duration-200 shrink-0
                          ${isCompleted ? 'border-[#3fb950] bg-[#3fb950]/20 hover:scale-110' : ''}
                          ${!isCompleted && isUnlocked ? 'border-[#58a6ff] bg-[#58a6ff]/20 hover:scale-110 animate-pulse-ring' : ''}
                          ${!isUnlocked ? 'border-[#30363d] bg-[#161b22] opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        {isCompleted ? '✅' : isUnlocked ? lesson.icon : '🔒'}
                      </button>

                      {/* Info card */}
                      <div className={`flex-1 card p-4 border transition-all
                        ${isUnlocked ? 'hover:border-[#30363d]' : 'opacity-50'}
                        ${isCompleted ? 'border-[#3fb950]/20' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white text-sm">{lesson.title}</div>
                            <div className="text-xs text-[#8b949e] mt-0.5">{lesson.questions.length} вопросов</div>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                            <Zap size={14} />
                            <span>+{lesson.xp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        {activeLesson && (
          <LessonModal
            lesson={activeLesson}
            onClose={() => setActiveLesson(null)}
            onComplete={completeLesson}
          />
        )}
      </div>
    </Layout>
  )
}
