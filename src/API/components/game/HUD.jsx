import React from "react";
import { Battery, Clock, Camera } from "lucide-react";

const HOUR_LABELS = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

export default function HUD({ power, hour, cameraOpen, night, toggleCamera, powerDisabled, infinitePower }) {
  const powerColor =
    power > 50 ? "text-green-400" : power > 25 ? "text-yellow-400" : "text-red-400";
  const powerBarColor =
    power > 50 ? "bg-green-500" : power > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3 sm:p-4 z-30 pointer-events-none">
        {/* Power */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Battery className={`w-4 h-4 ${powerColor}`} />
            <span className={`font-mono text-sm ${powerColor}`}>
              {Math.round(power)}%
            </span>
          </div>
          <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${powerBarColor} transition-all duration-500 rounded-full`}
              style={{ width: `${power}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-gray-500">POWER</span>
          {infinitePower && (
            <span className="font-mono text-[10px] text-cyan-400 bg-cyan-900/30 border border-cyan-700/50 rounded px-1.5 py-0.5 mt-1">
              ∞ CHEAT: INFINITE POWER
            </span>
          )}
        </div>

        {/* Night / Time */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-mono text-xs text-gray-500">NIGHT {night}</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-mono text-lg text-white font-bold tracking-wider">
              {HOUR_LABELS[hour] || "12 AM"}
            </span>
          </div>
        </div>
      </div>

      {/* Camera toggle button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={toggleCamera}
          disabled={powerDisabled}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all
            ${
              cameraOpen
                ? "bg-green-600/80 text-white shadow-green-500/20 shadow-lg border border-green-400/30"
                : "bg-gray-800/80 text-gray-300 border border-gray-600 hover:bg-gray-700/80 hover:border-gray-500"
            }
            ${powerDisabled ? "opacity-30 cursor-not-allowed" : ""}
          `}
        >
          <Camera className="w-4 h-4" />
          {cameraOpen ? "CLOSE CAMERAS" : "OPEN CAMERAS"}
        </button>
      </div>
    </>
  );
}
