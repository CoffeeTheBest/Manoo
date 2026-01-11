import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VirtualCat: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sleeping' | 'eating' | 'playing' | 'purring'>('idle');

  // Auto-sleep if idle for too long
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (status === 'idle') {
      timeout = setTimeout(() => setStatus('sleeping'), 8000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handlePet = () => {
    if (status === 'sleeping') {
        setStatus('idle');
        return;
    }
    setStatus('purring');
    setTimeout(() => setStatus('idle'), 2500);
  };

  const handleFeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('eating');
    setTimeout(() => setStatus('idle'), 4000);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('playing');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-0 z-50 flex flex-col items-end pointer-events-auto transform scale-90 origin-bottom-right md:scale-100">
       {/* Actions Menu */}
       <AnimatePresence>
         {(status === 'idle' || status === 'purring') && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.8 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.8 }}
             className="flex space-x-2 mb-2 bg-white/90 p-2 rounded-full shadow-md border border-pink-100"
           >
             <button 
                onClick={handleFeed} 
                className="text-xl hover:scale-125 transition-transform active:scale-90" 
                title="Feed"
            >
                🐟
            </button>
             <button 
                onClick={handlePlay} 
                className="text-xl hover:scale-125 transition-transform active:scale-90" 
                title="Play"
            >
                🧶
            </button>
           </motion.div>
         )}
       </AnimatePresence>

       {/* The Cat */}
       <motion.div
         className="relative cursor-pointer"
         onClick={handlePet}
         animate={
            status === 'playing' ? { y: [0, -20, 0], x: [0, -5, 5, 0] } :
            status === 'purring' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } :
            { y: 0 }
         }
         transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 10,
            repeat: status === 'playing' ? Infinity : 0 
         }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
       >
         {/* Floating Elements */}
         <AnimatePresence>
            {status === 'purring' && (
                <motion.div 
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-3xl pointer-events-none"
                >
                    ❤️
                </motion.div>
            )}
             {status === 'sleeping' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 15, y: -15 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    className="absolute -top-4 right-0 text-xl font-bold text-blue-400 font-hand pointer-events-none"
                >
                    Zzz...
                </motion.div>
            )}
         </AnimatePresence>

         {/* Main Emoji */}
         <div className="text-7xl md:text-8xl filter drop-shadow-2xl select-none transform transition-transform duration-300">
            {status === 'sleeping' ? '🐱' : 
             status === 'eating' ? '😋' : 
             status === 'playing' ? '😺' : 
             status === 'purring' ? '😻' : '🐱'}
         </div>

         {/* Props */}
         <AnimatePresence>
            {status === 'eating' && (
                <motion.div 
                    initial={{ scale: 0, x: -30 }}
                    animate={{ scale: 1, x: -10, rotate: -10 }}
                    exit={{ scale: 0 }}
                    className="absolute bottom-0 left-0 text-4xl pointer-events-none"
                >
                    🐟
                </motion.div>
            )}
            {status === 'playing' && (
                <motion.div 
                    animate={{ rotate: 360, x: [-10, 10, -10] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute bottom-2 -left-2 text-4xl pointer-events-none"
                >
                    🧶
                </motion.div>
            )}
         </AnimatePresence>
       </motion.div>
    </div>
  );
};