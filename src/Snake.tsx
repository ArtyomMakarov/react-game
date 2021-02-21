import React, { useState, useRef, useEffect} from 'react';
import { useInterval } from "./useInterval";
import { CommonConstants } from "./constants";
import './Snake.scss';

function Snake() {
  const canvasRef: {current: any} = useRef();
  const [snake, setSnake] = useState(CommonConstants.SNAKE_START);
  const [apple, setApple] = useState(CommonConstants.APPLE_START);
  const [dir, setDir] = useState([0,-1]);
  const [speed, setSpeed] = useState(CommonConstants.SPEED);
  const [gameOver, setGameOver] = useState(false);

  function startGame(): void {
    setSnake(CommonConstants.SNAKE_START);
    setApple(CommonConstants.APPLE_START);
    setDir([0, -1]);
    setSpeed(CommonConstants.SPEED);
    setGameOver(false);
  }

  function endGame() {
    setSpeed(null);
    setGameOver(true);
  }

  function moveSnake(e: React.KeyboardEvent<HTMLDivElement>) {
    if ( e.which >= 37 && e.which <= 40) {
      setDir(CommonConstants.DIRECTIONS[e.which]);
    }
  }

  function createApple(): Array<number> {
    return apple.map( (_, i) => Math.floor(Math.random() * (CommonConstants.CANVAS_SIZE[i] / CommonConstants.SCALE) ) );
  }

  function checkAppleCollision(newSnake: Array<Array<number>>): boolean {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();

      while( checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }

      setApple(newApple);
      return true;
    }

    return false;
  }

  function checkCollision(piece: Array<number>, snk: Array<Array<number>> = snake): boolean {

    if( piece[0] * CommonConstants.SCALE >= CommonConstants.CANVAS_SIZE[0] ||
        piece[0] < 0 ||
        piece[1] * CommonConstants.SCALE >= CommonConstants.CANVAS_SIZE[1] ||
        piece[1] < 0) {
      return true;
    }

    for(let i = 2; i < snake.length; i++) {
      if(piece[0] === snake[i][0] && piece[1] === snake[i][1]) return true;
    }

    return false
  }

  function gameLoop() {
    const snakeCopy: Array<Array<number>> = JSON.parse(JSON.stringify(snake));
    const newSnakeHead: Array<number> = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

    if( checkCollision(newSnakeHead) ) {
      endGame();
    }

    snakeCopy.unshift(newSnakeHead);

    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    }

    setSnake(snakeCopy);
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(CommonConstants.SCALE, 0, 0, CommonConstants.SCALE, 0, 0);
    context.clearRect(0, 0, CommonConstants.CANVAS_SIZE[0], CommonConstants.CANVAS_SIZE[1]);
    context.fillStyle = "lightGreen";
    snake.forEach(([x,y]) => context.fillRect(x, y, 1 ,1 ));
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval( () => gameLoop(), speed);



  return (
    <div className="Snake" role="button" onKeyDown={moveSnake}>
      <canvas className="canvas" ref={canvasRef}
              width={`${CommonConstants.CANVAS_SIZE[0]}px`}
              height={`${CommonConstants.CANVAS_SIZE[1]}px`}/>
        {gameOver && <div>GAME OVER!</div>}
        <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default Snake;
