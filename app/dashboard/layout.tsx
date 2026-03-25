'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import Navbar from '@/components/shared/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, mode, isTransitioning } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/auth')
  }, [isLoggedIn])

  const isStudy = mode === 'study'

  return (
    <div className={`min-h-screen transition-all duration-500 ${isStudy ? 'bg-slate-50' : 'fun-bg'}`}>
      <Navbar />
      <main className={`pt-16 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        {children}
      </main>
    </div>
  )
}
