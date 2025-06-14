import React, { useState, useEffect, useRef } from "react";

/**
 * OnboardingSlides - playful onboarding for first visit, supports transitions,
 * uses minimal/kavia brand colors and whimsical icons, and localStorage for first-visit logic.
 *
 * Usage:
 *   <OnboardingSlides onComplete={() => ...} />
 */
// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  // Minimal palette, matched to main app's: see App.js and App.css
  const COLORS = {
    primary: "#2E7D32",
    accent: "#FFD600",
    bg: "#fff",
    dark: "#1A1A1A"
  };

  // Slides content: emoji icon, playful headline, and a description or nudge
  const slides = [
    {
      icon: "🦄",
      title: "Welcome to Digital Detox Companion!",
      desc: "Ready to rediscover the magic of offline life? Let’s set you up for success!",
      bg: COLORS.accent
    },
    {
      icon: "🎯",
      title: "Personal Detox Plan",
      desc: "You get a tailor-made roadmap to cut screen time and win real-world rewards.",
      bg: "#F4FCF8"
    },
    {
      icon: "🤝",
      title: "Accountability Buddy",
      desc: "You’ll be paired (anonymously!) with a buddy. Cheer each other on with streaks!",
      bg: "#FFFADD"
    },
    {
      icon: "🌳",
      title: "Celebrate Offline Wins",
      desc: "Milestone? Check-in? Go outside. The real fun’s beyond the app. 🌱",
      bg: "#F4FCF8"
    },
    {
      icon: "💡",
      title: "Ready to Begin?",
      desc: "Let’s get started—and remember, spend less time here, more time out there!",
      bg: COLORS.accent
    }
  ];

  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const animateTimeout = useRef(null);

  // Set localStorage key when onboarding is finished
  function finishOnboarding() {
    try {
      localStorage.setItem("onboarded", "yes");
    } catch {}
    setExiting(true);
    // Give transition time before exiting visually
    animateTimeout.current = setTimeout(() => {
      if (onComplete) onComplete();
    }, 540);
  }

  useEffect(() => {
    return () => {
      if (animateTimeout.current) {
        clearTimeout(animateTimeout.current);
      }
    };
  }, []);

  // Next slide, or finish if last
  function handleNext() {
    if (current === slides.length - 1) {
      finishOnboarding();
    } else {
      setCurrent(i => i + 1);
    }
  }

  // Optional: allow escape to skip onboarding
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") finishOnboarding();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
    // eslint-disable-next-line
  }, []);

  // Stylized playful progress (dots)
  function ProgressDots() {
    return (
      <div style={{
        display: "flex", gap: 7, justifyContent: "center", alignItems: "center", marginTop: 38
      }}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: idx === current ? 20 : 10,
              height: 10,
              borderRadius: 30,
              background: idx === current ? COLORS.primary : "#E0F3D7",
              transition: "all 0.34s cubic-bezier(.58,0,.38,1)"
            }}
            aria-label={idx === current ? "Current slide" : undefined}
          />
        ))}
      </div>
    );
  }

  // Slide in-out animation styles: simple fade+slide
  const slideStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: exiting ? 0 : 1,
    transform: exiting ? "scale(0.98) translateY(-36px) rotateZ(-2deg)" : "scale(1) translateY(0) rotateZ(0deg)",
    transition: "all 0.54s cubic-bezier(.55,.02,.2,1)"
  };

  // Light minimal overlay for onboarding
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1006,
        background: "rgba(255,255,255,0.98)",
        color: COLORS.dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: exiting ? "none" : "auto",
        transition: "opacity 0.54s",
        opacity: exiting ? 0 : 1,
      }}
    >
      <div
        className="onboarding-slide"
        style={{
          ...slideStyle,
          width: "90vw",
          maxWidth: 410,
          borderRadius: 20,
          boxShadow: "0 4px 26px 0 rgba(50,102,14,0.10)",
          background: slides[current].bg,
          minHeight: 385,
          padding: "42px 18px 37px 18px",
          border: `2px solid ${COLORS.primary}07`
        }}
      >
        {/* Whimsical icon with slight animation */}
        <div
          aria-label="Slide icon"
          style={{
            fontSize: 58,
            marginBottom: 20,
            filter: "drop-shadow(0 0 2px #FFD60044)",
            transform: `scale(${exiting ? 0.85 : 1.12}) rotateZ(${current*12-10}deg)`,
            transition: "transform 0.32s cubic-bezier(.47,1.64,.41,.8)"
          }}
        >
          {slides[current].icon}
        </div>
        <h1 style={{
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.primary,
          textAlign: "center",
          letterSpacing: "0.01em",
          marginBottom: 9,
          textShadow: "0 2px 0 #FFD60022",
        }}>
          {slides[current].title}
        </h1>
        <div style={{
          fontSize: 17,
          fontWeight: 400,
          color: "#36543B",
          textAlign: "center",
          minHeight: 44,
          maxWidth: 340,
          lineHeight: 1.53,
          margin: "0 auto 10px auto"
        }}>
          {slides[current].desc}
        </div>

        <ProgressDots />

        {/* Next/Finish Button */}
        <button
          type="button"
          className="btn-onboard-next"
          onClick={handleNext}
          style={{
            marginTop: 25,
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            padding: "12px 36px",
            borderRadius: 9,
            fontWeight: 600,
            fontSize: 17,
            transition: "background 0.19s",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 #B2DFDB18",
            letterSpacing: ".01em"
          }}
        >
          {current === slides.length - 1 ? "Let’s Go!" : "Next"}
        </button>

        {/* Skip for impatient users */}
        <button
          type="button"
          onClick={finishOnboarding}
          style={{
            marginTop: 16,
            background: "none",
            color: COLORS.primary,
            border: "none",
            fontWeight: 400,
            fontSize: 14,
            textDecoration: "underline",
            opacity: 0.52,
            cursor: "pointer"
          }}
          tabIndex={0}
          aria-label="Skip onboarding"
        >Skip</button>
      </div>
    </div>
  );
}

export default OnboardingSlides;
