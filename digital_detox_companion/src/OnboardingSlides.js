import React, { useState, useEffect, useRef } from "react";

/**
 * Accent and theme colors
 */
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A"
};

const SLIDES = [
  {
    icon: (
      <span
        role="img"
        aria-label="Sun"
        style={{ fontSize: 48, color: COLORS.accent }}
      >
        🌞
      </span>
    ),
    title: "Welcome to Digital Detox Companion!",
    desc: "Discover the brighter side of life, away from your screen. Let’s start your journey!"
  },
  {
    icon: (
      <span
        role="img"
        aria-label="Map"
        style={{ fontSize: 44, color: COLORS.primary }}
      >
        🗺️
      </span>
    ),
    title: "Personalized Detox Plan",
    desc: "Get gentle, step-by-step plans to re-balance your digital world."
  },
  {
    icon: (
      <span
        role="img"
        aria-label="Buddy"
        style={{ fontSize: 44, color: "#e87a41" }}
      >
        🧑‍🤝‍🧑
      </span>
    ),
    title: "Accountability Buddy",
    desc: "Pair anonymously for friendly encouragement as you make progress."
  },
  {
    icon: (
      <span
        role="img"
        aria-label="Trophy"
        style={{ fontSize: 44, color: COLORS.accent }}
      >
        🏆
      </span>
    ),
    title: "Milestone Rewards",
    desc: "Earn real-life treats for milestones… from coffee to outdoor events!"
  },
  {
    icon: (
      <span
        role="img"
        aria-label="Tree"
        style={{ fontSize: 44, color: COLORS.primary }}
      >
        🌳
      </span>
    ),
    title: "Check In & Reflect",
    desc: "Track your offline activities and journal your experiences for lasting change."
  },
  {
    icon: (
      <span
        role="img"
        aria-label="Rocket"
        style={{ fontSize: 44, color: "#e87a41" }}
      >
        🚀
      </span>
    ),
    title: "Ready?",
    desc:
      "Let’s playfully detox together — you’re only a tap away from a lighter, more present you!"
  }
];

/**
 * Slide-transition duration, ms
 */
const TRANSITION_MS = 450;

/**
 * OnboardingSlides component
 *
 * Shows whimsical, playful, minimalist onboarding slides with transitions
 * Displays only for first-time users by reading/writing localStorage
 * @param {function} onComplete callback fired when onboarding completes
 */
// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  // Track slide index and animation state
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);

  // Prevent excess localStorage reads by caching after first mount
  useEffect(() => {
    try {
      if (localStorage.getItem("onboarded") === "yes") {
        onComplete && onComplete();
      }
    } catch {}
  }, [onComplete]);

  // Trap focus inside overlay for accessibility
  const overlayRef = useRef();

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.focus();
    }
  }, []);

  // Handler for next button
  function nextSlide() {
    setOut(true); // Start transition out
    setTimeout(() => {
      setOut(false);
      setIdx((prev) => Math.min(prev + 1, SLIDES.length - 1));
    }, TRANSITION_MS);
  }

  // Handler for "Get Started" exit (final slide)
  function finishOnboarding() {
    try {
      localStorage.setItem("onboarded", "yes");
    } catch {}
    if (onComplete) onComplete();
  }

  // Slide transition: simple slide in/out animation
  return (
    <div
      className="onboarding-overlay"
      ref={overlayRef}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        zIndex: 100001,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        background: "rgba(236,254,245,0.90)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "backdrop-filter 0.3s",
      }}
      onKeyDown={e => {
        if (e.key === "Escape") finishOnboarding();
        if (e.key === "ArrowRight" && idx < SLIDES.length - 1) nextSlide();
        if (e.key === "ArrowLeft" && idx > 0) {
          setOut(true);
          setTimeout(() => {
            setOut(false);
            setIdx((prev) => Math.max(prev - 1, 0));
          }, TRANSITION_MS);
        }
      }}
    >
      <div
        className="onboarding-slide"
        style={{
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 8px 50px 0 rgba(44,127,67,0.12)",
          maxWidth: 440,
          width: "90vw",
          minHeight: 330,
          padding: "48px 20px 32px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: out
            ? "translateX(-50vw) scale(0.93) rotate(-6deg)"
            : "translateX(0%) scale(1)",
          opacity: out ? 0 : 1,
          transition:
            `transform ${TRANSITION_MS}ms cubic-bezier(.5,0,.2,1), ` +
            `opacity ${TRANSITION_MS}ms cubic-bezier(.5,0,.2,1)`,
          pointerEvents: out ? "none" : "auto",
        }}
        aria-live="polite"
      >
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {SLIDES[idx].icon}
        </div>
        <h2
          style={{
            margin: 0,
            marginBottom: 10,
            fontWeight: 700,
            fontSize: "1.46em",
            color: COLORS.primary,
            letterSpacing: "0.007em"
          }}
        >
          {SLIDES[idx].title}
        </h2>
        <div
          style={{
            marginBottom: 25,
            fontSize: 18,
            color: "#434843",
            fontWeight: 450,
            maxWidth: 350,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.34
          }}
        >
          {SLIDES[idx].desc}
        </div>
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 9,
          marginBottom: 26,
          marginTop: 10
        }}>
          {[...Array(SLIDES.length).keys()].map(i => (
            <span
              key={i}
              aria-label={i === idx ? "Current step" : undefined}
              style={{
                display: "inline-block",
                width: 13,
                height: 13,
                borderRadius: "50%",
                margin: "0 2px",
                background: i === idx ? COLORS.accent : "#E7F6EC",
                border: i === idx
                  ? `2.5px solid ${COLORS.primary}`
                  : `2px solid #e1efe4`,
                transition: "background 0.35s, border 0.38s"
              }}
            />
          ))}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 14
        }}>
          {idx < SLIDES.length - 1 ? (
            <button
              className="onboarding-next"
              aria-label="Next"
              style={{
                background: COLORS.accent,
                color: "#322009",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 17,
                padding: "11px 36px",
                cursor: "pointer",
                outline: "none",
                marginRight: 0,
                transition: "background 0.25s"
              }}
              onClick={nextSlide}
              tabIndex={0}
            >
              Next
              <span style={{ fontSize: 20, marginLeft: 7 }}>→</span>
            </button>
          ) : (
            <button
              className="onboarding-finish"
              aria-label="Get Started"
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 18,
                padding: "11px 38px",
                cursor: "pointer",
                outline: "none",
                marginRight: 0,
                transition: "background 0.25s"
              }}
              onClick={finishOnboarding}
              tabIndex={0}
              autoFocus
            >
              Get Started&nbsp;<span role="img" aria-label="Go!">✨</span>
            </button>
          )}
        </div>
        <button
          className="onboarding-skip"
          type="button"
          aria-label="Skip"
          style={{
            marginTop: 28,
            background: "none",
            border: "none",
            color: "#8AB0B2",
            fontWeight: 500,
            fontSize: "1.0em",
            textDecoration: "underline dotted #8AB0B2 2px",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={finishOnboarding}
          tabIndex={0}
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}

export default OnboardingSlides;
