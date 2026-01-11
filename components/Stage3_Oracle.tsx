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
    <div className="flex flex-col items-center justify-center min-h-full p-6 md:p-8 max-w-md mx-auto">
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-7xl md:text-8xl mb-6"
      >
        🐱
      </motion.div>

      <h2 className="text-2xl font-bold text-rose-600 mb-2 text-center">The Birthday Cat</h2>
      <p className="text-rose-400 mb-8 text-center font-hand text-lg">
        Ask the magical cat for a prediction about your 19th year!
      </p>

      {!prediction && (
        <Button 
          label={loading ? "Consulting the stars..." : "Reveal my Destiny ✨"} 
          onClick={handleAskOracle}
          disabled={loading}
          variant="secondary"
        />
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-100 mb-8 relative w-full"
        >
          <div className="text-4xl absolute -top-5 -left-5">🔮</div>
          <p className="text-lg md:text-xl font-hand text-gray-700 leading-relaxed">
            "{prediction}"
          </p>
        </motion.div>
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button label="Continue ❤️" onClick={onNext} variant="primary" />
        </motion.div>
      )}
    </div>
  );
};