// @ts-nocheck
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Marvel3DCore — Interactive WebGL 3D Holographic Core
 *
 * Renders a cinematic gyroscopic Arc Reactor & Cosmic Infinity Nexus:
 * - 3 concentric rotating metallic gimbal rings (Gold, Crimson, Arc-Cyan)
 * - Central floating faceted Infinity Core (faceted gemstone with inner glow)
 * - 3D stardust field that responds to mouse cursor depth
 * - Dynamic cursor-tracking point light casting live specular reflections
 * - Smooth lerp damping for physical weight and fluid cinematic response
 */
export default function Marvel3DCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.5);
    scene.add(ambientLight);

    // Gold directional rim light
    const goldLight = new THREE.DirectionalLight(0xc9a84c, 2.5);
    goldLight.position.set(10, 15, 10);
    scene.add(goldLight);

    // Crimson accent light from opposite corner
    const redLight = new THREE.DirectionalLight(0xc41e3a, 2.0);
    redLight.position.set(-12, -10, -5);
    scene.add(redLight);

    // Arc Cyan rim light from bottom
    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    cyanLight.position.set(0, -12, 10);
    scene.add(cyanLight);

    // Interactive cursor-following point light
    const cursorLight = new THREE.PointLight(0xffe28a, 3.0, 30);
    cursorLight.position.set(0, 0, 12);
    scene.add(cursorLight);

    // 3. Central Hologram Group
    const holoGroup = new THREE.Group();
    scene.add(holoGroup);

    // Ring 1: Outer Gold Astrolabe Ring
    const ring1Geo = new THREE.TorusGeometry(6.4, 0.08, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x4a3a10,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    holoGroup.add(ring1);

    // Ring 1 Tick Marks / Nodes
    const tickCount = 12;
    const tickGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    const tickMat = new THREE.MeshStandardMaterial({
      color: 0xffd978,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.8,
    });
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeo, tickMat);
      tick.position.set(Math.cos(angle) * 6.4, Math.sin(angle) * 6.4, 0);
      tick.rotation.z = angle;
      ring1.add(tick);
    }

    // Ring 2: Middle Crimson Energy Ring (tilted 45 degrees)
    const ring2Geo = new THREE.TorusGeometry(4.8, 0.07, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc41e3a,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x6b101d,
      emissiveIntensity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI * 0.35;
    holoGroup.add(ring2);

    // Ring 3: Inner Arc Cyan Reactor Ring
    const ring3Geo = new THREE.TorusGeometry(3.3, 0.06, 16, 80);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI * 0.4;
    holoGroup.add(ring3);

    // Central Cosmic Gem: Faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a243b,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x1e3a5f,
      emissiveIntensity: 0.6,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    holoGroup.add(coreMesh);

    // Central Wireframe Glow Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    holoGroup.add(wireMesh);

    // 4. Stardust / Cosmic Particles Field (3D floating particles)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xc9a84c);
    const blueColor = new THREE.Color(0x38bdf8);
    const redColor = new THREE.Color(0xc41e3a);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical distribution around core
      const radius = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      // Color distribution
      const rand = Math.random();
      let c = whiteColor;
      if (rand < 0.45) c = goldColor;
      else if (rand < 0.75) c = blueColor;
      else if (rand < 0.92) c = redColor;

      particleColors[i3] = c.r;
      particleColors[i3 + 1] = c.g;
      particleColors[i3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    holoGroup.add(particles);

    // 5. Mouse tracking handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = window;
      const normX = (e.clientX / rect.innerWidth) * 2 - 1;
      const normY = -(e.clientY / rect.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Click pulse trigger
    const handleClick = () => {
      // Temporary burst speed
      coreMesh.scale.set(1.4, 1.4, 1.4);
      wireMesh.scale.set(1.5, 1.5, 1.5);
    };
    window.addEventListener('click', handleClick);

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update cursor light
      cursorLight.position.x = mx * 10;
      cursorLight.position.y = my * 8;

      // Rotate Gimbal Rings at varying speeds
      ring1.rotation.z = elapsed * 0.25;
      ring1.rotation.x = Math.sin(elapsed * 0.15) * 0.3;

      ring2.rotation.y = -elapsed * 0.35;
      ring2.rotation.z = Math.cos(elapsed * 0.2) * 0.25;

      ring3.rotation.x = elapsed * 0.45;
      ring3.rotation.y = Math.sin(elapsed * 0.3) * 0.35;

      // Central core pulse and rotation
      coreMesh.rotation.x = elapsed * 0.3;
      coreMesh.rotation.y = elapsed * 0.4;
      wireMesh.rotation.x = -elapsed * 0.2;
      wireMesh.rotation.y = -elapsed * 0.25;

      // Gentle scale pulse
      const pulseScale = 1.0 + Math.sin(elapsed * 2.0) * 0.06;
      coreMesh.scale.lerp(new THREE.Vector3(pulseScale, pulseScale, pulseScale), 0.1);
      wireMesh.scale.lerp(new THREE.Vector3(pulseScale, pulseScale, pulseScale), 0.1);

      // Rotate particle cloud
      particles.rotation.y = elapsed * 0.08;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.1;

      // Tilt entire holoGroup toward cursor with perspective depth
      holoGroup.rotation.y = mx * 0.45;
      holoGroup.rotation.x = -my * 0.35;
      holoGroup.position.x = mx * 0.8;
      holoGroup.position.y = my * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="marvel-3d-canvas-wrap"
      aria-hidden="true"
    />
  );
}

