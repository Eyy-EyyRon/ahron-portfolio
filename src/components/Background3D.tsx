import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Sun - Center of solar system
const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial
        color="#FFD700"
        toneMapped={false}
      />
      {/* Glow effect */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFAA00"
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>
    </mesh>
  );
};

// Planet with orbit
interface PlanetProps {
  color: string;
  size: number;
  distance: number;
  orbitSpeed: number;
  rotationSpeed: number;
  hasRing?: boolean;
  moons?: number;
}

const Planet = ({ color, size, distance, orbitSpeed, rotationSpeed, hasRing, moons = 0 }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const moonRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Orbit around sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * orbitSpeed;
    }
    
    // Planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y = time * rotationSpeed;
    }
    
    // Moons orbit around planet
    moonRefs.current.forEach((moon, index) => {
      if (moon) {
        const moonTime = time * (0.5 + index * 0.2);
        const moonDistance = size + 0.8 + index * 0.3;
        moon.position.x = Math.cos(moonTime) * moonDistance;
        moon.position.z = Math.sin(moonTime) * moonDistance;
      }
    });
  });

  return (
    <group ref={orbitRef}>
      {/* Position planet at distance from sun */}
      <group position={[distance, 0, 0]}>
        {/* Planet body */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        
        {/* Ring (like Saturn) */}
        {hasRing && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2, 64]} />
            <meshBasicMaterial
              color="#C0C0C0"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {/* Moons */}
        {Array.from({ length: moons }).map((_, i) => (
          <mesh key={i} ref={(el) => { if (el) moonRefs.current[i] = el; }}>
            <sphereGeometry args={[size * 0.2, 16, 16]} />
            <meshStandardMaterial
              color="#CCCCCC"
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Orbit path visualization */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Asteroid belt
const AsteroidBelt = () => {
  const asteroidsRef = useRef<THREE.Points>(null);
  
  const count = 300;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Gray/white colors
      col[i * 3] = 0.5 + Math.random() * 0.5;
      col[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      col[i * 3 + 2] = 0.5 + Math.random() * 0.5;
    }
    
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={asteroidsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} />
    </points>
  );
};

// Solar System Scene
const SolarSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current) {
      // Subtle mouse parallax
      groupRef.current.rotation.x = mouseRef.current.y * 0.1;
      groupRef.current.rotation.z = mouseRef.current.x * 0.05;
    }
  });

  // Track mouse
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <Sun />
      
      {/* Mercury - closest, fastest */}
      <Planet
        color="#A0A0A0"
        size={0.3}
        distance={2.5}
        orbitSpeed={1.5}
        rotationSpeed={0.5}
      />
      
      {/* Venus */}
      <Planet
        color="#E8A838"
        size={0.45}
        distance={3.2}
        orbitSpeed={1.1}
        rotationSpeed={0.3}
      />
      
      {/* Earth with moon */}
      <Planet
        color="#4A90D9"
        size={0.5}
        distance={4}
        orbitSpeed={0.8}
        rotationSpeed={1}
        moons={1}
      />
      
      {/* Mars */}
      <Planet
        color="#C1440E"
        size={0.35}
        distance={4.8}
        orbitSpeed={0.65}
        rotationSpeed={0.9}
      />
      
      {/* Asteroid Belt */}
      <AsteroidBelt />
      
      {/* Jupiter - largest */}
      <Planet
        color="#D4A574"
        size={0.9}
        distance={7}
        orbitSpeed={0.4}
        rotationSpeed={2}
        moons={2}
      />
      
      {/* Saturn with rings */}
      <Planet
        color="#F4D03F"
        size={0.75}
        distance={8.5}
        orbitSpeed={0.3}
        rotationSpeed={1.5}
        hasRing={true}
        moons={1}
      />
      
      {/* Uranus */}
      <Planet
        color="#7DE3F4"
        size={0.55}
        distance={10}
        orbitSpeed={0.22}
        rotationSpeed={0.8}
      />
      
      {/* Neptune */}
      <Planet
        color="#5B7CFF"
        size={0.5}
        distance={11.5}
        orbitSpeed={0.18}
        rotationSpeed={0.9}
      />
    </group>
  );
};

// Main scene
const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" distance={50} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Solar System */}
      <SolarSystem />
    </>
  );
};

// Main component
const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 8, 18], fov: 50, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0e1a 50%, #000000 100%)' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
