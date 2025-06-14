import React from "react";

/**
 * Minimal Toast component: Now playful with icon, color fx & slide+fade animation
 * Props:
 * - message: string (required)
 * - visible: boolean (show hide)
 * - onClose: function (if present, shows close btn)
 * - type: "info"|"success"|"error"|"warning"
 */
const TYPE_ICON = {
  success: "🎉",
  error: "😢",
  warning: "⚠️",
  info: "💡"
};
const TYPE_COLOR = {
  success: { bg: "#EBF8E1", color: "#227210" },
  error: { bg: "#FEECEC", color: "#C62828" },
  warning: { bg: "#FFF8E1", color: "#8E7620" },
  info: { bg: "#EDF6F4", color: "#146959" }
};

// PUBLIC_INTERFACE
export default function Toast({ message, visible, onClose, type = "info" }) {
  if (!visible || !message) return null;
  const { bg, color } = TYPE_COLOR[type] || TYPE_COLOR.info;
  const icon = TYPE_ICON[type] || TYPE_ICON.info;

  // Playful animation on mount, fade out on dismiss
  return (
    <div
      className={`toast playful-toast ${visible ? "toast-show" : ""}`}
      style={{
        position: "fixed",
        top: 18,
        left: 0,
        right: 0,
        zIndex: 1003,
        maxWidth: 440,
        margin: "0 auto",
        background: bg,
        color: color,
        padding: "15px 27px",
        borderRadius: 14,
        boxShadow: "0 8px 24px 0 rgba(38,125,50,0.09)",
        fontWeight: 600,
        fontSize: 17,
        display: "flex",
        alignItems: "center",
        gap: 16,
        pointerEvents: "auto",
      }}
      role="status"
    >
      <span
        className="toast-icon pop"
        style={{
          fontSize: 24,
          marginRight: 2,
          transition: "transform 0.34s cubic-bezier(.42,1.94,.55,1.2)",
          filter: "drop-shadow(0 0 9px #fafbe7cc)"
        }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className="toast-msg"
        style={{
          lineHeight: 1.14,
          color,
          flex: 1,
          transition: "color 0.23s"
        }}
      >
        {message}
      </span>
      {onClose && (
        <button
          style={{
            background: "none",
            border: "none",
            color: "#A8A58A",
            marginLeft: 9,
            fontSize: 23,
            cursor: "pointer",
            transition: "color 0.22s"
          }}
          className="toast-close-btn ripple"
          onClick={onClose}
          aria-label="Dismiss notification"
          tabIndex={0}
        >
          ×
        </button>
      )}
    </div>
  );
}
