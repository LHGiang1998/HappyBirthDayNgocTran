"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundEffectsProps {
  intensity?: "normal" | "high"; // high intensity for the climax
}

export default function BackgroundEffects({ intensity = "normal" }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Classes
    class TwinkleStar {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      alpha: number = 0;
      speed: number = 0;
      maxAlpha: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = 0;
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.maxAlpha = Math.random() * 0.7 + 0.3;
        this.speed = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.alpha += this.speed;
        if (this.alpha > this.maxAlpha || this.alpha < 0.1) {
          this.speed = -this.speed;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    class FloatingHeart {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      alpha: number = 0;
      rotation: number = 0;
      rotSpeed: number = 0;
      color: string = "";

      constructor(spawnFullY: boolean = false) {
        this.reset(spawnFullY);
      }

      reset(spawnFullY: boolean = false) {
        this.x = Math.random() * width;
        this.y = spawnFullY ? Math.random() * height : height + 20;
        this.size = Math.random() * 12 + 6;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.01;
        
        // Soft red/pink/rose colors
        const colors = [
          "rgba(244, 63, 94,",  // rose-500
          "rgba(236, 72, 153,", // pink-500
          "rgba(217, 70, 239,", // fuchsia-500
          "rgba(251, 113, 133," // rose-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        
        // Fade out as it reaches the top 20%
        if (this.y < height * 0.2) {
          this.alpha -= 0.005;
        }

        if (this.y < -20 || this.alpha <= 0) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.fillStyle = `${this.color}${this.alpha})`;
        
        // Draw Heart Path
        c.beginPath();
        const d = this.size;
        c.moveTo(0, -d / 4);
        c.bezierCurveTo(d / 2, -d, d, -d / 3, 0, d);
        c.bezierCurveTo(-d, -d / 3, -d / 2, -d, 0, -d / 4);
        c.closePath();
        c.fill();
        c.restore();
      }
    }

    // Initialize arrays
    const numStars = Math.min(Math.floor(width / 8), 120);
    const stars: TwinkleStar[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(new TwinkleStar());
    }

    const numHearts = intensity === "high" ? 40 : 15;
    const hearts: FloatingHeart[] = [];
    for (let i = 0; i < numHearts; i++) {
      // Initially spawn hearts spread throughout the height so it looks natural immediately
      hearts.push(new FloatingHeart(true));
    }

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Clear with dynamic glowing backdrop
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, width, height);

      // Create subtle dark gradient overlay for deep cinematic feel
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      grad.addColorStop(0, "rgba(22, 10, 48, 0.4)");  // Deep violet glow
      grad.addColorStop(1, "rgba(3, 0, 20, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Stars
      for (const star of stars) {
        star.update();
        star.draw(ctx);
      }

      // Update & Draw Hearts
      for (const heart of hearts) {
        heart.update();
        heart.draw(ctx);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
