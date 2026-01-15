import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { getBirthdayOracle } from '../services/geminiService';

interface Props {
  onNext: () => void;
}

export const OracleStage: React.FC<Props> = ({ onNext }) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskOracle = async () => {
    setLoading(true);
    const result = await getBirthdayOracle();
    setPrediction(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 md:p-8 max-w-md mx-auto text-center">
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl md:text-9xl mb-6 relative"
      >
        <span className="relative z-10">🔮</span>
        <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl z-20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            😼
        </motion.div>
      </motion.div>

      <h2 className="text-3xl font-bold text-indigo-600 mb-2 font-hand">vibe check ✨</h2>
      <p className="text-indigo-400 mb-8 font-sans text-base max-w-xs lowercase">
        what's going to happen in your 19th year?
      </p>

      {!prediction && (
        <Button 
          label={loading ? "loading..." : "tell me 🎲"} 
          onClick={handleAskOracle}
          disabled={loading}
          variant="secondary"
          className="!bg-indigo-500 !border-indigo-400 hover:!bg-indigo-600 text-white lowercase"
        />
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-xl border-2 border-indigo-100 mb-8 relative w-full transform perspective-1000"
        >
          <div className="text-2xl absolute -top-3 -left-2 rotate-12">🌙</div>
          
          <p className="text-lg md:text-xl font-hand font-bold text-slate-700 leading-relaxed lowercase first-letter:lowercase">
            "{prediction}"
          </p>
        </motion.div>
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button label="manifesting this 🕯️" onClick={onNext} variant="primary" className="lowercase" />
        </motion.div>
      )}
    </div>
  );
};