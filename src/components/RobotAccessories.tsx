import React, { FC } from 'react';
import * as THREE from 'three';

interface RobotAccessoriesProps {
  color: string;
  style: number;
}

const RobotAccessories: FC<RobotAccessoriesProps> = ({ color, style }) => {
  const renderAccessory = () => {
    switch (style) {
      case 0: // Mustache
        return (
          <group position={[0, 0.9, 0.31]}>
            {/* Left curl */}
            <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI * 0.7]}>
              <torusGeometry args={[0.11, 0.035, 16, 100, Math.PI]} />
              <meshPhysicalMaterial color="#000000" metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Right curl */}
            <mesh position={[0.13, 0, 0]} rotation={[0, 0, -Math.PI * 0.7]}>
              <torusGeometry args={[0.11, 0.035, 16, 100, Math.PI]} />
              <meshPhysicalMaterial color="#000000" metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Center body */}
            <mesh position={[0, -0.01, 0]}>
              <cylinderGeometry args={[0.07, 0.09, 0.18, 32]} />
              <meshPhysicalMaterial color="#000000" metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        );
      case 1: // Bowtie
        return (
          <group position={[0, 0.3, 0.26]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.1, 0.05]} />
              <meshPhysicalMaterial color="#ff0000" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.1, 0.05]} />
              <meshPhysicalMaterial color="#ff0000" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshPhysicalMaterial color="#ff0000" metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        );
      case 2: // Tutu
        return (
          <group position={[0, -0.8, 0]}>
            <mesh>
              <cylinderGeometry args={[0.6, 0.8, 0.2, 32]} />
              <meshPhysicalMaterial color="#ff69b4" metalness={0.2} roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.5, 0.7, 0.2, 32]} />
              <meshPhysicalMaterial color="#ff69b4" metalness={0.2} roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.4, 0.6, 0.2, 32]} />
              <meshPhysicalMaterial color="#ff69b4" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>
        );
      case 3: // Cowboy Hat
        return (
          <group position={[0, 1.3, 0]}>
            <mesh>
              <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
              <meshPhysicalMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
              <meshPhysicalMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        );
      case 4: // Antenna
        return (
          <group position={[0, 1.3, 0]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case 5: // Beer
        return (
          <group position={[0.3, 0.2, 0.2]}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
              <meshPhysicalMaterial color="#FFD700" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
              <meshPhysicalMaterial color="#FFD700" metalness={0.3} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
              <meshPhysicalMaterial color="#FFD700" metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <group>
      {renderAccessory()}
    </group>
  );
};

export default RobotAccessories; 