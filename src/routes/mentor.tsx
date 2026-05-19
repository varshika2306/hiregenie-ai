import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AppShell } from "@/components/layout/AppShell";
import { chatWithMentor } from "@/services/mockApi";
import { Send, Sparkles, Plus, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/mentor")({
  head: () => ({ meta: [{ title: "AI Mentor — HireGenie" }] }),
  component: Mentor,
});

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Build me a 4-week DSA plan for arrays & graphs",
  "How should I structure my resume for Google?",
  "What are common ML system design questions?",
  "Mock interview me on dynamic programming",
];

const HISTORY = [
  "Roadmap for AIML internship",
  "Behavioral STAR examples",
  "Amazon LP — Customer Obsession",
  "Resume bullets rewrite",
];

function Mentor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey Arjun — I've reviewed your resume and tracker. **You're 73% ready for SDE-1 roles.** What should we tackle today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    const reply = await chatWithMentor(text);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Conversation history */}
        <div className="hidden xl:flex w-64 border-r border-border/60 flex-col p-4 gap-3">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-[var(--gradient-aurora)] text-white text-sm font-medium glow">
            <Plus className="size-4" /> New chat
          </button>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground px-2 mt-3">
            Recent
          </div>
          <div className="space-y-1 overflow-y-auto scrollbar-thin">
            {HISTORY.map((h, i) => (
              <button
                key={h}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${
                  i === 0 ? "glass" : "text-muted-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <MessagesSquare className="size-3.5 shrink-0" />
                <span className="truncate">{h}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main chat */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <div className="size-8 rounded-lg bg-[var(--gradient-aurora)] flex items-center justify-center shrink-0 glow">
                      <Sparkles className="size-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--gradient-aurora)] text-white"
                        : "glass"
                    }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-strong:text-foreground">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-lg bg-[var(--gradient-aurora)] flex items-center justify-center shrink-0 glow">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  <div className="glass rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                    <span className="size-2 rounded-full bg-[var(--neon-cyan)] animate-pulse [animation-delay:150ms]" />
                    <span className="size-2 rounded-full bg-[var(--neon-cyan)] animate-pulse [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-border/60 p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              {messages.length <= 1 && (
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-sm px-3.5 py-2.5 rounded-xl glass glow-hover"
                    >
                      <span className="text-muted-foreground">{s}</span>
                    </button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="relative rounded-2xl gradient-border p-1"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything — DSA, resume, interview..."
                  className="w-full bg-transparent px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-9 rounded-xl bg-[var(--gradient-aurora)] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition glow"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
