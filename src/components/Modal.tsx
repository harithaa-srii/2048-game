import React from "react";

interface ModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44, 68, 107, 0.28)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        transition: "background 0.22s",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "24px",
          padding: "34px 44px",
          boxShadow: "0 8px 38px #b4d6ff77",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "260px"
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "#3b6dbd",
            marginBottom: "18px",
            textAlign: "center"
          }}
        >
          {message}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "#4576b7",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "10px 22px",
            fontSize: "1rem",
            fontWeight: 700,
            boxShadow: "0 2px 11px #bcd9ff51",
            cursor: "pointer"
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
