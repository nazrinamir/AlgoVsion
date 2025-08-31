"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Particles, StatusRow } from "./helper/loadEntryHelper";

/**
 * GameEntryLoader – a full‑screen, game‑style entry/loading animation.
 *
 * Props:
 * - title?: string          // Main title text (e.g., your game/app name)
 * - subtitle?: string       // Small caption under the title
 * - durationMs?: number     // How long to simulate loading until 100%D  
 * - onComplete?: () => void // Called when loading hits 100%
 */
export default function GameEntryLoader({
  title = "NEON PROTOCOL",
  subtitle = "initializing runtime · compiling shaders · syncing assets",
  durationMs = 3200,
  onComplete,
}: {
  title?: string;
  subtitle?: string;
  durationMs?: number;
  onComplete?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "loaded">("boot");
  const startRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [tip, setTip] = useState("");

  const tips = useMemo(
    () => [
      "Tip: Press ␣ to step animations (dev mode)",
      "Pro: Lower effects in settings for smoother FPS",
      "Hint: Sorting × Searching = Power moves",
      "FYI: Assets cached for offline start",
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [tips]);

  useEffect(() => {
    let raf: number;
    const step = (now: number) => {
      if (startRef.current == null) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setPhase("loaded");
        const t = setTimeout(() => onComplete?.(), 600);
        return () => clearTimeout(t);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] grid place-items-center bg-black overflow-hidden ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      {/* Vignette + scanlines overlays */}
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 70%)",
      }} />
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "100% 3px",
        animation: "scan 3.5s linear infinite",
      }} />

      {/* Particles */}
      {mounted && <Particles count={60} />}

      <div className="relative w-full max-w-3xl p-8 text-center">
        {/* Glitch Title */}
        <h1 className="relative select-none text-4xl md:text-6xl font-extrabold tracking-[0.15em] text-white">
          <span className="glitch" data-text={title}>{title}</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-neutral-400 tracking-wide">{subtitle}</p>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
            <span>BOOT SEQ</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Status rows */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
          <StatusRow label="GPU" value="Shaders" ok={progress > 20} />
          <StatusRow label="NET" value="Auth" ok={progress > 40} />
          <StatusRow label="FS" value="Assets" ok={progress > 60} />
        </div>

        {/* Press to start */}
        <div className={`mt-10 text-neutral-300 ${phase === "loaded" ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <span className="animate-pulse">Press any key to continue</span>
        </div>

        {/* Tip */}
        <p className="mt-4 text-[11px] text-neutral-500">{tip}</p>
      </div>

      {/* Local CSS for glitch + scanlines */}
      <style jsx>{`
        @keyframes glitchTop {
          0% { clip-path: inset(0 0 85% 0); transform: translate(-2px, -2px); filter: hue-rotate(0deg); }
          50% { clip-path: inset(0 0 80% 0); transform: translate(2px, 2px); filter: hue-rotate(20deg); }
          100% { clip-path: inset(0 0 85% 0); transform: translate(0, 0); }
        }
        @keyframes glitchBottom {
          0% { clip-path: inset(85% 0 0 0); transform: translate(2px, -1px); }
          50% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 1px); }
          100% { clip-path: inset(85% 0 0 0); transform: translate(0, 0); }
        }
        @keyframes scan { 0% { background-position-y: 0; } 100% { background-position-y: 100%; } }
        .glitch {
          position: relative;
          display: inline-block;
          text-shadow: 0 0 8px rgba(99, 102, 241, 0.6);
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          color: #a5b4fc;
          overflow: hidden;
          mix-blend-mode: screen;
          opacity: .7;
        }
        .glitch::before { animation: glitchTop 1.3s infinite linear alternate-reverse; }
        .glitch::after { animation: glitchBottom 1.1s infinite linear alternate-reverse; color: #67e8f9; }
      `}</style>
    </div>
  );
}


