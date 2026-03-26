'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import Navbar from '@/components/shared/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isTransitioning } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/auth')
  }, [isLoggedIn])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* pt-16 for top navbar, pb-20 md:pb-0 for mobile bottom nav */}
      <main className={`pt-16 pb-20 md:pb-0 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        {children}
      </main>
    </div>
  )
}
