'use client'
import Navbar from '@/components/shared/Navbar'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  )
}
