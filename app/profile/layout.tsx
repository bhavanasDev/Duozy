'use client'
import Navbar from '@/components/shared/Navbar'
import { useApp } from '@/lib/context'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { mode } = useApp()
  return (
    <div className={`min-h-screen transition-all duration-500 ${mode === 'study' ? 'bg-slate-50' : 'bg-[#0A0618]'}`}>
      <Navbar />
      {children}
    </div>
  )
}
