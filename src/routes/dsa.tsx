import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { Flame, CheckCircle2, Circle, ExternalLink, Calendar } from "lucide-react";

export const Route = createFileRoute("/dsa")({
  head: () => ({ meta: [{ title: "DSA Planner — HireGenie" }] }),
  component: DSA,
});

const TOPICS = [
  { name: "Arrays", total: 30, done: 24, color: "from-blue-500/30" },
  { name: "Strings", total: 25, done: 18, color: "from-purple-500/30" },
  { name: "Trees", total: 28, done: 16, color: "from-cyan-500/30" },
  { name: "Graphs", total: 32, done: 9, color: "from-pink-500/30" },
  { name: "DP", total: 35, done: 12, color: "from-amber-500/30" },
  { name: "Greedy", total: 20, done: 14, color: "from-emerald-500/30" },
  { name: "Backtracking", total: 18, done: 7, color: "from-indigo-500/30" },
];

const TASKS = [
  { t: "Solve: Course Schedule II", d: "Graphs · Medium", done: false },
  { t: "Solve: Longest Increasing Subsequence", d: "DP · Medium", done: false },
  { t: "Review: Trie implementation", d: "Strings · Easy", done: true },
  { t: "Solve: Word Ladder", d: "Graphs · Hard", done: false },
];

const RECOMMENDED = [
  { t: "Number of Islands", diff: "Medium", topic: "Graphs" },
  { t: "Coin Change", diff: "Medium", topic: "DP" },
  { t: "Serialize Binary Tree", diff: "Hard", topic: "Trees" },
  { t: "Longest Palindromic Substring", diff: "Medium", topic: "Strings" },
];

function DSA() {
  const [tasks, setTasks] = useState(TASKS);
  const totalDone = TOPICS.reduce((a, t) => a + t.done, 0);
  const total = TOPICS.reduce((a, t) => a + t.total, 0);

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="DSA Planner"
          title="Practice like a placement engineer."
          description="A personalized roadmap that adapts to your weak spots — no more tab graveyards."
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <GlowCard>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-transparent flex items-center justify-center text-amber-400">
                <Flame className="size-6" />
              </div>
              <div>
                <div className="text-3xl font-semibold">14</div>
                <div className="text-xs text-muted-foreground">Day streak</div>
              </div>
            </div>
          </GlowCard>
          <GlowCard>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Overall progress</div>
            <div className="text-3xl font-semibold">{totalDone}<span className="text-muted-foreground text-xl">/{total}</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-input overflow-hidden">
              <div className="h-full bg-[var(--gradient-aurora)]" style={{ width: `${(totalDone / total) * 100}%` }} />
            </div>
          </GlowCard>
          <GlowCard>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Today's focus</div>
            <div className="text-lg font-medium">Graphs + DP</div>
            <div className="text-xs text-muted-foreground mt-1">~ 45 min · 3 problems</div>
          </GlowCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlowCard className="lg:col-span-2">
            <div className="text-sm font-semibold mb-4">Topics</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {TOPICS.map((t) => {
                const pct = (t.done / t.total) * 100;
                return (
                  <div key={t.name} className={`relative rounded-xl p-4 glass glow-hover overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.color} to-transparent opacity-50`} />
                    <div className="relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t.done} / {t.total} solved</div>
                        </div>
                        <div className="text-xs font-mono text-[var(--neon-cyan)]">{Math.round(pct)}%</div>
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-black/30 overflow-hidden">
                        <div className="h-full bg-[var(--gradient-aurora)]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">Upcoming tasks</div>
            </div>
            <div className="space-y-2">
              {tasks.map((task, i) => (
                <button
                  key={task.t}
                  onClick={() => setTasks((arr) => arr.map((x, j) => (i === j ? { ...x, done: !x.done } : x)))}
                  className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-sidebar-accent/40 transition text-left"
                >
                  {task.done ? (
                    <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <div className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.t}</div>
                    <div className="text-xs text-muted-foreground">{task.d}</div>
                  </div>
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="lg:col-span-3">
            <div className="text-sm font-semibold mb-4">Recommended LeetCode questions</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {RECOMMENDED.map((r) => (
                <div key={r.t} className="p-4 rounded-xl glass glow-hover">
                  <div className="text-sm font-medium">{r.t}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">{r.topic}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      r.diff === "Hard" ? "bg-destructive/20 text-destructive" :
                      r.diff === "Medium" ? "bg-amber-400/15 text-amber-400" : "bg-emerald-400/15 text-emerald-400"
                    }`}>{r.diff}</span>
                  </div>
                  <button className="mt-3 text-xs text-[var(--neon-cyan)] inline-flex items-center gap-1">
                    Open <ExternalLink className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </AppShell>
  );
}
