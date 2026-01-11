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
    <div className="min-h-full w-full flex flex-col items-center px-6 py-12 md:px-24 pb-48 relative">
      
        {/* Stickers / Decorations - MORE CATS */}
        <motion.div 
            className="absolute top-4 right-4 text-4xl md:text-6xl z-20 cursor-pointer select-none"
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
            className="absolute top-20 left-4 text-4xl md:text-5xl z-20 select-none opacity-80"
            animate={{ 
                rotate: [0, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
            🧶
        </motion.div>
        
        <motion.div 
            className="absolute bottom-40 right-8 text-3xl md:text-4xl z-20 select-none opacity-60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
        >
            🐾
        </motion.div>

        {/* Doodle: Music Player / Cat Scratching Post */}
        <div className="absolute top-64 -right-2 md:right-4 w-24 h-32 bg-white border-2 border-gray-200 rounded-lg shadow-sm rotate-3 p-2 hidden md:block opacity-60">
             <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center text-4xl">🐱</div>
             <div className="text-center font-hand text-xs text-gray-500">Currently playing:</div>
             <div className="font-bold text-xs text-center text-rose-400">Meow Mix 🎵</div>
             <div className="mt-2 flex justify-center space-x-2 text-xs text-gray-400">
                 <span>⏮️</span><span>▶️</span><span>⏭️</span>
             </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-hand font-bold text-rose-500 mb-10 text-center mt-4 drop-shadow-sm">
            Happy 19th, Mahnoor! 😻
        </h1>

        <div className="max-w-xl w-full space-y-6 text-gray-800 font-hand leading-loose text-lg md:text-2xl relative z-10 px-2 md:px-0">
          
          {/* Tape visual */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-pink-200/50 rotate-1 mix-blend-multiply"></div>

          <p>
            HAPPY BIRTHDAY!!!!! yaar ik ye maybe itna special nahi hoga but i couldn't think of anything else so this is what you get &lt;3 first of all, thank you for being such a wonderful friend. i never thought i'd meet someone so wonderful through a game and we'd be so close. sachi yaar me sochta hu k agar me mlbb us din us time na lagata to hum milty hi nahi and that kinda makes me sad 😔 but anyways... thank you thank you thank you again!
          </p>
          <p>
            i wish you have the happiest birthday of your life and may this year bring as much happiness to you as you bring to everyone around you (aap unhappy hongi to mera kia hoga 😔😔😔) aur ziada ziada cake khana, birthday cake ka alag hi maza hota hy na heehehehhehehee😋
          </p>
          <p>
            Mazak waghera side py, but i really wish k humari dosti aur gehri ho, cuz you're cool and sweet and awesome and kon nahi hoga jisko aap jesa dost chahiye?! itni understanding ho aap me aapko kha jau😋..future ka kuch pata nahi but i wish k wahi ho jo hum dono k liye best ho cuz PTM me bhi to jana hy 😋😝😝 tobah meri apni harkatyn hi kharab hy tch tch tch tch... kher me baaz nahi aau ga 😔.
          </p>
          <p className="font-bold text-pink-500 text-xl md:text-3xl mt-8">
            CHALO AB BIRTHDAY ENJOY KARO aur cake mujhy bhi send kar dena parcel karky (box me khud bhi beth jana 😋😋😋)
          </p>
        </div>

        <div className="w-full max-w-xl mt-16 text-right relative z-10 pr-2 md:pr-0">
            <div className="font-hand text-2xl md:text-3xl text-rose-500 transform -rotate-2 inline-block">
                - With love (and meows),<br/>
                Huzaifa 🐾
            </div>
        </div>
        
        {/* Interactive Gift Area */}
        <div className="mt-20 relative flex flex-col items-center justify-center h-48 w-full">
            <AnimatePresence mode="wait">
                {!isGiftOpen ? (
                    <motion.div 
                        key="gift-box"
                        className="cursor-pointer relative z-20 flex flex-col items-center"
                        initial={{ rotate: 0 }}
                        animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                        }}
                        transition={{ 
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 0.5, repeatDelay: 1, repeat: Infinity }
                        }}
                        whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGiftClick}
                    >
                        {/* Cat Box Graphic */}
                        <div className="text-7xl md:text-8xl">📦</div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl">🐱</div>
                        
                        <p className="text-sm text-pink-400 font-hand mt-4 bg-white/80 px-4 py-1 rounded-full shadow-sm">
                            A mystery box appeared! Open it?
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
                             You got coupons! 😻
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
                                <p className="text-gray-600 font-hand text-xl leading-snug">
                                    {COUPONS[couponIndex].desc}
                                </p>
                                <div className="mt-4 text-xs text-pink-300 font-bold uppercase tracking-widest font-sans">
                                    Tap to see next
                                </div>
                            </motion.div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    </div>
  );
};