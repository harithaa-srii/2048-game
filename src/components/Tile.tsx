import React from "react";

interface TileProps {
  value: number | null;
}

// Subtle ice cube progression for tile backgrounds
const tileBackgrounds: Record<number, string> = {
  2: "#e7f5fe",      
  4: "#d1ebfd",
  8: "#b3dafb",
  16: "#93c2f1",
  32: "#78aee6",
  64: "#6399db",
  128: "#497fc9",
  256: "#355fa2",
  512: "#27487b",
  1024: "#183663",
  2048: "#0f2646",   
};

const tileTextColors: Record<number, string> = {
  2: "#2c5777",
  4: "#376fa1",
  8: "#29587c",
  16: "#29587c",
  32: "#fff",
  64: "#fff",
  128: "#fff",
  256: "#fff",
  512: "#f7f7ff",
  1024: "#f7f7ff",
  2048: "#f7f7ff",
};

const Tile: React.FC<TileProps> = ({ value }) => {
  if (!value) return null;

  const bgColor = tileBackgrounds[value] || tileBackgrounds[2048];
  const textColor = tileTextColors[value] || "#183d68";
  return (
    <div
      className="tile-number"
      style={{
        background: bgColor,
        color: textColor,
        fontWeight: 700,
        borderRadius: "11px",
        boxShadow: "0 2px 6px rgb(100 180 255 / 0.14)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        userSelect: "none",
        width: "62px",
        height: "62px",
        transition: "background 0.16s, color 0.16s",
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
