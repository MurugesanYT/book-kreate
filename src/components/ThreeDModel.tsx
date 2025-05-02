
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create book object
    const bookGroup = new THREE.Group();
    
    // Book cover
    const coverGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const coverMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6E59A5,
      specular: 0xffffff,
      shininess: 100,
    });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    bookGroup.add(cover);
    
    // Pages
    const pagesGeometry = new THREE.BoxGeometry(2.8, 3.8, 0.8);
    const pagesMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.z = -0.5;
    bookGroup.add(pages);
    
    // Book spine decoration
    const spineGeo = new THREE.BoxGeometry(0.2, 4, 1);
    const spineMat = new THREE.MeshPhongMaterial({ color: 0xF97316 });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.x = -1.5;
    spine.position.z = -0.4;
    bookGroup.add(spine);
    
    scene.add(bookGroup);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle floating animation
      bookGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;
      bookGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
      bookGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      renderer.setSize(400, 400);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeDModel;
