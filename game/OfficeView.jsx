import React from "react";
import { OFFICE_IMAGE, ANIMATRONIC_IMAGES, MOVEMENT_PATHS } from "@/lib/gameData";
import { Shield, Lightbulb } from "lucide-react";

export default function OfficeView({
  leftDoor,
  rightDoor,
  leftLight,
  rightLight,
  toggleLeftDoor,
  toggleRightDoor,
  toggleLeftLight,
  toggleRightLight,
  animatronics,
  power,
}) {
  // Check if animatronics are at the door
  const atLeftDoor = Object.entries(animatronics).some(([name, idx]) => {
    const room = MOVEMENT_PATHS[name][idx];
    return room === "westCorner" && (name === "bonnie" || name === "foxy");
  });

  const atRightDoor = Object.entries(animatronics).some(([name, idx]) => {
    const room = MOVEMENT_PATHS[name][idx];
    return room === "eastCorner" && (name === "chica" || name === "freddy");
  });

  // Which animatronic is at which door
  const leftDoorAnimatronic = Object.entries(animatronics).find(([name, idx]) => {
    const room = MOVEMENT_PATHS[name][idx];
    return room === "westCorner" && (name === "bonnie" || name === "foxy");
  });

  const rightDoorAnimatronic = Object.entries(animatronics).find(([name, idx]) => {
    const room = MOVEMENT_PATHS[name][idx];
    return room === "eastCorner" && (name === "chica" || name === "freddy");
  });

  const disabled = power <= 0;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Office background */}
      <div className="absolute inset-0">
        <img
          src={OFFICE_IMAGE}
          alt="Security Office"
          className="w-full h-full object-cover opacity-40"
          style={{ filter: "brightness(0.3) contrast(1.2)" }}
        />
      </div>

      {/* Office darkness overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black/80" />

      {/* Left door area */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 flex flex-col items-center justify-center gap-3 z-10">
        {/* Door visual */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            leftDoor
              ? "bg-gray-700/90 border-r-4 border-gray-600"
              : "bg-transparent"
          }`}
        >
          {leftDoor && (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-full bg-gray-600/50 border-r border-gray-500/30" />
              <div className="w-8 h-full bg-gray-700/50 border-r border-gray-500/20" />
            </div>
          )}
        </div>

        {/* Left light reveal */}
        {leftLight && atLeftDoor && !leftDoor && leftDoorAnimatronic && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-900/20 z-20">
            <img
              src={ANIMATRONIC_IMAGES[leftDoorAnimatronic[0]]}
              alt={leftDoorAnimatronic[0]}
              className="w-16 h-24 sm:w-20 sm:h-32 object-cover opacity-70"
              style={{ filter: "brightness(0.6) contrast(1.5)" }}
            />
          </div>
        )}

        {/* Left controls */}
        <div className="relative z-30 flex flex-col gap-2">
          <button
            onClick={toggleLeftDoor}
            disabled={disabled}
            className={`p-2 rounded transition-all ${
              leftDoor
                ? "bg-red-600/80 text-white shadow-red-500/30 shadow-lg"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
            } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Shield className="w-5 h-5" />
          </button>
          <button
            onClick={toggleLeftLight}
            disabled={disabled}
            className={`p-2 rounded transition-all ${
              leftLight
                ? "bg-yellow-500/80 text-black shadow-yellow-400/30 shadow-lg"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
            } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Lightbulb className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right door area */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 flex flex-col items-center justify-center gap-3 z-10">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            rightDoor
              ? "bg-gray-700/90 border-l-4 border-gray-600"
              : "bg-transparent"
          }`}
        >
          {rightDoor && (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-full bg-gray-700/50 border-l border-gray-500/20" />
              <div className="w-8 h-full bg-gray-600/50 border-l border-gray-500/30" />
            </div>
          )}
        </div>

        {rightLight && atRightDoor && !rightDoor && rightDoorAnimatronic && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-900/20 z-20">
            <img
              src={ANIMATRONIC_IMAGES[rightDoorAnimatronic[0]]}
              alt={rightDoorAnimatronic[0]}
              className="w-16 h-24 sm:w-20 sm:h-32 object-cover opacity-70"
              style={{ filter: "brightness(0.6) contrast(1.5)" }}
            />
          </div>
        )}

        <div className="relative z-30 flex flex-col gap-2">
          <button
            onClick={toggleRightDoor}
            disabled={disabled}
            className={`p-2 rounded transition-all ${
              rightDoor
                ? "bg-red-600/80 text-white shadow-red-500/30 shadow-lg"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
            } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Shield className="w-5 h-5" />
          </button>
          <button
            onClick={toggleRightLight}
            disabled={disabled}
            className={`p-2 rounded transition-all ${
              rightLight
                ? "bg-yellow-500/80 text-black shadow-yellow-400/30 shadow-lg"
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
            } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <Lightbulb className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center office area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-600 font-mono text-sm flex flex-col items-center gap-2">
          <div className="w-16 h-16 border border-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border border-gray-600 rounded animate-pulse" />
          </div>
          <span className="text-xs">OFFICE</span>
        </div>
      </div>

      {/* Power out darkness */}
      {power <= 0 && (
        <div className="absolute inset-0 bg-black z-40 flex items-center justify-center">
          <div className="text-red-500 font-mono text-2xl animate-pulse">
            POWER OUT
          </div>
        </div>
      )}
    </div>
  );
}
