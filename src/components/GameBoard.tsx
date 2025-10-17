import React from "react";
import type { Board } from "../logic/types";
import Tile from "./Tile";

// Use clamp to adapt for mobile–desktop
const CELL_SIZE = "clamp(38px, 10vw, 80px)";
const GRID_GAP = 11;
const OUTER_PAD = 18;

const GameBoard: React.FC<{ board: Board }> = ({ board }) => {
  const size = board.length;
  const gridSize = `calc((${CELL_SIZE} * ${size}) + (${GRID_GAP}px * ${size - 1}))`;

  return (
    <div
      style={{
        padding: `${OUTER_PAD}px`,
        margin: "28px auto 24px auto",
        background: "linear-gradient(140deg, #eaf6ff 70%, #bcd9ff 120%)",
        borderRadius: "26px",
        border: "2.5px solid #b6d7f9",
        boxShadow: "0 8px 54px 0 #b4d6ff88, 0 2px 10px #b2e6ff70",
        display: "inline-block",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: gridSize,
          height: gridSize,
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${CELL_SIZE})`,
          gridTemplateRows: `repeat(${size}, ${CELL_SIZE})`,
          gap: `${GRID_GAP}px`,
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
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
