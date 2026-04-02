import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function Hero() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random particles for the core
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 0.8;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Central Sphere Core */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[0.8, 64, 64]}>
            <meshBasicMaterial color="#050505" />
          </Sphere>
          
          {/* Particle Mesh */}
          <Points positions={particles} stride={3} frustumCulled={false}>
              <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation={true} depthWrite={false} />
          </Points>
        </Float>
        
        {/* Glowing Rings */}
        <Torus args={[1.1, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={5} />
        </Torus>
        <Torus args={[1.2, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#ff8800" emissive="#ff8800" emissiveIntensity={5} />
        </Torus>
      </group>

      {/* Post-processing for Bloom */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
      </EffectComposer>

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff00ff" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#ff8800" />
    </>
  );
}
