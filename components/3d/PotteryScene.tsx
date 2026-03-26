'use client'
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Torus, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface PotterySceneProps {
  step: number
  onInteract: () => void
  interactionCount: number
}

// Pottery wheel base
function WheelBase() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 1.5
  })
  return (
    <group position={[0, -0.8, 0]}>
      {/* Wheel disc */}
      <mesh ref={ref} receiveShadow castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 32]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Spokes */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <mesh key={i} ref={ref} rotation={[0, (i * Math.PI) / 3, 0]}>
          <boxGeometry args={[2.2, 0.06, 0.08]} />
          <meshStandardMaterial color="#7a5230" roughness={0.9} />
        </mesh>
      ))}
      {/* Pedestal */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 1, 16]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
    </group>
  )
}

// The clay pot — shape changes based on step & interactions
function ClayPot({ step, interactionCount }: { step: number; interactionCount: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [distort, setDistort] = useState(0.1)
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1])
  const [color, setColor] = useState('#c2956c')

  // Spin the pot
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2
    }
  })

  // React to step changes
  useEffect(() => {
    const t = Math.min(interactionCount / 4, 1)
    if (step === 0) {
      // Centering — pot becomes more round
      setScale([1 + t * 0.2, 1 + t * 0.1, 1 + t * 0.2])
      setDistort(0.05 + t * 0.05)
      setColor('#c2956c')
    } else if (step === 1) {
      // Opening — pot widens at top
      setScale([1.2 + t * 0.3, 1.1, 1.2 + t * 0.3])
      setDistort(0.1)
      setColor('#b8845a')
    } else if (step === 2) {
      // Pulling walls — pot gets taller
      setScale([1.1, 1.2 + t * 0.6, 1.1])
      setDistort(0.08)
      setColor('#a0714f')
    } else if (step === 3) {
      // Shaping — smooth and refined
      setDistort(0.15 - t * 0.1)
      setScale([1.15, 1.6, 1.15])
      setColor('#8B6347')
    } else if (step === 4) {
      // Cut free — pot lifts slightly
      setScale([1.15, 1.6, 1.15])
      setColor('#7a5230')
    }
  }, [step, interactionCount])

  const height = scale[1] * 0.9
  const radius = scale[0] * 0.45

  return (
    <group position={[0, -0.2, 0]}>
      {/* Main pot body using lathe geometry */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <latheGeometry args={[
          // Profile points for pot shape
          [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(radius * 0.3, 0.05),
            new THREE.Vector2(radius * 0.8, 0.2),
            new THREE.Vector2(radius, 0.5 * height),
            new THREE.Vector2(radius * 0.9, 0.8 * height),
            new THREE.Vector2(radius * 0.7, height),
            new THREE.Vector2(radius * 0.5, height * 1.05),
          ],
          32
        ]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      {/* Rim highlight */}
      <mesh position={[0, height * 0.95, 0]} castShadow>
        <torusGeometry args={[radius * 0.55, 0.04, 8, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.5} />
      </mesh>
    </group>
  )
}

// Water splash particles when interacting
function WaterParticles({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = new Float32Array(30 * 3)
  for (let i = 0; i < 30; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1.5
    positions[i * 3 + 1] = Math.random() * 1.5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5
  }

  useFrame((_, delta) => {
    if (!ref.current || !active) return
    ref.current.rotation.y += delta * 2
    ;(ref.current.material as THREE.PointsMaterial).opacity = active ? 0.6 : 0
  })

  if (!active) return null
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#88ccff" size={0.04} transparent opacity={0.6} />
    </points>
  )
}

export default function PotteryScene({ step, onInteract, interactionCount }: PotterySceneProps) {
  const [isInteracting, setIsInteracting] = useState(false)
  const { gl } = useThree()

  const handlePointerDown = () => {
    setIsInteracting(true)
    onInteract()
  }

  const handlePointerUp = () => setIsInteracting(false)

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2a1a0e" roughness={1} />
      </mesh>

      {/* Pottery wheel */}
      <WheelBase />

      {/* Clay pot — interactive */}
      <mesh
        position={[0, -0.2, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        visible={false}
      >
        <cylinderGeometry args={[1, 1, 2, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <ClayPot step={step} interactionCount={interactionCount} />

      {/* Water particles */}
      <WaterParticles active={isInteracting} />

      {/* Ambient glow under wheel */}
      <pointLight position={[0, -0.9, 0]} intensity={0.8} color="#ff8844" distance={3} />
    </group>
  )
}
