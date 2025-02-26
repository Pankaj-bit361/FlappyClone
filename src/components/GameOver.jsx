import { motion } from 'framer-motion';

const GameOver = ({ score, highScore, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-2">Score: {score}</p>
        <p className="text-xl mb-4">High Score: {highScore}</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
};

export default GameOver;