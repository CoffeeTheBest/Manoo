import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from './Button';

interface Props {
  onNext: () => void;
}

const FLAVORS = [
  { id: 'strawberry', name: 'Strawberry', colorBase: 'bg-pink-400', colorTop: 'bg-pink-300', border: 'border-pink-500', text: 'text-pink-600' },
  { id: 'chocolate', name: 'Choco', colorBase: 'bg-[#5D4037]', colorTop: 'bg-[#795548]', border: 'border-[#3E2723]', text: 'text-orange-100' },
  { id: 'vanilla', name: 'Vanilla', colorBase: 'bg-[#FDF5E6]', colorTop: 'bg-[#FFF8DC]', border: 'border-[#DEB887]', text: 'text-orange-800' },
  { id: 'redvelvet', name: 'Red Velvet', colorBase: 'bg-[#C62828]', colorTop: 'bg-[#E53935]', border: 'border-[#880E4F]', text: 'text-white' },
  { id: 'matcha', name: 'Matcha', colorBase: 'bg-[#689F38]', colorTop: 'bg-[#8BC34A]', border: 'border-[#33691E]', text: 'text-lime-900' },
  { id: 'blueberry', name: 'Blueberry', colorBase: 'bg-[#3949AB]', colorTop: 'bg-[#5C6BC0]', border: 'border-[#1A237E]', text: 'text-blue-100' },
  { id: 'lemon', name: 'Lemon', colorBase: 'bg-yellow-400', colorTop: 'bg-yellow-300', border: 'border-yellow-600', text: 'text-yellow-800' },
  { id: 'taro', name: 'Taro', colorBase: 'bg-purple-400', colorTop: 'bg-purple-300', border: 'border-purple-600', text: 'text-purple-100' },
];

const TOPPINGS = [
  { id: 'none', name: 'Plain', icon: '🚫' },
  { id: 'paws', name: 'Paws', icon: '🐾' },
  { id: 'ears', name: 'Ears', icon: '🐱' },
  { id: 'fish', name: 'Fishies', icon: '🐟' },
  { id: 'yarn', name: 'Yarn', icon: '🧶' },
  { id: 'mouse', name: 'Mice', icon: '🐭' },
  { id: 'hearts', name: 'Love', icon: '😻' },
  { id: 'sprinkles', name: 'Sprinkles', icon: '🌈' },
];

export const CakeStage: React.FC<Props> = ({ onNext }) => {
  const [step, setStep] = useState<'decorating' | 'candles' | 'celebrating'>('decorating');
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedTopping, setSelectedTopping] = useState(TOPPINGS[0]);
  
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
    if (average > 40 && step === 'candles') {
      blowCandles();
    } else {
      requestRef.current = requestAnimationFrame(checkVolume);
    }
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
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
    setStep('celebrating');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD1DC', '#FDFD96', '#B39EB5']
    });
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(e => console.error("Error closing AudioContext:", e));
    }
    if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
    }
  };

  useEffect(() => {
    return () => {
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.error("Error cleanup AudioContext:", e));
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };
  }, []);

  const renderToppings = () => {
    switch(selectedTopping.id) {
        case 'sprinkles':
            return <div className="absolute inset-0 w-full h-full opacity-60 sprinkle-pattern rounded-lg pointer-events-none"></div>;
        case 'paws':
            return <div className="absolute inset-0 w-full h-full opacity-40 paw-pattern rounded-lg pointer-events-none"></div>;
        case 'ears':
             return (
                 <>
                    <div className="absolute -top-6 left-2 text-4xl transform -rotate-12">🐱</div>
                    <div className="absolute -top-6 right-2 text-4xl transform rotate-12">🐱</div>
                 </>
             );
        case 'fish':
            return <div className="absolute -top-3 w-full flex justify-center space-x-2 text-2xl drop-shadow-sm"><span>🐟</span><span>🐠</span><span>🐡</span></div>;
        case 'yarn':
            return <div className="absolute -top-4 w-full flex justify-center space-x-2 text-2xl drop-shadow-sm"><span>🧶</span><span>🧵</span><span>🧶</span></div>;
        case 'mouse':
            return <div className="absolute -top-2 w-full flex justify-center space-x-3 text-xl drop-shadow-sm"><span>🐭</span><span>🐭</span></div>;
        case 'hearts':
            return <div className="absolute -top-3 w-full flex justify-center space-x-3 text-2xl drop-shadow-sm"><span>😻</span><span>💖</span><span>😻</span></div>;
        default:
            return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full p-4 w-full">
      <motion.div
        layout
        className="w-full max-w-md flex flex-col items-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-rose-500 mb-8 text-center font-hand mt-4">
            {step === 'decorating' ? "Bake a Meow-velous Cake! 🍰" : 
             step === 'candles' ? "Make a Wish & Purr! 🕯️" : 
             "Happy Birthday! 🎂"}
        </h2>
      
        <div className="relative w-64 h-56 mb-8 flex-shrink-0 flex items-center justify-center mt-8 transform scale-90 md:scale-100">
            {/* Cake Base */}
            <motion.div 
                layoutId="cake-base"
                className={`absolute bottom-0 w-48 h-24 rounded-lg shadow-xl z-10 flex items-center justify-center border-b-8 transition-colors duration-500 ${selectedFlavor.colorBase} ${selectedFlavor.border}`}
            >
                {selectedTopping.id === 'sprinkles' && <div className="absolute inset-0 w-full h-full opacity-40 sprinkle-pattern rounded-lg"></div>}
                {selectedTopping.id === 'paws' && <div className="absolute inset-0 w-full h-full opacity-30 paw-pattern rounded-lg"></div>}
                <div className={`w-full h-full rounded-lg opacity-20 absolute top-0 left-0 bg-white/30`}></div>
            </motion.div>

            {/* Cake Top Layer */}
            <motion.div 
                layoutId="cake-top"
                className={`absolute bottom-24 w-40 h-20 rounded-lg shadow-lg z-10 border-b-8 transition-colors duration-500 flex justify-center items-end pb-3 ${selectedFlavor.colorTop} ${selectedFlavor.border}`}
            >
                {renderToppings()}
                <span className={`font-bold text-xl font-hand mix-blend-overlay opacity-80 ${selectedFlavor.text}`}>Mahnoor</span>
            </motion.div>

            {/* Candles */}
            <AnimatePresence>
                {step !== 'decorating' && (
                    <div className="absolute bottom-44 flex space-x-4 z-0">
                    {[1, 2, 3].map((i) => (
                        <motion.div 
                            key={i} 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Flame */}
                            <AnimatePresence>
                                {step === 'candles' && (
                                    <motion.div
                                        initial={{ scale: 0 }}
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
                            <div className="w-2 h-12 bg-white/80 border border-gray-200 rounded-sm striped-candle"></div>
                        </motion.div>
                    ))}
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Decoration Controls */}
        <AnimatePresence mode="wait">
            {step === 'decorating' ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full bg-white/60 p-4 rounded-2xl backdrop-blur-sm border border-pink-100"
                >
                    {/* Flavors */}
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-500 mb-2 block uppercase tracking-wider">Flavor</label>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {FLAVORS.map(flavor => (
                                <button
                                    key={flavor.id}
                                    onClick={() => setSelectedFlavor(flavor)}
                                    className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 shadow-sm ${flavor.colorBase} ${selectedFlavor.id === flavor.id ? 'ring-2 ring-offset-2 ring-pink-400 scale-110' : 'border-white'}`}
                                    title={flavor.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Toppings */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-gray-500 mb-2 block uppercase tracking-wider">Kitty Toppings</label>
                        <div className="grid grid-cols-4 gap-2">
                            {TOPPINGS.map(topping => (
                                <button
                                    key={topping.id}
                                    onClick={() => setSelectedTopping(topping)}
                                    className={`p-2 rounded-xl text-2xl border-2 transition-all hover:bg-white/80 ${selectedTopping.id === topping.id ? 'bg-white border-pink-400 shadow-md' : 'bg-transparent border-transparent'}`}
                                    title={topping.name}
                                >
                                    {topping.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button label="Light Candles! 🕯️" onClick={() => setStep('candles')} />
                    </div>
                </motion.div>
            ) : step === 'candles' ? (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center space-y-4"
                 >
                    {micPermission === null && (
                        <Button label="Blow candles (Enable Mic) 🎤" onClick={startListening} />
                    )}

                    {micPermission === false && (
                        <p className="text-gray-500 text-sm">Mic disabled? Tap the button below!</p>
                    )}

                    {(micPermission === true || micPermission === false) && (
                        <button 
                            onClick={blowCandles}
                            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        >
                        🌬️ Blow / Tap Here
                        </button>
                    )}
                 </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <p className="text-xl font-hand text-rose-500 mb-6">"May all your wishes come true, Mahnoor!"</p>
                    <Button label="Read Letter 💌" onClick={onNext} variant="primary" />
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>

        <style>{`
            .striped-candle {
                background-image: repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.8),
                    rgba(255,255,255,0.8) 5px,
                    #ffb6c1 5px,
                    #ffb6c1 10px
                );
            }
            .sprinkle-pattern {
                background-image: 
                    radial-gradient(circle, #FF69B4 2px, transparent 2.5px),
                    radial-gradient(circle, #4ADE80 2px, transparent 2.5px),
                    radial-gradient(circle, #60A5FA 2px, transparent 2.5px),
                    radial-gradient(circle, #FCD34D 2px, transparent 2.5px);
                background-size: 20px 20px;
                background-position: 0 0, 10px 10px, 5px 15px, 15px 5px;
            }
             .paw-pattern {
                background-image: 
                    radial-gradient(circle, #888 1.5px, transparent 2px), /* Pad */
                    radial-gradient(circle, #888 1px, transparent 1.5px); /* Toe */
                background-size: 20px 20px;
                background-position: 0 0;
                /* Note: Simple CSS dots here, SVG background image on body is better for detailed paws */
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='12' r='3' fill='%23FF69B4' opacity='0.5'/%3E%3Ccircle cx='6' cy='8' r='1.5' fill='%23FF69B4' opacity='0.5'/%3E%3Ccircle cx='14' cy='8' r='1.5' fill='%23FF69B4' opacity='0.5'/%3E%3C/svg%3E");
            }
        `}</style>
    </div>
  );
};