import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useTexture } from '@react-three/drei';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

// Mockup function
const generateImage = async (prompt: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return `https://picsum.photos/seed/${prompt}/800/800`;
};

function FloatingFrame({ url }: { url: string | null }) {
  // In a real app, useTexture(url) would load the image
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial color={url ? "white" : "#333"} />
      </Sphere>
    </Float>
  );
}

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    const url = await generateImage(prompt);
    setImageUrl(url);
    setLoading(false);
  };

  const handleShare = () => {
    if (imageUrl) {
      const shareUrl = `${window.location.origin}/art/${Date.now()}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <button onClick={() => navigate('/')} className="mb-6 text-cyan-400">← Back to Home</button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-[60vh] bg-zinc-900 rounded-3xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingFrame url={imageUrl} />
          </Canvas>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="bg-white/10 p-4 rounded-full text-white placeholder-white/50 border border-white/20"
          />
          <div className="flex gap-4">
            <button onClick={handleGenerate} className="bg-cyan-500 px-8 py-4 rounded-full font-bold">
              {loading ? 'Generating...' : 'Generate'}
            </button>
            <button onClick={handleShare} className="bg-white text-black px-8 py-4 rounded-full font-bold">
              Share Art
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
