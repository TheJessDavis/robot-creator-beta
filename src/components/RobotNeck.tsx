import React, { FC } from 'react';

interface RobotNeckProps {
  color: string;
}

const RobotNeck: FC<RobotNeckProps> = ({ color }) => {
  return (
    <group>
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.18, 24]} />
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.2} clearcoat={0.7} clearcoatRoughness={0.2} />
      </mesh>
    </group>
  );
};

export default RobotNeck; 