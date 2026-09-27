
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import type { Group } from 'three'

function Rig() {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 1.0 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return (
    <group ref={ref}>
      {/* Core */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[2.4, 0.3, -1]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#155e75" emissiveIntensity={0.9} wireframe />
        </mesh>
      </Float>
      {/* Floating interface panels */}
      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={1.4}>
        <mesh position={[-2.9, 1.2, -1.6]} rotation={[0.1, 0.5, 0.05]}>
          <boxGeometry args={[1.7, 1.05, 0.05]} />
          <meshStandardMaterial color="#0b1526" emissive="#1d4ed8" emissiveIntensity={0.25} transparent opacity={0.85} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[0.2, -1.7, -2.2]} rotation={[-0.08, -0.3, 0]}>
          <boxGeometry args={[2.3, 1.2, 0.05]} />
          <meshStandardMaterial color="#0b1526" emissive="#0891b2" emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={2.1} rotationIntensity={0.4} floatIntensity={1.6}>
        <mesh position={[-1.2, -0.7, -0.6]} rotation={[0.15, 0.9, -0.1]}>
          <boxGeometry args={[0.95, 0.62, 0.05]} />
          <meshStandardMaterial color="#131a2e" emissive="#7c3aed" emissiveIntensity={0.35} transparent opacity={0.85} />
        </mesh>
      </Float>
      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2.15, 0.3, 0]} position={[2.4, 0.3, -1]}>
        <torusGeometry args={[1.7, 0.008, 12, 90]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.5, 0.4]} position={[2.4, 0.3, -1]}>
        <torusGeometry args={[2.15, 0.006, 12, 90]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} transparent opacity={0.4} />
      </mesh>
      {/* Connection nodes */}
      {[[-2, -1.4, -2], [3.4, 1.6, -2.4], [-3.4, 0.2, -1], [1.2, 2.1, -2.8]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Ground grid glow */}
      <gridHelper args={[24, 24, '#1e3a5f', '#0c1a30']} position={[0, -2.6, -4]} />
      <Sparkles count={110} scale={[14, 8, 8]} size={2} speed={0.32} opacity={0.55} color="#67e8f9" position={[0, 0, -2]} />
    </group>
  )
}

export default function HeroScene() {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = typeof window !== 'undefined' && window.innerWidth < 700
  if (reduced) return <div className="hero-fallback" aria-hidden />
  return (
    <div className="hero-canvas" aria-hidden>
      <Canvas
        dpr={mobile ? [1, 1.3] : [1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} intensity={26} color="#7dd3fc" />
        <pointLight position={[-4, -2, 2]} intensity={16} color="#a78bfa" />
        <Rig />
        {!mobile && <Sparkles count={70} scale={10} size={1.4} speed={0.25} opacity={0.4} color="#a5b4fc" />}
      </Canvas>
    </div>
  )
}
