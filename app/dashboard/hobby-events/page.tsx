'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { FUN_EVENTS } from '@/lib/data'
import { MapPin, Calendar, TrendingUp, Search, Heart, X, Clock, Star, Users } from 'lucide-react'

const CATEGORIES = ['All', 'Art & Craft', 'Music', 'Travel', 'Wellness', 'Photography']

export default function HobbyEventsPage() {
  const { mode, completeTask } = useApp()
  const isStudy = mode === 'study'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [liked, setLiked] = useState<string[]>([])
  const [registered, setRegistered] = useState<string[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registerOpen, setRegisterOpen] = useState(false)

  const filtered = FUN_EVENTS
    .filter(e => category === 'All' || e.category === category)
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(l => {
      if (l.includes(id)) return l.filter(x => x !== id)
      const newLiked = [...l, id]
      if (newLiked.length >= 5) completeTask('b7t3')
      return newLiked
    })
  }

  function handleRegister(eventId: string) {
    if (registered.includes(eventId)) return
    setRegistered(r => [...r, eventId])
    completeTask('b7t1')
    setRegisterOpen(false)
    setSelectedEvent(null)
  }

  const heading = isStudy ? 'text-slate-900' : 'text-white'
  const sub = isStudy ? 'text-slate-500' : 'text-slate-400'
  const sectionHead = isStudy ? 'text-slate-800' : 'text-white'
  const inputCls = isStudy
    ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-blue-300'
    : 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-purple-500'
  const catActive = isStudy
    ? 'bg-blue-600 text-white shadow-lg'
    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
  const catInactive = isStudy
    ? 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-purple-500'

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className={`text-3xl font-black mb-1 ${isStudy ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent'}`}>
          🎨 Hobby Events
        </h1>
        <p className={`text-sm ${sub}`}>Discover workshops, experiences, and adventures near you</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activities..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputCls}`} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${category === c ? catActive : catInactive}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      {filtered.some(e => e.trending) && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-orange-400" />
            <h2 className={`text-base font-bold ${sectionHead}`}>Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filtered.filter(e => e.trending).map(event => (
              <EventCard key={event.id} event={event} liked={liked} registered={registered} isStudy={isStudy}
                onLike={toggleLike} onClick={() => { setSelectedEvent(event); setRegisterOpen(false) }} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className={`text-base font-bold mb-4 ${sectionHead}`}>All Activities</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {filtered.map(event => (
            <EventCard key={event.id} event={event} liked={liked} registered={registered} isStudy={isStudy}
              onLike={toggleLike} onClick={() => { setSelectedEvent(event); setRegisterOpen(false) }} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}>
          <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto ${isStudy ? 'bg-white' : 'bg-slate-800'}`}
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48 shrink-0">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => { setSelectedEvent(null); setRegisterOpen(false) }}
                className="absolute top-3 right-3 p-2 bg-black/30 hover:bg-black/50 rounded-xl text-white"><X size={16} /></button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="text-3xl">{selectedEvent.emoji}</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isStudy ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>{selectedEvent.category}</span>
              </div>
            </div>
            <div className="p-6">
              {!registerOpen ? (
                <>
                  <h2 className={`text-xl font-black mb-2 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{selectedEvent.title}</h2>
                  <p className={`text-sm mb-4 leading-relaxed ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{selectedEvent.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: <Calendar size={12} className="text-purple-400" />, label: 'Date', val: selectedEvent.date },
                      { icon: <MapPin size={12} className="text-pink-400" />, label: 'Location', val: selectedEvent.location },
                      { icon: <Clock size={12} className="text-blue-400" />, label: 'Duration', val: selectedEvent.duration },
                      { icon: <Star size={12} className="text-amber-400" />, label: 'Level', val: selectedEvent.level },
                      { icon: <Users size={12} className="text-green-400" />, label: 'Spots Left', val: `${selectedEvent.spotsLeft} of ${selectedEvent.spots}` },
                      { icon: <span className="text-xs">💰</span>, label: 'Price', val: selectedEvent.price },
                    ].map((item, i) => (
                      <div key={i} className={`px-3 py-2 rounded-xl text-xs ${isStudy ? 'bg-slate-50' : 'bg-slate-700/50'}`}>
                        <div className={`flex items-center gap-1 mb-0.5 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{item.icon}{item.label}</div>
                        <p className={`font-semibold ${isStudy ? 'text-slate-700' : 'text-slate-200'}`}>{item.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <div className={`flex justify-between text-xs mb-1 ${isStudy ? 'text-slate-400' : 'text-slate-400'}`}>
                      <span>Spots filling up</span><span>{selectedEvent.spots - selectedEvent.spotsLeft}/{selectedEvent.spots}</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isStudy ? 'bg-slate-100' : 'bg-slate-700'}`}>
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${((selectedEvent.spots - selectedEvent.spotsLeft) / selectedEvent.spots) * 100}%` }} />
                    </div>
                  </div>
                  <button onClick={() => !registered.includes(selectedEvent.id) && setRegisterOpen(true)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${registered.includes(selectedEvent.id) ? 'bg-green-500 text-white cursor-default' : isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'}`}>
                    {registered.includes(selectedEvent.id) ? '✓ Registered!' : 'Register Now →'}
                  </button>
                </>
              ) : (
                <HobbyRegisterForm event={selectedEvent} isStudy={isStudy}
                  onSubmit={() => handleRegister(selectedEvent.id)}
                  onCancel={() => setRegisterOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EventCard({ event, liked, registered, isStudy, onLike, onClick }: any) {
  const spotsPercent = ((event.spots - event.spotsLeft) / event.spots) * 100
  return (
    <div onClick={onClick}
      className={`rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group text-left w-full cursor-pointer ${
        isStudy
          ? 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-blue-100'
          : 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500/50 hover:shadow-purple-900/20'
      }`}>
      <div className="relative h-28 md:h-40 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {event.trending && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-md">
            <TrendingUp size={9} /> Hot
          </div>
        )}
        <button onClick={e => onLike(event.id, e)}
          className={`absolute top-2 right-2 p-1.5 rounded-xl backdrop-blur-sm transition-all ${liked.includes(event.id) ? 'bg-pink-500 text-white' : 'bg-black/30 text-white hover:bg-pink-500/50'}`}>
          <Heart size={12} fill={liked.includes(event.id) ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <span className="text-2xl">{event.emoji}</span>
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${event.price === 'Free' ? 'bg-green-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>{event.price}</span>
        </div>
      </div>
      <div className="p-2.5 md:p-4">
        <h3 className={`font-black text-sm mb-0.5 line-clamp-1 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{event.title}</h3>
        <span className={`text-xs font-medium ${isStudy ? 'text-blue-600' : 'text-purple-400'}`}>{event.category}</span>
        <div className={`flex gap-2 my-2 text-[11px] ${isStudy ? 'text-slate-400' : 'text-slate-400'}`}>
          <span className="flex items-center gap-1"><Calendar size={10} />{event.date}</span>
          <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
        </div>
        <div className="mb-3">
          <div className={`h-1.5 rounded-full overflow-hidden ${isStudy ? 'bg-slate-100' : 'bg-slate-700'}`}>
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${spotsPercent}%` }} />
          </div>
          <p className={`text-[10px] mt-0.5 ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{event.spotsLeft} spots left</p>
        </div>
        <div className={`w-full py-2 rounded-xl text-xs font-bold text-center ${registered.includes(event.id) ? 'bg-green-500 text-white' : isStudy ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
          {registered.includes(event.id) ? '✓ Registered' : 'View & Register →'}
        </div>
      </div>
    </div>
  )
}

function HobbyRegisterForm({ event, isStudy, onSubmit, onCancel }: any) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', dietary: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const inputCls = `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${isStudy ? 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:ring-blue-300' : 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500'}`
  const labelCls = `block text-xs font-semibold mb-1 ${isStudy ? 'text-slate-600' : 'text-slate-400'}`
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{event.emoji}</span>
        <div>
          <p className={`text-sm font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>Registration Form</p>
          <p className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{event.title}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Full Name *</label><input placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Email *</label><input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Phone</label><input placeholder="+91 XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Experience Level</label>
            <select value={form.experience} onChange={e => set('experience', e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {['Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div><label className={labelCls}>Any special requirements?</label>
          <input placeholder="Dietary needs, accessibility, etc." value={form.dietary} onChange={e => set('dietary', e.target.value)} className={inputCls} />
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onCancel} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>← Back</button>
          <button onClick={onSubmit} disabled={!form.name || !form.email}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
            Confirm Booking ✓
          </button>
        </div>
      </div>
    </div>
  )
}
