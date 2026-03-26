'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X, Check, Zap, Target, Info } from 'lucide-react'

const SceneWrapper = dynamic(() => import('./SceneWrapper'), { ssr: false })
const PotteryScene = dynamic(() => import('./PotteryScene'), { ssr: false })
const GuitarScene = dynamic(() => import('./GuitarScene'), { ssr: false })
const ResinScene = dynamic(() => import('./ResinScene'), { ssr: false })

export const ACTIVITIES_3D = [
  {
    id: 'pottery', title: 'Pottery', emoji: '🏺', color: '#D97706',
    gradient: 'from-amber-600 to-orange-700', bgColor: '#1a0a00',
    desc: 'Shape clay on a spinning wheel', difficulty: 'Beginner', duration: '10 min',
    steps: [
      { title: 'Center the Clay', instruction: 'Click the spinning clay to center it on the wheel. Apply steady pressure — feel it become smooth.', action: 'Click the clay', required: 4 },
      { title: 'Open the Clay', instruction: 'Push into the center and drag outward to create the opening of your pot.', action: 'Click to open', required: 4 },
      { title: 'Pull Up the Walls', instruction: 'Squeeze and pull upward. Watch the walls rise with each interaction.', action: 'Click to raise walls', required: 4 },
      { title: 'Shape & Refine', instruction: 'Smooth the surface and refine the shape. Tap different spots to perfect it.', action: 'Click to shape', required: 4 },
      { title: 'Cut & Finish', instruction: 'Drag the wire across the base to free your creation from the wheel!', action: 'Click to cut free', required: 4 },
    ],
  },
  {
    id: 'guitar', title: 'Guitar', emoji: '🎸', color: '#F97316',
    gradient: 'from-orange-600 to-red-700', bgColor: '#0f0800',
    desc: 'Play real chords with sound', difficulty: 'Beginner', duration: '10 min',
    steps: [
      { title: 'Feel the Strings', instruction: 'Click any string to hear its unique sound. Each string has a different pitch.', action: 'Click 3 strings', required: 3 },
      { title: 'Learn C Chord', instruction: 'The dots show finger placement. Click the highlighted strings to play C major.', action: 'Play 3 strings', required: 3 },
      { title: 'Learn G Chord', instruction: 'G major uses all 6 strings. Click each string from low E to high e.', action: 'Play 6 strings', required: 6 },
      { title: 'Learn Am Chord', instruction: 'A minor — emotional and beautiful. Play the highlighted strings.', action: 'Play 4 strings', required: 4 },
      { title: 'Play a Progression', instruction: 'C → G → Am — the backbone of hundreds of hit songs. Play them all!', action: 'Play 6 strings', required: 6 },
    ],
  },
  {
    id: 'resin', title: 'Resin Art', emoji: '🎨', color: '#8B5CF6',
    gradient: 'from-purple-600 to-pink-700', bgColor: '#0d0520',
    desc: 'Pour colors on a 3D canvas', difficulty: 'Intermediate', duration: '10 min',
    steps: [
      { title: 'Prepare the Canvas', instruction: 'Select a color below and click anywhere on the canvas to pour your first drops.', action: 'Pour 3 drops', required: 3 },
      { title: 'Mix the Resin', instruction: 'Pour more drops and watch them spread. The colors blend as they flow together.', action: 'Pour 5 drops', required: 5 },
      { title: 'Add More Colors', instruction: 'Switch colors using the palette below. Each color creates a unique pattern.', action: 'Pour 6 drops', required: 6 },
      { title: 'Pour & Swirl', instruction: 'Pour rapidly across the canvas. The colors flow and merge into beautiful art.', action: 'Pour 8 drops', required: 8 },
      { title: 'Finish Your Masterpiece', instruction: 'Add your final touches. Make it uniquely yours!', action: 'Pour 5 more drops', required: 5 },
    ],
  },
]

const RESIN_COLORS = ['#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6', '#EAB308', '#EF4444', '#06B6D4']

interface ActivityEngineProps {
  activity: typeof ACTIVITIES_3D[0]
  onComplete: () => void
  onExit: () => void
}

export function ActivityEngine({ activity, onComplete, onExit }: ActivityEngineProps) {
  const [step, setStep] = useState(0)
  const [interactionCount, setInteractionCount] = useState(0)
  const [actionDone, setActionDone] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [showTip, setShowTip] = useState(true)
  const [activeString, setActiveString] = useState<number | null>(null)
  const [resinDrops, setResinDrops] = useState<Array<{ x: number; z: number; color: string; scale: number }>>([])
  const [selectedResinColor, setSelectedResinColor] = useState('#8B5CF6')

  const stepData = activity.steps[step]
  const progress = Math.min(interactionCount / stepData.required, 1)

  const handleInteract = useCallback(() => {
    if (actionDone) return
    const newCount = interactionCount + 1
    setInteractionCount(newCount)
    if (newCount >= stepData.required) {
      setActionDone(true)
      setCompletedSteps(s => new Set(s).add(step))
    }
  }, [actionDone, interactionCount, stepData.required, step])

  const handleStringPlayed = useCallback((idx: number) => {
    setActiveString(idx)
    setTimeout(() => setActiveString(null), 700)
    handleInteract()
  }, [handleInteract])

  const handleResinPour = useCallback((x: number, z: number) => {
    setResinDrops(d => [...d, { x, z, color: selectedResinColor, scale: 0.7 + Math.random() * 0.8 }])
    handleInteract()
  }, [selectedResinColor, handleInteract])

  const nextStep = () => {
    if (step < activity.steps.length - 1) {
      setStep(s => s + 1)
      setInteractionCount(0)
      setActionDone(false)
      setShowTip(true)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(s => s - 1)
      setInteractionCount(0)
      setActionDone(completedSteps.has(step - 1))
    }
  }

  return (
    <div className="w-full h-full flex" style={{ background: activity.bgColor }}>

      {/* ── 3D Viewport ── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Scene */}
        <div className="absolute inset-0">
          <SceneWrapper
            cameraPosition={activity.id === 'guitar' ? [0, 0.5, 4.5] : activity.id === 'resin' ? [0, 3.5, 3.5] : [0, 1, 5]}
            environmentPreset={activity.id === 'pottery' ? 'warehouse' : activity.id === 'guitar' ? 'studio' : 'apartment'}
            bgColor={activity.bgColor}
            minPolarAngle={activity.id === 'resin' ? 0.4 : 0.1}
            maxPolarAngle={activity.id === 'resin' ? Math.PI / 2.5 : Math.PI / 1.8}
          >
            {activity.id === 'pottery' && <PotteryScene step={step} onInteract={handleInteract} interactionCount={interactionCount} />}
            {activity.id === 'guitar' && <GuitarScene step={step} onStringPlayed={handleStringPlayed} activeString={activeString} />}
            {activity.id === 'resin' && <ResinScene selectedColor={selectedResinColor} onPour={handleResinPour} drops={resinDrops} />}
          </SceneWrapper>
        </div>

        {/* Top-left: activity badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
          <span className="text-xl">{activity.emoji}</span>
          <div>
            <p className="text-white font-bold text-sm leading-none">{activity.title}</p>
            <p className="text-white/40 text-[10px]">Step {step + 1}/{activity.steps.length}</p>
          </div>
        </div>

        {/* Top-right: exit */}
        <button onClick={onExit}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold">
          <X size={14} /> Exit
        </button>

        {/* Step progress dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {activity.steps.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${
              i < step ? 'w-4 h-2' : i === step ? 'w-6 h-2' : 'w-2 h-2'
            }`} style={{ backgroundColor: i <= step ? activity.color : 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>

        {/* Interaction hint — top center */}
        <AnimatePresence>
          {!actionDone && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-xl">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activity.color }} />
              <span className="text-white text-xs font-bold">👆 {stepData.action}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step complete flash */}
        <AnimatePresence>
          {actionDone && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-green-500/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl shadow-green-500/30">
              <Check size={14} className="text-white" />
              <span className="text-white text-xs font-black">Step Complete! 🎉</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resin color picker — bottom center */}
        {activity.id === 'resin' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Color</span>
            <div className="flex gap-2">
              {RESIN_COLORS.map(c => (
                <button key={c} onClick={() => setSelectedResinColor(c)}
                  className="rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    width: selectedResinColor === c ? '28px' : '22px',
                    height: selectedResinColor === c ? '28px' : '22px',
                    backgroundColor: c,
                    border: selectedResinColor === c ? '2px solid white' : '2px solid transparent',
                    boxShadow: selectedResinColor === c ? `0 0 12px ${c}` : 'none',
                  }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Progress ring — bottom left */}
        <div className="absolute bottom-6 left-6 z-10">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle cx="28" cy="28" r="22" fill="none" stroke={activity.color} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress)}`}
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
            <text x="28" y="33" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
              {Math.round(progress * 100)}%
            </text>
          </svg>
        </div>

        {/* Next step button — bottom right */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {step > 0 && (
            <button onClick={prevStep}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white text-sm font-bold transition-all">
              <ChevronLeft size={14} />
            </button>
          )}
          <motion.button
            onClick={nextStep}
            disabled={!actionDone}
            whileHover={actionDone ? { scale: 1.05 } : {}}
            whileTap={actionDone ? { scale: 0.95 } : {}}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-black transition-all shadow-lg disabled:opacity-40"
            style={actionDone ? { backgroundColor: activity.color, boxShadow: `0 8px 24px ${activity.color}60` } : { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {step === activity.steps.length - 1 ? '🎉 Complete!' : 'Next Step'}
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* ── Side Panel ── */}
      <motion.div
        initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="w-72 flex flex-col border-l border-white/10 overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(24px)' }}>

        {/* Panel header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
              style={{ background: `linear-gradient(135deg, ${activity.color}40, ${activity.color}20)`, border: `1px solid ${activity.color}40` }}>
              {activity.emoji}
            </div>
            <div>
              <h2 className="text-white font-black text-base">{activity.title}</h2>
              <p className="text-white/40 text-xs">{activity.difficulty} · {activity.duration}</p>
            </div>
          </div>
          {/* Step progress bar */}
          <div className="flex gap-1">
            {activity.steps.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                <motion.div className="h-full rounded-full"
                  style={{ backgroundColor: activity.color }}
                  animate={{ width: i < step ? '100%' : i === step ? `${progress * 100}%` : '0%' }}
                  transition={{ duration: 0.3 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-4">

              {/* Step number + title */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ backgroundColor: activity.color }}>
                  {step + 1}
                </div>
                <h3 className="text-white font-black text-lg leading-tight">{stepData.title}</h3>
              </div>

              {/* Instruction */}
              <div className="rounded-2xl p-4 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <p className="text-white/80 text-sm leading-relaxed">{stepData.instruction}</p>
              </div>

              {/* Action target */}
              <div className="rounded-xl p-3.5 border" style={{ background: `${activity.color}12`, borderColor: `${activity.color}35` }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Target size={12} style={{ color: activity.color }} />
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: activity.color }}>Your Goal</span>
                </div>
                <p className="text-white/70 text-xs mb-2.5">{stepData.action}</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ backgroundColor: activity.color }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.25 }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-white/30 text-[10px]">{Math.min(interactionCount, stepData.required)}/{stepData.required}</span>
                  <span className="text-[10px] font-bold" style={{ color: activity.color }}>{Math.round(progress * 100)}%</span>
                </div>
              </div>

              {/* Completed steps */}
              {completedSteps.size > 0 && (
                <div className="space-y-1.5">
                  <p className="text-white/30 text-[10px] uppercase tracking-wider font-bold">Completed</p>
                  {activity.steps.slice(0, step).map((s, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                      <Check size={11} className="text-green-400 shrink-0" />
                      <span className="text-green-400/80 text-xs">{s.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Panel footer nav */}
        <div className="p-4 border-t border-white/10 flex gap-2">
          <button onClick={prevStep} disabled={step === 0}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs font-bold disabled:opacity-20 transition-all">
            <ChevronLeft size={13} /> Back
          </button>
          <motion.button
            onClick={nextStep} disabled={!actionDone}
            whileHover={actionDone ? { scale: 1.02 } : {}}
            whileTap={actionDone ? { scale: 0.97 } : {}}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-black disabled:opacity-30 transition-all"
            style={actionDone ? { backgroundColor: activity.color, boxShadow: `0 4px 16px ${activity.color}50` } : { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {step === activity.steps.length - 1 ? '🎉 Complete!' : 'Next Step'}
            <ChevronRight size={13} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
