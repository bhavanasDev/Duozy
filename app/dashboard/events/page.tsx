'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { STUDY_EVENTS } from '@/lib/data'
import { Search, Clock, MapPin, Users, Trophy, Bookmark, TrendingUp, X, Briefcase, ExternalLink } from 'lucide-react'

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Seminar']
const TYPES = ['All', 'online', 'offline']
const SORTS = ['Trending', 'Newest', 'Deadline']

export default function EventsPage() {
  const { mode } = useApp()
  const isStudy = mode === 'study'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('Trending')
  const [saved, setSaved] = useState<string[]>([])
  const [registered, setRegistered] = useState<string[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registerOpen, setRegisterOpen] = useState(false)

  const filtered = STUDY_EVENTS
    .filter(e => category === 'All' || e.category === category)
    .filter(e => type === 'All' || e.type === type)
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === 'Trending' ? (b.trending ? 1 : 0) - (a.trending ? 1 : 0) : sort === 'Deadline' ? a.deadline.localeCompare(b.deadline) : 0)

  const toggleSave = (id: string, e: React.MouseEvent) => { e.stopPropagation(); setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]) }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className={`text-3xl font-black mb-1 ${isStudy ? 'text-slate-900' : 'text-white'}`}>🏆 Events & Competitions</h1>
        <p className={`text-sm ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>Discover hackathons, workshops, and seminars</p>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-4 mb-5 border ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, tags..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 ${isStudy ? 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-300' : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500'}`} />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === c ? (isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white') : (isStudy ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-700 text-slate-300 hover:bg-slate-600')}`}>
                {c}
              </button>
            ))}
            <div className={`w-px h-5 ${isStudy ? 'bg-slate-200' : 'bg-slate-600'}`} />
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${type === t ? (isStudy ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white') : (isStudy ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-700 text-slate-300 hover:bg-slate-600')}`}>
                {t}
              </button>
            ))}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isStudy ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-700 border-slate-600 text-slate-200'}`}>
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p className={`text-xs mb-4 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{filtered.length} events found</p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map(event => (
          <div key={event.id} onClick={() => { setSelectedEvent(event); setRegisterOpen(false) }}
            className={`rounded-xl overflow-hidden border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group text-left w-full cursor-pointer ${isStudy ? 'bg-white border-slate-100 hover:border-blue-200' : 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500/50'}`}>
            <div className="relative h-36 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {event.trending && (
                <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded">
                  <TrendingUp size={8} /> Hot
                </div>
              )}
              <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold ${event.type === 'online' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {event.type}
              </div>
              <button onClick={e => toggleSave(event.id, e)}
                className={`absolute bottom-2 right-2 p-1.5 rounded-lg backdrop-blur-sm transition-all ${saved.includes(event.id) ? 'bg-yellow-400 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                <Bookmark size={11} fill={saved.includes(event.id) ? 'currentColor' : 'none'} />
              </button>
              <div className="absolute bottom-2 left-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>{event.category}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className={`font-bold text-sm leading-tight line-clamp-2 mb-2 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{event.title}</h3>
              <div className="flex items-center gap-2 mb-1.5 text-[11px]">
                <span className={`flex items-center gap-1 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}><Clock size={10} className="text-red-400" />{event.deadline}</span>
                <span className={`flex items-center gap-1 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}><MapPin size={10} className="text-blue-400" /><span className="truncate max-w-[60px]">{event.location}</span></span>
              </div>
              <div className="flex gap-1 mb-2.5">
                {event.tags.slice(0, 2).map(tag => (
                  <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded ${isStudy ? 'bg-slate-100 text-slate-500' : 'bg-slate-700 text-slate-400'}`}>{tag}</span>
                ))}
              </div>
              <div className={`w-full py-2 rounded-lg text-xs font-bold text-center transition-all ${
                registered.includes(event.id) ? 'bg-green-500 text-white' : isStudy ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              }`}>
                {registered.includes(event.id) ? '✓ Registered' : 'View & Register →'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Detail + Register Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}>
          <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto ${isStudy ? 'bg-white' : 'bg-slate-800'}`}
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48 shrink-0">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}
                className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/50 rounded-xl text-white"><X size={16} /></button>
              <div className="absolute bottom-3 left-4 flex gap-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>{selectedEvent.category}</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${selectedEvent.type === 'online' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>{selectedEvent.type}</span>
              </div>
            </div>
            <div className="p-6">
              {!registerOpen ? (
                <>
                  <h2 className={`text-xl font-black mb-2 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{selectedEvent.title}</h2>
                  <p className={`text-sm mb-4 leading-relaxed ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{selectedEvent.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: <Clock size={12} className="text-red-400" />, label: 'Deadline', val: selectedEvent.deadline },
                      { icon: <MapPin size={12} className="text-blue-400" />, label: 'Location', val: selectedEvent.location },
                      { icon: <Users size={12} className="text-green-400" />, label: 'Participants', val: `${selectedEvent.participants?.toLocaleString()} joined` },
                      { icon: <Trophy size={12} className="text-amber-400" />, label: 'Prize', val: selectedEvent.prize },
                      { icon: <Briefcase size={12} className="text-purple-400" />, label: 'Organizer', val: (selectedEvent as any).organizer },
                      { icon: <Users size={12} className="text-pink-400" />, label: 'Team Size', val: (selectedEvent as any).teamSize },
                    ].map((item, i) => (
                      <div key={i} className={`px-3 py-2 rounded-xl text-xs ${isStudy ? 'bg-slate-50' : 'bg-slate-700/50'}`}>
                        <div className={`flex items-center gap-1 mb-0.5 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{item.icon}{item.label}</div>
                        <p className={`font-semibold truncate ${isStudy ? 'text-slate-700' : 'text-slate-200'}`}>{item.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-5">
                    {selectedEvent.tags.map((tag: string) => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-md ${isStudy ? 'bg-blue-50 text-blue-600' : 'bg-purple-900/50 text-purple-300'}`}>{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => registered.includes(selectedEvent.id) ? null : setRegisterOpen(true)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                      registered.includes(selectedEvent.id) ? 'bg-green-500 text-white cursor-default' : isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    }`}>
                    {registered.includes(selectedEvent.id) ? '✓ Already Registered' : <><ExternalLink size={16} /> Register Now</>}
                  </button>
                </>
              ) : (
                <RegisterForm event={selectedEvent} isStudy={isStudy}
                  onSubmit={() => { setRegistered(r => [...r, selectedEvent.id]); setRegisterOpen(false); setSelectedEvent(null) }}
                  onCancel={() => setRegisterOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RegisterForm({ event, isStudy, onSubmit, onCancel }: any) {
  const [form, setForm] = useState({ name: '', email: '', college: '', year: '', phone: '', why: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const inputCls = `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${isStudy ? 'border-slate-200 bg-slate-50 text-slate-800 focus:ring-blue-300' : 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500'}`
  const labelCls = `block text-xs font-semibold mb-1 ${isStudy ? 'text-slate-600' : 'text-slate-400'}`
  const isValid = form.name && form.email && form.college && form.year
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${isStudy ? 'bg-blue-100' : 'bg-purple-900/50'}`}>📝</div>
        <div>
          <p className={`text-sm font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>Registration Form</p>
          <p className={`text-xs ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{event.title}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Full Name *</label><input placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Email *</label><input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>College / Institute *</label><input placeholder="College name" value={form.college} onChange={e => set('college', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Year of Study *</label>
            <select value={form.year} onChange={e => set('year', e.target.value)} className={inputCls}>
              <option value="">Select year</option>
              {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post Graduate'].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Phone Number</label><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} /></div>
        </div>
        <div><label className={labelCls}>Why do you want to participate?</label>
          <textarea placeholder="Tell us briefly about your motivation..." value={form.why} onChange={e => set('why', e.target.value)} rows={2}
            className={`${inputCls} resize-none`} />
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onCancel} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>← Back</button>
          <button onClick={onSubmit} disabled={!isValid}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
            Submit ✓
          </button>
        </div>
      </div>
    </div>
  )
}
