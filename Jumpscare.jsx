import React from "react";
import { motion } from "framer-motion";
import { ANIMATRONIC_IMAGES } from "@/lib/gameData";

export default function Jumpscare({ animatronic }) {
  if (!animatronic) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Flashbang white burst */}
      <motion.div
        className="absolute inset-0 bg-white z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 0.8, 0, 0.3, 0] }}
        transition={{ duration: 0.5, times: [0, 0.05, 0.1, 0.15, 0.2, 0.4] }}
      />

      {/* Glitch RGB split slices */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: [0.9, 0.4, 0.7, 0] }}
        transition={{ duration: 0.6, times: [0, 0.2, 0.4, 1] }}
      >
        <div
          className="absolute inset-0 bg-cyan-500/40"
          style={{ transform: "translateX(-12px)", clipPath: "inset(20% 0 60% 0)" }}
        />
        <div
          className="absolute inset-0 bg-red-500/40"
          style={{ transform: "translateX(12px)", clipPath: "inset(60% 0 20% 0)" }}
        />
      </motion.div>

      {/* Violent shaking animatronic */}
      <motion.img
        src={ANIMATRONIC_IMAGES[animatronic]}
        alt={animatronic}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(1.6) contrast(2.2) saturate(0.4)" }}
        initial={{ scale: 4, rotate: -15, opacity: 0 }}
        animate={{
          scale: [4, 1.3, 1.6, 1.1, 1.4, 1],
          rotate: [-15, 8, -8, 5, -3, 0],
          x: [0, -30, 30, -25, 20, -10, 0],
          y: [0, -15, 15, -10, 8, 0],
          opacity: [0, 1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          times: [0, 0.15, 0.3, 0.5, 0.7, 1],
        }}
      />

      {/* Static noise burst */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-40"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.2, 0.4, 0] }}
        transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1] }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Red blood flash */}
      <motion.div
        className="absolute inset-0 bg-red-700 mix-blend-multiply z-20 pointer-events-none"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: [0.9, 0, 0.6, 0.3, 0] }}
        transition={{ duration: 0.7, times: [0, 0.2, 0.4, 0.6, 1] }}
      />

      {/* Vignette pulse */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.95)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.4, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </motion.div>
  );
}
