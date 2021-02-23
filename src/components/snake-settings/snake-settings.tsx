import React, {useState} from 'react';
import './snake-settings.scss';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


export default function SnakeSettings() {

  const [level, setLevel] = useState('');
  const [scale, setScale] = useState('');
  const [snakeSize, setSnakeSize] = useState('');

 function handleLevelSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Beginner':
        setLevel('Beginner');
        break;

      case 'Middle':
        setLevel('Middle')
        break;

      default:
        setLevel('Advance')
    }
  }

  function handleScaleSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Small':
        setScale('Small');
        break;

      case 'Middle':
        setScale('Middle');
        break;

      default:
        setScale('Big');
    }
  }

  function handleSnakeSizeSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Small':
        setSnakeSize('Small');
        break;

      case 'Middle':
        setSnakeSize('Middle');
        break;

      default:
        setSnakeSize('Big');
    }
  }

  return (
    <div className="snake-settings-wrapper">
      <div className="snake-settings">
        <div className="button-wrapper">
          <DropdownButton id="dropdown-basic-button" title={level || "Choose Level"} variant="primary">
            <Dropdown.Item href="#/action-1" onClick={handleLevelSettingsClick}>Beginner</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleLevelSettingsClick}>Middle</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleLevelSettingsClick}>Advance</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="button-wrapper">
          <DropdownButton id="dropdown-basic-button" title={scale || "Choose Game Field Size"} variant="secondary">
            <Dropdown.Item href="#/action-1" onClick={handleScaleSettingsClick}>Small</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleScaleSettingsClick}>Middle</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleScaleSettingsClick}>Big</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="button-wrapper">
          <DropdownButton id="dropdown-basic-button" title={snakeSize || "Choose Snake Size"} variant="success">
            <Dropdown.Item href="#/action-1" onClick={handleSnakeSizeSettingsClick}>Small</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleSnakeSizeSettingsClick}>Middle</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleSnakeSizeSettingsClick}>Big</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}