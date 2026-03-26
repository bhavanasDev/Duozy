'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'

interface SceneWrapperProps {
  children: React.ReactNode
  cameraPosition?: [number, number, number]
  enableOrbit?: boolean
  minPolarAngle?: number
  maxPolarAngle?: number
  environmentPreset?: 'studio' | 'city' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'lobby' | 'park'
  shadows?: boolean
  bgColor?: string
}

export default function SceneWrapper({
  children,
  cameraPosition = [0, 2, 5],
  enableOrbit = true,
  minPolarAngle = 0.2,
  maxPolarAngle = Math.PI / 2,
  environmentPreset = 'studio' as const,
  shadows = true,
}: SceneWrapperProps) {
  return (
    <Canvas
      shadows={shadows}
      gl={{ antialias: true, alpha: false }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#ffd4a0" />

      {/* Environment */}
      <Environment preset={environmentPreset} />

      {/* Floor shadow */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Orbit controls */}
      {enableOrbit && (
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
          minDistance={2}
          maxDistance={8}
          dampingFactor={0.08}
          enableDamping
        />
      )}

      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  )
}
