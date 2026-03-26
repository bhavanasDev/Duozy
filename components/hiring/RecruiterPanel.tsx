'use client'
import { useState } from 'react'
import { RecruiterCandidate, Domain, Difficulty } from '@/types/hiring'
import { matchCandidatesToRecruiter, getTopCandidates } from '@/lib/hiringStore'
import { UserCheck, Mail, Filter } from 'lucide-react'

const DOMAINS: Domain[] = ['DSA', 'Web', 'System Design', 'Database']
const LEVELS: Difficulty[] = ['basic', 'intermediate', 'advanced']

export default function RecruiterPanel() {
  const [domain, setDomain] = useState<Domain>('DSA')
  const [level, setLevel] = useState<Difficulty>('intermediate')
  const [candidates, setCandidates] = useState<RecruiterCandidate[]>(() => getTopCandidates())
  const [filtered, setFiltered] = useState(false)

  function handleFilter() {
    const matched = matchCandidatesToRecruiter(level, domain)
    setCandidates(matched)
    setFiltered(true)
  }

  function handleReset() {
    setCandidates(getTopCandidates())
    setFiltered(false)
  }

  function handleAction(userId: string, action: 'invited' | 'connected') {
    setCandidates(prev =>
      prev.map(c => c.userId === userId ? { ...c, contactStatus: action } : c)
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-slate-500" />
          <span className="font-semibold text-slate-700">Match Candidates</span>
        </div>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Domain</label>
            <select
              value={domain}
              onChange={e => setDomain(e.target.value as Domain)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Min Level</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value as Difficulty)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {LEVELS.map(l => <option key={l} className="capitalize">{l}</option>)}
            </select>
          </div>
          <button
            onClick={handleFilter}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Find Matches
          </button>
          {filtered && (
            <button onClick={handleReset} className="text-sm text-slate-500 underline">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Candidate List */}
      {candidates.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-sm">No candidates match this criteria.</div>
      ) : (
        <div className="space-y-3">
          {candidates.map(c => (
            <CandidateCard key={c.userId} candidate={c} onAction={handleAction} />
          ))}
        </div>
      )}
    </div>
  )
}

function CandidateCard({
  candidate,
  onAction,
}: {
  candidate: RecruiterCandidate
  onAction: (id: string, action: 'invited' | 'connected') => void
}) {
  const { stats } = candidate
  const total = Object.values(stats.solved).reduce((a, b) => a + b, 0)

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{candidate.avatar}</div>
        <div>
          <p className="font-semibold text-slate-800">{candidate.name}</p>
          <p className="text-xs text-slate-500">{stats.domain} · {total} problems solved · {stats.accuracy}% accuracy</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {stats.badges.map(b => (
              <span key={b.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{b.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        {candidate.contactStatus === 'none' && (
          <>
            <button
              onClick={() => onAction(candidate.userId, 'invited')}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
            >
              <Mail size={12} /> Invite
            </button>
            <button
              onClick={() => onAction(candidate.userId, 'connected')}
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-50"
            >
              <UserCheck size={12} /> Connect
            </button>
          </>
        )}
        {candidate.contactStatus === 'invited' && (
          <span className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded-lg">✉ Invited</span>
        )}
        {candidate.contactStatus === 'connected' && (
          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-lg">✅ Connected</span>
        )}
      </div>
    </div>
  )
}
