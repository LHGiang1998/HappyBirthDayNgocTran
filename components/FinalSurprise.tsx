"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Image from "next/image";
import BackgroundEffects from "./BackgroundEffects";

export default function FinalSurprise() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMosaic, setShowMosaic] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: 800, height: 600 });

  // Update window size on client mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch images for the mosaic
  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error loading mosaic images:", err));
  }, []);

  // Cycle through messages sequentially
  useEffect(() => {
    if (currentMessageIndex < CONFIG.finalMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 4000); // 4 seconds per message (includes fade transition)
      return () => clearTimeout(timer);
    } else {
      setShowMosaic(true);
    }
  }, [currentMessageIndex]);

  // Parametric Heart equation coordinate solver
  const getHeartCoords = (index: number, total: number) => {
    const isMobile = windowDimensions.width < 768;
    
    // Split: 65% of images form the outer boundary, 35% form the inner layer
    const boundaryCut = Math.floor(total * 0.65);
    const isOuter = index < boundaryCut;
    
    const layerIndex = isOuter ? index : index - boundaryCut;
    const layerTotal = isOuter ? boundaryCut : total - boundaryCut;

    // Angle parameter (0 to 2*PI)
    const t = (layerIndex / layerTotal) * Math.PI * 2;
    
    // Heart formulas
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    // Multipliers for scale and spacing
    const scaleFactor = isMobile ? 8.5 : 15;
    const layerScale = isOuter ? 1.0 : 0.6; // Inner layer is smaller

    return {
      x: x * scaleFactor * layerScale,
      y: y * scaleFactor * layerScale,
      isOuter
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-10 min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* High-intensity heart and particle background for final scene */}
      <BackgroundEffects intensity={showMosaic ? "high" : "normal"} />

      <AnimatePresence mode="wait">
        {/* Section 9: Sequential Messages */}
        {!showMosaic && currentMessageIndex < CONFIG.finalMessages.length && (
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="px-6 text-center max-w-2xl z-20"
          >
            <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-indigo-200 drop-shadow-[0_4px_12px_rgba(244,63,94,0.25)]">
              {CONFIG.finalMessages[currentMessageIndex]}
            </h1>
          </motion.div>
        )}

        {/* Section 10: Heart Photo Mosaic Climax */}
        {showMosaic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full"
          >
            {/* Center Pulsing Heart Envelope Wrapper */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Mosaic Images */}
              {images.map((file, index) => {
                const coords = getHeartCoords(index, images.length);
                const isMobile = windowDimensions.width < 768;
                const polaroidSize = isMobile ? "w-10 h-12" : "w-20 h-24";
                const borderSize = isMobile ? "p-[2px] pb-[6px]" : "p-1 pb-3";

                return (
                  <motion.div
                    key={file}
                    initial={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.3
                    }}
                    animate={{
                      x: coords.x,
                      y: coords.y,
                      rotate: (index % 2 === 0 ? 1 : -1) * (index * 7 % 12), // slight random rotation
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 30,
                      damping: 12,
                      delay: index * 0.05 + 0.5
                    }}
                    className={`absolute ${polaroidSize} bg-white shadow-xl ${borderSize} border-[0.5px] border-gray-200 rounded-2xs overflow-hidden select-none hover:scale-125 hover:z-50 transition-all duration-300`}
                  >
                    <div className="w-full h-full relative overflow-hidden bg-gray-100 rounded-3xs">
                      <Image
                        src={`/images/${file}`}
                        alt="Kỷ niệm"
                        fill
                        sizes="(max-width: 768px) 40px, 80px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Heart Climax Central Text (Inside the Heart) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="z-30 flex flex-col items-center text-center px-4"
              >
                <span className="text-4xl md:text-5xl animate-bounce mb-2" role="img" aria-label="sparkling heart">💖</span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-widest text-white drop-shadow-[0_4px_15px_rgba(244,63,94,0.6)] uppercase">
                  Ngọc Trân
                </h1>
                <p className="text-xs md:text-sm tracking-widest font-semibold text-rose-300/80 uppercase mt-2">
                  Happy Birthday My Queen
                </p>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent my-3" />
                <p className="font-serif text-[#ffd700] text-sm md:text-lg italic font-medium">
                  &ldquo;Yêu em trọn vẹn cả cuộc đời&rdquo;
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
