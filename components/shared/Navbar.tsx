'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { Zap, Bell, BookOpen, Palette, X, Clock, Users, Trophy, Calendar, LayoutDashboard, Map, Star, Music, Flame, UserCircle } from 'lucide-react'

const notifIcons = { deadline: Clock, team: Users, challenge: Trophy, event: Calendar }
const notifColors = {
  deadline: 'text-red-500 bg-red-50',
  team: 'text-blue-500 bg-blue-50',
  challenge: 'text-amber-500 bg-amber-50',
  event: 'text-green-500 bg-green-50',
}

export default function Navbar() {
  const { mode, setMode, user, notifications, unreadCount, markAllRead } = useApp()
  const router = useRouter()
  const pathname = usePathname()
  const [showNotif, setShowNotif] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [switchTarget, setSwitchTarget] = useState<'study' | 'fun'>('fun')
  const notifRef = useRef<HTMLDivElement>(null)
  const isStudy = mode === 'study'
  const funAccent = '#7C3AED'

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleToggle = () => {
    const next = isStudy ? 'fun' : 'study'
    setSwitchTarget(next)
    setSwitching(true)
    setTimeout(() => { setMode(next); router.push('/dashboard') }, 350)
    setTimeout(() => setSwitching(false), 900)
  }

  const studyLinks = [
    { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Events', href: '/dashboard/events', icon: Flame },
    { label: 'Map', href: '/dashboard/map', icon: Map },
    { label: 'Teams', href: '/dashboard/teams', icon: Users },
    { label: 'Challenges', href: '/dashboard/challenges', icon: Trophy },
  ]
  const funLinks = [
    { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Hobbies', href: '/dashboard/hobby-events', icon: Star },
    { label: 'Groups', href: '/dashboard/groups', icon: Users },
    { label: 'Vibe', href: '/dashboard/vibe', icon: Music },
    { label: 'Challenges', href: '/dashboard/challenges', icon: Trophy },
  ]
  const links = isStudy ? studyLinks : funLinks

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* ── MODE SWITCH OVERLAY ── */}
      {switching && (
        <div className="mode-switch-overlay">
          <div className="mode-switch-ripple"
            style={{ background: switchTarget === 'fun' ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : 'linear-gradient(135deg, #2563EB, #3B82F6)' }} />
          <div className="mode-switch-content">
            <div className="text-6xl mb-3">{switchTarget === 'fun' ? '🎉' : '📚'}</div>
            <p className="text-white font-black text-2xl drop-shadow-lg">
              {switchTarget === 'fun' ? 'Fun Mode' : 'Study Mode'}
            </p>
            <p className="text-white/70 text-sm mt-1">
              {switchTarget === 'fun' ? 'Time to explore & enjoy!' : 'Time to grow & learn!'}
            </p>
          </div>
        </div>
      )}

      {/* ── TOP NAVBAR (desktop + mobile top bar) ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{ background: isStudy ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : `linear-gradient(135deg, ${funAccent}, #EC4899)` }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Duozy</span>
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300"
              style={isStudy ? { backgroundColor: '#EFF6FF', color: '#2563EB' } : { backgroundColor: '#F5F3FF', color: funAccent }}>
              {isStudy ? <BookOpen size={9} /> : <Palette size={9} />}
              {isStudy ? 'Study' : 'Fun'}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}>
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mode Toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 hidden sm:block">
                {isStudy ? 'Study' : 'Fun'}
              </span>
              <button onClick={handleToggle}
                className="relative flex items-center w-14 h-7 md:w-16 md:h-8 rounded-full transition-all duration-500 focus:outline-none"
                style={isStudy
                  ? { backgroundColor: '#2563EB', boxShadow: '0 2px 8px rgba(37,99,235,0.4)' }
                  : { background: `linear-gradient(135deg, ${funAccent}, #EC4899)`, boxShadow: `0 2px 8px rgba(124,58,237,0.4)` }}>
                <span className={`absolute flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow-md transition-all duration-500 ${isStudy ? 'left-1' : 'left-8 md:left-9'}`}>
                  {isStudy
                    ? <BookOpen size={10} className="text-blue-600" />
                    : <Palette size={10} style={{ color: funAccent }} />}
                </span>
              </button>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => { setShowNotif(!showNotif); if (!showNotif) markAllRead() }}
                className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-72 md:w-80 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 bg-white animate-slide-up">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-xs text-blue-500 cursor-pointer hover:underline" onClick={markAllRead}>Mark all read</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(n => {
                      const Icon = notifIcons[n.type]
                      const colorClass = notifColors[n.type]
                      return (
                        <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{n.title}</p>
                            <p className="text-xs text-slate-500 truncate">{n.message}</p>
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
              <div className="w-8 h-8 rounded-xl overflow-hidden border-2 border-slate-200 transition-all group-hover:scale-110 group-hover:border-blue-300">
                <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-slate-700">
                {user?.name?.split(' ')[0] || 'You'}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── BOTTOM NAV (mobile only) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {links.map(({ label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px]"
                style={active ? { backgroundColor: isStudy ? '#EFF6FF' : '#F5F3FF' } : {}}>
                <div className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${active ? 'scale-110' : ''}`}>
                  <Icon size={20}
                    style={{ color: active ? (isStudy ? '#2563EB' : funAccent) : '#94A3B8' }}
                    strokeWidth={active ? 2.5 : 1.8} />
                </div>
                <span className="text-[10px] font-semibold transition-all duration-200"
                  style={{ color: active ? (isStudy ? '#2563EB' : funAccent) : '#94A3B8' }}>
                  {label}
                </span>
                {active && (
                  <div className="w-1 h-1 rounded-full mt-0.5"
                    style={{ backgroundColor: isStudy ? '#2563EB' : funAccent }} />
                )}
              </Link>
            )
          })}
          {/* Profile tab */}
          <Link href="/profile"
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px]"
            style={pathname === '/profile' ? { backgroundColor: isStudy ? '#EFF6FF' : '#F5F3FF' } : {}}>
            <div className="w-6 h-6 flex items-center justify-center">
              {user?.avatar
                ? <img src={user.avatar} alt="me" className="w-5 h-5 rounded-full border border-slate-200" />
                : <UserCircle size={20} color={pathname === '/profile' ? (isStudy ? '#2563EB' : funAccent) : '#94A3B8'} strokeWidth={1.8} />
              }
            </div>
            <span className="text-[10px] font-semibold"
              style={{ color: pathname === '/profile' ? (isStudy ? '#2563EB' : funAccent) : '#94A3B8' }}>
              Profile
            </span>
            {pathname === '/profile' && (
              <div className="w-1 h-1 rounded-full mt-0.5"
                style={{ backgroundColor: isStudy ? '#2563EB' : funAccent }} />
            )}
          </Link>
        </div>
      </div>
    </>
  )
}
