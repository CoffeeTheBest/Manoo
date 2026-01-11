import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AppStage } from './types';
import { WelcomeStage } from './components/Stage1_Welcome';
import { BalloonStage } from './components/Stage2_Balloons';
import { OracleStage } from './components/Stage3_Oracle';
import { CakeStage } from './components/Stage4_Cake';
import { LetterStage } from './components/Stage5_Letter';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.WELCOME);
  const [direction, setDirection] = useState(1); // 1 for forward

  useEffect(() => {
    // Small burst of confetti on every stage change
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#FF69B4', '#FFB6C1', '#FF1493', '#FFF0F5'],
      disableForReducedMotion: true
    });
  }, [stage]);

  const handleNext = (nextStage: AppStage) => {
    setDirection(1);
    setStage(nextStage);
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.WELCOME:
        return <WelcomeStage onNext={() => handleNext(AppStage.BALLOONS)} />;
      case AppStage.BALLOONS:
        return <BalloonStage onNext={() => handleNext(AppStage.ORACLE)} />;
      case AppStage.ORACLE:
        return <OracleStage onNext={() => handleNext(AppStage.CAKE)} />;
      case AppStage.CAKE:
        return <CakeStage onNext={() => handleNext(AppStage.LETTER)} />;
      case AppStage.LETTER:
        return <LetterStage />;
      default:
        return <WelcomeStage onNext={() => handleNext(AppStage.BALLOONS)} />;
    }
  };

  // Page Flip Animation Variants
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: "left center",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "left center",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: "left center",
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    })
  };

  return (
    <main className="w-full h-[100dvh] bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden relative flex items-center justify-center perspective-1000">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Floating Clouds */}
        <div className="absolute top-[10%] left-[10%] text-5xl opacity-30 animate-float text-white drop-shadow-sm">☁️</div>
        <div className="absolute top-[25%] right-[15%] text-4xl opacity-20 animate-float-delayed text-white">☁️</div>
        
        {/* Twinkling Stars */}
        <div className="absolute top-[15%] left-[30%] text-yellow-200 text-3xl opacity-60 animate-twinkle">✦</div>
        <div className="absolute top-[40%] left-[5%] text-yellow-100 text-2xl opacity-40 animate-twinkle" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-[20%] right-[10%] text-yellow-200 text-4xl opacity-50 animate-twinkle" style={{ animationDelay: '2s' }}>✦</div>
        <div className="absolute bottom-[40%] left-[15%] text-pink-200 text-xl opacity-60 animate-twinkle" style={{ animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-[5%] right-[30%] text-yellow-300 text-2xl opacity-40 animate-twinkle" style={{ animationDelay: '0.5s' }}>✨</div>

        {/* Drifting Flowers */}
        <div className="absolute top-[60%] left-[80%] text-3xl opacity-20 animate-drift">🌸</div>
        <div className="absolute bottom-[10%] left-[20%] text-2xl opacity-25 animate-drift" style={{ animationDelay: '3s' }}>🌹</div>
        <div className="absolute top-[30%] right-[40%] text-3xl opacity-15 animate-drift" style={{ animationDelay: '5s' }}>🌷</div>

        {/* Extra Cute Elements */}
        <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-wiggle">🎀</div>
        <div className="absolute top-1/2 left-10 text-3xl opacity-10 animate-float">🎵</div>
      </div>

      {/* The Book Container */}
      <div className="relative w-full max-w-2xl h-[90vh] md:h-[85vh] perspective-2000 px-4 md:px-0">
        
        {/* Book Back/Cover Edge Effect */}
        <div className="absolute inset-0 bg-white rounded-r-2xl rounded-l-lg shadow-2xl transform translate-x-2 translate-y-2 z-0"></div>
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-rose-300 to-pink-200 rounded-l-lg z-20 shadow-inner flex flex-col justify-center items-center space-y-8 border-r border-black/5">
             {/* Spine details */}
             <div className="w-full h-px bg-rose-400/30"></div>
             <div className="w-full h-px bg-rose-400/30"></div>
             <div className="w-full h-px bg-rose-400/30"></div>
        </div>

        {/* The Page Area */}
        <div className="relative w-full h-full pl-8 md:pl-12 z-10">
          <AnimatePresence mode="wait" custom={direction}>
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
              {/* Paper Texture & Spine Shadow */}
              <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-black/5 to-transparent w-8"></div>
              
              {/* Content Container */}
              <div className="w-full h-full overflow-hidden relative z-10 bg-[#fffdf9]">
                 {renderStage()}
              </div>

              {/* Page Number / Decoration Footer */}
              <div className="absolute bottom-3 right-6 text-pink-300 font-hand text-sm z-20">
                {stage === AppStage.WELCOME ? 'Cover' : 'Page ' + (Object.values(AppStage).indexOf(stage))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default App;