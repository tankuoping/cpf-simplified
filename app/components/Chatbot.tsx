"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What's the difference between BRS, FRS and ERS?",
  "How much CPF do I contribute at age 45?",
  "Which CPF LIFE plan should I choose?",
  "Can I use CPF to buy a private property?",
  "What happens to my CPF at age 55?",
  "How does MediSave work?",
  "Should I top up my SA for tax relief?",
  "What is the accrued interest on CPF housing?",
];

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^\| (.+) \|$/gm, (line) => {
      const cells = line.split("|").filter((c) => c.trim());
      return "<tr>" + cells.map((c) => `<td>${c.trim()}</td>`).join("") + "</tr>";
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (block) => {
      const rows = block.trim().split("\n");
      const head = rows[0].replace(/<td>/g, "<th>").replace(/<\/td>/g, "</th>");
      const body = rows
        .slice(2)
        .filter((r) => !r.match(/^<tr><td>[-\s|]+<\/td><\/tr>$/))
        .join("\n");
      return `<table><thead>${head}</thead><tbody>${body}</tbody></table>`;
    })
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/gs, "<ul>$&</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul|t])(.+)$/gm, (line) =>
      line.trim() ? `<p>${line}</p>` : ""
    )
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<[hul])/g, "$1")
    .replace(/(<\/[hul][^>]*>)<\/p>/g, "$1");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedText]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setStreamedText("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) throw new Error("API error");
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          setStreamedText(full);
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: full },
        ]);
        setStreamedText("");
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, something went wrong. Please check your API key and try again.",
          },
        ]);
        setStreamedText("");
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close CPF assistant" : "Open CPF assistant"}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--ra)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 24,
          boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
        }
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "1.5rem",
            zIndex: 99,
            width: "min(420px, calc(100vw - 2rem))",
            height: "min(600px, calc(100vh - 7rem))",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.16)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "var(--card)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--ra)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                CPF Assistant
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                Powered by Claude · Ask me anything about CPF
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {messages.length === 0 && !loading && (
              <div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  Hi! I know CPF inside out — contributions, retirement sums,
                  CPF LIFE, housing, MediSave, and more. Ask me anything.
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Suggested questions:
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "0.6rem 0.9rem",
                        fontSize: "0.82rem",
                        color: "var(--text)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "border-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.borderColor =
                          "var(--ra)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.borderColor =
                          "var(--border)")
                      }
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  className={m.role === "assistant" ? "ai-message" : ""}
                  style={{
                    maxWidth: "90%",
                    padding: "0.75rem 1rem",
                    borderRadius:
                      m.role === "user"
                        ? "14px 14px 2px 14px"
                        : "14px 14px 14px 2px",
                    background:
                      m.role === "user" ? "var(--ra)" : "var(--chat-ai)",
                    border:
                      m.role === "user"
                        ? "none"
                        : "1px solid var(--chat-ai-border)",
                    color: m.role === "user" ? "#fff" : "var(--text)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                  dangerouslySetInnerHTML={
                    m.role === "assistant"
                      ? { __html: renderMarkdown(m.content) }
                      : undefined
                  }
                >
                  {m.role === "user" ? m.content : null}
                </div>
              </div>
            ))}

            {/* Streaming */}
            {streamedText && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  className="ai-message"
                  style={{
                    maxWidth: "90%",
                    padding: "0.75rem 1rem",
                    borderRadius: "14px 14px 14px 2px",
                    background: "var(--chat-ai)",
                    border: "1px solid var(--chat-ai-border)",
                    color: "var(--text)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(streamedText) + '<span style="display:inline-block;width:6px;height:14px;background:var(--ra);margin-left:3px;border-radius:2px;animation:blink 0.9s step-end infinite"></span>',
                  }}
                />
              </div>
            )}

            {loading && !streamedText && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "14px 14px 14px 2px",
                    background: "var(--chat-ai)",
                    border: "1px solid var(--chat-ai-border)",
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                  }}
                >
                  Thinking…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about CPF…"
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                resize: "none",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "0.6rem 0.75rem",
                fontSize: "0.875rem",
                background: "var(--bg)",
                color: "var(--text)",
                fontFamily: "inherit",
                outline: "none",
                maxHeight: 120,
                overflowY: "auto",
              }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 120) + "px";
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background:
                  !input.trim() || loading ? "var(--border)" : "var(--ra)",
                border: "none",
                cursor:
                  !input.trim() || loading ? "not-allowed" : "pointer",
                color: "#fff",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </>
  );
}
