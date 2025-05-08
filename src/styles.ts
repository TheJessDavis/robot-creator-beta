import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: #2a2e35;
  font-family: 'Courier New', monospace;
`;

export const MainPanel = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%);
  border: 2px solid #e0e4e8;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #e0e4e8;
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    color: #2196f3;
    font-size: 2.5rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(33, 150, 243, 0.2);
  }
`;

export const RobotCanvas = styled.div<{ color: string }>`
  width: 100%;
  height: 500px;
  background: #ffffff;
  background-image: 
    linear-gradient(rgba(33, 150, 243, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(33, 150, 243, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  border: 2px solid #e0e4e8;
  border-radius: 8px;
  position: relative;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 2px solid #e0e4e8;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(180deg, #415a77 0%, #34495e 100%);
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(180deg, #4a6b8a 0%, #415a77 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(65, 90, 119, 0.2);
  }
`;

export const ModuleStatus = styled.div`
  background: #ffffff;
  border-top: 2px solid #e0e4e8;
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #2196f3;
`;

export const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  margin: 1rem 0;
  border: 2px solid #e0e4e8;
  border-radius: 5px;
  background: #ffffff;
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
  background: rgba(224, 228, 232, 0.5);
  border-radius: 5px;
  border: 1px solid #e0e4e8;
`;