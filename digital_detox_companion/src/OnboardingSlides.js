import React, { useState, useEffect } from "react";

/**
 * Playful Onboarding Slides for Digital Detox Companion
 *
 * Minimalist, light-themed, whimsical onboarding with slide-in/out animations,
 * brand accent color, emoji icons, and a localStorage 'onboarded' flag.
 *
 * Usage: Show on first visit, hide after "Get Started".
 */

// Color matches app brand vars
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  text: "#1A1A1A",
  bg: "#fff"
};

const SLIDES = [
  {
    title: "Welcome to Digital Detox Companion!",
    icon: "🌱",
    desc: "Grow better habits for a brighter, more present you."
  },
  {
    title: "Tiny Steps, Big Wins",
    icon: "🎯",
    desc: "Personal plans, playful rewards, and positive progress."
  },
  {
    title: "Go Offline, Thrive IRL",
    icon: "🌳",
    desc: "Log real-world moments, pair with a buddy, and celebrate your wins!"
  },
  {
    title: "Ready for your journey?",
    icon: "✨",
    desc: "Let’s start! Your buddy and rewards await."
  }
];

// PUBLIC_INTERFACE
function OnboardingSlides({ onComplete }) {
  /**
   * Controls slide index, animation state, and only shows if "onboarded" is not set.
   */
  const [show, setShow] = useState(() => {
    // Only show if onboarded flag is not set
    try {
      return localStorage.getItem("onboarded") !== "yes";
    } catch {
      return true;
    }
  });
  const [index, setIndex] = useState(0);
  const [animDir, setAnimDir] = useState(null); // 'left' | 'right' for slide transition
  const slideCount = SLIDES.length;

  useEffect(() => {
    if (!show) return;
    // Lock body scroll behind the onboarding overlay for accessibility
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Advance slide with playful slide-right animation
  function next() {
    if (index < slideCount - 1) {
      setAnimDir("right");
      setTimeout(() => {
        setIndex((i) => i + 1);
        setAnimDir(null);
      }, 300);
    } else {
      finish();
    }
  }

  function prev() {
    if (index > 0) {
      setAnimDir("left");
      setTimeout(() => {
        setIndex((i) => i - 1);
        setAnimDir(null);
      }, 300);
    }
  }

  // Dismiss and set localStorage flag
  function finish() {
    setShow(false);
    try {
      localStorage.setItem("onboarded", "yes");
    } catch { /* Ignore for privacy-blocked browsers */ }
    // Notify parent if desired
    if (typeof onComplete === "function") onComplete();
  }

  if (!show) return null;

  // Animation: slide-in/out from right or left, fade in. (Minimal, performant)
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div
          style={{
            ...styles.slide,
            ...(animDir === "right"
              ? styles.slideOutLeft
              : animDir === "left"
              ? styles.slideOutRight
              : styles.slideIn
            ),
            // Add a whimsical floating accent icon
          }}
        >
          <div style={styles.icon} aria-hidden>{SLIDES[index].icon}</div>
          <h2 style={styles.title}>{SLIDES[index].title}</h2>
          <p style={styles.desc}>{SLIDES[index].desc}</p>
          <div style={styles.dots}>
            {SLIDES.map((_, i) => (
              <span
                key={i}
                style={{
                  ...styles.dot,
                  background: i === index ? COLORS.accent : "#E7F6EC",
                  transform: i === index ? "scale(1.2)" : "scale(1)"
                }}
              />
            ))}
          </div>
          <div style={styles.controls}>
            <button
              style={{
                ...styles.btn,
                ...styles.prev,
                visibility: index === 0 ? "hidden" : "visible"
              }}
              onClick={prev}
              tabIndex={index === 0 ? -1 : 0}
              aria-label="Previous"
            >
              ←
            </button>
            {index < slideCount - 1 ? (
              <button style={styles.btn} onClick={next} aria-label="Next">
                Next →
              </button>
            ) : (
              <button
                style={{
                  ...styles.btn,
                  background: COLORS.primary,
                  color: "#fff"
                }}
                onClick={finish}
                aria-label="Get Started"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
        {/* playful floating accent, for subtle animation */}
        <div style={styles.cornerAccent} aria-hidden>💡</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    zIndex: 2009,
    background: "rgba(255,255,255,0.97)",
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    position: "relative",
    width: 350, maxWidth: "90vw",
    minHeight: 395,
    borderRadius: 22,
    background: "#fff",
    boxShadow: "0 4px 54px 0 rgba(46,125,50,0.08), 0 2px 8px 0 #DFEDDE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "visible",
    transition: "box-shadow 0.18s"
  },
  slide: {
    padding: "38px 26px 30px",
    textAlign: "center",
    minHeight: 335,
    transition: "transform 0.33s cubic-bezier(.61,1.1,.23,1), opacity 0.33s",
    background: "#fff",
    borderRadius: 18,
    position: "relative",
    width: 298, // visually pleasing on phones/desktops
    margin: "0 auto"
  },
  slideIn: {
    opacity: 1,
    transform: "translateX(0%)"
  },
  slideOutLeft: {
    opacity: 0.15,
    transform: "translateX(-120%)"
  },
  slideOutRight: {
    opacity: 0.15,
    transform: "translateX(120%)"
  },
  icon: {
    fontSize: 48,
    marginBottom: 4,
    animation: "icon-bounce 1.15s cubic-bezier(.59,1.4,.44,1.14) 1"
  },
  title: {
    color: COLORS.primary,
    fontWeight: 700,
    fontSize: 24,
    margin: "15px 0 10px"
  },
  desc: {
    color: "#789262",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.42,
    margin: "0 0 32px"
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    margin: "28px 0 18px"
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    display: "inline-block",
    background: COLORS.accent,
    transition: "background 0.18s, transform 0.24s"
  },
  controls: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  btn: {
    border: "none",
    borderRadius: 12,
    background: COLORS.accent,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 600,
    padding: "8px 22px",
    minWidth: 70,
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 #DCEBC7",
    transition: "background 0.16s",
  },
  prev: {
    background: "#E7F6EC",
    color: COLORS.primary
  },
  cornerAccent: {
    position: "absolute",
    top: -27, right: 24,
    fontSize: 30,
    opacity: 0.22,
    userSelect: "none",
    pointerEvents: "none",
    animation: "spin 5.5s linear infinite"
  }
};

/* Extra keyframes in JS-injected CSS, since inline style can't do keyframes or global selectors */
const injectedKeyframes = `
@keyframes icon-bounce {
  0%{transform:translateY(-12px) scale(1.03);}
  18%{transform:translateY(-9px) scale(1.07);}
  32%{transform:translateY(-5px) scale(1.13);}
  55%{transform:translateY(0px) scale(1);}
  100%{transform:translateY(0px) scale(1);}
}
@keyframes spin {
  0%{transform:rotate(0deg);}
  100%{transform:rotate(360deg);}
}
`;

// Inject extra keyframes on first usage of component if not already present
(function injectCSS() {
  if (!document.getElementById("onboarding-slides-keyframes")) {
    const style = document.createElement("style");
    style.id = "onboarding-slides-keyframes";
    style.textContent = injectedKeyframes;
    document.head.appendChild(style);
  }
})();

export default OnboardingSlides;
