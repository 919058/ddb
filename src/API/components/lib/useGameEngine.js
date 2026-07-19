import { useState, useRef, useCallback, useEffect } from "react";
import {
  MOVEMENT_PATHS,
  NIGHT_DIFFICULTY,
  POWER_DRAIN,
  HOUR_DURATION,
  TOTAL_HOURS,
} from "./gameData";

const TICK_INTERVAL = 1000; // 1 second tick

export default function useGameEngine(night = 1) {
  const [gameState, setGameState] = useState("menu"); // menu, playing, won, lost
  const [power, setPower] = useState(100);
  const [hour, setHour] = useState(0); // 0 = 12AM, 5 = 5AM
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("stage");
  const [leftDoor, setLeftDoor] = useState(false);
  const [rightDoor, setRightDoor] = useState(false);
  const [leftLight, setLeftLight] = useState(false);
  const [rightLight, setRightLight] = useState(false);
  const [jumpscareTarget, setJumpscareTarget] = useState(null);
  const [currentNight, setCurrentNight] = useState(night);
  const [infinitePower, setInfinitePower] = useState(false);

  // Animatronic positions (index into their movement path)
  const [animatronics, setAnimatronics] = useState({
    freddy: 0,
    bonnie: 0,
    chica: 0,
    foxy: 0,
  });

  const tickCount = useRef(0);
  const gameLoopRef = useRef(null);
  const foxyReadyRef = useRef(0); // counts how many times foxy was checked
  const cheatBuffer = useRef("");

  const getAnimatronicRoom = useCallback(
    (name) => {
      const pathIndex = animatronics[name];
      return MOVEMENT_PATHS[name][pathIndex];
    },
    [animatronics]
  );

  const tryMoveAnimatronic = useCallback(
    (name, difficulty) => {
      const roll = Math.random() * 20;
      if (roll >= difficulty) return null; // didn't move

      const currentIndex = animatronics[name];
      const path = MOVEMENT_PATHS[name];

      // Already at end of path (office)
      if (currentIndex >= path.length - 1) return null;

      // Special: sometimes skip a step for unpredictability (except to office)
      const nextIndex = Math.min(currentIndex + 1, path.length - 1);
      return nextIndex;
    },
    [animatronics]
  );

  const checkAttack = useCallback((newPositions) => {
    // An animatronic that reaches the office kills you — no second chance
    for (const name of ["freddy", "bonnie", "chica", "foxy"]) {
      const path = MOVEMENT_PATHS[name];
      const pos = newPositions[name];
      if (pos >= path.length - 1) {
        return name;
      }
    }
    return null;
  }, []);

  const gameTick = useCallback(() => {
    tickCount.current += 1;

    // Update hour
    const newHour = Math.floor(tickCount.current / HOUR_DURATION);
    if (newHour >= TOTAL_HOURS) {
      setGameState("won");
      return;
    }
    setHour(newHour);

    // Drain power
    setPower((prev) => {
      if (infinitePower) return 100;
      let drain = POWER_DRAIN.base;
      if (cameraOpen) drain += POWER_DRAIN.camera;
      if (leftDoor) drain += POWER_DRAIN.leftDoor;
      if (rightDoor) drain += POWER_DRAIN.rightDoor;
      if (leftLight) drain += POWER_DRAIN.leftLight;
      if (rightLight) drain += POWER_DRAIN.rightLight;
      const next = prev - drain;
      if (next <= 0) return 0;
      return Math.round(next * 10) / 10;
    });

    // Move animatronics every ~5 seconds
    if (tickCount.current % 5 === 0) {
      const diff = NIGHT_DIFFICULTY[Math.min(currentNight, 5)];
      setAnimatronics((prev) => {
        const newPos = { ...prev };
        for (const name of ["freddy", "bonnie", "chica", "foxy"]) {
          // Foxy only moves when NOT being watched
          const canMove =
            name === "foxy"
              ? selectedCamera !== "pirateCove" && !cameraOpen
              : true;
          if (!canMove) continue;
          const result = tryMoveAnimatronic(name, diff[name]);
          if (result === null) continue;
          const path = MOVEMENT_PATHS[name];
          // Trying to enter the office — a closed door blocks them at the corner
          if (result === path.length - 1) {
            const isLeft = name === "bonnie" || name === "foxy";
            const doorClosed = isLeft ? leftDoor : rightDoor;
            if (doorClosed) continue; // blocked, stays at the corner
          }
          newPos[name] = result;
        }

        // Check for attacks
        const attacker = checkAttack(newPos);
        if (attacker) {
          setJumpscareTarget(attacker);
          setTimeout(() => setGameState("lost"), 1500);
        }

        return newPos;
      });
    }
  }, [
    cameraOpen,
    leftDoor,
    rightDoor,
    leftLight,
    rightLight,
    selectedCamera,
    currentNight,
    tryMoveAnimatronic,
    checkAttack,
  ]);

  // Power out = instant death after short delay
  useEffect(() => {
    if (infinitePower) return;
    if (power <= 0 && gameState === "playing") {
      setLeftDoor(false);
      setRightDoor(false);
      setLeftLight(false);
      setRightLight(false);
      setCameraOpen(false);
      setTimeout(() => {
        setJumpscareTarget("freddy");
        setTimeout(() => setGameState("lost"), 1500);
      }, 3000);
    }
  }, [power, gameState, infinitePower]);

  // Cheat code: type "power" during gameplay to toggle infinite power
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== "playing") return;
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;
      cheatBuffer.current = (cheatBuffer.current + key).slice(-5);
      if (cheatBuffer.current === "power") {
        setInfinitePower((prev) => !prev);
        cheatBuffer.current = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // Reset infinite power on new game
  useEffect(() => {
    if (gameState === "menu") setInfinitePower(false);
  }, [gameState]);

  // Main game loop
  useEffect(() => {
    if (gameState === "playing" && power > 0) {
      gameLoopRef.current = setInterval(gameTick, TICK_INTERVAL);
      return () => clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, gameTick, power]);

  const startGame = useCallback((nightNum = 1) => {
    setCurrentNight(nightNum);
    setPower(100);
    setHour(0);
    setCameraOpen(false);
    setSelectedCamera("stage");
    setLeftDoor(false);
    setRightDoor(false);
    setLeftLight(false);
    setRightLight(false);
    setJumpscareTarget(null);
    setAnimatronics({ freddy: 0, bonnie: 0, chica: 0, foxy: 0 });
    tickCount.current = 0;
    foxyReadyRef.current = 0;
    setGameState("playing");
  }, []);

  const toggleCamera = useCallback(() => {
    if (power <= 0) return;
    setCameraOpen((prev) => !prev);
  }, [power]);

  const toggleLeftDoor = useCallback(() => {
    if (power <= 0) return;
    setLeftDoor((prev) => !prev);
  }, [power]);

  const toggleRightDoor = useCallback(() => {
    if (power <= 0) return;
    setRightDoor((prev) => !prev);
  }, [power]);

  const toggleLeftLight = useCallback(() => {
    if (power <= 0) return;
    setLeftLight((prev) => !prev);
  }, [power]);

  const toggleRightLight = useCallback(() => {
    if (power <= 0) return;
    setRightLight((prev) => !prev);
  }, [power]);

  return {
    gameState,
    power,
    hour,
    cameraOpen,
    selectedCamera,
    leftDoor,
    rightDoor,
    leftLight,
    rightLight,
    jumpscareTarget,
    currentNight,
    infinitePower,
    animatronics,
    getAnimatronicRoom,
    startGame,
    toggleCamera,
    toggleLeftDoor,
    toggleRightDoor,
    toggleLeftLight,
    toggleRightLight,
    setSelectedCamera,
    setGameState,
  };
}
