import React from "react";

// Color palette for styling
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A"
};

// PUBLIC_INTERFACE
/**
 * The HomePage component displays user's progress and an "Explore More" sidebar.
 * @param {function} onNavigate - Callback for navigation.
 */
function HomePage({ onNavigate }) {
  // Sample plan/progress (can be replaced with props/context/state)
  const plan = {
    steps: [
      { id: 1, text: "Limit social media to 90 min/day (Week 1)", done: true },
      { id: 2, text: "Add 30-min offline activity daily (Week 1)", done: true },
      { id: 3, text: "Reduce social media to 60 min/day (Week 2)", done: false },
      { id: 4, text: "Try 1 'off-grid' block (2 hrs online-free) (Week 2)", done: false }
    ],
    currentGoal: "60 minutes/day • Week 2",
    progress: 0.5,
  };

  // Sidebar links for explore more (navigate by calling onNavigate)
  const exploreLinks = [
    { label: "Your Detox Plan", icon: "🗺️", tab: "plan" },
    { label: "Accountability Buddy", icon: "🤝", tab: "buddy" },
    { label: "Milestone Rewards", icon: "🎉", tab: "rewards" },
    { label: "Off-Grid Check-Ins", icon: "✅", tab: "checkin" },
    { label: "Reflection Journal", icon: "📝", tab: "journal" },
    { label: "Mini Detox Games", icon: "🎮", tab: "games" }
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 32,
        width: "100%",
        background: COLORS.bg,
        color: COLORS.text,
        minHeight: "480px"
      }}
    >
      {/* MAIN CONTENT */}
      <section
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 7px 0 rgba(46,125,50,0.04)",
          padding: "36px 30px 34px 30px",
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            color: COLORS.primary,
            fontSize: "2.25rem",
            marginBottom: 9,
            fontWeight: 700
          }}
        >
          Welcome to Your Digital Detox Journey
        </h2>
        <div
          style={{
            color: COLORS.secondary,
            fontWeight: 500,
            fontSize: "1.2rem",
            marginBottom: 18
          }}
        >
          Current goal:&nbsp;
          <span style={{ color: COLORS.primary }}>{plan.currentGoal}</span>
        </div>
        <ProgressBar progress={plan.progress} />
        <ul style={{ listStyle: "none", padding: 0, marginTop: 30 }}>
          {plan.steps.map((step) => (
            <li
              key={step.id}
              style={{
                marginBottom: 15,
                padding: "12px 20px",
                borderRadius: 9,
                background: step.done ? "#F3FCF9" : "#EFFBFC",
                color: COLORS.text,
                display: "flex",
                alignItems: "center",
                gap: 13,
                boxShadow: step.done ? "0 2px 4px 0 rgba(46,125,50,0.04)" : "none"
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  color: step.done ? COLORS.primary : "#bdbdbd"
                }}
              >
                {step.done ? "✔️" : "⏳"}
              </span>
              <span style={{ textDecoration: step.done ? "line-through" : "none" }}>
                {step.text}
              </span>
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: 32,
            background: COLORS.secondary,
            borderRadius: 14,
            padding: "18px 24px",
            color: COLORS.primary,
            fontWeight: 500,
          }}
        >
          Detox Tip: <span style={{ color: COLORS.primary }}>Plan offline fun after your check-in!</span>
        </div>
      </section>

      {/* SIDEBAR */}
      <aside
        style={{
          width: 280,
          minWidth: 240,
          maxWidth: 320,
          background: "#fafcfb",
          border: `2px solid ${COLORS.secondary}`,
          borderRadius: 16,
          boxShadow: "0 2px 8px 0 rgba(46,125,50,0.04)",
          marginLeft: "auto",
          padding: "29px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          position: "relative"
        }}
      >
        <div style={{
          color: COLORS.primary,
          fontWeight: 700,
          fontSize: "1.28rem",
          marginBottom: 16,
          letterSpacing: 0.2
        }}>
          🌟 Explore More
        </div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
            {exploreLinks.map((item) => (
              <li key={item.tab} style={{ marginBottom: 9 }}>
                <button
                  onClick={() => onNavigate(item.tab)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0 12px 3px",
                    border: "none",
                    background: "none",
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.primary,
                    borderRadius: 7,
                    cursor: "pointer",
                    transition: "background 0.17s",
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "#EEF7F6")}
                  onMouseOut={e => (e.currentTarget.style.background = "none")}
                >
                  <span style={{ fontSize: 19, minWidth: 22 }}>{item.icon}</span>
                  <span>{item.label}</span>
                  <span style={{ marginLeft: "auto", color: COLORS.accent, fontSize: 16 }}>›</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div
          style={{
            marginTop: 23,
            background: COLORS.accent,
            color: "#3C4220",
            borderRadius: 11,
            fontWeight: 600,
            fontSize: 14.2,
            padding: "10px 13px",
            textAlign: "center",
            letterSpacing: 0.06
          }}
        >
          New here? Tap an area to start your healthy habits journey!
        </div>
      </aside>
    </div>
  );
}

// PROGRESS BAR for showing progress visually
function ProgressBar({ progress }) {
  return (
    <div style={{ marginTop: 8, marginBottom: 0, width: "100%" }}>
      <div
        style={{
          background: "#F2F6F5",
          borderRadius: 8,
          overflow: "hidden",
          height: 15,
          position: "relative"
        }}
      >
        <div
          style={{
            width: `${Math.round(progress * 100)}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            height: "100%",
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
          }}
        />
      </div>
      <div
        style={{
          marginTop: 3,
          fontSize: 13,
          color: "#789262"
        }}
      >
        {Math.round(progress * 100)}% completed
      </div>
    </div>
  );
}

export default HomePage;
