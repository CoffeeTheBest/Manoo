import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from './Button';

interface Props {
  onNext: () => void;
}

// Cat themed memory items
const ITEMS = ['🐱', '🧶', '🐟', '🥛', '🐭', '🐾'];

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryStage: React.FC<Props> = ({ onNext }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Create pairs and shuffle
    const duplicated = [...ITEMS, ...ITEMS];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        content: item,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsLocked(true);
      const [first, second] = flippedIndices;
      
      if (cards[first].content === cards[second].content) {
        // Match found
        setCards(prev => prev.map((card, index) => 
          index === first || index === second 
            ? { ...card, isMatched: true } 
            : card
        ));
        setFlippedIndices([]);
        setIsLocked(false);
        
        // Mini confetti for match
        confetti({
           particleCount: 20,
           spread: 40,
           origin: { y: 0.6, x: 0.5 },
           colors: ['#FFD1DC', '#FDFD96'],
           disableForReducedMotion: true
        });
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedIndices([]);
          setIsLocked(false);
        }, 800);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;
    
    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedIndices(prev => [...prev, index]);
  };

  const allMatched = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h2 className="text-3xl font-bold text-rose-500 font-hand">
          {allMatched ? "Purr-fect Match! 😻" : "Memory Meow-lane 🐾"}
        </h2>
        <p className="text-rose-400 text-sm font-sans mt-1">
          {allMatched ? "You found all the kitty treats!" : "Find the matching toys & treats"}
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-sm mx-auto">
        <AnimatePresence>
          {cards.map((card, index) => (
            <div 
                key={card.id} 
                className="relative w-20 h-24 md:w-24 md:h-28 cursor-pointer" 
                onClick={() => handleCardClick(index)}
                style={{ perspective: '1000px' }}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back (Face Down) */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-xl shadow-md flex items-center justify-center border-2 border-white/50"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-4xl opacity-50 filter drop-shadow-sm rotate-12">🐾</span>
                </div>

                {/* Front (Face Up) */}
                <div 
                    className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-pink-100"
                    style={{ 
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                  <span className="text-4xl">{card.content}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="h-20 mt-6 flex items-center justify-center">
        {allMatched && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
               <Button label="Meow Next! ➡️" onClick={onNext} />
            </motion.div>
        )}
      </div>
    </div>
  );
};