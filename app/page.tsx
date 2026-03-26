'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, BookOpen, Palette, Map, Users, Trophy, Star, ChevronDown } from 'lucide-react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMode, setActiveMode] = useState<'study' | 'fun'>('study')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setActiveMode(m => m === 'study' ? 'fun' : 'study'), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Duozy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#modes" className="hover:text-blue-600 transition-colors">Modes</a>
            <a href="#how" className="hover:text-blue-600 transition-colors">How it works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/auth?tab=signup" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-50 rounded-full blur-3xl opacity-40" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium mb-8 animate-bounce-soft">
            <Star size={14} className="fill-blue-600" />
            The dual-mode student platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
            Where students{' '}
            <span className={`transition-all duration-700 ${activeMode === 'study' ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400'} bg-clip-text text-transparent`}>
              {activeMode === 'study' ? 'grow' : 'live'}
            </span>
            <br />and{' '}
            <span className={`transition-all duration-700 ${activeMode === 'study' ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-gradient-to-r from-blue-600 to-blue-400'} bg-clip-text text-transparent`}>
              {activeMode === 'study' ? 'thrive' : 'explore'}
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Switch between <strong className="text-blue-600">Study Mode</strong> for hackathons, opportunities & teams, and <strong className="text-purple-600">Fun Mode</strong> for hobbies, vibes & social groups — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth?tab=signup" className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-200 hover:scale-105 transition-all duration-300 text-lg">
              Start for Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/auth" className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-lg">
              Sign In
            </Link>
          </div>

          {/* Split preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Study Mode Card */}
            <div className="group relative bg-white rounded-3xl p-6 shadow-xl border border-blue-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Study Mode</div>
                    <div className="text-xs text-slate-400">Growth & Career</div>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  {['🏆 Hackathons & Competitions', '🗺️ Opportunity Map', '👥 Team Builder', '🎯 Challenges & Badges'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 rounded-lg px-3 py-2">{item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fun Mode Card */}
            <div className="group relative bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-200 hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/20 rounded-full translate-y-8 -translate-x-8" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Palette size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Fun Mode</div>
                    <div className="text-xs text-purple-300">Lifestyle & Hobbies</div>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  {['🎨 Hobby Events & Workshops', '✨ Virtual Activity Experiences', '🤝 Social Interest Groups', '🎯 Challenges & Rewards'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-purple-200 bg-white/10 rounded-lg px-3 py-2">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hover:text-slate-600 transition-colors">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Everything a student needs</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">One platform. Two modes. Infinite possibilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Map size={24} />, title: 'Opportunity Map', desc: 'Interactive map with color-coded pins for jobs, hackathons, and exams near you.', color: 'blue', bg: 'bg-blue-50', iconBg: 'bg-blue-600' },
              { icon: <Users size={24} />, title: 'Team Builder', desc: 'Find teammates for hackathons with smart skill-matching and request system.', color: 'indigo', bg: 'bg-indigo-50', iconBg: 'bg-indigo-600' },
              { icon: <Trophy size={24} />, title: 'Challenge System', desc: 'Gamified tasks with badges, points, and animated progress tracking.', color: 'amber', bg: 'bg-amber-50', iconBg: 'bg-amber-500' },
              { icon: <span className="text-2xl">✨</span>, title: 'Virtual Experiences', desc: 'Interactive simulations — pottery, guitar, piano, resin art & photography.', color: 'purple', bg: 'bg-purple-50', iconBg: 'bg-purple-600' },
              { icon: <span className="text-2xl">🎨</span>, title: 'Hobby Events', desc: 'Discover pottery, music, travel, and art workshops near you.', color: 'pink', bg: 'bg-pink-50', iconBg: 'bg-pink-500' },
              { icon: <span className="text-2xl">🔔</span>, title: 'Smart Notifications', desc: 'Real-time alerts for deadlines, team activity, and trending events.', color: 'green', bg: 'bg-green-50', iconBg: 'bg-green-600' },
            ].map((f, i) => (
              <div key={i} className={`${f.bg} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white`}>
                <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-white mb-4`}>{f.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Get started in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your account with email or Google', emoji: '✍️' },
              { step: '02', title: 'Onboard', desc: 'Pick your interests and skills', emoji: '🎯' },
              { step: '03', title: 'Choose Mode', desc: 'Switch between Study and Fun anytime', emoji: '⚡' },
              { step: '04', title: 'Explore', desc: 'Discover events, teams, and vibes', emoji: '🚀' },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                {i < 3 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0" />}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">{s.emoji}</div>
                <div className="text-xs font-bold text-blue-400 mb-1">{s.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to switch modes?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">Join thousands of students already using Duozy to balance growth and life.</p>
          <Link href="/auth?tab=signup" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
            Join Duozy Free <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">Duozy</span>
        </div>
        <p className="text-sm">Where students switch between growth and life.</p>
        <p className="text-xs mt-4 text-slate-600">© 2025 Duozy. Built with ❤️ for students.</p>
      </footer>
    </div>
  )
}
