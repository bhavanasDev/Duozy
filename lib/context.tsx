'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Mode = 'study' | 'fun'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  interests: string[]
  skills: string[]
  points: number
  badges: string[]
  joinedEvents: string[]
  completedChallenges: string[]
}

interface AppContextType {
  mode: Mode
  setMode: (m: Mode) => void
  toggleMode: () => void
  user: User | null
  setUser: (u: User | null) => void
  isLoggedIn: boolean
  notifications: Notification[]
  unreadCount: number
  markAllRead: () => void
  isTransitioning: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'deadline' | 'team' | 'event' | 'challenge'
  read: boolean
  time: string
}

const AppContext = createContext<AppContextType | null>(null)

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Hackathon Deadline', message: 'Smart India Hackathon closes in 2 days!', type: 'deadline', read: false, time: '2m ago' },
  { id: '2', title: 'Team Request', message: 'Alex wants to join your team "CodeCraft"', type: 'team', read: false, time: '15m ago' },
  { id: '3', title: 'New Event', message: 'Google DevFest 2025 is now open for registration', type: 'event', read: false, time: '1h ago' },
  { id: '4', title: 'Challenge Complete!', message: 'You earned the "Explorer" badge 🎉', type: 'challenge', read: true, time: '3h ago' },
  { id: '5', title: 'Trending Near You', message: 'Pottery Workshop in Bangalore is trending', type: 'event', read: true, time: '5h ago' },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>('study')
  const [user, setUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const setMode = (m: Mode) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setModeState(m)
      setIsTransitioning(false)
    }, 300)
  }

  const toggleMode = () => setMode(mode === 'study' ? 'fun' : 'study')

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <AppContext.Provider value={{
      mode, setMode, toggleMode,
      user, setUser,
      isLoggedIn: !!user,
      notifications, unreadCount, markAllRead,
      isTransitioning,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
