"use client";

import React from "react";
import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";

interface CardSectionProps {
  onOpen: () => void;
}

export default function CardSection({ onOpen }: CardSectionProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      {/* Decorative ambient background blur behind the card */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-rose-500/20 blur-3xl -z-10 animate-pulse-slow" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -12, 0]
        }}
        transition={{
          opacity: { duration: 1.2 },
          scale: { duration: 1.2 },
          y: { 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut" 
          }
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpen}
        className="glass-panel cursor-pointer max-w-sm w-full p-8 md:p-10 rounded-2xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden group select-none"
        style={{
          border: "1px solid rgba(244, 63, 94, 0.25)"
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Envelope Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-500/20 group-hover:text-rose-300 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
        >
          <span className="text-4xl" role="img" aria-label="envelope">💌</span>
        </motion.div>

        {/* Text Area */}
        <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-2">
          Happy Birthday
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-rose-400 mb-6 drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]">
          My Love Ngọc Trân ❤️
        </h2>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent mb-6" />

        {/* Button Prompt */}
        <div className="flex items-center gap-2 text-sm md:text-base font-medium text-rose-300/80 group-hover:text-rose-200 transition-colors duration-300">
          <MailOpen className="w-4 h-4 animate-bounce" />
          <span>Tap To Open</span>
        </div>
      </motion.div>
    </div>
  );
}
