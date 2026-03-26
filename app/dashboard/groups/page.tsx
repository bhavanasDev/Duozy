'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { SOCIAL_GROUPS } from '@/lib/data'
import { Users, Check, Clock, Search, Plus, X } from 'lucide-react'

const GROUP_CATEGORIES = ['Tech', 'Travel', 'Art', 'Music', 'Reading', 'Fitness', 'Gaming', 'Food', 'Photography', 'Other']

export default function GroupsPage() {
  const { mode, completeTask } = useApp()
  const isStudy = mode === 'study'
  const [groups, setGroups] = useState(SOCIAL_GROUPS)
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [createForm, setCreateForm] = useState({ name: '', description: '', category: '', emoji: '🌟', isPrivate: false })

  const s = {
    bg: isStudy ? 'bg-slate-50' : 'bg-[#0A0618]',
    heading: isStudy ? 'text-slate-900' : 'text-white',
    sub: isStudy ? 'text-slate-500' : 'text-slate-400',
    sectionLabel: isStudy ? 'text-slate-500' : 'text-slate-400',
    input: isStudy ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-blue-300' : 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-purple-500',
    card: isStudy ? 'bg-white border-slate-100 hover:border-blue-200' : 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500/50',
    cardJoined: isStudy ? 'bg-blue-50 border-blue-200' : 'bg-purple-900/30 border-purple-700/50',
    btn: isStudy ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    modal: isStudy ? 'bg-white' : 'bg-slate-800',
    label: isStudy ? 'text-slate-600' : 'text-slate-400',
    modalInput: isStudy ? 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:ring-blue-300' : 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500',
  }

  function handleJoin(id: string) {
    setGroups(gs => {
      const updated = gs.map(g => g.id === id ? { ...g, pending: true } : g)
      const joinedCount = updated.filter(g => g.joined || g.pending).length
      completeTask('b5t1')
      if (joinedCount >= 2) completeTask('b5t2')
      return updated
    })
  }

  function handleLeave(id: string) {
    setGroups(gs => gs.map(g => g.id === id ? { ...g, joined: false, pending: false } : g))
  }

  function handleCreateGroup() {
    if (!createForm.name.trim() || !createForm.category) return
    const newGroup = {
      id: String(Date.now()),
      name: createForm.name.trim(),
      category: createForm.category,
      members: 1,
      active: true,
      emoji: createForm.emoji,
      description: createForm.description.trim() || 'A new community group',
      joined: true,
      pending: false,
    }
    setGroups(gs => [newGroup, ...gs])
    completeTask('b5t1')
    completeTask('b5t2')
    setShowCreate(false)
    setCreateForm({ name: '', description: '', category: '', emoji: '🌟', isPrivate: false })
  }

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  )

  const EMOJIS = ['🌟', '🎯', '🚀', '💡', '🎨', '🎵', '📚', '🏋️', '✈️', '🍕', '📸', '🎮', '💻', '🌿', '🔥']

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-black mb-2 ${isStudy ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'}`}>
            🤝 Social Groups
          </h1>
          <p className={s.sub}>Join interest-based communities and connect with like-minded people</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 hover:shadow-lg ${s.btn}`}>
          <Plus size={16} /> Create Group
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups..."
          className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.input}`} />
      </div>

      {/* Joined groups */}
      {filtered.some(g => g.joined) && (
        <div className="mb-8">
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${s.sectionLabel}`}>Your Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {filtered.filter(g => g.joined).map(group => (
              <GroupCard key={group.id} group={group} isStudy={isStudy} onJoin={handleJoin} onLeave={handleLeave} />
            ))}
          </div>
        </div>
      )}

      {/* Discover */}
      <div>
        <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${s.sectionLabel}`}>Discover Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {filtered.filter(g => !g.joined).map(group => (
            <GroupCard key={group.id} group={group} isStudy={isStudy} onJoin={handleJoin} onLeave={handleLeave} />
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreate(false)}>
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl ${s.modal}`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${s.heading}`}>✨ Create a Group</h2>
              <button onClick={() => setShowCreate(false)}
                className={`p-2 rounded-xl ${isStudy ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-slate-700 text-slate-400'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Emoji picker */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${s.label}`}>Group Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map(e => (
                    <button key={e} type="button" onClick={() => setCreateForm(f => ({ ...f, emoji: e }))}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                        createForm.emoji === e
                          ? isStudy ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-purple-900/50 ring-2 ring-purple-500'
                          : isStudy ? 'bg-slate-100 hover:bg-slate-200' : 'bg-slate-700 hover:bg-slate-600'
                      }`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${s.label}`}>Group Name *</label>
                <input placeholder="e.g. Indie Hackers Hyderabad" value={createForm.name}
                  onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${s.modalInput}`} />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${s.label}`}>Category *</label>
                <div className="flex flex-wrap gap-2">
                  {GROUP_CATEGORIES.map(cat => (
                    <button key={cat} type="button" onClick={() => setCreateForm(f => ({ ...f, category: cat }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        createForm.category === cat
                          ? isStudy ? 'bg-blue-600 text-white border-blue-600' : 'bg-purple-600 text-white border-purple-600'
                          : isStudy ? 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300' : 'bg-slate-700 text-slate-300 border-slate-600 hover:border-purple-500'
                      }`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${s.label}`}>Description</label>
                <textarea placeholder="What's this group about?" value={createForm.description}
                  onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} rows={2}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none ${s.modalInput}`} />
              </div>

              <button onClick={handleCreateGroup}
                disabled={!createForm.name.trim() || !createForm.category}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed ${s.btn}`}>
                {createForm.emoji} Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GroupCard({ group, isStudy, onJoin, onLeave }: any) {
  return (
    <div className={`rounded-2xl border p-3 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
      group.joined
        ? isStudy ? 'bg-blue-50 border-blue-200' : 'bg-purple-900/30 border-purple-700/50'
        : isStudy ? 'bg-white border-slate-100 hover:border-blue-200' : 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500/50'
    }`}>
      <div className="flex items-start gap-2 sm:gap-4">
        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-lg ${
          isStudy ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-gradient-to-br from-purple-600 to-pink-600'
        }`}>
          {group.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`font-black text-base ${isStudy ? 'text-slate-900' : 'text-white'}`}>{group.name}</h3>
              <span className={`text-xs font-medium ${isStudy ? 'text-blue-600' : 'text-purple-400'}`}>{group.category}</span>
            </div>
            {group.active && (
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg shrink-0 ${isStudy ? 'bg-green-50 border border-green-200' : 'bg-green-900/30 border border-green-700/30'}`}>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className={`text-xs font-medium ${isStudy ? 'text-green-700' : 'text-green-400'}`}>Active</span>
              </div>
            )}
          </div>
          <p className={`text-sm mt-1 mb-3 ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{group.description}</p>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1.5 text-xs ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>
              <Users size={12} />
              <span>{group.members.toLocaleString()} members</span>
            </div>
            {group.joined ? (
              <button onClick={() => onLeave(group.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isStudy
                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                    : 'bg-green-500/20 text-green-400 border-green-700/30 hover:bg-red-900/20 hover:text-red-400 hover:border-red-700/30'
                }`}>
                <Check size={12} /> Joined
              </button>
            ) : group.pending ? (
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${isStudy ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-900/20 text-amber-400 border-amber-700/30'}`}>
                <Clock size={12} /> Pending
              </div>
            ) : (
              <button onClick={() => onJoin(group.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:shadow-md hover:scale-105 ${
                  isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                Request to Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
