import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', label, className, ...props }) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 outline-none";
  const variants = {
    primary: "bg-white text-pink-500 border-4 border-pink-200 hover:bg-pink-50 hover:border-pink-300",
    secondary: "bg-rose-400 text-white border-4 border-rose-300 hover:bg-rose-500",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {label}
    </motion.button>
  );
};