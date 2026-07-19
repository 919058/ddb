import React, { useState, useEffect } from "react";
import { ROOMS, ANIMATRONIC_IMAGES, MOVEMENT_PATHS } from "@/lib/gameData";

const ROOM_BACKGROUNDS = {
  stage: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
  diningArea: "linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 50%, #0d0d1a 100%)",
  pirateCove: "linear-gradient(180deg, #1a0a1a 0%, #2d1a2d 50%, #1a0a1a 100%)",
  backstage: "linear-gradient(180deg, #0a0a0a 0%, #151525 50%, #0a0a0a 100%)",
  kitchen: "linear-gradient(180deg, #0a0d0a 0%, #1a2a1a 50%, #0a0d0a 100%)",
  westHall: "linear-gradient(180deg, #0d0a0a 0%, #1e1a1a 50%, #0d0a0a 100%)",
  eastHall: "linear-gradient(180deg, #0d0a0a 0%, #1e1a1a 50%, #0d0a0a 100%)",
  westCorner: "linear-gradient(180deg, #0a0a0a 0%, #1a1515 50%, #0a0a0a 100%)",
  eastCorner: "linear-gradient(180deg, #0a0a0a 0%, #1a1515 50%, #0a0a0a 100%)",
};

export default function CameraView({ selectedCamera, animatronics, onSelectCamera }) {
  const [staticLevel, setStaticLevel] = useState(0.5);

  useEffect(() => {
    setStaticLevel(1);
    const timer = setTimeout(() => setStaticLevel(0.15), 300);
    return () => clearTimeout(timer);
  }, [selectedCamera]);

  // Find which animatronics are in the selected room
  const animatronicsInRoom = Object.entries(animatronics)
    .filter(([name, pathIndex]) => {
      const room = MOVEMENT_PATHS[name][pathIndex];
      return room === selectedCamera;
    })
    .map(([name]) => name);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Camera feed */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: ROOM_BACKGROUNDS[selectedCamera] || "#000" }}
      >
        {/* Room name */}
        <div className="absolute top-3 left-3 text-green-400 font-mono text-sm z-10 tracking-wider">
          CAM {Object.keys(ROOMS).indexOf(selectedCamera) + 1} —{" "}
          {ROOMS[selectedCamera]?.name}
        </div>

        {/* Recording indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-mono text-xs">REC</span>
        </div>

        {/* Room decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-16 h-24 border border-gray-600 rounded" />
          <div className="absolute top-1/3 right-1/4 w-12 h-20 border border-gray-700 rounded" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-2 bg-gray-700 rounded" />
        </div>

        {/* Animatronics in this room */}
        {animatronicsInRoom.length > 0 ? (
          <div className="flex gap-4 items-end justify-center">
            {animatronicsInRoom.map((name) => (
              <div key={name} className="relative">
                <img
                  src={ANIMATRONIC_IMAGES[name]}
                  alt={name}
                  className="w-32 h-40 sm:w-48 sm:h-60 object-cover rounded opacity-80"
                  style={{
                    filter: "brightness(0.5) contrast(1.3) saturate(0.6)",
                  }}
                />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-green-400 font-mono text-xs uppercase">
                  {name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 font-mono text-sm italic">
            {selectedCamera === "kitchen" ? "[ AUDIO ONLY ]" : "[ EMPTY ]"}
          </div>
        )}
      </div>

      {/* CRT static overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `repeating-linear-gradient(0deg, rgba(0,255,0,0.03) 0px, transparent 1px, transparent 2px)`,
          opacity: staticLevel,
          transition: "opacity 0.3s",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: staticLevel * 0.5,
          mixBlendMode: "overlay",
        }}
      />

      {/* Camera selector map */}
      <div className="absolute bottom-0 right-0 w-48 sm:w-56 bg-black/80 border border-green-900/50 p-2 z-30">
        <div className="text-green-400 font-mono text-xs mb-2 text-center">
          CAMERA MAP
        </div>
        <div className="relative h-36">
          {Object.entries(ROOMS).map(([key, room]) => {
            if (key === "office") return null;
            const isSelected = selectedCamera === key;
            const hasAnimatronic = Object.entries(animatronics).some(
              ([name, idx]) => MOVEMENT_PATHS[name][idx] === key
            );
            return (
              <button
                key={key}
                onClick={() => onSelectCamera(key)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono rounded transition-all
                  ${isSelected ? "bg-green-500/30 text-green-300 border border-green-400" : "bg-gray-800/60 text-gray-500 border border-gray-700 hover:border-green-600 hover:text-green-400"}
                  ${hasAnimatronic ? "ring-1 ring-red-500/50" : ""}`}
                style={{ left: `${room.x}%`, top: `${room.y}%` }}
              >
                {room.name.length > 10 ? room.name.slice(0, 8) + ".." : room.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
