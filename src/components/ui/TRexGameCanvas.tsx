"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, Gamepad2, ArrowUp, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// =============================================================================
// RETRO AUDIO SYNTHESIZER (Web Audio API - Zero External Dependencies)
// =============================================================================
class RetroSound {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  jump() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Audio fallback
    }
  }

  milestone() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const playChime = (freq: number, delay: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.2);
      };
      playChime(587.33, 0); // D5
      playChime(880.0, 0.1); // A5
    } catch {
      // Audio fallback
    }
  }

  die() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Audio fallback
    }
  }
}

// =============================================================================
// PIXEL SPRITE MATRICES (Authentic Chrome Dino 1-bit Pixel Art)
// =============================================================================
// Dino standing / running body base (33 rows)
const DINO_BODY = [
  "......................11111111",
  ".....................111111111",
  ".....................111111111",
  ".....................111111111",
  ".....................111.11111",
  ".....................111111111",
  ".....................111111...",
  ".....................111111111",
  ".....................11111....",
  "....................111111....",
  "1..................11111111...",
  "11................1111111.....",
  "111..............111111111....",
  "1111...........11111111111....",
  "11111.........111111111111....",
  "111111.......1111111111111....",
  "1111111.....11111111111111....",
  "11111111...111111111111111....",
  "111111111.1111111111111111....",
  "11111111111111111111111111....",
  "11111111111111111111111111....",
  "11111111111111111111111111....",
  "11111111111111111111111111....",
  ".1111111111111111111111111....",
  "..111111111111111111111111....",
  "...11111111111111111111111....",
  "....1111111111111111111111....",
  ".....11111111111111111111.....",
  "......111111111111111111......",
  ".......1111111111111111.......",
  "........11111111111111........",
  ".........11111111111..........",
  "..........11111111............",
];

// Legs: Stand (5 rows) - Total Dino Height = 33 + 5 = 38 rows
const LEGS_STAND = [
  "...........11....11...........",
  "...........11....11...........",
  "...........11....11...........",
  "...........11....11...........",
  "...........111...111..........",
];

// Legs: Run 1 (left leg down, right leg lifted)
const LEGS_RUN_1 = [
  "...........1111...11..........",
  "...........11.....11..........",
  "...........11.....11..........",
  "...........11.....11..........",
  "...........111................",
];

// Legs: Run 2 (right leg down, left leg lifted)
const LEGS_RUN_2 = [
  "...........11...1111..........",
  "...........11.....11..........",
  "...........11.....11..........",
  "...........11.....11..........",
  "..................111.........",
];

// Ducking Dino Body (23 rows)
const DINO_DUCK_1 = [
  "..................................11111111111",
  ".................................111111111111",
  ".................................111111111111",
  ".................................111.11111111",
  ".................................111111111111",
  ".................................111111.......",
  ".................................1111111111..",
  "...................11111111111111111111......",
  "11...............111111111111111111111.......",
  "1111...........11111111111111111111111.......",
  "111111.......111111111111111111111111........",
  "11111111111111111111111111111111111..........",
  ".11111111111111111111111111111111............",
  "..111111111111111111111111111111.............",
  "...1111111111111111111111111111..............",
  "....11111111111111111111111111...............",
  ".....111111111111111111111111................",
  "......1111111111111111111111.................",
  "........111111111111111111...................",
  "..........1111....1111.......................",
  "..........1111....1111.......................",
  "..........1111....1111.......................",
  "..........11111...11111......................",
];

const DINO_DUCK_2 = [
  "..................................11111111111",
  ".................................111111111111",
  ".................................111111111111",
  ".................................111.11111111",
  ".................................111111111111",
  ".................................111111.......",
  ".................................1111111111..",
  "...................11111111111111111111......",
  "11...............111111111111111111111.......",
  "1111...........11111111111111111111111.......",
  "111111.......111111111111111111111111........",
  "11111111111111111111111111111111111..........",
  ".11111111111111111111111111111111............",
  "..111111111111111111111111111111.............",
  "...1111111111111111111111111111..............",
  "....11111111111111111111111111...............",
  ".....111111111111111111111111................",
  "......1111111111111111111111.................",
  "........111111111111111111...................",
  "...........1111....1111......................",
  "...........1111....1111......................",
  "...........1111....1111......................",
  "...........11111...11111.....................",
];

// Small Cactus (20 rows)
const CACTUS_SMALL = [
  ".....111.....",
  ".....111.....",
  ".11..111.....",
  ".11..111..11.",
  ".11..111..11.",
  ".11..111..11.",
  ".11111111111.",
  "..111111111..",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
  ".....111.....",
];

// Large Cactus (25 rows)
const CACTUS_LARGE = [
  ".......1111.......",
  ".......1111.......",
  ".111...1111.......",
  ".111...1111...111.",
  ".111...1111...111.",
  ".111...1111...111.",
  ".111...1111...111.",
  ".111...1111...111.",
  ".1111111111111111.",
  "..11111111111111..",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
  ".......1111.......",
];

// Pterodactyl Wing Up (21 rows)
const BIRD_1 = [
  ".....................11.......",
  "....................1111......",
  "....................11111.....",
  "....................111111....",
  "...................1111111....",
  "...................11111111...",
  "..................111111111...",
  "....11............1111111111..",
  "...111...........11111111111..",
  "..11111.........111111111111..",
  ".1111111.......111111111111...",
  "111111111.....11111111111.....",
  "1111111111...1111111111.......",
  ".1111111111111111111111111111.",
  "..1111111111111111111111111111",
  "...111111111111111111111111111",
  "....111111111111111111111111..",
  ".....1111111111111111.........",
  "......111111111...............",
  ".......111111.................",
  "........111...................",
];

// Pterodactyl Wing Down (20 rows)
const BIRD_2 = [
  "...................1111111111111111",
  "..................11111111111111111",
  ".................111111111111111111",
  "....11..........1111111111111111...",
  "...111.........111111111111........",
  "..11111.......111111111111.........",
  ".1111111.....111111111111..........",
  "111111111...111111111111...........",
  "1111111111.1111111111111...........",
  ".11111111111111111111111...........",
  "..111111111111111111111............",
  "...1111111111111111111.............",
  "....11111111111111111..............",
  ".....111111111111111...............",
  "......1111111111111................",
  ".......11111111111.................",
  "........111111111..................",
  ".........1111111...................",
  "..........11111....................",
  "...........111.....................",
];

// Draw Pixel Matrix Helper
function drawPixelMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: string[],
  x: number,
  y: number,
  pixelSize: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "1") {
        ctx.fillRect(
          Math.floor(x + c * pixelSize),
          Math.floor(y + r * pixelSize),
          Math.ceil(pixelSize),
          Math.ceil(pixelSize)
        );
      }
    }
  }
}

// =============================================================================
// TYPES
// =============================================================================
interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "cactus_small" | "cactus_double" | "cactus_large" | "bird";
  birdFrame?: number;
  birdYLevel?: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  width: number;
}

export interface TRexGameCanvasProps {
  onSwitchToBeam?: () => void;
}

export const TRexGameCanvas: React.FC<TRexGameCanvasProps> = ({ onSwitchToBeam }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef(new RetroSound());

  // Game UI States
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "GAMEOVER">("IDLE");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio Toggle
  const toggleMute = useCallback(() => {
    soundRef.current.isMuted = !soundRef.current.isMuted;
    setIsMuted(soundRef.current.isMuted);
  }, []);

  // Sync high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("trex_portfolio_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Core Game Loop State Ref (60fps engine)
  const engineRef = useRef({
    state: "IDLE" as "IDLE" | "PLAYING" | "GAMEOVER",
    width: 600,
    height: 240,
    groundY: 195,
    speed: 6.5,
    baseSpeed: 6.5,
    maxSpeed: 13.5,
    score: 0,
    highScore: 0,
    frame: 0,
    pixelScale: 1.5,

    // Dino Physics
    dino: {
      x: 45,
      y: 0,
      baseY: 0,
      vy: 0,
      gravity: 0.58,
      jumpVelocity: -10.5,
      isGrounded: true,
      isDucking: false,
      runAnimFrame: 0,
      animTimer: 0,
      spriteHeight: 38,
    },

    // Obstacles & Horizon
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    nextObstacleDistance: 240,
    groundPebbles: [] as { x: number; y: number; length: number }[],
    milestoneFlash: 0,
  });

  // Action: Jump
  const handleJump = useCallback(() => {
    const engine = engineRef.current;
    if (engine.state === "IDLE") {
      engine.state = "PLAYING";
      engine.score = 0;
      engine.speed = engine.baseSpeed;
      engine.obstacles = [];
      setGameState("PLAYING");
      soundRef.current.jump();
      return;
    }

    if (engine.state === "GAMEOVER") {
      // Restart game
      engine.state = "PLAYING";
      engine.score = 0;
      engine.speed = engine.baseSpeed;
      engine.obstacles = [];
      engine.dino.y = engine.dino.baseY;
      engine.dino.vy = 0;
      engine.dino.isGrounded = true;
      engine.dino.isDucking = false;
      setGameState("PLAYING");
      soundRef.current.jump();
      return;
    }

    if (engine.dino.isGrounded) {
      engine.dino.vy = engine.dino.jumpVelocity;
      engine.dino.isGrounded = false;
      soundRef.current.jump();
    }
  }, []);

  // Action: Short Hop on early key release
  const handleJumpRelease = useCallback(() => {
    const engine = engineRef.current;
    if (!engine.dino.isGrounded && engine.dino.vy < -4.0) {
      engine.dino.vy = -4.0;
    }
  }, []);

  // Action: Duck
  const handleDuck = useCallback((isDucking: boolean) => {
    const engine = engineRef.current;
    if (engine.state !== "PLAYING") return;
    engine.dino.isDucking = isDucking;
    // Fast drop if ducking while in the air
    if (isDucking && !engine.dino.isGrounded) {
      engine.dino.vy += 4.5;
    }
  }, []);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["Space", "ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(e.code) &&
        containerRef.current &&
        containerRef.current.contains(document.activeElement)
      ) {
        e.preventDefault();
      }

      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        handleJump();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        handleDuck(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        handleJumpRelease();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        handleDuck(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleJump, handleJumpRelease, handleDuck]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const updateSize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      const engine = engineRef.current;
      engine.width = w;
      engine.height = h;
      engine.groundY = Math.round(h * 0.78);
      engine.dino.baseY = engine.groundY - engine.dino.spriteHeight * engine.pixelScale;

      if (engine.dino.isGrounded) {
        engine.dino.y = engine.dino.baseY;
      }

      // Initialize clouds if empty
      if (engine.clouds.length === 0) {
        for (let i = 0; i < 4; i++) {
          engine.clouds.push({
            x: Math.random() * w,
            y: 20 + Math.random() * (engine.groundY * 0.45),
            speed: 0.35 + Math.random() * 0.4,
            width: 45 + Math.random() * 25,
          });
        }
      }

      // Initialize ground pebbles
      if (engine.groundPebbles.length === 0) {
        for (let i = 0; i < 35; i++) {
          engine.groundPebbles.push({
            x: Math.random() * w * 2,
            y: engine.groundY + 3 + Math.random() * 20,
            length: 2 + Math.random() * 6,
          });
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // 60 FPS Loop
    const loop = () => {
      const engine = engineRef.current;
      const { width, height, groundY, pixelScale } = engine;

      engine.frame++;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Milestone flash effect (every 100 points)
      if (engine.milestoneFlash > 0) {
        engine.milestoneFlash--;
        ctx.fillStyle = "rgba(246, 183, 122, 0.18)";
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------------------
      // 1. CLOUDS (Parallax Background)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#FFD6BF";
      engine.clouds.forEach((cloud) => {
        if (engine.state === "PLAYING") {
          cloud.x -= cloud.speed;
          if (cloud.x + cloud.width < -10) {
            cloud.x = width + Math.random() * 80;
            cloud.y = 18 + Math.random() * (groundY * 0.45);
          }
        }
        ctx.beginPath();
        ctx.arc(cloud.x + 12, cloud.y + 8, 9, 0, Math.PI * 2);
        ctx.arc(cloud.x + 24, cloud.y + 4, 13, 0, Math.PI * 2);
        ctx.arc(cloud.x + 36, cloud.y + 8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cloud.x + 4, cloud.y + 8, cloud.width * 0.7, 7);
      });

      // -----------------------------------------------------------------------
      // 2. HORIZON GROUND LINE & PROCEDURAL PEBBLES
      // -----------------------------------------------------------------------
      ctx.strokeStyle = "#A9C7A5";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      ctx.fillStyle = "#77776D";
      engine.groundPebbles.forEach((peb) => {
        if (engine.state === "PLAYING") {
          peb.x -= engine.speed;
          if (peb.x < -10) {
            peb.x = width + Math.random() * 50;
            peb.y = groundY + 3 + Math.random() * 20;
          }
        }
        ctx.fillRect(peb.x, peb.y, peb.length, 1.2);
      });

      // -----------------------------------------------------------------------
      // 3. DINO PHYSICS & ANIMATION
      // -----------------------------------------------------------------------
      const dino = engine.dino;

      if (engine.state === "PLAYING") {
        if (!dino.isGrounded) {
          dino.vy += dino.gravity;
          dino.y += dino.vy;

          if (dino.y >= dino.baseY) {
            dino.y = dino.baseY;
            dino.vy = 0;
            dino.isGrounded = true;
          }
        }

        dino.animTimer++;
        if (dino.animTimer % 5 === 0) {
          dino.runAnimFrame = (dino.runAnimFrame + 1) % 2;
        }

        engine.score += 0.15;
        const currentScore = Math.floor(engine.score);

        if (currentScore > 0 && currentScore % 100 === 0 && engine.milestoneFlash === 0) {
          soundRef.current.milestone();
          engine.milestoneFlash = 12;
        }

        if (engine.speed < engine.maxSpeed) {
          engine.speed += 0.0012;
        }

        if (currentScore > engine.highScore) {
          engine.highScore = currentScore;
          try {
            localStorage.setItem("trex_portfolio_highscore", currentScore.toString());
          } catch {
            // LocalStorage fallback
          }
        }

        if (engine.frame % 4 === 0) {
          setScore(currentScore);
          setHighScore(engine.highScore);
        }
      }

      // Draw Dino Sprite
      const dinoColor = "#343A32";

      if (engine.state === "GAMEOVER") {
        drawPixelMatrix(ctx, DINO_BODY, dino.x, dino.y, pixelScale, dinoColor);
        drawPixelMatrix(ctx, LEGS_STAND, dino.x, dino.y + 33 * pixelScale, pixelScale, dinoColor);
        ctx.fillStyle = "#F28B82";
        ctx.fillRect(dino.x + 23 * pixelScale, dino.y + 4 * pixelScale, 3 * pixelScale, 3 * pixelScale);
      } else if (dino.isDucking && dino.isGrounded) {
        const duckMatrix = dino.runAnimFrame === 0 ? DINO_DUCK_1 : DINO_DUCK_2;
        const duckY = groundY - 23 * pixelScale;
        drawPixelMatrix(ctx, duckMatrix, dino.x, duckY, pixelScale, dinoColor);
      } else if (!dino.isGrounded) {
        drawPixelMatrix(ctx, DINO_BODY, dino.x, dino.y, pixelScale, dinoColor);
        drawPixelMatrix(ctx, LEGS_STAND, dino.x, dino.y + 33 * pixelScale, pixelScale, dinoColor);
      } else if (engine.state === "PLAYING") {
        drawPixelMatrix(ctx, DINO_BODY, dino.x, dino.y, pixelScale, dinoColor);
        const legMatrix = dino.runAnimFrame === 0 ? LEGS_RUN_1 : LEGS_RUN_2;
        drawPixelMatrix(ctx, legMatrix, dino.x, dino.y + 33 * pixelScale, pixelScale, dinoColor);
      } else {
        drawPixelMatrix(ctx, DINO_BODY, dino.x, dino.y, pixelScale, dinoColor);
        drawPixelMatrix(ctx, LEGS_STAND, dino.x, dino.y + 33 * pixelScale, pixelScale, dinoColor);
      }

      // -----------------------------------------------------------------------
      // 4. OBSTACLES: SPAWNING, MOVEMENT & COLLISION
      // -----------------------------------------------------------------------
      if (engine.state === "PLAYING") {
        engine.nextObstacleDistance -= engine.speed;

        if (engine.nextObstacleDistance <= 0) {
          const types: Obstacle["type"][] = ["cactus_small", "cactus_double", "cactus_large"];
          if (engine.score > 150 && Math.random() > 0.4) {
            types.push("bird");
          }

          const chosenType = types[Math.floor(Math.random() * types.length)];
          let obsWidth = 20;
          let obsHeight = 35;
          let obsY = groundY - obsHeight * pixelScale;
          let birdLevel = 0;

          if (chosenType === "cactus_small") {
            obsWidth = 13;
            obsHeight = 20;
            obsY = groundY - 20 * pixelScale;
          } else if (chosenType === "cactus_double") {
            obsWidth = 28;
            obsHeight = 20;
            obsY = groundY - 20 * pixelScale;
          } else if (chosenType === "cactus_large") {
            obsWidth = 18;
            obsHeight = 25;
            obsY = groundY - 25 * pixelScale;
          } else if (chosenType === "bird") {
            obsWidth = 28;
            obsHeight = 20;
            birdLevel = Math.floor(Math.random() * 3);
            if (birdLevel === 0) {
              obsY = groundY - 28 * pixelScale;
            } else if (birdLevel === 1) {
              obsY = groundY - 46 * pixelScale;
            } else {
              obsY = groundY - 65 * pixelScale;
            }
          }

          engine.obstacles.push({
            x: width + 20,
            y: obsY,
            width: obsWidth * pixelScale,
            height: obsHeight * pixelScale,
            type: chosenType,
            birdFrame: 0,
            birdYLevel: birdLevel,
          });

          const minGap = 210 + engine.speed * 12;
          const randomGap = Math.random() * 190;
          engine.nextObstacleDistance = minGap + randomGap;
        }
      }

      // Draw & Collision
      const cactusColor = "#4E6E49";
      const birdColor = "#D96B60";

      const isDucking = dino.isDucking && dino.isGrounded;
      const dinoBox = {
        x: dino.x + 4 * pixelScale,
        y: isDucking ? groundY - 20 * pixelScale : dino.y + 2 * pixelScale,
        width: (isDucking ? 44 : 24) * pixelScale,
        height: (isDucking ? 18 : 34) * pixelScale,
      };

      for (let i = engine.obstacles.length - 1; i >= 0; i--) {
        const obs = engine.obstacles[i];

        if (engine.state === "PLAYING") {
          obs.x -= engine.speed;
        }

        if (obs.type === "cactus_small") {
          drawPixelMatrix(ctx, CACTUS_SMALL, obs.x, obs.y, pixelScale, cactusColor);
        } else if (obs.type === "cactus_double") {
          drawPixelMatrix(ctx, CACTUS_SMALL, obs.x, obs.y, pixelScale, cactusColor);
          drawPixelMatrix(ctx, CACTUS_SMALL, obs.x + 15 * pixelScale, obs.y, pixelScale, cactusColor);
        } else if (obs.type === "cactus_large") {
          drawPixelMatrix(ctx, CACTUS_LARGE, obs.x, obs.y, pixelScale, cactusColor);
        } else if (obs.type === "bird") {
          if (engine.frame % 8 === 0) {
            obs.birdFrame = obs.birdFrame === 0 ? 1 : 0;
          }
          const birdMatrix = obs.birdFrame === 0 ? BIRD_1 : BIRD_2;
          drawPixelMatrix(ctx, birdMatrix, obs.x, obs.y, pixelScale, birdColor);
        }

        if (engine.state === "PLAYING") {
          const padding = 4;
          const hit =
            dinoBox.x + padding < obs.x + obs.width - padding &&
            dinoBox.x + dinoBox.width - padding > obs.x + padding &&
            dinoBox.y + padding < obs.y + obs.height - padding &&
            dinoBox.y + dinoBox.height - padding > obs.y + padding;

          if (hit) {
            engine.state = "GAMEOVER";
            setGameState("GAMEOVER");
            soundRef.current.die();
            setScore(Math.floor(engine.score));
            if (Math.floor(engine.score) > engine.highScore) {
              setHighScore(Math.floor(engine.score));
            }
          }
        }

        if (obs.x + obs.width < -40) {
          engine.obstacles.splice(i, 1);
        }
      }

      // -----------------------------------------------------------------------
      // 5. BANNER OVERLAYS
      // -----------------------------------------------------------------------
      if (engine.state === "IDLE") {
        ctx.fillStyle = "rgba(52, 58, 50, 0.9)";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE OR CLICK TO START", width / 2, groundY * 0.44);
        ctx.font = "11px monospace";
        ctx.fillStyle = "#77776D";
        ctx.fillText("SPACE / ↑ : JUMP   •   ↓ : DUCK", width / 2, groundY * 0.44 + 20);
      } else if (engine.state === "GAMEOVER") {
        ctx.fillStyle = "#D96B60";
        ctx.font = "900 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText("G A M E   O V E R", width / 2, groundY * 0.38);

        ctx.fillStyle = "#343A32";
        ctx.font = "bold 12px monospace";
        ctx.fillText("PRESS SPACE OR TAP TO RETRY", width / 2, groundY * 0.38 + 24);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <GlassCard
      variant="liquid"
      className="p-5 sm:p-7 relative overflow-hidden group border-[#A9C7A5]/35 select-none shadow-xl bg-white/95"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 z-20 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F28B82]/20 text-[#D96B60] flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#343A32] flex items-center gap-1.5">
              <span>Chrome T-Rex Runner</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9C7A5] animate-ping" />
            </div>
            <div className="text-[10px] text-[#77776D] font-mono font-medium">
              Retro Pixel Arcade Mini-Game
            </div>
          </div>
        </div>

        {/* Live Score Display & Sound Control */}
        <div className="flex items-center gap-2.5">
          {/* Arcade Score Ticker */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF5] border border-[#FFD6BF] text-xs font-mono font-bold shadow-xs">
            {highScore > 0 && (
              <span className="text-[#77776D] flex items-center gap-1">
                <Trophy className="w-3 h-3 text-[#F6B77A]" />
                HI {highScore.toString().padStart(5, "0")}
              </span>
            )}
            <span className="text-[#343A32] tracking-wider font-extrabold">
              {score.toString().padStart(5, "0")}
            </span>
          </div>

          {/* Sound Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg bg-[#FFF4DF] hover:bg-[#FFEBE0] border border-[#FFD6BF] text-[#77776D] hover:text-[#343A32] transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute game audio" : "Mute game audio"}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#F28B82]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#A9C7A5]" />
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Arena */}
      <div
        ref={containerRef}
        tabIndex={0}
        onClick={handleJump}
        className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-b from-[#FFFDF5] via-[#FFF4DF]/70 to-[#FFEBE0]/50 border border-[#FFD6BF] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A9C7A5]/60 group"
        data-cursor="PLAY"
      >
        {/* The 60fps HTML5 Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

        {/* Mobile On-Screen Action Controls */}
        <div className="sm:hidden absolute bottom-3 right-3 flex items-center gap-2 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDuck(true);
              setTimeout(() => handleDuck(false), 500);
            }}
            className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-[#A9C7A5]/50 text-[#343A32] active:scale-95 shadow-md flex items-center justify-center font-bold"
            aria-label="Duck"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleJump();
            }}
            className="p-2.5 rounded-xl bg-[#F6B77A]/90 text-white active:scale-95 shadow-md flex items-center justify-center font-bold"
            aria-label="Jump"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* State Badge (Corner) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/85 backdrop-blur-md border border-[#A9C7A5]/40 text-[10px] font-mono text-[#343A32] font-semibold flex items-center gap-1.5 pointer-events-none transition-opacity duration-300 shadow-xs">
          {gameState === "PLAYING" ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9C7A5] animate-ping" />
              <span>RUNNING • SPACE / TAP TO JUMP</span>
            </>
          ) : gameState === "GAMEOVER" ? (
            <>
              <RotateCcw className="w-3 h-3 text-[#F28B82]" />
              <span>CRASHED • TAP TO REPLAY</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#F6B77A]" />
              <span>READY • TAP TO PLAY</span>
            </>
          )}
        </div>
      </div>

      {/* Footer Info & Instructions Strip */}
      <div className="mt-3 pt-2.5 border-t border-[#A9C7A5]/25 flex items-center justify-between text-[11px] text-[#77776D] font-mono font-medium">
        <span className="hidden sm:inline">CONTROLS: [SPACE / ↑] JUMP • [↓] DUCK • TAP ON MOBILE</span>
        <span className="sm:hidden">TAP CANVAS TO JUMP</span>
        <span className="text-[#E27D60] font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F6B77A]" />
          <span>WEB AUDIO + 60 FPS ENGINE</span>
        </span>
      </div>
    </GlassCard>
  );
};
