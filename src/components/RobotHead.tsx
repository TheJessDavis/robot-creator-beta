import React, { FC, useEffect, useState } from 'react';
import * as THREE from 'three';

interface RobotHeadProps {
  color: string;
  style: number;
}

const RobotHead: FC<RobotHeadProps> = ({ color, style }) => {
  const [eyesOpen, setEyesOpen] = useState(true);

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setEyesOpen(false);
      blinkTimeout = setTimeout(() => setEyesOpen(true), 120);
    }, 2500 + Math.random() * 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  const renderHead = () => {
    switch (style) {
      case 0: // Cubic head with LED eyes and display
        return (
          <group>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            {/* LED Eyes */}
            {eyesOpen ? (
              <>
                <mesh position={[-0.15, 1.1, 0.31]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.15, 1.1, 0.31]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
                </mesh>
              </>
            ) : (
              <>
                <mesh position={[-0.15, 1.1, 0.31]}>
                  <boxGeometry args={[0.16, 0.02, 0.02]} />
                  <meshPhysicalMaterial color="#00ff00" />
                </mesh>
                <mesh position={[0.15, 1.1, 0.31]}>
                  <boxGeometry args={[0.16, 0.02, 0.02]} />
                  <meshPhysicalMaterial color="#00ff00" />
                </mesh>
              </>
            )}
            {/* Nose */}
            <mesh position={[0, 1.0, 0.31]}>
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshPhysicalMaterial color="#444444" />
            </mesh>
            {/* Mouth */}
            <mesh position={[0, 0.9, 0.31]}>
              <boxGeometry args={[0.2, 0.05, 0.01]} />
              <meshPhysicalMaterial color="#1a1a1a" />
            </mesh>
          </group>
        );
      case 1: // Spherical head with camera eyes
        return (
          <group>
            <mesh position={[0, 1.0, 0]}>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            {/* Camera Eyes */}
            {eyesOpen ? (
              <>
                <mesh position={[-0.15, 1.1, 0.35]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
                  <meshPhysicalMaterial color="#000000" />
                </mesh>
                <mesh position={[0.15, 1.1, 0.35]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
                  <meshPhysicalMaterial color="#000000" />
                </mesh>
                {/* Camera Lenses */}
                <mesh position={[-0.15, 1.1, 0.38]}>
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshPhysicalMaterial color="#444444" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0.15, 1.1, 0.38]}>
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshPhysicalMaterial color="#444444" metalness={0.9} roughness={0.1} />
                </mesh>
              </>
            ) : (
              <>
                <mesh position={[-0.15, 1.1, 0.35]}>
                  <boxGeometry args={[0.16, 0.02, 0.05]} />
                  <meshPhysicalMaterial color="#000000" />
                </mesh>
                <mesh position={[0.15, 1.1, 0.35]}>
                  <boxGeometry args={[0.16, 0.02, 0.05]} />
                  <meshPhysicalMaterial color="#000000" />
                </mesh>
              </>
            )}
            {/* Nose */}
            <mesh position={[0, 1.0, 0.38]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshPhysicalMaterial color="#444444" />
            </mesh>
            {/* Mouth */}
            <mesh position={[0, 0.9, 0.38]}>
              <boxGeometry args={[0.15, 0.03, 0.01]} />
              <meshPhysicalMaterial color="#1a1a1a" />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.45, 1.3, 0]} rotation={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.08, 0.06, 0.4, 16]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} />
            </mesh>
            <mesh position={[0.45, 1.3, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.08, 0.06, 0.4, 16]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} />
            </mesh>
            {/* Inner Ears */}
            <mesh position={[-0.45, 1.3, 0]} rotation={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.06, 0.04, 0.35, 16]} />
              <meshPhysicalMaterial color="#ff9999" metalness={0.3} roughness={0.4} />
            </mesh>
            <mesh position={[0.45, 1.3, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.06, 0.04, 0.35, 16]} />
              <meshPhysicalMaterial color="#ff9999" metalness={0.3} roughness={0.4} />
            </mesh>
          </group>
        );
      case 2: // Cylindrical head with radar face
        return (
          <group>
            <mesh position={[0, 1.0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
              <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            {/* Radar Face */}
            <mesh position={[0, 1.0, 0.31]}>
              <circleGeometry args={[0.25, 32]} />
              <meshPhysicalMaterial color="#1a1a1a" />
            </mesh>
            {/* Eyes */}
            {eyesOpen ? (
              <>
                <mesh position={[-0.1, 1.1, 0.32]}>
                  <circleGeometry args={[0.05, 16]} />
                  <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.1, 1.1, 0.32]}>
                  <circleGeometry args={[0.05, 16]} />
                  <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
                </mesh>
              </>
            ) : (
              <>
                <mesh position={[-0.1, 1.1, 0.32]}>
                  <boxGeometry args={[0.1, 0.01, 0.01]} />
                  <meshPhysicalMaterial color="#00ff00" />
                </mesh>
                <mesh position={[0.1, 1.1, 0.32]}>
                  <boxGeometry args={[0.1, 0.01, 0.01]} />
                  <meshPhysicalMaterial color="#00ff00" />
                </mesh>
              </>
            )}
            {/* Nose */}
            <mesh position={[0, 1.0, 0.32]}>
              <circleGeometry args={[0.03, 16]} />
              <meshPhysicalMaterial color="#444444" />
            </mesh>
            {/* Mouth */}
            <mesh position={[0, 0.9, 0.32]}>
              <boxGeometry args={[0.15, 0.02, 0.01]} />
              <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} />
            </mesh>
            {/* Radar Scanner */}
            <mesh position={[0, 1.0, 0.32]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.4, 0.02, 0.01]} />
              <meshPhysicalMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case 3: // Small cubic head with sensor array
        return (
          <group>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.15} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.15, 1.1, 0.26]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.15, 1.1, 0.26]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 1.0, 0.26]}>
              <boxGeometry args={[0.04, 0.04, 0.04]} />
              <meshPhysicalMaterial color="#444444" />
            </mesh>
            {/* Mouth */}
            <mesh position={[0, 0.9, 0.26]}>
              <boxGeometry args={[0.2, 0.03, 0.01]} />
              <meshPhysicalMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
            </mesh>
            {/* Sensor Array */}
            <mesh position={[0, 1.1, 0.26]}>
              <boxGeometry args={[0.4, 0.1, 0.01]} />
              <meshPhysicalMaterial color="#1a1a1a" />
            </mesh>
          </group>
        );
      case 4: // Large cubic head with display matrix
        return (
          <group>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.55, 0.55, 0.55]} />
              <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.15, 1.1, 0.28]}>
              <boxGeometry args={[0.1, 0.1, 0.01]} />
              <meshPhysicalMaterial color="#40F7FF" emissive="#40F7FF" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.15, 1.1, 0.28]}>
              <boxGeometry args={[0.1, 0.1, 0.01]} />
              <meshPhysicalMaterial color="#40F7FF" emissive="#40F7FF" emissiveIntensity={0.5} />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 1.0, 0.28]}>
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshPhysicalMaterial color="#444444" />
            </mesh>
            {/* Mouth */}
            <mesh position={[0, 0.9, 0.28]}>
              <boxGeometry args={[0.25, 0.05, 0.01]} />
              <meshPhysicalMaterial color="#40F7FF" emissive="#40F7FF" emissiveIntensity={0.3} />
            </mesh>
            {/* Display Matrix */}
            <mesh position={[0, 1.0, 0.28]}>
              <boxGeometry args={[0.4, 0.4, 0.01]} />
              <meshPhysicalMaterial color="#000000" />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <group>
      {renderHead()}
    </group>
  );
};

export default RobotHead; 