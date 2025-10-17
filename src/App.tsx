import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import ScorePanel from "./components/ScorePanel";
import ControlPanel from "./components/ControlPanel";
import Modal from "./components/Modal";
import type { GameState, Direction } from "./logic/types";
import {
  initializeBoard,
  move,
  addRandomTile,
  checkWin,
  checkGameOver,
} from "./logic/gameLogic";

const BOARD_SIZE = 4;
const BEST_SCORE_STORAGE = "2048_best_score";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(BOARD_SIZE),
    score: 0,
    bestScore: Number(localStorage.getItem(BEST_SCORE_STORAGE)) || 0,
    gameOver: false,
    gameWon: false,
  });
  const [modal, setModal] = useState<{ show: boolean; type: "win" | "lose" | null }>({
    show: false,
    type: null,
  });

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
    setGameState({
      board: initializeBoard(BOARD_SIZE),
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
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f6fd 70%, #d0eafd 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "430px",
        }}
      >
        <h1
          style={{
            marginBottom: "6px",
            color: "#4576b7",
            fontWeight: 800,
            letterSpacing: "2px",
            fontSize: "2.5rem",
            marginTop: 0,
            textAlign: "center",
          }}
        >
          2048: ICE EDITION
        </h1>
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
    </div>
  );
};

export default App;
