"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { CONFIG } from "@/lib/config";
import BackgroundEffects from "@/components/BackgroundEffects";
import CardSection from "@/components/CardSection";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import LoveLetter from "@/components/LoveLetter";
import MemoriesIntro from "@/components/MemoriesIntro";
import CinematicSlideshow from "@/components/CinematicSlideshow";
import PolaroidsSection from "@/components/PolaroidsSection";
import LoveCounter from "@/components/LoveCounter";
import FinalSurprise from "@/components/FinalSurprise";

type StoryStep =
  | "card"
  | "opening"
  | "letter"
  | "memories_intro"
  | "slideshow"
  | "polaroids"
  | "counter"
  | "final_surprise";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StoryStep>("card");
  const [howlInstance, setHowlInstance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const synthRef = useRef<AudioContext | null>(null);

  // Initialize Howler client-side
  useEffect(() => {
    let music: any;
    import("howler").then(({ Howl }) => {
      music = new Howl({
        src: [CONFIG.musicPath],
        loop: true,
        volume: 0.7,
        onloaderror: (id, err) => {
          console.warn("Howler load error, will use synth fallback if played.", err);
        },
        onplayerror: (id, err) => {
          console.warn("Howler play error, triggering synth fallback.", err);
          startSynthFallback();
        }
      });
      setHowlInstance(music);
    });

    return () => {
      if (music) {
        music.unload();
      }
      stopSynthFallback();
    };
  }, []);

  // Web Audio API Synthesizer Fallback
  const startSynthFallback = () => {
    if (typeof window === "undefined" || synthRef.current) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      synthRef.current = ctx;

      // Romantic chord progression arpeggio: C - G/B - Am - F
      const chordNotes = [
        [261.63, 329.63, 392.00, 523.25], // C Major
        [246.94, 293.66, 392.00, 587.33], // G Major (B bass)
        [220.00, 329.63, 440.00, 523.25], // A Minor
        [174.61, 261.63, 349.23, 440.00]  // F Major
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playNote = () => {
        if (!synthRef.current || synthRef.current.state === "closed") return;
        
        const currentCtx = synthRef.current;
        const osc = currentCtx.createOscillator();
        const gain = currentCtx.createGain();

        // Warm, soft triangle wave
        osc.type = "triangle";
        const notes = chordNotes[chordIndex];
        osc.frequency.setValueAtTime(notes[noteIndex], currentCtx.currentTime);

        // Gentle envelope curve
        gain.gain.setValueAtTime(isMuted ? 0 : 0.08, currentCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, currentCtx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(currentCtx.destination);
        osc.start();
        osc.stop(currentCtx.currentTime + 1.5);

        noteIndex = (noteIndex + 1) % notes.length;
        if (noteIndex === 0) {
          chordIndex = (chordIndex + 1) % chordNotes.length;
        }

        // Trigger next note on a timer (gentle slow pace)
        setTimeout(playNote, 500);
      };

      playNote();
    } catch (e) {
      console.error("Failed to start Web Audio synth:", e);
    }
  };

  const stopSynthFallback = () => {
    if (synthRef.current) {
      synthRef.current.close().catch(() => {});
      synthRef.current = null;
    }
  };

  const handleStartMusic = () => {
    if (isPlaying) return;

    if (howlInstance) {
      // Play Howler
      try {
        howlInstance.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Failed to play Howler, using fallback synth.", err);
        startSynthFallback();
        setIsPlaying(true);
      }
    } else {
      // Fallback directly
      startSynthFallback();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      if (howlInstance) {
        howlInstance.mute(false);
      }
      if (synthRef.current && synthRef.current.state === "suspended") {
        synthRef.current.resume();
      }
      setIsMuted(false);
    } else {
      if (howlInstance) {
        howlInstance.mute(true);
      }
      if (synthRef.current && synthRef.current.state === "running") {
        synthRef.current.suspend();
      }
      setIsMuted(true);
    }
  };

  // State Transitions
  const handleOpenCard = () => {
    setCurrentStep("opening");
    // Start music on user gesture
    handleStartMusic();
  };

  const handleOpeningComplete = () => {
    setCurrentStep("letter");
  };

  const handleLetterComplete = () => {
    setCurrentStep("memories_intro");
  };

  const handleMemoriesIntroComplete = () => {
    setCurrentStep("slideshow");
  };

  const handleSlideshowComplete = () => {
    setCurrentStep("polaroids");
  };

  const handlePolaroidsComplete = () => {
    setCurrentStep("counter");
  };

  const handleGiftOpened = () => {
    setCurrentStep("final_surprise");
  };

  return (
    <main className="relative min-h-screen w-full select-none overflow-hidden">
      {/* Global Background Particles (except in Final Climax where it mounts its own) */}
      {currentStep !== "final_surprise" && <BackgroundEffects />}

      {/* Floating Audio Controls */}
      {currentStep !== "card" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-6 right-6 z-50 pr-safe pt-safe"
        >
          <button
            onClick={handleToggleMute}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-rose-300 hover:text-white hover:bg-rose-500/10 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </motion.div>
      )}

      {/* Story Sections Scene Orchestration */}
      <AnimatePresence mode="wait">
        {currentStep === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <CardSection onOpen={handleOpenCard} />
          </motion.div>
        )}

        {currentStep === "opening" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0"
          >
            <EnvelopeOpening onComplete={handleOpeningComplete} />
          </motion.div>
        )}

        {currentStep === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <LoveLetter onComplete={handleLetterComplete} />
          </motion.div>
        )}

        {currentStep === "memories_intro" && (
          <motion.div
            key="memories_intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <MemoriesIntro onComplete={handleMemoriesIntroComplete} />
          </motion.div>
        )}

        {currentStep === "slideshow" && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <CinematicSlideshow onComplete={handleSlideshowComplete} />
          </motion.div>
        )}

        {currentStep === "polaroids" && (
          <motion.div
            key="polaroids"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <PolaroidsSection onComplete={handlePolaroidsComplete} />
          </motion.div>
        )}

        {currentStep === "counter" && (
          <motion.div
            key="counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <LoveCounter onGiftOpen={handleGiftOpened} />
          </motion.div>
        )}

        {currentStep === "final_surprise" && (
          <motion.div
            key="final_surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <FinalSurprise />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
