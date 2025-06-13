import React from "react";

/**
 * HomePage component for the Digital Detox Companion app.
 * Displays a welcoming description, app use case, and the five main features.
 * Clean layout, light theme, and uses brand colors: primary (#2E7D32), secondary (#B2DFDB), accent (#FFD600).
 * PUBLIC_INTERFACE
 */
function HomePage() {
  const COLORS = {
    primary: "#2E7D32",
    secondary: "#B2DFDB",
    accent: "#FFD600",
    lightbg: "#fff",
    darktext: "#1A1A1A"
  };

  const features = [
    {
      name: "Personalized Digital Detox Plans",
      desc: "Receive tailored strategies to help you ease into healthier digital habits.",
      icon: "📆",
    },
    {
      name: "Accountability Buddy System",
      desc: "Pair anonymously with a buddy for mutual motivation and support.",
      icon: "🤝",
    },
    {
      name: "Real-World Milestone Rewards",
      desc: "Earn rewards for meeting your offline goals and celebrating progress.",
      icon: "🎁",
    },
    {
      name: "Off-Grid Check-In System",
      desc: "Log real-world activities to reinforce time spent away from screens.",
      icon: "📍",
    },
    {
      name: "AI-Powered Reflection & Habit Journal",
      desc: "Use AI-guided prompts to reflect and track your journey.",
      icon: "📝",
    },
  ];

  return (
    <section
      style={{
        marginTop: 40,
        marginBottom: 32,
        background: COLORS.lightbg,
        borderRadius: 16,
        boxShadow: "0 1.5px 19px #B2DFDB14",
        padding: "38px 26px 34px 26px",
        maxWidth: 780,
        minHeight: 420,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h1
        style={{
          color: COLORS.primary,
          fontSize: "2.35rem",
          fontWeight: 700,
          marginBottom: 7,
        }}
      >
        Welcome to Digital Detox Companion
      </h1>
      <div
        style={{
          color: COLORS.secondary,
          fontWeight: 600,
          fontSize: "1.2rem",
          marginBottom: 16,
          letterSpacing: 0.01,
        }}
      >
        Mindful digital habits start here. Reclaim your time, boost real-world connections, and thrive beyond the screen.
      </div>
      <div
        style={{
          color: COLORS.darktext,
          fontSize: "1.09rem",
          marginBottom: 26,
          fontWeight: 500,
          maxWidth: 590,
        }}
      >
        <span style={{ color: COLORS.primary, fontWeight: 600 }}>Use case:</span>{" "}
        This app helps you reduce social media use through personalized plans
        and real-life rewards – all while encouraging you to spend less time in
        the app itself and more time engaged with the world around you.
      </div>
      <hr
        style={{
          border: `1.5px solid ${COLORS.secondary}`,
          background: COLORS.secondary,
          margin: "18px 0 28px 0",
          opacity: 0.4,
        }}
      />
      <div>
        <h2
          style={{
            color: COLORS.primary,
            fontSize: "1.43rem",
            fontWeight: 700,
            marginBottom: 19,
            letterSpacing: 0.002,
          }}
        >
          Key Features
        </h2>
        <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 23,
          }}>
          {features.map((f, idx) => (
            <li
              key={f.name}
              style={{
                display: "flex",
                alignItems: "flex-start",
                background: idx % 2 === 0 ? "#F8FBF8" : "#FFFDE6",
                borderLeft: `6px solid ${idx % 2 === 0 ? COLORS.primary : COLORS.accent}`,
                borderRadius: 10,
                padding: "19px 19px 15px 19px",
                boxShadow: "0 2px 6px #b2dfdb16",
                gap: 17,
                minHeight: 84
              }}
            >
              <span
                style={{
                  fontSize: 29,
                  marginRight: 6,
                  marginTop: 2
                }}
                aria-hidden="true"
              >{f.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.primary, fontSize: 16.2, marginBottom: 6 }}>
                  {f.name}
                </div>
                <div style={{ color: "#669388", fontWeight: 400, fontSize: 14.5 }}>{f.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          marginTop: 36,
          textAlign: "center",
          color: COLORS.accent,
          fontSize: 15.6,
          fontWeight: 700,
          letterSpacing: 0.03,
        }}
      >
        Ready to begin your digital detox journey? Explore the tabs above to get started!
      </div>
    </section>
  );
}

export default HomePage;
