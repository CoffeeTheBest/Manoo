import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
}

const BALLOON_COLORS = ['#FFC0CB', '#FFB7B2', '#FF69B4', '#FFDAC1', '#FFB6C1', '#FFE4E1'];

export const BalloonStage: React.FC<Props> = ({ onNext }) => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloons, setBalloons] = useState<Array<{id: number, color: string, popped: boolean}>>([]);
  const TOTAL_BALLOONS = 5;

  useEffect(() => {
    const newBalloons = Array.from({ length: TOTAL_BALLOONS }).map((_, i) => ({
      id: i,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      popped: false,
    }));
    setBalloons(newBalloons);
  }, []);

  const popBalloon = (id: number) => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FFC0CB', '#FF69B4', '#FFF']
    });
    
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setPoppedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (poppedCount === TOTAL_BALLOONS) {
      setTimeout(onNext, 1500);
    }
  }, [poppedCount, onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden p-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-rose-500 mb-8 z-10 bg-white/60 px-6 py-2 rounded-full backdrop-blur-md shadow-sm"
      >
        Pop the balloons! 🎈 ({poppedCount}/{TOTAL_BALLOONS})
      </motion.h2>

      <div className="relative w-full h-96">
        <AnimatePresence>
          {balloons.map((balloon) => (
            !balloon.popped && (
              <motion.div
                key={balloon.id}
                initial={{ 
                  y: 400, 
                  x: Math.random() * 200 - 100,
                  opacity: 0 
                }}
                animate={{ 
                  y: Math.random() * 200 - 100, // Float around center
                  x: (Math.random() * 200 - 100) + (balloon.id * 30),
                  opacity: 1 
                }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ 
                  y: { 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.5 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => popBalloon(balloon.id)}
                className="absolute left-1/2 top-1/2 cursor-pointer touch-manipulation"
                style={{
                  marginLeft: `${(balloon.id - 2) * 60}px`,
                  marginTop: `${(balloon.id % 2) * 50}px`
                }}
              >
                <div 
                  className="w-24 h-32 rounded-full relative shadow-lg"
                  style={{ 
                    backgroundColor: balloon.color,
                    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
                  }}
                >
                   {/* String */}
                   <div className="absolute top-full left-1/2 w-0.5 h-16 bg-gray-400 opacity-50 origin-top transform -translate-x-1/2" />
                   {/* Shine */}
                   <div className="absolute top-4 right-4 w-4 h-8 bg-white opacity-40 rounded-full transform rotate-45" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {poppedCount === TOTAL_BALLOONS && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
             <div className="text-6xl">🎉</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};