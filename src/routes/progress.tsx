import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { Trophy, Flame, Sparkles, Award, Zap, Target } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Progress Tracker — HireGenie" }] }),
  component: Progress,
});

// 12 weeks heatmap
const HEATMAP = Array.from({ length: 12 * 7 }, (_, i) => ({
  i,
  v: Math.floor(Math.random() * 5),
}));

const WEEKLY = [
  { d: "W1", v: 18 }, { d: "W2", v: 25 }, { d: "W3", v: 22 },
  { d: "W4", v: 35 }, { d: "W5", v: 41 }, { d: "W6", v: 38 },
  { d: "W7", v: 52 }, { d: "W8", v: 60 },
];

const TOPICS = [
  { name: "Arrays", v: 92 },
  { name: "Strings", v: 78 },
  { name: "Trees", v: 65 },
  { name: "Graphs", v: 38 },
  { name: "DP", v: 42 },
  { name: "Greedy", v: 71 },
];

const ACHIEVEMENTS = [
  { i: Flame, t: "14-day streak", d: "Personal best", got: true },
  { i: Trophy, t: "First mock score 90+", d: "Technical track", got: true },
  { i: Award, t: "50 mediums solved", d: "DSA Planner", got: true },
  { i: Target, t: "ATS score 90+", d: "Resume Analyzer", got: false },
  { i: Zap, t: "30-day streak", d: "Keep going!", got: false },
];

function Progress() {
  const levelColors = ["bg-sidebar-accent/30", "bg-[var(--neon-blue)]/30", "bg-[var(--neon-blue)]/55", "bg-[var(--neon-purple)]/70", "bg-[var(--neon-purple)]"];
  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="Progress Tracker"
          title="Momentum, visualized."
          description="Heatmaps, mastery, and AI insights that compound your prep."
        />

        <div className="grid lg:grid-cols-3 gap-5">
          <GlowCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">Activity heatmap — last 12 weeks</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                Less
                {levelColors.map((c, i) => <span key={i} className={`size-3 rounded ${c}`} />)}
                More
              </div>
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-1.5">
              {HEATMAP.map((d) => (
                <div key={d.i} className={`size-4 rounded ${levelColors[d.v]}`} />
              ))}
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">AI Insights</div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Your consistency improved <span className="text-emerald-400">+38%</span> vs last month.</li>
              <li>Graphs mastery is the bottleneck — 4 sessions away from 60%.</li>
              <li>Top performance window: <span className="text-foreground">21:00–23:00</span>.</li>
            </ul>
          </GlowCard>

          <GlowCard className="lg:col-span-2">
            <div className="text-sm font-semibold mb-3">Weekly consistency</div>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={WEEKLY}>
                  <defs>
                    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.24 300)" />
                      <stop offset="100%" stopColor="oklch(0.72 0.2 250)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.7 0.03 260)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.03 260)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.2 0.03 270 / 0.9)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12 }} />
                  <Bar dataKey="v" fill="url(#bg)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="text-sm font-semibold mb-4">Topic mastery</div>
            <div className="space-y-3">
              {TOPICS.map((t) => (
                <div key={t.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{t.name}</span>
                    <span className="text-muted-foreground font-mono">{t.v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-input overflow-hidden">
                    <div className="h-full bg-[var(--gradient-aurora)]" style={{ width: `${t.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="lg:col-span-3">
            <div className="text-sm font-semibold mb-4">Achievements</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {ACHIEVEMENTS.map((a) => {
                const I = a.i;
                return (
                  <div key={a.t} className={`rounded-xl p-4 glass text-center ${!a.got ? "opacity-40" : "glow-hover"}`}>
                    <div className={`size-12 mx-auto rounded-2xl flex items-center justify-center ${a.got ? "bg-[var(--gradient-aurora)] glow" : "bg-muted"}`}>
                      <I className="size-6 text-white" />
                    </div>
                    <div className="mt-3 text-sm font-medium">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.d}</div>
                  </div>
                );
              })}
            </div>
          </GlowCard>
        </div>
      </div>
    </AppShell>
  );
}
