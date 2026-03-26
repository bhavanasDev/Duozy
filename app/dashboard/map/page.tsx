'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { OPPORTUNITIES } from '@/lib/data'
import { X, MapPin, Clock, Briefcase, ExternalLink, Filter } from 'lucide-react'

const TYPE_COLORS = { hiring: '#2563EB', hackathon: '#F97316', exam: '#8B5CF6' }
const TYPE_LABELS = { hiring: '💼 Job', hackathon: '🏆 Hackathon', exam: '📝 Exam' }
const TYPE_BG = { hiring: 'bg-blue-100 text-blue-700', hackathon: 'bg-orange-100 text-orange-700', exam: 'bg-purple-100 text-purple-700' }

const PIN_POSITIONS: Record<string, { x: number; y: number; area: string }> = {
  '1': { x: 195, y: 215, area: 'HITEC City' },
  '2': { x: 160, y: 275, area: 'Gachibowli' },
  '3': { x: 245, y: 140, area: 'Kukatpally' },
  '4': { x: 445, y: 170, area: 'Secunderabad' },
  '5': { x: 220, y: 195, area: 'Madhapur' },
  '6': { x: 330, y: 230, area: 'Banjara Hills' },
  '7': { x: 410, y: 330, area: 'Charminar' },
  '8': { x: 170, y: 315, area: 'Nanakramguda' },
}

export default function MapPage() {
  const { mode } = useApp()
  const isStudy = mode === 'study'
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'hiring' | 'hackathon' | 'exam'>('all')
  const [applied, setApplied] = useState<string[]>([])

  const filtered = OPPORTUNITIES.filter(o => filter === 'all' || o.type === filter)
  const selectedOpp = OPPORTUNITIES.find(o => o.id === selected)

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between gap-4 flex-wrap ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'}`}>
        <div>
          <h1 className={`text-xl font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>🗺️ Opportunity Map — Hyderabad</h1>
          <p className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{filtered.length} opportunities · Click a pin to explore</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className={isStudy ? 'text-slate-400' : 'text-slate-500'} />
          {(['all', 'hiring', 'hackathon', 'exam'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? (isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white') : (isStudy ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}`}>
              {f === 'all' ? 'All' : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden">
        <div className={`absolute inset-0 ${isStudy ? 'bg-[#E8F4FD]' : 'bg-[#0D1B2A]'}`}>
          <svg className="w-full h-full" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Water gradient */}
              <radialGradient id="lakeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isStudy ? '#7DD3FC' : '#0C4A6E'} />
                <stop offset="100%" stopColor={isStudy ? '#38BDF8' : '#075985'} />
              </radialGradient>
              {/* Park gradient */}
              <radialGradient id="parkGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isStudy ? '#86EFAC' : '#14532D'} />
                <stop offset="100%" stopColor={isStudy ? '#4ADE80' : '#166534'} />
              </radialGradient>
              {/* Shadow filter */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
              </filter>
              <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
              </filter>
            </defs>

            {/* ── BACKGROUND ZONES ── */}
            {/* Western IT corridor */}
            <ellipse cx="185" cy="240" rx="90" ry="110"
              fill={isStudy ? '#DBEAFE' : '#1E3A5F'} opacity="0.5" />
            {/* Old city zone */}
            <ellipse cx="420" cy="310" rx="80" ry="70"
              fill={isStudy ? '#FEF3C7' : '#451A03'} opacity="0.4" />
            {/* North zone */}
            <ellipse cx="340" cy="155" rx="120" ry="55"
              fill={isStudy ? '#F0FDF4' : '#052E16'} opacity="0.4" />

            {/* ── OUTER RING ROAD ── */}
            <ellipse cx="340" cy="255" rx="270" ry="210"
              fill="none"
              stroke={isStudy ? '#94A3B8' : '#334155'}
              strokeWidth="4"
              strokeDasharray="12 6"
              opacity="0.6" />
            <text x="610" y="258" fontSize="9" fill={isStudy ? '#64748B' : '#64748B'} fontWeight="600">ORR</text>

            {/* ── MAJOR ROADS ── */}
            {/* NH-65 (Mumbai Highway) */}
            <path d="M 80 290 Q 200 270 340 255 Q 480 240 620 220"
              fill="none" stroke={isStudy ? '#CBD5E1' : '#1E3A5F'} strokeWidth="5" />
            {/* NH-44 (North-South) */}
            <path d="M 340 80 Q 345 170 350 255 Q 355 340 360 430"
              fill="none" stroke={isStudy ? '#CBD5E1' : '#1E3A5F'} strokeWidth="5" />
            {/* Inner Ring Road */}
            <ellipse cx="340" cy="255" rx="160" ry="120"
              fill="none" stroke={isStudy ? '#BAC8D3' : '#1E3A5F'} strokeWidth="3" opacity="0.5" />

            {/* ── SECONDARY ROADS ── */}
            {[
              'M 195 215 Q 240 235 330 230',
              'M 160 275 Q 200 290 250 295',
              'M 330 230 Q 370 245 410 260',
              'M 410 260 Q 415 295 410 330',
              'M 245 140 Q 290 165 330 230',
              'M 445 170 Q 420 200 410 260',
              'M 195 215 Q 180 245 160 275',
              'M 160 275 Q 165 295 170 315',
              'M 330 230 Q 350 280 360 330',
            ].map((d, i) => (
              <path key={i} d={d} fill="none"
                stroke={isStudy ? '#CBD5E1' : '#1E3A5F'} strokeWidth="2.5" opacity="0.7" />
            ))}

            {/* ── HUSSAIN SAGAR LAKE ── */}
            <ellipse cx="395" cy="210" rx="42" ry="32"
              fill="url(#lakeGrad)" stroke={isStudy ? '#7DD3FC' : '#0369A1'} strokeWidth="2" />
            <text x="395" y="206" textAnchor="middle" fontSize="7.5"
              fill={isStudy ? '#0369A1' : '#BAE6FD'} fontWeight="700">Hussain</text>
            <text x="395" y="217" textAnchor="middle" fontSize="7.5"
              fill={isStudy ? '#0369A1' : '#BAE6FD'} fontWeight="700">Sagar</text>
            {/* Boat Club island */}
            <circle cx="395" cy="210" r="5" fill={isStudy ? '#FEF9C3' : '#713F12'} />

            {/* ── PARKS ── */}
            <ellipse cx="270" cy="200" rx="18" ry="12" fill="url(#parkGrad)" opacity="0.7" />
            <text x="270" y="204" textAnchor="middle" fontSize="6" fill={isStudy ? '#166534' : '#86EFAC'}>KBR Park</text>
            <ellipse cx="460" cy="290" rx="14" ry="10" fill="url(#parkGrad)" opacity="0.7" />

            {/* ── AREA BLOCKS ── */}
            {[
              { x: 195, y: 215, label: 'HITEC City', major: true, color: isStudy ? '#BFDBFE' : '#1E3A5F' },
              { x: 160, y: 275, label: 'Gachibowli', major: true, color: isStudy ? '#BFDBFE' : '#1E3A5F' },
              { x: 220, y: 195, label: 'Madhapur', major: false, color: isStudy ? '#DBEAFE' : '#172554' },
              { x: 175, y: 165, label: 'Kondapur', major: false, color: isStudy ? '#DBEAFE' : '#172554' },
              { x: 245, y: 140, label: 'Kukatpally', major: true, color: isStudy ? '#DCFCE7' : '#052E16' },
              { x: 330, y: 230, label: 'Banjara Hills', major: true, color: isStudy ? '#FEF3C7' : '#451A03' },
              { x: 285, y: 210, label: 'Jubilee Hills', major: false, color: isStudy ? '#FEF9C3' : '#3B1A00' },
              { x: 445, y: 170, label: 'Secunderabad', major: true, color: isStudy ? '#FCE7F3' : '#4A044E' },
              { x: 380, y: 195, label: 'Begumpet', major: false, color: isStudy ? '#FDF4FF' : '#3B0764' },
              { x: 350, y: 235, label: 'Ameerpet', major: false, color: isStudy ? '#F5F3FF' : '#2E1065' },
              { x: 410, y: 330, label: 'Charminar', major: true, color: isStudy ? '#FFF7ED' : '#431407' },
              { x: 390, y: 275, label: 'Abids', major: false, color: isStudy ? '#FFFBEB' : '#3B1A00' },
              { x: 465, y: 310, label: 'Dilsukhnagar', major: true, color: isStudy ? '#FEF2F2' : '#450A0A' },
              { x: 510, y: 270, label: 'Uppal', major: false, color: isStudy ? '#FFF1F2' : '#4C0519' },
              { x: 170, y: 315, label: 'Nanakramguda', major: false, color: isStudy ? '#ECFDF5' : '#022C22' },
              { x: 210, y: 310, label: 'Manikonda', major: false, color: isStudy ? '#F0FDF4' : '#052E16' },
              { x: 140, y: 150, label: 'Miyapur', major: false, color: isStudy ? '#EFF6FF' : '#172554' },
            ].map(area => (
              <g key={area.label}>
                <rect
                  x={area.x - (area.major ? 28 : 20)}
                  y={area.y - (area.major ? 14 : 10)}
                  width={area.major ? 56 : 40}
                  height={area.major ? 28 : 20}
                  rx="6"
                  fill={area.color}
                  stroke={isStudy ? '#CBD5E1' : '#334155'}
                  strokeWidth="1"
                  opacity="0.9"
                />
                <text x={area.x} y={area.y + 4}
                  textAnchor="middle"
                  fontSize={area.major ? '8' : '6.5'}
                  fill={isStudy ? '#1E293B' : '#E2E8F0'}
                  fontWeight={area.major ? '700' : '500'}>
                  {area.label}
                </text>
              </g>
            ))}

            {/* ── LANDMARKS ── */}
            {/* Charminar icon */}
            <text x="410" y="348" textAnchor="middle" fontSize="14">🕌</text>
            {/* Tank Bund */}
            <rect x="370" y="205" width="50" height="6" rx="3"
              fill={isStudy ? '#94A3B8' : '#475569'} opacity="0.8" />
            <text x="395" y="222" textAnchor="middle" fontSize="6.5"
              fill={isStudy ? '#64748B' : '#94A3B8'}>Tank Bund</text>

            {/* ── METRO LINE ── */}
            <path d="M 140 150 L 195 215 L 330 230 L 445 170"
              fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 3" opacity="0.8" />
            <text x="290" y="248" fontSize="7" fill="#EF4444" fontWeight="700">🚇 Metro</text>

            {/* ── COMPASS ── */}
            <g transform="translate(740, 55)">
              <circle cx="0" cy="0" r="22"
                fill={isStudy ? 'white' : '#1E293B'}
                stroke={isStudy ? '#E2E8F0' : '#334155'}
                strokeWidth="1.5"
                filter="url(#shadow)" />
              <polygon points="0,-14 4,0 0,4 -4,0" fill={isStudy ? '#2563EB' : '#60A5FA'} />
              <polygon points="0,14 4,0 0,-4 -4,0" fill={isStudy ? '#94A3B8' : '#475569'} />
              <text x="0" y="-16" textAnchor="middle" fontSize="9"
                fill={isStudy ? '#1E40AF' : '#93C5FD'} fontWeight="800">N</text>
            </g>

            {/* ── SCALE ── */}
            <g transform="translate(30, 555)">
              <rect x="-5" y="-12" width="90" height="18" rx="4"
                fill={isStudy ? 'white' : '#1E293B'} opacity="0.8" />
              <line x1="0" y1="0" x2="70" y2="0" stroke={isStudy ? '#64748B' : '#94A3B8'} strokeWidth="2" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke={isStudy ? '#64748B' : '#94A3B8'} strokeWidth="2" />
              <line x1="35" y1="-3" x2="35" y2="3" stroke={isStudy ? '#64748B' : '#94A3B8'} strokeWidth="1.5" />
              <line x1="70" y1="-4" x2="70" y2="4" stroke={isStudy ? '#64748B' : '#94A3B8'} strokeWidth="2" />
              <text x="35" y="-8" textAnchor="middle" fontSize="8"
                fill={isStudy ? '#475569' : '#94A3B8'} fontWeight="600">5 km</text>
            </g>

            {/* ── OPPORTUNITY PINS ── */}
            {filtered.map(opp => {
              const pos = PIN_POSITIONS[opp.id]
              if (!pos) return null
              const color = TYPE_COLORS[opp.type as keyof typeof TYPE_COLORS]
              const isActive = selected === opp.id
              return (
                <g key={opp.id} style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(selected === opp.id ? null : opp.id)}>
                  {/* Pulse */}
                  <circle cx={pos.x} cy={pos.y} r="20" fill={color} opacity="0.15">
                    <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Pin drop shape */}
                  <path
                    d={`M ${pos.x} ${pos.y - 22} 
                        C ${pos.x - 12} ${pos.y - 22} ${pos.x - 12} ${pos.y - 8} ${pos.x} ${pos.y + 2}
                        C ${pos.x + 12} ${pos.y - 8} ${pos.x + 12} ${pos.y - 22} ${pos.x} ${pos.y - 22} Z`}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    filter="url(#pinShadow)"
                    style={{ transform: isActive ? 'scale(1.2)' : 'scale(1)', transformOrigin: `${pos.x}px ${pos.y}px`, transition: 'transform 0.2s' }}
                  />
                  {/* Icon inside pin */}
                  <text x={pos.x} y={pos.y - 11} textAnchor="middle" dominantBaseline="central" fontSize="11">
                    {opp.type === 'hiring' ? '💼' : opp.type === 'hackathon' ? '🏆' : '📝'}
                  </text>
                  {/* Company label bubble */}
                  <rect x={pos.x - 30} y={pos.y + 6} width="60" height="16" rx="8"
                    fill={isStudy ? 'white' : '#1E293B'}
                    stroke={color} strokeWidth="1.5"
                    filter="url(#shadow)" />
                  <text x={pos.x} y={pos.y + 17} textAnchor="middle" fontSize="7.5"
                    fill={isStudy ? '#1E293B' : '#E2E8F0'} fontWeight="700">
                    {opp.company}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className={`absolute bottom-4 left-4 rounded-2xl p-4 shadow-xl border z-10 ${isStudy ? 'bg-white/95 border-slate-200' : 'bg-slate-800/95 border-slate-700'}`}>
          <p className={`text-xs font-black mb-3 ${isStudy ? 'text-slate-700' : 'text-slate-200'}`}>📍 Legend</p>
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }} />
              <span className={`text-xs font-medium ${isStudy ? 'text-slate-600' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
          <div className={`mt-2 pt-2 border-t ${isStudy ? 'border-slate-100' : 'border-slate-700'} space-y-1`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-red-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #EF4444 0, #EF4444 4px, transparent 4px, transparent 8px)' }} />
              <span className={`text-[10px] ${isStudy ? 'text-slate-500' : 'text-slate-500'}`}>Metro Line</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-slate-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #94A3B8 0, #94A3B8 6px, transparent 6px, transparent 12px)' }} />
              <span className={`text-[10px] ${isStudy ? 'text-slate-500' : 'text-slate-500'}`}>Outer Ring Road</span>
            </div>
          </div>
        </div>

        {/* Popup */}
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
              <div className={`flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg w-fit ${isStudy ? 'bg-blue-50' : 'bg-blue-900/30'}`}>
                <MapPin size={12} className="text-blue-400" />
                <span className={`text-xs font-semibold ${isStudy ? 'text-blue-700' : 'text-blue-300'}`}>
                  {PIN_POSITIONS[selectedOpp.id]?.area}, Hyderabad
                </span>
              </div>
              <div className="space-y-2 mb-4">
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
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1 ${applied.includes(selectedOpp.id) ? 'bg-green-500 text-white' : isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
                  {applied.includes(selectedOpp.id) ? '✓ Applied' : <><ExternalLink size={14} /> Apply Now</>}
                </button>
                <button className={`px-3 py-2.5 rounded-xl border text-sm transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>Save</button>
              </div>
              {selectedOpp.type === 'hiring' && (
                <div className="mt-3 px-3 py-2 bg-orange-50 rounded-xl">
                  <p className="text-xs text-orange-600 font-medium">🔥 Trending in Hyderabad</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
