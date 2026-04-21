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
      {/* Glow effect - dimmed */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#B8860B"
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#8B4513"
          transparent
          opacity={0.08}
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

// Individual asteroid mesh
const AsteroidMesh = ({ angle, radius, size, speed }: { angle: number; radius: number; size: number; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = useMemo(() => (Math.random() - 0.5) * 0.8, []);
  const rotationAxis = useMemo(() => [
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ], []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Orbit around sun
      meshRef.current.position.x = Math.cos(angle + time * speed) * radius;
      meshRef.current.position.z = Math.sin(angle + time * speed) * radius;
      meshRef.current.position.y = initialY + Math.sin(time * 0.5 + angle) * 0.1;
      
      // Self rotation
      meshRef.current.rotation.x += rotationAxis[0] * 0.01;
      meshRef.current.rotation.y += rotationAxis[1] * 0.01;
      meshRef.current.rotation.z += rotationAxis[2] * 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color="#6B6B6B"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

// Asteroid belt with both particles and meshes
const AsteroidBelt = () => {
  const asteroidsRef = useRef<THREE.Points>(null);
  
  const count = 300;
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      col[i * 3] = 0.5 + Math.random() * 0.5;
      col[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      col[i * 3 + 2] = 0.5 + Math.random() * 0.5;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    
    return geo;
  }, []);

  const largeAsteroids = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      angle: (i / 15) * Math.PI * 2 + Math.random() * 0.5,
      radius: 5.5 + Math.random() * 2.5,
      size: 0.08 + Math.random() * 0.12,
      speed: 0.015 + Math.random() * 0.01
    }));
  }, []);

  useFrame((state) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <points ref={asteroidsRef} geometry={geometry}>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} />
      </points>
      
      {largeAsteroids.map((asteroid) => (
        <AsteroidMesh
          key={asteroid.id}
          angle={asteroid.angle}
          radius={asteroid.radius}
          size={asteroid.size}
          speed={asteroid.speed}
        />
      ))}
    </>
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

// Shooting Star
const ShootingStar = () => {
  const starRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const startTimeRef = useRef(Date.now());
  
  const trailGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(20 * 3);
    for (let i = 0; i < 20; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!starRef.current || !trailRef.current) return;
    
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const cycleDuration = 8;
    const progress = (elapsed % cycleDuration) / cycleDuration;
    
    if (progress > 0.3) {
      starRef.current.visible = false;
      trailRef.current.visible = false;
      return;
    }
    
    starRef.current.visible = true;
    trailRef.current.visible = true;
    
    const normalizedProgress = progress / 0.3;
    const x = 15 - normalizedProgress * 30;
    const y = 8 - normalizedProgress * 5;
    const z = -10;
    
    starRef.current.position.set(x, y, z);
    
    const positions = trailRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 19; i > 0; i--) {
      positions[i * 3] = positions[(i - 1) * 3];
      positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
      positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
    }
    positions[0] = x;
    positions[1] = y;
    positions[2] = z;
    trailRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <mesh ref={starRef} visible={false}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <points ref={trailRef} visible={false} geometry={trailGeometry}>
        <pointsMaterial size={0.1} color="#FFFFFF" transparent opacity={0.8} />
      </points>
    </>
  );
};

// UFO - Simple flyby
const UFO = () => {
  const ufoRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef(Date.now());
  
  useFrame(() => {
    if (!ufoRef.current) return;
    
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const cycleDuration = 20; // UFO every 20 seconds
    const progress = (elapsed % cycleDuration) / cycleDuration;
    
    // Only show for part of the cycle
    if (progress > 0.4) {
      ufoRef.current.visible = false;
      return;
    }
    
    ufoRef.current.visible = true;
    
    // Fly across the sky
    const normalizedProgress = progress / 0.4;
    const x = -20 + normalizedProgress * 40; // Left to right
    const y = 8 + Math.sin(normalizedProgress * Math.PI) * 2; // Arc motion
    const z = -12;
    
    ufoRef.current.position.set(x, y, z);
    ufoRef.current.rotation.y = normalizedProgress * Math.PI * 2; // Spin
  });

  return (
    <group ref={ufoRef} visible={false}>
      {/* UFO Saucer */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* UFO Dome */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#60FF60" transparent opacity={0.6} />
      </mesh>
      {/* Lights */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.5, -0.1, Math.sin(angle) * 0.5]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#FF0000" : "#00FF00"} />
          </mesh>
        );
      })}
    </group>
  );
};

// Milky Way Galaxy - spiral arm of stars
const MilkyWay = () => {
  const galaxyRef = useRef<THREE.Points>(null);
  
  const count = 2000;
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 6;
      const radius = 20 + (i / count) * 30;
      const spiralOffset = angle * 2;
      const thickness = (Math.random() - 0.5) * 3;
      
      pos[i * 3] = Math.cos(spiralOffset) * radius + (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = thickness;
      pos[i * 3 + 2] = Math.sin(spiralOffset) * radius - 40;
      
      const brightness = 0.5 + Math.random() * 0.5;
      col[i * 3] = brightness * (0.8 + Math.random() * 0.2);
      col[i * 3 + 1] = brightness * (0.9 + Math.random() * 0.1);
      col[i * 3 + 2] = brightness;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    
    return geo;
  }, []);

  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={galaxyRef} geometry={geometry}>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} />
    </points>
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
      
      {/* Milky Way Galaxy - far background */}
      <MilkyWay />
      
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
      
      
      {/* Shooting star */}
      <ShootingStar />
      
      {/* UFO passing by */}
      <UFO />
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
