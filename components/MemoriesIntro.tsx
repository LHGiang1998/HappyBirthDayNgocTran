"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface MemoriesIntroProps {
  onComplete: () => void;
}

export default function MemoriesIntro({ onComplete }: MemoriesIntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5s total (3s display + transition buffer)
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Decorative background lights */}
      <div className="absolute w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute w-80 h-80 rounded-full bg-rose-500/10 blur-3xl -z-10 animate-pulse-slow delay-1000" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.5
            }
          }
        }}
        className="max-w-xl"
      >
        {/* Title */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
          }}
          className="font-serif text-4xl md:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-indigo-200 mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
        >
          Our Memories ✨
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
          className="w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
          }}
          className="font-sans text-lg md:text-xl text-rose-200/70 font-light leading-relaxed max-w-md mx-auto"
        >
          Hành trình của tình yêu, những nụ cười và khoảnh khắc ngọt ngào chúng ta bên nhau.
        </motion.p>
      </motion.div>
    </div>
  );
}
