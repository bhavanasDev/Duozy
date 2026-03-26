'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; onStepComplete: () => void }

const COLORS = ['#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6', '#EAB308', '#EF4444', '#06B6D4']

interface Drop { x: number; y: number; r: number; color: string; vx: number; vy: number }

export default function ResinSimulation({ step, onStepComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const dropsRef = useRef<Drop[]>([])
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [isPainting, setIsPainting] = useState(false)
  const [coverage, setCoverage] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [done, setDone] = useState(false)
  const selectedColorRef = useRef(selectedColor)
  selectedColorRef.current = selectedColor

  const showFeedback = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 1500)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height

    ctx.fillStyle = '#1a0a2e'
    ctx.fillRect(0, 0, W, H)

    // Draw drops with fluid blending
    dropsRef.current.forEach(drop => {
      const grad = ctx.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, drop.r)
      grad.addColorStop(0, drop.color + 'ff')
      grad.addColorStop(0.6, drop.color + 'cc')
      grad.addColorStop(1, drop.color + '00')
      ctx.beginPath()
      ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.globalCompositeOperation = 'source-over'
      ctx.fill()
    })

    // Swirl effect on existing drops
    dropsRef.current = dropsRef.current.map(d => ({
      ...d,
      x: d.x + d.vx,
      y: d.y + d.vy,
      vx: d.vx * 0.98,
      vy: d.vy * 0.98,
      r: Math.min(d.r + 0.1, 40),
    })).filter(d => d.x > -50 && d.x < W + 50 && d.y > -50 && d.y < H + 50)

    // Coverage estimate
    const total = dropsRef.current.reduce((s, d) => s + Math.PI * d.r * d.r, 0)
    const pct = Math.min(100, Math.round((total / (W * H)) * 100 * 3))
    setCoverage(pct)

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  const addDrop = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (done) return
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    dropsRef.current.push({
      x, y, r: 8 + Math.random() * 12,
      color: selectedColorRef.current,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    })
    showFeedback('Pouring...')

    if (dropsRef.current.length >= 12 && !done) {
      setDone(true)
      showFeedback('Beautiful! 🎨')
      setTimeout(() => { setDone(false); dropsRef.current = []; onStepComplete() }, 1000)
    }
  }, [done, onStepComplete])

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Color palette */}
      <div className="flex gap-2 flex-wrap justify-center">
        {COLORS.map(c => (
          <button key={c} onClick={() => setSelectedColor(c)}
            className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === c ? 'border-white scale-125 shadow-lg' : 'border-transparent'}`}
            style={{ backgroundColor: c, boxShadow: selectedColor === c ? `0 0 12px ${c}` : undefined }} />
        ))}
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas ref={canvasRef} width={320} height={240}
          className="rounded-2xl cursor-crosshair touch-none border border-white/10"
          onMouseDown={addDrop}
          onMouseMove={e => e.buttons === 1 && addDrop(e)}
          onTouchStart={addDrop}
          onTouchMove={addDrop} />
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              style={{ backgroundColor: selectedColor }}>
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Coverage bar */}
        <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: selectedColor }}
            animate={{ width: `${coverage}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <p className="text-white/50 text-xs">
        {coverage < 30 ? 'Click & drag to pour colors on the canvas' : coverage < 70 ? 'Keep pouring...' : 'Almost done! A few more drops'}
      </p>
    </div>
  )
}
