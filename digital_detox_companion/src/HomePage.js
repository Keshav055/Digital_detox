import React from "react";

// Color palette from App.js/App.css
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A"
};

// PUBLIC_INTERFACE
function HomePage({ onNavigate }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 32,
        alignItems: "flex-start",
        marginTop: 40,
        marginBottom: 36,
        minHeight: 400
      }}
    >
      {/* Main Content */}
      <div style={{ flex: 3, minWidth: 0 }}>
        <div>
          <h1
            style={{
              color: COLORS.primary,
              fontSize: "2.2rem",
              letterSpacing: 0.01,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Welcome to your Digital Detox Companion
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: COLORS.secondary,
              marginTop: 0,
              marginBottom: 18,
              fontWeight: 500
            }}
          >
            Create healthier habits, win real-life rewards, and rediscover life beyond your screen.
          </p>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/assets/detox-illustration.svg"}
          alt="Detox"
          style={{
            width: "88%",
            maxWidth: 360,
            minWidth: 200,
            margin: "32px 0"
          }}
        />
        <section style={{marginTop: 15, marginBottom: 0}}>
          <h2 style={{color: COLORS.primary, fontSize: "1.5rem", marginBottom: 8}}>
            Your Journey Starts Here
          </h2>
          <ul style={{ fontSize: 17, color: COLORS.text, paddingLeft: 18, marginTop: 0 }}>
            <li>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>🏅</span> Personalized detox plans
            </li>
            <li>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>🤝</span> Buddy for accountability
            </li>
            <li>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>🎁</span> Milestone rewards
            </li>
            <li>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>🌳</span> Off-grid check-ins
            </li>
            <li>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>💡</span> AI reflection prompts
            </li>
          </ul>
        </section>
      </div>

      {/* Sidebar with Explore More */}
      <aside
        style={{
          flex: 1,
          minWidth: 230,
          maxWidth: 285,
          background: COLORS.secondary,
          borderRadius: 16,
          boxShadow: "0 3px 8px 0 rgba(46, 125, 50, 0.04)",
          padding: "26px 20px 18px 20px",
          color: COLORS.primary,
          fontWeight: 500,
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            fontSize: "1.23rem",
            color: COLORS.primary,
            fontWeight: 600,
            marginBottom: 9,
            letterSpacing: 0.01
          }}
        >
          Explore More
        </div>
        <ul style={{listStyle: "none", padding: 0, margin: 0}}>
          <li>
            <SidebarLink onClick={() => onNavigate && onNavigate('plan')} icon="🗺️" text="Detox Plan" />
          </li>
          <li>
            <SidebarLink onClick={() => onNavigate && onNavigate('buddy')} icon="🤝" text="Accountability Buddy" />
          </li>
          <li>
            <SidebarLink onClick={() => onNavigate && onNavigate('rewards')} icon="🎉" text="Milestone Rewards" />
          </li>
          <li>
            <SidebarLink onClick={() => onNavigate && onNavigate('checkin')} icon="✅" text="Off-Grid Check-Ins" />
          </li>
          <li>
            <SidebarLink onClick={() => onNavigate && onNavigate('journal')} icon="📝" text="Habit Journal" />
          </li>
        </ul>
        <div
          style={{
            fontSize: 15,
            color: "#24553f",
            opacity: 0.85,
            marginTop: 24,
            lineHeight: 1.4
          }}
        >
          Need a break? Try one mini detox game or discover our Community Circles!
        </div>
        <button
          style={{
            marginTop: 18,
            padding: "9px 20px",
            borderRadius: 5,
            background: COLORS.accent,
            color: "#313619",
            border: "none",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            letterSpacing: 0.04,
            boxShadow: "0 2px 4px 0 rgba(46,125,50,0.08)"
          }}
          onClick={() => onNavigate && onNavigate('games')}
        >
          🎲 Mini Detox Games
        </button>
        <button
          style={{
            marginTop: 12,
            padding: "8px 17px",
            borderRadius: 5,
            background: "#fff",
            color: COLORS.primary,
            border: `1.3px solid ${COLORS.primary}`,
            fontWeight: 550,
            fontSize: 15,
            cursor: "pointer"
          }}
          onClick={() => onNavigate && onNavigate('circles')}
        >
          🫂 Community Circles
        </button>
      </aside>
    </div>
  );
}

// Sidebar link styled for palette consistency
function SidebarLink({ onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        color: COLORS.primary,
        fontWeight: 500,
        fontSize: "1.05rem",
        padding: "7px 0",
        cursor: "pointer",
        gap: 8,
        borderRadius: 4,
        transition: "background 0.14s",
        marginBottom: 2
      }}
      onMouseOver={e => (e.currentTarget.style.background = "#b2dfdb33")}
      onMouseOut={e => (e.currentTarget.style.background = "none")}
    >
      <span style={{ fontSize: 17, marginRight: 5 }}>{icon}</span>
      {text}
    </button>
  );
}

export default HomePage;
