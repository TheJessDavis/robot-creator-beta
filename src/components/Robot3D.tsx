import React, { FC, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';

// Material presets
const getMaterialWithColor = (baseMaterial: any, color?: string) => {
  if (!color) return baseMaterial;
  return {
    ...baseMaterial,
    color: color,
    envMapIntensity: 1.5
  };
};

const mainBodyMaterial = {
  color: '#E8EDF2', // Light gray/white
  metalness: 0.7,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  transmission: 0,
  thickness: 0
};

const accentMaterial = {
  color: '#1A1B35', // Navy blue
  metalness: 0.8,
  roughness: 0.15,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  transmission: 0,
  thickness: 0
};

const highlightMaterial = {
  color: '#40F7FF', // Cyan
  metalness: 0.9,
  roughness: 0.1,
  emissive: '#40F7FF',
  emissiveIntensity: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.8,
  transmission: 0,
  thickness: 0
};

const glowMaterial = {
  color: '#40F7FF',
  emissive: '#40F7FF',
  emissiveIntensity: 1,
  metalness: 0.8,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.8,
  transmission: 0,
  thickness: 0
};

// New material presets for Style 3
const mintMaterial = {
  color: '#7FE6D4', // Mint green
  metalness: 0.6,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  transmission: 0,
  thickness: 0
};

const coralMaterial = {
  color: '#FFA69E', // Coral pink
  metalness: 0.6,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  transmission: 0,
  thickness: 0
};

const creamMaterial = {
  color: '#FFF4D4', // Cream color
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  transmission: 0,
  thickness: 0
};

interface RobotPartProps {
  color: string;
  style: number;
  accessories?: {
    hat?: 'cowboy' | 'bonnet' | false;
    mustache?: boolean;
    lipstick?: boolean;
  };
}

const RobotHead: FC<RobotPartProps> = ({ color, style, accessories }) => {
  const [expression, setExpression] = useState<string>('neutral');
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  // Add blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 1500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Add expression cycling
  useEffect(() => {
    const expressions = ['neutral', 'happy', 'surprised', 'angry'];
    let currentIndex = 0;
    const expressionInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % expressions.length;
      setExpression(expressions[currentIndex]);
    }, 5000);
    return () => clearInterval(expressionInterval);
  }, []);

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
        0: [0, 0.6, 0],      // Original style
        1: [0, 0.5, 0],      // Sleek visor style
        2: [0, 0.5, 0],      // Cute round style
        3: [0, 0.5, 0],      // Mint style
        4: [0, 0.5, 0.1],    // Sci-fi angular style
      },
      mustache: {
        0: [0, -0.05, 0.42], // Original style
        1: [0, -0.1, 0.37],  // Sleek visor style
        2: [0, -0.05, 0.52], // Cute round style
        3: [0, -0.05, 0.52], // Mint style
        4: [0, -0.05, 0.51], // Sci-fi angular style
      },
      lipstick: {
        0: [0, -0.15, 0.42], // Original style - aligned with face screen
        1: [0, -0.2, 0.37],  // Sleek visor style - aligned with visor
        2: [0, -0.15, 0.52], // Cute round style - aligned with curved face
        3: [0, -0.15, 0.52], // Mint style - aligned with face plate
        4: [0, -0.15, 0.51], // Sci-fi angular style - aligned with face panel
      }
    };

    const renderCowboyHat = (position: [number, number, number]) => (
      <group position={position}>
        {/* Hat Crown */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.3, 32]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        {/* Hat Brim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        {/* Hat Band */}
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[0.35, 0.03, 16, 32]} />
          <meshPhysicalMaterial color="#4A2803" metalness={0.6} roughness={0.2} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        {/* Hat Dent - Left */}
        <mesh position={[-0.2, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
        {/* Hat Dent - Right */}
        <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#8B4513" metalness={0.5} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>
      </group>
    );

    const renderBonnet = (position: [number, number, number]) => (
      <group position={position}>
        {/* Main Bonnet Shape */}
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#FFB6C1" side={THREE.DoubleSide} />
        </mesh>
        {/* Bonnet Rim */}
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
          <meshPhysicalMaterial color="#FFB6C1" />
        </mesh>
        {/* Decorative Ribbon */}
        <mesh position={[0, 0.1, 0.3]} rotation={[Math.PI / 3, 0, 0]}>
          <boxGeometry args={[0.6, 0.08, 0.02]} />
          <meshPhysicalMaterial color="#FF69B4" />
        </mesh>
        {/* Ribbon Bow */}
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
        {/* Bonnet Ruffles */}
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
        {/* Render accessories in specific order: hat first, then face accessories */}
        {accessories.hat && (
          <>
            {accessories.hat === 'cowboy' && renderCowboyHat(positions.hat[headStyle] || positions.hat[0])}
            {accessories.hat === 'bonnet' && renderBonnet(positions.hat[headStyle] || positions.hat[0])}
          </>
        )}
        {/* Face accessories with proper z-positioning */}
        <group position={[0, 0, 0.01]}>  {/* Slight offset to prevent z-fighting */}
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
                <meshPhysicalMaterial color="#FF69B4" />
              </mesh>
            </group>
          )}
        </group>
      </group>
    );
  };

  const headGeometries = [
    // Modern Friendly Robot Head (Style 0)
    <group key="head1">
      {/* Main Head Shape */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Face Screen */}
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[1.0, 0.6, 0.01]} />
        <meshPhysicalMaterial {...accentMaterial} />
      </mesh>
      {/* Eyes */}
      <group position={[0, 0.1, 0.42]}>
        <mesh position={[-0.25, 0, 0]}>
          <boxGeometry args={[0.15, 0.25, 0.01]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[0.15, 0.25, 0.01]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      {/* Smile */}
      <mesh position={[0, -0.15, 0.42]}>
        <boxGeometry args={[0.4, 0.08, 0.01]} />
        <meshPhysicalMaterial {...glowMaterial} />
      </mesh>
      {/* Side Panels */}
      <group position={[-0.6, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.12, 0.15, 16]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      </group>
      <group position={[0.6, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.12, 0.15, 16]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      </group>
      {/* Top Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshPhysicalMaterial {...highlightMaterial} />
      </mesh>
      {renderAccessories(0)}
    </group>,
    // Sleek Visor Head (Style 1)
    <group key="head4">
      {/* Main Head Shape */}
      <mesh>
        <boxGeometry args={[1.0, 0.7, 0.7]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 0.1, 0.36]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32, 1, true]} />
        <meshPhysicalMaterial {...highlightMaterial} transparent opacity={0.8} />
      </mesh>
      {/* Antenna */}
      <group position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.02, 0.3, 8]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      </group>
      {renderAccessories(1)}
    </group>,
    // Cute Round Robot Head (Style 2)
    <group key="head2">
      {/* Main Head Shape - More rounded */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Face Screen - Curved */}
      <mesh position={[0, 0, 0.35]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial {...accentMaterial} />
      </mesh>
      {/* Cute Eyes */}
      <group position={[0, 0.1, 0.5]}>
        <mesh position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      {/* Cute Smile */}
      <mesh position={[0, -0.1, 0.5]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.15, 0.04, 16, 32, Math.PI]} />
        <meshPhysicalMaterial {...glowMaterial} />
      </mesh>
      {/* Cute Ears/Horns */}
      <group position={[-0.4, 0.4, 0]}>
        <mesh rotation={[0, 0, Math.PI/4]}>
          <coneGeometry args={[0.15, 0.3, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      <group position={[0.4, 0.4, 0]}>
        <mesh rotation={[0, 0, -Math.PI/4]}>
          <coneGeometry args={[0.15, 0.3, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      {renderAccessories(2)}
    </group>,
    // Cute Mint Robot Head (Style 3)
    <group key="head3">
      {/* Main Head Shape */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
      </mesh>
      {/* Face Plate */}
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[0.8, 0.6, 0.4]} />
        <meshPhysicalMaterial {...creamMaterial} />
      </mesh>
      {/* Eyes */}
      <group position={[0, 0.05, 0.5]}>
        <mesh position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshPhysicalMaterial color="black" />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshPhysicalMaterial color="black" />
        </mesh>
        {/* Eye Highlights */}
        <mesh position={[-0.17, 0.03, 0.08]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color="white" />
        </mesh>
        <mesh position={[0.23, 0.03, 0.08]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial color="white" />
        </mesh>
      </group>
      {/* Smile */}
      <mesh position={[0, -0.15, 0.5]}>
        <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
        <meshPhysicalMaterial color="black" />
      </mesh>
      {/* Antenna */}
      <group position={[0, 0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          <meshPhysicalMaterial {...mintMaterial} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
      </group>
      {/* Ear Pieces */}
      <group position={[-0.4, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
      </group>
      <group position={[0.4, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
      </group>
      {renderAccessories(3)}
    </group>,
    // Sci-fi Angular Head (Style 4)
    <group key="head5">
      {/* Main Head Shape */}
      <mesh rotation={[0, 0, 0]}>
        <octahedronGeometry args={[0.7]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Face Panel */}
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshPhysicalMaterial {...accentMaterial} />
      </mesh>
      {/* Eyes */}
      <group position={[0, 0.1, 0.51]}>
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.01]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.01]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      </group>
      {renderAccessories(4)}
    </group>
  ];

  return headGeometries[style % headGeometries.length] || headGeometries[0];
};

const RobotBody: FC<RobotPartProps> = ({ color, style }) => {
  const bodyGeometries = [
    // Modern Friendly Robot Body (Style 0)
    <group key="body1">
      {/* Main Torso */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.6, 1.6, 8]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Center Circle */}
      <group position={[0, 0, 0.81]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <cylinderGeometry args={[0.25, 0.25, 0.01, 32]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      {/* Shoulder Connectors */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.8, 0.4, 0]}>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[side * 0.1, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.1, 16]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      ))}
      {/* Highlight Stripes */}
      {[-0.3, 0, 0.3].map((y) => (
        <mesh key={y} position={[0, y, 0.82]}>
          <boxGeometry args={[1.2, 0.05, 0.01]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      ))}
    </group>,
    // Armored Body (Style 1)
    <group key="body4">
      {/* Main Torso */}
      <mesh>
        <boxGeometry args={[1.0, 1.4, 0.8]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Chest Plate */}
      <mesh position={[0, 0.2, 0.41]}>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshPhysicalMaterial {...accentMaterial} />
      </mesh>
      {/* Power Core */}
      <mesh position={[0, 0, 0.45]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial {...highlightMaterial} />
      </mesh>
      {/* Shoulder Pads */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.6, 0.5, 0]}>
          <mesh rotation={[0, 0, side * Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      ))}
    </group>,
    // Cute Round Robot Body (Style 2)
    <group key="body2">
      {/* Main Torso - More rounded */}
      <mesh>
        <capsuleGeometry args={[0.6, 0.8, 16, 16]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Cute Heart Center */}
      <group position={[0, 0, 0.61]}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
        <mesh position={[0.15, 0.15, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
        <mesh position={[-0.15, 0.15, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial {...glowMaterial} />
        </mesh>
      </group>
      {/* Shoulder Connectors - Rounded */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.7, 0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.12, 0.15, 16]} />
            <meshPhysicalMaterial {...glowMaterial} />
          </mesh>
        </group>
      ))}
    </group>,
    // Cute Mint Robot Body (Style 3)
    <group key="body3">
      {/* Main Body */}
      <mesh>
        <capsuleGeometry args={[0.5, 0.6, 32, 16]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
      </mesh>
      {/* Chest Panel */}
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[0.6, 0.5, 0.2]} />
        <meshPhysicalMaterial {...creamMaterial} />
      </mesh>
      {/* Shoulder Joints */}
      <group position={[-0.6, 0.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial {...mintMaterial} />
        </mesh>
      </group>
      <group position={[0.6, 0.2, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial {...mintMaterial} />
        </mesh>
      </group>
    </group>,
    // Sleek Futuristic Body (Style 4)
    <group key="body5">
      {/* Main Torso */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.7, 1.4, 8]} />
        <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
      </mesh>
      {/* Energy Lines */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.51]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
      ))}
    </group>
  ];

  return bodyGeometries[style % bodyGeometries.length] || bodyGeometries[0];
};

const RobotArms: FC<RobotPartProps> = ({ color, style }) => {
  const armGeometries = [
    // Modern Friendly Robot Arms (Style 0)
    <group key="arms1">
      {/* Left Arm */}
      <group position={[-1.1, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Highlight Rings */}
        {[-0.2, 0, 0.2].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        ))}
        {/* Hand */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.1, 0.13, 16]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[1.1, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        {/* Highlight Rings */}
        {[-0.2, 0, 0.2].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        ))}
        {/* Hand */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.1, 0.13, 16]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Heavy Duty Arms (Style 1)
    <group key="arms4">
      {/* Left Arm */}
      <group position={[-0.9, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 8]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        {/* Lower Arm */}
        <group position={[0, -0.6, 0]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.15, 0.4, 8]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[0.9, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 8]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        {/* Lower Arm */}
        <group position={[0, -0.6, 0]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.15, 0.4, 8]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
        </group>
      </group>
    </group>,
    // Cute Round Robot Arms (Style 2)
    <group key="arms2">
      {/* Left Arm */}
      <group position={[-0.9, 0.4, 0]}>
        {/* Upper Arm - Rounded */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Cute Hand */}
        <group position={[0, -0.3, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial {...glowMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[0.9, 0.4, 0]}>
        {/* Upper Arm - Rounded */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        {/* Cute Hand */}
        <group position={[0, -0.3, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial {...glowMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Cute Mint Robot Arms (Style 3)
    <group key="arms3">
      {/* Left Arm */}
      <group position={[-0.8, 0.2, 0]}>
        {/* Upper Arm */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.3, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
        {/* Lower Arm */}
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.2, 16, 16]} />
          <meshPhysicalMaterial {...mintMaterial} />
        </mesh>
        {/* Hand */}
        <group position={[0, -0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
          {/* Fingers */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[
              Math.sin((i * Math.PI) / 3) * 0.1,
              -0.1,
              Math.cos((i * Math.PI) / 3) * 0.1
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshPhysicalMaterial {...coralMaterial} />
            </mesh>
          ))}
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[0.8, 0.2, 0]}>
        {/* Upper Arm */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.3, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
        {/* Lower Arm */}
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.2, 16, 16]} />
          <meshPhysicalMaterial {...mintMaterial} />
        </mesh>
        {/* Hand */}
        <group position={[0, -0.6, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
          {/* Fingers */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[
              Math.sin((i * Math.PI) / 3) * 0.1,
              -0.1,
              Math.cos((i * Math.PI) / 3) * 0.1
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshPhysicalMaterial {...coralMaterial} />
            </mesh>
          ))}
        </group>
      </group>
    </group>,
    // Slim Robotic Arms (Style 4)
    <group key="arms5">
      {/* Left Arm */}
      <group position={[-0.8, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Energy Ring */}
        <mesh position={[0, -0.2, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
        {/* Lower Arm */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
        </group>
      </group>
      {/* Right Arm - mirrored */}
      <group position={[0.8, 0.4, 0]}>
        {/* Upper Arm */}
        <mesh>
          <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Energy Ring */}
        <mesh position={[0, -0.2, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
        {/* Lower Arm */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
        </group>
      </group>
    </group>
  ];

  return armGeometries[style % armGeometries.length] || armGeometries[0];
};

const RobotLegs: FC<RobotPartProps> = ({ color, style }) => {
  const legGeometries = [
    // Modern Friendly Robot Legs (Style 0)
    <group key="legs1">
      {/* Left Leg */}
      <group position={[-0.4, -1.0, 0]}>
        {/* Upper Leg */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.18, 0.8, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Highlight Rings */}
        {[-0.3, -0.1, 0.1].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.21, 0.02, 16, 32]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        ))}
        {/* Foot */}
        <group position={[0, -0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.38, 0.18, 0.05]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.4, -1.0, 0]}>
        {/* Upper Leg */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.18, 0.8, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        {/* Highlight Rings */}
        {[-0.3, -0.1, 0.1].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.21, 0.02, 16, 32]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        ))}
        {/* Foot */}
        <group position={[0, -0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.38, 0.18, 0.05]} />
            <meshPhysicalMaterial {...highlightMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Heavy Duty Legs (Style 1)
    <group key="legs4">
      {/* Left Leg */}
      <group position={[-0.4, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.2, 0.6, 8]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.3]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.7, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.3, 0.1]}>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.4, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.2, 0.6, 8]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.3]} />
          <meshPhysicalMaterial {...accentMaterial} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.7, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.3, 0.1]}>
            <boxGeometry args={[0.4, 0.2, 0.6]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Cute Round Robot Legs (Style 2)
    <group key="legs2">
      {/* Left Leg */}
      <group position={[-0.3, -0.8, 0]}>
        {/* Upper Leg - Rounded */}
        <mesh>
          <capsuleGeometry args={[0.15, 0.6, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Cute Foot */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, -0.1, 0.1]}>
            <boxGeometry args={[0.3, 0.1, 0.4]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[0.28, 0.08, 0.05]} />
            <meshPhysicalMaterial {...glowMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.3, -0.8, 0]}>
        {/* Upper Leg - Rounded */}
        <mesh>
          <capsuleGeometry args={[0.15, 0.6, 16, 16]} />
          <meshPhysicalMaterial {...mainBodyMaterial} />
        </mesh>
        {/* Cute Foot */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, -0.1, 0.1]}>
            <boxGeometry args={[0.3, 0.1, 0.4]} />
            <meshPhysicalMaterial {...mainBodyMaterial} />
          </mesh>
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[0.28, 0.08, 0.05]} />
            <meshPhysicalMaterial {...glowMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Cute Mint Robot Legs (Style 3)
    <group key="legs3">
      {/* Left Leg */}
      <group position={[-0.3, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
        {/* Foot */}
        <group position={[0, -0.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.05, 32]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.3, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mintMaterial, color)} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshPhysicalMaterial {...coralMaterial} />
        </mesh>
        {/* Foot */}
        <group position={[0, -0.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.05, 32]} />
            <meshPhysicalMaterial {...coralMaterial} />
          </mesh>
        </group>
      </group>
    </group>,
    // Sleek Digitigrade Legs (Style 4)
    <group key="legs5">
      {/* Left Leg */}
      <group position={[-0.3, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.5, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Energy Ring */}
        <mesh position={[0, -0.3, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.6, 0.2]}>
          <mesh rotation={[Math.PI / 6, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.3, 0.1]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.4]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      </group>
      {/* Right Leg - mirrored */}
      <group position={[0.3, -0.8, 0]}>
        {/* Upper Leg */}
        <mesh>
          <capsuleGeometry args={[0.12, 0.5, 16, 16]} />
          <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
        </mesh>
        {/* Energy Ring */}
        <mesh position={[0, -0.3, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshPhysicalMaterial {...highlightMaterial} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.6, 0.2]}>
          <mesh rotation={[Math.PI / 6, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
            <meshPhysicalMaterial {...getMaterialWithColor(mainBodyMaterial, color)} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.3, 0.1]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.4]} />
            <meshPhysicalMaterial {...accentMaterial} />
          </mesh>
        </group>
      </group>
    </group>
  ];

  return legGeometries[style % legGeometries.length] || legGeometries[0];
};

interface Robot3DProps {
  parts: {
    color: string;
    head: number;
    body: number;
    arms: number;
    legs: number;
    accessories?: {
      hat?: 'cowboy' | 'bonnet' | false;
      mustache?: boolean;
      lipstick?: boolean;
    };
  };
}

const Robot3D: FC<Robot3DProps> = ({ parts }) => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      <color attach="background" args={['#1a1a1a']} />
      <fog attach="fog" args={['#1a1a1a', 5, 15]} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffd700" />
      <spotLight position={[-10, 10, -10]} angle={0.3} intensity={0.8} castShadow color="#ffd700" />
      
      <Environment preset="warehouse" />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Steampunk Lab Elements */}
      <group position={[0, 0, 0]}>
        {/* Main Robot */}
        <group position={[0, 1.5, 0]}>
          <RobotHead color={parts.color} style={parts.head} accessories={parts.accessories} />
        </group>
        <group position={[0, 0.2, 0]}>
          <RobotBody color={parts.color} style={parts.body} />
        </group>
        <group position={[0, 0.2, 0]}>
          <RobotArms color={parts.color} style={parts.arms} />
        </group>
        <group position={[0, 0.1, 0]}>
          <RobotLegs color={parts.color} style={parts.legs} />
        </group>

        {/* Steampunk Lab Details */}
        {/* Large Gears on the Wall */}
        <group position={[-3, 1, -3]} rotation={[0, Math.PI / 4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[
              Math.cos(i * Math.PI / 4) * 0.4,
              0,
              Math.sin(i * Math.PI / 4) * 0.4
            ]}>
              <boxGeometry args={[0.1, 0.1, 0.2]} />
              <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </group>

        {/* Pipes */}
        <group position={[2, 0, -2]}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
            <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[1.5, 0, 1.5]}>
            <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
            <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Workbench */}
        <group position={[0, -1.2, -2]}>
          <mesh>
            <boxGeometry args={[3, 0.1, 1]} />
            <meshStandardMaterial color="#4A2803" metalness={0.5} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial color="#4A2803" metalness={0.5} roughness={0.7} />
          </mesh>
        </group>

        {/* Tools and Equipment */}
        <group position={[1, -1.1, -2]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
            <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#8B4513" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      <Grid
        position={[0, -1.5, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#9d4b4b"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default Robot3D; 