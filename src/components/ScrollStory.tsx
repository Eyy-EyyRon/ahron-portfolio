import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Scroll progress hook
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [section, setSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);

      const sections = ['home', 'about', 'projects', 'explore', 'journal', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, section };
};

// Simple line using Three.js directly
const SimpleLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [start, end]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color, 
      transparent: true, 
      opacity: 0.3 
    });
  }, [color]);

  return <primitive ref={ref} object={new THREE.Line(geometry, material)} />;
};

// Animated floating objects based on scroll
const ScrollFloatingShapes = ({ scrollProgress, section }: { scrollProgress: number; section: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      groupRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.5 - scrollProgress * 2;
    }
  });

  const themeColors = useMemo(() => {
    switch (section) {
      case 'home': return ['#E6C200', '#D4A017', '#FFD700'];
      case 'about': return ['#00CED1', '#20B2AA', '#48D1CC'];
      case 'projects': return ['#FF6B6B', '#4ECDC4', '#FFE66D'];
      case 'explore': return ['#95E1D3', '#F38181', '#AA96DA'];
      case 'journal': return ['#9B59B6', '#8E44AD', '#BB8FCE'];
      case 'contact': return ['#E6C200', '#D4A017', '#FFD700'];
      default: return ['#E6C200', '#D4A017', '#FFD700'];
    }
  }, [section]);

  // Calculate orbiter positions
  const orbiterPositions = useMemo(() => {
    return [0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2 + scrollProgress * Math.PI;
      const radius = 4 + scrollProgress * 2;
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        index: i
      };
    });
  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial 
            color={themeColors[0]} 
            roughness={0.2} 
            metalness={0.9}
            emissive={themeColors[0]}
            emissiveIntensity={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Orbiting smaller shapes */}
      {orbiterPositions.map((pos, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[pos.x, Math.sin(timeRef.current + i) * 0.5, pos.z]}>
            {i % 2 === 0 ? (
              <boxGeometry args={[0.6, 0.6, 0.6]} />
            ) : (
              <octahedronGeometry args={[0.4, 0]} />
            )}
            <meshStandardMaterial 
              color={themeColors[i % 3]} 
              roughness={0.3}
              metalness={0.8}
              emissive={themeColors[i % 3]}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Connecting lines between center and orbiters */}
      {orbiterPositions.map((pos, i) => (
        <SimpleLine
          key={`line-${i}`}
          start={[0, 0, -5]}
          end={[pos.x, Math.sin(timeRef.current + i) * 0.5, pos.z]}
          color={themeColors[0]}
        />
      ))}
    </group>
  );
};

// Particle trail that follows scroll
const ScrollTrail = ({ scrollProgress }: { scrollProgress: number }) => {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 2, 0),
      new THREE.Vector3(-2, -1 + scrollProgress * 3, -2),
      new THREE.Vector3(2, 1 - scrollProgress * 2, -3),
      new THREE.Vector3(5, 0 + scrollProgress * 2, -1),
    ]);
    return curve.getPoints(50);
  }, [scrollProgress]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color: '#E6C200', 
      transparent: true, 
      opacity: 0.6 
    });
  }, []);

  const currentPoint = points[Math.floor(scrollProgress * 49)] || points[0];

  return (
    <>
      <primitive object={new THREE.Line(lineGeometry, lineMaterial)} />
      <Trail width={3} color="#FFD700" length={8} decay={1}>
        <mesh position={currentPoint}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      </Trail>
    </>
  );
};

// Dynamic grid floor
const GridFloor = ({ scrollProgress }: { scrollProgress: number }) => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.z = -10 + scrollProgress * 5;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#E6C200', '#1a1a2e']}
      position={[0, -5, -10]}
    />
  );
};

// Section indicator particles
const SectionParticles = ({ section }: { section: string }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const themeColors: Record<string, THREE.Color> = {
      home: new THREE.Color('#E6C200'),
      about: new THREE.Color('#00CED1'),
      projects: new THREE.Color('#FF6B6B'),
      explore: new THREE.Color('#95E1D3'),
      journal: new THREE.Color('#9B59B6'),
      contact: new THREE.Color('#E6C200'),
    };

    const baseColor = themeColors[section] || themeColors.home;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const variation = new THREE.Color(baseColor);
      variation.offsetHSL(0, 0, (Math.random() - 0.5) * 0.3);
      col[i * 3] = variation.r;
      col[i * 3 + 1] = variation.g;
      col[i * 3 + 2] = variation.b;
    }
    
    return [pos, col];
  }, [section]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
  }, []);

  return <points ref={particlesRef} geometry={geometry} material={material} />;
};

// Main scene content
const SceneContent = () => {
  const { scrollProgress, section } = useScrollProgress();
  const { camera } = useThree();

  useFrame(() => {
    camera.position.y = -scrollProgress * 3;
    camera.position.z = 8 + scrollProgress * 2;
    camera.lookAt(0, -scrollProgress * 2, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#E6C200" intensity={0.5} />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={500} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5 + scrollProgress}
      />
      
      <ScrollFloatingShapes scrollProgress={scrollProgress} section={section} />
      <ScrollTrail scrollProgress={scrollProgress} />
      <GridFloor scrollProgress={scrollProgress} />
      <SectionParticles section={section} />
    </>
  );
};

// Section indicator dots
const SectionDots = () => {
  const { section } = useScrollProgress();
  const sections = ['home', 'about', 'projects', 'explore', 'journal', 'contact'];

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-2">
      {sections.map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              section === s ? 'bg-gold w-4' : 'bg-slate/50'
            }`}
          />
          <span className={`text-xs transition-all duration-300 ${
            section === s ? 'text-gold opacity-100' : 'text-slate opacity-0'
          }`}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
};

// Main component
const ScrollStory = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
      <SectionDots />
    </div>
  );
};

export default ScrollStory;
