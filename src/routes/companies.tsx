import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { Search, Building2, BookOpen, Brain, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/companies")({
  head: () => ({ meta: [{ title: "Company Preparation — HireGenie" }] }),
  component: Companies,
});

const COMPANIES = [
  {
    name: "Amazon",
    role: "SDE-1",
    color: "from-amber-500/30 to-orange-500/20",
    topics: ["Trees", "Graphs", "DP", "OOP Design"],
    patterns: ["BFS/DFS", "Sliding Window", "Two Pointers"],
    rounds: ["Online Assessment", "DSA Phone Screen", "2x Onsite Coding", "Bar Raiser"],
    focus: "Leadership Principles · Customer Obsession",
  },
  {
    name: "Google",
    role: "SWE",
    color: "from-blue-500/30 to-cyan-500/20",
    topics: ["Graphs", "DP", "System Design", "Math"],
    patterns: ["Recursion", "Backtracking", "Tries"],
    rounds: ["Phone Screen", "4x Onsite Coding", "Googleyness"],
    focus: "Algorithmic depth + clean code",
  },
  {
    name: "Microsoft",
    role: "SDE / AI",
    color: "from-emerald-500/30 to-cyan-500/20",
    topics: ["Trees", "Strings", "Arrays", "Concurrency"],
    patterns: ["Recursion", "Hashing", "Heap"],
    rounds: ["OA", "3x Technical", "AA (As Appropriate)"],
    focus: "Problem-solving clarity",
  },
  {
    name: "Goldman Sachs",
    role: "Tech Analyst",
    color: "from-purple-500/30 to-pink-500/20",
    topics: ["Aptitude", "OOP", "DBMS", "Probability"],
    patterns: ["Mathy DSA", "Easy-Medium"],
    rounds: ["Coderpad", "Technical x2", "HR + Hirevue"],
    focus: "Quant aptitude + fundamentals",
  },
  {
    name: "Adobe",
    role: "AIML / SDE",
    color: "from-rose-500/30 to-red-500/20",
    topics: ["ML Fundamentals", "DSA", "OS", "Projects"],
    patterns: ["Greedy", "DP", "Linked Lists"],
    rounds: ["OA", "Tech Round", "Manager Round", "HR"],
    focus: "Depth in your projects",
  },
];

function Companies() {
  const [q, setQ] = useState("");
  const filtered = COMPANIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="Company Playbooks"
          title="Walk into every round prepared."
          description="Targeted prep cards per company — topics, patterns, rounds, and focus areas."
        />

        <div className="relative max-w-md mb-6">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search companies..."
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-input/50 border border-border focus:border-primary/60 focus:bg-input/80 transition outline-none text-sm"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <div key={c.name} className="relative rounded-2xl glass glow-hover overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-60`} />
              <div className="relative p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-11 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center">
                    <Building2 className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                      <BookOpen className="size-3" /> Likely topics
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.topics.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-black/30 border border-white/10">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                      <Brain className="size-3" /> Frequent DSA patterns
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.patterns.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                      <Users className="size-3" /> Rounds
                    </div>
                    <ol className="space-y-1 text-xs">
                      {c.rounds.map((r, i) => (
                        <li key={r} className="flex gap-2">
                          <span className="text-muted-foreground">{i + 1}.</span>
                          {r}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2">
                  <Sparkles className="size-3.5 text-[var(--neon-cyan)] mt-0.5 shrink-0" />
                  <div className="text-xs text-muted-foreground">{c.focus}</div>
                </div>

                <button className="mt-4 w-full text-sm px-3 py-2 rounded-lg bg-[var(--gradient-aurora)] text-white font-medium">
                  Open roadmap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
