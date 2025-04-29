import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';


const Planet = ({ position, label, isCurrent, onClick }) => {
  const ref = useRef();
  const hoverRef = useRef(false);
  
  useFrame(() => {
    ref.current.rotation.y += 0.005;
    if (hoverRef.current) {
      ref.current.position.y = Math.sin(Date.now() * 0.002) * 0.2;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <mesh
        ref={ref}
        onPointerOver={() => (hoverRef.current = true)}
        onPointerOut={() => (hoverRef.current = false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={isCurrent ? '#6495ed' : '#ff7f50'}
          emissive={isCurrent ? '#6495ed' : '#ff7f50'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        visible={hoverRef.current || isCurrent}
      >
        {label}
      </Text>
    </group>
  );
};

const SpaceNav = () => {

  const [currentSection, setCurrentSection] = useState('home');
  
  const sections = [
    { id: 'home', label: 'Home', position: [0, 0, -5] },
    { id: 'about', label: 'About', position: [-3, 1, -4] },
    { id: 'projects', label: 'Projects', position: [3, -1, -4] },
    { id: 'skills', label: 'Skills', position: [-4, -2, -3] },
    { id: 'contact', label: 'Contact', position: [4, 2, -3] }
  ];

  const navigate = (sectionId) => {
    setCurrentSection(sectionId);
  
  };

  return (
    <div className="space-nav-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        {sections.map((section) => (
          <Planet
            key={section.id}
            position={section.position}
            label={section.label}
            isCurrent={currentSection === section.id}
            onClick={() => navigate(section.id)}
          />
        ))}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default SpaceNav;