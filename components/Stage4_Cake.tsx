import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from './Button';

interface Props {
  onNext: () => void;
}

export const CakeStage: React.FC<Props> = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const requestRef = useRef<number>();

  const checkVolume = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;

    // Threshold for "blowing"
    if (average > 40 && !candlesBlown) {
      blowCandles();
    } else {
      requestRef.current = requestAnimationFrame(checkVolume);
    }
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Close existing context if it exists and is open
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
      }

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      source.connect(analyserRef.current);
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      setMicPermission(true);
      checkVolume();
    } catch (err) {
      console.log("Mic access denied or error", err);
      setMicPermission(false);
    }
  };

  const blowCandles = () => {
    setCandlesBlown(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD1DC', '#FDFD96', '#B39EB5']
    });
    
    // Safe close
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(e => console.error("Error closing AudioContext:", e));
    }
    
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }
  };

  useEffect(() => {
    return () => {
        // Safe cleanup
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.error("Error cleanup AudioContext:", e));
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
       <h2 className="text-3xl font-bold text-rose-500 mb-8 text-center">
        {candlesBlown ? "Yay! Make a wish! 🌠" : "Blow out the candles! 🕯️"}
      </h2>
      
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        {/* Cake Base */}
        <div className="absolute bottom-0 w-48 h-24 bg-pink-300 rounded-lg shadow-xl z-10 flex items-center justify-center border-b-8 border-pink-400">
             <div className="w-full h-full bg-pink-300 rounded-lg opacity-80 absolute top-0 left-0 animate-pulse"></div>
        </div>
        {/* Cake Top Layer */}
        <div className="absolute bottom-24 w-40 h-20 bg-pink-200 rounded-lg shadow-lg z-10 border-b-8 border-pink-300 flex justify-center items-end pb-2">
            <span className="text-rose-400 font-bold text-xl opacity-50">Mahnoor</span>
        </div>

        {/* Candles */}
        <div className="absolute bottom-44 flex space-x-4 z-0">
          {[1, 2, 3].map((i) => (
             <div key={i} className="relative flex flex-col items-center">
                 {/* Flame */}
                 <AnimatePresence>
                     {!candlesBlown && (
                         <motion.div
                            initial={{ scale: 1 }}
                            animate={{ 
                                scale: [1, 1.2, 0.9, 1.1], 
                                rotate: [-2, 2, -2],
                                height: [24, 28, 22] 
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="w-4 h-6 bg-yellow-400 rounded-full blur-sm absolute -top-6 shadow-[0_0_20px_rgba(255,255,0,0.6)]"
                         />
                     )}
                 </AnimatePresence>
                 {/* Stick */}
                 <div className="w-2 h-12 bg-rose-200 border border-rose-300 rounded-sm striped-candle"></div>
             </div>
          ))}
        </div>
      </div>

      {!candlesBlown && micPermission === null && (
        <Button label="Enable Mic to Blow 🎤" onClick={startListening} />
      )}

      {!candlesBlown && micPermission === false && (
          <p className="text-gray-500 mb-4">Mic disabled? Just tap the candles!</p>
      )}

      {!candlesBlown && (micPermission === true || micPermission === false) && (
        <button 
            onClick={blowCandles}
            className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold hover:bg-pink-200 transition"
        >
          (Or Tap Here)
        </button>
      )}

      {candlesBlown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
            <Button label="Read Letter 💌" onClick={onNext} variant="primary" />
        </motion.div>
      )}

        <style>{`
            .striped-candle {
                background-image: repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 5px,
                    rgba(255, 255, 255, 0.5) 5px,
                    rgba(255, 255, 255, 0.5) 10px
                );
            }
        `}</style>
    </div>
  );
};