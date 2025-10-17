import React from "react";
import "../index.css";

interface ScorePanelProps {
  score: number;
  bestScore: number;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ score, bestScore }) => (
  <div className="score-panel">
    <span className="score-pill">Score: {score}</span>
    <span className="score-pill">Best: {bestScore}</span>
  </div>
);

export default ScorePanel;
