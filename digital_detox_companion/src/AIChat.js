import React, { useState, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * AIChat
 * Live AI-powered chat component with streaming response support.
 *
 * Props:
 * - theme: Object containing color overrides (e.g., {primary, secondary, accent}).
 *
 * Usage: Place this component inside your journaling or reflection workflow.
 */
function AIChat({ theme }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your Digital Detox AI Coach. Ask me anything or share your struggles—for quick detox tips, habit hacks, or motivation! 🌱",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingReply, setStreamingReply] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const apiEndpoint = "<YOUR_AI_API_ENDPOINT>"; // TODO: Replace with real API endpoint
  const apiKey = "<YOUR_API_KEY, if required>"; // TODO: Optionally inject via environment/config

  // Auto-scroll to bottom for new messages.
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingReply]);

  // PUBLIC_INTERFACE
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setError(null);
    // Display user message instantly.
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setStreamingReply("");
    try {
      // Stream AI reply using fetch + ReadableStream (assume OpenAI-style API or similar)
      const controller = new AbortController();
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          prompt: input,
          stream: true, // If the backend supports stream responses (if not, adapt below)
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`AI API error: ${response.status} ${response.statusText}`);
      }

      // Stream handling (text or JSONL chunks)
      const reader = response.body.getReader();
      let fullAssistantReply = "";
      const decoder = new TextDecoder("utf-8");

      // Read stream chunk by chunk
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Assume backend streams raw text, or you can adapt to OpenAI JSON-lines if needed
        fullAssistantReply += chunk;
        setStreamingReply(fullAssistantReply);
      }
      // Append AI message to chat log
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: fullAssistantReply.trim() },
      ]);
      setStreamingReply("");
    } catch (err) {
      // Handle streaming or network error
      const errMsg = (err && err.message) || "AI is currently unavailable.";
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          sender: "error",
          text: "Oops, AI failed: " + errMsg,
        },
      ]);
      setStreamingReply("");
    } finally {
      setLoading(false);
    }
  }

  // Message bubble style helpers
  const themeColors = {
    primary: theme?.primary || "#2E7D32",
    secondary: theme?.secondary || "#B2DFDB",
    accent: theme?.accent || "#FFD600",
    userBg: "#EFFBFC",
    aiBg: "#F9F6FF",
    aiText: "#4d5c4b",
    userText: "#224F5A",
    error: "#d23b44",
  };

  return (
    <div
      className="ai-chat-container"
      style={{
        marginTop: 30,
        background: "#fff",
        borderRadius: 11,
        border: `1.7px solid ${themeColors.secondary}`,
        padding: "16px 13px 13px",
        minHeight: 140,
        maxWidth: 530,
        fontFamily: "inherit",
        marginBottom: 16,
        boxShadow: "0 2px 12px 0 rgba(186,204,200,0.07)",
      }}
    >
      <div style={{ marginBottom: 13, fontWeight: 700, color: themeColors.primary, fontSize: 17 }}>
        <span role="img" aria-label="ai">🤖</span> AI Live Chat
      </div>
      <div
        className="ai-chat-log"
        style={{
          minHeight: 86,
          maxHeight: 205,
          overflowY: "auto",
          marginBottom: 9,
          paddingRight: 4,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              background:
                msg.sender === "ai"
                  ? themeColors.aiBg
                  : msg.sender === "user"
                  ? themeColors.userBg
                  : "#FFE7EA",
              color:
                msg.sender === "ai"
                  ? themeColors.aiText
                  : msg.sender === "user"
                  ? themeColors.userText
                  : themeColors.error,
              borderRadius: 9,
              padding: "7px 11px",
              marginBottom: 7,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              fontWeight: msg.sender === "ai" ? 500 : 400,
              fontSize: 15.1,
              border:
                msg.sender === "error"
                  ? `1.6px solid ${themeColors.error}88`
                  : "none",
              whiteSpace: "pre-line",
              boxShadow:
                msg.sender === "ai"
                  ? "0 1.5px 9px 0 rgba(210,228,215,0.08)"
                  : "none",
              maxWidth: "95%",
            }}
            data-testid={
              msg.sender === "ai"
                ? "ai-msg"
                : msg.sender === "user"
                ? "user-msg"
                : "ai-error-msg"
            }
          >
            {msg.sender === "ai" && (
              <span style={{ color: themeColors.accent, marginRight: 4 }}>🤖 </span>
            )}
            {msg.sender === "user" && (
              <span style={{ color: "#08A6B6", marginRight: 4 }}>🙋‍♂️ </span>
            )}
            {msg.text}
          </div>
        ))}

        {/* Live streaming reply as user waits */}
        {loading && streamingReply && (
          <div
            style={{
              background: themeColors.aiBg,
              color: themeColors.aiText,
              borderRadius: 9,
              padding: "7px 11px",
              marginBottom: 7,
              fontWeight: 500,
              fontSize: 15.1,
              whiteSpace: "pre-line",
              boxShadow: "0 1.5px 9px 0 rgba(210,228,215,0.08)",
              opacity: 0.96,
              border: "1px dashed #DFDFDA",
              maxWidth: "97%",
            }}
            data-testid="ai-streaming-msg"
          >
            <span style={{ color: themeColors.accent, marginRight: 4 }}>🤖 </span>
            {streamingReply}
            <span className="ai-cursor" style={{ opacity: 0.4, marginLeft: 1 }}>|</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 1 }}
      >
        <input
          type="text"
          placeholder={
            loading
              ? "AI is replying..."
              : "Ask for a tip, advice, or share your challenge…"
          }
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          style={{
            flex: 1,
            borderRadius: 6,
            border: "1.4px solid #DFDFDA",
            padding: "8px 12px",
            fontSize: 15,
            outlineColor: themeColors.primary,
            background: loading ? "#F6F8F9" : "#fff",
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="ai-send-btn"
          style={{
            background: themeColors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 17px",
            fontWeight: 600,
            fontSize: 15.3,
            opacity: !input.trim() || loading ? 0.47 : 1,
            cursor: !input.trim() || loading ? "not-allowed" : "pointer",
            transition: "all 0.2s cubic-bezier(.42,0,.37,1.03)",
            boxShadow: loading ? "0 2px 12px #E2F1EA" : "",
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
      {!loading && error && (
        <div
          style={{
            marginTop: 8,
            color: themeColors.error,
            fontSize: 14.6,
            background: "#FFF3F3",
            borderRadius: 6,
            padding: "8px 11px",
            fontWeight: 500,
            border: `1px solid ${themeColors.error}22`,
          }}
        >
          <span style={{ marginRight: 5 }}>⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
}

export default AIChat;
