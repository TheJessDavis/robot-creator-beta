import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1d21;
  color: #e0c088;
  font-family: 'Courier New', monospace;
`;

export const MainPanel = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(180deg, #2a2e35 0%, #1a1d21 100%);
  border: 2px solid #3a3e45;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  background: #2a2e35;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #3a3e45;
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    color: #ffa726;
    font-size: 2.5rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(255, 167, 38, 0.3);
  }
`;

export const RobotCanvas = styled.div<{ color: string }>`
  width: 100%;
  height: 500px;
  background: #1a1d21;
  background-image: 
    linear-gradient(rgba(32, 156, 238, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 156, 238, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  border: 2px solid #3a3e45;
  border-radius: 8px;
  position: relative;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #2a2e35;
  border: 2px solid #3a3e45;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(180deg, #3a3e45 0%, #2a2e35 100%);
  border: 2px solid #ffa726;
  border-radius: 5px;
  color: #ffa726;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(180deg, #ffa726 0%, #f57c00 100%);
    color: #1a1d21;
  }
`;

export const ModuleStatus = styled.div`
  background: #2a2e35;
  border-top: 2px solid #3a3e45;
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #4fc3f7;
`;

export const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  margin: 1rem 0;
  border: 2px solid #3a3e45;
  border-radius: 5px;
  background: #2a2e35;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 3px;
    border: none;
  }
`;

export const ToolsDecoration = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 150px;
  height: 200px;
  background: rgba(58, 62, 69, 0.5);
  border-radius: 5px;
  border: 1px solid #3a3e45;
`;

export const LightBulbs = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
  display: flex;
  gap: 20px;

  .bulb {
    width: 20px;
    height: 40px;
    background: #ffd54f;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(255, 213, 79, 0.5);
  }
`; 