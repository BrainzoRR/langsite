import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { mockLeaderboard, BADGES, xpToLevel, xpProgress, levelTitle } from '../data/leaderboard'
import { Trophy, Medal, Star, Flame } from 'lucide-react'

const PERIOD_LABELS = { week: 'Топ недели', month: 'Топ месяца', all: 'Все времена' }

function LevelBadge({ level }) {
  const color = level < 5 ? '#8b949e' : level < 10 ? '#3b82f6' : level < 20 ? '#8b5cf6' : '#f59e0b'
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 6, background: `${color}18`, border: `1px solid ${color}33` }}>
      <Star size={10} color={color} fill={color}/>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: 'Syne, sans-serif' }}>Lv {level}</span>
    </div>
  )
}

function RankIcon({ rank }) {
  if (rank === 1) return <div style={{ fontSize: 22 }}>🥇</div>
  if (rank === 2) return <div style={{ fontSize: 22 }}>🥈</div>
  if (rank === 3) return <div style={{ fontSize: 22 }}>🥉</div>
  return <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#8b949e' }}>{rank}</div>
}

export default function LeaderboardPage() {
  const { user } = useApp()
  const [tab, setTab] = useState('board') // board | badges
  const [period, setPeriod] = useState('week')

  const { level, progress, needed, pct } = xpProgress(user?.xp || 0)

  // Build leaderboard: insert current user
  const myEntry = { id: 'me', name: user?.name || 'Ты', xp: user?.xp || 0, streak: user?.streak || 0, avatar: '😎', lang: '🇺🇸', isMe: true }
  const combined = [...mockLeaderboard, myEntry].sort((a, b) => b.xp - a.xp)

  // Slightly vary data for week/month tabs (mock)
  const board = period === 'all' ? combined
    : period === 'week' ? combined.map(u => ({ ...u, xp: Math.round(u.xp * (u.id === 'me' ? 1 : 0.15 + Math.random() * 0.2)) })).sort((a,b) => b.xp - a.xp)
    : combined.map(u => ({ ...u, xp: Math.round(u.xp * (u.id === 'me' ? 1 : 0.45 + Math.random() * 0.3)) })).sort((a,b) => b.xp - a.xp)

  const myRank = board.findIndex(u => u.id === 'me') + 1

  // Badges
  const unlockedBadges = BADGES.filter(b => b.check(user || {}))
  const lockedBadges = BADGES.filter(b => !b.check(user || {}))

  return (
    <Layout title="Лидерборд">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* My level card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(88,166,255,.1), rgba(139,92,246,.1))', border: '1px solid rgba(88,166,255,.2)', borderRadius: 20, padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {level}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 16 }}>{levelTitle(level)}</span>
              <span style={{ fontSize: 11, color: '#8b949e' }}>·</span>
              <span style={{ fontSize: 13, color: '#8b949e' }}>#{myRank} в рейтинге</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 7, background: '#21262d', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#58a6ff,#bc8cff)', borderRadius: 999, transition: 'width .6s' }} />
              </div>
              <span style={{ fontSize: 12, color: '#8b949e', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{progress}/{needed} до Lv {level+1}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#8b949e' }}>Всего XP</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#fbbf24' }}>⚡ {user?.xp || 0}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: '#161b22', padding: 6, borderRadius: 14, border: '1px solid #21262d' }}>
          {[{id:'board',l:'🏆 Рейтинг'},{id:'badges',l:'🎖️ Бейджи'}].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${tab===t.id?'#21262d':'transparent'}`, background: tab===t.id?'#0d1117':'transparent', color: tab===t.id?'#fff':'#8b949e', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.l}
            </button>
          ))}
        </div>

        {/* ── LEADERBOARD TAB ── */}
        {tab === 'board' && (
          <>
            {/* Period filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {Object.entries(PERIOD_LABELS).map(([id, label]) => (
                <button key={id} onClick={() => setPeriod(id)} style={{ padding: '7px 16px', borderRadius: 10, border: `1px solid ${period===id?'#58a6ff':'#21262d'}`, background: period===id?'#58a6ff':'#161b22', color: period===id?'#fff':'#8b949e', cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Top 3 podium */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 20, padding: '0 8px' }}>
              {[board[1], board[0], board[2]].map((entry, pos) => {
                if (!entry) return null
                const rank = pos === 1 ? 1 : pos === 0 ? 2 : 3
                const heights = [80, 100, 68]
                const lv = xpToLevel(entry.xp)
                return (
                  <div key={entry.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 28 }}>{entry.avatar}</div>
                    <div style={{ fontWeight: 600, fontSize: 12, color: entry.isMe ? '#58a6ff' : '#e6edf3', textAlign: 'center' }}>{entry.name}</div>
                    <div style={{ fontSize: 11, color: '#8b949e' }}>⚡ {entry.xp}</div>
                    <div style={{ width: '100%', height: heights[pos], borderRadius: '12px 12px 0 0', background: rank===1?'linear-gradient(180deg,#fbbf24,#f59e0b)':rank===2?'linear-gradient(180deg,#9ca3af,#6b7280)':'linear-gradient(180deg,#d97706,#b45309)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10, position: 'relative' }}>
                      <RankIcon rank={rank}/>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Full list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {board.slice(0, 20).map((entry, idx) => {
                const rank = idx + 1
                const lv = xpToLevel(entry.xp)
                const isMe = entry.id === 'me'
                return (
                  <div key={entry.id + period} className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 14, background: isMe ? 'rgba(88,166,255,.07)' : '#161b22', border: `1px solid ${isMe ? 'rgba(88,166,255,.25)' : '#21262d'}`, animationDelay: `${idx*30}ms` }}>
                    <RankIcon rank={rank}/>
                    <div style={{ fontSize: 24 }}>{entry.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontWeight: 600, color: isMe ? '#58a6ff' : '#e6edf3', fontSize: 14 }}>{entry.name}{isMe && ' (Ты)'}</span>
                        <LevelBadge level={lv}/>
                        <span style={{ fontSize: 13 }}>{entry.lang}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#8b949e' }}>
                        <Flame size={11} color="#fb923c"/> <span style={{ color: '#fb923c' }}>{entry.streak}</span>
                        <span>· {levelTitle(lv)}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fbbf24', fontSize: 15 }}>⚡ {entry.xp}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* ── BADGES TAB ── */}
        {tab === 'badges' && (
          <div>
            {unlockedBadges.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#8b949e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>✅ Получено ({unlockedBadges.length})</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                  {unlockedBadges.map(b => (
                    <div key={b.id} className="card animate-fade-up" style={{ padding: 16, textAlign: 'center', border: '1px solid rgba(210,153,34,.25)', background: 'rgba(210,153,34,.04)' }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>{b.icon}</div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 4 }}>{b.title}</div>
                      <div style={{ fontSize: 11, color: '#8b949e', lineHeight: 1.3 }}>{b.desc}</div>
                      <div style={{ fontSize: 11, color: '#d29922', fontWeight: 600, marginTop: 8 }}>✓ Получено</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8b949e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>🔒 Не получено ({lockedBadges.length})</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {lockedBadges.map(b => (
                  <div key={b.id} className="card" style={{ padding: 16, textAlign: 'center', opacity: .55 }}>
                    <div style={{ fontSize: 36, marginBottom: 8, filter: 'grayscale(1)' }}>{b.icon}</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#8b949e', fontSize: 13, marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: '#484f58', lineHeight: 1.3 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
