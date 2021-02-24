import React, {useState} from 'react';
import './header.scss';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


export interface IHederProps {
  levelChange: (level: number) =>void;
  sizeChange: (scale: Array<number>) => void;
  snakeSizeChange: (snakeSize: number) => void
}


export default function Header(props: IHederProps) {

  const [level, setLevel] = useState('');
  const [scale, setScale] = useState('');
  const [snakeSize, setSnakeSize] = useState('');

 function handleLevelSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Beginner':
        setLevel('Beginner');
        props.levelChange(300);
        break;

      case 'Middle':
        setLevel('Middle');
        props.levelChange(200);
        break;

      default:
        setLevel('Advance');
        props.levelChange(100);
    }
  }

  function handleScaleSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Small':
        setScale('Small');
        props.sizeChange([400, 400]);
        break;

      case 'Middle':
        setScale('Middle');
        props.sizeChange([500, 500]);
        break;

      default:
        setScale('Big');
        props.sizeChange([700, 700]);
    }
  }

  function handleSnakeSizeSettingsClick(e: React.MouseEvent<HTMLElement>): void {
    switch((e.target as HTMLInputElement).textContent) {
      case 'Small':
        setSnakeSize('Small');
        props.snakeSizeChange(30);
        break;

      case 'Middle':
        setSnakeSize('Middle');
        props.snakeSizeChange(40);
        break;

      default:
        setSnakeSize('Big');
        props.snakeSizeChange(50);
    }
  }

  return (
    <div className="header">
      <h1 className="header__title">Snake Game</h1>
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