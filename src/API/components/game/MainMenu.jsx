import React from "react";
import { motion } from "framer-motion";
import { ANIMATRONIC_IMAGES } from "@/lib/gameData";

export default function MainMenu({ onStartGame, maxNight }) {
  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Dark background with subtle animatronics */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={ANIMATRONIC_IMAGES.freddy}
          alt=""
          className="absolute right-0 bottom-0 w-64 h-80 object-cover"
          style={{ filter: "brightness(0.3) contrast(2)" }}
        />
      </div>

      {/* Flickering overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Title */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white font-heading tracking-tighter">
            FIVE NIGHTS
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 font-mono tracking-widest mt-1">
            AT FREDDY'S
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-4" />
        </div>

        {/* Stars for completed nights */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`w-3 h-3 rounded-full ${
                n <= maxNight - 1 ? "bg-yellow-400" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Night buttons */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((night) => (
            <button
              key={night}
              onClick={() => onStartGame(night)}
              disabled={night > maxNight}
              className={`px-8 py-3 font-mono text-sm tracking-wider rounded border transition-all
                ${
                  night <= maxNight
                    ? "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 hover:bg-red-900/10"
                    : "border-gray-800 text-gray-700 cursor-not-allowed"
                }
              `}
            >
              NIGHT {night}
            </button>
          ))}
        </div>

        <p className="text-gray-600 font-mono text-xs mt-4">
          Can you survive until 6 AM?
        </p>
      </motion.div>
    </div>
  );
}
