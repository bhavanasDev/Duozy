'use client'
import { useState, memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useApp } from '@/lib/context'
import { useMapData } from '@/components/map/useMapData'
import { Filter } from 'lucide-react'
import type { OpportunityFilter } from '@/types/opportunity'

// Lazy-load the heavy map — only renders when visible
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

// ── Isolated: Filter Bar ──────────────────────────────────────────────────────
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

// ── Page: wires everything together ──────────────────────────────────────────
export default function MapPage() {
  const { mode } = useApp()
  const isStudy = mode === 'study'
  const { opportunities, filter, setFilter } = useMapData()
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleMarkerClick = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Feature: Filter — removable without affecting map */}
      <FilterBar filter={filter} onChange={setFilter} count={opportunities.length} isStudy={isStudy} />

      {/* Map area — min-h-[500px] guarantees map never collapses to zero */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: '500px' }}>
        {/* Core map — real interactive map with Leaflet */}
        <MapContainer
          opportunities={opportunities}
          activeId={activeId}
          isStudy={isStudy}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  )
}
