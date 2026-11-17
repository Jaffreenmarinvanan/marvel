// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';

const STONE_CONFIGS: Record<string, {
  texture: string;
  roughness: number;
  metalness: number;
  bumpScale: number;
}> = {
  'space-stone':   { texture: '/models/space_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
  'mind-stone':    { texture: '/models/mind_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
  'reality-stone': { texture: '/models/reality_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
  'power-stone':   { texture: '/models/power_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
  'time-stone':    { texture: '/models/time_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
  'soul-stone':    { texture: '/models/soul_tex.jpg', roughness: 0.32, metalness: 0.12, bumpScale: 0.035 },
};

interface Props {
  stoneSlug: string;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Stone3DViewer({
  stoneSlug,
  interactive = true,
  className = '',
  style = {},
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const cfg = STONE_CONFIGS[stoneSlug] || STONE_CONFIGS['time-stone'];
    let cancelled = false;
    let animId: number | null = null;
    let cleanupFn: (() => void) | null = null;

    (async () => {
      let THREE: any;
      let GLTFLoader: any;

      try {
        THREE = await import('three');
        const loaderModule = await import('three/examples/jsm/loaders/GLTFLoader.js');
        GLTFLoader = loaderModule.GLTFLoader;
      } catch (err) {
        console.error('Three.js / GLTFLoader import failed', err);
        return;
      }

      if (cancelled || !el) return;

      const width = el.clientWidth || 400;
      const height = el.clientHeight || 400;

      // 1. Scene
      const scene = new THREE.Scene();
      scene.background = null;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 3.2);

      // 3. Renderer - crisp, clean, without blurry bloom
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.LinearToneMapping;
      el.appendChild(renderer.domElement);

      // 4. Clean, crisp studio lighting that reveals the high-res texture and facets
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      // Key light from top-right
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(4, 5, 4);
      scene.add(keyLight);

      // Fill light from bottom-left
      const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
      fillLight.position.set(-4, -2, 3);
      scene.add(fillLight);

      // Rim light from behind for edge separation
      const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
      rimLight.position.set(0, 3, -4);
      scene.add(rimLight);

      // 5. Load stone texture image directly into texture map
      const textureLoader = new THREE.TextureLoader();
      const stoneTexture = textureLoader.load(cfg.texture);
      stoneTexture.colorSpace = THREE.SRGBColorSpace;
      stoneTexture.wrapS = THREE.RepeatWrapping;
      stoneTexture.wrapT = THREE.RepeatWrapping;

      // 6. Group holding the mesh
      const group = new THREE.Group();
      scene.add(group);

      // 7. Load GLTF 3D model
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/model.glb',
        (gltf) => {
          if (cancelled) return;

          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              // High-definition textured material - NO blurry emissive wash
              child.material = new THREE.MeshStandardMaterial({
                map: stoneTexture,
                bumpMap: stoneTexture,
                bumpScale: cfg.bumpScale,
                roughness: cfg.roughness,
                metalness: cfg.metalness,
              });
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Center and scale to fit viewport
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 1.7 / (maxDim || 1);

          gltf.scene.position.sub(center);
          gltf.scene.scale.setScalar(scale);
          group.add(gltf.scene);
        },
        undefined,
        (err) => {
          console.error('Failed to load model.glb', err);
        }
      );

      // 8. Orbit interaction state
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      let rotY = 0;
      let rotX = 0;
      let targetRotY = 0;
      let targetRotX = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          isDragging = true;
          prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const onTouchEnd = () => {
        isDragging = false;
      };

      if (interactive) {
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);
      }

      // ResizeObserver
      const onResize = () => {
        if (!el || !renderer || !camera) return;
        const w = el.clientWidth || 300;
        const h = el.clientHeight || 300;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(el);

      // Render Loop
      let time = 0;
      const animate = () => {
        if (cancelled) return;
        animId = requestAnimationFrame(animate);
        time += 0.015;

        rotY += (targetRotY - rotY) * 0.1;
        rotX += (targetRotX - rotX) * 0.1;

        if (!isDragging) {
          targetRotY += 0.005; // Idle rotation
          group.rotation.y = rotY;
          group.rotation.x = rotX + Math.sin(time * 0.5) * 0.04;
          group.position.y = Math.sin(time * 0.7) * 0.04; // Smooth levitation
        } else {
          group.rotation.y = rotY;
          group.rotation.x = rotX;
        }

        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        ro.disconnect();
        if (interactive) {
          renderer.domElement.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);

          renderer.domElement.removeEventListener('touchstart', onTouchStart);
          window.removeEventListener('touchmove', onTouchMove);
          window.removeEventListener('touchend', onTouchEnd);
        }

        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
            else obj.material.dispose();
          }
        });

        if (stoneTexture) stoneTexture.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === el) {
          el.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cancelled = true;
      if (animId) cancelAnimationFrame(animId);
      cleanupFn?.();
    };
  }, [stoneSlug, interactive]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        cursor: interactive ? 'grab' : 'default',
        touchAction: 'none',
        ...style,
      }}
    />
  );
}
