import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { LEVELS } from '../data/lessons'

const LANGS = [
  { id: 'english',  flag: '🇺🇸', name: 'English',  desc: 'Английский'  },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese', desc: 'Японский'    },
  { id: 'korean',   flag: '🇰🇷', name: 'Korean',   desc: 'Корейский'   },
]

const LEVEL_DESCS = {
  A1: '🌱 Начинающий — знаю несколько слов',
  A2: '📗 Элементарный — базовые фразы',
  B1: '📘 Средний — могу поддержать разговор',
  B2: '📙 Выше среднего — хорошо понимаю текст',
  C1: '🔥 Продвинутый — почти свободно говорю',
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [lang, setLang] = useState('english')
  const [level, setLevel] = useState('A1')
  const [err, setErr] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setErr('Заполните все поля'); return }
    if (tab === 'login') {
      login({ name: form.email.split('@')[0], email: form.email })
      navigate('/home')
    } else {
      if (!form.name) { setErr('Введите имя'); return }
      setErr(''); setStep('lang')
    }
  }

  const finish = () => {
    const levels = { english: 'A1', japanese: 'A1', korean: 'A1' }
    levels[lang] = level
    login({ name: form.name, email: form.email, language: lang, levels })
    navigate('/home')
  }

  const inputCls = "input-field"

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(59,130,246,.3)' }}>L</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="shimmer-text text-3xl font-bold mb-1">LinguaQuest</h1>
          <p className="text-[#8b949e]">Учи языки играя — бесплатно!</p>
        </div>

        <div className="card p-6">
          {/* STEP: form */}
          {step === 'form' && (
            <>
              <div className="flex gap-1.5 mb-5 bg-[#0d1117] rounded-xl p-1">
                {['login', 'register'].map(t => (
                  <button key={t} onClick={() => { setTab(t); setErr('') }}
                    style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: tab === t ? '#161b22' : 'transparent', color: tab === t ? '#fff' : '#8b949e', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
                    {t === 'login' ? 'Войти' : 'Регистрация'}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="space-y-4">
                {tab === 'register' && (
                  <div>
                    <label className="block text-xs text-[#8b949e] mb-1.5">Имя</label>
                    <input className={inputCls} placeholder="Ваше имя" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                )}
                <div>
                  <label className="block text-xs text-[#8b949e] mb-1.5">Email</label>
                  <input className={inputCls} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-[#8b949e] mb-1.5">Пароль</label>
                  <input className={inputCls} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
                {err && <p className="text-red-400 text-sm">{err}</p>}
                <button type="submit" className="btn-primary w-full py-3 text-base mt-1">
                  {tab === 'login' ? 'Войти' : 'Продолжить →'}
                </button>
              </form>
            </>
          )}

          {/* STEP: language */}
          {step === 'lang' && (
            <>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-xl font-bold text-white mb-1">Какой язык учишь?</h2>
              <p className="text-[#8b949e] text-sm mb-5">Выбери первый язык — остальные добавишь позже</p>
              <div className="space-y-3 mb-5">
                {LANGS.map(l => (
                  <button key={l.id} onClick={() => setLang(l.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, border: `1px solid ${lang === l.id ? '#58a6ff' : '#21262d'}`, background: lang === l.id ? 'rgba(88,166,255,.08)' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: 28 }}>{l.flag}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{l.name}</div>
                      <div style={{ fontSize: 12, color: '#8b949e' }}>{l.desc}</div>
                    </div>
                    {lang === l.id && <span style={{ marginLeft: 'auto', color: '#58a6ff', fontSize: 18 }}>✓</span>}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('level')} className="btn-primary w-full py-3 text-base">Далее →</button>
            </>
          )}

          {/* STEP: level */}
          {step === 'level' && (
            <>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-xl font-bold text-white mb-1">
                Твой уровень {LANGS.find(l => l.id === lang)?.name}
              </h2>
              <p className="text-[#8b949e] text-sm mb-5">У каждого языка свой независимый уровень</p>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {LEVELS.map(lv => (
                  <button key={lv} onClick={() => setLevel(lv)}
                    style={{ padding: '13px 0', borderRadius: 12, border: `1px solid ${level === lv ? '#58a6ff' : '#21262d'}`, background: level === lv ? 'rgba(88,166,255,.15)' : 'transparent', color: level === lv ? '#58a6ff' : '#8b949e', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                    {lv}
                  </button>
                ))}
              </div>
              <p className="text-[#8b949e] text-sm mb-5 px-1">{LEVEL_DESCS[level]}</p>
              <button onClick={finish} className="btn-primary w-full py-3 text-base" style={{ background: 'linear-gradient(135deg,#58a6ff,#8b5cf6)' }}>
                Начать обучение! 🚀
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
