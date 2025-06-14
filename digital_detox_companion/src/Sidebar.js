import React from "react";

/**
 * Persistent sidebar for global navigation.
 * Props: activeTab (string), onTabChange (function), accentColor, primaryColor
 * 
 * Features in sidebar:
 * - Detox Plan
 * - Parent Teen
 * - Events
 * - Rewards
 * - Check-In
 * 
 * Uses minimal, light, branded styling (#2E7D32, #B2DFDB, #FFD600).
 */
// PUBLIC_INTERFACE
function Sidebar({ activeTab, onTabChange, accentColor = "#FFD600", primaryColor = "#2E7D32" }) {
  // List of features for the sidebar
  const sidebarLinks = [
    // id -> matches the tab name needed in App
    { id: "plan", label: "Detox Plan", icon: "🗓️" },
    { id: "family", label: "Parent Teen", icon: "👨‍👩‍👧‍👦" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "rewards", label: "Rewards", icon: "🏅" },
    { id: "checkin", label: "Check-In", icon: "✅" }
  ];

  return (
    <aside
      className="sidebar"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: 88,
        background: "#fff",
        borderRight: "1px solid #E6F3EA",
        boxShadow: "2px 0 10px 0 rgba(44,125,67,0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 16,
        zIndex: 40,
        minWidth: 83,
      }}
    >
      {/* Logo */}
      <div style={{
        color: primaryColor,
        fontWeight: 700,
        fontSize: 28,
        marginBottom: 9,
        padding: "0 0 12px",
        borderBottom: `2px solid ${accentColor}`,
      }}>
        <span role="img" aria-label="logo">💡</span>
      </div>
      <nav style={{ marginTop: 12, width: "100%" }}>
        {sidebarLinks.map((item) => (
          <SidebarLink
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
            accentColor={accentColor}
            primaryColor={primaryColor}
          />
        ))}
      </nav>
      {/* Spacer - flex grow */}
      <div style={{ flex: 1 }}></div>
    </aside>
  );
}

// PUBLIC_INTERFACE
function SidebarLink({ id, label, icon, active, onClick, accentColor, primaryColor }) {
  return (
    <button
      className="sidebar-link"
      aria-current={active ? "page" : undefined}
      tabIndex={0}
      onClick={onClick}
      style={{
        background: active
          ? `linear-gradient(98deg, ${accentColor} 0%, #fffbe7 100%)`
          : "none",
        border: "none",
        borderRight: active ? `6px solid ${primaryColor}` : "6px solid transparent",
        color: active ? primaryColor : "#789262",
        fontWeight: active ? 600 : 500,
        padding: "15px 8px",
        width: "100%",
        textAlign: "center",
        fontSize: 17,
        cursor: "pointer",
        borderRadius: "0 12px 12px 0",
        outline: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background 0.22s, color 0.18s"
      }}
    >
      <span style={{ fontSize: 26, marginBottom: 2, display: "block" }}>{icon}</span>
      <span style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
}

export default Sidebar;
