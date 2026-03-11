import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
import { videos } from '../data/videos'
import { Play, Clock, CheckCircle2, ChevronLeft, Filter } from 'lucide-react'

const LEVELS = ['Все', 'A1', 'A2', 'B1', 'B2']

function VideoCard({ video, isCompleted, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card border border-[#21262d] hover:border-[#30363d] transition-all duration-200 hover:scale-[1.01] overflow-hidden text-left"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-[#161b22] to-[#0d1117] relative flex items-center justify-center border-b border-[#21262d]">
        <div className="w-14 h-14 rounded-full bg-[#58a6ff]/20 border-2 border-[#58a6ff] flex items-center justify-center">
          <Play size={22} className="text-[#58a6ff] ml-0.5" />
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#58a6ff]/20 text-[#58a6ff] border border-[#58a6ff]/30">
            {video.level}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 size={20} className="text-[#3fb950]" />
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
          <Clock size={11} />
          <span>{video.duration}</span>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2">{video.title}</h3>
        <div className="flex flex-wrap gap-1">
          {video.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#21262d] text-[#8b949e]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function VideoModal({ video, onClose, onComplete, isCompleted }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-[#21262d]">
        <button onClick={onClose} className="text-[#8b949e] hover:text-white transition-colors flex items-center gap-2">
          <ChevronLeft size={20} />
          <span className="text-sm">Назад к урокам</span>
        </button>
        <h2 className="font-display font-bold text-white truncate flex-1">{video.title}</h2>
        <span className="text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/30 px-2 py-1 rounded-md">
          {video.level}
        </span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Player */}
        <div className="flex-1 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-3xl aspect-video bg-[#0d1117] rounded-xl border border-[#21262d] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-violet-900/20" />
            <div className="text-center z-10">
              <div className="w-20 h-20 rounded-full bg-[#58a6ff]/20 border-2 border-[#58a6ff] flex items-center justify-center mx-auto mb-4">
                <Play size={30} className="text-[#58a6ff] ml-1" />
              </div>
              <p className="text-[#8b949e] text-sm">Видеоплеер</p>
              <p className="text-[#484f58] text-xs mt-1">YouTube embed / HTML5 video</p>
              <p className="text-xs text-[#8b949e] mt-3 font-mono">ID: {video.youtubeId}</p>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-[#21262d] overflow-y-auto">
          <h3 className="font-display font-bold text-white text-lg mb-2">{video.title}</h3>
          <div className="flex items-center gap-3 mb-4 text-sm text-[#8b949e]">
            <span className="flex items-center gap-1"><Clock size={13} />{video.duration}</span>
            <span className="w-1 h-1 rounded-full bg-[#30363d]" />
            <span>Уровень {video.level}</span>
          </div>
          <p className="text-[#8b949e] text-sm leading-relaxed mb-6">{video.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {video.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#21262d] text-[#8b949e]">#{tag}</span>
            ))}
          </div>
          {!isCompleted ? (
            <button onClick={() => onComplete(video.id)} className="btn-primary w-full">
              ✓ Отметить как пройденный
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 text-[#3fb950] font-semibold">
              <CheckCircle2 size={18} /> Урок пройден!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LessonsPage() {
  const { user, completeVideo } = useApp()
  const [levelFilter, setLevelFilter] = useState('Все')
  const [activeVideo, setActiveVideo] = useState(null)

  const allVideos = videos[user?.language || 'english'] || []
  const filtered = levelFilter === 'Все' ? allVideos : allVideos.filter(v => v.level === levelFilter)

  return (
    <Layout title="Видеоуроки">
      <div className="max-w-5xl mx-auto">
        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={16} className="text-[#8b949e]" />
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${levelFilter === lvl
                  ? 'bg-[#58a6ff] text-white'
                  : 'bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:text-white'}`}
            >
              {lvl}
            </button>
          ))}
          <span className="ml-auto text-sm text-[#8b949e]">{filtered.length} уроков</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video, i) => (
            <div key={video.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <VideoCard
                video={video}
                isCompleted={user?.completedVideos?.includes(video.id)}
                onClick={() => setActiveVideo(video)}
              />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-[#8b949e]">Уроки для этого уровня скоро появятся</p>
          </div>
        )}

        {activeVideo && (
          <VideoModal
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
            onComplete={completeVideo}
            isCompleted={user?.completedVideos?.includes(activeVideo.id)}
          />
        )}
      </div>
    </Layout>
  )
}
