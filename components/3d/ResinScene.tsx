'use client'
import { useRef, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ResinSceneProps {
  selectedColor: string
  onPour: (x: number, z: number) => void
  drops: Array<{ x: number; z: number; color: string; scale: number }>
}

// Single resin drop on canvas
function ResinDrop({ x, z, color, scale }: { x: number; z: number; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const targetScale = useRef(scale)

  useFrame((_, delta) => {
    if (!ref.current) return
    // Animate scale up (fluid spread)
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScale.current, delta * 3)
    ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, targetScale.current, delta * 3)
  })

  return (
    <mesh ref={ref} position={[x, 0.012, z]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 1]}>
      <circleGeometry args={[0.18, 24]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0.2}
      />
    </mesh>
  )
}

// Canvas surface
function Canvas3D({ onPointerDown }: { onPointerDown: (e: any) => void }) {
  return (
    <group>
      {/* Canvas board */}
      <mesh position={[0, 0, 0]} receiveShadow onPointerDown={onPointerDown}>
        <boxGeometry args={[3.5, 0.06, 2.5]} />
        <meshStandardMaterial color="#1a0a2e" roughness={0.9} />
      </mesh>
      {/* Canvas surface */}
      <mesh position={[0, 0.04, 0]} receiveShadow onPointerDown={onPointerDown}>
        <boxGeometry args={[3.2, 0.01, 2.2]} />
        <meshStandardMaterial color="#0d0520" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Frame */}
      {[
        { pos: [0, 0.04, 1.28] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [3.5, 0.08, 0.06] as [number,number,number] },
        { pos: [0, 0.04, -1.28] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [3.5, 0.08, 0.06] as [number,number,number] },
        { pos: [1.78, 0.04, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.06, 0.08, 2.5] as [number,number,number] },
        { pos: [-1.78, 0.04, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.06, 0.08, 2.5] as [number,number,number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos} castShadow>
          <boxGeometry args={f.size} />
          <meshStandardMaterial color="#3d1f0a" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function ResinScene({ selectedColor, onPour, drops }: ResinSceneProps) {
  const { camera, raycaster } = useThree()
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))

  const handlePointerDown = useCallback((e: any) => {
    e.stopPropagation()
    const point = new THREE.Vector3()
    raycaster.ray.intersectPlane(planeRef.current, point)
    // Clamp to canvas bounds
    const x = THREE.MathUtils.clamp(point.x, -1.5, 1.5)
    const z = THREE.MathUtils.clamp(point.z, -1.0, 1.0)
    onPour(x, z)
  }, [onPour, raycaster])

  return (
    <group position={[0, 0.5, 0]} rotation={[-0.3, 0, 0]}>
      {/* Room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1a1a2e" roughness={1} />
      </mesh>

      {/* Canvas */}
      <Canvas3D onPointerDown={handlePointerDown} />

      {/* Resin drops */}
      {drops.map((drop, i) => (
        <ResinDrop key={i} x={drop.x} z={drop.z} color={drop.color} scale={drop.scale} />
      ))}

      {/* Ambient glow from canvas */}
      <pointLight position={[0, 0.5, 0]} intensity={0.3} color="#8B5CF6" distance={4} />
    </group>
  )
}
