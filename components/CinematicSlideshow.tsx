"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Image from "next/image";
import { FastForward } from "lucide-react";

interface MemoryItem {
  file: string;
  title: string;
  date: string;
  description: string;
}

interface CinematicSlideshowProps {
  onComplete: () => void;
}

export default function CinematicSlideshow({ onComplete }: CinematicSlideshowProps) {
  const [images, setImages] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<MemoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch image list and metadata
  useEffect(() => {
    const loadData = async () => {
      try {
        const [imgRes, metaRes] = await Promise.all([
          fetch("/api/images"),
          fetch("/data/memories.json")
        ]);

        const imgList = await imgRes.json();
        const metaList = await metaRes.json();

        setImages(imgList);
        setMetadata(metaList);
      } catch (error) {
        console.error("Failed to load slideshow assets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Slide interval control
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 9000); // 9 seconds per slide (Ken Burns + crossfade buffer)

    return () => clearInterval(timer);
  }, [images, currentIndex, onComplete]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen z-10 relative">
        <div className="w-12 h-12 border-4 border-rose-500/25 border-t-rose-500 rounded-full animate-spin mb-4" />
        <p className="text-rose-200/60 font-medium">Đang mở khóa kỷ niệm...</p>
      </div>
    );
  }

  if (images.length === 0) {
    // If no images found, skip to next section
    onComplete();
    return null;
  }

  const currentImage = images[currentIndex];
  // Match metadata or use fallback values
  const currentMeta = metadata.find((m) => m.file === currentImage) || {
    file: currentImage,
    title: `Khoảnh khắc ngọt ngào #${currentIndex + 1}`,
    date: CONFIG.loveStartDate.split("T")[0].split("-").reverse().join("/"),
    description: "Kỷ niệm đẹp đẽ bên nhau lưu giữ mãi trong tim."
  };

  return (
    <div className="relative z-10 w-full h-screen overflow-hidden bg-black select-none">
      {/* Background Slideshow Canvas */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5, ease: "easeInOut" } }}
            className="relative w-full h-full"
          >
            {/* Ken Burns Animated Image Wrapper */}
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 9.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-8"
            >
              {/* Blurred Background Copy to fill screen dynamically without cropping */}
              <Image
                src={`/images/${currentImage}`}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover blur-2xl opacity-35 scale-110 pointer-events-none select-none"
              />
              {/* Clean Foreground Image fitted neatly within bounds */}
              <div className="relative w-full h-full max-w-4xl max-h-[70vh] md:max-h-[75vh]">
                <Image
                  src={`/images/${currentImage}`}
                  alt={currentMeta.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic Overlays */}
      {/* Dark Vignette & Bottom Caption Shade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />

      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pr-safe pl-safe pt-safe">
        <div className="glass-panel px-4 py-2 rounded-full text-sm font-semibold tracking-wider text-rose-200/80">
          Kỷ niệm {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onComplete}
          className="glass-panel flex items-center gap-1.5 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-rose-200 hover:text-white rounded-full hover:bg-rose-500/20 transition-all duration-300"
        >
          <FastForward className="w-4 h-4" />
          <span>Bỏ qua</span>
        </button>
      </div>

      {/* Caption Area (Bottom Center) */}
      <div className="absolute bottom-16 left-6 right-6 z-20 flex flex-col items-center text-center pb-safe pl-safe pr-safe">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage + "-caption"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl px-6 py-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/5"
          >
            {/* Date Tag Omitted */}

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-white mb-2 leading-snug">
              {currentMeta.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-rose-100/70 font-light leading-relaxed max-w-lg mx-auto">
              {currentMeta.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
