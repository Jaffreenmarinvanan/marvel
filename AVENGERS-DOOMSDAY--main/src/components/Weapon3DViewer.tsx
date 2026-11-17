// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface Weapon3DProps {
  slug: string;
  autoRotate?: boolean;
  enableEffects?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const WEAPON_CONFIGS: Record<
  string,
  {
    type: 'glb' | 'obj';
    path: string;
    targetScale: number;
    initialRot: { x: number; y: number; z: number };
    ambientColor: number;
    rimColor: number;
    accentColor: number;
    subtitle: string;
    materialType: 'uru' | 'vibranium' | 'embedded';
  }
> = {
  'stormbreaker': {
    type: 'obj',
    path: '/models/StormBreaker.obj',
    targetScale: 11.5,
    initialRot: { x: 0.15, y: -0.4, z: 0 },
    ambientColor: 0x0f172a,
    rimColor: 0xe2e8f0,
    accentColor: 0x38bdf8, // Bifrost blue
    subtitle: 'NIDAVELLIR // URU BATTLEAXE',
    materialType: 'uru',
  },
  'mjolnir': {
    type: 'glb',
    path: '/models/mjolnir.glb',
    targetScale: 9.5,
    initialRot: { x: 0.2, y: -0.6, z: -0.1 },
    ambientColor: 0x0f172a,
    rimColor: 0x93c5fd,
    accentColor: 0x60a5fa, // Thor lightning
    subtitle: 'NIDAVELLIR // ENCHANTED WARHAMMER',
    materialType: 'embedded',
  },
  'captain-america-shield': {
    type: 'glb',
    path: '/models/captain_america_shield.glb',
    targetScale: 10.5,
    initialRot: { x: 0.1, y: 0.35, z: 0 },
    ambientColor: 0x111827,
    rimColor: 0xef4444, // Captain America red
    accentColor: 0x3b82f6, // Vibranium blue
    subtitle: 'WAKANDA / STARK // VIBRANIUM DISK',
    materialType: 'embedded',
  },
};

export default function Weapon3DViewer({
  slug,
  autoRotate = true,
  enableEffects = true,
  className = '',
  style = {},
}: Weapon3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const config = WEAPON_CONFIGS[slug] || WEAPON_CONFIGS['stormbreaker'];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 450;
    let animId: number;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.007 };
    let currentRotation = { ...config.initialRot };

    let isCancelled = false;

    (async () => {
      setLoading(true);
      setLoadError(false);

      const THREE = await import('three');

      if (isCancelled || !container) return;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 16);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch (e) {
        console.warn('WebGL init failed for Weapon3DViewer:', e);
        setLoadError(true);
        setLoading(false);
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);

      // 2. Lighting Setup
      const ambientLight = new THREE.AmbientLight(config.ambientColor, 2.0);
      scene.add(ambientLight);

      // Key Metallic Directional Light
      const keyLight = new THREE.DirectionalLight(config.rimColor, 3.4);
      keyLight.position.set(12, 16, 12);
      scene.add(keyLight);

      // Accent Counter Light
      const accentLight = new THREE.DirectionalLight(config.accentColor, 2.8);
      accentLight.position.set(-14, -8, 10);
      scene.add(accentLight);

      // Bottom Specular Light
      const bottomLight = new THREE.DirectionalLight(0xc9a84c, 1.4);
      bottomLight.position.set(0, -12, -8);
      scene.add(bottomLight);

      // Dynamic Energy Discharge Point Light
      const pulseLight = new THREE.PointLight(config.accentColor, 3.5, 30);
      pulseLight.position.set(0, 2, 4);
      scene.add(pulseLight);

      // 3. Weapon Model Group
      const weaponGroup = new THREE.Group();
      scene.add(weaponGroup);

      // 4. Ambient Energy Sparks Field
      let sparkPoints: any = null;
      if (enableEffects) {
        const sparkCount = 80;
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkColors = new Float32Array(sparkCount * 3);
        const cAccent = new THREE.Color(config.accentColor);
        const cRim = new THREE.Color(config.rimColor);
        const cWhite = new THREE.Color(0xffffff);

        for (let i = 0; i < sparkCount; i++) {
          const i3 = i * 3;
          sparkPositions[i3] = (Math.random() - 0.5) * 14;
          sparkPositions[i3 + 1] = (Math.random() - 0.5) * 16;
          sparkPositions[i3 + 2] = (Math.random() - 0.5) * 10;

          const rand = Math.random();
          const c = rand < 0.6 ? cAccent : rand < 0.85 ? cRim : cWhite;
          sparkColors[i3] = c.r;
          sparkColors[i3 + 1] = c.g;
          sparkColors[i3 + 2] = c.b;
        }

        const sparkGeo = new THREE.BufferGeometry();
        sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
        sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

        const sparkMat = new THREE.PointsMaterial({
          size: 0.16,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });

        sparkPoints = new THREE.Points(sparkGeo, sparkMat);
        scene.add(sparkPoints);
      }

      // 5. Load Model (GLB or OBJ)
      const onModelLoaded = (model: any) => {
        if (isCancelled) return;

        // Auto center bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);

        model.position.sub(center);

        // Normalize scaling
        const maxDim = Math.max(size.x, size.y, size.z) || 10;
        const finalScale = config.targetScale / maxDim;
        weaponGroup.scale.set(finalScale, finalScale, finalScale);

        // If OBJ needs custom Uru metallic shader
        if (config.materialType === 'uru') {
          const uruMaterial = new THREE.MeshStandardMaterial({
            color: 0xb0bec5,
            metalness: 0.86,
            roughness: 0.25,
            emissive: 0x1e293b,
            emissiveIntensity: 0.25,
          });

          model.traverse((child: any) => {
            if (child.isMesh) {
              child.material = uruMaterial;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        } else {
          // GLB with embedded PBR materials - enhance tone mapping & shadows
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.envMapIntensity = 1.4;
              }
            }
          });
        }

        weaponGroup.add(model);
        setLoading(false);
      };

      if (config.type === 'obj') {
        const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
        const loader = new OBJLoader();
        loader.load(
          config.path,
          onModelLoaded,
          undefined,
          (err) => {
            console.error('Failed to load OBJ:', config.path, err);
            setLoadError(true);
            setLoading(false);
          }
        );
      } else {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();
        loader.load(
          config.path,
          (gltf) => onModelLoaded(gltf.scene),
          undefined,
          (err) => {
            console.error('Failed to load GLB:', config.path, err);
            setLoadError(true);
            setLoading(false);
          }
        );
      }

      // 6. User Pointer Interactions
      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        currentRotation.y += deltaX * 0.009;
        currentRotation.x += deltaY * 0.009;
        rotationVelocity = { x: deltaY * 0.003, y: deltaX * 0.003 };
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        camera.position.z = Math.min(26, Math.max(7, camera.position.z + e.deltaY * 0.018));
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      container.addEventListener('wheel', onWheel, { passive: false });

      // Resize
      const onResize = () => {
        if (!container) return;
        width = container.clientWidth || 500;
        height = container.clientHeight || 450;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', onResize);

      // 7. Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Inertial glide & auto-rotation
        if (!isDragging && autoRotate) {
          rotationVelocity.y = THREE.MathUtils.lerp(rotationVelocity.y, 0.007, 0.03);
          rotationVelocity.x = THREE.MathUtils.lerp(rotationVelocity.x, 0, 0.05);
          currentRotation.y += rotationVelocity.y;
          currentRotation.x += rotationVelocity.x;
        }

        // Clamp vertical tilt
        currentRotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, currentRotation.x));

        // Floating hover
        const floatY = Math.sin(elapsed * 1.6) * 0.22;
        weaponGroup.position.y = floatY;
        weaponGroup.rotation.x = currentRotation.x + Math.sin(elapsed * 0.8) * 0.04;
        weaponGroup.rotation.y = currentRotation.y;
        weaponGroup.rotation.z = currentRotation.z + Math.sin(elapsed * 1.1) * 0.03;

        // Dynamic lightning pulse
        if (enableEffects) {
          const pulse = Math.sin(elapsed * 5) > 0.82 ? 6.5 : 2.5 + Math.sin(elapsed * 2.5) * 1.2;
          pulseLight.intensity = pulse;

          if (sparkPoints) {
            sparkPoints.rotation.y = elapsed * 0.12;
            sparkPoints.position.y = floatY * 0.5;
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        isCancelled = true;
        cancelAnimationFrame(animId);
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('wheel', onWheel);
        window.removeEventListener('resize', onResize);
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    })();

    return () => {
      isCancelled = true;
    };
  }, [slug, autoRotate, enableEffects, config]);

  return (
    <div
      ref={mountRef}
      className={`weapon-3d-canvas-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        cursor: 'grab',
        touchAction: 'none',
        ...style,
      }}
    >
      {/* Loading Overlay */}
      {loading && !loadError && (
        <div className="weapon-3d-loading-hud">
          <div className="weapon-arc-spinner" />
          <span className="weapon-hud-loading-text">INITIALIZING 3D {slug.replace(/-/g, ' ').toUpperCase()}...</span>
        </div>
      )}

      {/* Error state */}
      {loadError && (
        <div className="weapon-3d-loading-hud">
          <span className="weapon-hud-loading-text" style={{ color: '#ef4444' }}>
            FAILED TO RENDER 3D MODEL
          </span>
        </div>
      )}

      {/* 3D Telemetry HUD Overlay */}
      {!loading && !loadError && (
        <div className="weapon-3d-hud-overlay">
          <div className="hud-corner-tag top-left">
            <span className="tag-pulse" />
            <span>{config.subtitle}</span>
          </div>
          <div className="hud-corner-tag bottom-right">
            <span>DRAG TO ROTATE 360° // SCROLL TO ZOOM</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .weapon-3d-loading-hud {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background: rgba(6, 9, 14, 0.7);
          backdrop-filter: blur(6px);
          z-index: 10;
        }

        .weapon-arc-spinner {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(56, 189, 248, 0.2);
          border-top-color: #38bdf8;
          border-right-color: #60a5fa;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .weapon-hud-loading-text {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
        }

        .weapon-3d-hud-overlay {
          position: absolute;
          inset: 12px;
          pointer-events: none;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .hud-corner-tag {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          color: rgba(56, 189, 248, 0.85);
          background: rgba(6, 9, 14, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.4);
          padding: 4px 10px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hud-corner-tag.top-left {
          position: absolute;
          top: 0;
          left: 0;
        }

        .hud-corner-tag.bottom-right {
          position: absolute;
          bottom: 0;
          right: 0;
        }

        .tag-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

