import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#0088ff"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#004488"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      {/* Decorative rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>

      <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#ff00ff" />
    </group>
  );
}
