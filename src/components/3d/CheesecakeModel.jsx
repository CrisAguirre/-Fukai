import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const DECO_CONFIG = {
  fresas: { color: '#ff2255', pos: [0.7, 0.95, 0.3] },
  arandanos: { color: '#4422aa', pos: [-0.6, 0.95, 0.4] },
  chocolate: { color: '#4a2e00', pos: [0, 0.9, 0] },
  caramelo: { color: '#d4770c', pos: [0.5, 1.0, -0.3] },
  mermelada: { color: '#882255', pos: [-0.4, 0.92, 0.6] },
  nueces: { color: '#8B6914', pos: [0.3, 0.98, -0.5] },
  oreo: { color: '#222222', pos: [-0.7, 0.93, -0.2] },
  matcha: { color: '#558B2F', pos: [0.6, 0.94, 0.5] },
};

const DECORADO_MAP = {
  frutos_rojos: ['fresas', 'arandanos'],
  arequite: ['chocolate', 'caramelo'],
  chantilli_oreo: ['oreo', 'matcha'],
  bocadillo: ['mermelada', 'nueces'],
};

export default function CheesecakeModel({ type, decorations = [], decorado }) {
  const group = useRef();

  const resolvedDecos = decorado
    ? (DECORADO_MAP[decorado] || [])
    : decorations;

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  const bodyColor = type === 'horneado' ? '#f5deb3' : '#fffacd';
  const topColor = type === 'horneado' ? '#e8c896' : '#f0e8a0';

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.5, 1.2, 0.1, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1, 1, 0.8, 32]} />
          <meshStandardMaterial color={bodyColor} roughness={0.6} />
        </mesh>

        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[1.01, 1.01, 0.06, 32]} />
          <meshStandardMaterial color={topColor} roughness={0.5} />
        </mesh>

        {resolvedDecos.map(deco => {
          const config = DECO_CONFIG[deco];
          if (!config) return null;
          return (
            <mesh key={deco} position={config.pos}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={config.color} roughness={0.3} />
            </mesh>
          );
        })}

        {resolvedDecos.includes('chocolate') && (
          <>
            <mesh position={[0.6, 0.8, 0.3]}>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
              <meshStandardMaterial color="#4a2e00" roughness={0.3} />
            </mesh>
            <mesh position={[-0.5, 0.82, -0.2]}>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
              <meshStandardMaterial color="#4a2e00" roughness={0.3} />
            </mesh>
          </>
        )}

        {resolvedDecos.includes('matcha') && (
          <mesh position={[0, 0.84, 0]}>
            <cylinderGeometry args={[1.01, 1.01, 0.03, 32]} />
            <meshStandardMaterial color="#558B2F" roughness={0.4} />
          </mesh>
        )}
      </group>
    </Float>
  );
}