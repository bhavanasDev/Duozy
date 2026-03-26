'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; onStepComplete: () => void }

// Note frequencies
const NOTE_FREQS: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
  'C#4': 277.18, 'D#4': 311.13, 'F#4': 369.99, 'G#4': 415.30, 'A#4': 466.16,
}

function playNote(note: string, duration = 0.8) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const freq = NOTE_FREQS[note]
    if (!freq) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

// Step sequences
const STEP_SEQUENCES: Record<number, { notes: string[]; label: string; description: string }> = {
  0: { notes: ['C4'], label: 'Find Middle C', description: 'Click the highlighted C key' },
  1: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], label: 'C Major Scale', description: 'Play all 8 notes in order' },
  2: { notes: ['C4', 'E4', 'G4'], label: 'C Major Chord', description: 'Press C, E, and G together' },
  3: { notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4'], label: 'Twinkle Twinkle', description: 'Play the melody notes in order' },
  4: { notes: ['C4', 'E4', 'G4', 'C5'], label: 'Full Chord', description: 'Play the complete C major chord' },
}

const WHITE_KEYS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
const BLACK_KEYS: Record<string, { note: string; position: number }> = {
  'C#4': { note: 'C#4', position: 1 },
  'D#4': { note: 'D#4', position: 2 },
  'F#4': { note: 'F#4', position: 4 },
  'G#4': { note: 'G#4', position: 5 },
  'A#4': { note: 'A#4', position: 6 },
}
const NOTE_LABELS: Record<string, string> = {
  C4: 'C', D4: 'D', E4: 'E', F4: 'F', G4: 'G', A4: 'A', B4: 'B', C5: 'C',
}

export default function PianoSimulation({ step, onStepComplete }: Props) {
  const seq = STEP_SEQUENCES[Math.min(step, 4)]
  const [played, setPlayed] = useState<string[]>([])
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const showFeedback = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 1200)
  }

  const handleKey = useCallback((note: string) => {
    if (done) return
    playNote(note)
    setActiveKey(note)
    setTimeout(() => setActiveKey(null), 200)

    const nextExpected = seq.notes[played.length]
    if (note === nextExpected) {
      const newPlayed = [...played, note]
      setPlayed(newPlayed)
      setCorrectCount(c => c + 1)
      showFeedback(newPlayed.length === seq.notes.length ? '🎹 Perfect!' : '✓ Correct!')
      if (newPlayed.length >= seq.notes.length && !done) {
        setDone(true)
        setTimeout(() => { setDone(false); setPlayed([]); setCorrectCount(0); onStepComplete() }, 800)
      }
    } else {
      showFeedback(`Play ${NOTE_LABELS[nextExpected] || nextExpected} next`)
    }
  }, [done, played, seq, onStepComplete])

  const isHighlighted = (note: string) => seq.notes[played.length] === note
  const isPlayed = (note: string) => played.includes(note) && seq.notes.indexOf(note) < played.length

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-center">
        <p className="text-white font-black text-lg">{seq.label}</p>
        <p className="text-white/50 text-sm">{seq.description}</p>
      </div>

      {/* Note sequence indicator */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {seq.notes.map((n, i) => (
          <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
            i < played.length ? 'bg-blue-500 text-white scale-110' :
            i === played.length ? 'bg-blue-300 text-blue-900 animate-pulse' :
            'bg-white/10 text-white/40'
          }`}>
            {NOTE_LABELS[n] || n.replace('4', '').replace('5', '')}
          </div>
        ))}
      </div>

      {/* Piano keyboard */}
      <div className="relative select-none" style={{ width: '100%', maxWidth: '320px', height: '120px' }}>
        {/* White keys */}
        <div className="flex h-full gap-0.5">
          {WHITE_KEYS.map((note, i) => {
            const highlighted = isHighlighted(note)
            const wasPlayed = isPlayed(note)
            const isActive = activeKey === note
            return (
              <motion.button key={note}
                whileTap={{ scaleY: 0.95 }}
                onClick={() => handleKey(note)}
                className={`flex-1 rounded-b-lg border border-gray-300 flex items-end justify-center pb-2 transition-colors relative ${
                  isActive ? 'bg-blue-200' :
                  wasPlayed ? 'bg-blue-100' :
                  highlighted ? 'bg-blue-50 border-blue-400' :
                  'bg-white hover:bg-gray-50'
                }`}
                style={{ boxShadow: highlighted ? '0 0 12px rgba(59,130,246,0.6)' : undefined }}>
                {highlighted && (
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 rounded-b-lg bg-blue-400/20" />
                )}
                <span className={`text-[10px] font-bold ${highlighted ? 'text-blue-600' : 'text-gray-400'}`}>
                  {NOTE_LABELS[note]}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Black keys */}
        <div className="absolute top-0 left-0 right-0 flex pointer-events-none" style={{ height: '65%' }}>
          {WHITE_KEYS.map((_, i) => {
            const blackEntry = Object.values(BLACK_KEYS).find(b => b.position === i + 1)
            if (!blackEntry) return <div key={i} className="flex-1" />
            const note = blackEntry.note
            const highlighted = isHighlighted(note)
            const isActive = activeKey === note
            return (
              <div key={i} className="flex-1 flex justify-center pointer-events-auto" style={{ marginLeft: '-8%', marginRight: '-8%', zIndex: 10 }}>
                <motion.button whileTap={{ scaleY: 0.95 }} onClick={() => handleKey(note)}
                  className={`w-[55%] h-full rounded-b-md transition-colors ${
                    isActive ? 'bg-blue-600' : highlighted ? 'bg-blue-800' : 'bg-gray-900 hover:bg-gray-700'
                  }`}
                  style={{ boxShadow: highlighted ? '0 0 10px rgba(59,130,246,0.8)' : '0 4px 6px rgba(0,0,0,0.5)' }} />
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`font-bold text-sm ${feedback.startsWith('✓') || feedback.startsWith('🎹') ? 'text-blue-300' : 'text-amber-300'}`}>
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-white/40 text-xs">{played.length}/{seq.notes.length} notes played</p>
    </div>
  )
}
