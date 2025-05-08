import React, { FC } from 'react';
import * as THREE from 'three';

interface RobotHeadProps {
  color: string;
  style: number;
  accessories?: {
    hat?: 'cowboy' | 'bonnet' | false;
    mustache?: boolean;
    lipstick?: boolean;
  };
}

const RobotHead: FC<RobotHeadProps> = ({ color, style, accessories }) => {
  const renderHead = () => {
    switch (style) {
      case 0:
        return (
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        );
      case 1:
        return (
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        );
      case 2:
        return (
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
            <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        );
      case 3:
        return (
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        );
      case 4:
        return (
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.55, 0.55, 0.55]} />
            <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
          </mesh>
        );
      default:
        return null;
    }
  };

  const renderAccessories = (headStyle: number) => {
    if (!accessories) return null;

    type StylePositions = {
      [key: number]: [number, number, number];
    };

    type AccessoryPositions = {
      hat: StylePositions;
      mustache: StylePositions;
      lipstick: StylePositions;
    };

    const positions: AccessoryPositions = {
      hat: {
        0: [0, 0.6, 0],
        1: [0, 0.5, 0],
        2: [0, 0.5, 0],
        3: [0, 0.5, 0],
        4: [0, 0.5, 0.1],
      },
      mustache: {
        0: [0, -0.05, 0.42],
        1: [0, -0.1, 0.37],
        2: [0, -0.05, 0.52],
        3: [0, -0.05, 0.52],
        4: [0, -0.05, 0.51],
      },
      lipstick: {
        0: [0, -0.15, 0.42],
        1: [0, -0.2, 0.37],
        2: [0, -0.15, 0.52],
        3: [0, -0.15, 0.52],
        4: [0, -0.15, 0.51],
      }
    };

    const renderCowboyHat = (position: [number, number, number]) => (
      <group position={position}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.3, 32]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[0.35, 0.03, 16, 32]} />
          <meshPhysicalMaterial color="#4A2803" metalness={0.6} roughness={0.2} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[-0.2, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
      </group>
    );

    const renderBonnet = (position: [number, number, number]) => (
      <group position={position}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#FFB6C1" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
          <meshPhysicalMaterial color="#FFB6C1" />
        </mesh>
        <mesh position={[0, 0.1, 0.3]} rotation={[Math.PI / 3, 0, 0]}>
          <boxGeometry args={[0.6, 0.08, 0.02]} />
          <meshPhysicalMaterial color="#FF69B4" />
        </mesh>
        <group position={[0.25, 0.1, 0.3]} rotation={[Math.PI / 3, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.2, 0.05, 0.02]} />
            <meshPhysicalMaterial color="#FF69B4" />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.2, 0.05, 0.02]} />
            <meshPhysicalMaterial color="#FF69B4" />
          </mesh>
        </group>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 4) * 0.35,
              -0.1,
              Math.sin((i * Math.PI) / 4) * 0.35
            ]}
            rotation={[0, (i * Math.PI) / 4, 0]}
          >
            <boxGeometry args={[0.1, 0.05, 0.02]} />
            <meshPhysicalMaterial color="#FFB6C1" />
          </mesh>
        ))}
      </group>
    );

    return (
      <group>
        {accessories.hat && (
          <>
            {accessories.hat === 'cowboy' && renderCowboyHat(positions.hat[headStyle] || positions.hat[0])}
            {accessories.hat === 'bonnet' && renderBonnet(positions.hat[headStyle] || positions.hat[0])}
          </>
        )}
        <group position={[0, 0, 0.01]}>
          {accessories.mustache && (
            <group position={positions.mustache[headStyle] || positions.mustache[0]}>
              <mesh>
                <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
                <meshPhysicalMaterial color="#222222" />
              </mesh>
              <mesh position={[-0.15, 0, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshPhysicalMaterial color="#222222" />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshPhysicalMaterial color="#222222" />
              </mesh>
            </group>
          )}
          {accessories.lipstick && (
            <group position={positions.lipstick[headStyle] || positions.lipstick[0]}>
              <mesh>
                <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI]} />
                <meshPhysicalMaterial color="#FF1493" />
              </mesh>
            </group>
          )}
        </group>
      </group>
    );
  };

  return (
    <group>
      {renderHead()}
      {renderAccessories(style)}
    </group>
  );
};

export default RobotHead; 