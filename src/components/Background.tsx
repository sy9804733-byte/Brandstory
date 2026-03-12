import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    vec3 color = vec3(0.02, 0.02, 0.05); // Dark base
    
    // Subtle cyberpunk grid/glow
    float grid = sin(p.x * 20.0 + uTime * 0.5) * sin(p.y * 20.0 + uTime * 0.5);
    color += vec3(0.0, 0.4, 0.8) * pow(grid, 10.0) * 0.2;
    
    // Vignette
    color *= 1.0 - smoothstep(0.5, 1.5, d);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function Background() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
