'use client'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface GuitarSceneProps {
  step: number
  onStringPlayed: (stringIndex: number) => void
  activeString: number | null
}

const STRING_COLORS = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6']
const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e']
const STRING_FREQS = [82.41, 110, 146.83, 196, 246.94, 329.63]

function playStringSound(freq: number) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    filter.type = 'lowpass'
    filter.frequency.value = 1800
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination)
    osc.start(); osc.stop(ctx.currentTime + 1.5)
  } catch {}
}

// Single guitar string mesh
function GuitarString({ index, isActive, onPlay }: { index: number; isActive: boolean; onPlay: () => void }) {
  const ref = useRef<THREE.Mesh>(null)
  const vibRef = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    if (isActive) {
      vibRef.current += delta * 30
      ref.current.scale.x = 1 + Math.sin(vibRef.current) * 0.08 * Math.exp(-vibRef.current * 0.05)
    } else {
      ref.current.scale.x = 1
      vibRef.current = 0
    }
  })

  const x = (index - 2.5) * 0.18
  const color = STRING_COLORS[index]

  return (
    <group position={[x, 0, 0.05]}>
      {/* String */}
      <mesh ref={ref} onPointerDown={onPlay} castShadow>
        <cylinderGeometry args={[0.008 - index * 0.0008, 0.008 - index * 0.0008, 3.2, 8]} />
        <meshStandardMaterial
          color={isActive ? color : '#d4c5a0'}
          emissive={isActive ? color : '#000000'}
          emissiveIntensity={isActive ? 0.8 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Hit zone (invisible, larger for easier clicking) */}
      <mesh onPointerDown={onPlay} visible={false}>
        <cylinderGeometry args={[0.08, 0.08, 3.2, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Glow when active */}
      {isActive && (
        <pointLight position={[0, 0, 0.1]} color={color} intensity={1.5} distance={0.8} />
      )}
    </group>
  )
}

// Guitar body
function GuitarBody() {
  return (
    <group>
      {/* Body lower bout */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.18, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Body upper bout */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.18, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Waist */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.5, 32]} />
        <meshStandardMaterial color="#7a3b10" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Sound hole */}
      <mesh position={[0, -0.1, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 32]} />
        <meshStandardMaterial color="#3d1a00" roughness={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[0.22, 2.2, 0.12]} />
        <meshStandardMaterial color="#6b3a1f" roughness={0.5} />
      </mesh>
      {/* Headstock */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[0.28, 0.5, 0.1]} />
        <meshStandardMaterial color="#5c2e0a" roughness={0.5} />
      </mesh>
      {/* Frets */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <mesh key={i} position={[0, 0.6 + i * 0.28, 0.07]}>
          <boxGeometry args={[0.24, 0.015, 0.02]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Bridge */}
      <mesh position={[0, -0.5, 0.1]}>
        <boxGeometry args={[0.6, 0.06, 0.04]} />
        <meshStandardMaterial color="#3d1a00" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function GuitarScene({ step, onStringPlayed, activeString }: GuitarSceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.15
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05
    }
  })

  const handleStringPlay = (index: number) => {
    playStringSound(STRING_FREQS[index])
    onStringPlayed(index)
  }

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1a1a2e" roughness={1} />
      </mesh>

      <GuitarBody />

      {/* Strings */}
      {STRING_NAMES.map((_, i) => (
        <GuitarString
          key={i}
          index={i}
          isActive={activeString === i}
          onPlay={() => handleStringPlay(i)}
        />
      ))}

      {/* Chord finger dots based on step */}
      {step >= 1 && [
        { pos: [0.18, 0.72, 0.08], color: '#F97316' },
        { pos: [0, 0.88, 0.08], color: '#EAB308' },
        { pos: [-0.18, 0.72, 0.08], color: '#10B981' },
      ].map((dot, i) => (
        <mesh key={i} position={dot.pos as [number, number, number]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={dot.color} emissive={dot.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
