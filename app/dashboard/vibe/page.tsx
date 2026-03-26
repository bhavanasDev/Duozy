'use client'
import { useState, useRef, useEffect } from 'react'
import { Play, Pause, ChevronRight, ChevronLeft, X, Check, Volume2, VolumeX, RotateCcw } from 'lucide-react'

const ACTIVITIES = [
  {
    id: 'pottery',
    title: 'Pottery',
    emoji: '🏺',
    color: '#D97706',
    gradient: 'from-amber-900 via-amber-800 to-orange-900',
    desc: 'Shape clay on a virtual wheel',
    duration: '15 min',
    difficulty: 'Beginner',
    steps: [
      { id: 1, title: 'Center the Clay', instruction: 'Place your hands on the clay and apply gentle pressure to center it on the wheel. Keep your elbows tucked in.', tip: '💡 Wet your hands before touching the clay', action: 'Press & Hold to center', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-with-clay-on-a-pottery-wheel-42954-large.mp4', poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
      { id: 2, title: 'Open the Clay', instruction: 'Push your thumbs into the center of the clay to create an opening. Slowly widen it while the wheel spins.', tip: '💡 Keep the walls even thickness', action: 'Drag outward to open', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-with-clay-on-a-pottery-wheel-42954-large.mp4', poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
      { id: 3, title: 'Pull Up the Walls', instruction: 'Use both hands to pull the clay upward, creating the walls of your pot. Move slowly and steadily.', tip: '💡 Apply equal pressure from both sides', action: 'Swipe up to raise walls', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-with-clay-on-a-pottery-wheel-42954-large.mp4', poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
      { id: 4, title: 'Shape & Refine', instruction: 'Use a rib tool to smooth the surface and refine the shape. Add curves or keep it straight — your choice!', tip: '💡 Work from bottom to top', action: 'Tap to add texture', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-with-clay-on-a-pottery-wheel-42954-large.mp4', poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
      { id: 5, title: 'Cut & Finish', instruction: 'Use a wire tool to cut the pot from the wheel. Your pottery is ready to dry before firing!', tip: '💡 Let it dry for 24 hours before firing', action: 'Swipe to cut free', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-with-clay-on-a-pottery-wheel-42954-large.mp4', poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
    ],
  },
  {
    id: 'resin',
    title: 'Resin Art',
    emoji: '🎨',
    color: '#8B5CF6',
    gradient: 'from-purple-900 via-violet-800 to-pink-900',
    desc: 'Create stunning resin pour art',
    duration: '20 min',
    difficulty: 'Intermediate',
    steps: [
      { id: 1, title: 'Prepare Your Canvas', instruction: 'Set up your canvas on a level surface. Cover the edges with tape to prevent drips. Wear gloves!', tip: '💡 Work in a well-ventilated area', action: 'Tap to set up canvas', video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-resin-art-being-poured-on-a-canvas-42953-large.mp4', poster: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80' },
      { id: 2, title: 'Mix the Resin', instruction: 'Mix equal parts resin and hardener in a cup. Stir slowly for 3 minutes to avoid bubbles.', tip: '💡 Stir in a figure-8 pattern', action: 'Rotate to mix', video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-resin-art-being-poured-on-a-canvas-42953-large.mp4', poster: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80' },
      { id: 3, title: 'Add Colors', instruction: 'Divide the resin into cups and add pigment powders or alcohol inks. Mix each color separately.', tip: '💡 Less is more with pigments', action: 'Tap colors to add', video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-resin-art-being-poured-on-a-canvas-42953-large.mp4', poster: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80' },
      { id: 4, title: 'Pour & Swirl', instruction: 'Pour colors onto the canvas in layers. Use a stick or heat gun to create swirling patterns.', tip: '💡 Tilt the canvas to spread resin', action: 'Drag to pour & swirl', video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-resin-art-being-poured-on-a-canvas-42953-large.mp4', poster: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80' },
      { id: 5, title: 'Cure & Reveal', instruction: 'Cover your artwork and let it cure for 24-48 hours. The result will be a glossy, stunning piece!', tip: '💡 Keep dust away during curing', action: 'Wait for the magic ✨', video: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-resin-art-being-poured-on-a-canvas-42953-large.mp4', poster: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80' },
    ],
  },
  {
    id: 'guitar',
    title: 'Guitar',
    emoji: '🎸',
    color: '#F97316',
    gradient: 'from-orange-900 via-red-800 to-rose-900',
    desc: 'Learn guitar chords & strumming',
    duration: '25 min',
    difficulty: 'Beginner',
    steps: [
      { id: 1, title: 'Hold the Guitar', instruction: 'Sit up straight and rest the guitar on your right leg. Keep the neck angled slightly upward. Relax your shoulders.', tip: '💡 Your fretting hand thumb goes behind the neck', action: 'Adjust posture', video: 'https://assets.mixkit.co/videos/preview/mixkit-playing-guitar-close-up-42952-large.mp4', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
      { id: 2, title: 'Learn C Chord', instruction: 'Place ring finger on 3rd fret A string, middle on 2nd fret D string, index on 1st fret B string. Strum from A string down.', tip: '💡 Press close to the fret for clean sound', action: 'Tap strings to play C', video: 'https://assets.mixkit.co/videos/preview/mixkit-playing-guitar-close-up-42952-large.mp4', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
      { id: 3, title: 'Learn G Chord', instruction: 'Place middle finger on 3rd fret low E, index on 2nd fret A, ring on 3rd fret high E. Strum all 6 strings.', tip: '💡 G chord is one of the most used chords', action: 'Tap strings to play G', video: 'https://assets.mixkit.co/videos/preview/mixkit-playing-guitar-close-up-42952-large.mp4', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
      { id: 4, title: 'Learn Am Chord', instruction: 'Place middle finger on 2nd fret D string, ring on 2nd fret G string, index on 1st fret B string. Strum from A down.', tip: '💡 Am gives a melancholic, emotional sound', action: 'Tap strings to play Am', video: 'https://assets.mixkit.co/videos/preview/mixkit-playing-guitar-close-up-42952-large.mp4', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
      { id: 5, title: 'Strum a Song', instruction: 'Practice switching between C → G → Am → F. This progression is used in hundreds of popular songs!', tip: '💡 Start slow, speed comes with practice', action: 'Strum the progression', video: 'https://assets.mixkit.co/videos/preview/mixkit-playing-guitar-close-up-42952-large.mp4', poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
    ],
  },
  {
    id: 'piano',
    title: 'Piano',
    emoji: '🎹',
    color: '#3B82F6',
    gradient: 'from-blue-900 via-indigo-800 to-blue-900',
    desc: 'Play piano notes & melodies',
    duration: '20 min',
    difficulty: 'Beginner',
    steps: [
      { id: 1, title: 'Hand Position', instruction: 'Curve your fingers naturally as if holding a ball. Place your right thumb on Middle C. Keep wrists relaxed and level.', tip: '💡 Never flatten your fingers on the keys', action: 'Position your hands', video: 'https://assets.mixkit.co/videos/preview/mixkit-piano-being-played-close-up-42951-large.mp4', poster: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
      { id: 2, title: 'Learn the C Scale', instruction: 'Play C-D-E-F-G-A-B-C using fingers 1-2-3-1-2-3-4-5. The thumb tucks under after E to continue smoothly.', tip: '💡 Practice hands separately first', action: 'Tap keys to play scale', video: 'https://assets.mixkit.co/videos/preview/mixkit-piano-being-played-close-up-42951-large.mp4', poster: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
      { id: 3, title: 'Play Chords', instruction: 'A C major chord is C+E+G played together. Press all three keys simultaneously with fingers 1, 3, and 5.', tip: '💡 Chords create harmony and fullness', action: 'Press chord keys together', video: 'https://assets.mixkit.co/videos/preview/mixkit-piano-being-played-close-up-42951-large.mp4', poster: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
      { id: 4, title: 'Simple Melody', instruction: 'Try playing "Twinkle Twinkle": C C G G A A G — F F E E D D C. Each note gets one beat.', tip: '💡 Count 1-2-3-4 as you play', action: 'Play the melody', video: 'https://assets.mixkit.co/videos/preview/mixkit-piano-being-played-close-up-42951-large.mp4', poster: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
      { id: 5, title: 'Both Hands', instruction: 'Play the melody with your right hand while your left hand plays C major chord on beats 1 and 3. This is real piano playing!', tip: '💡 Start very slowly — speed comes naturally', action: 'Play with both hands', video: 'https://assets.mixkit.co/videos/preview/mixkit-piano-being-played-close-up-42951-large.mp4', poster: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
    ],
  },
  {
    id: 'photography',
    title: 'Photography',
    emoji: '📸',
    color: '#10B981',
    gradient: 'from-emerald-900 via-teal-800 to-green-900',
    desc: 'Master composition & lighting',
    duration: '15 min',
    difficulty: 'Beginner',
    steps: [
      { id: 1, title: 'Rule of Thirds', instruction: 'Imagine your frame divided into 9 equal parts by 2 horizontal and 2 vertical lines. Place your subject at the intersections.', tip: '💡 Enable grid lines in your camera settings', action: 'Position subject on grid', video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-in-a-studio-42950-large.mp4', poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80' },
      { id: 2, title: 'Golden Hour Light', instruction: 'Shoot 1 hour after sunrise or before sunset. The warm, soft light creates magical photos with long shadows.', tip: '💡 Face your subject toward the light source', action: 'Adjust light direction', video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-in-a-studio-42950-large.mp4', poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80' },
      { id: 3, title: 'Depth of Field', instruction: 'Use a wide aperture (f/1.8 - f/2.8) to blur the background and make your subject pop. This is called bokeh.', tip: '💡 Get closer to your subject for more blur', action: 'Adjust aperture slider', video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-in-a-studio-42950-large.mp4', poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80' },
      { id: 4, title: 'Leading Lines', instruction: 'Use roads, fences, rivers, or paths to draw the viewer\'s eye into the photo toward your main subject.', tip: '💡 Diagonal lines create more energy than horizontal', action: 'Find leading lines', video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-in-a-studio-42950-large.mp4', poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80' },
      { id: 5, title: 'Take the Shot', instruction: 'Combine all techniques: rule of thirds + good light + depth of field + leading lines. Now take your best shot!', tip: '💡 Take multiple shots and choose the best', action: '📸 Click to capture!', video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-in-a-studio-42950-large.mp4', poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80' },
    ],
  },
]

export default function VibePage() {
  const [selected, setSelected] = useState<typeof ACTIVITIES[0] | null>(null)
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState<string[]>([])
  const [actionDone, setActionDone] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setActionDone(false)
    const v = videoRef.current
    if (!v) return
    v.load()
    v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true })
  }, [selected?.id, step])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = videoMuted
  }, [videoMuted])

  const currentStep = selected?.steps[step]
  const totalSteps = selected?.steps.length || 0
  const progress = totalSteps > 0 ? ((step) / totalSteps) * 100 : 0

  const handleAction = () => {
    setActionDone(true)
  }

  const nextStep = () => {
    if (!selected) return
    if (step < totalSteps - 1) {
      setStep(s => s + 1)
      setActionDone(false)
    } else {
      setCompleted(c => [...c, selected.id])
      setSelected(null)
      setStep(0)
      setActionDone(false)
    }
  }

  const prevStep = () => {
    if (step > 0) { setStep(s => s - 1); setActionDone(false) }
  }

  const restart = () => { setStep(0); setActionDone(false) }

  // Activity selection screen
  if (!selected) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#0A0618] px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-3">✨ Virtual Experiences</h1>
            <p className="text-slate-400 text-lg">Try activities virtually before joining real events</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITIES.map(activity => {
              const isDone = completed.includes(activity.id)
              return (
                <div key={activity.id} onClick={() => { setSelected(activity); setStep(0); setActionDone(false) }}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isDone ? 'ring-2 ring-green-500' : ''}`}>
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient}`} />
                  <div className="absolute inset-0 opacity-20 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${activity.steps[0].poster})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {isDone && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <Check size={16} className="text-white" />
                    </div>
                  )}

                  <div className="relative z-10 p-4 sm:p-6 pt-12 sm:pt-16">
                    <div className="text-5xl mb-3">{activity.emoji}</div>
                    <h3 className="text-white font-black text-xl mb-1">{activity.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{activity.desc}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/15">
                        ⏱ {activity.duration}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold border text-white"
                        style={{ backgroundColor: activity.color + '40', borderColor: activity.color + '60' }}>
                        {activity.difficulty}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/15">
                        {activity.steps.length} steps
                      </span>
                    </div>
                    <div className="w-full py-2.5 rounded-xl font-bold text-sm text-center text-white transition-all group-hover:scale-[1.02]"
                      style={{ backgroundColor: activity.color }}>
                      {isDone ? '✓ Completed — Try Again' : 'Start Experience →'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Activity experience screen
  return (
    <div className="h-[calc(100vh-64px)] relative overflow-hidden bg-black">
      {/* Background video */}
      <video ref={videoRef} key={`${selected.id}-${step}`} autoPlay loop muted={videoMuted} playsInline
        poster={currentStep?.poster}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.05)', transformOrigin: 'center' }}>
        <source src={currentStep?.video} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${selected.color}20 0%, transparent 60%)` }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-6 pt-5 z-20">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => { setSelected(null); setStep(0) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all">
            <X size={14} /> Exit
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm">{selected.emoji} {selected.title}</span>
            <button onClick={restart} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all">
              <RotateCcw size={14} />
            </button>
            <button onClick={() => setVideoMuted(!videoMuted)} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all">
              {videoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          {selected.steps.map((s, i) => (
            <div key={s.id} className="flex-1 h-2 rounded-full overflow-hidden bg-white/20">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: i < step ? '100%' : i === step ? '60%' : '0%', backgroundColor: selected.color }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-white/50 text-xs font-medium">Step {step + 1} of {totalSteps}</span>
          <span className="text-white/50 text-xs font-medium">{Math.round(((step + (actionDone ? 1 : 0.5)) / totalSteps) * 100)}% complete</span>
        </div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
        <div className="w-full max-w-2xl">
          {/* Step card */}
          <div className="bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-lg"
                style={{ backgroundColor: selected.color }}>
                {step + 1}
              </div>
              <div>
                <h2 className="text-white font-black text-2xl">{currentStep?.title}</h2>
                <p className="text-white/40 text-xs">{selected.title} · Step {step + 1}</p>
              </div>
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-5">{currentStep?.instruction}</p>

            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl mb-6"
              style={{ backgroundColor: selected.color + '20', border: `1px solid ${selected.color}40` }}>
              <span className="text-base">{currentStep?.tip.split(' ')[0]}</span>
              <p className="text-sm font-medium" style={{ color: selected.color }}>{currentStep?.tip.substring(currentStep.tip.indexOf(' ') + 1)}</p>
            </div>

            {/* Action button */}
            {!actionDone ? (
              <button onClick={handleAction}
                className="w-full py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                style={{ backgroundColor: selected.color, boxShadow: `0 8px 30px ${selected.color}50` }}>
                {currentStep?.action} ✨
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-green-500/20 border border-green-500/40">
                <Check size={20} className="text-green-400" />
                <span className="text-green-400 font-bold">Done! Ready for next step</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-20">
        <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10">
          <button onClick={prevStep} disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-white/10 bg-white/10 text-white disabled:opacity-30 hover:bg-white/20">
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="text-center">
            <p className="text-white/40 text-xs">{selected.emoji} {selected.title}</p>
            <p className="text-white font-bold text-sm">{currentStep?.title}</p>
          </div>

          <button onClick={nextStep} disabled={!actionDone}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all text-white disabled:opacity-30 hover:scale-105"
            style={actionDone
              ? { backgroundColor: selected.color, borderWidth: '1px', borderStyle: 'solid', borderColor: selected.color }
              : { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)' }}>
            {step === totalSteps - 1 ? 'Complete! 🎉' : 'Next Step'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
