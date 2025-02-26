import { motion } from 'framer-motion';

const Bird = ({ rotation, position }) => {
  return (
    <motion.div
      className="absolute w-8 h-8 bg-yellow-400 rounded-full"
      style={{
        top: position,
        left: '25%',
        rotate: rotation,
      }}
    >
      {/* Bird's eye */}
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-1">
        <div className="absolute w-1 h-1 bg-black rounded-full top-0.5 right-0.5"></div>
      </div>
      {/* Bird's beak */}
      <div className="absolute w-4 h-2 bg-orange-500 rounded-r-full top-2 -right-2"></div>
      {/* Bird's wing */}
      <div className="absolute w-3 h-3 bg-yellow-500 rounded-full top-4 left-1"></div>
    </motion.div>
  );
};

export default Bird;