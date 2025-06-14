import React from "react";

/**
 * Persistent Sidebar for global navigation of key app features.
 * Built for minimal, light-UI apps and always visible on all app screens.
 * 
 * Features: Detox Plan, Parent Teen, Events, Rewards, Check-In
 * Styling is light/minimal and coherent with the app's palette/brand.
 */
// PUBLIC_INTERFACE
function Sidebar({ activeTab, onTabChange, accentColor = "#FFD600", primaryColor = "#2E7D32" }) {
  // Sidebar sections & target tabs
  const items = [
    {
      id: "plan",
      label: "Detox Plan",
      icon: "🗓️",
    },
    {
      id: "family",
      label: "Parent-Teen",
      icon: "🏠",
    },
    {
      id: "events",
      label: "Events",
      icon: "🗺️",
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: "🎁",
    },
    {
      id: "checkin",
      label: "Check-In",
      icon: "📍",
    },
  ];
  return (
    <aside
      className="sidebar-nav"
      style={{
        background: "#fff",
        borderRight: "1px solid #EAEEE8",
        minHeight: "100vh",
        width: 94,
        paddingTop: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "2px 0 16px 0 rgba(44,127,67,0.03)",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 30,
      }}
      aria-label="Quick navigation"
    >
      <div style={{ marginBottom: 38, textAlign: "center" }}>
        <span
          style={{
            color: accentColor,
            fontWeight: 900,
            fontSize: 30,
            verticalAlign: "middle",
            display: "block",
          }}
        >
          💡
        </span>
        <span
          style={{
            fontSize: 10,
            display: "block",
            color: primaryColor,
            fontWeight: 700,
            letterSpacing: 0.2,
            marginTop: 0,
          }}
        >
          DETOX<br />MENU
        </span>
      </div>
      <nav style={{ width: "100%" }}>
        {items.map((item) => (
          <button
            key={item.id}
            aria-current={activeTab === item.id ? "page" : undefined}
            onClick={() => onTabChange(item.id)}
            className="sidebar-btn"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              background: "none",
              border: "none",
              color: activeTab === item.id ? primaryColor : "#98A390",
              padding: "10px 0 9px",
              fontSize: 13.1,
              fontWeight: activeTab === item.id ? 700 : 400,
              outline: "none",
              borderLeft: activeTab === item.id ? `5px solid ${accentColor}` : "5px solid transparent",
              marginBottom: 14,
              position: "relative",
              transition: "background 0.22s"
            }}
          >
            <span style={{
              fontSize: 22,
              marginBottom: 3,
              filter: activeTab === item.id ? "" : "grayscale(0.15)",
            }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar;
