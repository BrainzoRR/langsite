import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { shopItems } from '../data/shop'

export default function ShopPage() {
  const { user, updateUser } = useApp()
  const [bought, setBought] = useState([])
  const [toast, setToast] = useState(null)

  const raffleCount = bought.filter(id => id === 's4').length

  const buy = (item) => {
    if (bought.includes(item.id)) { showToast('Уже куплено!', false); return }
    if ((user?.coins || 0) < item.price) { showToast('Недостаточно монет!', false); return }
    updateUser({ coins: (user?.coins || 0) - item.price })
    setBought(b => [...b, item.id])
    showToast(`${item.name} куплено! ✨`, true)
  }

  const showToast = (text, ok) => {
    setToast({ text, ok })
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <Layout title="Магазин">
      <div className="max-w-5xl mx-auto">
        {/* Balance */}
        <div className="flex gap-4 mb-6">
          <div className="card p-4 flex items-center gap-3">
            <span className="text-3xl">🪙</span>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl font-bold text-white">{user?.coins || 0}</div>
              <div className="text-xs text-[#8b949e]">Монеты</div>
            </div>
          </div>
          <div className="card flex-1 p-4 flex items-center gap-3" style={{ background: 'rgba(63,185,80,.04)', border: '1px solid rgba(63,185,80,.12)' }}>
            <span className="text-xl">💡</span>
            <div className="text-sm text-[#8b949e]">Зарабатывай монеты за прохождение уроков и контрольных. Трать в магазине!</div>
          </div>
        </div>

        {/* Raffle banner */}
        <div style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.15),rgba(59,130,246,.15))', border: '1px solid rgba(139,92,246,.25)', borderRadius: 18, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 4 }}>🎰 Розыгрыш Premium на 3 месяца</div>
            <div style={{ fontSize: 13, color: '#8b949e' }}>
              Каждую пятницу · Твои билеты: <b style={{ color: '#bc8cff' }}>{raffleCount}</b>
              {raffleCount === 0 && ' — купи билет ниже!'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#bc8cff' }}>3 МЕС</div>
            <div style={{ fontSize: 11, color: '#8b949e' }}>Premium в подарок</div>
          </div>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopItems.map((item, i) => {
            const isBought = bought.includes(item.id)
            const canAfford = (user?.coins || 0) >= item.price
            return (
              <div key={item.id} className="card animate-fade-up" style={{ padding: 20, position: 'relative', border: `1px solid ${isBought ? 'rgba(63,185,80,.25)' : '#21262d'}`, animationDelay: `${i * 60}ms`, transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = isBought ? 'rgba(63,185,80,.4)' : '#30363d'}
                onMouseLeave={e => e.currentTarget.style.borderColor = isBought ? 'rgba(63,185,80,.25)' : '#21262d'}
              >
                {item.tag && (
                  <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, fontWeight: 700, background: 'rgba(88,166,255,.12)', color: '#58a6ff', border: '1px solid rgba(88,166,255,.2)', padding: '2px 8px', borderRadius: 99 }}>
                    {item.tag}
                  </span>
                )}
                <div style={{ fontSize: 38, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', marginBottom: 4, fontSize: 15 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: '#8b949e', marginBottom: 16, lineHeight: 1.4 }}>{item.desc}</div>
                <button
                  onClick={() => buy(item)}
                  disabled={isBought}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 11, border: 'none', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 13,
                    cursor: isBought ? 'not-allowed' : canAfford ? 'pointer' : 'not-allowed',
                    background: isBought ? 'rgba(63,185,80,.15)' : canAfford ? 'rgba(250,191,36,.12)' : 'rgba(30,30,30,.5)',
                    color: isBought ? '#3fb950' : canAfford ? '#fbbf24' : '#4b4f58',
                    outline: `1px solid ${isBought ? 'rgba(63,185,80,.25)' : canAfford ? 'rgba(250,191,36,.2)' : '#21262d'}`,
                    transition: 'all .15s',
                  }}
                >
                  {isBought ? '✓ Куплено' : `🪙 ${item.price} монет`}
                </button>
              </div>
            )
          })}
        </div>

        {/* Toast */}
        {toast && (
          <div style={{ position: 'fixed', top: 80, right: 24, padding: '12px 20px', borderRadius: 12, background: toast.ok ? 'rgba(63,185,80,.15)' : 'rgba(239,68,68,.15)', border: `1px solid ${toast.ok ? 'rgba(63,185,80,.3)' : 'rgba(239,68,68,.3)'}`, color: toast.ok ? '#3fb950' : '#ef4444', fontWeight: 600, fontSize: 14, zIndex: 200, boxShadow: '0 8px 30px rgba(0,0,0,.4)' }}>
            {toast.text}
          </div>
        )}
      </div>
    </Layout>
  )
}
