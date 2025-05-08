import React, { useState, FC, useEffect } from 'react';
import {
  Container,
  MainPanel,
  Header,
  RobotCanvas,
  ControlPanel,
  Button,
  ColorPicker,
  ToolsDecoration
} from './styles';
import Robot3D from './components/Robot3D';

interface RobotParts {
  head: number;
  body: number;
  arms: number;
  legs: number;
  color: string;
  accessory: number;
}

// Map numeric values to string descriptions
const headStyles = ['cubic', 'round', 'cylindrical', 'small', 'large'];
const armStyles = ['standard', 'claw', 'tool', 'gun', 'shield'];

const App: FC = () => {
  const [robotParts, setRobotParts] = useState<RobotParts>({
    head: 0,
    body: 0,
    arms: 0,
    legs: 0,
    color: '#808080',
    accessory: -1
  });

  const [savedConfigs, setSavedConfigs] = useState<RobotParts[]>([]);

  // Function to send robot data to parent window
  const sendRobotData = () => {
    const robotData = {
      head: headStyles[robotParts.head],
      color: robotParts.color,
      arms: armStyles[robotParts.arms]
    };
    window.parent.postMessage(robotData, "*");
  };

  // Send data whenever robot configuration changes
  useEffect(() => {
    sendRobotData();
  }, [robotParts]);

  // Load saved configurations from localStorage on component mount
  useEffect(() => {
    const savedConfigsStr = localStorage.getItem('savedRobotConfigs');
    if (savedConfigsStr) {
      setSavedConfigs(JSON.parse(savedConfigsStr));
    }
  }, []);

  // Save configurations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedRobotConfigs', JSON.stringify(savedConfigs));
  }, [savedConfigs]);

  // Load configuration from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config');
    if (config) {
      try {
        const decodedConfig = JSON.parse(atob(config));
        setRobotParts(decodedConfig);
      } catch (error) {
        console.error('Failed to parse configuration:', error);
      }
    }
  }, []);

  const updatePart = (part: keyof RobotParts) => {
    if (part === 'color') return;
    
    const maxValues: { [key: string]: number } = {
      head: 4,
      body: 4,
      arms: 4,
      legs: 4,
      accessory: 5
    };

    setRobotParts(prev => ({
      ...prev,
      [part]: (prev[part] + 1) % (maxValues[part] + 1)
    }));
  };

  const saveCurrentConfig = () => {
    setSavedConfigs(prev => [...prev, robotParts]);
  };

  const generateShareableLink = () => {
    const config = btoa(JSON.stringify(robotParts));
    const url = `${window.location.origin}${window.location.pathname}?config=${config}`;
    navigator.clipboard.writeText(url);
    alert('Shareable link copied to clipboard!');
  };

  const captureRobotImage = async () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => resolve(blob), 'image/png');
        });
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'robot-configuration.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Failed to capture robot image:', error);
      }
    }
  };

  return (
    <Container>
      <MainPanel>
        <Header>
          <h1>ROBO-BEERTENDER GARAGE</h1>
        </Header>

        <RobotCanvas color={robotParts.color}>
          <ToolsDecoration />
          <Robot3D parts={robotParts} />
        </RobotCanvas>

        <ControlPanel>
          <Button onClick={() => updatePart('head')}>HEAD</Button>
          <Button onClick={() => updatePart('body')}>BODY</Button>
          <Button onClick={() => updatePart('arms')}>ARMS</Button>
          <Button onClick={() => updatePart('legs')}>LEGS</Button>
          <Button onClick={() => updatePart('accessory')}>ACCESSORY</Button>
        </ControlPanel>

        <ColorPicker
          type="color"
          value={robotParts.color}
          onChange={(e) => setRobotParts(prev => ({ ...prev, color: e.target.value }))}
        />

        <ControlPanel>
          <Button onClick={saveCurrentConfig}>SAVE CONFIGURATION</Button>
          <Button onClick={generateShareableLink}>SHARE CONFIGURATION</Button>
          <Button onClick={captureRobotImage}>SAVE AS IMAGE</Button>
        </ControlPanel>

        {savedConfigs.length > 0 && (
          <ControlPanel>
            <h2>Saved Configurations</h2>
            {savedConfigs.map((config, index) => (
              <Button key={index} onClick={() => setRobotParts(config)}>
                Load Config {index + 1}
              </Button>
            ))}
          </ControlPanel>
        )}

        <Button onClick={() => {
          const randomPart = () => Math.floor(Math.random() * 5);
          setRobotParts({
            head: randomPart(),
            body: randomPart(),
            arms: randomPart(),
            legs: randomPart(),
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            accessory: -1
          });
        }}>
          RANDOMIZE CONFIGURATION
        </Button>
      </MainPanel>
    </Container>
  );
};

export default App; 