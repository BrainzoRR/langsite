import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { LEVELS } from '../data/lessons'

const LANGS = [
  { id: 'english',  flag: '🇺🇸', name: 'English',  native: 'English',   desc: 'Самый популярный язык мира' },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese', native: '日本語',     desc: 'Язык аниме и технологий'    },
  { id: 'korean',   flag: '🇰🇷', name: 'Korean',   native: '한국어',     desc: 'Язык K-Pop и дорам'         },
]

const LEVEL_DESCS = {
  A1: { label: 'Новичок',          sub: 'Никогда не учил или знаю пару слов' },
  A2: { label: 'Начинающий',       sub: 'Базовые фразы, могу поздороваться' },
  B1: { label: 'Средний',          sub: 'Могу поддержать простой разговор'  },
  B2: { label: 'Выше среднего',    sub: 'Хорошо понимаю тексты и речь'      },
  C1: { label: 'Продвинутый',      sub: 'Почти свободно говорю и пишу'      },
}

// Floating language symbols for background
const SYMBOLS = ['A','あ','가','B','い','나','C','う','다','Z','え','라','Y','お','마']

function FloatingSymbol({ symbol, style }) {
  return (
    <div style={{
      position: 'absolute',
      fontFamily: 'Syne, sans-serif',
      fontWeight: 800,
      fontSize: style.size || 24,
      color: 'rgba(88,166,255,0.07)',
      userSelect: 'none',
      pointerEvents: 'none',
      animation: `float ${style.dur || 8}s ease-in-out infinite`,
      animationDelay: `${style.delay || 0}s`,
      ...style,
    }}>
      {symbol}
    </div>
  )
}

export default function AuthPage() {
  const [step, setStep] = useState('start') // start | login | register | lang | level
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [lang, setLang] = useState('english')
  const [level, setLevel] = useState('A1')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useApp()
  const navigate = useNavigate()

  const bgSymbols = SYMBOLS.map((s, i) => ({
    symbol: s,
    style: {
      left: `${(i * 7.3 + 3) % 95}%`,
      top: `${(i * 11.7 + 5) % 90}%`,
      size: [18, 24, 32, 20, 28][i % 5],
      dur: 6 + (i % 5),
      delay: i * 0.4,
    }
  }))

  const handleLogin = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setErr('Заполни все поля'); return }
    setLoading(true)
    setTimeout(() => {
      login({ name: form.email.split('@')[0], email: form.email })
      navigate('/home')
    }, 600)
  }

  const handleRegisterStep = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setErr('Заполни все поля'); return }
    if (form.password.length < 6) { setErr('Пароль минимум 6 символов'); return }
    setErr(''); setStep('lang')
  }

  const finish = () => {
    setLoading(true)
    const levels = { english: 'A1', japanese: 'A1', korean: 'A1' }
    levels[lang] = level
    setTimeout(() => {
      login({ name: form.name, email: form.email, language: lang, levels })
      navigate('/home')
    }, 700)
  }

  // ── LANDING / START ──────────────────────────────────────
  if (step === 'start') return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', overflow: 'hidden', position: 'relative' }}>
      {/* Floating symbols */}
      {bgSymbols.map((s, i) => <FloatingSymbol key={i} {...s} />)}

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,92,246,.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', zIndex: 1 }}>
        {/* Logo mark */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{ width: 96, height: 96, borderRadius: 28, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(59,130,246,.4), 0 0 120px rgba(139,92,246,.2)', position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1 }}>L</span>
          </div>
          {/* Ring */}
          <div style={{ position: 'absolute', inset: -8, borderRadius: 36, border: '1px solid rgba(88,166,255,.2)', animation: 'pulseRing 3s infinite' }} />
        </div>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 52, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1, letterSpacing: -2, textAlign: 'center' }}>
          Lingua<span style={{ background: 'linear-gradient(135deg,#58a6ff,#bc8cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Quest</span>
        </h1>

        <p style={{ color: '#8b949e', fontSize: 18, marginTop: 12, marginBottom: 48, textAlign: 'center', fontWeight: 400, maxWidth: 340, lineHeight: 1.5 }}>
          Учи языки как в игре — задания, серии, уровни
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 48 }}>
          {[['🌍', '3', 'языка'], ['📚', '50+', 'уроков'], ['🔥', '7', 'дней стрик']].map(([icon, val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>{val}</div>
              <div style={{ fontSize: 12, color: '#484f58' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
          <button onClick={() => setStep('register')} className="btn-primary" style={{ padding: '15px 24px', fontSize: 15, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: 14 }}>
            Начать бесплатно →
          </button>
          <button onClick={() => setStep('login')} style={{ padding: '14px 24px', fontSize: 14, background: 'transparent', border: '1px solid #30363d', borderRadius: 14, color: '#8b949e', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, transition: 'all .15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#58a6ff'; e.currentTarget.style.color = '#58a6ff' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#8b949e' }}>
            Уже есть аккаунт — войти
          </button>
        </div>

        {/* Lang flags preview */}
        <div style={{ marginTop: 48, display: 'flex', gap: 8, alignItems: 'center' }}>
          {LANGS.map(l => <span key={l.id} style={{ fontSize: 28, opacity: .7 }}>{l.flag}</span>)}
        </div>
      </div>
    </div>
  )

  // ── LOGIN ────────────────────────────────────────────────
  if (step === 'login') return (
    <AuthShell onBack={() => setStep('start')} title="С возвращением" sub="Войди в свой аккаунт">
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
        <Field label="Пароль" type="password" placeholder="••••••••" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} />
        {err && <ErrMsg text={err} />}
        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 4, padding: '14px', fontSize: 15 }}>
          {loading ? '...' : 'Войти'}
        </button>
      </form>
      <p style={{ color: '#484f58', fontSize: 13, textAlign: 'center', marginTop: 16 }}>
        Нет аккаунта?{' '}
        <button onClick={() => { setStep('register'); setErr('') }} style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600 }}>Зарегистрируйся</button>
      </p>
    </AuthShell>
  )

  // ── REGISTER ─────────────────────────────────────────────
  if (step === 'register') return (
    <AuthShell onBack={() => setStep('start')} title="Создай аккаунт" sub="Это займёт меньше минуты">
      <form onSubmit={handleRegisterStep} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Как тебя зовут?" type="text" placeholder="Твоё имя" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
        <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
        <Field label="Пароль" type="password" placeholder="Минимум 6 символов" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} />
        {err && <ErrMsg text={err} />}
        <button type="submit" className="btn-primary" style={{ marginTop: 4, padding: '14px', fontSize: 15 }}>
          Продолжить →
        </button>
      </form>
      <p style={{ color: '#484f58', fontSize: 13, textAlign: 'center', marginTop: 16 }}>
        Уже есть аккаунт?{' '}
        <button onClick={() => { setStep('login'); setErr('') }} style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600 }}>Войти</button>
      </p>
    </AuthShell>
  )

  // ── LANGUAGE PICK ────────────────────────────────────────
  if (step === 'lang') return (
    <AuthShell onBack={() => setStep('register')} title="Что учишь?" sub={`Привет, ${form.name}! Выбери первый язык`} wide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginBottom: 20 }}>
        {LANGS.map(l => (
          <button key={l.id} onClick={() => setLang(l.id)} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px',
            borderRadius: 16, border: `1px solid ${lang === l.id ? '#58a6ff' : '#21262d'}`,
            background: lang === l.id ? 'rgba(88,166,255,.07)' : '#0d1117',
            cursor: 'pointer', transition: 'all .15s',
            transform: lang === l.id ? 'scale(1.01)' : 'scale(1)',
          }}>
            <span style={{ fontSize: 36 }}>{l.flag}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 16 }}>{l.name}</span>
                <span style={{ fontSize: 13, color: '#484f58', fontWeight: 400 }}>{l.native}</span>
              </div>
              <div style={{ fontSize: 12, color: '#8b949e', marginTop: 2 }}>{l.desc}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${lang === l.id ? '#58a6ff' : '#30363d'}`, background: lang === l.id ? '#58a6ff' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11 }}>
              {lang === l.id && '✓'}
            </div>
          </button>
        ))}
      </div>
      <button onClick={() => setStep('level')} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }}>
        Далее →
      </button>
    </AuthShell>
  )

  // ── LEVEL PICK ───────────────────────────────────────────
  if (step === 'level') return (
    <AuthShell onBack={() => setStep('lang')} title="Твой уровень" sub={`${LANGS.find(l => l.id === lang)?.flag} ${LANGS.find(l => l.id === lang)?.name} — выбери честно 😄`} wide>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {LEVELS.map(lv => (
          <button key={lv} onClick={() => setLevel(lv)} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            borderRadius: 14, border: `1px solid ${level === lv ? '#58a6ff' : '#21262d'}`,
            background: level === lv ? 'rgba(88,166,255,.08)' : '#0d1117',
            cursor: 'pointer', transition: 'all .15s',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: level === lv ? 'rgba(88,166,255,.15)' : '#21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: level === lv ? '#58a6ff' : '#8b949e', flexShrink: 0 }}>
              {lv}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: level === lv ? '#fff' : '#8b949e', fontSize: 14 }}>{LEVEL_DESCS[lv].label}</div>
              <div style={{ fontSize: 12, color: '#484f58', marginTop: 2 }}>{LEVEL_DESCS[lv].sub}</div>
            </div>
            {level === lv && <span style={{ color: '#58a6ff', fontSize: 18 }}>✓</span>}
          </button>
        ))}
      </div>
      <button onClick={finish} disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
        {loading ? 'Запускаем...' : '🚀 Начать обучение!'}
      </button>
    </AuthShell>
  )

  return null
}

// ── SHARED SHELL ─────────────────────────────────────────────
function AuthShell({ children, onBack, title, sub, wide }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, position: 'relative', overflow: 'hidden' }}>
      {/* subtle grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(88,166,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(88,166,255,.3), transparent)' }} />

      <div style={{ width: '100%', maxWidth: wide ? 420 : 380, position: 'relative', zIndex: 1 }} className="animate-fade-up">
        {/* Back + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={onBack} style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, color: '#8b949e', cursor: 'pointer', padding: '8px 12px', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Назад
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: '#fff' }}>L</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 14 }}>LinguaQuest</span>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: -1 }}>{title}</h2>
          <p style={{ color: '#8b949e', fontSize: 14, marginTop: 6, margin: '6px 0 0' }}>{sub}</p>
        </div>

        {children}
      </div>
    </div>
  )
}

function Field({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, color: '#8b949e', marginBottom: 6, fontWeight: 500, letterSpacing: .3 }}>{label}</label>
      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

function ErrMsg({ text }) {
  return <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', color: '#f87171', fontSize: 13 }}>{text}</div>
}
