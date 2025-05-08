import React, { FC } from 'react';
import * as THREE from 'three';

interface RobotArmsProps {
  color: string;
  style: number;
}

const RobotArms: FC<RobotArmsProps> = ({ color, style }) => {
  const renderArms = () => {
    switch (style) {
      case 0:
        return (
          <group position={[0, -0.2, 0]}>
            {/* Left Arm */}
            <group position={[-0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      case 1:
        return (
          <group position={[0, -0.2, 0]}>
            {/* Left Arm */}
            <group position={[-0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 1.2, 0.2]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 1.2, 0.2]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      case 2:
        return (
          <group position={[0, -0.2, 0]}>
            {/* Left Arm */}
            <group position={[-0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      case 3:
        return (
          <group position={[0, -0.2, 0]}>
            {/* Left Arm */}
            <group position={[-0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.2, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      case 4:
        return (
          <group position={[0, -0.2, 0]}>
            {/* Left Arm */}
            <group position={[-0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 1.2, 0.2]} />
                <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.6, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 1.2, 0.2]} />
                <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
              <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
              </mesh>
            </group>
          </group>
        );
      default:
        return null;
    }
  };

  return renderArms();
};

export default RobotArms; 