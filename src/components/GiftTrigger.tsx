import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import Particles from './Particles';

export default function GiftTrigger() {
  const [isExploding, setIsExploding] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const meshRef = useRef<THREE.Group>(null);
  const startTime = useRef<number>(0);
  const needsStartTime = useRef(false);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    console.log("Gift clicked, attempting to play video and audio...");
    
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
    }
    
    setIsExploding(true);
    needsStartTime.current = true;
  };

  useFrame((state) => {
    if (needsStartTime.current) {
      startTime.current = state.clock.getElapsedTime();
      needsStartTime.current = false;
    }
    
    if (isExploding && meshRef.current) {
      const elapsed = state.clock.getElapsedTime() - startTime.current;
      if (elapsed < 1.5) {
        meshRef.current.position.x = 2.5 + Math.sin(elapsed * 100) * 0.2;
        meshRef.current.position.y = -1.5 + Math.cos(elapsed * 80) * 0.2;
        meshRef.current.rotation.x = Math.sin(elapsed * 50) * 0.5;
        meshRef.current.rotation.y = Math.cos(elapsed * 50) * 0.5;
        meshRef.current.rotation.z = Math.sin(elapsed * 40) * 0.5;
        meshRef.current.scale.setScalar(1 + Math.sin(elapsed * 30) * 0.5);
      } else {
        meshRef.current.position.set(2.5, -1.5, 0);
        meshRef.current.rotation.set(0, 0, 0);
        meshRef.current.scale.setScalar(1);
        setIsExploding(false);
      }
    }
  });

  return (
    <>
      {/* Hidden Video and Audio Players */}
      <Html>
        <video 
          ref={videoRef}
          src="/gift_video.mp4"
          style={{ display: 'none' }} 
        />
        <audio 
          ref={audioRef}
          src="/Arey teri maa ka bhsda phat jayega meme template.mp3"
        />
      </Html>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group
          ref={meshRef}
          position={[2.5, -1.5, 0]}
          onPointerDown={handlePointerDown}
        >
          <Particles isExploding={isExploding} />
          
          {/* Gift Box Body */}
          <mesh castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff4444" />
          </mesh>

          {/* Ribbon Vertical */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 1.05, 1.05]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>

          {/* Ribbon Horizontal */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.05, 0.2, 1.05]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>

          {/* Ribbon Top (Bow) */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>

          {/* Floating Text */}
          <Text
            position={[0, 1, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {isExploding ? "SURPRISE!" : "CLICK ME"}
          </Text>
        </group>
      </Float>
    </>
  );
}
