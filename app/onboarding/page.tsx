'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { ArrowRight, Check, Zap } from 'lucide-react'

const INTERESTS = ['Coding', 'Design', 'Music', 'Travel', 'Photography', 'Art & Craft', 'Gaming', 'Fitness', 'Reading', 'Cooking', 'Dance', 'Yoga']
const SKILLS = ['React', 'Python', 'UI/UX', 'Node.js', 'Machine Learning', 'Data Science', 'Flutter', 'Java', 'Figma', 'AWS', 'Blockchain', 'DevOps']
const GOALS = [
  { id: 'hackathons', label: 'Win Hackathons', emoji: '🏆' },
  { id: 'internships', label: 'Find Internships', emoji: '💼' },
  { id: 'hobbies', label: 'Explore Hobbies', emoji: '🎨' },
  { id: 'network', label: 'Build Network', emoji: '🤝' },
  { id: 'travel', label: 'Travel & Explore', emoji: '✈️' },
  { id: 'learn', label: 'Learn New Skills', emoji: '📚' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setUser } = useApp()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState({ interests: [] as string[], skills: [] as string[], goals: [] as string[] })

  const toggle = (key: keyof typeof selected, val: string) => {
    setSelected(s => ({
      ...s,
      [key]: s[key].includes(val) ? s[key].filter(x => x !== val) : [...s[key], val]
    }))
  }

  const finish = () => {
    if (user) setUser({ ...user, interests: selected.interests, skills: selected.skills })
    router.push('/dashboard')
  }

  const steps = [
    {
      title: "What are you into? 🎯",
      subtitle: "Pick your interests to personalize your experience",
      key: 'interests' as const,
      items: INTERESTS,
    },
    {
      title: "What are your skills? 💡",
      subtitle: "Help us match you with the right teams and opportunities",
      key: 'skills' as const,
      items: SKILLS,
    },
    {
      title: "What's your goal? 🚀",
      subtitle: "We'll prioritize content that matters to you",
      key: 'goals' as const,
      items: GOALS.map(g => g.label),
      emojis: GOALS.reduce((a, g) => ({ ...a, [g.label]: g.emoji }), {} as Record<string, string>),
    },
  ]

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Duozy</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-600' : 'bg-slate-200'} ${i === step ? 'w-8' : 'w-2'}`} />
            ))}
          </div>
          <p className="text-sm text-slate-400">Step {step + 1} of {steps.length}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-2">{current.title}</h2>
          <p className="text-slate-500 mb-8">{current.subtitle}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {current.items.map(item => {
              const isSelected = selected[current.key].includes(item)
              const emoji = (current as any).emojis?.[item]
              return (
                <button key={item} onClick={() => toggle(current.key, item)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 scale-105'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                  }`}>
                  {emoji && <span>{emoji}</span>}
                  {item}
                  {isSelected && <Check size={14} />}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => step > 0 && setStep(s => s - 1)}
              className={`px-6 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-100 transition-colors ${step === 0 ? 'invisible' : ''}`}>
              Back
            </button>
            <button
              onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : finish()}
              disabled={selected[current.key].length === 0}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:scale-100">
              {step < steps.length - 1 ? 'Continue' : 'Enter Duozy'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          <button onClick={finish} className="hover:text-slate-600 underline">Skip for now</button>
        </p>
      </div>
    </div>
  )
}
