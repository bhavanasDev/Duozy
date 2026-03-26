'use client'
import { useState, memo } from 'react'
import dynamic from 'next/dynamic'
import { useApp } from '@/lib/context'
import { useMapData } from '@/components/map/useMapData'
import { Filter, X } from 'lucide-react'
import type { Opportunity, OpportunityFilter } from '@/types/opportunity'

const MapContainer = dynamic(
  () => import('@/components/map/MapContainer').then(m => ({ default: m.MapContainer })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-[#E8F4FD]" style={{ minHeight: '500px' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading map…</p>
        </div>
      </div>
    ),
  }
)

const FILTER_OPTIONS: { value: OpportunityFilter; label: string }[] = [
  { value: 'all',        label: 'All' },
  { value: 'hackathon',  label: '🏆 Hackathon' },
  { value: 'exam',       label: '📝 Exam' },
  { value: 'internship', label: '🎓 Internship' },
  { value: 'job',        label: '💼 Job' },
]

const FilterBar = memo(function FilterBar({
  filter, onChange, count, isStudy,
}: { filter: OpportunityFilter; onChange: (f: OpportunityFilter) => void; count: number; isStudy: boolean }) {
  return (
    <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 flex-wrap ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'}`}>
      <div>
        <h1 className={`text-xl font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>🗺️ Opportunity Map — Hyderabad</h1>
        <p className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{count} opportunities · Click a pin to explore</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className={isStudy ? 'text-slate-400' : 'text-slate-500'} />
        {FILTER_OPTIONS.map(f => (
          <button key={f.value} onClick={() => onChange(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f.value ? (isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white') : (isStudy ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}`}>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
})

export default function MapPage() {
  const { mode, completeTask } = useApp()
  const isStudy = mode === 'study'
  const { opportunities, filter, setFilter } = useMapData()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set())
  const [applyTarget, setApplyTarget] = useState<Opportunity | null>(null)
  const [applied, setApplied] = useState<Set<string>>(new Set())
  const [applyForm, setApplyForm] = useState({ name: '', email: '', college: '', year: '', why: '' })

  const handleMarkerClick = (id: string) => {
    setActiveId(prev => prev === id ? null : id)
    setExploredIds(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev).add(id)
      if (next.size >= 1) completeTask('b1t2')
      if (next.size >= 3) completeTask('b4t2')
      return next
    })
  }

  const handleApply = (opp: Opportunity) => {
    setApplyTarget(opp)
    setApplyForm({ name: '', email: '', college: '', year: '', why: '' })
  }

  const handleSubmitApply = () => {
    if (!applyTarget) return
    setApplied(prev => {
      const next = new Set(prev).add(applyTarget.id)
      completeTask('b4t1')
      if (next.size >= 3) completeTask('b4t2')
      return next
    })
    setApplyTarget(null)
  }

  const s = isStudy
    ? { bg: 'bg-white', text: 'text-slate-900', sub: 'text-slate-500', input: 'border-slate-200 bg-slate-50 text-slate-800 focus:ring-blue-300', btn: 'bg-blue-600 hover:bg-blue-700 text-white', label: 'text-slate-600', card: 'bg-white', cancel: 'border-slate-200 text-slate-600 hover:bg-slate-50' }
    : { bg: 'bg-slate-800', text: 'text-white', sub: 'text-slate-400', input: 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500', btn: 'bg-purple-600 hover:bg-purple-700 text-white', label: 'text-slate-400', card: 'bg-slate-800', cancel: 'border-slate-600 text-slate-300 hover:bg-slate-700' }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <FilterBar filter={filter} onChange={setFilter} count={opportunities.length} isStudy={isStudy} />

      <div className="flex-1 relative overflow-hidden" style={{ minHeight: '500px' }}>
        <MapContainer
          opportunities={opportunities}
          activeId={activeId}
          isStudy={isStudy}
          onMarkerClick={handleMarkerClick}
          onApply={handleApply}
        />
      </div>

      {applyTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setApplyTarget(null)}>
          <div className={`w-full max-w-md rounded-3xl shadow-2xl p-6 animate-slide-up ${s.card}`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className={`text-lg font-black ${s.text}`}>{applyTarget.title}</h2>
                <p className={`text-xs ${s.sub}`}>{applyTarget.company} · {applyTarget.area}, Hyderabad</p>
              </div>
              <button onClick={() => setApplyTarget(null)} className={`p-2 rounded-xl ${isStudy ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-slate-700 text-slate-400'}`}>
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${s.label}`}>Full Name *</label>
                  <input placeholder="Your name" value={applyForm.name}
                    onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${s.label}`}>Email *</label>
                  <input type="email" placeholder="you@email.com" value={applyForm.email}
                    onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${s.label}`}>College / Institute *</label>
                  <input placeholder="College name" value={applyForm.college}
                    onChange={e => setApplyForm(f => ({ ...f, college: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${s.label}`}>Year of Study *</label>
                  <select value={applyForm.year} onChange={e => setApplyForm(f => ({ ...f, year: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.input}`}>
                    <option value="">Select year</option>
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post Graduate'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${s.label}`}>Why are you interested?</label>
                <textarea placeholder="Brief motivation..." value={applyForm.why} rows={2}
                  onChange={e => setApplyForm(f => ({ ...f, why: e.target.value }))}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none ${s.input}`} />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setApplyTarget(null)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${s.cancel}`}>
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApply}
                  disabled={!applyForm.name || !applyForm.email || !applyForm.college || !applyForm.year}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 ${s.btn}`}>
                  {applied.has(applyTarget.id) ? '✓ Applied!' : 'Submit Application →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
