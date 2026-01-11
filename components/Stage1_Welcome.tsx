import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface Props {
  onNext: () => void;
}

export const WelcomeStage: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 relative"
      >
        <div className="text-9xl relative z-10 filter drop-shadow-xl">🎂</div>
        <motion.div 
          className="absolute -top-4 -right-4 text-6xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute -bottom-4 -left-4 text-6xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        >
          🎈
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-5xl md:text-7xl font-sans font-bold text-rose-400 mb-12 drop-shadow-sm"
      >
        Happy Birthday<br/>
        <span className="text-pink-500 font-hand text-6xl md:text-8xl mt-2 block">Mahnoor!</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
      >
        <Button label="Let's Start! 🚀" onClick={onNext} />
      </motion.div>
    </div>
  );
};