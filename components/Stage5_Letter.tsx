import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const COUPONS = [
  { 
    emoji: "👑", 
    title: "Royal Decree", 
    desc: "This certifies k aap sabsy coolest fine shyt ho, in the entire server and the world ;)" 
  },
  { 
    emoji: "🎮", 
    title: "MLBB Rank Protection", 
    desc: "Infinite number of ranked matches jismy hum haary gy aur rage kary gy saath me hehehhe" 
  },
  { 
    emoji: "🍟", 
    title: "Treat Ticket", 
    desc: "Good for one surprise snack delivery or cafe date but only jab mery paas paisay hongy :(" 
  },
  { 
    emoji: "🤗", 
    title: "Emotional Support", 
    desc: "Unlimited rants, bad jokes, and listening ears jab bhi aapka dil kary cuz meri biwi g k liye kuch bhi 😝" 
  }
];

export const LetterStage: React.FC = () => {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [couponIndex, setCouponIndex] = useState(0);

  const handleGiftClick = () => {
    if (!isGiftOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FFD700', '#FF69B4', '#00FFFF'],
        shapes: ['star']
      });
      setIsGiftOpen(true);
    }
  };

  const nextCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCouponIndex((prev) => (prev + 1) % COUPONS.length);
  };

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
      <div className="min-h-full flex flex-col items-center p-6 md:p-12 pb-32 relative">
        
        {/* Stickers / Decorations */}
        <motion.div 
            className="absolute top-4 right-4 text-5xl z-20 cursor-pointer select-none"
            animate={{ 
                rotate: [0, 10, 0],
                y: [0, -5, 0] 
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            🐱
        </motion.div>

        <motion.div 
            className="absolute top-10 left-4 text-4xl z-20 select-none"
            animate={{ 
                rotate: [0, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
            🌸
        </motion.div>

        {/* Doodle: Music Player */}
        <div className="absolute top-64 -right-2 md:right-4 w-24 h-32 bg-white border-2 border-gray-200 rounded-lg shadow-sm rotate-3 p-2 hidden md:block opacity-60">
             <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center text-2xl">🎵</div>
             <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
             <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
             <div className="mt-2 flex justify-center space-x-2 text-xs text-gray-400">
                 <span>⏮️</span><span>▶️</span><span>⏭️</span>
             </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-hand font-bold text-rose-500 mb-8 text-center mt-4">
            Happy 19th, Mahnoor!
        </h1>

        <div className="max-w-xl w-full space-y-6 text-gray-700 font-sans leading-relaxed text-lg md:text-xl relative z-10">
          
          {/* Tape visual */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-pink-200/50 rotate-1"></div>

          <p>
            HAPPY BIRTHDAY!!!!! yaar ik ye maybe itna special nahi hoga but i couldn't think of anything else so this is what you get &lt;3 first of all, thank you for being such a wonderful friend. i never thought i'd meet someone so wonderful through a game and we'd be so close. sachi yaar me sochta hu k agar me mlbb us din us time na lagata to hum milty hi nahi and that kinda makes me sad 😔 but anyways... thank you thank you thank you again!
          </p>
          <p>
            i wish you have the happiest birthday of your life and may this year bring as much happiness to you as you bring to everyone around you (aap unhappy hongi to mera kia hoga 😔😔😔) aur ziada ziada cake khana, birthday cake ka alag hi maza hota hy na heehehehhehehee😋
          </p>
          <p>
            Mazak waghera side py, but i really wish k humari dosti aur gehri ho, cuz you're cool and sweet and awesome and kon nahi hoga jisko aap jesa dost chahiye?! itni understanding ho aap me aapko kha jau😋..future ka kuch pata nahi but i wish k wahi ho jo hum dono k liye best ho cuz PTM me bhi to jana hy 😋😝😝 tobah meri apni harkatyn hi kharab hy tch tch tch tch... kher me baaz nahi aau ga 😔.
          </p>
          <p className="font-bold text-pink-500 font-hand text-2xl">
            CHALO AB BIRTHDAY ENJOY KARO aur cake mujhy bhi send kar dena parcel karky (box me khud bhi beth jana 😋😋😋)
          </p>
        </div>

        <div className="w-full max-w-xl mt-12 text-right relative z-10">
            <div className="font-hand text-3xl text-rose-500 transform -rotate-2 inline-block">
                - With love,<br/>
                Huzaifa
            </div>
        </div>
        
        {/* Interactive Gift Area */}
        <div className="mt-16 relative flex flex-col items-center justify-center h-48 w-full">
            <AnimatePresence mode="wait">
                {!isGiftOpen ? (
                    <motion.div 
                        key="gift-box"
                        className="text-8xl cursor-pointer relative z-20"
                        initial={{ rotate: 0 }}
                        animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{ 
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 0.5, repeatDelay: 1, repeat: Infinity }
                        }}
                        whileHover={{ scale: 1.3, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleGiftClick}
                    >
                        🎁
                        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
                        <p className="text-sm text-pink-400 font-hand absolute top-full left-1/2 -translate-x-1/2 w-32 text-center mt-2">
                            Open me!
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="coupons"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative z-20 w-full max-w-sm flex flex-col items-center"
                    >
                         <h3 className="text-2xl font-hand font-bold text-pink-500 mb-3 animate-bounce">
                             You got coupons!
                         </h3>
                         <div 
                            className="bg-white border-4 border-dashed border-pink-300 p-6 rounded-xl shadow-xl transform rotate-1 cursor-pointer hover:rotate-0 transition-transform duration-300 w-full"
                            onClick={nextCoupon}
                        >
                            <div className="absolute -top-3 -right-3 bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow">
                                {couponIndex + 1}/{COUPONS.length}
                            </div>
                            
                            <motion.div
                                key={couponIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center"
                            >
                                <div className="text-6xl mb-4">{COUPONS[couponIndex].emoji}</div>
                                <h3 className="text-2xl font-bold text-rose-500 font-hand mb-2">
                                    {COUPONS[couponIndex].title}
                                </h3>
                                <p className="text-gray-600 font-sans leading-snug">
                                    {COUPONS[couponIndex].desc}
                                </p>
                                <div className="mt-4 text-xs text-pink-300 font-bold uppercase tracking-widest">
                                    Tap to see next
                                </div>
                            </motion.div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
};