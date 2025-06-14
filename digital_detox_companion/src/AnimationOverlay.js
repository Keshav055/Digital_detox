import React, { useEffect, useRef } from "react";

/**
 * AnimationOverlay component
 * Provides playful/confetti, sparkle, and bounce effects for reward unlock/claim.
 * Brand-aligned, uplifting, non-intrusive, and reusable.
 *
 * @param {string} type - The animation type: "confetti", "sparkle", or "bounce"
 * @param {boolean} visible - Whether to show the animation
 * @param {function} onEnd - Callback after animation ends (optional)
 */
 // PUBLIC_INTERFACE
function AnimationOverlay({ type = "confetti", visible, onEnd }) {
  const overlayRef = useRef();

  // Auto-hide effect after animation finishes (for one-shots)
  useEffect(() => {
    if (!visible) return;
    let timeout;
    if (type === "confetti" || type === "sparkle") {
      timeout = setTimeout(() => onEnd && onEnd(), 2200);
    } else if (type === "bounce") {
      timeout = setTimeout(() => onEnd && onEnd(), 1200);
    }
    return () => clearTimeout(timeout);
  }, [visible, type, onEnd]);

  // Hide overlay if not visible
  if (!visible) return null;

  // --------- Animation SVGs ---------
  // Confetti: Brand color shapes
  const confettiShapes = (
    <svg width="360" height="60" style={{
      position: "absolute",
      left: "50%", top: 8, transform: "translateX(-50%)",
      pointerEvents: "none", width: 360, height: 60
    }}>
      {/* Confetti drops, stars, stripes in KAVIA palette */}
      <g>
        <circle cx="40" cy="32" r="5.2" fill="#FFD600" opacity="0.73">
          <animate attributeName="cy" values="32;6;32" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.24s" repeatCount="indefinite" />
        </circle>
        <circle cx="74" cy="12" r="3.7" fill="#B2DFDB" opacity="0.78">
          <animate attributeName="cy" values="12;38;12" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2.18s" repeatCount="indefinite" />
        </circle>
        <rect x="116" y="17" width="3.5" height="13" fill="#E87A41" opacity="0.65" rx="2.2">
          <animate attributeName="y" values="17;36;17" dur="1.48s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <polygon points="152,23 158,37 164,23" fill="#FFD600" opacity="0.6">
          <animate attributeName="points" values="152,23 158,47 164,23;152,23 158,37 164,23" dur="2.36s" repeatCount="indefinite" />
        </polygon>
        <rect x="193" y="11" width="2.3" height="16" fill="#2E7D32" opacity="0.76" rx="1.3">
          <animate attributeName="y" values="11;31;11" dur="1.85s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.68;1;0.68" dur="1.45s" repeatCount="indefinite" />
        </rect>
        <circle cx="210" cy="27" r="3.9" fill="#fc3" opacity="0.75">
          <animate attributeName="cy" values="27;49;27" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <rect x="258" y="15" width="2.5" height="13" fill="#FFD600" opacity="0.68" rx="1">
          <animate attributeName="y" values="15;38;15" dur="2.01s" repeatCount="indefinite" />
        </rect>
        <circle cx="283" cy="9" r="4.1" fill="#2E7D32" opacity="0.77">
          <animate attributeName="cy" values="9;44;9" dur="2.73s" repeatCount="indefinite" />
        </circle>
        <rect x="305" y="28" width="2.6" height="12" fill="#B2DFDB" opacity="0.81" rx="1.15">
          <animate attributeName="y" values="28;57;28" dur="2.08s" repeatCount="indefinite" />
        </rect>
        <circle cx="333" cy="19" r="4" fill="#FFD600" opacity="0.64">
          <animate attributeName="cy" values="19;57;19" dur="1.72s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.14s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
  // Sparkle star shapes
  const sparkleShapes = (
    <svg width="180" height="42" style={{
      position: "absolute",
      left: "50%", top: 14, transform: "translateX(-50%)",
      pointerEvents: "none", width: 180, height: 42
    }}>
      <g>
        <polygon points="9,19 15,43 21,19 1,30 29,30"
          fill="#FFD600" opacity="0.36">
          <animate attributeName="opacity" values="0.36;1;0.36" dur="1.7s" repeatCount="indefinite" />
        </polygon>
        <polygon points="56,13 59,25 62,13 53,20 65,20"
          fill="#2E7D32" opacity="0.36">
          <animate attributeName="opacity" values="0.36;1;0.36" dur="2.1s" repeatCount="indefinite" />
        </polygon>
        <polygon points="104,22 106,36 109,22 101,29 113,29"
          fill="#B2DFDB" opacity="0.36">
          <animate attributeName="opacity" values="0.36;1;0.36" dur="1.83s" repeatCount="indefinite" />
        </polygon>
        <polygon points="141,9 144,28 147,9 138,20 150,20"
          fill="#E87A41" opacity="0.36">
          <animate attributeName="opacity" values="0.36;1;0.36" dur="2.03s" repeatCount="indefinite" />
        </polygon>
      </g>
    </svg>
  );
  // Bounce: container with shake/bounce animation
  const bounceBlock = (
    <div style={{
      position: "absolute", left: "50%", top: 12,
      width: 70, height: 70, transform: "translateX(-50%)", zIndex: 11,
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div className="bounce-anim" style={{
        width: 54, height: 54, borderRadius: "50%",
        backgroundColor: "#FFD60044", display: "flex", alignItems: "center", justifyContent: "center",
        animation: "bounce 1.12s cubic-bezier(.22,1.7,.49,1) both"
      }}>
        <span style={{fontSize: 34, color: "#E87A41", userSelect: "none"}} role="img" aria-label="Reward">🎉</span>
      </div>
      <style>
        {`
        @keyframes bounce {
          0%   { transform: scale(1) translateY(0);}
          20%  { transform: scale(1.17,0.89) translateY(-18px);}
          40%  { transform: scale(0.93,1.19) translateY(7px);}
          60%  { transform: scale(1.12,0.89) translateY(-14px);}
          80%  { transform: scale(0.98,1.07) translateY(4px);}
          100% { transform: scale(1) translateY(0);}
        }
        `}
      </style>
    </div>
  );

  return (
    <div
      ref={overlayRef}
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%",
        zIndex: 30,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
      }}
      aria-hidden="true"
    >
      {type === "confetti" && confettiShapes}
      {type === "sparkle" && sparkleShapes}
      {type === "bounce" && bounceBlock}
    </div>
  );
}

export default AnimationOverlay;
