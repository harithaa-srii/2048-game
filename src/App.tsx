import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import ScorePanel from "./components/ScorePanel";
import ControlPanel from "./components/ControlPanel";
import Modal from "./components/Modal";
import type { Board, Direction } from "./logic/types";
import {
  initializeBoard,
  move,
  addRandomTile,
  checkWin,
  checkGameOver,
} from "./logic/gameLogic";

const MIN_SIZE = 4;
const MAX_SIZE = 8;
const DEFAULT_SIZE = 4;
const BEST_SCORE_STORAGE = "2048_best_score";

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(DEFAULT_SIZE);
  const [gameState, setGameState] = useState<{
    board: Board;
    score: number;
    bestScore: number;
    gameOver: boolean;
    gameWon: boolean;
  }>({
    board: initializeBoard(DEFAULT_SIZE),
    score: 0,
    bestScore: Number(localStorage.getItem(BEST_SCORE_STORAGE)) || 0,
    gameOver: false,
    gameWon: false,
  });
  const [modal, setModal] = useState<{ show: boolean; type: "win" | "lose" | null }>({
    show: false,
    type: null,
  });

  // Update board if boardSize changes
  useEffect(() => {
    const newBoard = initializeBoard(boardSize);
    setGameState(state => ({
      ...state,
      board: newBoard,
      score: 0,
      gameOver: false,
      gameWon: false,
    }));
  }, [boardSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver || gameState.gameWon || modal.show) return;
      let direction: Direction | null = null;
      switch (e.key) {
        case "ArrowUp":
          direction = "up";
          break;
        case "ArrowDown":
          direction = "down";
          break;
        case "ArrowLeft":
          direction = "left";
          break;
        case "ArrowRight":
          direction = "right";
          break;
      }
      if (direction) {
        e.preventDefault();
        handleMove(direction);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, modal]);

  const handleMove = (direction: Direction) => {
    if (gameState.gameOver || gameState.gameWon || modal.show) return;

    const [newBoard, gainedScore, moved] = move(gameState.board, direction);

    if (!moved) return;

    let updatedBoard = addRandomTile(newBoard);
    let newScore = gameState.score + gainedScore;

    const won = checkWin(updatedBoard);
    const over = !won && checkGameOver(updatedBoard);

    let updatedBest = gameState.bestScore;
    if (newScore > updatedBest) {
      updatedBest = newScore;
      localStorage.setItem(BEST_SCORE_STORAGE, updatedBest.toString());
    }

    setGameState({
      board: updatedBoard,
      score: newScore,
      bestScore: updatedBest,
      gameOver: over,
      gameWon: won,
    });

    if (won) {
      setModal({ show: true, type: "win" });
    } else if (over) {
      setModal({ show: true, type: "lose" });
    }
  };

  const handleRestart = () => {
    const newBoard = initializeBoard(boardSize);
    setGameState({
      board: newBoard,
      score: 0,
      bestScore: gameState.bestScore,
      gameOver: false,
      gameWon: false,
    });
  };

  const handleModalClose = () => {
    setModal({ show: false, type: null });
    handleRestart();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f6fd 70%, #d0eafd 100%)",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          marginBottom: "0.5rem",
          color: "#4576b7",
          fontWeight: 800,
          letterSpacing: "2px",
          fontSize: "2.5rem",
          textAlign: "center",
        }}
      >
        2048: ICE EDITION
      </h1>

      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <label htmlFor="boardSize" style={{ fontWeight: "700", color: "#3b6dbd" }}>
          Board Size:
        </label>
        <input
          id="boardSize"
          type="number"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={boardSize}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= MIN_SIZE && val <= MAX_SIZE) setBoardSize(val);
          }}
          style={{
            width: "4.5rem",
            fontWeight: "700",
            padding: "0.3rem",
            borderRadius: "8px",
            border: "1.5px solid #b3d3fb",
            textAlign: "center",
            background: "rgba(230,240,255,0.9)",
            color: "#184a7b",
            cursor: "pointer",
          }}
        />
      </div>

      <ScorePanel score={gameState.score} bestScore={gameState.bestScore} />
      <GameBoard board={gameState.board} />
      <ControlPanel onMove={handleMove} onRestart={handleRestart} />
      <Modal
        show={modal.show}
        message={
          modal.type === "win"
            ? "Congratulations! You reached 2048!"
            : modal.type === "lose"
            ? "Game Over! Try again."
            : ""
        }
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;
