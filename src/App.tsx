import React, { useState } from 'react';
import {
  Container,
  MainPanel,
  Header,
  RobotCanvas,
  ControlPanel,
  Button,
  ModuleStatus,
  ColorPicker,
  ToolsDecoration,
  LightBulbs
} from './styles';
import Robot3D from './components/Robot3D';

interface RobotParts {
  head: number;
  body: number;
  arms: number;
  legs: number;
  color: string;
  accessories: {
    hat: boolean;
    mustache: boolean;
    lipstick: boolean;
  };
}

// Predefined accessory combinations
const ACCESSORY_PRESETS = [
  { hat: false, mustache: false, lipstick: false }, // None
  { hat: true, mustache: false, lipstick: false },  // Just hat
  { hat: true, mustache: true, lipstick: false },   // Hat + mustache
  { hat: false, mustache: true, lipstick: false },  // Just mustache
  { hat: false, mustache: false, lipstick: true },  // Just lipstick
  { hat: true, mustache: false, lipstick: true },   // Hat + lipstick
  { hat: false, mustache: true, lipstick: true },   // Mustache + lipstick
  { hat: true, mustache: true, lipstick: true },    // All accessories
];

const App: React.FC = () => {
  const [robotParts, setRobotParts] = useState<RobotParts>({
    head: 1,
    body: 1,
    arms: 1,
    legs: 1,
    color: '#4fc3f7',
    accessories: ACCESSORY_PRESETS[0]
  });

  const [accessoryIndex, setAccessoryIndex] = useState(0);

  const updatePart = (part: keyof RobotParts) => {
    if (typeof robotParts[part] === 'number') {
      setRobotParts(prev => ({
        ...prev,
        [part]: (prev[part] as number % 5) + 1,
      }));
    }
  };

  const cycleAccessories = () => {
    const nextIndex = (accessoryIndex + 1) % ACCESSORY_PRESETS.length;
    setAccessoryIndex(nextIndex);
    setRobotParts(prev => ({
      ...prev,
      accessories: ACCESSORY_PRESETS[nextIndex]
    }));
  };

  const getAccessoryDescription = () => {
    const { hat, mustache, lipstick } = robotParts.accessories;
    if (!hat && !mustache && !lipstick) return "NO ACCESSORIES";
    const active = [];
    if (hat) active.push("HAT");
    if (mustache) active.push("MUSTACHE");
    if (lipstick) active.push("LIPSTICK");
    return active.join(" + ");
  };

  const [completedModules, setCompletedModules] = useState(0);

  return (
    <Container>
      <MainPanel>
        <Header>
          <h1>ROBO-BEERTENDER GARAGE</h1>
        </Header>

        <RobotCanvas color={robotParts.color}>
          <ToolsDecoration />
          <LightBulbs>
            <div className="bulb" />
            <div className="bulb" />
            <div className="bulb" />
          </LightBulbs>
          <Robot3D parts={robotParts} />
        </RobotCanvas>

        <ControlPanel>
          <Button onClick={() => updatePart('head')}>HEAD</Button>
          <Button onClick={() => updatePart('body')}>BODY</Button>
          <Button onClick={() => updatePart('arms')}>ARMS</Button>
          <Button onClick={() => updatePart('legs')}>LEGS</Button>
        </ControlPanel>

        <ControlPanel>
          <Button onClick={cycleAccessories}>
            {getAccessoryDescription()}
          </Button>
        </ControlPanel>

        <ColorPicker
          type="color"
          value={robotParts.color}
          onChange={(e) => setRobotParts(prev => ({ ...prev, color: e.target.value }))}
        />

        <Button onClick={() => {
          const randomPart = () => Math.floor(Math.random() * 5) + 1;
          const randomAccessoryIndex = Math.floor(Math.random() * ACCESSORY_PRESETS.length);
          setAccessoryIndex(randomAccessoryIndex);
          setRobotParts({
            head: randomPart(),
            body: randomPart(),
            arms: randomPart(),
            legs: randomPart(),
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            accessories: ACCESSORY_PRESETS[randomAccessoryIndex]
          });
        }}>
          RANDOMIZE CONFIGURATION
        </Button>

        <ModuleStatus>
          {completedModules} / 7 MODULES COMPLETED
        </ModuleStatus>
      </MainPanel>
    </Container>
  );
};

export default App; 