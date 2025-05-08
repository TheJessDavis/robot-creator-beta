import React, { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';
import RobotHead from './RobotHead';
import RobotBody from './RobotBody';
import RobotArms from './RobotArms';
import RobotLegs from './RobotLegs';
import RobotNeck from './RobotNeck';

interface Robot3DProps {
  parts: {
    color: string;
    head: number;
    body: number;
    arms: number;
    legs: number;
  };
}

const Robot3D: FC<Robot3DProps> = ({ parts }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <group position={[0, 1.7, 0]}>
        <RobotHead color={parts.color} style={parts.head} />
        <RobotNeck color={parts.color} />
        <RobotBody color={parts.color} style={parts.body} />
        <RobotArms color={parts.color} style={parts.arms} />
        <RobotLegs color={parts.color} style={parts.legs} />
      </group>

      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor="#9d4b4b"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />
      
      <ContactShadows
        position={[0, -0.3, 0]}
        opacity={0.4}
        scale={5}
        blur={1.5}
        far={3}
        resolution={256}
        color="#000000"
      />
      
      <Environment preset="city" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
};

export default Robot3D; 