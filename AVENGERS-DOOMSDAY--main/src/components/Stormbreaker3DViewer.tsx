// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  autoRotate?: boolean;
  enableLightning?: boolean;
}

export default function Stormbreaker3DViewer({
  className = '',
  style = {},
  autoRotate = true,
  enableLightning = true,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [lightningActive, setLightningActive] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 450;
    let animId: number;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.006 };
    let currentRotation = { x: 0.15, y: -0.4 };

    // Dynamic import Three.js & OBJLoader
    let isCancelled = false;

    (async () => {
      const THREE = await import('three');
      const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');

      if (isCancelled || !container) return;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 18);

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch (e) {
        console.warn('WebGL init failed for Stormbreaker:', e);
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);

      // 2. Lights
      const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
      scene.add(ambientLight);

      // Key Uru Rim Light (Cold Divine Silver/Blue)
      const keyLight = new THREE.DirectionalLight(0xe2e8f0, 3.2);
      keyLight.position.set(12, 18, 14);
      scene.add(keyLight);

      // Bifrost Cyan Accent Light
      const bifrostLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
      bifrostLight.position.set(-14, -8, 10);
      scene.add(bifrostLight);

      // Asgardian Gold Counter Light
      const goldRimLight = new THREE.DirectionalLight(0xc9a84c, 1.6);
      goldRimLight.position.set(0, -15, -10);
      scene.add(goldRimLight);

      // Thor's Lightning Discharge Point Light (pulsing near the axe head)
      const lightningLight = new THREE.PointLight(0x60a5fa, 4.0, 25);
      lightningLight.position.set(2, 4, 3);
      scene.add(lightningLight);

      // 3. Stormbreaker Model Group
      const weaponGroup = new THREE.Group();
      scene.add(weaponGroup);

      // 4. Bifrost Cosmic Sparks Field
      const sparkCount = 90;
      const sparkPositions = new Float32Array(sparkCount * 3);
      const sparkColors = new Float32Array(sparkCount * 3);
      const cCyan = new THREE.Color(0x38bdf8);
      const cBlue = new THREE.Color(0x60a5fa);
      const cWhite = new THREE.Color(0xffffff);

      for (let i = 0; i < sparkCount; i++) {
        const i3 = i * 3;
        sparkPositions[i3] = (Math.random() - 0.5) * 12;
        sparkPositions[i3 + 1] = (Math.random() - 0.5) * 16;
        sparkPositions[i3 + 2] = (Math.random() - 0.5) * 8;

        const rand = Math.random();
        const c = rand < 0.5 ? cCyan : rand < 0.85 ? cBlue : cWhite;
        sparkColors[i3] = c.r;
        sparkColors[i3 + 1] = c.g;
        sparkColors[i3 + 2] = c.b;
      }

      const sparkGeo = new THREE.BufferGeometry();
      sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
      sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

      const sparkMat = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
      scene.add(sparkPoints);

      // 5. Load OBJ Model
      const loader = new OBJLoader();
      loader.load(
        '/models/StormBreaker.obj',
        (obj) => {
          if (isCancelled) return;

          // Compute exact bounding box and center
          const box = new THREE.Box3().setFromObject(obj);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = new THREE.Vector3();
          box.getSize(size);

          // Center the geometry exactly at 0, 0, 0
          obj.position.sub(center);

          // Scale to fit viewing volume
          const maxDim = Math.max(size.x, size.y, size.z) || 160;
          const scale = 11.5 / maxDim;
          weaponGroup.scale.set(scale, scale, scale);

          // Apply Uru / Asgardian Divine Metallic Material
          const uruMaterial = new THREE.MeshStandardMaterial({
            color: 0xb0bec5,
            metalness: 0.85,
            roughness: 0.26,
            emissive: 0x1e293b,
            emissiveIntensity: 0.25,
          });

          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = uruMaterial;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          weaponGroup.add(obj);
          setLoading(false);
        },
        undefined,
        (err) => {
          console.error('Failed to load StormBreaker.obj:', err);
          setLoading(false);
        }
      );

      // 6. Pointer Drag Interaction
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

      // Wheel Zoom
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        camera.position.z = Math.min(28, Math.max(8, camera.position.z + e.deltaY * 0.02));
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

      // 7. Render Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Inertial rotation
        if (!isDragging && autoRotate) {
          rotationVelocity.y = THREE.MathUtils.lerp(rotationVelocity.y, 0.007, 0.03);
          rotationVelocity.x = THREE.MathUtils.lerp(rotationVelocity.x, 0, 0.05);
          currentRotation.y += rotationVelocity.y;
          currentRotation.x += rotationVelocity.x;
        }

        // Clamp vertical tilt to avoid flipping
        currentRotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, currentRotation.x));

        // Floating hover motion
        const floatY = Math.sin(elapsed * 1.5) * 0.25;
        weaponGroup.position.y = floatY;
        weaponGroup.rotation.x = currentRotation.x + Math.sin(elapsed * 0.8) * 0.05;
        weaponGroup.rotation.y = currentRotation.y;
        weaponGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.04;

        // Lightning Pulse
        if (enableLightning) {
          const lightningPulse = Math.sin(elapsed * 6) > 0.85 ? 7.0 : 2.5 + Math.sin(elapsed * 3) * 1.5;
          lightningLight.intensity = lightningPulse;
        }

        // Rotate sparks
        sparkPoints.rotation.y = elapsed * 0.15;
        sparkPoints.position.y = floatY * 0.5;

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
  }, [autoRotate, enableLightning]);

  return (
    <div
      ref={mountRef}
      className={`stormbreaker-3d-canvas-wrapper ${className}`}
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
      {loading && (
        <div className="stormbreaker-loading-hud">
          <div className="loading-arc-spinner" />
          <span className="loading-hud-text">INITIALIZING 3D STORMBREAKER MODEL...</span>
        </div>
      )}

      {/* 3D HUD Badge Overlay */}
      {!loading && (
        <div className="stormbreaker-hud-overlay">
          <div className="hud-corner-tag top-left">
            <span className="tag-pulse" />
            <span>NIDAVELLIR // URU FORGE</span>
          </div>
          <div className="hud-corner-tag bottom-right">
            <span>DRAG TO ROTATE 360° // SCROLL TO ZOOM</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .stormbreaker-loading-hud {
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

        .loading-arc-spinner {
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

        .loading-hud-text {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #38bdf8;
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
        }

        .stormbreaker-hud-overlay {
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
          color: rgba(56, 189, 248, 0.8);
          background: rgba(6, 9, 14, 0.75);
          border: 1px solid rgba(56, 189, 248, 0.35);
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

