import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shape component
const FloatingShape = ({ 
  position, 
  color, 
  shape = 'box',
  speed = 1 
}: { 
  position: [number, number, number]; 
  color: string; 
  shape?: 'box' | 'sphere' | 'torus' | 'icosahedron';
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'sphere':
        return new THREE.SphereGeometry(0.6, 32, 32);
      case 'torus':
        return new THREE.TorusGeometry(0.5, 0.2, 16, 100);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.7, 0);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [shape]);

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Animated trail sphere
const TrailingSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 2) * 2;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.5) * 1.5;
    }
  });

  return (
    <Trail
      width={2}
      color={color}
      length={5}
      decay={2}
      attenuation={(width) => width}
    >
      <Sphere ref={ref} args={[0.15, 16, 16]} position={position}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </Trail>
  );
};

// Scene content
const SceneContent = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#E6C200" intensity={0.5} />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Floating shapes - gold theme matching portfolio */}
      <FloatingShape position={[-3, 2, 0]} color="#E6C200" shape="box" speed={0.8} />
      <FloatingShape position={[3, -1, -2]} color="#D4A017" shape="sphere" speed={1.2} />
      <FloatingShape position={[-2, -2, 2]} color="#FFD700" shape="torus" speed={0.6} />
      <FloatingShape position={[2, 3, -1]} color="#B8860B" shape="icosahedron" speed={1} />
      <FloatingShape position={[0, 0, -3]} color="#DAA520" shape="box" speed={0.9} />
      
      {/* Trailing spheres */}
      <TrailingSphere position={[0, 0, 0]} color="#E6C200" />
      <TrailingSphere position={[0, 2, 0]} color="#FFD700" />
    </>
  );
};

// Main ThreeScene component
const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
