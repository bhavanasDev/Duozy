'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { Zap, Bell, BookOpen, Palette, Menu, X, Clock, Users, Trophy, Calendar } from 'lucide-react'

const notifIcons = { deadline: Clock, team: Users, challenge: Trophy, event: Calendar }
const notifColors = { deadline: 'text-red-500 bg-red-50', team: 'text-blue-500 bg-blue-50', challenge: 'text-amber-500 bg-amber-50', event: 'text-green-500 bg-green-50' }

export default function Navbar() {
  const { mode, setMode, isTransitioning, user, notifications, unreadCount, markAllRead } = useApp()
  const router = useRouter()
  const [showNotif, setShowNotif] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [switchLabel, setSwitchLabel] = useState('')
  const notifRef = useRef<HTMLDivElement>(null)
  const isStudy = mode === 'study'

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleToggle = () => {
    const next = isStudy ? 'fun' : 'study'
    setSwitchLabel(`Switching to ${next === 'study' ? 'Study' : 'Fun'} Mode...`)
    setSwitching(true)
    setTimeout(() => setSwitching(false), 1200)
    setMode(next)
    router.push('/dashboard')
  }

  const studyLinks = [
    ['Dashboard', '/dashboard'],
    ['Events', '/dashboard/events'],
    ['Opp. Map', '/dashboard/map'],
    ['Teams', '/dashboard/teams'],
    ['Challenges', '/dashboard/challenges'],
  ]
  const funLinks = [
    ['Dashboard', '/dashboard'],
    ['Hobby Events', '/dashboard/hobby-events'],
    ['Groups', '/dashboard/groups'],
    ['Vibe Mode', '/dashboard/vibe'],
    ['Challenges', '/dashboard/challenges'],
  ]
  const links = isStudy ? studyLinks : funLinks

  return (
    <>
      {/* Mode switching overlay */}
      {switching && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className={`px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl backdrop-blur-md transition-all ${isStudy ? 'bg-purple-600/90' : 'bg-blue-600/90'}`}>
            {switchLabel}
          </div>
        </div>
      )}

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isStudy ? 'bg-white/95 border-b border-slate-100' : 'bg-black/40 border-b border-white/5'} backdrop-blur-xl shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${isStudy ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
              <Zap size={16} className="text-white" />
            </div>
            <span className={`text-xl font-bold transition-all duration-500 ${isStudy ? 'text-slate-900' : 'text-white'}`}>Duozy</span>
          </Link>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(([label, href]) => (
              <NavLink key={href} href={href} label={label} mode={mode} />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold hidden sm:block ${isStudy ? 'text-blue-600' : 'text-purple-400'}`}>
                {isStudy ? 'Study' : 'Fun'}
              </span>
              <button onClick={handleToggle}
                className={`relative flex items-center w-16 h-8 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isStudy ? 'bg-blue-600 focus:ring-blue-400' : 'bg-gradient-to-r from-purple-600 to-pink-600 focus:ring-purple-400'
                }`}>
                <span className={`absolute flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ${isStudy ? 'left-1' : 'left-9'}`}>
                  {isStudy ? <BookOpen size={12} className="text-blue-600" /> : <Palette size={12} className="text-purple-600" />}
                </span>
              </button>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => { setShowNotif(!showNotif); if (!showNotif) markAllRead() }}
                className={`relative p-2 rounded-xl transition-all duration-200 ${isStudy ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-slate-300'}`}>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className={`absolute right-0 top-12 w-80 rounded-2xl shadow-2xl border overflow-hidden z-50 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-800 border-slate-700'}`}>
                  <div className={`px-4 py-3 border-b flex items-center justify-between ${isStudy ? 'border-slate-100' : 'border-slate-700'}`}>
                    <span className={`font-bold text-sm ${isStudy ? 'text-slate-900' : 'text-white'}`}>Notifications</span>
                    <span className="text-xs text-blue-500 cursor-pointer hover:underline" onClick={markAllRead}>Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => {
                      const Icon = notifIcons[n.type]
                      const colorClass = notifColors[n.type]
                      return (
                        <div key={n.id} className={`flex gap-3 px-4 py-3 border-b last:border-0 transition-colors ${isStudy ? 'border-slate-50 hover:bg-slate-50' : 'border-slate-700 hover:bg-slate-700/50'} ${!n.read ? (isStudy ? 'bg-blue-50/50' : 'bg-purple-900/20') : ''}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${isStudy ? 'text-slate-900' : 'text-white'}`}>{n.title}</p>
                            <p className={`text-xs truncate ${isStudy ? 'text-slate-500' : 'text-slate-400'}`}>{n.message}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 shrink-0" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className={`w-8 h-8 rounded-xl overflow-hidden border-2 transition-all duration-200 group-hover:scale-110 ${isStudy ? 'border-slate-200' : 'border-purple-500'}`}>
                <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <span className={`hidden sm:block text-sm font-semibold transition-colors ${isStudy ? 'text-slate-700' : 'text-slate-200'}`}>
                {user?.name?.split(' ')[0] || 'You'}
              </span>
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setShowMenu(!showMenu)} className={`md:hidden p-2 rounded-xl ${isStudy ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'}`}>
              {showMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className={`md:hidden border-t px-4 py-4 space-y-1 ${isStudy ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-800'}`}>
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setShowMenu(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isStudy ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'}`}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}

function NavLink({ href, label, mode }: { href: string; label: string; mode: string }) {
  const isStudy = mode === 'study'
  return (
    <Link href={href} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isStudy ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
      {label}
    </Link>
  )
}
