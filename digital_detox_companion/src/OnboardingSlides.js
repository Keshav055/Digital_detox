import React, { useState, useRef, useEffect } from "react";

/**
 * OnboardingSlides - playful, minimal, animated onboarding for first-app visit.
 * - Uses accent colors and whimsical SVG/emoji icons
 * - Smooth slide transitions (CSS transform + fade)
 * - Only shows on first visit (localStorage 'onboarded' key)
 * - Calls onComplete prop when finished or skipped
 *
 * Integration: Place <OnboardingSlides onComplete={...} /> in your root.
 *
 * Props:
 *   - onComplete(): called when onboarding completes or is skipped
 */

// Accent palette
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#FFFDE7",
  text: "#1A1A1A",
  slideBg: "#FEFFE4",
};

// Whimsical SVG icons for slides
const Icons = [
  // Light bulb - for discovery
  <svg width="48" height="48" viewBox="0 0 64 64" key="bulb">
    <circle cx="32" cy="32" r="28" fill={COLORS.accent} />
    <ellipse cx="32" cy="30" rx="14" ry="16" fill="#fffde7" />
    <rect x="27" y="41" width="10" height="13" rx="5" fill="#EDEDED" />
    <rect x="28" y="46" width="8" height="6" rx="3" fill={COLORS.accent} />
    <circle cx="32" cy="33" r="3.7" fill={COLORS.accent} />
    <ellipse cx="32" cy="22" rx="6.2" ry="5" fill="#fffde7" opacity="0.7"/>
  </svg>,
  // Friendly handshake (buddy system)
  <svg width="48" height="48" viewBox="0 0 64 64" key="buddy">
    <circle cx="32" cy="32" r="28" fill={COLORS.secondary} />
    <ellipse cx="23" cy="28" rx="6" ry="8" fill="#fff" />
    <ellipse cx="41" cy="28" rx="6" ry="8" fill="#fff" />
    <rect x="20" y="36" width="24" height="8" rx="4" fill="#DBF5DF" />
    <path d="M27 32 Q28 36 32 36 Q36 36 37 32" stroke={COLORS.primary} strokeWidth="2" fill="none" />
    <circle cx="23" cy="25" r="1.5" fill={COLORS.primary}/>
    <circle cx="41" cy="25" r="1.5" fill={COLORS.primary}/>
    {/* Whimsical smile */}
    <path d="M24 32 Q23 34 28 35" stroke="#aaa" strokeWidth="1.2" fill="none"/>
    <path d="M40 32 Q41 34 36 35" stroke="#aaa" strokeWidth="1.2" fill="none"/>
  </svg>,
  // Trophy - rewards
  <svg width="48" height="48" viewBox="0 0 64 64" key="trophy">
    <circle cx="32" cy="32" r="28" fill={COLORS.accent} />
    <ellipse cx="32" cy="28" rx="12" ry="10" fill="#fffde7" />
    <rect x="24" y="38" width="16" height="6" rx="3" fill="#FFD60099" />
    <rect x="29" y="42" width="6" height="9" rx="3" fill="#dac116" />
    <ellipse cx="23" cy="29" rx="3" ry="4" fill="#FFE98080" />
    <ellipse cx="41" cy="29" rx="3" ry="4" fill="#FFE98080" />
    <path d="M20 25 Q16 35 28 37" stroke="#d5bc19" strokeWidth="2" fill="none"/>
    <path d="M44 25 Q48 35 36 37" stroke="#d5bc19" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="29" r="2.3" fill="#FFD600" />
  </svg>,
  // Hiking boot/tree - real life & outdoor
  <svg width="48" height="48" viewBox="0 0 64 64" key="tree">
    <circle cx="32" cy="32" r="28" fill={COLORS.secondary} />
    <ellipse cx="32" cy="24" rx="11" ry="10" fill="#A4D861" />
    <ellipse cx="38" cy="32" rx="8" ry="8" fill="#C5EC8B" />
    <ellipse cx="26" cy="30" rx="8" ry="7" fill="#FFE980" opacity="0.33"/>
    <rect x="29" y="35" width="6" height="10" rx="2" fill="#7A5632" />
    <ellipse cx="32" cy="44" rx="4" ry="2.2" fill="#DEC792" />
  </svg>,
];

// Playful onboarding slide content
const slides = [
  {
    title: "Welcome!",
    desc: "Meet your Digital Detox Companion. We’ll help you find more fun, offline moments.",
    icon: Icons[0],
    bg: "#fffbe8",
  },
  {
    title: "Find A Buddy",
    desc: "Pair up anonymously for motivation and support. Cheering you on is fun!",
    icon: Icons[1],
    bg: "#e8fcf8",
  },
  {
    title: "Earn Real Rewards",
    desc: "Unlock coffee vouchers, activity passes, and more as you reach milestones.",
    icon: Icons[2],
    bg: "#fffbe8",
  },
  {
    title: "Go Off-Grid",
    desc: "Check-in to real-world activities — your journey is about enjoying life offline.",
    icon: Icons[3],
    bg: "#f4ffe8",
  },
];

// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideRef = useRef(null);

  // Dismiss onboarding: set flag and callback
  function finishOnboarding() {
    try { localStorage.setItem("onboarded", "yes"); } catch {}
    if (onComplete) onComplete();
  }

  // Next slide with animation
  function handleNext() {
    if (index < slides.length - 1) {
      setAnimating(true);
      // Animate out, then increment
      setTimeout(() => {
        setAnimating(false);
        setIndex((i) => i + 1);
      }, 350);
    } else {
      finishOnboarding();
    }
  }

  // Skip onboarding
  function handleSkip() {
    finishOnboarding();
  }

  // Keyboard: allow right-arrow/space/enter to advance; esc to skip
  useEffect(() => {
    function onKeyDown(e) {
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        handleNext();
      } else if (e.key === "Escape") {
        handleSkip();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [index]);

  // While showing, prevent background scroll/tabs
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, []);

  // Only show if onboarding is not yet complete
  try {
    if (typeof window !== "undefined" && localStorage.getItem("onboarded") === "yes") {
      return null;
    }
  } catch {}

  const slide = slides[index];

  return (
    <div
      className="onboarding-overlay"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: "rgba(250, 255, 245, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        ref={slideRef}
        className={`onboarding-slide${animating ? " slide-out" : ""}`}
        style={{
          width: 340,
          maxWidth: "94vw",
          background: slide.bg,
          borderRadius: 22,
          padding: "38px 25px 22px",
          boxShadow: "0 7px 38px 0 rgba(24,60,20,0.11)",
          textAlign: "center",
          color: COLORS.text,
          userSelect: "none",
          position: "relative",
          transition: "box-shadow .18s",
          outline: "none",
        }}
        tabIndex={0}
      >
        <div style={{
          width: 58, height: 58, borderRadius: "50%",
          background: "#fff",
          margin: "0 auto 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 2px 8px 0 ${COLORS.accent}22`,
        }}>
          {slide.icon}
        </div>
        <h2 style={{ fontSize: "2rem", marginBottom: 9, color: COLORS.primary, fontWeight: 700, letterSpacing: 0.01 }}>
          {slide.title}
        </h2>
        <div style={{ fontSize: "1.16rem", color: "#6B7C5A", marginBottom: 14, fontWeight: 500, minHeight: 48 }}>
          {slide.desc}
        </div>

        {/* Slide indicators */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 9,
          marginBottom: 16,
          marginTop: 13
        }}>
          {slides.map((_, i) => (
            <span key={i}
              style={{
                display: "block",
                width: i === index ? 18 : 8,
                height: 8,
                borderRadius: 8,
                transition: "width 0.3s, background 0.17s",
                background: i === index ? COLORS.accent : "#E6E6DB",
                opacity: i === index ? 1 : 0.5,
              }}
              aria-label={i === index ? "Active slide" : undefined}
            />
          ))}
        </div>

        {/* Navigation controls */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button
            onClick={handleSkip}
            style={{
              background: "none",
              border: "none",
              color: "#BDA506",
              fontSize: 15,
              padding: "6px 13px",
              fontWeight: 500,
              borderRadius: 7,
              cursor: "pointer",
              outline: "none",
              transition: "color .17s",
              textDecoration: "underline",
            }}
            aria-label="Skip onboarding"
            tabIndex={0}
          >Skip</button>
          <button
            onClick={handleNext}
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              padding: "8px 24px",
              boxShadow: `0 1px 6px 0 ${COLORS.primary}24`,
              marginLeft: 4,
              cursor: "pointer",
              transition: "background .18s",
              outline: "none",
              letterSpacing: 0.01,
            }}
            tabIndex={0}
            aria-label={index === slides.length - 1 ? "Finish onboarding" : "Next slide"}
            autoFocus
          >
            {index === slides.length - 1 ? "Start" : "Next"}
          </button>
        </div>
      </div>
      {/* CSS: slide transition */}
      <style>
        {`
        .onboarding-slide {
          transition: transform 0.43s cubic-bezier(.67,0,.33,1), opacity 0.37s cubic-bezier(.5,0,.5,1);
          transform: translateY(0px) scale(1) rotate(-1deg);
          opacity: 1;
        }
        .onboarding-slide.slide-out {
          transform: translateY(90px) scale(0.96) rotate(2deg);
          opacity: 0;
        }
        .onboarding-slide:focus {
          box-shadow: 0 0 0 3px ${COLORS.accent}55;
        }
        `}
      </style>
    </div>
  );
}

export default OnboardingSlides;
