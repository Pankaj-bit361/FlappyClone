import { useEffect } from 'react';
import Bird from './components/Bird';
import Pipe from './components/Pipe';
import Background from './components/Background';
import Score from './components/Score';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';

const App = () => {
  const {
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
  } = useGameLogic();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        if (!gameStarted) {
          startGame();
        } else {
          flap();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flap, gameStarted, startGame]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-sky-300"
      onClick={() => {
        if (!gameStarted) {
          startGame();
        } else {
          flap();
        }
      }}
    >
      <Background />
      
      {!gameStarted && !isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold text-center">
            <p>Tap or press SPACE</p>
            <p>to start</p>
          </div>
        </div>
      )}

      <Bird rotation={birdRotation} position={birdPosition} />
      
      {pipes.map((pipe, index) => (
        <div key={index}>
          <Pipe position={pipe.position} height={pipe.height} isTop={true} />
          <Pipe
            position={pipe.position}
            height={window.innerHeight - pipe.height - 200} // Updated to match new GAP_HEIGHT
            isTop={false}
          />
        </div>
      ))}

      <Score score={score} />
      
      {isGameOver && (
        <GameOver
          score={score}
          highScore={highScore}
          onRestart={resetGame}
        />
      )}
    </div>
  );
};

export default App;