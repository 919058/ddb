import React from "react";
import { motion } from "framer-motion";

export default function GameOverScreen({ won, night, onMenu, onRetry, onNextNight }) {
  return (
    <motion.div
      className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {won ? (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading">
              6 AM
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
            <p className="text-green-400 font-mono text-sm tracking-widest">
              YOU SURVIVED NIGHT {night}
            </p>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              onClick={onMenu}
              className="px-6 py-2 font-mono text-sm text-gray-400 border border-gray-700 rounded hover:border-gray-500 transition-all"
            >
              MENU
            </button>
            {night < 5 && (
              <button
                onClick={onNextNight}
                className="px-6 py-2 font-mono text-sm text-green-400 border border-green-700 rounded hover:border-green-500 hover:bg-green-900/20 transition-all"
              >
                NIGHT {night + 1} →
              </button>
            )}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-4xl sm:text-6xl font-bold text-red-600 font-heading">
              GAME OVER
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </motion.div>

          <motion.div
            className="flex gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={onMenu}
              className="px-6 py-2 font-mono text-sm text-gray-400 border border-gray-700 rounded hover:border-gray-500 transition-all"
            >
              MENU
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-2 font-mono text-sm text-red-400 border border-red-700 rounded hover:border-red-500 hover:bg-red-900/20 transition-all"
            >
              TRY AGAIN
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
