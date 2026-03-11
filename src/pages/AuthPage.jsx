import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']
const LANGUAGES = [
  { id: 'english', flag: '🇺🇸', name: 'English', desc: 'Английский' },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese', desc: 'Японский' },
  { id: 'korean', flag: '🇰🇷', name: 'Korean', desc: 'Корейский' },
]

export default function AuthPage() {
  const [step, setStep] = useState('login') // login | register | choose-lang | choose-level
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [selectedLang, setSelectedLang] = useState('english')
  const [selectedLevel, setSelectedLevel] = useState('A1')
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setError('Заполните все поля'); return }
    setStep('choose-lang')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Заполните все поля'); return }
    login({ name: form.email.split('@')[0], email: form.email, language: 'english', level: 'A1' })
    navigate('/home')
  }

  const handleFinish = () => {
    login({ name: form.name, email: form.email, language: selectedLang, level: selectedLevel })
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      {/* Background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-2xl glow-blue">L</div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">LinguaQuest</h1>
          <p className="text-[#8b949e]">Учи языки играя</p>
        </div>

        {/* STEP: Login or Register */}
        {(step === 'login' || step === 'register') && (
          <div className="card p-6 animate-fade-up">
            <div className="flex gap-2 mb-6 bg-[#0d1117] rounded-xl p-1">
              <button onClick={() => setStep('login')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${step === 'login' ? 'bg-[#161b22] text-white shadow' : 'text-[#8b949e] hover:text-white'}`}>
                Войти
              </button>
              <button onClick={() => setStep('register')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${step === 'register' ? 'bg-[#161b22] text-white shadow' : 'text-[#8b949e] hover:text-white'}`}>
                Регистрация
              </button>
            </div>

            <form onSubmit={step === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {step === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-[#8b949e] mb-1.5">Имя</label>
                  <input
                    type="text" placeholder="Ваше имя"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-[#8b949e] mb-1.5">Email</label>
                <input
                  type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8b949e] mb-1.5">Пароль</label>
                <input
                  type="password" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="btn-primary w-full mt-2">
                {step === 'login' ? 'Войти' : 'Продолжить →'}
              </button>
            </form>
          </div>
        )}

        {/* STEP: Choose Language */}
        {step === 'choose-lang' && (
          <div className="card p-6 animate-fade-up">
            <h2 className="font-display font-bold text-xl text-white mb-1">Какой язык учишь?</h2>
            <p className="text-[#8b949e] text-sm mb-6">Выбери язык для изучения</p>
            <div className="space-y-3">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all
                    ${selectedLang === lang.id
                      ? 'border-[#58a6ff] bg-[#58a6ff]/10'
                      : 'border-[#21262d] hover:border-[#30363d]'}`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="font-semibold text-white">{lang.name}</div>
                    <div className="text-sm text-[#8b949e]">{lang.desc}</div>
                  </div>
                  {selectedLang === lang.id && <span className="ml-auto text-[#58a6ff] text-xl">✓</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setStep('choose-level')} className="btn-primary w-full mt-6">
              Далее →
            </button>
          </div>
        )}

        {/* STEP: Choose Level */}
        {step === 'choose-level' && (
          <div className="card p-6 animate-fade-up">
            <h2 className="font-display font-bold text-xl text-white mb-1">Выбери свой уровень</h2>
            <p className="text-[#8b949e] text-sm mb-6">Или начни с A1 — мы подберём программу</p>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`py-3 rounded-xl font-display font-bold text-lg border transition-all
                    ${selectedLevel === level
                      ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff]'
                      : 'border-[#21262d] text-[#8b949e] hover:border-[#30363d] hover:text-white'}`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="text-sm text-[#8b949e] mb-6 px-2">
              {selectedLevel === 'A1' && '🌱 Начинающий — знаю несколько слов'}
              {selectedLevel === 'A2' && '📗 Элементарный — понимаю базовые фразы'}
              {selectedLevel === 'B1' && '📘 Средний — могу поддержать разговор'}
              {selectedLevel === 'B2' && '📙 Выше среднего — хорошо понимаю текст'}
              {selectedLevel === 'C1' && '🔥 Продвинутый — почти свободно говорю'}
            </div>
            <button onClick={handleFinish} className="btn-primary w-full">
              Начать обучение! 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
