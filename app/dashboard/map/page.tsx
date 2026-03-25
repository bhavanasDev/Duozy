'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { OPPORTUNITIES } from '@/lib/data'
import { X, MapPin, Clock, Briefcase, ExternalLink, Filter } from 'lucide-react'

const TYPE_COLORS = { hiring: '#2563EB', hackathon: '#F97316', exam: '#8B5CF6' }
const TYPE_LABELS = { hiring: '💼 Job', hackathon: '🏆 Hackathon', exam: '📝 Exam' }
const TYPE_BG = { hiring: 'bg-blue-100 text-blue-700', hackathon: 'bg-orange-100 text-orange-700', exam: 'bg-purple-100 text-purple-700' }

export default function MapPage() {
  const { mode } = useApp()
  const isStudy = mode === 'study'
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'hiring' | 'hackathon' | 'exam'>('all')
  const [applied, setApplied] = useState<string[]>([])

  const filtered = OPPORTUNITIES.filter(o => filter === 'all' || o.type === filter)
  const selectedOpp = OPPORTUNITIES.find(o => o.id === selected)

  // Map grid positions (simulated map layout)
  const positions: Record<string, { top: string; left: string }> = {
    '1': { top: '55%', left: '62%' },
    '2': { top: '60%', left: '64%' },
    '3': { top: '28%', left: '52%' },
    '4': { top: '42%', left: '72%' },
    '5': { top: '50%', left: '58%' },
    '6': { top: '26%', left: '51%' },
    '7': { top: '35%', left: '78%' },
    '8': { top: '57%', left: '63%' },
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'}`}>
        <div>
          <h1 className={`text-xl font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>🗺️ Opportunity Map</h1>
          <p className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{filtered.length} opportunities across India</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className={isStudy ? 'text-slate-400' : 'text-slate-500'} />
          {(['all', 'hiring', 'hackathon', 'exam'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? (isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white') : (isStudy ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}`}>
              {f === 'all' ? 'All' : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map background */}
        <div className={`absolute inset-0 ${isStudy ? 'bg-blue-50' : 'bg-slate-900'}`}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isStudy ? '#93C5FD' : '#334155'} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* India map outline (simplified SVG) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 400 500" className="w-96 h-96" fill={isStudy ? '#2563EB' : '#8B5CF6'}>
              <path d="M200,50 C220,45 260,60 280,80 C300,100 310,130 305,160 C300,190 290,210 300,240 C310,270 320,290 310,320 C300,350 280,370 260,380 C240,390 220,395 200,400 C180,395 160,390 140,380 C120,370 100,350 90,320 C80,290 90,270 100,240 C110,210 100,190 95,160 C90,130 100,100 120,80 C140,60 180,45 200,50Z" />
            </svg>
          </div>

          {/* City labels */}
          {[
            { name: 'Delhi', top: '27%', left: '50%' },
            { name: 'Mumbai', top: '43%', left: '70%' },
            { name: 'Bangalore', top: '58%', left: '61%' },
            { name: 'Kolkata', top: '34%', left: '77%' },
            { name: 'Pune', top: '50%', left: '57%' },
          ].map(city => (
            <div key={city.name} className="absolute text-xs font-medium opacity-40 pointer-events-none"
              style={{ top: city.top, left: city.left, transform: 'translate(-50%,-50%)', color: isStudy ? '#1E40AF' : '#A78BFA' }}>
              {city.name}
            </div>
          ))}

          {/* Pins */}
          {filtered.map(opp => {
            const pos = positions[opp.id]
            if (!pos) return null
            const color = TYPE_COLORS[opp.type as keyof typeof TYPE_COLORS]
            const isActive = selected === opp.id
            return (
              <button key={opp.id} onClick={() => setSelected(selected === opp.id ? null : opp.id)}
                className="absolute transform -translate-x-1/2 -translate-y-full group"
                style={{ top: pos.top, left: pos.left }}>
                <div className={`relative transition-all duration-200 ${isActive ? 'scale-125' : 'hover:scale-110'}`}>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: color, transform: 'scale(1.8)' }} />
                  {/* Pin */}
                  <div className="relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: color, borderWidth: '3px' }}>
                    {opp.type === 'hiring' ? '💼' : opp.type === 'hackathon' ? '🏆' : '📝'}
                  </div>
                  {/* Label */}
                  <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm ${isStudy ? 'bg-white text-slate-700' : 'bg-slate-800 text-slate-200'}`}>
                    {opp.company}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className={`absolute bottom-4 left-4 rounded-xl p-3 shadow-lg border ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800 border-slate-700'}`}>
          <p className={`text-xs font-bold mb-2 ${isStudy ? 'text-slate-700' : 'text-slate-300'}`}>Legend</p>
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }} />
              <span className={`text-xs ${isStudy ? 'text-slate-600' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Popup card */}
        {selectedOpp && (
          <div className={`absolute top-4 right-4 w-80 rounded-2xl shadow-2xl border overflow-hidden z-20 animate-slide-up ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800 border-slate-700'}`}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${TYPE_BG[selectedOpp.type as keyof typeof TYPE_BG]}`}>
                    {TYPE_LABELS[selectedOpp.type as keyof typeof TYPE_LABELS]}
                  </span>
                  <h3 className={`font-black text-base mt-2 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{selectedOpp.title}</h3>
                  <p className={`text-sm font-medium ${isStudy ? 'text-blue-600' : 'text-purple-400'}`}>{selectedOpp.company}</p>
                </div>
                <button onClick={() => setSelected(null)} className={`p-1.5 rounded-lg ${isStudy ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-slate-700 text-slate-400'}`}>
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className={`flex items-center gap-2 text-sm ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                  <MapPin size={14} className="text-blue-400" />{selectedOpp.location}
                </div>
                <div className={`flex items-center gap-2 text-sm ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                  <Clock size={14} className="text-red-400" />Deadline: {selectedOpp.deadline}
                </div>
                <div className={`flex items-center gap-2 text-sm ${isStudy ? 'text-slate-600' : 'text-slate-300'}`}>
                  <Briefcase size={14} className="text-green-400" />{selectedOpp.stipend}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {selectedOpp.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-md ${isStudy ? 'bg-blue-50 text-blue-600' : 'bg-purple-900/50 text-purple-300'}`}>{tag}</span>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setApplied(a => a.includes(selectedOpp.id) ? a : [...a, selectedOpp.id])}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1 ${
                    applied.includes(selectedOpp.id) ? 'bg-green-500 text-white' : isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  }`}>
                  {applied.includes(selectedOpp.id) ? '✓ Applied' : <><ExternalLink size={14} /> Apply Now</>}
                </button>
                <button className={`px-3 py-2.5 rounded-xl border text-sm transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>
                  Save
                </button>
              </div>

              {selectedOpp.type === 'hiring' && (
                <div className="mt-3 px-3 py-2 bg-orange-50 rounded-xl">
                  <p className="text-xs text-orange-600 font-medium">🔥 Trending near you</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
