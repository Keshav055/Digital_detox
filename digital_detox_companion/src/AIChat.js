import React, { useState, useRef } from "react";

/*
 * PUBLIC_INTERFACE
 * AIChat - Chat interface for interacting with FastAPI/OpenAI backend,
 * now uses only server endpoint and does not reference apiKey in frontend.
 */
function AIChat({ theme = {} }) {
  // Theme customization.
  const colors = {
    primary: theme.primary || "#2E7D32",
    secondary: theme.secondary || "#B2DFDB",
    accent: theme.accent || "#FFD600"
  };

  // Use backend endpoint directly.
  const apiEndpoint = "http://localhost:8000/api/ai-chat";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text:
        "Hi! I'm your Digital Detox AI. How can I help you reflect or stay on track today?",
      initial: true
    }
  ]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef();
  const chatBottomRef = useRef();

  // PUBLIC_INTERFACE
  function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || pending) return;
    setError(null);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed }
    ]);
    setInput("");
    setPending(true);

    // POST to backend, with { message }.
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: trimmed })
    })
      .then(async (res) => {
        if (!res.ok) {
          // Try to parse error detail, fallback message.
          let txt = "AI service unavailable, please try again later.";
          try {
            const err = await res.json();
            if (err && err.detail) txt = err.detail;
          } catch (e) {}
          throw new Error(txt);
        }
        return res.json();
      })
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: data.assistant || "..." }
        ]);
        setPending(false);
        setTimeout(() => {
          if (chatBottomRef.current) chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
        }, 50);
      })
      .catch((err) => {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: "[AI error]: " + (err.message || "Service unavailable.") }
        ]);
        setPending(false);
        setError(err.message || "Server error");
      });
  }

  // Handle Ctrl+Enter for submit
  function handleInputKeyDown(e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSend(e);
    }
  }

  // Basic rendering
  return (
    <section
      style={{
        background: "#f4fffa",
        border: `1.2px solid ${colors.secondary}`,
        borderRadius: 14,
        marginTop: 28,
        marginBottom: 22,
        maxWidth: 520,
        width: "100%",
        boxShadow: "0 4px 18px 0 rgba(46,125,50,0.05)"
      }}
    >
      <div
        style={{
          padding: "12px 18px 6px",
          fontWeight: 600,
          color: colors.primary,
          fontSize: 17,
          borderBottom: `1px solid ${colors.secondary}`
        }}
      >
        <span style={{ marginRight: 8 }}>🤖</span>
        AI Chat Coach
      </div>

      <div
        style={{
          maxHeight: 280,
          overflowY: "auto",
          background: "#fff",
          borderRadius: "0 0 0 0",
          padding: "14px 18px 9px",
          minHeight: 90
        }}
      >
        <div>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 10,
                textAlign: msg.from === "user" ? "right" : "left"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: msg.from === "ai" ? colors.secondary : "#FBECCC",
                  color: msg.from === "ai" ? colors.primary : "#87641a",
                  borderRadius: 11,
                  padding: "9px 13px",
                  fontWeight: 500,
                  fontSize: 15,
                  maxWidth: "95%",
                  wordBreak: "break-word",
                  boxShadow: msg.from === "ai"
                    ? "0 1.5px 8px 0 #7cd7810c"
                    : "0 2px 12px 0 #ffdfa420"
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>
        {pending && (
          <div
            style={{
              background: colors.secondary,
              color: colors.primary,
              padding: "8px 13px",
              borderRadius: 9,
              fontSize: 14,
              marginBottom: 4,
              display: "inline-block"
            }}
          >
            ...AI is writing
          </div>
        )}
      </div>

      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          alignItems: "flex-end",
          borderTop: `1px solid ${colors.secondary}`,
          padding: "10px 18px"
        }}
        autoComplete="off"
      >
        <textarea
          ref={inputRef}
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={pending}
          placeholder="Ask for a reflection, tip, or encouragement..."
          maxLength={300}
          style={{
            flex: 1,
            resize: "vertical",
            borderRadius: 8,
            border: `1.3px solid ${colors.secondary}`,
            fontSize: 15,
            padding: "8px 10px",
            outlineColor: colors.primary,
            background: "#fff",
            color: "#215536"
          }}
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          style={{
            marginLeft: 10,
            background: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: 15,
            cursor: pending || !input.trim() ? "not-allowed" : "pointer",
            opacity: pending || !input.trim() ? 0.45 : 1
          }}
        >
          Send
        </button>
      </form>
      {error && (
        <div style={{ color: "#ad5324", fontWeight: 500, fontSize: 14, margin: "0 0 8px 18px" }}>
          {error}
        </div>
      )}
    </section>
  );
}

export default AIChat;
