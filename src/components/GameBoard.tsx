import React from "react";
import type { Board } from "../logic/types";
import Tile from "./Tile";

// Set 96vw for mobile, 440px for desktop
const MAX_BOARD_PX = 440;
const MOBILE_BOARD_PERC = "96vw";
const GRID_GAP = 9;
const OUTER_PAD = 10;
const MIN_CELL_SIZE = 50; // guarantee minimum size for cells everywhere

const GameBoard: React.FC<{ board: Board }> = ({ board }) => {
  const size = board.length;
  // Responsive board size, almost fills mobile width
  const boardSize = `min(${MAX_BOARD_PX}px, ${MOBILE_BOARD_PERC})`;
  // Each cell is largest possible, guaranteeing at least 50px
  const cellSize = `max(${MIN_CELL_SIZE}px, calc(( ${boardSize} - ${(size - 1) * GRID_GAP}px ) / ${size}))`;

  return (
    <div
      style={{
        padding: `${OUTER_PAD}px`,
        margin: "10px auto 12px auto",
        background: "linear-gradient(140deg, #eaf6ff 70%, #bcd9ff 120%)",
        borderRadius: "26px",
        border: "2.5px solid #b6d7f9",
        boxShadow: "0 8px 54px 0 #b4d6ff88, 0 2px 10px #b2e6ff70",
        display: "inline-block",
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: boardSize,
          height: boardSize,
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${cellSize})`,
          gridTemplateRows: `repeat(${size}, ${cellSize})`,
          gap: `${GRID_GAP}px`,
          transition: "width 0.2s, height 0.2s",
        }}
      >
        {board.flat().map((value, idx) => (
          <div
            key={idx}
            style={{
              border: "2px solid #d6eaff",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.68)",
              boxShadow: "0 2px 9px 1px #b7deff22",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <Tile value={value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
