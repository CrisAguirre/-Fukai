import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';

export default function CheesecakeModel({ type, decorations = [] }) {
  const group = useRef();

  // For this placeholder, we will just render simple primitive shapes
  // In a real scenario, useGLTF would load the .glb models here.
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Slow rotation
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group}>
        {/* Base Plate */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.5, 1.2, 0.1, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Cheesecake Body */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1, 1, 0.8, 32]} />
          <meshStandardMaterial color={type === 'horneado' ? '#f5deb3' : '#fffacd'} />
        </mesh>
        
        {/* Mock Decorations */}
        {decorations.includes('fresas') && (
          <mesh position={[0.5, 0.9, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
        )}
        {decorations.includes('arandanos') && (
          <mesh position={[-0.5, 0.9, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#0000ff" />
          </mesh>
        )}
        {decorations.includes('chocolate') && (
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[1.02, 1.02, 0.1, 32]} />
            <meshStandardMaterial color="#4a2e00" />
          </mesh>
        )}
      </group>
    </Float>
  );
}
