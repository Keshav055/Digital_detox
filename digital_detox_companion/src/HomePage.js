import React from "react";

/**
 * HomePage
 * PUBLIC_INTERFACE
 *
 * Clean, accessible home page for Digital Detox Companion.
 * - Displays app description, use case, and unique features.
 * - Brand colors: primary (#2E7D32), secondary (#B2DFDB), accent (#FFD600).
 * - Light theme, minimal style, accessible, responsive.
 */
function HomePage() {
  const COLORS = {
    primary: "#2E7D32",
    secondary: "#B2DFDB",
    accent: "#FFD600",
    text: "#1A1A1A",
    bg: "#fff"
  };

  const featureList = [
    "Personalized Digital Detox Plans",
    "Anonymous Accountability Buddy System",
    "Real-World Milestone Rewards",
    "Off-Grid Check-In System",
    "AI-Powered Reflection & Habit Journal",
  ];

  return (
    <section
      style={{
        margin: "0 auto",
        maxWidth: 820,
        background: COLORS.bg,
        color: COLORS.text,
        borderRadius: 15,
        padding: "32px 18px 24px",
        boxShadow: "0 2px 16px 0 rgba(44,125,50,0.035)",
        marginTop: 42,
        marginBottom: 34,
      }}
      aria-label="Home page: Digital Detox Companion"
    >
      <h1
        style={{
          fontSize: "2.3rem",
          fontWeight: 700,
          color: COLORS.primary,
          marginBottom: 8,
          letterSpacing: ".015em"
        }}
      >
        💡 Digital Detox Companion
      </h1>
      <p
        style={{
          fontSize: "1.23rem",
          color: COLORS.secondary,
          maxWidth: 670,
          fontWeight: 500,
          marginBottom: 12,
          lineHeight: 1.55,
        }}
      >
        Digital Detox Companion helps users reduce social media use by offering personalized detox plans, accountability through buddy pairing, real-world rewards, check-ins, and AI-powered journaling to promote healthier tech habits.
      </p>

      {/* Use Case */}
      <h2 style={{ color: COLORS.primary, fontSize: "1.22rem", marginTop: 29, marginBottom: 6, fontWeight: 700 }}>
        Use Case
      </h2>
      <div
        style={{
          background: COLORS.secondary,
          color: COLORS.primary,
          borderRadius: 10,
          padding: "13px 19px",
          fontWeight: 500,
          fontSize: "1.06rem",
          marginBottom: 12,
          boxShadow: "0 1px 8px #b2dfdb11"
        }}
      >
        For individuals seeking to manage or reduce their digital and social media engagement via structured, supportive, and rewarding mechanisms—with a focus on real-world benefits, reflection, and community support.
      </div>

      {/* Unique Features */}
      <h2 style={{ color: COLORS.primary, fontSize: "1.22rem", marginTop: 23, marginBottom: 8, fontWeight: 700 }}>
        Unique Features
      </h2>
      <ul style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        maxWidth: 560,
        fontSize: "1.04rem",
        color: COLORS.text
      }}>
        {featureList.map((item, i) => (
          <li key={item} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 13,
            background: "#F8FBF8",
            borderRadius: 8,
            padding: "10px 16px",
            boxShadow: "0 1px 5px #B2DFDB11",
            fontWeight: 500,
          }}>
            <span
              aria-hidden="true"
              style={{
                fontSize: 17,
                marginRight: 13,
                color: COLORS.accent,
                fontWeight: 700,
                verticalAlign: "middle"
              }}
            >
              {String.fromCodePoint(0x2714)}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Call to action / Footer for Home Page */}
      <div style={{
        marginTop: 32,
        background: "#FFFDE7",
        borderRadius: 8,
        color: "#B49A26",
        fontWeight: 600,
        fontSize: 15.5,
        padding: "15px 18px"
      }}>
        Start your journey: Embrace mindful tech use, connect with a buddy, and celebrate your real-world achievements!
      </div>
    </section>
  );
}

export default HomePage;
