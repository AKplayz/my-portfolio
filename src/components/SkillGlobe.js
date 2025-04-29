// client/src/components/SkillGlobe.js
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

const SkillPoint = ({ position, skill, activeSkill, setActiveSkill, color }) => {
  const ref = useRef();
  const isActive = activeSkill === skill.name;
  
  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });

  return (
    <group position={position} ref={ref}>
      <mesh
        onClick={() => setActiveSkill(isActive ? null : skill.name)}
        onPointerOver={() => setActiveSkill(skill.name)}
        onPointerOut={() => !isActive && setActiveSkill(null)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#ffffff" : color}
          emissive={isActive ? "#ffffff" : color}
          emissiveIntensity={isActive ? 1 : 0.3}
        />
      </mesh>
      
      {isActive && (
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
          lineHeight={1}
          letterSpacing={0.02}
        >
          {`${skill.name}\n${skill.level}%`}
        </Text>
      )}
    </group>
  );
};

const Globe = ({ skills, activeSkill, setActiveSkill }) => {
  const globeRef = useRef();
  
  useFrame(() => {
    globeRef.current.rotation.y += 0.001;
  });

  // Position skills on the globe surface
  const skillPositions = skills.map((skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    return new THREE.Vector3().setFromSphericalCoords(
      1.8, // radius
      phi, // phi
      theta // theta
    );
  });

  const colors = ['#6495ED', '#FF7F50', '#9B59B6', '#2ECC71', '#F1C40F'];

  return (
    <group ref={globeRef}>
      {/* Globe */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.7}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Cloud cover */}
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.5}
        />
      </mesh>

      {/* Skill points */}
      {skills.map((skill, i) => (
        <SkillPoint
          key={skill.name}
          position={skillPositions[i]}
          skill={skill}
          activeSkill={activeSkill}
          setActiveSkill={setActiveSkill}
          color={colors[i % colors.length]}
        />
      ))}

      {/* Grid lines */}
      <mesh>
        <sphereGeometry args={[1.51, 32, 32]} />
        <meshBasicMaterial
          color="#6495ed"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

const SkillGlobe = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: '500px', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
      
      <Globe 
        skills={skills} 
        activeSkill={activeSkill} 
        setActiveSkill={setActiveSkill} 
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={8}
        minDistance={3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default SkillGlobe;