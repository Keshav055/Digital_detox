import React, { useState, useRef } from "react";

/*
 * PUBLIC_INTERFACE
 * AIChat - Real-time AI chat component for Journal page.
 * Features:
 * - User messages appear instantly in the chat log
 * - Simulates real-time/streaming AI response (typing effect)
 * - In-chat error handling
 * - Styled to match Digital Detox Companion's theme/journal
 * - Works with mock or real backend endpoint (default: mock)
 */
export default function AIChat({ theme = {} }) {
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "ai",
      content: "Hello! Need a reflection prompt or want to discuss your digital detox journey? Ask away. 🌱"
    }
  ]);
  const [input, setInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState(""); // current streaming AI message
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Scroll chat to latest message
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMsg]);

  // Simulate streaming/typing for AI
  async function streamAIResponse(userMessage) {
    setFetching(true);
    setError(null);

    // Example endpoint; replace with your real endpoint:
    // const endpoint = "/api/ai/chat";
    // For demonstration, we'll mock with a random message & typing effect.
    // To enable real backends, use fetch() below (see commented code).

    // Mock "AI typing" with a slightly random delay per chunk
    function getRandomDelay() {
      return 25 + Math.round(Math.random() * 35); // 25-60ms per char
    }

    // Mock AI response logic (could fetch from backend for real)
    function mockAI(userText) {
      const mockReplies = [
        "That's a fantastic insight! Can you describe how you felt during this experience?",
        "Taking time offline often boosts creativity. Did you notice any changes in your focus or mood today?",
        "It sounds like you’re making great progress! How did disconnecting help you reflect on your habits?"
      ];
      // Choose based on input, but random for realism:
      return (
        mockReplies[Math.floor(Math.abs(userText.length + userText.charCodeAt(0)) % mockReplies.length)]
      );
    }

    // For real backend:
    // let aiText = "";
    // try {
    //   const res = await fetch(endpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: userMessage }),
    //   });
    //   if (!res.ok) throw new Error("AI backend error");
    //   const data = await res.json();
    //   aiText = data.reply || "";
    // } catch (e) {
    //   setError("AI assistant is not available at the moment. Please try again later.");
    //   setFetching(false);
    //   setStreamingMsg("");
    //   return;
    // }

    // Mocking for demo: simulate "streaming"
    const aiText = mockAI(userMessage);

    // Show AI message as it "types"
    setStreamingMsg("");
    for (let i = 0; i <= aiText.length; i++) {
      await new Promise((r) => setTimeout(r, getRandomDelay()));
      setStreamingMsg(aiText.substring(0, i));
    }

    // Finalize AI message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "ai",
        content: aiText,
      },
    ]);
    setStreamingMsg("");
    setFetching(false);
  }

  // PUBLIC_INTERFACE
  function handleUserSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        content: trimmed,
      },
    ]);
    setInput("");
    streamAIResponse(trimmed);
  }

  // Styles are aligned with journal/app (yellow accent, rounded cards, etc.)
  const colorP = theme.primary || "#2E7D32";
  const colorS = theme.secondary || "#B2DFDB";
  const colorA = theme.accent || "#FFD600";
  const chatBg = "#fffefa";
  const userBubble = "#EFFBFC";
  const aiBubble = "#fffde7";

  return (
    <div
      style={{
        margin: "28px 0 6px",
        background: chatBg,
        borderRadius: 17,
        boxShadow: "0 1.5px 12px rgba(209,209,165,0.05)",
        border: `1.2px solid ${colorA}33`,
        maxWidth: 700,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0px 0 14px",
      }}
    >
      <div
        style={{
          color: "#7D7B5E",
          fontSize: "1.13rem",
          fontWeight: 600,
          padding: "19px 20px 4px 20px",
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <span role="img" aria-label="ai" style={{ fontSize: 23 }}>🤖</span>
        AI Live Chat – Reflection Assistant
      </div>
      <div
        style={{
          background: chatBg,
          minHeight: 120,
          maxHeight: 240,
          overflowY: "auto",
          padding: "10px 18px 0 18px",
          margin: "-4px 0 12px",
          fontSize: 15,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id + "-" + i}
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                background:
                  msg.sender === "user"
                    ? userBubble
                    : aiBubble,
                color: msg.sender === "user" ? colorP : "#AF9B27",
                borderRadius: 9,
                padding: "8px 15px",
                whiteSpace: "pre-line",
                maxWidth: "70%",
                boxShadow:
                  msg.sender === "user"
                    ? "0 1.5px 6px rgba(38,91,66,0.02)"
                    : "0 1px 7px rgba(209, 209, 165,0.07)",
                fontWeight: 500,
                border:
                  msg.sender === "user"
                    ? `1px solid ${colorS}99`
                    : `1px solid ${colorA}44`,
                fontSize: 15.6,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.sender === "ai" && (
                <span role="img" aria-label="ai" style={{ marginRight: 6 }}>
                  🤖
                </span>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {/* Streaming AI message */}
        {streamingMsg && (
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                background: aiBubble,
                color: "#AF9B27",
                borderRadius: 9,
                padding: "8px 15px",
                maxWidth: "70%",
                fontWeight: 500,
                border: `1px solid ${colorA}44`,
                fontSize: 15.6,
                boxShadow: "0 1px 7px rgba(209, 209, 165,0.07)",
                alignSelf: "flex-start",
                fontStyle: "italic",
                opacity: 0.95,
              }}
            >
              <span role="img" aria-label="ai" style={{ marginRight: 6 }}>
                🤖
              </span>
              {streamingMsg}
              <span
                style={{
                  opacity: 0.5,
                  marginLeft: 4,
                  fontSize: 12,
                  verticalAlign: "middle",
                }}
              >
                ▋
              </span>
            </div>
          </div>
        )}

        {/* Error display in chat */}
        {error && (
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                background: "#fff0ee",
                color: "#c0392b",
                borderRadius: 9,
                padding: "8px 13px",
                maxWidth: "70%",
                border: "1px solid #EDB4AD",
                fontSize: 15.3,
                alignSelf: "flex-start",
                fontWeight: 500,
              }}
              aria-live="polite"
              tabIndex={0}
            >
              ⚠️ {error}
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <form
        onSubmit={handleUserSend}
        style={{
          display: "flex",
          gap: 7,
          alignItems: "center",
          padding: "0 16px",
        }}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Type your reflection or question..."
          value={input}
          disabled={fetching || !!streamingMsg}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            borderRadius: 8,
            border: `1.2px solid ${colorS}88`,
            fontSize: 15.2,
            padding: "10px 12px",
            outlineColor: colorP,
            background: "#fff",
            color: "#737956",
            marginRight: 0,
            boxShadow: "none",
          }}
          aria-label="Message"
        />
        <button
          type="submit"
          disabled={input.trim().length === 0 || fetching || !!streamingMsg}
          style={{
            marginLeft: 0,
            padding: "9px 20px",
            borderRadius: 7,
            background: colorP,
            color: "#fff",
            border: "none",
            fontWeight: 600,
            fontSize: 15,
            opacity: input.trim().length === 0 || fetching || !!streamingMsg ? 0.43 : 1,
            cursor: input.trim().length === 0 || fetching || !!streamingMsg ? "not-allowed" : "pointer",
            boxShadow: "0 2.5px 8px 0 #2e7d320b",
            transition: "background 0.2s",
          }}
          aria-label="Send"
        >
          {fetching || streamingMsg ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
