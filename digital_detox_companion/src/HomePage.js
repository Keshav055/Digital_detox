import React from "react";

// Dummy icons for feature cards
const featureIcons = {
  plan: "🗓️",
  buddy: "🤝",
  rewards: "🎁",
  checkin: "📍",
  journal: "📖"
};

// PUBLIC_INTERFACE
function HomePage({ onNavigate }) {
  // If onNavigate is not passed, fallback so direct access works (storybook/test)
  const withNavigate = (cb) => (onNavigate ? cb : () => {});

  return (
    <div>
      <h1 style={{ color: "#2E7D32", fontWeight: 800, fontSize: "2.3rem", marginBottom: 8 }}>
        Welcome to Your Digital Detox Journey
      </h1>
      <p style={{ fontSize: 17, color: "#45604A", marginBottom: 26 }}>
        Take small steps every day. Discover your plan, check progress, and access essential features from here.<br />
        <span style={{ color: "#AF9B27" }}>
          Real progress happens offline. We're with you for the essentials.
        </span>
      </p>
      <div style={{
        display: "flex", flexWrap: "wrap",
        gap: 26, marginTop: 10, marginBottom: 24
      }}>
        {/* Detox Plan Card */}
        <FeatureCard
          icon={featureIcons.plan}
          title="Your Detox Plan"
          description="View and customize your personal digital detox plan. Track your step-by-step progress."
          onClick={withNavigate(() => onNavigate && onNavigate("plan"))}
          cta="View Plan"
        />

        {/* Buddy System */}
        <FeatureCard
          icon={featureIcons.buddy}
          title="Accountability Buddy"
          description="Check in with your anonymous buddy for motivation and support."
          onClick={withNavigate(() => onNavigate && onNavigate("buddy"))}
          cta="Open Buddy"
        />

        {/* Rewards */}
        <FeatureCard
          icon={featureIcons.rewards}
          title="Milestone Rewards"
          description="Unlock real-world rewards as you hit your digital detox goals."
          onClick={withNavigate(() => onNavigate && onNavigate("rewards"))}
          cta="See Rewards"
        />

        {/* Off-Grid Check-In */}
        <FeatureCard
          icon={featureIcons.checkin}
          title="Off-Grid Check-In"
          description="Log offline activities to boost your progress each week."
          onClick={withNavigate(() => onNavigate && onNavigate("checkin"))}
          cta="Check In"
        />

        {/* Reflection & Journal */}
        <FeatureCard
          icon={featureIcons.journal}
          title="Reflection Journal"
          description="Reflect on your experience and keep a habit journal, powered by AI prompts."
          onClick={withNavigate(() => onNavigate && onNavigate("journal"))}
          cta="Journal"
        />
      </div>

      {/* Quick Links for additional features */}
      <div style={{ marginTop: 10, fontSize: 15, color: "#789262" }}>
        <span style={{ fontWeight: 700, color: "#2E7D32" }}>Explore More:&nbsp;</span>
        <FeatureQuickLink label="Journey Map" onClick={withNavigate(() => onNavigate && onNavigate("journey"))} />
        <span> | </span>
        <FeatureQuickLink label="Detox Modes" onClick={withNavigate(() => onNavigate && onNavigate("modes"))} />
        <span> | </span>
        <FeatureQuickLink label="Community Circles" onClick={withNavigate(() => onNavigate && onNavigate("circles"))} />
        <span> | </span>
        <FeatureQuickLink label="Parent-Teen" onClick={withNavigate(() => onNavigate && onNavigate("family"))} />
        <span> | </span>
        <FeatureQuickLink label="Digital Budget" onClick={withNavigate(() => onNavigate && onNavigate("budget"))} />
        <span> | </span>
        <FeatureQuickLink label="Mini Games" onClick={withNavigate(() => onNavigate && onNavigate("games"))} />
        <span> | </span>
        <FeatureQuickLink label="Integrations" onClick={withNavigate(() => onNavigate && onNavigate("integrations"))} />
        <span> | </span>
        <FeatureQuickLink label="Reallocation Tracker" onClick={withNavigate(() => onNavigate && onNavigate("reallocation"))} />
        <span> | </span>
        <FeatureQuickLink label="Offline Events" onClick={withNavigate(() => onNavigate && onNavigate("events"))} />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureCard({ icon, title, description, onClick, cta }) {
  return (
    <div
      style={{
        minWidth: 220, maxWidth: 260,
        flex: "1 1 220px",
        borderRadius: 13,
        background: "#fafdfb",
        border: "1px solid #E7F6EC",
        boxShadow: "0 4px 13px 0 rgba(46,125,50,0.04)",
        padding: "22px 18px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-start"
      }}
    >
      <span style={{ fontSize: 32, marginBottom: 6 }}>{icon}</span>
      <div style={{ fontWeight: 700, fontSize: "1.22rem", color: "#2E7D32" }}>{title}</div>
      <div style={{
        fontSize: 15,
        color: "#555",
        marginBottom: 7,
        minHeight: 46
      }}>{description}</div>
      <button
        style={{
          background: "#2E7D32",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 20px",
          fontWeight: 500,
          fontSize: 15,
          marginTop: "auto",
          cursor: "pointer"
        }}
        onClick={onClick}
      >
        {cta}
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureQuickLink({ label, onClick }) {
  return (
    <button
      style={{
        background: "none",
        color: "#255b33",
        border: "none",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        textDecoration: "underline",
        margin: "0 1px"
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default HomePage;
