import React from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'

const items = [
  { id: 's1', name: 'Двойной XP', icon: '⚡', desc: '2x XP на 1 час', price: 100, currency: 'coins', tag: 'Популярное' },
  { id: 's2', name: 'Заморозка стрика', icon: '🧊', desc: 'Сохрани серию', price: 50, currency: 'coins', tag: null },
  { id: 's3', name: 'Безлимитные сердца', icon: '❤️‍🔥', desc: 'На 1 день', price: 5, currency: 'gems', tag: 'Хит' },
  { id: 's4', name: 'Про подписка', icon: '👑', desc: '1 месяц Premium', price: 20, currency: 'gems', tag: 'Лучшая цена' },
  { id: 's5', name: 'Пакет XP x500', icon: '💎', desc: 'Мгновенный буст', price: 200, currency: 'coins', tag: null },
  { id: 's6', name: 'Кастомный аватар', icon: '🎨', desc: 'Уникальная иконка', price: 10, currency: 'gems', tag: null },
]

export default function ShopPage() {
  const { user } = useApp()

  return (
    <Layout title="Магазин">
      <div className="max-w-4xl mx-auto">
        {/* Balance */}
        <div className="flex gap-4 mb-8">
          <div className="card p-4 flex items-center gap-3 border-[#21262d]">
            <span className="text-2xl">🪙</span>
            <div>
              <div className="font-display font-bold text-xl text-white">{user?.coins || 0}</div>
              <div className="text-xs text-[#8b949e]">Монеты</div>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3 border-[#21262d]">
            <span className="text-2xl">💎</span>
            <div>
              <div className="font-display font-bold text-xl text-white">{user?.gems || 0}</div>
              <div className="text-xs text-[#8b949e]">Кристаллы</div>
            </div>
          </div>
        </div>

        <div className="text-center py-8 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-4">
            🚧 Магазин в разработке
          </div>
          <p className="text-[#8b949e]">Скоро здесь будет полноценный магазин бустеров!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={item.id} className="card p-5 border border-[#21262d] relative animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              {item.tag && (
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#58a6ff]/20 text-[#58a6ff] border border-[#58a6ff]/30">
                  {item.tag}
                </span>
              )}
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-white mb-1">{item.name}</h3>
              <p className="text-sm text-[#8b949e] mb-4">{item.desc}</p>
              <button
                className="w-full py-2.5 rounded-xl border border-[#21262d] text-[#8b949e] text-sm font-semibold
                  hover:border-[#58a6ff]/30 hover:text-white transition-all cursor-not-allowed opacity-60"
                disabled
              >
                {item.currency === 'coins' ? '🪙' : '💎'} {item.price} {item.currency === 'coins' ? 'монет' : 'кристаллов'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
