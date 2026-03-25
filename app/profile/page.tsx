'use client'
import { useApp } from '@/lib/context'
import { DEMO_USER, CHALLENGES, STUDY_EVENTS } from '@/lib/data'
import { useRouter } from 'next/navigation'
import { Trophy, Star, Zap, Edit, LogOut, BookOpen, Palette, Calendar, Users } from 'lucide-react'

export default function ProfilePage() {
  const { user, mode, setUser } = useApp()
  const router = useRouter()
  const u = user || DEMO_USER
  const isStudy = mode === 'study'

  const completedChallenges = CHALLENGES.filter(c => u.completedChallenges.includes(c.id))
  const joinedEvents = STUDY_EVENTS.filter(e => u.joinedEvents.includes(e.id))

  const handleLogout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${isStudy ? 'bg-slate-50' : 'bg-[#0A0618]'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Profile header */}
        <div className={`rounded-3xl p-8 mb-6 relative overflow-hidden ${isStudy ? 'bg-white border border-slate-100 shadow-sm' : 'bg-slate-800/60 border border-slate-700/50'}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-16 translate-x-16 ${isStudy ? 'bg-blue-500' : 'bg-purple-500'}`} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img src={u.avatar} alt={u.name} className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl" />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center ${isStudy ? 'bg-blue-600' : 'bg-purple-600'}`}>
                <Zap size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className={`text-2xl font-black mb-1 ${isStudy ? 'text-slate-900' : 'text-white'}`}>{u.name}</h1>
              <p className={`text-sm mb-3 ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{u.email}</p>
              <div className="flex flex-wrap gap-2">
                {u.interests.map(i => (
                  <span key={i} className={`text-xs px-3 py-1 rounded-full font-medium ${isStudy ? 'bg-blue-50 text-blue-600' : 'bg-purple-900/50 text-purple-300'}`}>{i}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>
                <Edit size={14} /> Edit
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Points', value: u.points, icon: Star, color: isStudy ? 'text-amber-500 bg-amber-50' : 'text-amber-400 bg-amber-900/30' },
            { label: 'Badges', value: u.badges.length, icon: Trophy, color: isStudy ? 'text-blue-600 bg-blue-50' : 'text-purple-400 bg-purple-900/30' },
            { label: 'Events Joined', value: joinedEvents.length, icon: Calendar, color: isStudy ? 'text-green-600 bg-green-50' : 'text-green-400 bg-green-900/30' },
            { label: 'Challenges Done', value: completedChallenges.length, icon: Zap, color: isStudy ? 'text-purple-600 bg-purple-50' : 'text-pink-400 bg-pink-900/30' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`rounded-2xl p-5 border text-center ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${color}`}>
                <Icon size={18} />
              </div>
              <div className={`text-2xl font-black ${isStudy ? 'text-slate-900' : 'text-white'}`}>{value}</div>
              <div className={`text-xs ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <div className={`rounded-2xl border p-6 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
            <h2 className={`font-black text-base mb-4 ${isStudy ? 'text-slate-900' : 'text-white'}`}>💡 Skills</h2>
            <div className="flex flex-wrap gap-2">
              {u.skills.map(skill => (
                <span key={skill} className={`px-3 py-1.5 rounded-xl text-sm font-semibold border ${isStudy ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-700 border-slate-600 text-slate-300'}`}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className={`rounded-2xl border p-6 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
            <h2 className={`font-black text-base mb-4 ${isStudy ? 'text-slate-900' : 'text-white'}`}>🏅 Badges Earned</h2>
            <div className="flex flex-wrap gap-2">
              {u.badges.map(badge => (
                <div key={badge} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${isStudy ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100' : 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 border border-purple-700/50'}`}>
                  <Trophy size={12} /> {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Joined Events */}
          <div className={`rounded-2xl border p-6 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
            <h2 className={`font-black text-base mb-4 ${isStudy ? 'text-slate-900' : 'text-white'}`}>📅 Joined Events</h2>
            <div className="space-y-3">
              {joinedEvents.map(event => (
                <div key={event.id} className={`flex items-center gap-3 p-3 rounded-xl ${isStudy ? 'bg-slate-50' : 'bg-slate-700/50'}`}>
                  <img src={event.image} alt={event.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isStudy ? 'text-slate-800' : 'text-white'}`}>{event.title}</p>
                    <p className={`text-xs ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{event.category} · {event.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Challenges */}
          <div className={`rounded-2xl border p-6 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800/60 border-slate-700/50'}`}>
            <h2 className={`font-black text-base mb-4 ${isStudy ? 'text-slate-900' : 'text-white'}`}>✅ Completed Challenges</h2>
            <div className="space-y-2">
              {completedChallenges.map(c => (
                <div key={c.id} className={`flex items-center gap-3 p-3 rounded-xl ${isStudy ? 'bg-green-50' : 'bg-green-900/20'}`}>
                  <span className="text-xl">{c.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isStudy ? 'text-slate-800' : 'text-white'}`}>{c.title}</p>
                    <p className={`text-xs ${isStudy ? 'text-slate-400' : 'text-slate-500'}`}>{c.description}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isStudy ? 'bg-green-100 text-green-700' : 'bg-green-900/40 text-green-400'}`}>+{c.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
