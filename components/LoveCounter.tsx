"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/lib/config";
import { Gift } from "lucide-react";

interface TimeDiff {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LoveCounterProps {
  onGiftOpen: () => void;
}

export default function LoveCounter({ onGiftOpen }: LoveCounterProps) {
  const [timeDiff, setTimeDiff] = useState<TimeDiff>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(CONFIG.loveStartDate);
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        // Get number of days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGiftClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onGiftOpen();
    }, 1500); // 1.5s fade out duration
  };

  const counterItems = [
    { label: "Năm", value: timeDiff.years },
    { label: "Tháng", value: timeDiff.months },
    { label: "Ngày", value: timeDiff.days },
    { label: "Giờ", value: timeDiff.hours },
    { label: "Phút", value: timeDiff.minutes },
    { label: "Giây", value: timeDiff.seconds }
  ];

  return (
    <motion.div
      animate={{ opacity: isFadingOut ? 0 : 1, scale: isFadingOut ? 0.95 : 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center"
    >
      {/* Decorative ambient orb */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-500/15 blur-3xl -z-10 animate-pulse-slow" />

      {/* Header Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <span className="text-xl md:text-2xl" role="img" aria-label="sparkles">❤️</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-widest text-rose-300 mt-2 mb-1 uppercase">
          Together Since
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Counter Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-3xl w-full px-4 mb-14">
        {counterItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
            className="glass-panel py-5 md:py-6 px-2 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Subtle glow border */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
            
            {/* Dynamic Value */}
            <span className="text-3xl md:text-4xl font-bold font-serif text-rose-200 tracking-tight drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]">
              {String(item.value).padStart(2, "0")}
            </span>
            {/* Label */}
            <span className="text-xs md:text-sm text-rose-200/50 mt-2 uppercase tracking-widest font-semibold font-sans">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Section 8: Surprise Gift Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-col items-center"
      >
        <p className="text-sm md:text-base text-rose-200/60 font-light max-w-sm mb-6 leading-relaxed">
          Có một điều bí mật nhỏ nữa anh đã chuẩn bị cho em...
        </p>

        <motion.button
          onClick={handleGiftClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              "0 0 10px rgba(244, 63, 94, 0.3)",
              "0 0 25px rgba(244, 63, 94, 0.6)",
              "0 0 10px rgba(244, 63, 94, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }
          }}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-lg font-bold tracking-wide rounded-full shadow-lg transition-all duration-300 relative group overflow-hidden cursor-pointer"
        >
          {/* Shimmer animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          
          <Gift className="w-6 h-6 animate-bounce" />
          <span>Mở Món Quà Sinh Nhật 🎁</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
