'use client'
import RecruiterPanel from '@/components/hiring/RecruiterPanel'
import { Briefcase } from 'lucide-react'

export default function RecruiterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Briefcase size={22} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Recruiter Panel</h1>
          <p className="text-sm text-slate-500">Discover and connect with top-performing candidates.</p>
        </div>
      </div>
      <RecruiterPanel />
    </div>
  )
}
