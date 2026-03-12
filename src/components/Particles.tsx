import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ isExploding }: { isExploding: boolean }) {
  const count = 50;
  const particles = useRef<THREE.Points>(null);
  
  const particlesData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        ),
        color: new THREE.Color(Math.random(), Math.random(), Math.random())
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!particles.current) return;
    
    if (isExploding) {
      particles.current.visible = true;
      const positions = particles.current.geometry.attributes.position.array as Float32Array;
      
      particlesData.forEach((p, i) => {
        p.position.add(p.velocity);
        p.velocity.y -= 0.005; // Gravity
        
        positions[i * 3] = p.position.x;
        positions[i * 3 + 1] = p.position.y;
        positions[i * 3 + 2] = p.position.z;
      });
      
      particles.current.geometry.attributes.position.needsUpdate = true;
    } else {
      particles.current.visible = false;
      particlesData.forEach((p) => {
        p.position.set(0, 0, 0);
        p.velocity.set(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        );
      });
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff4444" transparent opacity={0.8} />
    </points>
  );
}
