"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

export default function EnvelopeOpening({ onComplete }: EnvelopeOpeningProps) {
  const flapControls = useAnimation();
  const letterControls = useAnimation();
  const containerControls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      // Step 1: Container zooms in slightly (0 - 0.5s)
      await containerControls.start({
        scale: 1.08,
        transition: { duration: 0.5, ease: "easeOut" }
      });

      // Step 2: Flap opens (rotates up, 0.5s - 1.2s)
      await flapControls.start({
        rotateX: -180,
        zIndex: 1, // behind the letter once opened
        transition: { duration: 0.7, ease: "easeInOut" }
      });

      // Step 3: Letter slides out of the envelope (1.2s - 2.5s)
      await letterControls.start({
        y: -180,
        scale: 1.05,
        transition: { duration: 1.2, ease: "easeOut" }
      });

      // Step 4: Short pause, then complete
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    runAnimation();
  }, [flapControls, letterControls, containerControls, onComplete]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 bg-slate-950/45 transition-colors duration-1000">
      
      {/* Outer Envelope Wrapper */}
      <motion.div
        animate={containerControls}
        initial={{ scale: 0.95 }}
        className="relative w-80 h-56 md:w-[400px] md:h-[280px] select-none"
      >
        
        {/* ENVELOPE BACK BODY (the interior backing) */}
        <div className="absolute inset-0 bg-[#3b132c] rounded-b-xl shadow-2xl overflow-hidden border border-[#521d3f]/40">
          {/* Subtle inside gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        </div>

        {/* THE LETTER (Slides out from between back and front pocket) */}
        <motion.div
          initial={{ y: 0, scale: 0.95 }}
          animate={letterControls}
          className="absolute left-4 right-4 top-4 bottom-4 glass-panel-light rounded-lg shadow-lg p-6 flex flex-col items-center justify-center z-10"
          style={{
            transformOrigin: "bottom center"
          }}
        >
          {/* Simulated content of the letter sliding out */}
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-2 border border-rose-200">
            ❤️
          </div>
          <p className="font-serif text-[#4c1d3b] text-base md:text-lg font-semibold tracking-wide text-center">
            Một Thư Tình Gửi Em...
          </p>
          <div className="w-16 h-[2px] bg-rose-300 mt-2" />
        </motion.div>

        {/* ENVELOPE FRONT POCKET (drawn as visual polygons/borders) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left triangle */}
          <div 
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#571c41] rounded-bl-xl border-l border-b border-[#732b58]/30 shadow-md"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
          />
          {/* Right triangle */}
          <div 
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#571c41] rounded-br-xl border-r border-b border-[#732b58]/30 shadow-md"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
          />
          {/* Bottom flap */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#481535] rounded-b-xl border-b border-[#61214a]/30 shadow-inner"
            style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
          />
        </div>

        {/* ENVELOPE TOP FLAP (rotates upwards on X-axis) */}
        <motion.div
          initial={{ rotateX: 0, zIndex: 30 }}
          animate={flapControls}
          style={{
            transformOrigin: "top center",
            perspective: 800,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)"
          }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#6b2650] rounded-t-xl border-t border-[#873769]/30 shadow-lg"
        />

      </motion.div>
    </div>
  );
}
