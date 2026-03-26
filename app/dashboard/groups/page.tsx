'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { SOCIAL_GROUPS } from '@/lib/data'
import { Users, Check, Clock, Search, Plus } from 'lucide-react'

export default function GroupsPage() {
  const { mode, completeTask } = useApp()
  const [groups, setGroups] = useState(SOCIAL_GROUPS)
  const [search, setSearch] = useState('')

  function handleJoin(id: string) {
    setGroups(gs => {
      const updated = gs.map(g => g.id === id ? { ...g, pending: true } : g)
      const joinedCount = updated.filter(g => g.joined || g.pending).length
      completeTask('b5t1') // Join 1 social group
      if (joinedCount >= 2) completeTask('b5t2') // Join 2 social groups
      return updated
    })
  }

  function handleLeave(id: string) {
    setGroups(gs => gs.map(g => g.id === id ? { ...g, joined: false, pending: false } : g))
  }

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🤝 Social Groups
          </h1>
          <p className="text-slate-400">Join interest-based communities and connect with like-minded people</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105 transition-all">
          <Plus size={16} /> Create Group
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups..."
          className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>

      {/* Joined groups */}
      {filtered.some(g => g.joined) && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Your Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {filtered.filter(g => g.joined).map(group => (
              <GroupCard key={group.id} group={group} onJoin={handleJoin} onLeave={handleLeave} />
            ))}
          </div>
        </div>
      )}

      {/* Discover */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Discover Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {filtered.filter(g => !g.joined).map(group => (
            <GroupCard key={group.id} group={group} onJoin={handleJoin} onLeave={handleLeave} />
          ))}
        </div>
      </div>
    </div>
  )
}

function GroupCard({ group, onJoin, onLeave }: any) {
  return (
    <div className={`rounded-2xl border p-3 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${group.joined ? 'bg-purple-900/30 border-purple-700/50' : 'bg-slate-800/70 border-slate-700/50 hover:border-purple-500/50'}`}>
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-lg">
          {group.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-black text-white text-base">{group.name}</h3>
              <span className="text-xs text-purple-400 font-medium">{group.category}</span>
            </div>
            {group.active && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-green-900/30 border border-green-700/30 rounded-lg shrink-0">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1 mb-3">{group.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Users size={12} />
              <span>{group.members.toLocaleString()} members</span>
            </div>
            {group.joined ? (
              <button onClick={() => onLeave(group.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500/20 text-green-400 border border-green-700/30 hover:bg-red-900/20 hover:text-red-400 hover:border-red-700/30 transition-all">
                <Check size={12} /> Joined
              </button>
            ) : group.pending ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-900/20 text-amber-400 border border-amber-700/30">
                <Clock size={12} /> Pending
              </div>
            ) : (
              <button onClick={() => onJoin(group.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md hover:scale-105 transition-all">
                Request to Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
