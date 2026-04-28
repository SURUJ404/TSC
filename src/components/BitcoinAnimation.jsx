
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function BitcoinAnimation() {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer, bitcoin, animationId;

    try {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 3;

      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(300, 300);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Create Bitcoin coin
      const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 64);
      
      // Create materials for front and back faces
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xf7931a, metalness: 0.7, roughness: 0.3 }), // side
        new THREE.MeshStandardMaterial({ color: 0xf7931a, metalness: 0.7, roughness: 0.3 }), // top
        new THREE.MeshStandardMaterial({ color: 0xf7931a, metalness: 0.7, roughness: 0.3 })  // bottom
      ];

      bitcoin = new THREE.Mesh(geometry, materials);
      bitcoin.rotation.x = Math.PI / 2;
      scene.add(bitcoin);

      // Add Bitcoin symbol (B) texture
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // Draw orange circle
      ctx.fillStyle = '#f7931a';
      ctx.fillRect(0, 0, 512, 512);
      
      // Draw white B symbol
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 300px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('₿', 256, 256);
      
      const texture = new THREE.CanvasTexture(canvas);
      const symbolMaterial = new THREE.MeshStandardMaterial({ 
        map: texture,
        metalness: 0.7,
        roughness: 0.3
      });
      
      // Apply symbol to top and bottom
      bitcoin.material = [
        new THREE.MeshStandardMaterial({ color: 0xf7931a, metalness: 0.7, roughness: 0.3 }),
        symbolMaterial,
        symbolMaterial
      ];

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xffffff, 1);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x4a90e2, 0.5);
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        bitcoin.rotation.z += 0.01;
        bitcoin.rotation.y += 0.005;
        renderer.render(scene, camera);
      };

      animate();
      setIsLoaded(true);

      // Cleanup
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        materials.forEach(material => material.dispose());
        symbolMaterial.dispose();
        texture.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.error('3D rendering error:', err);
      setError('Failed to load 3D animation');
      setIsLoaded(false);
    }
  }, []);

  if (error) {
    return (
      <Card className="w-[300px] h-[300px] flex items-center justify-center bg-muted/30 border-destructive/50">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative"
    >
      <div 
        ref={mountRef} 
        className="w-[300px] h-[300px] rounded-xl overflow-hidden crypto-glow"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}
    </motion.div>
  );
}
