import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ANIMATRONIC_IMAGES } from "@/lib/gameData";

const LOADING_MESSAGES = [
  "CALIBRATING CAMERAS...",
  "BOOTING SECURITY SYSTEM...",
  "CHECKING DOOR MECHANISMS...",
  "POWERING UP GENERATOR...",
  "LOCATING ANIMATRONICS...",
  "SYNCING NIGHT SHIFT...",
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 900);
    const progTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 4, 95));
    }, 120);
    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Static noise */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        {/* Flickering eyes */}
        <motion.div
          className="flex gap-6"
          animate={{ opacity: [1, 0.2, 1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
          <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_8px_rgba(239,68,68,0.6)]" />
          <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_8px_rgba(239,68,68,0.6)]" />
        </motion.div>

        {/* Faded animatronic silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.15, 0.05, 0.15], scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.6, 1] }}
          className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={ANIMATRONIC_IMAGES.freddy}
            alt=""
            className="w-64 h-80 object-cover"
            style={{ filter: "brightness(0.2) contrast(2) saturate(0)" }}
          />
        </motion.div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tighter">
            FIVE NIGHTS
          </h1>
          <p className="text-sm text-gray-500 font-mono tracking-widest">
            AT FREDDY'S
          </p>
        </div>

        {/* Loading message */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs text-green-400 tracking-wider min-h-[16px]"
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-[10px] text-gray-600">
          {progress}%
        </span>
      </div>
    </div>
  );
}
