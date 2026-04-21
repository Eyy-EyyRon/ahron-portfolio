import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Pane } from 'tweakpane';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import Three.js WebGPU renderer if available, fallback to WebGL
let WebGPURenderer: typeof THREE.WebGLRenderer | null = null;
try {
  // Dynamic import for WebGPU (if available in the Three.js version)
  WebGPURenderer = THREE.WebGLRenderer; // Fallback for now
} catch {
  WebGPURenderer = null;
}

interface ScrollState {
  progress: number;
  isScrolling: boolean;
  mouseX: number;
  mouseY: number;
}

const Scrollytelling = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const wireframeMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const rafIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const hotspotsRef = useRef<THREE.Mesh[]>([]);
  const isHoveringRef = useRef(false);
  const tweakpaneRef = useRef<Pane | null>(null);
  const sceneParamsRef = useRef({
    wireframe: false,
    ambientColor: '#ffffff',
    ambientIntensity: 0.4,
    rotationSpeed: 1,
    materialType: 'glass'
  });
  const isActiveRef = useRef(true);
  const needsUpdateRef = useRef(true);

  // Optimized state tracking without React re-renders
  const scrollStateRef = useRef<ScrollState>({
    progress: 0,
    isScrolling: false,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // ==========================================
    // 1. SCENE SETUP
    // ==========================================
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer - WebGPU with WebGL2 fallback
    let renderer: THREE.WebGLRenderer;
    try {
      // Try WebGPU first
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgpu');
      
      if (gl && WebGPURenderer) {
        renderer = new WebGPURenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
      } else {
        throw new Error('WebGPU not available');
      }
    } catch {
      // Fallback to WebGL2
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ==========================================
    // 2. LOADERS SETUP
    // ==========================================
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setKTX2Loader(ktx2Loader);

    // ==========================================
    // 3. LIGHTING & ENVIRONMENT
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xE6C200, 2, 20);
    pointLight1.position.set(-5, 2, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00CED1, 2, 20);
    pointLight2.position.set(5, -2, 5);
    scene.add(pointLight2);

    // HDRI Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Load HDRI from a reliable CDN
    const rgbeLoader = new RGBELoader();
    rgbeLoader.setPath('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/');
    
    // Using a studio HDRI for realistic reflections
    rgbeLoader.load('studio_small_09_1k.hdr', (texture: THREE.DataTexture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      scene.background = null; // Keep transparent
      texture.dispose();
      pmremGenerator.dispose();
      needsUpdateRef.current = true;
    }, undefined, (error: unknown) => {
      console.warn('HDRI load failed, using fallback lighting:', error);
    });

    // ==========================================
    // 4. MATERIALS
    // ==========================================
    // Glass material (Phase 1-2)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.5,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
      transparent: true,
      opacity: 1,
    });
    materialRef.current = glassMaterial;

    // Wireframe/Glowing material (Phase 3)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE6C200,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    wireframeMaterialRef.current = wireframeMaterial;

    // ==========================================
    // 5. LOAD 3D MODEL (Abstract Tech Sphere)
    // ==========================================
    // Using a placeholder GLB from Three.js examples
    const modelUrl = 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf';
    
    // Fallback: Create procedural abstract sphere if model fails
    const createProceduralSphere = (): THREE.Group => {
      const group = new THREE.Group();
      
      const geometry = new THREE.IcosahedronGeometry(1.5, 4);
      const mesh = new THREE.Mesh(geometry, glassMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      
      // Add inner glow
      const innerGeometry = new THREE.IcosahedronGeometry(1.3, 2);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xE6C200,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      group.add(innerMesh);
      
      return group;
    };

    gltfLoader.load(
      modelUrl,
      (gltf: GLTF) => {
        const model = gltf.scene;
        
        // Scale and center the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
        // Apply glass material to all meshes
        model.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh & { material: THREE.Material };
            mesh.material = glassMaterial;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });
        
        scene.add(model);
        modelRef.current = model;
        needsUpdateRef.current = true;
      },
      (progress: { loaded: number; total: number }) => {
        console.log('Loading model:', (progress.loaded / progress.total * 100) + '%');
      },
      (error: unknown) => {
        console.warn('Model load failed, using procedural sphere:', error);
        const sphere = createProceduralSphere();
        scene.add(sphere);
        modelRef.current = sphere;
        needsUpdateRef.current = true;
      }
    );

    // ==========================================
    // 6. LENIS SMOOTH SCROLL
    // ==========================================
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ==========================================
    // 7. GSAP SCROLLTRIGGER ANIMATION (4 PHASES)
    // ==========================================
    const createScrollAnimation = () => {
      if (!modelRef.current) {
        setTimeout(createScrollAnimation, 100);
        return;
      }

      const model = modelRef.current;

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            scrollStateRef.current.progress = self.progress;
            scrollStateRef.current.isScrolling = true;
            needsUpdateRef.current = true;
            
            // Reset scrolling flag after delay
            clearTimeout((window as unknown as { scrollTimeout: ReturnType<typeof setTimeout> }).scrollTimeout);
            (window as unknown as { scrollTimeout: ReturnType<typeof setTimeout> }).scrollTimeout = setTimeout(() => {
              scrollStateRef.current.isScrolling = false;
            }, 150);
          },
        },
      });

      // PHASE 1 (0-25%): Scale up from 0 to 1.2
      tl.fromTo(model.scale, 
        { x: 0, y: 0, z: 0 },
        { x: 1.2, y: 1.2, z: 1.2, ease: 'power2.out' },
        0
      );

      // PHASE 2 (25-50%): Rotate 180° and move right
      tl.to(model.rotation, {
        y: Math.PI,
        ease: 'none',
      }, 0.25);

      tl.to(model.position, {
        x: 3,
        ease: 'power2.inOut',
      }, 0.25);

      // PHASE 3 (50-75%): Material transition and mouse tilt
      // Material transition handled in render loop based on progress
      tl.to({}, { duration: 0.25 }, 0.5); // Placeholder for material phase

      // PHASE 4 (75-100%): Zoom into camera and fade
      tl.to(model.position, {
        z: 6,
        ease: 'power2.in',
      }, 0.75);

      tl.to(model.scale, {
        x: 2,
        y: 2,
        z: 2,
        ease: 'power2.in',
      }, 0.75);

      tl.to(glassMaterial, {
        opacity: 0,
        transmission: 0,
        ease: 'power2.in',
      }, 0.85);

      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;
    };

    // Start animation after model loads
    createScrollAnimation();

    // ==========================================
    // 8. MOUSE PARALLAX TILT (LERP)
    // ==========================================
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-1 to 1)
      mouseRef.current.targetX = (e.clientX / width) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / height) * 2 + 1;
      needsUpdateRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ==========================================
    // 9. RESPONSIVE RESIZE
    // ==========================================
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      needsUpdateRef.current = true;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // 10. OPTIMIZED RENDER LOOP
    // ==========================================
    const render = (time: number) => {
      rafIdRef.current = requestAnimationFrame(render);
      
      // Throttle to ~60fps and only update when needed
      const delta = time - lastTimeRef.current;
      if (delta < 16.67) return; // Skip if less than 60fps
      lastTimeRef.current = time;

      // Check if we need to update
      const isScrolling = scrollStateRef.current.isScrolling;
      const mouseMoving = Math.abs(mouseRef.current.targetX - mouseRef.current.x) > 0.001 ||
                          Math.abs(mouseRef.current.targetY - mouseRef.current.y) > 0.001;
      
      if (!needsUpdateRef.current && !isScrolling && !mouseMoving) {
        return; // Skip render if nothing changed
      }

      if (!isActiveRef.current) return;

      const model = modelRef.current;
      if (model) {
        // LERP mouse movement (smooth follow)
        const lerpFactor = 0.08;
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * lerpFactor;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * lerpFactor;

        const progress = scrollStateRef.current.progress;

        // PHASE 3 (50-75%): Material transition and mouse tilt
        if (progress >= 0.5 && progress < 0.75) {
          const phaseProgress = (progress - 0.5) / 0.25;
          
          // Transition to wireframe
          if (glassMaterial) {
            glassMaterial.opacity = 1 - phaseProgress;
            glassMaterial.transmission = 0.95 * (1 - phaseProgress);
          }
          if (wireframeMaterial) {
            wireframeMaterial.opacity = phaseProgress;
          }
          
          // Mouse tilt effect (stronger in this phase)
          const tiltAmount = phaseProgress * 0.5;
          model.rotation.x = mouseRef.current.y * tiltAmount;
          model.rotation.z = -mouseRef.current.x * tiltAmount;
          
          // Add wireframe overlay
          if (phaseProgress > 0.5 && !model.children.find(c => (c as THREE.Mesh).material === wireframeMaterial)) {
            const wireframeMesh = model.clone();
            wireframeMesh.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = wireframeMaterial;
              }
            });
            wireframeMesh.scale.setScalar(1.01);
            model.add(wireframeMesh);
          }
        } else if (progress < 0.5) {
          // Gentle parallax when not in phase 3
          model.rotation.x = mouseRef.current.y * 0.1;
          model.rotation.z = -mouseRef.current.x * 0.1;
        }

        // Update scroll progress for external use
        scrollStateRef.current.progress = progress;
      }

      renderer.render(scene, camera);
      needsUpdateRef.current = false;
    };

    rafIdRef.current = requestAnimationFrame(render);

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(rafIdRef.current);
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose Three.js objects
      scene.traverse((object) => {
        if ((object as THREE.Mesh).geometry) {
          (object as THREE.Mesh).geometry.dispose();
        }
        if ((object as THREE.Mesh).material) {
          const mat = (object as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => m.dispose());
          } else if (mat) {
            mat.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0e1a 0%, #0f172a 50%, #0a0e1a 100%)',
      }}
    >
      {/* WebGL Canvas will be appended here */}
      
      {/* Progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((phaseNum) => (
          <div 
            key={phaseNum}
            className="w-3 h-3 rounded-full bg-gold/30 border border-gold/50 transition-all duration-300"
            id={`phase-indicator-${phaseNum}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Scrollytelling;
