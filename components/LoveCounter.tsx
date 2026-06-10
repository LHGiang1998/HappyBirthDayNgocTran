"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

interface LoveCounterProps {
  onGiftOpen: () => void;
}

export default function LoveCounter({ onGiftOpen }: LoveCounterProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleGiftClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onGiftOpen();
    }, 1500); // 1.5s fade out duration
  };

  return (
    <motion.div
      animate={{ opacity: isFadingOut ? 0 : 1, scale: isFadingOut ? 0.95 : 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
    >
      {/* Decorative ambient orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-500/15 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl -z-10 animate-pulse-slow delay-1000" />

      {/* Header Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <span className="text-3xl animate-bounce inline-block" role="img" aria-label="sparkling gift">🎁</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-widest text-rose-300 mt-2 mb-3 uppercase drop-shadow-md">
          Món Quà Sinh Nhật
        </h2>
        <p className="text-sm md:text-base text-rose-200/60 font-light max-w-md mx-auto leading-relaxed px-4">
          Có một điều bí mật vô cùng ngọt ngào và đặc biệt anh đã chuẩn bị riêng cho Ngọc Trân...
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Interactive Glowing Gift Container */}
      <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mb-8 select-none">
        
        {/* Outer glowing ripple circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute w-56 h-56 rounded-full bg-rose-500/10 blur-xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          className="absolute w-72 h-72 rounded-full bg-indigo-500/5 blur-2xl"
        />

        {/* Gift Box Graphic Wrapper */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleGiftClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer relative z-10 flex flex-col items-center justify-center w-44 h-44 md:w-52 md:h-52 bg-gradient-to-tr from-rose-500/15 via-transparent to-indigo-500/15 border border-rose-500/25 rounded-3xl shadow-[0_0_35px_rgba(244,63,94,0.18)] group transition-all duration-300"
          style={{
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors duration-300 rounded-3xl" />
          
          {/* Shimmer animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />

          {/* Large floating Gift Icon */}
          <motion.div
            animate={{ 
              y: isHovered ? [0, -6, 0] : [0, -4, 0],
              rotate: isHovered ? [0, -8, 8, -8, 0] : 0
            }}
            transition={{
              y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
              rotate: { duration: 0.5, ease: "easeInOut" }
            }}
            className="text-rose-400 group-hover:text-rose-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-colors duration-300"
          >
            <Gift className="w-20 h-20 md:w-24 md:h-24 stroke-[1.25]" />
          </motion.div>

          {/* Sparkles inside box */}
          <span className="absolute top-4 left-6 text-base animate-ping opacity-60">✨</span>
          <span className="absolute bottom-6 right-8 text-xs animate-pulse text-indigo-300">💖</span>
        </motion.div>
      </div>

      {/* Button Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <button
          onClick={handleGiftClick}
          className="glass-panel px-8 py-3.5 text-sm md:text-base font-bold tracking-widest text-rose-300 hover:text-white uppercase rounded-full hover:bg-rose-500/20 border border-rose-500/35 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.35)] active:scale-95 cursor-pointer transition-all duration-300"
        >
          Chạm Để Mở Quà 💝
        </button>
      </motion.div>
    </motion.div>
  );
}
