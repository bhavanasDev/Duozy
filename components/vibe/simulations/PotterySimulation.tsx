'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; onStepComplete: () => void }

const STEPS = [
  { instruction: 'Press and hold the clay to center it on the spinning wheel', hint: 'Hold your mouse/finger on the clay', action: 'center' },
  { instruction: 'Drag outward from the center to open the clay', hint: 'Click center then drag outward', action: 'open' },
  { instruction: 'Drag upward along the walls to pull them higher', hint: 'Drag from bottom to top on the walls', action: 'pull' },
  { instruction: 'Tap different spots to shape and smooth the surface', hint: 'Click around the pot to refine it', action: 'shape' },
  { instruction: 'Drag the wire across the base to cut the pot free', hint: 'Drag horizontally across the bottom', action: 'cut' },
]

export default function PotterySimulation({ step, onStepComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const wheelAngle = useRef(0)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const [potShape, setPotShape] = useState({ height: 60, width: 50, openness: 0, smoothness: 0, cut: false })
  const [interactions, setInteractions] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)
  const potRef = useRef(potShape)
  potRef.current = potShape

  const currentAction = STEPS[Math.min(step, STEPS.length - 1)]?.action

  const showFeedback = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 1800)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2 + 20

    ctx.clearRect(0, 0, W, H)

    // Wheel
    wheelAngle.current += 0.03
    ctx.save()
    ctx.translate(cx, cy + potRef.current.height / 2 + 10)
    ctx.beginPath()
    ctx.ellipse(0, 0, 90, 18, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#5c3d2e'
    ctx.fill()
    // Wheel spokes
    for (let i = 0; i < 6; i++) {
      const a = wheelAngle.current + (i * Math.PI) / 3
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(a) * 80, Math.sin(a) * 14)
      ctx.strokeStyle = '#7a5230'
      ctx.lineWidth = 3
      ctx.stroke()
    }
    ctx.restore()

    // Clay pot
    const pot = potRef.current
    if (pot.cut) {
      // Floating pot
      ctx.save()
      ctx.translate(cx, cy - pot.height / 2 - 20)
      drawPot(ctx, pot, true)
      ctx.restore()
    } else {
      ctx.save()
      ctx.translate(cx, cy)
      drawPot(ctx, pot, false)
      ctx.restore()
    }

    // Spinning lines on pot
    if (!pot.cut) {
      ctx.save()
      ctx.translate(cx, cy)
      const w = pot.width / 2
      for (let i = 0; i < 5; i++) {
        const y = -pot.height / 2 + (i / 4) * pot.height
        ctx.beginPath()
        ctx.ellipse(0, y, w * (0.6 + 0.4 * Math.sin(i)), 4, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(180,120,80,${0.2 + i * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()
    }

    animRef.current = requestAnimationFrame(draw)
  }, [])

  function drawPot(ctx: CanvasRenderingContext2D, pot: typeof potShape, floating: boolean) {
    const w = pot.width / 2
    const h = pot.height / 2
    const open = pot.openness

    const grad = ctx.createLinearGradient(-w, -h, w, h)
    grad.addColorStop(0, '#c2956c')
    grad.addColorStop(0.5, '#a0714f')
    grad.addColorStop(1, '#7a5230')

    ctx.beginPath()
    ctx.moveTo(-w * 0.3, h)
    ctx.bezierCurveTo(-w * 0.3, h, -w * (1 + open * 0.3), h * 0.3, -w * (0.8 + open * 0.2), -h * 0.5)
    ctx.bezierCurveTo(-w * (0.6 + open * 0.1), -h, w * (0.6 + open * 0.1), -h, w * (0.8 + open * 0.2), -h * 0.5)
    ctx.bezierCurveTo(w * (1 + open * 0.3), h * 0.3, w * 0.3, h, w * 0.3, h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()
    ctx.strokeStyle = '#5c3d2e'
    ctx.lineWidth = 2
    ctx.stroke()

    // Rim
    ctx.beginPath()
    ctx.ellipse(0, -h * 0.5, w * (0.8 + open * 0.2) * 0.9, 8, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#b8845a'
    ctx.fill()
  }

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  const handleInteract = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (done) return
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left - canvas.width / 2
    const y = clientY - rect.top - canvas.height / 2

    const newCount = interactions + 1
    setInteractions(newCount)

    if (currentAction === 'center') {
      setPotShape(p => ({ ...p, width: Math.min(p.width + 3, 70), height: Math.min(p.height + 2, 80) }))
      showFeedback('Centering... keep going!')
    } else if (currentAction === 'open') {
      setPotShape(p => ({ ...p, openness: Math.min(p.openness + 0.15, 1) }))
      showFeedback('Opening the clay...')
    } else if (currentAction === 'pull') {
      setPotShape(p => ({ ...p, height: Math.min(p.height + 5, 120) }))
      showFeedback('Walls rising!')
    } else if (currentAction === 'shape') {
      setPotShape(p => ({ ...p, smoothness: Math.min(p.smoothness + 1, 5), width: p.width + (Math.random() - 0.5) * 4 }))
      showFeedback('Shaping...')
    } else if (currentAction === 'cut') {
      setPotShape(p => ({ ...p, cut: true }))
      showFeedback('Cut free! 🎉')
    }

    if (newCount >= 4 && !done) {
      setDone(true)
      setTimeout(() => { setDone(false); setInteractions(0); onStepComplete() }, 800)
    }
  }, [currentAction, done, interactions, onStepComplete])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative">
        <canvas ref={canvasRef} width={320} height={280}
          className="rounded-2xl cursor-pointer touch-none"
          style={{ background: 'radial-gradient(ellipse at center, #2d1b0e 0%, #1a0f08 100%)' }}
          onMouseDown={handleInteract}
          onTouchStart={handleInteract} />
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Progress dots */}
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < interactions ? 'bg-amber-400 scale-125' : 'bg-white/20'}`} />
        ))}
      </div>
      <p className="text-white/50 text-xs">{currentAction === 'cut' ? 'Drag across the base' : `Click ${Math.max(0, 4 - interactions)} more times`}</p>
    </div>
  )
}
