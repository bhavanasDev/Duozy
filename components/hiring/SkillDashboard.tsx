'use client'
import { UserSkillStats, THRESHOLDS, Difficulty } from '@/types/hiring'
import { Trophy, Target, Clock, TrendingUp } from 'lucide-react'

interface Props {
  stats: UserSkillStats
}

const LEVEL_COLORS: Record<Difficulty, string> = {
  basic: 'text-green-600 bg-green-50 border-green-200',
  intermediate: 'text-blue-600 bg-blue-50 border-blue-200',
  advanced: 'text-purple-600 bg-purple-50 border-purple-200',
}

export default function SkillDashboard({ stats }: Props) {
  const difficulties: Difficulty[] = ['basic', 'intermediate', 'advanced']

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Target size={18} />, label: 'Accuracy', value: `${stats.accuracy}%`, color: 'text-blue-600' },
          { icon: <Clock size={18} />, label: 'Avg Time', value: `${stats.avgTime}s`, color: 'text-orange-500' },
          { icon: <TrendingUp size={18} />, label: 'Total Solved', value: Object.values(stats.solved).reduce((a, b) => a + b, 0), color: 'text-green-600' },
          { icon: <Trophy size={18} />, label: 'Badges', value: stats.badges.length, color: 'text-yellow-500' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <span className={color}>{icon}</span>
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress per difficulty */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-slate-700">Progress by Level</h3>
        {difficulties.map(d => {
          const solved = stats.solved[d]
          const threshold = THRESHOLDS[d]
          const pct = Math.min((solved / threshold) * 100, 100)
          const hasBadge = stats.badges.some(b => b.difficulty === d)
          return (
            <div key={d}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize font-medium text-slate-600">{d}</span>
                <span className="text-slate-500">{solved}/{threshold} {hasBadge ? '✅' : ''}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${d === 'basic' ? 'bg-green-400' : d === 'intermediate' ? 'bg-blue-400' : 'bg-purple-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Badges */}
      {stats.badges.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-700 mb-3">Earned Badges</h3>
          <div className="flex flex-wrap gap-2">
            {stats.badges.map(badge => (
              <span
                key={badge.id}
                className={`text-sm font-medium px-3 py-1 rounded-full border ${LEVEL_COLORS[badge.difficulty]}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Verified Level */}
      {stats.verifiedLevel && (
        <div className={`border rounded-xl p-4 ${LEVEL_COLORS[stats.verifiedLevel]}`}>
          <p className="text-sm font-semibold">🎯 Verified Level: <span className="capitalize">{stats.verifiedLevel}</span></p>
          <p className="text-xs mt-0.5 opacity-70">You are now visible to recruiters at this level.</p>
        </div>
      )}
    </div>
  )
}
