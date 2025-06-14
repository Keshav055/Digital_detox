import React, { useState, useRef, useEffect } from "react";

/**
 * OnboardingSlides
 * Playful onboarding experience shown only on first visit (localStorage 'onboarded').
 * Features: minimal+playful slide layout, whimsical/emoji icons, accent colors, animated transitions.
 * Accepts: onComplete (callback for "Get Started" or skip)
 *
 * Usage: <OnboardingSlides onComplete={...} />.
 */
const SLIDES = [
  {
    // Welcome
    title: "Welcome to Your Digital Detox Companion!",
    description: "Ready for a fun challenge? Let's help you get more out of your day—offline and on your own terms.",
    icon: "🌱",
    accentColor: "#FFD600",
    bg: "#fffbe7"
  },
  {
    // Plan
    title: "Personal Detox Plans",
    description: "Set achievable screen goals, track progress, and celebrate small wins! Less scrolling, more you.",
    icon: "📆",
    accentColor: "#2E7D32",
    bg: "#f2f8f3"
  },
  {
    // Buddy
    title: "Find a Buddy",
    description: "Pair up anonymously for encouragement and streaks. Share the journey, share the reward!",
    icon: "🤝",
    accentColor: "#B2DFDB",
    bg: "#e9faf6"
  },
  {
    // Rewards
    title: "Earn Real-World Rewards",
    description: "Hit milestones and unlock tangible perks. Motivation, meet celebration! 🎉",
    icon: "🎁",
    accentColor: "#FFD600",
    bg: "#fffbe7"
  },
  {
    // Off-grid
    title: "Go Off-Grid",
    description: "Check in to real-world adventures and build journaling habits for lasting change.",
    icon: "🌳",
    accentColor: "#2E7D32",
    bg: "#f2f8f3"
  },
  {
    // Ready
    title: "Ready to Begin?",
    description: "Let’s start your digital detox journey—offline fun awaits! Click below to get started.",
    icon: "🚀",
    accentColor: "#FFD600",
    bg: "#fffbe7"
  }
];

// Minimal transition style (fade/slide)
// CSS is inline for self-containment.
const slideStyles = {
  container: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.86)",
    backdropFilter: "blur(2px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderRadius: 18,
    maxWidth: 380,
    width: "95vw",
    margin: "0 12px",
    minHeight: 410,
    boxShadow: "0 8px 32px 0 rgba(70,116,46,0.09)",
    overflow: "hidden",
    border: "1px solid #FAF1C1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.35s"
  },
  icon: {
    fontSize: 64,
    marginTop: 32,
    marginBottom: 6
  },
  title: {
    fontWeight: 700,
    fontSize: "1.5rem",
    margin: "14px 0 7px 0",
    letterSpacing: "0.02em",
    textAlign: "center",
    color: "#2E7D32",
    lineHeight: 1.24
  },
  description: {
    color: "#475348",
    fontWeight: 450,
    fontSize: 18,
    marginBottom: 15,
    marginTop: 0,
    textAlign: "center",
    minHeight: 70
  },
  dotsWrap: {
    display: "flex",
    gap: 7,
    margin: "18px 0"
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    background: "#eee",
    transition: "background 0.22s",
    border: "1.5px solid #B2DFDB"
  },
  dotActive: {
    background: "#FFD600",
    border: "1.5px solid #2E7D32",
    boxShadow: "0 0 6px #FFD60099"
  },
  btnRow: {
    margin: "0 0 32px 0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 16
  },
  btn: {
    minWidth: 98,
    padding: "12px 13px",
    borderRadius: 8,
    border: "none",
    fontWeight: 600,
    fontSize: 16,
    background: "#2E7D32",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 rgba(46,125,50,0.08)",
    transition: "background 0.23s, color 0.25s",
    outline: "none"
  },
  btnAccent: {
    background: "#FFD600",
    color: "#313619"
  },
  skip: {
    fontSize: 15,
    color: "#BDB76B",
    background: "none",
    border: "none",
    marginTop: 3,
    cursor: "pointer"
  }
};

// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [animSlide, setAnimSlide] = useState("in"); // "in" | "out"
  const cardRef = useRef();

  // Slide animation (slide in/out)
  function nextSlide() {
    if (idx < SLIDES.length - 1) {
      setAnimSlide("out");
      setTimeout(() => {
        setIdx((i) => i + 1);
        setAnimSlide("in");
      }, 270);
    }
  }

  function prevSlide() {
    if (idx > 0) {
      setAnimSlide("out");
      setTimeout(() => {
        setIdx((i) => i - 1);
        setAnimSlide("in");
      }, 230);
    }
  }

  function handleComplete() {
    try {
      localStorage.setItem("onboarded", "yes");
    } catch {}
    if (onComplete) onComplete();
  }

  // Handle left/right arrow key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "Escape") handleComplete();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [idx]);

  const slide = SLIDES[idx];

  // Custom minimal slide/fade transition using inline style
  const slideAnimStyle = {
    opacity: animSlide === "in" ? 1 : 0,
    transform:
      animSlide === "in"
        ? "translateX(0)"
        : idx < SLIDES.length - 1
        ? "translateX(-30px)"
        : "translateX(30px)",
    transition: "opacity 260ms cubic-bezier(.7,0,.3,1), transform 260ms cubic-bezier(.7,0,.3,1)"
  };

  return (
    <div style={slideStyles.container} role="dialog" aria-modal="true" tabIndex={-1}>
      <div
        ref={cardRef}
        style={{
          ...slideStyles.card,
          background: slide.bg,
          boxShadow: slide.accentColor
            ? `0 8px 32px 0 ${slide.accentColor}27`
            : slideStyles.card.boxShadow,
          border: slide.accentColor ? `2.5px solid ${slide.accentColor}26` : slideStyles.card.border,
          ...slideAnimStyle
        }}
      >
        <div style={{ ...slideStyles.icon, color: slide.accentColor }}>{slide.icon}</div>
        <div style={slideStyles.title}>{slide.title}</div>
        <div style={slideStyles.description}>{slide.description}</div>
        <div style={slideStyles.dotsWrap} aria-label="slide progress">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              style={{
                ...slideStyles.dot,
                ...(i === idx ? slideStyles.dotActive : {})
              }}
              aria-current={i === idx ? "step" : undefined}
            />
          ))}
        </div>
        <div style={slideStyles.btnRow}>
          {idx > 0 && (
            <button
              type="button"
              style={slideStyles.btn}
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              ← Back
            </button>
          )}
          {idx < SLIDES.length - 1 ? (
            <button
              type="button"
              style={{ ...slideStyles.btn, ...slideStyles.btnAccent }}
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              style={{ ...slideStyles.btn, ...slideStyles.btnAccent, minWidth: 148, fontSize: 18 }}
              onClick={handleComplete}
              aria-label="Finish Onboarding"
            >
              Get Started!
            </button>
          )}
        </div>
        <button
          type="button"
          style={slideStyles.skip}
          onClick={handleComplete}
          aria-label="Skip Onboarding"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}

export default OnboardingSlides;
