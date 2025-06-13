import React, { useState, useRef, useEffect } from "react";

// Minimalistic mock AI responder (simulates streaming/thinking)
function mockAIResponse(message, cb) {
  // Simulates varying response times and mock streaming
  const responses = [
    "That's a thoughtful reflection! What habits have helped so far?",
    "How did today's experience affect your mood?",
    "Remember, every small step counts towards your goal.",
    "Great progress! What's one thing you'd like to try next?"
  ];
  let idx = Math.floor(Math.random() * responses.length);
  let answer = responses[idx];
  // Simulate slight 'thinking/start' delay, then 'stream' output
  let tokens = answer.split(' ');
  let soFar = "";
  let i = 0;
  function nextToken() {
    if (i < tokens.length) {
      soFar += (i === 0 ? "" : " ") + tokens[i];
      cb(soFar + "▍"); // Simulate AI 'typing'
      i++;
      setTimeout(nextToken, 50 + Math.random() * 30);
    } else {
      cb(answer); // Final answer
    }
  }
  setTimeout(nextToken, 600 + Math.random() * 400);
}

// PUBLIC_INTERFACE
/**
 * A simple real-time AI chat interface for journaling reflection.
 * Props:
 *   - theme: { primary, secondary, accent }
 */
function AIChat({ theme }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your Reflection Buddy 🤖. Share your thoughts or questions, and I'll support your journaling journey!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAI, setPendingAI] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, pendingAI]);

  // PUBLIC_INTERFACE
  function handleSend(e) {
    e.preventDefault();
    const trimmed = current.trim();
    if (!trimmed || loading) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: trimmed, time: now }
    ]);
    setCurrent("");
    setLoading(true);
    setPendingAI("");
    // Simulate AI response asynchronously, with streaming effect
    mockAIResponse(trimmed, (respText) => {
      setPendingAI(respText);
      // If the streamed output is complete, finalize message
      if (!respText.endsWith("▍")) {
        setMessages((msgs) => [
          ...msgs,
          { sender: "ai", text: respText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setPendingAI("");
        setLoading(false);
      }
    });
  }

  // Chat bubble renderer
  function Bubble({ who, text, time }) {
    const isAI = who === "ai";
    return (
      <div
        style={{
          display: "flex",
          flexDirection: isAI ? "row" : "row-reverse",
          marginBottom: 6,
          alignItems: "flex-end"
        }}
      >
        <div
          style={{
            background: isAI
              ? theme.secondary + "19"
              : theme.primary + "20",
            color: isAI
              ? theme.primary
              : "#fff",
            alignSelf: "flex-end",
            borderRadius: isAI
              ? "15px 15px 15px 2px"
              : "15px 15px 2px 15px",
            padding: "9px 14px",
            fontSize: 15,
            maxWidth: "75%",
            wordBreak: "break-word",
            boxShadow: isAI
              ? "0 1px 3px rgba(46,125,50,0.07)"
              : "0 1px 5px rgba(46,125,50,0.11)",
            border: isAI
              ? `1px solid ${theme.secondary}44`
              : `1px solid ${theme.primary}30`
          }}
        >
          <span>
            {text}
          </span>
          <span style={{
            display: "block",
            marginTop: 8,
            color: isAI ? theme.primary : "#FFF9A6",
            fontSize: 11,
            opacity: 0.72,
            textAlign: "right"
          }}>{time}</span>
        </div>
        <span style={{
          margin: isAI ? "0 10px 0 0" : "0 0 0 10px",
          fontSize: 20
        }}>
          {isAI ? "🤖" : "🧑"}
        </span>
      </div>
    );
  }

  return (
    <section
      style={{
        background: "#FAFCFB",
        border: `1px solid ${theme.secondary}44`,
        borderRadius: 11,
        marginTop: 15,
        marginBottom: 14,
        boxShadow: "0 2px 8px 0 rgba(46,125,50,0.08)"
      }}
      aria-label="AI Live Chat"
    >
      <div style={{
        borderBottom: `1px solid ${theme.accent}22`,
        background: "#fffde7",
        borderRadius: "11px 11px 0 0",
        padding: "9px 17px",
        fontWeight: 600,
        color: theme.accent,
        fontSize: 16,
        letterSpacing: 0.05
      }}>
        <span role="img" aria-label="ai" style={{ marginRight: 8 }}>💬</span>
        AI Live Chat <span style={{ fontWeight: 400, color: "#A8A657", fontSize: 13, marginLeft: 7 }}>(reflection support)</span>
      </div>
      <div
        style={{
          maxHeight: 250,
          minHeight: 110,
          overflowY: "auto",
          padding: "13px 12px 4px 12px",
          background: "#fcfcf8"
        }}
      >
        {messages.map((m, idx) => (
          <Bubble key={idx} who={m.sender} text={m.text} time={m.time} />
        ))}
        {loading && (
          <Bubble who="ai" text={pendingAI || "▍"} time={""} />
        )}
        <div ref={chatEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          gap: 7,
          padding: "8px 11px",
          borderTop: `1px solid ${theme.secondary}22`,
          background: "#fafcfb",
          borderRadius: "0 0 11px 11px"
        }}
      >
        <input
          type="text"
          aria-label="Type your reflection or question"
          value={current}
          disabled={loading}
          onChange={e => setCurrent(e.target.value)}
          placeholder="Type your reflection or question..."
          style={{
            flex: 1,
            borderRadius: 6,
            padding: "8px 12px",
            border: `1px solid ${theme.primary}15`,
            fontSize: 15,
            background: loading ? "#F4F7F5" : "#fff",
            outlineColor: theme.primary,
            color: "#444"
          }}
        />
        <button
          type="submit"
          disabled={loading || current.trim() === ""}
          style={{
            background: theme.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "8px 15px",
            fontWeight: 500,
            fontSize: 15,
            opacity: loading || current.trim() === "" ? 0.5 : 1,
            cursor: loading || current.trim() === "" ? "not-allowed" : "pointer"
          }}
        >
          Send
        </button>
      </form>
    </section>
  );
}

export default AIChat;
