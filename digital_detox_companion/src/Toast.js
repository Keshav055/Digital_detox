import React, { useEffect, useRef, useState, createContext, useCallback, useContext } from "react";

// Brand/colors as per minimal Digital Detox Companion style guide
const COLORS = {
  info: "#466464", // muted blue/gray
  success: "#2E7D32", // app primary
  error: "#E87A41", // kavia orange, since errors pop
  bg: "#fff",
  shadow: "0 4px 16px 0 rgba(80,110,67,0.09)",
  border: "1px solid #e0efe5",
};

const DURATION = 3200; // seconds each toast is shown
const GAP = 10;

// Toast Context to allow usage from anywhere (future extensibility)
const ToastContext = createContext(null);

// PUBLIC_INTERFACE
// ToastProvider supplies context for advanced use, but is optional.
export function ToastProvider({ children }) {
  // Holds an array of toasts to display
  const [toasts, setToasts] = useState([]);

  // Show a toast
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto-remove
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, DURATION);
  }, []);

  // Manual close (for dismiss buttons etc)
  const closeToast = id =>
    setToasts(ts => ts.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastStack toasts={toasts} onClose={closeToast} />
    </ToastContext.Provider>
  );
}

// PUBLIC_INTERFACE
// Hook to get showToast
export function useToast() {
  return useContext(ToastContext);
}

// PUBLIC_INTERFACE
// ToastStack: Renders stacked toasts (top center, mobile-friendly)
function ToastStack({ toasts, onClose }) {
  return (
    <div
      className="toast-stack"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none", // non-blocking by default
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t, i) => (
        <ToastItem
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => onClose(t.id)}
          style={{ marginTop: i === 0 ? 0 : GAP }}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
// ToastItem: A single toast bubble, animates in/out
function ToastItem({ message, type = "info", onClose, style }) {
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef();

  useEffect(() => {
    // Animate in
    setVisible(true);
    // Set timer for unmount
    closeTimer.current = setTimeout(() => setVisible(false), DURATION - 250);
    return () => clearTimeout(closeTimer.current);
  }, []);

  // Remove after fade out
  function handleTransitionEnd() {
    if (!visible) onClose();
  }

  // Choose emoji/icon based on type
  const typeIcon = {
    success: "✅",
    error: "⚠️",
    info: "ℹ️"
  }[type] || "ℹ️";

  return (
    <div
      className="toast"
      style={{
        minWidth: 180,
        maxWidth: 360,
        background: COLORS.bg,
        color: type === "success" ? COLORS.success : type === "error" ? COLORS.error : COLORS.info,
        border: COLORS.border,
        boxShadow: COLORS.shadow,
        borderLeft: `4px solid ${
          type === "success"
            ? COLORS.success
            : type === "error"
            ? COLORS.error
            : "#B2DFDB"
        }`,
        padding: "13px 22px 13px 16px",
        borderRadius: 8,
        fontWeight: 500,
        fontSize: 15,
        marginBottom: 0,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(-20px) scale(0.98)",
        pointerEvents: "auto",
        transition:
          "opacity 0.36s cubic-bezier(.65,0,.32,1), transform 0.38s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        ...style,
      }}
      onTransitionEnd={handleTransitionEnd}
      role="status"
      tabIndex={-1}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: 22,
          marginRight: 2,
        }}
      >
        {typeIcon}
      </span>
      <span style={{ flex: 1, lineHeight: 1.35 }}>{message}</span>
      {/* Uncomment for manual close: */}
      {/* <button
        onClick={() => setVisible(false)}
        style={{
          border: "none", background: "none", color: "#9AAEB0",
          fontSize: 18, cursor: "pointer", marginLeft: 5, padding: 0, pointerEvents: "auto"
        }}
        tabIndex={0}
        aria-label="Dismiss notification"
      >&times;</button> */}
    </div>
  );
}

// PUBLIC_INTERFACE
// Single Toast interface for App root, for backwards compatibility
// Can be used as <Toast message="..." visible onClose type />
export default function Toast({ message, visible, onClose, type = "info" }) {
  // This minimal implementation supports legacy single-toast usage at the root.
  // Use ToastProvider for full stack/toast context in future.
  const [internalOpen, setInternalOpen] = useState(visible);

  useEffect(() => {
    setInternalOpen(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setInternalOpen(false);
        if (onClose) onClose();
      }, DURATION);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!internalOpen) return null;
  return (
    <ToastStack
      toasts={[{ id: "singleton", message, type }]}
      onClose={() => {
        setInternalOpen(false);
        if (onClose) onClose();
      }}
    />
  );
}
