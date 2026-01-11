import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AppStage } from './types';
import { WelcomeStage } from './components/Stage1_Welcome';
import { MemoryStage } from './components/Stage2_Memory';
import { OracleStage } from './components/Stage3_Oracle';
import { CakeStage } from './components/Stage4_Cake';
import { LetterStage } from './components/Stage5_Letter';
import { VirtualCat } from './components/VirtualCat';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.WELCOME);
  const [direction, setDirection] = useState(1); // 1 for forward

  useEffect(() => {
    // Small burst of confetti on every stage change
    if (stage !== AppStage.WELCOME) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFC0CB', '#FF69B4', '#FFB6C1', '#FF1493', '#FFF0F5'],
        disableForReducedMotion: true
      });
    }
  }, [stage]);

  const handleNext = (nextStage: AppStage) => {
    setDirection(1);
    setStage(nextStage);
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.WELCOME:
        return <WelcomeStage onNext={() => handleNext(AppStage.MEMORY)} />;
      case AppStage.MEMORY:
        return <MemoryStage onNext={() => handleNext(AppStage.ORACLE)} />;
      case AppStage.ORACLE:
        return <OracleStage onNext={() => handleNext(AppStage.CAKE)} />;
      case AppStage.CAKE:
        return <CakeStage onNext={() => handleNext(AppStage.LETTER)} />;
      case AppStage.LETTER:
        return <LetterStage />;
      default:
        return <WelcomeStage onNext={() => handleNext(AppStage.MEMORY)} />;
    }
  };

  // Realistic Book Page Turn Variants
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: 0,
      zIndex: 1,
      opacity: 1,
      transformOrigin: "left center",
    }),
    center: {
      rotateY: 0,
      zIndex: 1,
      opacity: 1,
      transformOrigin: "left center",
      transition: {
        duration: 0.1
      }
    },
    exit: (direction: number) => ({
      rotateY: -110,
      zIndex: 10,
      opacity: 1,
      transformOrigin: "left center",
      boxShadow: "-15px 0px 30px rgba(0,0,0,0.2)",
      filter: "brightness(0.9)",
      transition: {
        duration: 0.9,
        ease: [0.645, 0.045, 0.355, 1.0], // Cubic bezier for realistic paper weight
      }
    })
  };

  return (
    <main className="w-full h-[100dvh] bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden relative flex items-center justify-center perspective-[2000px]">
      
      {/* Background Decor - CAT THEMED */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Floating Clouds / Thoughts */}
        <div className="absolute top-[10%] left-[10%] text-5xl opacity-30 animate-float text-white drop-shadow-sm">💭</div>
        <div className="absolute top-[25%] right-[15%] text-4xl opacity-20 animate-float-delayed text-white">☁️</div>
        
        {/* Cat Elements */}
        <div className="absolute top-[15%] left-[30%] text-3xl opacity-40 animate-twinkle">🐾</div>
        <div className="absolute top-[40%] left-[5%] text-2xl opacity-40 animate-twinkle" style={{ animationDelay: '1s' }}>🧶</div>
        <div className="absolute bottom-[20%] right-[10%] text-4xl opacity-30 animate-twinkle" style={{ animationDelay: '2s' }}>🐾</div>
        <div className="absolute bottom-[40%] left-[15%] text-xl opacity-50 animate-twinkle" style={{ animationDelay: '1.5s' }}>🐟</div>
        <div className="absolute top-[5%] right-[30%] text-2xl opacity-40 animate-twinkle" style={{ animationDelay: '0.5s' }}>🐭</div>

        {/* Drifting Items */}
        <div className="absolute top-[60%] left-[80%] text-3xl opacity-20 animate-drift">🐱</div>
        <div className="absolute bottom-[10%] left-[20%] text-2xl opacity-25 animate-drift" style={{ animationDelay: '3s' }}>🥛</div>
        <div className="absolute top-[30%] right-[40%] text-3xl opacity-15 animate-drift" style={{ animationDelay: '5s' }}>🎀</div>

        {/* Extra Cute Elements */}
        <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-wiggle">😻</div>
        <div className="absolute top-1/2 left-10 text-3xl opacity-10 animate-float">🎵</div>
      </div>

      {/* The Book Container */}
      <div className="relative w-full max-w-2xl h-[95dvh] md:h-[85vh] perspective-[2000px] px-2 md:px-0">
        
        {/* Book Back/Cover Edge Effect */}
        <div className="absolute inset-0 bg-white rounded-r-2xl rounded-l-lg shadow-2xl transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 z-0"></div>
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-12 bg-gradient-to-r from-rose-300 to-pink-200 rounded-l-lg z-20 shadow-inner flex flex-col justify-center items-center space-y-8 border-r border-black/5">
             {/* Spine details */}
             <div className="w-full h-px bg-rose-400/30"></div>
             <div className="w-full h-px bg-rose-400/30"></div>
             <div className="w-full h-px bg-rose-400/30"></div>
             {/* Cat Spine Logo */}
             <div className="text-xl opacity-50 rotate-90">🐱</div>
        </div>

        {/* The Page Area */}
        <div className="relative w-full h-full pl-6 md:pl-12 z-10">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={stage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-white rounded-r-2xl shadow-xl overflow-hidden border border-l-0 border-gray-100 origin-left"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Spine Shadow Gradient */}
              <div className="absolute inset-y-0 left-0 w-4 md:w-6 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none"></div>
              
              {/* Content Container - Scrollable */}
              <div className="w-full h-full overflow-y-auto overflow-x-hidden relative z-10 bg-[#fffdf9] pb-24 md:pb-8">
                 {renderStage()}
              </div>

              {/* Page Number / Decoration Footer */}
              <div className="absolute bottom-3 right-6 text-pink-300 font-hand text-sm z-20 pointer-events-none flex items-center gap-1 hidden md:flex">
                {stage === AppStage.WELCOME ? 'Cover' : `Page ${Object.values(AppStage).indexOf(stage)}`} <span className="text-xs">🐾</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Persistent Virtual Cat Companion */}
        <VirtualCat />
      </div>
    </main>
  );
};

export default App;