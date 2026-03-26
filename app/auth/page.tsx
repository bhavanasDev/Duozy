'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/lib/context'
import { DEMO_USER } from '@/lib/data'
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

function AuthForm() {
  const router = useRouter()
  const params = useSearchParams()
  const { setUser } = useApp()
  const [tab, setTab] = useState<'login' | 'signup'>(params.get('tab') === 'signup' ? 'signup' : 'login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const fillDemo = () => setForm(f => ({ ...f, email: 'arjun9@duozy.com', password: 'password123' }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setUser(DEMO_USER)
    router.push(tab === 'signup' ? '/onboarding' : '/dashboard')
  }

  const handleGoogle = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setUser(DEMO_USER)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10 animate-float"
              style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px`, top: `${10 + i * 15}%`, left: `${5 + i * 14}%`, animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>
        <div className="relative z-10 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Zap size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-4">Duozy</h1>
          <p className="text-xl text-white/80 mb-8">Where students switch between<br />growth and life.</p>
          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { emoji: '🏆', text: 'Hackathons & Events' },
              { emoji: '🗺️', text: 'Opportunity Map' },
              { emoji: '🎨', text: 'Hobby Workshops' },
              { emoji: '🌍', text: 'Vibe Mode Travel' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-sm font-medium text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Duozy</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {tab === 'login' ? 'Welcome back 👋' : 'Join Duozy 🚀'}
          </h2>
          <p className="text-slate-500 mb-8">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} className="text-blue-600 font-semibold hover:underline">
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          {/* Google */}
          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-slate-200 rounded-2xl font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Demo credentials banner — login tab only */}
          {tab === 'login' && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 mb-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-amber-800">🔑 Demo credentials</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  <span className="font-mono">arjun9@duozy.com</span> · <span className="font-mono">password123</span>
                </p>
              </div>
              <button type="button" onClick={fillDemo}
                className="shrink-0 text-xs font-bold px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors">
                Use
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Full name" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-colors text-slate-800 placeholder-slate-400" />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" placeholder="Email address" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-colors text-slate-800 placeholder-slate-400" />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Password" required value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full pl-11 pr-12 py-3.5 border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-colors text-slate-800 placeholder-slate-400" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {tab === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  )
}
