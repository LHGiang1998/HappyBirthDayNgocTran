"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface PolaroidItem {
  file: string;
  title: string;
  rotation: number;
  startX: number;
  startY: number;
  scale: number;
}

interface PolaroidsSectionProps {
  onComplete: () => void;
}

export default function PolaroidsSection({ onComplete }: PolaroidsSectionProps) {
  const [polaroids, setPolaroids] = useState<PolaroidItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setupPolaroids = async () => {
      try {
        const [imgRes, metaRes] = await Promise.all([
          fetch("/api/images"),
          fetch("/data/memories.json")
        ]);

        const imgList: string[] = await imgRes.json();
        const metaList = await metaRes.json();

        if (imgList.length === 0) return;

        // Select a subset of images (up to 9) to keep the screen elegant and prevent performance lag
        const selectedImages = imgList.slice(0, 9);

        // Generate polaroid details with random entry coordinates and sizes
        const list: PolaroidItem[] = selectedImages.map((file, i) => {
          // Off-screen entry points: 0 = top, 1 = left, 2 = right
          const entrySide = i % 3;
          let startX = 0;
          let startY = 0;

          if (entrySide === 0) {
            // Enter from Top
            startX = (Math.random() - 0.5) * 500;
            startY = -400;
          } else if (entrySide === 1) {
            // Enter from Left
            startX = -500;
            startY = (Math.random() - 0.5) * 300;
          } else {
            // Enter from Right
            startX = 500;
            startY = (Math.random() - 0.5) * 300;
          }

          const meta = metaList.find((m: any) => m.file === file);
          const title = meta ? meta.title : `Khoảnh khắc ngọt ngào`;

          return {
            file,
            title,
            rotation: (Math.random() - 0.5) * 24, // -12deg to +12deg
            startX,
            startY,
            scale: Math.random() * 0.15 + 0.85 // random size scaling
          };
        });

        setPolaroids(list);
      } catch (err) {
        console.error("Failed to load polaroid images:", err);
      }
    };

    setupPolaroids();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 overflow-hidden select-none"
    >
      {/* Title */}
      <div className="text-center mt-4 z-20">
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-rose-200 mb-2 drop-shadow-md">
          Album Kỷ Niệm ❤️
        </h2>
        <p className="text-sm md:text-base text-rose-200/60 font-light">
          Di chuyển và khám phá các tấm hình chụp chung của tụi mình nhé!
        </p>
      </div>

      {/* Polaroid Container (relative boundaries) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-5xl h-[65vh] relative flex items-center justify-center">
          {polaroids.map((polaroid, index) => {
            // Distribute polaroids around center in a responsive grid
            const angle = (index / polaroids.length) * Math.PI * 2;
            const radiusX = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 250;
            const radiusY = typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 150;
            const defaultX = Math.cos(angle) * radiusX;
            const defaultY = Math.sin(angle) * radiusY;

            return (
              <motion.div
                key={polaroid.file}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, zIndex: 50, boxShadow: "0 25px 35px rgba(0,0,0,0.4)" }}
                initial={{ 
                  x: polaroid.startX, 
                  y: polaroid.startY,
                  rotate: polaroid.rotation * 1.5,
                  opacity: 0 
                }}
                animate={{ 
                  x: defaultX, 
                  y: defaultY, 
                  rotate: polaroid.rotation,
                  opacity: 1 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 45, 
                  damping: 10,
                  delay: index * 0.15 
                }}
                style={{
                  scale: polaroid.scale,
                }}
                className="absolute w-44 h-56 md:w-52 md:h-64 bg-white p-3 shadow-xl rounded-sm border border-gray-100/60 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-shadow duration-300"
              >
                {/* Photo container */}
                <div className="w-full h-[80%] relative bg-gray-100 overflow-hidden rounded-xs pointer-events-none">
                  <Image
                    src={`/images/${polaroid.file}`}
                    alt={polaroid.title}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover"
                  />
                </div>
                {/* Caption bottom */}
                <div className="h-[20%] w-full flex items-center justify-center pointer-events-none px-1 overflow-hidden">
                  <p className="font-serif text-[#3b2d18] text-xs md:text-sm font-semibold truncate text-center select-none font-medium italic">
                    {polaroid.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Button */}
      <div className="z-20 mb-4 pb-safe">
        <button
          onClick={onComplete}
          className="glass-panel flex items-center gap-2 px-6 py-3 text-base font-semibold uppercase tracking-wider text-rose-200 hover:text-white rounded-full hover:bg-rose-500/20 shadow-lg transition-all duration-300"
        >
          <span>Tiếp tục chặng đường</span>
          <ArrowRight className="w-5 h-5 animate-pulse" />
        </button>
      </div>
    </div>
  );
}
