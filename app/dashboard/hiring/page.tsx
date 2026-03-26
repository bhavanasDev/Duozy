'use client'
import { useState, useEffect } from 'react'
import { useApp } from '@/lib/context'
import { Difficulty, Domain, UserSkillStats, SkillBadge } from '@/types/hiring'
import { PROBLEMS } from '@/lib/hiringData'
import { loadStats, processSubmission } from '@/lib/hiringStore'
import ProblemCard from '@/components/hiring/ProblemCard'
import SkillDashboard from '@/components/hiring/SkillDashboard'
import { Code2, BarChart2, X } from 'lucide-react'

const DIFFICULTIES: Difficulty[] = ['basic', 'intermediate', 'advanced']
const DOMAINS: Domain[] = ['DSA', 'Web', 'System Design', 'Database']

export default function HiringPage() {
  const { user } = useApp()
  const userId = user?.id ?? 'demo-user'

  const [stats, setStats] = useState<UserSkillStats>(() => loadStats(userId))
  const [tab, setTab] = useState<'problems' | 'dashboard'>('problems')
  const [difficulty, setDifficulty] = useState<Difficulty>('basic')
  const [domain, setDomain] = useState<Domain | 'all'>('all')
  const [toast, setToast] = useState<SkillBadge | null>(null)
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setStats(loadStats(userId))
  }, [userId])

  function handleSubmit(problemId: string, correct: boolean, timeTaken: number) {
    if (solvedIds.has(problemId)) return // prevent re-submission
    setSolvedIds(prev => new Set(prev).add(problemId))

    const { stats: updated, newBadge } = processSubmission(
      stats,
      { problemId, userId, correct, timeTaken, submittedAt: Date.now() },
      difficulty,
    )
    setStats(updated)

    if (newBadge) {
      setToast(newBadge)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const visibleProblems = PROBLEMS.filter(p =>
    p.difficulty === difficulty && (domain === 'all' || p.domain === domain)
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Skill-Based Hiring</h1>
        <p className="text-sm text-slate-500 mt-1">Solve problems, earn badges, get noticed by recruiters.</p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
        {([['problems', <Code2 size={15} />, 'Problems'], ['dashboard', <BarChart2 size={15} />, 'My Progress']] as const).map(
          ([key, icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {icon}{label}
            </button>
          )
        )}
      </div>

      {tab === 'problems' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${difficulty === d ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <select
              value={domain}
              onChange={e => setDomain(e.target.value as Domain | 'all')}
              className="border border-slate-200 rounded-lg px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="all">All Domains</option>
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Problems */}
          <div className="space-y-3">
            {visibleProblems.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No problems found for this filter.</p>
            ) : (
              visibleProblems.map(p => (
                <ProblemCard
                  key={p.id}
                  problem={p}
                  disabled={solvedIds.has(p.id)}
                  onSubmit={(correct, time) => handleSubmit(p.id, correct, time)}
                />
              ))
            )}
          </div>
        </>
      )}

      {tab === 'dashboard' && <SkillDashboard stats={stats} />}

      {/* Badge Toast */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-yellow-300 shadow-lg rounded-2xl px-5 py-3 flex items-center gap-3 animate-bounce">
          <span className="text-2xl">🏅</span>
          <div>
            <p className="font-bold text-slate-800 text-sm">Badge Unlocked!</p>
            <p className="text-xs text-slate-500">{toast.label}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 ml-2">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
