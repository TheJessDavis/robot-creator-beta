import React, { FC } from 'react';
import * as THREE from 'three';

interface RobotBodyProps {
  color: string;
  style: number;
}

const RobotBody: FC<RobotBodyProps> = ({ color, style }) => {
  const renderBody = () => {
    switch (style) {
      case 0:
        return (
          <group position={[0, -0.2, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1.5, 0.5]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            <mesh position={[0, 0.5, 0.3]}>
              <boxGeometry args={[0.8, 0.8, 0.1]} />
              <meshPhysicalMaterial color="#1A1B35" metalness={0.8} roughness={0.15} clearcoat={0.8} clearcoatRoughness={0.1} />
            </mesh>
          </group>
        );
      case 1:
        return (
          <group position={[0, -0.2, 0]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            <mesh position={[0, 0.5, 0.3]}>
              <circleGeometry args={[0.4, 32]} />
              <meshPhysicalMaterial color="#1A1B35" metalness={0.8} roughness={0.15} clearcoat={0.8} clearcoatRoughness={0.1} />
            </mesh>
          </group>
        );
      case 2:
        return (
          <group position={[0, -0.2, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            <mesh position={[0, 0.5, 0.3]}>
              <circleGeometry args={[0.3, 32]} />
              <meshPhysicalMaterial color="#1A1B35" metalness={0.8} roughness={0.15} clearcoat={0.8} clearcoatRoughness={0.1} />
            </mesh>
          </group>
        );
      case 3:
        return (
          <group position={[0, -0.2, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1.5, 0.5]} />
              <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            <mesh position={[0, 0.5, 0.3]}>
              <boxGeometry args={[0.6, 0.6, 0.1]} />
              <meshPhysicalMaterial color="#7FE6D4" metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
          </group>
        );
      case 4:
        return (
          <group position={[0, -0.2, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1.5, 0.5]} />
              <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            <mesh position={[0, 0.5, 0.3]}>
              <boxGeometry args={[0.7, 0.7, 0.1]} />
              <meshPhysicalMaterial color="#40F7FF" metalness={0.9} roughness={0.1} emissive="#40F7FF" emissiveIntensity={0.5} clearcoat={1.0} clearcoatRoughness={0.05} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return renderBody();
};

export default RobotBody; 