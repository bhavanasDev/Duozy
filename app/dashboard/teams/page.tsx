'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { TEAMS } from '@/lib/data'
import { Users, Plus, Check, X, Star, Briefcase, ChevronRight } from 'lucide-react'

export default function TeamsPage() {
  const { mode } = useApp()
  const isStudy = mode === 'study'
  const [requests, setRequests] = useState<Record<string, 'pending' | 'accepted' | null>>({})
  const [showCreate, setShowCreate] = useState(false)

  const sendRequest = (id: string) => setRequests(r => ({ ...r, [id]: 'pending' }))
  const cancelRequest = (id: string) => setRequests(r => ({ ...r, [id]: null }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-black mb-2 ${isStudy ? 'text-slate-900' : 'text-white'}`}>👥 Team Builder</h1>
          <p className={isStudy ? 'text-slate-500' : 'text-slate-400'}>Find your dream team for hackathons and projects</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
          <Plus size={16} /> Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TEAMS.map(team => {
          const reqState = requests[team.id]
          const fillPct = (team.members / team.maxMembers) * 100

          return (
            <div key={team.id}
              className={`rounded-2xl border p-3 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/70 border-slate-700/50'}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${isStudy ? 'bg-blue-50' : 'bg-purple-900/50'}`}>
                    {team.name[0]}
                  </div>
                  <div>
                    <h3 className={`font-black text-base ${isStudy ? 'text-slate-900' : 'text-white'}`}>{team.name}</h3>
                    <p className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{team.event}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${isStudy ? 'bg-green-50 text-green-600' : 'bg-green-900/30 text-green-400'}`}>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Open
                </div>
              </div>

              {/* Project */}
              <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-xl ${isStudy ? 'bg-slate-50' : 'bg-slate-700/50'}`}>
                <Briefcase size={14} className={isStudy ? 'text-blue-500' : 'text-purple-400'} />
                <span className={`text-sm font-medium ${isStudy ? 'text-slate-700' : 'text-slate-300'}`}>{team.project}</span>
              </div>

              {/* Members progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className={isStudy ? 'text-slate-400' : 'text-slate-500'} />
                    <span className={`text-xs font-medium ${isStudy ? 'text-slate-600' : 'text-slate-400'}`}>{team.members}/{team.maxMembers} members</span>
                  </div>
                  <span className={`text-xs ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{team.maxMembers - team.members} spots left</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isStudy ? 'bg-slate-100' : 'bg-slate-700'}`}>
                  <div className={`h-full rounded-full transition-all duration-700 ${isStudy ? 'bg-blue-500' : 'bg-purple-500'}`} style={{ width: `${fillPct}%` }} />
                </div>
              </div>

              {/* Roles needed */}
              <div className="mb-4">
                <p className={`text-xs font-semibold mb-2 ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>ROLES NEEDED</p>
                <div className="flex flex-wrap gap-1.5">
                  {team.roles.map(role => (
                    <span key={role} className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${isStudy ? 'border-blue-200 text-blue-700 bg-blue-50' : 'border-purple-700/50 text-purple-300 bg-purple-900/30'}`}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <p className={`text-xs font-semibold mb-2 ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>SKILLS</p>
                <div className="flex flex-wrap gap-1">
                  {team.skills.map(skill => (
                    <span key={skill} className={`text-xs px-2 py-0.5 rounded-md ${isStudy ? 'bg-slate-100 text-slate-600' : 'bg-slate-700 text-slate-400'}`}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={team.leader.avatar} alt={team.leader.name} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                  <span className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>Led by <strong className={isStudy ? 'text-slate-700' : 'text-slate-300'}>{team.leader.name.split(' ')[0]}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${team.match >= 80 ? (isStudy ? 'bg-green-50 text-green-600' : 'bg-green-900/30 text-green-400') : (isStudy ? 'bg-amber-50 text-amber-600' : 'bg-amber-900/30 text-amber-400')}`}>
                    <Star size={10} fill="currentColor" /> {team.match}% match
                  </div>
                  {reqState === 'pending' ? (
                    <button onClick={() => cancelRequest(team.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${isStudy ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}>
                      <X size={12} /> Cancel
                    </button>
                  ) : (
                    <button onClick={() => sendRequest(team.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
                      <ChevronRight size={12} /> Request to Join
                    </button>
                  )}
                </div>
              </div>

              {reqState === 'pending' && (
                <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${isStudy ? 'bg-amber-50 text-amber-700' : 'bg-amber-900/20 text-amber-400'}`}>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  Request sent — waiting for team leader approval
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Create Team Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl ${isStudy ? 'bg-white' : 'bg-slate-800'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>Create a Team</h2>
              <button onClick={() => setShowCreate(false)} className={`p-2 rounded-xl ${isStudy ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-slate-700 text-slate-400'}`}><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Team Name', placeholder: 'e.g. CodeCraft' },
                { label: 'Project Idea', placeholder: 'What are you building?' },
                { label: 'Event / Hackathon', placeholder: 'e.g. Smart India Hackathon' },
              ].map(field => (
                <div key={field.label}>
                  <label className={`block text-xs font-semibold mb-1.5 ${isStudy ? 'text-slate-600' : 'text-slate-400'}`}>{field.label}</label>
                  <input placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${isStudy ? 'border-slate-200 bg-slate-50 text-slate-800 focus:ring-blue-300' : 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-purple-500'}`} />
                </div>
              ))}
              <button onClick={() => setShowCreate(false)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${isStudy ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
                <Check size={16} className="inline mr-2" />Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
