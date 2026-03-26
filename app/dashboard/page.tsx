'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { DEMO_USER, STUDY_EVENTS, FUN_EVENTS, OPPORTUNITIES, CHALLENGES } from '@/lib/data'
import Link from 'next/link'
import { ArrowRight, Trophy, BookOpen, Palette, Clock, X, MapPin, Users, Briefcase, ExternalLink } from 'lucide-react'

const PREVIEW_CITIES = [
  { id: 'tokyo', flag: '🇯🇵', name: 'Tokyo', color: '#F43F5E' },
  { id: 'paris', flag: '🇫🇷', name: 'Paris', color: '#8B5CF6' },
  { id: 'nyc', flag: '🇺🇸', name: 'New York', color: '#F97316' },
  { id: 'mumbai', flag: '🇮🇳', name: 'Mumbai', color: '#EAB308' },
  { id: 'london', flag: '🇬🇧', name: 'London', color: '#06B6D4' },
]

const TYPE_COLORS: Record<string, string> = { hiring: '#2563EB', hackathon: '#F97316', exam: '#8B5CF6' }
const TYPE_LABELS: Record<string, string> = { hiring: '💼', hackathon: '🏆', exam: '📝' }
const PIN_POS: Record<string, { top: string; left: string }> = {
  '1': { top: '55%', left: '62%' }, '2': { top: '60%', left: '64%' },
  '3': { top: '28%', left: '52%' }, '4': { top: '42%', left: '72%' },
  '5': { top: '50%', left: '58%' }, '6': { top: '26%', left: '51%' },
  '7': { top: '35%', left: '78%' }, '8': { top: '57%', left: '63%' },
}

export default function DashboardPage() {
  const { mode, user } = useApp()
  const isStudy = mode === 'study'
  const u = user || DEMO_USER
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [registered, setRegistered] = useState<string[]>([])
  const [selectedPin, setSelectedPin] = useState<string | null>(null)

  const trendingEvents = isStudy
    ? STUDY_EVENTS.filter(e => e.trending).slice(0, 3)
    : FUN_EVENTS.filter(e => e.trending).slice(0, 3)

  const selectedOpp = OPPORTUNITIES.find(o => o.id === selectedPin)

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">

      {/* Welcome banner + Mini Map */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 mb-5 sm:mb-8">
        {/* Banner 60% */}
        <div className={`lg:col-span-3 relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 overflow-hidden transition-all duration-500 ${
          isStudy ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-violet-600 to-purple-700'
        }`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white/5"
                style={{ width: `${80 + i * 60}px`, height: `${80 + i * 60}px`, top: `${-10 + i * 25}%`, right: `${-5 + i * 10}%` }} />
            ))}
          </div>
          <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${isStudy ? 'bg-blue-500/50 text-blue-100' : 'bg-purple-700/50 text-purple-200'}`}>
              {isStudy ? <BookOpen size={12} /> : <Palette size={12} />}
              {isStudy ? 'Study Mode Active' : 'Fun Mode Active'}
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white mb-1 sm:mb-2">
              Hey {u.name.split(' ')[0]}! {isStudy ? '📚' : '🎉'}
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-5">
              {isStudy ? `${u.joinedEvents.length} active events. Keep pushing! 🚀` : `${FUN_EVENTS.filter(e => e.trending).length} trending activities near you. ✨`}
            </p>
            <div className="flex items-center gap-3 sm:gap-5">
              {[
                { label: 'Points', value: u.points },
                { label: 'Badges', value: u.badges.length },
                { label: 'Done', value: u.completedChallenges.length },
              ].map(({ label, value }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8 bg-white/20" />}
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-white">{value}</div>
                    <div className="text-white/60 text-xs">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 40% panel */}
        {isStudy ? (
        <div className="hidden lg:block lg:col-span-2 relative rounded-3xl overflow-hidden border border-slate-200 bg-blue-50 min-h-[200px]">
            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm">
              <p className="text-xs font-bold text-slate-700">🗺️ Opportunity Map</p>
              <p className="text-[10px] text-slate-400">{OPPORTUNITIES.length} near you</p>
            </div>
            <Link href="/dashboard/map" className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-colors">
              Full Map →
            </Link>
            <svg className="absolute inset-0 w-full h-full opacity-20"><defs><pattern id="mgrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#93C5FD" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#mgrid)" /></svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 500" className="w-40 h-40" fill="#2563EB">
                <path d="M200,50 C220,45 260,60 280,80 C300,100 310,130 305,160 C300,190 290,210 300,240 C310,270 320,290 310,320 C300,350 280,370 260,380 C240,390 220,395 200,400 C180,395 160,390 140,380 C120,370 100,350 90,320 C80,290 90,270 100,240 C110,210 100,190 95,160 C90,130 100,100 120,80 C140,60 180,45 200,50Z" />
              </svg>
            </div>
            {OPPORTUNITIES.slice(0, 6).map(opp => {
              const pos = PIN_POS[opp.id]
              if (!pos) return null
              const color = TYPE_COLORS[opp.type]
              return (
                <button key={opp.id} onClick={() => setSelectedPin(selectedPin === opp.id ? null : opp.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: pos.top, left: pos.left }}>
                  <div className={`relative w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs transition-all hover:scale-125 ${selectedPin === opp.id ? 'scale-125' : ''}`}
                    style={{ backgroundColor: color }}>
                    <span>{TYPE_LABELS[opp.type]}</span>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
                  </div>
                </button>
              )
            })}
            {selectedOpp && (
              <div className="absolute bottom-3 left-3 right-3 bg-white rounded-2xl shadow-xl p-3 z-20 border border-slate-100">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{selectedOpp.title}</p>
                    <p className="text-[10px] text-blue-600">{selectedOpp.company} · {selectedOpp.location}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Deadline: {selectedOpp.deadline}</p>
                  </div>
                  <button onClick={() => setSelectedPin(null)} className="text-slate-400 hover:text-slate-600 shrink-0"><X size={12} /></button>
                </div>
                <Link href="/dashboard/map" className="mt-2 block text-center text-[10px] font-bold text-blue-600 hover:underline">View Details →</Link>
              </div>
            )}
        </div>
        ) : (
          <div className="hidden lg:block lg:col-span-2 relative rounded-3xl overflow-hidden border border-slate-200 min-h-[220px] cursor-pointer group bg-gradient-to-br from-violet-50 to-purple-50"
            onClick={() => window.location.href = '/dashboard/vibe'}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-violet-600 text-[10px] font-bold uppercase tracking-widest">Virtual Experience</span>
                </div>
                <span className="text-xs text-violet-500 bg-violet-50 border border-violet-200 px-2 py-1 rounded-full">5 activities</span>
              </div>
              <div>
                <div className="flex gap-2 mb-3">
                  {['🏺','🎨','🎸','🎹','📸'].map(e => (
                    <div key={e} className="w-9 h-9 rounded-xl bg-white border border-violet-100 shadow-sm flex items-center justify-center text-lg">
                      {e}
                    </div>
                  ))}
                </div>
                <h3 className="text-slate-900 font-black text-lg mb-1">✨ Vibe Mode</h3>
                <p className="text-slate-500 text-xs mb-3">Try pottery, resin art, guitar, piano & photography virtually</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">🏺 Pottery</span>
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-200">🎸 Guitar</span>
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">🎹 Piano</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Trending events */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isStudy ? '🔥 Trending Events' : '✨ Trending Activities'}
            </h2>
            <Link href={isStudy ? '/dashboard/events' : '/dashboard/hobby-events'}
              className="flex items-center gap-1 text-sm font-medium hover:underline text-blue-600">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {trendingEvents.map(event => (
              <div key={event.id} onClick={() => setSelectedEvent(event)}
                className="w-full flex gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer bg-white border-slate-100 hover:border-blue-200">
                <img src={event.image} alt={event.title} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm truncate text-slate-900">{event.title}</h3>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-600">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={11} />{isStudy ? (event as any).deadline : (event as any).date}
                    </span>
                    <span className="text-xs text-slate-400">📍 {event.location}</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {event.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 self-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600">
                  View →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar — Badges + Progress */}
        <div className="space-y-4 sm:space-y-5">
          {/* Challenge progress */}
          <div className="rounded-2xl p-5 border bg-white border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-slate-900">🎯 Your Progress</h3>
              <Link href="/dashboard/challenges" className="text-xs hover:underline text-blue-600">View all</Link>
            </div>
            <div className="space-y-3">
              {CHALLENGES.filter(c => c.category === (isStudy ? 'study' : 'fun')).slice(0, 3).map(c => (
                <div key={c.title}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">{c.icon} {c.title}</span>
                    <span className="text-xs text-slate-400">{c.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-slate-100">
                    <div className={`h-full rounded-full transition-all duration-1000 ${c.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-2xl p-5 border bg-white border-slate-100">
            <h3 className="font-bold text-sm mb-4 text-slate-900">🏅 Badges</h3>
            <div className="flex flex-wrap gap-2">
              {u.badges.map(badge => (
                <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100">
                  <Trophy size={11} /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}>
          <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up ${isStudy ? 'bg-white' : 'bg-slate-800'}`}
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}
                className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/50 rounded-xl text-white transition-colors">
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>{selectedEvent.category}</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className={`text-xl font-black mb-1 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{selectedEvent.title}</h2>
              <p className={`text-sm mb-4 leading-relaxed ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                {[
                  { icon: <Clock size={12} className="text-red-400" />, val: selectedEvent.deadline || selectedEvent.date },
                  { icon: <MapPin size={12} className="text-blue-400" />, val: selectedEvent.location },
                  { icon: <Users size={12} className="text-green-400" />, val: selectedEvent.participants ? `${selectedEvent.participants.toLocaleString()} joined` : `${selectedEvent.spotsLeft} spots left` },
                  { icon: <Briefcase size={12} className="text-amber-400" />, val: selectedEvent.prize || selectedEvent.price },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isStudy ? 'bg-slate-50 text-slate-600' : 'bg-slate-700/50 text-slate-300'}`}>
                    {item.icon}<span className="truncate">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-5">
                {selectedEvent.tags.map((tag: string) => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-md ${isStudy ? 'bg-blue-50 text-blue-600' : 'bg-purple-900/50 text-purple-300'}`}>{tag}</span>
                ))}
              </div>
              {!registerOpen ? (
                <button onClick={() => setRegisterOpen(true)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                    registered.includes(selectedEvent.id) ? 'bg-green-500 text-white' : isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  }`}>
                  {registered.includes(selectedEvent.id) ? '✓ Already Registered' : <><ExternalLink size={16} /> Register / Apply</>}
                </button>
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
  const [form, setForm] = useState({ name: '', email: '', college: '', year: '', why: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const inputCls = `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${isStudy ? 'border-slate-200 bg-slate-50 text-slate-800 focus:ring-blue-300' : 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500'}`
  const labelCls = `block text-xs font-semibold mb-1 ${isStudy ? 'text-slate-600' : 'text-slate-400'}`
  return (
    <div className="space-y-3">
      <p className={`text-xs font-bold mb-2 ${isStudy ? 'text-slate-700' : 'text-slate-300'}`}>📝 Registration Form — {event.title}</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={labelCls}>Full Name</label><input placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Email</label><input placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>College / Institute</label><input placeholder="College name" value={form.college} onChange={e => set('college', e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Year of Study</label>
          <select value={form.year} onChange={e => set('year', e.target.value)} className={inputCls}>
            <option value="">Select</option>
            {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'].map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>
      <div><label className={labelCls}>Why do you want to join?</label>
        <textarea placeholder="Tell us briefly..." value={form.why} onChange={e => set('why', e.target.value)} rows={2}
          className={`${inputCls} resize-none`} />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>Cancel</button>
        <button onClick={onSubmit} disabled={!form.name || !form.email || !form.college || !form.year}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
          Submit Registration ✓
        </button>
      </div>
    </div>
  )
}
