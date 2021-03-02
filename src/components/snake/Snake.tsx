import React, { useState, useRef, useEffect} from 'react';
import { useInterval } from "../../hooks/useInterval";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CommonConstants } from "../../constants/constants";
import './Snake.scss';
import Footer from '../footer/footer';
import Header from '../header/header';
import SoundSettings from '../sound-settings/sound-settings';
import useSound from "use-sound";
import snakeSound from '../../assets/audio/snake.mp3';

function Snake() {
  const canvasRef: {current: any} = useRef();

  const [snake, setSnake] = useState(CommonConstants.SNAKE_START);
  const [apple, setApple] = useState(CommonConstants.APPLE_START);
  const [dir, setDir] = useState([0,-0.5]);
  const [gameOver, setGameOver] = useState(false);
  const [isStartGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [snakeSoundVolume, setSnakeSoundVolume] = useState(CommonConstants.SNAKE_SOUND_VOLUME);
  const [isSoundSwitchOn, setSoundIsSwitchOn] = useState(false);

  const [speed, setSpeed] = useLocalStorage(  'speed', CommonConstants.SPEED);
  const [gameFieldSize, setGameFieldSize] = useLocalStorage('gameFieldSize', CommonConstants.CANVAS_SIZE);
  const [scale, setScale] = useLocalStorage('scale', CommonConstants.SCALE);
  const [highScore, setHighScore] = useLocalStorage('highScore', 0);
  const [speedForStartGame, setSpeedForStartGame] = useLocalStorage('speedForStartGame', CommonConstants.SPEED);

  const [playSnakeSound] = useSound(
    snakeSound,
    {
      volume: snakeSoundVolume
    }
  );

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, gameFieldSize[0], gameFieldSize[1]);
    context.fillStyle = "lightGreen";
    snake.forEach(([x,y]) => context.fillRect(x, y, 0.5 ,0.5 ));
    context.fillStyle = "#ff6000";
    context.fillRect(apple[0], apple[1], 0.5, 0.5);
  }, [snake, apple, gameOver]);

  useInterval( () => gameLoop(), speed);

  function startGame(): void {
    setSnake(CommonConstants.SNAKE_START);
    setApple(CommonConstants.APPLE_START);
    setDir([0, -0.5]);
    setSpeed(speedForStartGame);
    setStartGame(!isStartGame);
    setGameOver(false);
  }

  function endGame(): void {
    setScore(0);
    setSpeed(null);
    setGameOver(true);
    setStartGame(false);
  }

  function moveSnake(e: React.KeyboardEvent<HTMLDivElement>): void {
    if ( e.which >= 37 && e.which <= 40 || e.which == 87 || e.which == 83 || e.which == 65 || e.which == 68) {
      setDir(CommonConstants.DIRECTIONS[e.which]);
    }
  }

  function createApple(): Array<number> {
    return apple.map( (_, i) => Math.floor(Math.random() * (gameFieldSize[i] / scale) ) );
  }

  function checkAppleCollision(newSnake: Array<Array<number>>): boolean {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();

      while( checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setScore(score+1);
      setApple(newApple);
      return true;
    }

    return false;
  }

  function checkCollision(piece: Array<number>, snk: Array<Array<number>> = snake): boolean {

    if( piece[0] * scale >= gameFieldSize[0] ||
        piece[0] < 0 ||
        piece[1] * scale >= gameFieldSize[1] ||
        piece[1] < 0) {
      return true;
    }

    for(let i = 0; i < snake.length; i++) {
      if(piece[0] === snake[i][0] && piece[1] === snake[i][1]) return true;
    }

    return false
  }

  function gameLoop(): void {
    if (isStartGame) {
      const snakeCopy: Array<Array<number>> = JSON.parse(JSON.stringify(snake));
      const newSnakeHead: Array<number> = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

      if( checkCollision(newSnakeHead) ) {
        if(isSoundSwitchOn) {
          playSnakeSound();
        }
        if (score > highScore) {
          setHighScore(score);
        }
        endGame();
      }

      snakeCopy.unshift(newSnakeHead);

      if (!checkAppleCollision(snakeCopy)) {
        snakeCopy.pop();
      }

      setSnake(snakeCopy);
    }
  }

  function handleLevelChange(level: number): void {
    setSpeed(level);
    setSpeedForStartGame(level);
  }

  function handleSizeChange(size: Array<number>): void {
    setGameFieldSize(size);
  }

  function handleSnakeSizeChange(snakeSize: number): void {
    setScale(snakeSize);
  }

  function handleSnakeSoundSwitch(isSwitchOn: boolean): void {
    setSoundIsSwitchOn(isSwitchOn);
  }

  function handleSnakeSoundVolume(volume: number): void {
    console.log(volume);
    setSnakeSoundVolume(volume);
  }

  function handleFullScreenChange(fullScreen: boolean): void {
    let snakeDiv: Element = document.getElementsByClassName("snake")[0];
    snakeDiv.requestFullscreen();
  }


  return (
    <div className="snake-wrapper" role="button" onKeyDown={moveSnake}>
      <Header levelChange={handleLevelChange} sizeChange={handleSizeChange}
              isFullScreen={handleFullScreenChange} snakeSizeChange={handleSnakeSizeChange}></Header>
      <SoundSettings isSnakeSoundSwitch={handleSnakeSoundSwitch} snakeSoundVolume={handleSnakeSoundVolume}></SoundSettings>
      <div className="snake">
        <div className="snake__statistics"> HIGH SCORE: {highScore}, SCORE: {score}</div>
        <canvas className="snake__canvas" ref={canvasRef}
                width={`${gameFieldSize[0]}px`}
                height={`${gameFieldSize[1]}px`}/>
        {gameOver && <div className="snake__div">GAME OVER!</div>}
        <button onClick={startGame} className="snake__button">{isStartGame ? 'Stop Game' : 'Start Game'}</button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Snake;
