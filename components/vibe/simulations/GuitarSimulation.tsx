'use client'
import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; onStepComplete: () => void }

// String frequencies (Hz) E2 A2 D3 G3 B3 E4
const STRING_FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63]
const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e']
const STRING_COLORS = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6']

// Chord definitions: [fret per string, -1 = muted]
const CHORDS: Record<string, { frets: number[]; fingers: string[]; label: string }> = {
  C: { frets: [-1, 3, 2, 0, 1, 0], fingers: ['', '3', '2', '', '1', ''], label: 'C Major' },
  G: { frets: [3, 2, 0, 0, 0, 3], fingers: ['2', '1', '', '', '', '3'], label: 'G Major' },
  Am: { frets: [-1, 0, 2, 2, 1, 0], fingers: ['', '', '2', '3', '1', ''], label: 'A Minor' },
  Em: { frets: [0, 2, 2, 0, 0, 0], fingers: ['', '2', '3', '', '', ''], label: 'E Minor' },
}

const STEP_CHORDS = ['C', 'G', 'Am', 'Em', 'C']

function playString(freq: number, fret: number) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const actualFreq = freq * Math.pow(2, fret / 12)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.value = actualFreq
    filter.type = 'lowpass'
    filter.frequency.value = 2000
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 1.2)
  } catch {}
}

function playChord(chordKey: string) {
  const chord = CHORDS[chordKey]
  if (!chord) return
  chord.frets.forEach((fret, i) => {
    if (fret >= 0) {
      setTimeout(() => playString(STRING_FREQS[i], fret), i * 40)
    }
  })
}

export default function GuitarSimulation({ step, onStepComplete }: Props) {
  const chordKey = STEP_CHORDS[Math.min(step, STEP_CHORDS.length - 1)]
  const chord = CHORDS[chordKey]
  const [strummed, setStrummed] = useState<Set<number>>(new Set())
  const [isStrumming, setIsStrumming] = useState(false)
  const [strumCount, setStrumCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)

  const showFeedback = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 1500)
  }

  const strumString = useCallback((idx: number) => {
    if (done) return
    playString(STRING_FREQS[idx], chord.frets[idx] >= 0 ? chord.frets[idx] : 0)
    setStrummed(s => new Set(s).add(idx))
    showFeedback(chord.frets[idx] < 0 ? '🔇 Muted string' : `🎵 ${STRING_NAMES[idx]} string`)
  }, [chord, done])

  const strumAll = useCallback(() => {
    if (done) return
    setIsStrumming(true)
    playChord(chordKey)
    chord.frets.forEach((_, i) => {
      setTimeout(() => setStrummed(s => new Set(s).add(i)), i * 40)
    })
    setTimeout(() => {
      setIsStrumming(false)
      setStrummed(new Set())
    }, 600)
    const newCount = strumCount + 1
    setStrumCount(newCount)
    showFeedback(newCount === 1 ? '🎸 Nice!' : newCount === 2 ? '🎸 Sounding good!' : '🎸 Perfect chord!')
    if (newCount >= 3 && !done) {
      setDone(true)
      setTimeout(() => { setDone(false); setStrumCount(0); onStepComplete() }, 800)
    }
  }, [chord, chordKey, done, strumCount, onStepComplete])

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Chord name */}
      <div className="text-center">
        <span className="text-2xl font-black text-white">{chord.label}</span>
        <p className="text-white/50 text-xs mt-1">Strum 3 times to complete</p>
      </div>

      {/* Fretboard */}
      <div className="relative bg-[#3d1f0a] rounded-2xl p-4 border border-amber-900/50 w-full max-w-xs">
        {/* Nut */}
        <div className="h-2 bg-[#f5e6c8] rounded mb-1" />
        {/* Frets */}
        {[1, 2, 3].map(fret => (
          <div key={fret} className="flex gap-0 mb-6 relative">
            <div className="absolute inset-x-0 bottom-0 h-px bg-[#c8a96e] opacity-60" />
            {STRING_NAMES.map((name, si) => {
              const isPressed = chord.frets[si] === fret
              const isMuted = chord.frets[si] < 0
              return (
                <div key={si} className="flex-1 flex justify-center items-end pb-1 relative">
                  {/* String line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px"
                    style={{ backgroundColor: STRING_COLORS[si], opacity: isMuted ? 0.2 : 0.6, width: `${si + 1}px`, transform: 'translateX(-50%)' }} />
                  {isPressed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white z-10 relative"
                      style={{ backgroundColor: STRING_COLORS[si] }}>
                      {chord.fingers[si]}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* String labels + individual strum */}
        <div className="flex gap-0 mt-2">
          {STRING_NAMES.map((name, si) => (
            <button key={si} onClick={() => strumString(si)}
              className={`flex-1 flex flex-col items-center gap-1 py-1 rounded transition-all active:scale-95 ${chord.frets[si] < 0 ? 'opacity-30' : 'hover:opacity-80'}`}>
              <div className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center transition-all ${strummed.has(si) ? 'scale-125' : ''}`}
                style={{ backgroundColor: strummed.has(si) ? STRING_COLORS[si] : 'rgba(255,255,255,0.1)', color: 'white' }}>
                {chord.frets[si] < 0 ? '×' : '○'}
              </div>
              <span className="text-[9px] text-white/40">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Strum button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={strumAll}
        className={`w-full max-w-xs py-4 rounded-2xl font-black text-white text-lg transition-all ${isStrumming ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-400'}`}
        style={{ boxShadow: '0 8px 30px rgba(249,115,22,0.4)' }}>
        🎸 Strum {chord.label}
      </motion.button>

      {/* Strum counter */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all ${i < strumCount ? 'bg-orange-400 scale-125' : 'bg-white/20'}`} />
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-orange-300 font-bold text-sm">{feedback}</motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
