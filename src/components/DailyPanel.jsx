import { useApp } from '../context/AppContext'
import { dailyTasks } from '../data/dailyTasks'

export default function DailyPanel() {
  const { user } = useApp()

  const getProgress = (task) => {
    switch (task.type) {
      case 'xp': return Math.min(user?.xp || 0, task.target)
      case 'lessons': return Math.min((user?.completedLessons || []).length, task.target)
      case 'videos': return Math.min((user?.completedVideos || []).length, task.target)
      default: return Math.floor(Math.random() * task.target * 0.7)
    }
  }

  return (
    <div className="space-y-6">
      {/* Streak card */}
      <div className="card glow-green">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-white text-sm">Серия дней</h3>
          <span className="text-xs text-gray-400">{user?.streak || 0} 🔥</span>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2d45" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#FF6B35" strokeWidth="3"
                strokeDasharray={`${Math.min((user?.streak || 0) / 30 * 100, 100)} 100`}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl leading-none">🔥</span>
              <span className="font-display font-black text-lg text-orange-400">{user?.streak || 0}</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2 font-body">дней подряд</p>
      </div>

      {/* Daily tasks */}
      <div>
        <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Задания дня
        </h3>
        <div className="space-y-3">
          {dailyTasks.map(task => {
            const progress = getProgress(task)
            const pct = Math.min((progress / task.target) * 100, 100)
            const done = pct >= 100

            return (
              <div key={task.id} className={`card border transition-all ${done ? 'border-brand-primary/40 bg-dark-700' : 'border-dark-600'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{task.icon}</span>
                    <span className={`text-xs font-body ${done ? 'text-brand-primary' : 'text-gray-300'}`}>{task.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-body flex-shrink-0 ml-2">{task.reward}</span>
                </div>
                <div className="xp-bar">
                  <div
                    className={`xp-bar-fill ${done ? 'from-brand-primary to-green-400' : 'from-brand-secondary to-blue-400'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{progress}/{task.target}</span>
                  {done && <span className="text-xs text-brand-primary font-display font-bold">✓ Готово!</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leaderboard mini */}
      <div>
        <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
          <span>🏆</span> Лига недели
        </h3>
        <div className="space-y-2">
          {[
            { rank: 1, name: 'Александра', xp: 1240, medal: '🥇' },
            { rank: 2, name: 'Иван', xp: 980, medal: '🥈' },
            { rank: 3, name: 'Maria', xp: 870, medal: '🥉' },
            { rank: 4, name: user?.username || 'You', xp: user?.xp || 0, medal: '4' },
            { rank: 5, name: 'Kenji', xp: 420, medal: '5' },
          ].map((entry, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${entry.name === (user?.username || 'You') ? 'bg-brand-secondary/10 border border-brand-secondary/30' : 'bg-dark-700'}`}>
              <span className="text-sm w-5 text-center">{entry.medal}</span>
              <span className="flex-1 text-sm font-body text-gray-300 truncate">{entry.name}</span>
              <span className="text-xs text-yellow-400 font-display font-bold">{entry.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
