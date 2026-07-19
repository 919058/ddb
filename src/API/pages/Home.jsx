import React, { useState } from "react";
import useGameEngine from "@/lib/useGameEngine";
import MainMenu from "@/components/game/MainMenu";
import CameraView from "@/components/game/CameraView";
import OfficeView from "@/components/game/OfficeView";
import HUD from "@/components/game/HUD";
import Jumpscare from "@/components/game/Jumpscare";
import GameOverScreen from "@/components/game/GameOverScreen";

export default function Home() {
  const [maxNight, setMaxNight] = useState(1);
  const game = useGameEngine();

  const handleStartGame = (night) => {
    game.startGame(night);
  };

  const handleMenu = () => {
    game.setGameState("menu");
  };

  const handleRetry = () => {
    game.startGame(game.currentNight);
  };

  const handleNextNight = () => {
    const next = game.currentNight + 1;
    if (next > maxNight) setMaxNight(next);
    game.startGame(next);
  };

  // Track max night on win
  React.useEffect(() => {
    if (game.gameState === "won" && game.currentNight + 1 > maxNight) {
      setMaxNight(game.currentNight + 1);
    }
  }, [game.gameState, game.currentNight, maxNight]);

  return (
    <div className="fixed inset-0 bg-black select-none overflow-hidden">
      {/* Menu */}
      {game.gameState === "menu" && (
        <MainMenu onStartGame={handleStartGame} maxNight={maxNight} />
      )}

      {/* Game */}
      {game.gameState === "playing" && (
        <div className="relative w-full h-full">
          {/* Camera or Office view */}
          {game.cameraOpen ? (
            <CameraView
              selectedCamera={game.selectedCamera}
              animatronics={game.animatronics}
              onSelectCamera={game.setSelectedCamera}
            />
          ) : (
            <OfficeView
              leftDoor={game.leftDoor}
              rightDoor={game.rightDoor}
              leftLight={game.leftLight}
              rightLight={game.rightLight}
              toggleLeftDoor={game.toggleLeftDoor}
              toggleRightDoor={game.toggleRightDoor}
              toggleLeftLight={game.toggleLeftLight}
              toggleRightLight={game.toggleRightLight}
              animatronics={game.animatronics}
              power={game.power}
            />
          )}

          {/* HUD overlay */}
          <HUD
            power={game.power}
            hour={game.hour}
            cameraOpen={game.cameraOpen}
            night={game.currentNight}
            toggleCamera={game.toggleCamera}
            powerDisabled={game.power <= 0}
            infinitePower={game.infinitePower}
          />

          {/* Jumpscare */}
          <Jumpscare animatronic={game.jumpscareTarget} />
        </div>
      )}

      {/* Win/Lose screens */}
      {(game.gameState === "won" || game.gameState === "lost") &&
        !game.jumpscareTarget && (
          <GameOverScreen
            won={game.gameState === "won"}
            night={game.currentNight}
            onMenu={handleMenu}
            onRetry={handleRetry}
            onNextNight={handleNextNight}
          />
        )}
    </div>
  );
}
