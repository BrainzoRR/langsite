import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { videos } from '../data/videos'
import { Clock, Play, CheckCircle2, ChevronLeft } from 'lucide-react'

export default function LessonsPage() {
  const { user, completeVideo } = useApp()
  const [levelFilter, setLevelFilter] = useState('Все')
  const [activeVideo, setActiveVideo] = useState(null)

  const allVideos = videos[user?.language || 'english'] || []
  const filtered = levelFilter === 'Все' ? allVideos : allVideos.filter(v => v.level === levelFilter)
  const doneVideos = user?.completedVideos || []

  return (
    <Layout title="Видеоуроки">
      <div className="max-w-5xl mx-auto">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {['Все', 'A1', 'A2', 'B1', 'B2'].map(lv => (
            <button key={lv} onClick={() => setLevelFilter(lv)}
              style={{ padding: '7px 16px', borderRadius: 10, border: `1px solid ${levelFilter === lv ? '#58a6ff' : '#21262d'}`, background: levelFilter === lv ? '#58a6ff' : '#161b22', color: levelFilter === lv ? '#fff' : '#8b949e', cursor: 'pointer', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
              {lv}
            </button>
          ))}
          <span className="ml-auto text-sm text-[#8b949e]">{filtered.length} уроков</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video, i) => {
            const done = doneVideos.includes(video.id)
            return (
              <button key={video.id} onClick={() => setActiveVideo(video)}
                className="card text-left overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 50}ms`, border: '1px solid #21262d', cursor: 'pointer', transition: 'transform .15s, border-color .15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.borderColor = '#30363d' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = '#21262d' }}
              >
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,#161b22,#0d1117)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #21262d', position: 'relative' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(88,166,255,.15)', border: '2px solid #58a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#58a6ff', fontSize: 20 }}>▶</div>
                  <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 10, fontFamily: 'monospace', fontWeight: 700, background: 'rgba(88,166,255,.15)', border: '1px solid rgba(88,166,255,.25)', color: '#58a6ff', padding: '2px 8px', borderRadius: 6 }}>{video.level}</span>
                  {done && <CheckCircle2 size={20} className="absolute top-3 right-3 text-[#3fb950]" style={{ position: 'absolute', top: 10, right: 10 }} />}
                  <span style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: '#fff', background: 'rgba(0,0,0,.6)', padding: '2px 7px', borderRadius: 6 }}>⏱ {video.duration}</span>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="font-semibold text-white text-sm mb-2 leading-snug">{video.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map(t => (
                      <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: '#21262d', color: '#8b949e' }}>#{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-[#8b949e]">Уроки для этого уровня скоро появятся</p>
          </div>
        )}

        {/* Video modal */}
        {activeVideo && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #21262d', display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setActiveVideo(null)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                ← Назад
              </button>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', flex: 1 }}>{activeVideo.title}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', padding: 24 }}>
                <div style={{ width: '100%', maxWidth: 720, aspectRatio: '16/9', background: '#0d1117', borderRadius: 16, border: '1px solid #21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(30,64,175,.15),rgba(109,40,217,.15))' }} />
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(88,166,255,.2)', border: '2px solid #58a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 12px', color: '#58a6ff' }}>▶</div>
                    <p style={{ color: '#8b949e', fontSize: 13 }}>Видеоплеер (YouTube embed)</p>
                    <p style={{ color: '#484f58', fontSize: 11, marginTop: 4, fontFamily: 'monospace' }}>ID: {activeVideo.youtubeId}</p>
                  </div>
                </div>
              </div>
              <div style={{ width: 280, padding: 20, borderLeft: '1px solid #21262d', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 8 }}>{activeVideo.title}</h3>
                <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 12 }}>⏱ {activeVideo.duration} · Уровень {activeVideo.level}</div>
                <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6, marginBottom: 16 }}>{activeVideo.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {activeVideo.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#21262d', color: '#8b949e' }}>#{t}</span>)}
                </div>
                {!doneVideos.includes(activeVideo.id)
                  ? <button onClick={() => completeVideo(activeVideo.id)} className="btn-primary w-full py-3 text-sm" style={{ background: '#3fb950' }}>✓ Отметить пройденным</button>
                  : <div style={{ color: '#3fb950', textAlign: 'center', padding: 12, fontWeight: 600, fontSize: 14 }}>✅ Урок пройден!</div>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
