import React, { useState, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Extend JSX Elements with Three.js objects
extend({
  Mesh: THREE.Mesh,
  BoxGeometry: THREE.BoxGeometry,
  SphereGeometry: THREE.SphereGeometry,
  CylinderGeometry: THREE.CylinderGeometry,
  CircleGeometry: THREE.CircleGeometry,
  TorusGeometry: THREE.TorusGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      circleGeometry: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      group: any;
    }
  }
}

// Steampunk material presets
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

const glassFinish = {
  color: '#88ccff',
  metalness: 1,
  roughness: 0.1,
  emissive: '#4488ff',
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.7,
};

interface RobotPartProps {
  position?: [number, number, number];
  color: string;
  style: number;
  accessories?: {
    hat?: boolean;
    mustache?: boolean;
    lipstick?: boolean;
  };
}

const Accessories: React.FC<{ position: [number, number, number], accessories: RobotPartProps['accessories'] }> = 
  ({ position, accessories }) => {
  if (!accessories) return null;

  return (
    <group position={position}>
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

const Gear: React.FC<{ position: [number, number, number], scale?: number, rotation?: [number, number, number] }> = 
  ({ position, scale = 1, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh>
      <cylinderGeometry args={[0.3 * scale, 0.3 * scale, 0.1 * scale, 12]} />
      <meshStandardMaterial {...brassFinish} />
    </mesh>
    {Array.from({ length: 8 }).map((_, i) => (
      <mesh key={i} position={[
        Math.cos(i * Math.PI / 4) * 0.4 * scale,
        0,
        Math.sin(i * Math.PI / 4) * 0.4 * scale
      ]}>
        <boxGeometry args={[0.1 * scale, 0.1 * scale, 0.2 * scale]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
    ))}
  </group>
);

const Pipe: React.FC<{ start: [number, number, number], end: [number, number, number], radius?: number }> = 
  ({ start, end, radius = 0.1 }) => {
  const direction = new THREE.Vector3().subVectors(
    new THREE.Vector3(...end),
    new THREE.Vector3(...start)
  );
  const length = direction.length();
  const center = new THREE.Vector3().addVectors(
    new THREE.Vector3(...start),
    direction.multiplyScalar(0.5)
  );
  const rotation = new THREE.Euler().setFromVector3(
    new THREE.Vector3(
      Math.atan2(direction.z, direction.y),
      Math.atan2(direction.x, direction.z),
      Math.atan2(direction.y, direction.x)
    )
  );

  return (
    <group position={[center.x, center.y, center.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      <mesh>
        <cylinderGeometry args={[radius, radius, length, 8]} />
        <meshStandardMaterial {...copperFinish} />
      </mesh>
      <mesh position={[0, length/2, 0]}>
        <torusGeometry args={[radius * 1.5, radius * 0.3, 8, 8]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
      <mesh position={[0, -length/2, 0]}>
        <torusGeometry args={[radius * 1.5, radius * 0.3, 8, 8]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
    </group>
  );
};

const RobotHead: React.FC<RobotPartProps> = ({ position = [0, 2, 0], color, style, accessories }) => {
  const [expression, setExpression] = useState('neutral');
  const [isBlinking, setIsBlinking] = useState(false);

  // Define materials
  const visorGlow = {
    color: '#000000',
    emissive: '#0066ff',
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  };

  const panelMaterial = {
    color: '#000000',
    metalness: 0.9,
    roughness: 0.1,
  };

  // Add blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  const getEyeExpression = () => {
    switch (expression) {
      case 'happy':
        return { scale: [1, 0.5, 1], rotation: [0, 0, 0] };
      case 'surprised':
        return { scale: [1, 1.2, 1], rotation: [0, 0, 0] };
      case 'angry':
        return { scale: [1, 0.3, 1], rotation: [0, 0, -0.2] };
      default:
        return { scale: [1, 1, 1], rotation: [0, 0, 0] };
    }
  };

  const getMouthExpression = () => {
    switch (expression) {
      case 'happy':
        return { scale: [1, 0.5, 1], rotation: [0, 0, 0] };
      case 'surprised':
        return { scale: [1, 1.2, 1], rotation: [0, 0, 0] };
      case 'angry':
        return { scale: [1, 0.3, 1], rotation: [0, 0, 0] };
      default:
        return { scale: [1, 1, 1], rotation: [0, 0, 0] };
    }
  };

  const headGeometries = [
    // Style 1: Modern Visor Head
    <group position={position} key="head1">
      {/* Main Head Shape */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.5, 0.9, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Visor Frame */}
      <mesh position={[0, 0.1, 0.3]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.68, 0.48, 0.5, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Visor Glass */}
      <mesh position={[0, 0.1, 0.35]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.45, 0.45, 32, 1, true]} />
        <meshStandardMaterial {...visorGlow} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      {/* Head Panel Lines */}
      {[-0.4, 0, 0.4].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 0.02, 8]} />
          <meshStandardMaterial {...panelMaterial} />
        </mesh>
      ))}
      {/* Side Vents */}
      {[-0.6, 0.6].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[0.1, 0, -0.1].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial {...panelMaterial} />
            </mesh>
          ))}
        </group>
      ))}
      <Accessories position={[0, 0, 0]} accessories={accessories} />
    </group>,
    
    // Style 2: Friendly Robot Head
    <group position={position} key="head2">
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Large Expressive Eyes */}
      <mesh position={[0.3, 0.1, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.1, 0.55]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, 0.1, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.3, 0.1, 0.55]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Smiling Mouth */}
      <mesh position={[0, -0.3, 0.5]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.3, 0.5]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.2, 0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <Accessories position={[0, 0, 0]} accessories={accessories} />
    </group>,
    
    // Style 3: Steampunk Humanoid Head
    <group position={position} key="head3">
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Goggle Eyes */}
      <mesh position={[0.25, 0.1, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial {...glassFinish} />
      </mesh>
      <mesh position={[-0.25, 0.1, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial {...glassFinish} />
      </mesh>
      {/* Mechanical Nose */}
      <mesh position={[0, -0.1, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
      {/* Mechanical Mouth */}
      <mesh position={[0, -0.3, 0.5]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
      <Gear position={[0.4, 0.2, 0.4]} scale={0.3} />
      <Gear position={[-0.4, 0.2, 0.4]} scale={0.3} />
      <Accessories position={[0, 0, 0]} accessories={accessories} />
    </group>,

    // Style 4: Anime-Style Head
    <group position={position} key="head4">
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Large Anime Eyes */}
      <mesh position={[0.3, 0.1, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.1, 0.55]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, 0.1, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.3, 0.1, 0.55]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Small Nose */}
      <mesh position={[0, -0.1, 0.6]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Small Mouth */}
      <mesh position={[0, -0.3, 0.5]}>
        <torusGeometry args={[0.15, 0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <Accessories position={[0, 0, 0]} accessories={accessories} />
    </group>,

    // Style 5: Classic Robot Head
    <group position={position} key="head5">
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* LED Eyes */}
      <mesh position={[0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, 0.1, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      {/* Speaker Mouth */}
      <mesh position={[0, -0.2, 0.41]}>
        <boxGeometry args={[0.4, 0.1, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.2, 0.41]}>
        <boxGeometry args={[0.3, 0.01, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.25, 0.41]}>
        <boxGeometry args={[0.3, 0.01, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <Accessories position={[0, 0, 0]} accessories={accessories} />
    </group>
  ];

  return headGeometries[style - 1];
};

const RobotBody: React.FC<RobotPartProps> = ({ position = [0, 0, 0], color, style }) => {
  const bodyGeometries = [
    // Style 1: Modern Armored Body
    <group position={position} key="body1">
      {/* Main Torso */}
      <mesh>
        <boxGeometry args={[1.2, 1.8, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Chest Plates */}
      <group position={[0, 0.2, 0.41]}>
        {/* Center Panel */}
        <mesh>
          <boxGeometry args={[0.6, 0.8, 0.01]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Side Panels */}
        {[-0.4, 0.4].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.2, 0.7, 0.01]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Ventilation Strips */}
        {[-0.2, 0, 0.2].map((y) => (
          <mesh key={y} position={[0, y, 0.01]}>
            <boxGeometry args={[0.4, 0.05, 0.02]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
      {/* Waist Section */}
      <group position={[0, -0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.5, 0.4, 8]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Waist Details */}
        {[-0.1, 0.1].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.05, 8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
      {/* Shoulder Armor */}
      {[-0.7, 0.7].map((x) => (
        <group key={x} position={[x, 0.7, 0]}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Shoulder Panel Lines */}
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[0.4, 0.05, 0.01]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>,
    
    // Style 2: Clockwork Body
    <group position={position} key="body2">
      <mesh>
        <boxGeometry args={[1.8, 2.2, 1]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
      {/* Gears visible through glass panel */}
      <mesh position={[0, 0, 0.6]}>
        <boxGeometry args={[1.4, 1.8, 0.1]} />
        <meshStandardMaterial {...glassFinish} />
      </mesh>
      <Gear position={[0.3, 0.3, 0.5]} scale={0.5} />
      <Gear position={[-0.3, -0.3, 0.5]} scale={0.5} />
      <Gear position={[0.3, -0.3, 0.5]} scale={0.4} />
      <Pipe start={[-0.8, -0.8, 0]} end={[-0.8, 0.8, 0]} radius={0.08} />
      <Pipe start={[0.8, -0.8, 0]} end={[0.8, 0.8, 0]} radius={0.08} />
    </group>,
    
    // Style 3: Industrial Furnace Body
    <group position={position} key="body3">
      <mesh>
        <cylinderGeometry args={[1.2, 1, 2.2, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Furnace Window */}
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial {...glassFinish} emissive="#ff4400" emissiveIntensity={1} />
      </mesh>
      <Gear position={[0.8, 0.5, 0.5]} scale={0.5} rotation={[0, 0, Math.PI/3]} />
      <Gear position={[-0.8, 0.5, 0.5]} scale={0.5} rotation={[0, 0, -Math.PI/3]} />
      <Pipe start={[-0.6, -0.8, 0.5]} end={[-0.6, 0.8, 0.5]} radius={0.1} />
      <Pipe start={[0.6, -0.8, 0.5]} end={[0.6, 0.8, 0.5]} radius={0.1} />
    </group>,

    // Style 4: Feminine Body
    <group position={position} key="body4">
      <mesh>
        <cylinderGeometry args={[0.8, 1, 2, 8]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Waist */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 8]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
    </group>,

    // Style 5: Masculine Body
    <group position={position} key="body5">
      <mesh>
        <boxGeometry args={[1.2, 2.4, 1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Shoulder Pads */}
      <mesh position={[-0.8, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
      <mesh position={[0.8, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial {...brassFinish} />
      </mesh>
    </group>
  ];

  return bodyGeometries[style - 1];
};

const RobotArms: React.FC<RobotPartProps> = ({ position = [0, 0, 0], color, style }) => {
  const armGeometries = [
    // Style 1: Modern Humanoid Arms
    <group position={position} key="arms1">
      {/* Left Arm */}
      <group position={[-1.2, 0, 0]}>
        {/* Enhanced Shoulder Joint */}
        <group position={[0, 0.2, 0]}>
          {/* Core Joint Sphere */}
          <mesh>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.2, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Rings */}
          {[-0.08, 0, 0.08].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.32, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hydraulic Pistons */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.2, 0.1, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Upper Arm with Enhanced Details */}
        <group position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.2, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Enhanced Armor Plates */}
          {[-0.3, 0, 0.3].map((y, i) => (
            <group key={y}>
              <mesh position={[0, y, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.05, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Additional Detail Rings */}
              <mesh position={[0, y, 0]}>
                <torusGeometry args={[0.26, 0.01, 16, 32]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Elbow Joint */}
        <group position={[-0.3, -0.8, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.15, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Mechanism Details */}
          {[-0.06, 0, 0.06].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.24, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hydraulic System */}
          <group position={[0.1, 0.1, 0]} rotation={[0, 0, Math.PI/4]}>
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
              <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>

        {/* Forearm */}
        <group position={[-0.4, -1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Forearm Panels */}
          {[-0.2, 0, 0.2].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.21, 0.26, 0.05, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Hand */}
        <group position={[-0.4, -1.5, 0]}>
          {/* Palm */}
          <mesh>
            <boxGeometry args={[0.3, 0.4, 0.2]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Fingers with Joints */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i} position={[-0.1, -0.1 + i * 0.15, 0]}>
              {/* Finger Base */}
              <mesh>
                <boxGeometry args={[0.15, 0.08, 0.15]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Finger Joint */}
              <mesh position={[-0.08, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Finger Tip */}
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.02, 0.06, 0.13]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
          {/* Thumb */}
          <group position={[0.1, 0.1, 0]}>
            <mesh>
              <boxGeometry args={[0.1, 0.15, 0.1]} />
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.05, 0, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[1.2, 0, 0]} scale={[-1, 1, 1]}>
        {/* Enhanced Shoulder Joint */}
        <group position={[0, 0.2, 0]}>
          {/* Core Joint Sphere */}
          <mesh>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.2, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Rings */}
          {[-0.08, 0, 0.08].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.32, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hydraulic Pistons */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.2, 0.1, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Upper Arm with Enhanced Details */}
        <group position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.2, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Enhanced Armor Plates */}
          {[-0.3, 0, 0.3].map((y, i) => (
            <group key={y}>
              <mesh position={[0, y, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.05, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Additional Detail Rings */}
              <mesh position={[0, y, 0]}>
                <torusGeometry args={[0.26, 0.01, 16, 32]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Elbow Joint */}
        <group position={[-0.3, -0.8, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.15, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Mechanism Details */}
          {[-0.06, 0, 0.06].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.24, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hydraulic System */}
          <group position={[0.1, 0.1, 0]} rotation={[0, 0, Math.PI/4]}>
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
              <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>

        {/* Forearm */}
        <group position={[-0.4, -1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Forearm Panels */}
          {[-0.2, 0, 0.2].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.21, 0.26, 0.05, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Hand */}
        <group position={[-0.4, -1.5, 0]}>
          {/* Palm */}
          <mesh>
            <boxGeometry args={[0.3, 0.4, 0.2]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Fingers with Joints */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i} position={[-0.1, -0.1 + i * 0.15, 0]}>
              {/* Finger Base */}
              <mesh>
                <boxGeometry args={[0.15, 0.08, 0.15]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Finger Joint */}
              <mesh position={[-0.08, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Finger Tip */}
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.02, 0.06, 0.13]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
          {/* Thumb */}
          <group position={[0.1, 0.1, 0]}>
            <mesh>
              <boxGeometry args={[0.1, 0.15, 0.1]} />
              <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.05, 0, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>
    </group>,
    
    // Style 2: Mechanical Claw Arms
    <group position={position} key="arms2">
      {/* Left Arm */}
      <group position={[-1.2, 0, 0]}>
        <Pipe start={[0, 0, 0]} end={[-0.6, -0.6, 0]} radius={0.1} />
        <group position={[-0.6, -0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <Gear position={[0, 0, 0.2]} scale={0.3} />
          {/* Claws */}
          <Pipe start={[0.1, -0.1, 0]} end={[0.3, -0.3, 0]} radius={0.05} />
          <Pipe start={[-0.1, -0.1, 0]} end={[-0.3, -0.3, 0]} radius={0.05} />
        </group>
      </group>
      {/* Right Arm */}
      <group position={[1.2, 0, 0]}>
        <Pipe start={[0, 0, 0]} end={[0.6, -0.6, 0]} radius={0.1} />
        <group position={[0.6, -0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <Gear position={[0, 0, 0.2]} scale={0.3} />
          {/* Claws */}
          <Pipe start={[0.1, -0.1, 0]} end={[0.3, -0.3, 0]} radius={0.05} />
          <Pipe start={[-0.1, -0.1, 0]} end={[-0.3, -0.3, 0]} radius={0.05} />
        </group>
      </group>
    </group>,
    
    // Style 3: Steam Powered Arms
    <group position={position} key="arms3">
      {/* Left Arm */}
      <group position={[-1.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.5]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Gear position={[0, 0.3, 0]} scale={0.4} />
        <Pipe start={[0, 0, 0]} end={[-0.5, -0.5, 0]} radius={0.12} />
        <group position={[-0.5, -0.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <Pipe start={[0, 0, 0]} end={[-0.3, -0.3, 0]} radius={0.08} />
        </group>
      </group>
      {/* Right Arm */}
      <group position={[1.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.5]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Gear position={[0, 0.3, 0]} scale={0.4} />
        <Pipe start={[0, 0, 0]} end={[0.5, -0.5, 0]} radius={0.12} />
        <group position={[0.5, -0.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial {...brassFinish} />
          </mesh>
          <Pipe start={[0, 0, 0]} end={[0.3, -0.3, 0]} radius={0.08} />
        </group>
      </group>
    </group>
  ];

  return armGeometries[style - 1];
};

const RobotLegs: React.FC<RobotPartProps> = ({ position = [0, -2, 0], color, style }) => {
  const legGeometries = [
    // Style 1: Modern Humanoid Legs
    <group position={position} key="legs1">
      {/* Left Leg */}
      <group position={[-0.4, 0, 0]}>
        {/* Enhanced Hip Joint */}
        <group position={[0, 0.2, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.2, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Rings */}
          {[-0.08, 0, 0.08].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.32, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hip Stabilizers */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.2, 0.1, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Upper Leg */}
        <group position={[0, -0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.2, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Enhanced Armor Plates */}
          {[-0.3, 0, 0.3].map((y, i) => (
            <group key={y}>
              <mesh position={[0, y, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.05, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Detail Rings */}
              <mesh position={[0, y, 0]}>
                <torusGeometry args={[0.26, 0.01, 16, 32]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Knee Joint */}
        <group position={[0, -0.8, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.15, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Mechanism */}
          {[-0.06, 0, 0.06].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.24, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Knee Stabilizers */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.15, 0, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Lower Leg */}
        <group position={[0, -1.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Lower Leg Panels */}
          {[-0.3, 0, 0.3].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.21, 0.26, 0.05, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Ankle Joint */}
        <group position={[0, -1.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Details */}
          <mesh rotation={[0, 0, Math.PI/4]}>
            <boxGeometry args={[0.25, 0.05, 0.05]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        {/* Foot */}
        <group position={[0, -1.8, 0]}>
          {/* Main Foot */}
          <mesh>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Foot Panels */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.35, 0.15, 0.05]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Toes */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i} position={[-0.15 + i * 0.1, -0.1, 0.3]}>
              <mesh>
                <boxGeometry args={[0.08, 0.1, 0.15]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.4, 0, 0]} scale={[-1, 1, 1]}>
        {/* Enhanced Hip Joint */}
        <group position={[0, 0.2, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.2, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Rings */}
          {[-0.08, 0, 0.08].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.32, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Hip Stabilizers */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.2, 0.1, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Upper Leg */}
        <group position={[0, -0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.2, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Enhanced Armor Plates */}
          {[-0.3, 0, 0.3].map((y, i) => (
            <group key={y}>
              <mesh position={[0, y, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.05, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Detail Rings */}
              <mesh position={[0, y, 0]}>
                <torusGeometry args={[0.26, 0.01, 16, 32]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Knee Joint */}
        <group position={[0, -0.8, 0]}>
          {/* Core Joint */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Housing */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.15, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Mechanism */}
          {[-0.06, 0, 0.06].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.24, 0.02, 16, 32]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          {/* Knee Stabilizers */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.15, 0, 0]} rotation={[0, 0, side * Math.PI/6]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
                <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Lower Leg */}
        <group position={[0, -1.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 1]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Lower Leg Panels */}
          {[-0.3, 0, 0.3].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.21, 0.26, 0.05, 8]} />
              <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Ankle Joint */}
        <group position={[0, -1.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Joint Details */}
          <mesh rotation={[0, 0, Math.PI/4]}>
            <boxGeometry args={[0.25, 0.05, 0.05]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        {/* Foot */}
        <group position={[0, -1.8, 0]}>
          {/* Main Foot */}
          <mesh>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Foot Panels */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.35, 0.15, 0.05]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Toes */}
          {[0, 1, 2, 3].map((i) => (
            <group key={i} position={[-0.15 + i * 0.1, -0.1, 0.3]}>
              <mesh>
                <boxGeometry args={[0.08, 0.1, 0.15]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>,
    
    // Style 2: Hydraulic Legs
    <group position={position} key="legs2">
      {/* Left Leg */}
      <group position={[-0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...brassFinish} />
        </mesh>
        <Gear position={[0.3, 0, 0.3]} scale={0.4} />
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.8]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Pipe start={[0.2, 0.4, 0]} end={[0.2, -0.4, 0]} radius={0.06} />
      </group>
      {/* Right Leg */}
      <group position={[0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...brassFinish} />
        </mesh>
        <Gear position={[-0.3, 0, 0.3]} scale={0.4} />
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.8]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Pipe start={[-0.2, 0.4, 0]} end={[-0.2, -0.4, 0]} radius={0.06} />
      </group>
    </group>,
    
    // Style 3: Steam Walker Legs
    <group position={position} key="legs3">
      {/* Left Leg */}
      <group position={[-0.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.3, 0.8]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Gear position={[0.3, 0.2, 0.2]} scale={0.5} />
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.5]} />
          <meshStandardMaterial {...brassFinish} />
        </mesh>
        <Pipe start={[0.2, 0.2, 0]} end={[0.2, -1, 0]} radius={0.08} />
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
      </group>
      {/* Right Leg */}
      <group position={[0.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.3, 0.8]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
        <Gear position={[-0.3, 0.2, 0.2]} scale={0.5} />
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.5]} />
          <meshStandardMaterial {...brassFinish} />
        </mesh>
        <Pipe start={[-0.2, 0.2, 0]} end={[-0.2, -1, 0]} radius={0.08} />
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1]} />
          <meshStandardMaterial {...copperFinish} />
        </mesh>
      </group>
    </group>
  ];

  return legGeometries[style - 1];
};

interface Robot3DProps {
  parts: {
    head: number;
    body: number;
    arms: number;
    legs: number;
    color: string;
    accessories?: {
      hat?: boolean;
      mustache?: boolean;
      lipstick?: boolean;
    };
  };
}

const Robot3D: React.FC<Robot3DProps> = ({ parts }) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <spotLight position={[0, 5, 5]} intensity={0.5} angle={0.5} penumbra={1} />
      
      <group rotation={[0, Math.PI / 4, 0]}>
        <RobotHead color={parts.color} style={parts.head} accessories={parts.accessories} />
        <RobotBody color={parts.color} style={parts.body} />
        <RobotArms color={parts.color} style={parts.arms} />
        <RobotLegs color={parts.color} style={parts.legs} />
      </group>
      
      <OrbitControls enableZoom={true} enablePan={false} />
      <gridHelper args={[20, 20, "#4fc3f7", "#4fc3f7"]} position={[0, -3, 0]} />
    </Canvas>
  );
};

export default Robot3D; 