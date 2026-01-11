import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = ({ variant = 'primary', label, className, ...props }: ButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 outline-none";
  const variants = {
    primary: "bg-white text-pink-500 border-4 border-pink-200 hover:bg-pink-50 hover:border-pink-300 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-rose-400 text-white border-4 border-rose-300 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <motion.button
      whileHover={props.disabled ? {} : { scale: 1.05 }}
      whileTap={props.disabled ? {} : { scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {label}
    </motion.button>
  );
};