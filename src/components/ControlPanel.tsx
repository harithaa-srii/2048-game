import React from "react";

interface ControlPanelProps {
  onMove: (direction: "up" | "down" | "left" | "right") => void;
  onRestart: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onMove, onRestart }) => {
  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button onClick={() => onMove("up")}>↑</button>
      <button onClick={() => onMove("down")}>↓</button>
      <button onClick={() => onMove("left")}>←</button>
      <button onClick={() => onMove("right")}>→</button>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default ControlPanel;
