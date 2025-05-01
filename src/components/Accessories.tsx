import React, { FC } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface AccessoriesProps {
  accessories?: {
    hat?: boolean;
    mustache?: boolean;
    lipstick?: boolean;
  };
}

const brassFinish = {
  color: '#b5a642',
  metalness: 1,
  roughness: 0.3,
  emissive: '#000000',
};

const copperFinish = {
  color: '#b87333',
  metalness: 1,
  roughness: 0.4,
  emissive: '#000000',
};

export const Accessories: FC<AccessoriesProps> = ({ accessories }) => {
  if (!accessories) return null;

  return (
    <group>
      {/* Cowboy Hat */}
      {accessories.hat && (
        <group position={[0, 0.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.7, 0.2, 8]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
            <meshStandardMaterial {...copperFinish} />
          </mesh>
        </group>
      )}
      {/* Mustache */}
      {accessories.mustache && (
        <group position={[0, -0.2, 0.4]}>
          <mesh rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <mesh rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
        </group>
      )}
      {/* Lipstick */}
      {accessories.lipstick && (
        <group position={[0, -0.3, 0.4]}>
          <mesh>
            <boxGeometry args={[0.3, 0.05, 0.05]} />
            <meshStandardMaterial color="#ff0000" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}; 