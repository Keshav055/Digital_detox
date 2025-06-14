import React, { useState, useEffect, useCallback } from "react";

// Color, icon, and playful animation cues for light/minimal onboarding.
// Accent/brand colors (sync with App.js)
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// Whimsical, positive icons for playful onboarding
const ICONS = ["🌱", "🤝", "🎁", "🚶‍♂️", "📝"];

// Four slides (can be expanded) for onboarding journey
const SLIDES = [
  {
    icon: ICONS[0],
    title: "Welcome!",
    desc: "Ready to rediscover life beyond your device? Digital Detox Companion will guide you towards fresh habits and more offline joy.",
    bg: "#fffbe7",
  },
  {
    icon: ICONS[1],
    title: "Find Your Buddy",
    desc: "Pair anonymously with a supportive buddy. Cheer each other on. You’re never alone in your digital detox journey!",
    bg: "#f5fdfe",
  },
  {
    icon: ICONS[2],
    title: "Unlock Milestones",
    desc: "Earn playful real-world rewards for reaching new offline goals and streaks. Celebrate yourself, not your screen.",
    bg: "#fafff6",
  },
  {
    icon: ICONS[4],
    title: "Reflect & Grow",
    desc: "Quickly jot thoughts in your habit journal or try an AI reflection prompt. Small reflections help build lasting change.",
    bg: "#f7fff8",
  },
];

// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  /**
   * Renders a playful slide UI with progress and animated transitions.
   * Uses localStorage ("onboarded") to display only on first load.
   * Invokes onComplete on exit/finish.
   */
  const [curr, setCurr] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Handle escape key (exit onboarding)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        handleDone();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, []);

  // Set onboarding done in localStorage and inform App via callback
  const handleDone = useCallback(() => {
    try {
      localStorage.setItem("onboarded", "yes");
    } catch {}
    if (onComplete) onComplete();
  }, [onComplete]);

  // Slide navigation (with slide-out transition)
  function handleNext() {
    if (curr < SLIDES.length - 1) {
      setExiting(true);
      setTimeout(() => {
        setCurr(curr + 1);
        setExiting(false);
      }, 330);
    } else {
      // Last slide done!
      setExiting(true);
      setTimeout(() => {
        handleDone();
      }, 330);
    }
  }

  // Animated playful transition for each slide (slide/scale from right)
  return (
    <div
      className="onboarding-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        background: "rgba(255,255,255,0.97)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.36s cubic-bezier(.85,.45,.12,1)",
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "auto"
      }}
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="onboard-card"
        style={{
          minWidth: 320,
          maxWidth: 400,
          width: "90vw",
          boxShadow: "0 8px 32px rgba(44,127,67,0.07)",
          border: `2px solid ${COLORS.accent}40`,
          borderRadius: 18,
          padding: "38px 32px 30px",
          background: SLIDES[curr].bg,
          transform: exiting
            ? "translateY(30px) scale(0.97)"
            : "translateY(0) scale(1)",
          transition:
            "transform 0.36s cubic-bezier(.8,.18,.12,1), background 0.26s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          className="onboard-icon"
          aria-hidden="true"
          style={{
            fontSize: 44,
            display: "block",
            textAlign: "center",
            marginBottom: 18,
            transform: exiting ? "scale(0.8) rotate(-12deg)" : "scale(1) rotate(0)",
            transition: "transform 0.34s cubic-bezier(.7,.05,.2,.97)"
          }}
        >
          {SLIDES[curr].icon}
        </span>
        <div
          className="onboard-title"
          style={{
            color: COLORS.primary,
            fontWeight: 800,
            fontSize: 23,
            marginBottom: 7,
            letterSpacing: "0.01em",
            textAlign: "center",
            userSelect: "none"
          }}
        >
          {SLIDES[curr].title}
        </div>
        <div
          className="onboard-desc"
          style={{
            color: "#6C917B",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 20,
            fontWeight: 500
          }}
        >
          {SLIDES[curr].desc}
        </div>
        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 22
          }}
          aria-label="Onboarding progress"
        >
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                display: "inline-block",
                background:
                  idx === curr
                    ? COLORS.accent
                    : COLORS.secondary + (idx < curr ? "70" : "55"),
                border: idx === curr ? `2.5px solid ${COLORS.primary}` : "none",
                transition: "background 0.2s, border 0.2s"
              }}
            />
          ))}
        </div>
        {/* Next/finish button */}
        <button
          className="onboard-btn"
          onClick={handleNext}
          style={{
            background: COLORS.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            border: "none",
            borderRadius: 9,
            padding: "14px 0",
            width: "100%",
            boxShadow:
              "0 2px 8px 0 rgba(44,127,67,0.05),0 1px 0 rgba(255,214,0,0.04)",
            cursor: "pointer",
            outline: "none",
            marginTop: 5,
            transition: "background 0.23s"
          }}
          aria-label={curr === SLIDES.length - 1 ? "Finish onboarding" : "Next onboarding step"}
        >
          {curr < SLIDES.length - 1 ? (
            <>
              Next <span style={{ fontSize: 19, marginLeft: 8 }}>→</span>
            </>
          ) : (
            <>
              Let’s Start! <span style={{ fontSize: 19, marginLeft: 7 }}>🌳</span>
            </>
          )}
        </button>
        {/* Skip or exit: only on first slide, shown minimally */}
        <div style={{ textAlign: "center", marginTop: 19 }}>
          {curr === 0 ? (
            <button
              className="onboard-skip"
              onClick={handleDone}
              style={{
                background: "none",
                border: "none",
                color: COLORS.primary,
                fontWeight: 500,
                fontSize: 15.5,
                cursor: "pointer",
                textDecoration: "underline dotted #B2DFDB 1px",
                opacity: 0.7,
              }}
              tabIndex={0}
              aria-label="Skip onboarding"
            >
              Skip for now
            </button>
          ) : null}
        </div>
        {/* ESC hint */}
        <div
          style={{
            position: "absolute",
            right: 13,
            top: 10,
            fontSize: 15,
            color: "#b7b7aa",
            fontWeight: 500,
            opacity: 0.34,
            pointerEvents: "none"
          }}
        >
          Esc
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default OnboardingSlides;
