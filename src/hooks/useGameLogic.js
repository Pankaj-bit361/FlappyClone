import { useState, useEffect, useCallback } from 'react';

const GRAVITY = 0.6;
const FLAP_STRENGTH = -10;
const PIPE_SPEED = 3;
const PIPE_SPAWN_RATE = 1500;
const BIRD_SIZE = 32;
const PIPE_WIDTH = 64;
const GAP_HEIGHT = 150;

export const useGameLogic = () => {
  const [birdPosition, setBirdPosition] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generatePipe = useCallback(() => {
    const minHeight = 50;
    const maxHeight = window.innerHeight - GAP_HEIGHT - 100;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;
    return {
      position: window.innerWidth,
      height,
      passed: false,
    };
  }, []);

  const resetGame = useCallback(() => {
    setBirdPosition(300);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes([]);
    setScore(0);
    setIsGameOver(false);
    setGameStarted(false);
  }, []);

  const startGame = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
      setBirdVelocity(FLAP_STRENGTH);
    }
  }, [gameStarted]);

  const flap = useCallback(() => {
    if (!isGameOver && gameStarted) {
      setBirdVelocity(FLAP_STRENGTH);
    }
  }, [isGameOver, gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      if (isGameOver) return;

      setBirdPosition((pos) => {
        const newPos = pos + birdVelocity;
        if (newPos > window.innerHeight - 20 || newPos < 0) {
          setIsGameOver(true);
          return pos;
        }
        return newPos;
      });
      
      setBirdVelocity((vel) => vel + GRAVITY);
      setBirdRotation(birdVelocity * 2);

      setPipes((currentPipes) => {
        return currentPipes
          .map((pipe) => ({
            ...pipe,
            position: pipe.position - PIPE_SPEED,
          }))
          .filter((pipe) => pipe.position > -PIPE_WIDTH);
      });

      // Improved collision detection
      pipes.forEach((pipe) => {
        const birdLeft = window.innerWidth * 0.25;
        const birdRight = birdLeft + BIRD_SIZE;
        const birdTop = birdPosition;
        const birdBottom = birdPosition + BIRD_SIZE;

        const pipeLeft = pipe.position;
        const pipeRight = pipe.position + PIPE_WIDTH;
        
        // Check if bird is within pipe's horizontal range
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          // Check if bird hits top pipe
          if (birdTop < pipe.height) {
            setIsGameOver(true);
          }
          
          // Check if bird hits bottom pipe
          const bottomPipeTop = pipe.height + GAP_HEIGHT;
          if (birdBottom > bottomPipeTop) {
            setIsGameOver(true);
          }
        }

        // Update score
        if (!pipe.passed && pipeRight < birdLeft) {
          pipe.passed = true;
          setScore((s) => s + 1);
        }
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, isGameOver, pipes, birdPosition, birdVelocity]);

  useEffect(() => {
    if (!gameStarted) return;

    const spawnPipe = setInterval(() => {
      if (!isGameOver) {
        setPipes((pipes) => [...pipes, generatePipe()]);
      }
    }, PIPE_SPAWN_RATE);

    return () => clearInterval(spawnPipe);
  }, [gameStarted, isGameOver, generatePipe]);

  useEffect(() => {
    if (isGameOver && score > highScore) {
      setHighScore(score);
    }
  }, [isGameOver, score, highScore]);

  return {
    birdPosition,
    birdRotation,
    pipes,
    score,
    highScore,
    isGameOver,
    gameStarted,
    flap,
    resetGame,
    startGame,
  };
};