'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { BADGE_CHALLENGES, DEMO_USER } from '@/lib/data'
import { Trophy, Star, Zap, Lock, CheckCircle2, Circle, Gift, X, Check, ChevronRight } from 'lucide-react'

const REDEEM_OPTIONS = [
  {
    id: 'boost_profile',
    title: 'Boost Profile Visibility',
    description: 'Get featured at the top of team searches for 7 days',
    emoji: '🚀',
    cost: 200,
    category: 'profile',
    duration: '7 days',
  },
  {
    id: 'promote_team',
    title: 'Promote Your Team',
    description: 'Pin your team to the top of Team Builder for 3 days',
    emoji: '📌',
    cost: 150,
    category: 'team',
    duration: '3 days',
  },
  {
    id: 'priority_events',
    title: 'Priority Event Access',
    description: 'Get early registration access to upcoming events',
    emoji: '⚡',
    cost: 300,
    category: 'events',
    duration: '30 days',
  },
  {
    id: 'unlock_challenges',
    title: 'Unlock Advanced Challenges',
    description: 'Access exclusive high-reward challenges',
    emoji: '🔓',
    cost: 500,
    category: 'challenges',
    duration: 'Permanent',
  },
  {
    id: 'profile_badge',
    title: 'Exclusive Profile Badge',
    description: 'Show off a rare "Power User" badge on your profile',
    emoji: '🏆',
    cost: 400,
    category: 'profile',
    duration: 'Permanent',
  },
  {
    id: 'event_discount',
    title: 'Event Fee Discount',
    description: 'Get 20% off on your next paid event registration',
    emoji: '🎟️',
    cost: 250,
    category: 'events',
    duration: 'One-time',
  },
]

export default function ChallengesPage() {
  const { mode, user, setUser } = useApp()
  const isStudy = mode === 'study'
  const u = user || DEMO_USER
  const [tab, setTab] = useState<'challenges' | 'redeem'>('challenges')
  const [challengeTab, setChallengeTab] = useState<'study' | 'fun'>(isStudy ? 'study' : 'fun')
  const [points, setPoints] = useState(u.points)
  const [redeemed, setRedeemed] = useState<string[]>([])
  const [confirmItem, setConfirmItem] = useState<typeof REDEEM_OPTIONS[0] | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [completedTasks, setCompletedTasks] = useState<string[]>(
    BADGE_CHALLENGES.flatMap(b => b.tasks.filter(t => t.completed).map(t => t.id))
  )

  const badgeGroups = BADGE_CHALLENGES.filter(b => b.category === challengeTab)
  const totalEarned = BADGE_CHALLENGES.flatMap(b => b.tasks)
    .filter(t => completedTasks.includes(t.id))
    .reduce((s, t) => s + t.points, 0)
  const totalBadgesUnlocked = BADGE_CHALLENGES.filter(b => b.tasks.every(t => completedTasks.includes(t.id))).length

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const completeTask = (taskId: string, pts: number) => {
    if (completedTasks.includes(taskId)) return
    setCompletedTasks(prev => [...prev, taskId])
    setPoints(p => p + pts)
    showToast(`+${pts} points earned! 🎉`, 'success')
  }

  const handleRedeem = (item: typeof REDEEM_OPTIONS[0]) => {
    if (points < item.cost) {
      showToast(`You need ${item.cost - points} more points to redeem this!`, 'error')
      return
    }
    setConfirmItem(item)
  }

  const confirmRedeem = () => {
    if (!confirmItem) return
    setPoints(p => p - confirmItem.cost)
    setRedeemed(r => [...r, confirmItem.id])
    setConfirmItem(null)
    showToast(`${confirmItem.title} activated! ✨`, 'success')
  }

  const getBadgeProgress = (b: typeof BADGE_CHALLENGES[0]) => {
    const done = b.tasks.filter(t => completedTasks.includes(t.id)).length
    return Math.round((done / b.tasks.length) * 100)
  }

  // Find next affordable redeem
  const nextAffordable = REDEEM_OPTIONS
    .filter(r => !redeemed.includes(r.id) && r.cost > points)
    .sort((a, b) => a.cost - b.cost)[0]

  const s = isStudy
    ? { card: 'bg-white border-slate-100', text: 'text-slate-900', sub: 'text-slate-500', muted: 'text-slate-400', bg: 'bg-slate-50', pill: 'bg-blue-600 text-white', pillSoft: 'bg-blue-50 text-blue-600', bar: 'bg-blue-500', tabBg: 'bg-slate-100', tabActive: 'bg-white text-blue-600 shadow-sm' }
    : { card: 'bg-slate-800/60 border-slate-700/50', text: 'text-white', sub: 'text-slate-400', muted: 'text-slate-500', bg: 'bg-slate-700/50', pill: 'bg-purple-600 text-white', pillSoft: 'bg-purple-900/50 text-purple-300', bar: 'bg-purple-500', tabBg: 'bg-slate-800', tabActive: 'bg-slate-700 text-purple-400' }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-black mb-1 ${s.text}`}>🎯 Challenges & Rewards</h1>
        <p className={`text-sm ${s.sub}`}>Complete challenges to earn points, then redeem them for perks</p>
      </div>

      {/* Points balance card */}
      <div className={`rounded-3xl p-6 mb-6 relative overflow-hidden ${isStudy ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/5"
              style={{ width: `${80 + i * 60}px`, height: `${80 + i * 60}px`, top: `${-10 + i * 30}%`, right: `${-5 + i * 10}%` }} />
          ))}
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Your Points Balance</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-white">{points.toLocaleString()}</span>
              <span className="text-white/60 text-sm mb-1">pts</span>
            </div>
            {nextAffordable && (
              <p className="text-white/60 text-xs mt-2">
                💡 Need <strong className="text-white">{nextAffordable.cost - points} more pts</strong> to unlock "{nextAffordable.title}"
              </p>
            )}
          </div>
          <div className="flex gap-4">
            {[
              { label: 'Earned Total', value: totalEarned },
              { label: 'Badges', value: totalBadgesUnlocked },
              { label: 'Redeemed', value: redeemed.length },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-10 bg-white/20" />}
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-white/50 text-[10px]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main tabs */}
      <div className={`flex gap-1 p-1 rounded-2xl mb-6 ${s.tabBg}`}>
        {[
          { id: 'challenges', label: '🎯 Challenges', desc: 'Earn points' },
          { id: 'redeem', label: '🎁 Redeem', desc: 'Use points' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.id ? s.tabActive : `${s.muted} hover:${s.text}`}`}>
            {t.label}
            <span className={`text-[10px] font-normal hidden sm:block ${tab === t.id ? 'opacity-70' : 'opacity-40'}`}>— {t.desc}</span>
          </button>
        ))}
      </div>

      {/* CHALLENGES TAB */}
      {tab === 'challenges' && (
        <>
          {/* Study/Fun sub-tabs */}
          <div className={`flex gap-1 p-1 rounded-xl mb-5 w-fit ${s.tabBg}`}>
            {(['study', 'fun'] as const).map(t => (
              <button key={t} onClick={() => setChallengeTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${challengeTab === t ? s.tabActive : `${s.muted}`}`}>
                {t === 'study' ? '📚 Study' : '🎉 Fun'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {badgeGroups.map(group => {
              const progress = getBadgeProgress(group)
              const unlocked = progress === 100
              const earnedPts = group.tasks.filter(t => completedTasks.includes(t.id)).reduce((s, t) => s + t.points, 0)
              const totalPts = group.tasks.reduce((s, t) => s + t.points, 0)

              return (
                <div key={group.badgeId}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    unlocked
                      ? isStudy ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700/30'
                      : `${s.card} border`
                  }`}>
                  {/* Badge header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                          unlocked ? 'bg-gradient-to-br from-yellow-400 to-amber-500' : isStudy ? 'bg-slate-100' : 'bg-slate-700'
                        }`}>
                          {unlocked ? '🏅' : group.emoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-black text-base ${s.text}`}>{group.badge}</h3>
                            {unlocked && <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full font-bold">Unlocked!</span>}
                          </div>
                          <p className={`text-xs mt-0.5 ${s.sub}`}>{group.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-sm font-black ${s.text}`}>{earnedPts}<span className={`text-xs font-normal ${s.muted}`}>/{totalPts} pts</span></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={s.sub}>{group.tasks.filter(t => completedTasks.includes(t.id)).length}/{group.tasks.length} tasks</span>
                        <span className={`font-semibold ${s.text}`}>{progress}%</span>
                      </div>
                      <div className={`h-2.5 rounded-full overflow-hidden ${isStudy ? 'bg-slate-100' : 'bg-slate-700'}`}>
                        <div className={`h-full rounded-full transition-all duration-1000 ${
                          unlocked ? 'bg-gradient-to-r from-green-400 to-emerald-500' : isStudy ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`} style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className={`border-t px-5 py-3 space-y-2 ${isStudy ? 'border-slate-100 bg-slate-50/50' : 'border-slate-700/50 bg-slate-900/20'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${s.muted}`}>Tasks — click to complete</p>
                    {group.tasks.map(task => {
                      const done = completedTasks.includes(task.id)
                      return (
                        <div key={task.id}
                          onClick={() => !done && completeTask(task.id, task.points)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                            done
                              ? isStudy ? 'bg-green-50 border border-green-100' : 'bg-green-900/20 border border-green-700/20'
                              : `${isStudy ? 'bg-white border border-slate-100 hover:border-blue-300 hover:bg-blue-50' : 'bg-slate-800/50 border border-slate-700/30 hover:border-purple-500/50'} cursor-pointer`
                          }`}>
                          <div className="shrink-0">
                            {done
                              ? <CheckCircle2 size={18} className="text-green-500" />
                              : <Circle size={18} className={isStudy ? 'text-slate-300' : 'text-slate-600'} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${done ? (isStudy ? 'text-green-700 line-through' : 'text-green-400 line-through') : s.text}`}>
                              {task.title}
                            </p>
                            {!done && task.progress > 0 && (
                              <div className="mt-1">
                                <div className={`h-1 rounded-full overflow-hidden ${isStudy ? 'bg-slate-200' : 'bg-slate-700'}`}>
                                  <div className={`h-full rounded-full ${isStudy ? 'bg-blue-400' : 'bg-purple-400'}`} style={{ width: `${task.progress}%` }} />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={`shrink-0 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                            done ? 'bg-green-500 text-white' : s.pillSoft
                          }`}>
                            <Star size={9} fill="currentColor" /> +{task.points}
                          </div>
                          {!done && (
                            <ChevronRight size={14} className={s.muted} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* All badges */}
          <div className={`mt-6 rounded-2xl border p-5 ${s.card}`}>
            <h2 className={`text-sm font-black mb-4 ${s.text}`}>🏅 All Badges</h2>
            <div className="flex flex-wrap gap-2">
              {BADGE_CHALLENGES.map(b => {
                const earned = b.tasks.every(t => completedTasks.includes(t.id))
                return (
                  <div key={b.badgeId} className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-semibold text-sm ${
                    earned
                      ? isStudy ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 text-blue-700' : 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50 text-purple-300'
                      : isStudy ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-slate-700/50 border-slate-600 text-slate-500'
                  }`}>
                    {earned ? <Trophy size={13} /> : <Lock size={13} />}
                    {b.badge}
                    {!earned && <span className="text-[10px] opacity-60">({b.tasks.filter(t => completedTasks.includes(t.id)).length}/{b.tasks.length})</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* REDEEM TAB */}
      {tab === 'redeem' && (
        <div>
          <div className={`rounded-2xl border p-4 mb-5 flex items-center gap-3 ${isStudy ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/20 border-amber-700/30'}`}>
            <span className="text-2xl">💰</span>
            <div>
              <p className={`text-sm font-bold ${isStudy ? 'text-amber-800' : 'text-amber-300'}`}>You have <strong>{points.toLocaleString()} points</strong> to spend</p>
              <p className={`text-xs ${isStudy ? 'text-amber-600' : 'text-amber-500'}`}>Complete challenges to earn more points</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REDEEM_OPTIONS.map(item => {
              const canAfford = points >= item.cost
              const isRedeemed = redeemed.includes(item.id)
              return (
                <div key={item.id}
                  className={`rounded-2xl border p-5 transition-all duration-200 ${
                    isRedeemed
                      ? isStudy ? 'bg-green-50 border-green-200' : 'bg-green-900/20 border-green-700/30'
                      : canAfford
                        ? `${s.card} border hover:shadow-lg hover:-translate-y-0.5 cursor-pointer`
                        : `${s.card} border opacity-60`
                  }`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        isRedeemed ? 'bg-green-500' : isStudy ? 'bg-slate-100' : 'bg-slate-700'
                      }`}>
                        {isRedeemed ? '✅' : item.emoji}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${s.text}`}>{item.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${s.pillSoft}`}>{item.duration}</span>
                      </div>
                    </div>
                    <div className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-sm ${
                      isRedeemed ? 'bg-green-500 text-white' : canAfford ? s.pill : isStudy ? 'bg-slate-100 text-slate-400' : 'bg-slate-700 text-slate-500'
                    }`}>
                      {isRedeemed ? '✓' : <><Star size={11} fill="currentColor" /> {item.cost}</>}
                    </div>
                  </div>
                  <p className={`text-xs mb-4 ${s.sub}`}>{item.description}</p>
                  {!isRedeemed && (
                    <button onClick={() => handleRedeem(item)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                        canAfford
                          ? `${s.pill} hover:scale-[1.02] hover:shadow-md`
                          : isStudy ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      }`}>
                      {canAfford ? `Redeem for ${item.cost} pts →` : `Need ${item.cost - points} more pts`}
                    </button>
                  )}
                  {isRedeemed && (
                    <div className={`w-full py-2.5 rounded-xl text-sm font-bold text-center ${isStudy ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'}`}>
                      ✓ Active — {item.duration}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Confirm Redeem Modal */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmItem(null)}>
          <div className={`w-full max-w-sm rounded-3xl shadow-2xl p-6 animate-slide-up ${isStudy ? 'bg-white' : 'bg-slate-800'}`}
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">{confirmItem.emoji}</div>
              <h2 className={`text-xl font-black mb-1 ${s.text}`}>{confirmItem.title}</h2>
              <p className={`text-sm ${s.sub}`}>{confirmItem.description}</p>
            </div>
            <div className={`rounded-2xl p-4 mb-5 text-center ${s.bg}`}>
              <p className={`text-xs ${s.muted} mb-1`}>Points to deduct</p>
              <div className="flex items-center justify-center gap-2">
                <span className={`text-3xl font-black ${s.text}`}>{confirmItem.cost}</span>
                <span className={s.muted}>pts</span>
              </div>
              <p className={`text-xs mt-1 ${s.muted}`}>Balance after: <strong className={s.text}>{points - confirmItem.cost} pts</strong></p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmItem(null)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${isStudy ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>
                Cancel
              </button>
              <button onClick={confirmRedeem}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] ${s.pill}`}>
                Confirm Redeem ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
