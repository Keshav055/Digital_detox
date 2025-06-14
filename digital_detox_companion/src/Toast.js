import React from "react";

// PUBLIC_INTERFACE
function Toast({ message, visible, onClose, type = "info" }) {
  if (!visible) return null;
  // Minimal theme colors
  const colors = {
    info: { bg: "#E8F8F2", color: "#20743d" },
    success: { bg: "#FAFBE4", color: "#B2A016" },
    error: { bg: "#FFEDEA", color: "#BF2E1B" }
  };
  const style = {
    position: "fixed",
    top: 70,
    right: 24,
    minWidth: 200,
    zIndex: 80,
    padding: "15px 22px",
    background: colors[type].bg,
    color: colors[type].color,
    borderRadius: 7,
    boxShadow: "0 4px 16px 0 rgba(40,59,48,0.11)",
    fontWeight: 500,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    gap: 10
  };
  return (
    <div style={style} role="status">
      <span>{message}</span>
      <button
        style={{
          background: "transparent",
          border: "none",
          color: colors[type].color,
          fontSize: 17,
          cursor: "pointer",
          marginLeft: "10px"
        }}
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
