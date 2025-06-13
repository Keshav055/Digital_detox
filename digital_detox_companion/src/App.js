import React, { useState } from "react";
import "./App.css";
import DetoxJourneyMap from "./DetoxJourneyMap";
import TimeReallocationTracker from "./TimeReallocationTracker";
import BuddyStreakSystem from "./BuddyStreakSystem";
import DetoxModes from "./DetoxModes";
import OfflineEventGenerator from "./OfflineEventGenerator";
import MiniDetoxGames from "./MiniDetoxGames";
import ParentTeenMode from "./ParentTeenMode";
import DigitalBudgetMode from "./DigitalBudgetMode";
import CommunityCircles from "./CommunityCircles";
import IntegrationsHub from "./IntegrationsHub";
import HomePage from "./HomePage";
import AIChat from "./AIChat";

// Color variables (from requirements)
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// Minimal inline styles for theme and layout
const minimalTheme = {
  "--primary": COLORS.primary,
  "--secondary": COLORS.secondary,
  "--accent": COLORS.accent,
  "--bg": COLORS.bg,
  "--text": COLORS.text,
};

// PUBLIC_INTERFACE
function App() {
  const [tab, setTab] = useState("home");

  // Top nav: Home + 5 most important core features
  const navTabs = [
    {
      id: "home",
      label: "Home",
      icon: "🏠"
    },
    {
      id: "plan",
      label: "Detox Plan",
      icon: "🗺️"
    },
    {
      id: "buddy",
      label: "Buddy System",
      icon: "🤝"
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: "🎉"
    },
    {
      id: "checkin",
      label: "Check-In",
      icon: "✅"
    },
    {
      id: "journal",
      label: "Journal",
      icon: "📝"
    }
  ];

  // Renders the currently active page/component
  function renderPage() {
    switch (tab) {
      case "home":
        // Pass an onNavigate to HomePage so that it can trigger tab changes.
        return <HomePage onNavigate={setTab} />;
      case "journey":
        return <DetoxJourneyMap />;
      case "plan":
        return <DetoxPlanPage />;
      case "circles":
        return <CommunityCircles />;
      case "budget":
        return <DigitalBudgetMode />;
      case "games":
        return <MiniDetoxGames />;
      case "modes":
        return <DetoxModes />;
      case "family":
        return <ParentTeenMode />;
      case "events":
        return <OfflineEventGenerator />;
      case "reallocation":
        return <TimeReallocationTracker />;
      case "integrations":
        return <IntegrationsHub />;
      case "buddy":
        return <BuddySystemPage />;
      case "rewards":
        return <RewardsPage />;
      case "checkin":
        return <CheckInPage />;
      case "journal":
        return <JournalPage />;
      default:
        return <HomePage onNavigate={setTab} />;
    }
  }

  return (
    <div
      className="app"
      style={{
        background: minimalTheme["--bg"],
        color: minimalTheme["--text"],
        minHeight: "100vh",
        fontFamily: "Inter, Roboto, Arial, sans-serif"
      }}
    >
      <nav
        className="navbar"
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          color: COLORS.primary,
          padding: "0",
          boxShadow: "0 2px 6px rgba(44,127,67,0.03)",
          zIndex: 20
        }}
      >
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            justifyContent: "space-between"
          }}>
            <div className="logo" style={{ fontWeight: 600, color: COLORS.primary, fontSize: 20 }}>
              <span
                className="logo-symbol"
                style={{
                  color: COLORS.accent,
                  fontWeight: 700,
                  fontSize: 24,
                  verticalAlign: "middle"
                }}
              >
                💡
              </span>
              Digital Detox Companion
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {/* Only show Home in nav bar */}
              {navTabs.map((t) => (
                <NavTab
                  key={t.id}
                  label={t.label}
                  icon={t.icon}
                  active={tab === t.id}
                  onClick={() => setTab(t.id)}
                  accentColor={COLORS.accent}
                  primaryColor={COLORS.primary}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: 76 }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          {renderPage()}
        </div>
      </main>
      <footer
        style={{
          padding: "24px 0 8px",
          color: COLORS.primary,
          background: "#fafcfb",
          borderTop: "1px solid #E7F6EC",
          textAlign: "center",
          fontWeight: 500,
          fontSize: "1.05rem",
          marginTop: 32,
          letterSpacing: 0.1
        }}
      >
        Enjoy the world beyond the screen. 🌳 
      </footer>
    </div>
  );
}

// ----------- NAV TAB COMPONENT -----------
// PUBLIC_INTERFACE
function NavTab({ label, icon, active, onClick, accentColor, primaryColor }) {
  return (
    <button
      className="tab-btn"
      aria-current={active ? "page" : undefined}
      style={{
        background: "none",
        border: "none",
        color: active ? primaryColor : "#789262",
        borderBottom: active ? `3px solid ${accentColor}` : "3px solid transparent",
        fontSize: 16,
        fontWeight: active ? 600 : 400,
        padding: "12px 10px 7px",
        margin: "0 2px",
        cursor: "pointer",
        outline: "none",
        position: "relative"
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: 18, marginRight: 5 }}>{icon}</span>
      {label}
    </button>
  );
}

// ----------- DETOX PLAN PAGE -----------
function DetoxPlanPage() {
  const plan = {
    steps: [
      { id: 1, text: "Limit social media to 90 min/day (Week 1)", done: true },
      { id: 2, text: "Add 30-min offline activity daily (Week 1)", done: true },
      { id: 3, text: "Reduce social media to 60 min/day (Week 2)", done: false },
      { id: 4, text: "Try 1 'off-grid' block (2 hrs online-free) (Week 2)", done: false },
    ],
    currentGoal: "60 minutes/day • Week 2",
    progress: 0.5,
  };

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: '2.1rem', marginBottom: 6 }}>
        Your Digital Detox Plan
      </h2>
      <p style={{
        color: COLORS.secondary,
        fontWeight: 500,
        fontSize: "1.1rem"
      }}>
        Current goal: <span style={{ color: COLORS.primary }}>{plan.currentGoal}</span>
      </p>
      <ProgressBar progress={plan.progress} />
      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {plan.steps.map((step) => (
          <li key={step.id} style={{
            marginBottom: 12,
            padding: "12px 18px",
            borderRadius: 8,
            background: step.done ? "#F3FCF9" : "#EFFBFC",
            color: COLORS.text,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: step.done ? "0 2px 4px 0 rgba(46,125,50,0.03)" : "none"
          }}>
            <span style={{
              fontSize: 19,
              color: step.done ? COLORS.primary : "#bdbdbd"
            }}>
              {step.done ? "✔️" : "⏳"}
            </span>
            <span style={{ textDecoration: step.done ? "line-through" : "none" }}>
              {step.text}
            </span>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: 28,
        background: COLORS.secondary,
        borderRadius: 14,
        padding: "18px 24px",
        color: COLORS.primary,
        fontWeight: 500,
      }}>
        Detox Tip: <span style={{ color: COLORS.primary }}>Plan offline fun after your check-in!</span>
      </div>
    </section>
  );
}

// ----------- PROGRESS BAR -----------
// PUBLIC_INTERFACE
function ProgressBar({ progress }) {
  return (
    <div style={{ marginTop: 16, marginBottom: 0, width: "100%" }}>
      <div style={{
        background: "#F2F6F5",
        borderRadius: 8,
        overflow: "hidden",
        height: 14,
        position: "relative"
      }}>
        <div style={{
          width: `${Math.round(progress * 100)}%`,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
          height: "100%",
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        marginTop: 3,
        fontSize: 13,
        color: "#789262"
      }}>
        {Math.round(progress * 100)}% completed
      </div>
    </div>
  );
}

// ----------- ACCOUNTABILITY BUDDY PAGE -----------
// PUBLIC_INTERFACE
function BuddySystemPage() {
  const paired = true;
  const buddy = { id: "anonbuddy14", status: "active", streak: 4 };

  // Feedback state for contextual notifications (reflection sent, encouragement, etc.)
  const [buddyFeedback, setBuddyFeedback] = useState(null);

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: '2.1rem', marginBottom: 7 }}>
        Accountability Buddy
      </h2>
      {paired ? (
        <>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "#EFFBFC",
            padding: "18px 18px 15px",
            borderRadius: 14,
            marginBottom: 16
          }}>
            <span style={{
              fontSize: 36,
              color: COLORS.primary,
              marginRight: 9
            }}>
              🤝
            </span>
            <div>
              <div style={{ color: COLORS.primary, fontWeight: 600, fontSize: "1.1rem" }}>
                Paired with: {buddy.id} &bull; <span style={{ fontWeight: 400, color: "#7a8875" }}>anonymous</span>
              </div>
              <div style={{ color: "#82B571", fontWeight: 500, fontSize: "1.06rem" }}>
                Streak: {buddy.streak} days
              </div>
            </div>
          </div>
          <BuddyStreakSystem
            streakDays={buddy.streak}
            buddyName={buddy.id}
            buddyStatus={buddy.status}
            showBuddy={true}
            onBreakReflection={(reflection) => {
              setBuddyFeedback({ type: "reflection", message: `Reflection sent to buddy!\n\n${reflection}` });
            }}
          />
          {/* Inline feedback after buddy actions */}
          {buddyFeedback && (
            <div
              style={{
                background: "#f9ffec",
                color: "#487e41",
                border: "1px solid #cce3c1",
                borderRadius: 7,
                padding: "12px 16px",
                margin: "14px 0 0 0",
                fontSize: 15,
                whiteSpace: "pre-line",
                fontWeight: 500,
              }}
              data-testid="buddy-feedback"
            >
              {buddyFeedback.message}
              <button
                style={{
                  marginLeft: 14,
                  background: "none",
                  color: "#888",
                  border: "none",
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                aria-label="Dismiss notification"
                onClick={() => setBuddyFeedback(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          <BuddyMessagePane setBuddyFeedback={setBuddyFeedback} />
        </>
      ) : (
        <div>
          <div style={{
            padding: 18,
            background: "#f8fbe9",
            borderRadius: 12,
            color: COLORS.primary,
            marginBottom: 10
          }}>
            You are currently not paired.<br />
            <button
              style={{
                marginTop: 8,
                padding: "9px 20px",
                borderRadius: 5,
                background: COLORS.primary,
                color: "white",
                border: "none",
                fontWeight: 500,
                cursor: "pointer"
              }}
              onClick={() => null}
            >
              Find Buddy
            </button>
          </div>
          <p style={{ color: "#787e7a" }}>
            Pairing is anonymous for focused support!
          </p>
        </div>
      )}
    </section>
  );
}

// Simulated buddy chat pane (now with buddy prop for display)
function BuddyMessagePane({ setBuddyFeedback, buddy }) {
  const lastMessage = {
    fromBuddy: true,
    time: "2h ago",
    text: buddy?.motivationalMsg || "How did your check-in go today? Stay strong! 💪"
  };

  // State to show feedback inline instead of popup for sending encouragement
  const [showEncouragementMsg, setShowEncouragementMsg] = useState(false);

  const handleSendEncouragement = () => {
    setShowEncouragementMsg(true);
    if (setBuddyFeedback) {
      setBuddyFeedback({
        type: "encouragement",
        message: "Your encouragement was sent to your buddy! 💬",
      });
    }
    setTimeout(() => setShowEncouragementMsg(false), 2200);
  };

  return (
    <div style={{
      padding: "18px 22px",
      background: "#fff",
      border: "1.5px solid #B2DFDB",
      borderRadius: 10,
      marginBottom: 8,
      minHeight: 50,
      boxShadow: "0 2.5px 6px rgba(44,127,67,0.02)",
      maxWidth: 420
    }}>
      <div style={{
        marginBottom: 6,
        color: "#4e8171",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.02em"
      }}>
        Latest from your buddy {buddy?.username ? <span style={{color:COLORS.primary}}>@{buddy.username}</span> : ""}:
      </div>
      <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: "1.08rem", marginBottom: 3 }}>
        “{lastMessage.text}”
      </div>
      <div style={{ textAlign: "right", color: "#9abcb9", fontSize: 11, marginBottom: 2 }}>
        {lastMessage.time}
      </div>
      <button
        style={{
          marginTop: 10,
          background: COLORS.accent,
          color: "#313619",
          border: "none",
          borderRadius: 5,
          padding: "7px 22px",
          fontWeight: 500,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={handleSendEncouragement}
        data-testid="encourage-btn"
      >
        Send Encouragement
      </button>
      {showEncouragementMsg && (
        <div
          style={{
            background: "#f0ffe0",
            color: "#397536",
            borderRadius: 6,
            marginTop: 12,
            padding: "7px 14px",
            fontSize: 14,
            fontWeight: 500,
          }}
          data-testid="encouragement-feedback"
        >
          Sent! Your buddy will see your encouragement.
        </div>
      )}
    </div>
  );
}

// ----------- REWARDS PAGE -----------
// PUBLIC_INTERFACE
function RewardsPage() {
  // Expanded rewards data
  const rewards = [
    {
      id: 1,
      name: "Coffee voucher",
      unlocked: true,
      desc: "Earned at 3-day streak! Redeem for any coffee or tea at a partner café.",
      icon: "☕",
      tier: "Bronze",
      dateEarned: "2024-06-07",
      level: 1,
      status: "Unlocked",
      code: "COFFEE-023",
      expires: "2024-06-30",
    },
    {
      id: 2,
      name: "Gift card",
      unlocked: false,
      desc: "Stay offline for 7 days to earn this.",
      icon: "🎟️",
      tier: "Silver",
      dateEarned: null,
      level: 2,
      status: "Locked",
      code: null,
      expires: null,
    },
    {
      id: 3,
      name: "Outdoor Yoga Pass",
      unlocked: false,
      desc: "Try two off-grid activities to unlock a free yoga session.",
      icon: "🧘",
      tier: "Silver",
      dateEarned: null,
      level: 2,
      status: "Locked",
      code: null,
      expires: null,
    },
    {
      id: 4,
      name: "Adventure Day Trip",
      unlocked: false,
      desc: "Complete a 21-day streak: enjoy a guided outdoor adventure for two.",
      icon: "🚣",
      tier: "Gold",
      dateEarned: null,
      level: 3,
      status: "Locked",
      code: null,
      expires: null,
    }
  ];

  // Color palette for tiers/levels
  const tierColors = {
    Bronze: "#A06C3B",
    Silver: "#AEB3B2",
    Gold: "#FFD600"
  };

  // Helper to show status
  function rewardStatus(r) {
    if (r.unlocked) {
      return <span style={{
        color: COLORS.accent,
        fontWeight: 700,
      }}>Unlocked!</span>;
    }
    return <span style={{ color: "#aaa" }}>Locked</span>;
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Milestone Rewards
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 22,
        marginTop: 12
      }}>
        {rewards.map((r, idx) => (
          <div
            key={r.id}
            style={{
              background: r.unlocked ? "#fafbe4" : "#f2f6f5",
              border: r.unlocked
                ? `2.5px solid ${COLORS.accent}`
                : `1.2px solid #e2efe6`,
              borderRadius: 16,
              padding: "24px 28px 17px 28px",
              fontWeight: 500,
              fontSize: 16,
              minWidth: 220,
              maxWidth: 290,
              boxShadow: r.unlocked ? "0 3px 12px 0 rgba(255,214,0,0.06)" : "0 2px 4px 0 rgba(46,125,50,0.02)",
              opacity: r.unlocked ? 1 : 0.73,
              color: r.unlocked ? COLORS.primary : "#6d757a",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}
          >
            <div style={{
              fontSize: 42,
              marginBottom: 10,
              filter: r.unlocked ? "none" : "grayscale(0.5)"
            }}>
              {r.icon}
            </div>
            <div style={{
              fontWeight: 700,
              fontSize: "1.13rem",
              color: r.unlocked ? COLORS.primary : "#aaa"
            }}>{r.name}</div>
            <div style={{
              marginTop: 3,
              marginBottom: 6,
              color: "#82B571",
              fontWeight: 500,
              fontSize: 12.7,
              letterSpacing: "0.03em"
            }}>
              Tier: <span style={{ color: tierColors[r.tier], fontWeight: 700 }}>{r.tier}</span>{" "}
              &bull; Level {r.level}
            </div>
            <div style={{
              color: "#849478",
              fontWeight: 500,
              fontSize: 13.5,
              marginBottom: 6
            }}>
              {r.desc}
            </div>
            <div style={{
              color: "#B4BAAD",
              fontWeight: 400,
              fontSize: 12.6
            }}>
              {r.unlocked && r.dateEarned ? (
                <>
                  <span role="img" aria-label="calendar">📅</span> Earned: {r.dateEarned}
                  {r.expires && (
                    <> &bull; <span style={{ color: "#C49000" }}>Use by {r.expires}</span></>
                  )}
                </>
              ) : (
                "Complete requirements to unlock."
              )}
            </div>
            <div style={{
              marginTop: 8,
              color: r.unlocked ? COLORS.primary : "#A7C5B1",
              fontWeight: 600,
              fontSize: 13.5
            }}>
              Status: {rewardStatus(r)}
            </div>
            {r.code && (
              <div style={{
                marginTop: 7,
                fontSize: 12.3,
                color: "#d18a0b",
                fontWeight: 700,
                letterSpacing: "0.02em"
              }}>
                Voucher Code: {r.code}
              </div>
            )}
            {r.unlocked && (
              <div style={{
                position: "absolute",
                top: 11,
                right: 14,
                color: COLORS.accent,
                fontWeight: 700,
                fontSize: 12,
                background: "#fcfded",
                borderRadius: 8,
                padding: "2.5px 11px"
              }}>
                Unlocked
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 34,
        textAlign: "center",
        color: "#999D86",
        fontSize: 15.5
      }}>
        <span>
          Rewards promote real-life experiences. <br />
          Celebrate your milestones offline!
        </span>
      </div>
    </section>
  );
}

// ----------- CHECK IN PAGE -----------
// PUBLIC_INTERFACE
function CheckInPage() {
  const [checkinHistory, setCheckinHistory] = useState([
    { id: 1, text: "Nature walk (Central Park)", date: "Yesterday", icon: "🌳" },
    { id: 2, text: "Offline dinner with friends", date: "2 days ago", icon: "🍽️" }
  ]);
  const [showCheckinFeedback, setShowCheckinFeedback] = useState(false);

  // For demo, auto-generate new check-in
  function handleNewCheckIn() {
    setTimeout(() => {
      setCheckinHistory(prev =>
        [
          {
            id: prev.length + 1,
            text: "Quiet reading break at coffee shop",
            date: "Today",
            icon: "📚"
          },
          ...prev,
        ]
      );
      setShowCheckinFeedback(true);
    }, 200);
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Off-Grid Check-In
      </h2>
      <div style={{
        padding: "19px 24px 14px",
        background: "#EFFBFC",
        borderRadius: 12,
        marginBottom: 16,
        color: "#20502C"
      }}>
        Log an offline activity to boost your progress!
      </div>
      <button
        style={{
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          fontWeight: 500,
          fontSize: 16,
          marginBottom: 18,
          cursor: "pointer"
        }}
        onClick={handleNewCheckIn}
      >
        New Check-In
      </button>
      {showCheckinFeedback && (
        <div
          style={{
            margin: "0 0 15px 0",
            background: "#eaffea",
            color: "#2A631B",
            padding: "10px 18px",
            borderRadius: 7,
            fontWeight: 500,
            fontSize: 15,
          }}
          data-testid="checkin-feedback"
        >
          🎉 Activity checked in successfully!
          <button
            onClick={() => setShowCheckinFeedback(false)}
            style={{
              marginLeft: 16,
              background: "none",
              color: "#79a55d",
              border: "none",
              fontSize: 13,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <div style={{
          color: COLORS.primary,
          marginBottom: 7,
          fontWeight: 500
        }}>
          Recent Check-Ins
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {checkinHistory.map((c) => (
            <li key={c.id} style={{
              marginBottom: 11,
              padding: "10px 18px",
              background: "#fff",
              borderRadius: 9,
              border: "1px solid #cbe0d2",
              color: "#426046",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 13,
              fontSize: 15
            }}>
              <span style={{ fontSize: 19 }}>{c.icon}</span>
              <span>{c.text}</span>
              <span style={{ marginLeft: "auto", color: "#B3B5A9", fontWeight: 400, fontSize: 14 }}>
                {c.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        marginTop: 22,
        color: "#9AADA6",
        fontSize: 14
      }}>
        More check-ins, more progress!
      </div>
    </section>
  );
}

// ----------- JOURNAL PAGE -----------
// PUBLIC_INTERFACE
function JournalPage() {
  const [entries, setEntries] = useState([
    {
      id: 2,
      text: "Felt refreshed after spending two hours reading in the park.",
      date: "2024-06-08"
    },
    {
      id: 1,
      text: "Managed to reduce screen time. Noticed feeling less distracted.",
      date: "2024-06-07"
    }
  ]);

  const aiPrompt = "Reflect on your experience: How did going offline today impact your mood or focus?";

  const [draft, setDraft] = useState("");
  const [saveFeedback, setSaveFeedback] = useState(false);

  function handleSave() {
    // Add entry to the top, fake current date
    setEntries(prev => [
      {
        id: prev[0]?.id ? prev[0].id + 1 : 1,
        text: draft,
        date: (new Date()).toISOString().split('T')[0]
      },
      ...prev
    ]);
    setDraft("");
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  }

  return (
    <section style={{ marginTop: 24, marginBottom: 34 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 3 }}>
        Reflection & Habit Journal
      </h2>
      <div style={{
        background: "#fffde7",
        color: "#AF9B27",
        padding: "13px 19px",
        borderRadius: 9,
        fontWeight: 500,
        marginBottom: 13,
        fontSize: 15,
        border: `1px solid ${COLORS.accent}44`
      }}>
        <span role="img" aria-label="ai" style={{ marginRight: 7 }}>🤖</span>
        AI Prompt: {aiPrompt}
      </div>
      <textarea
        rows={3}
        placeholder="Write your reflection..."
        value={draft}
        onChange={e => setDraft(e.target.value)}
        style={{
          width: "100%",
          borderRadius: 7,
          border: "1px solid #E5E5CD",
          fontSize: 15,
          padding: "10px 13px",
          resize: "vertical",
          marginBottom: 10,
          minHeight: 70,
          outlineColor: COLORS.primary
        }}
      />
      <div>
        <button
          onClick={handleSave}
          disabled={draft.length === 0}
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "9px 22px",
            fontWeight: 500,
            fontSize: 15,
            opacity: draft.length === 0 ? 0.55 : 1,
            cursor: draft.length === 0 ? "not-allowed" : "pointer"
          }}
        >
          Save Entry
        </button>
        {saveFeedback && (
          <span
            style={{
              marginLeft: 16,
              background: "#f3ffe3",
              color: "#799E25",
              borderRadius: 6,
              fontWeight: 500,
              padding: "7px 12px",
              fontSize: 15,
            }}
            data-testid="journal-save-feedback"
          >
            Entry saved!
          </span>
        )}
      </div>
      {/* AI Live Chat UI */}
      <AIChat theme={{
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        accent: COLORS.accent
      }} />
      <div style={{
        marginTop: 25,
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 8
      }}>
        Previous Reflections
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 0 }}>
        {entries.map((e) => (
          <li key={e.id} style={{
            padding: "13px 13px 9px",
            background: "#EFFBFC",
            borderRadius: 8,
            color: "#466464",
            marginBottom: 13
          }}>
            <div style={{ fontSize: 15, marginBottom: 4 }}>{e.text}</div>
            <div style={{ color: "#B4BAAD", fontSize: 12, marginTop: 0 }}>
              {e.date}
            </div>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: 13,
        color: "#8E9478",
        fontSize: 13
      }}>
        Journaling helps build lasting habits.
      </div>
    </section>
  );
}

export default App;
