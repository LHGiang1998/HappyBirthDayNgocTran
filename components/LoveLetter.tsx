"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FastForward } from "lucide-react";

interface LoveLetterProps {
  onComplete: () => void;
}

export default function LoveLetter({ onComplete }: LoveLetterProps) {
  const [fullText, setFullText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch letter content
    fetch("/data/love-letter.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load letter");
        return res.text();
      })
      .then((data) => setFullText(data))
      .catch((err) => {
        console.error(err);
        setFullText("Gửi Ngọc Trân yêu dấu của anh... ❤️\n\nChúc em sinh nhật vui vẻ!");
      });
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!fullText) return;
    if (displayedText.length >= fullText.length) {
      setIsTypingComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(fullText.substring(0, displayedText.length + 1));
      
      // Auto scroll to bottom of letter content during typing
      if (textEndRef.current) {
        textEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, Math.random() * 20 + 35); // dynamic character timing between 35-55ms for a natural typing feel

    return () => clearTimeout(timer);
  }, [fullText, displayedText]);

  // Handle auto-progress after completion
  useEffect(() => {
    if (!isTypingComplete) return;
    
    const nextTimer = setTimeout(() => {
      onComplete();
    }, 5000); // Wait 5 seconds after typewriter complete as requested
    
    return () => clearTimeout(nextTimer);
  }, [isTypingComplete, onComplete]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setIsTypingComplete(true);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg md:max-w-xl bg-[#faf6ee] rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col relative border border-[#e8dcc4] overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(139, 92, 26, 0.05)"
        }}
      >
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-800/10 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-800/10 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-800/10 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-800/10 rounded-br-xl" />

        {/* Scrollable letter container */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 no-scrollbar text-amber-950 font-serif leading-relaxed text-base md:text-lg whitespace-pre-wrap select-none">
          {displayedText}
          <div ref={textEndRef} />
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex justify-between items-center border-t border-amber-800/10 pt-4">
          <span className="text-xs text-amber-800/50 font-sans">
            {!isTypingComplete ? "Đang viết..." : "Đang đọc..."}
          </span>

          <AnimatePresence>
            {!isTypingComplete && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-950 bg-amber-800/5 hover:bg-amber-800/10 rounded-full transition-all duration-300"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Xem hết</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
