import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard, StatCard } from "@/components/ui-kit/GlowCard";
import {
  Flame,
  Target,
  Trophy,
  Brain,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Mic,
  FileText,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — HireGenie" }] }),
  component: Dashboard,
});

const activity = [
  { d: "Mon", v: 24 },
  { d: "Tue", v: 38 },
  { d: "Wed", v: 30 },
  { d: "Thu", v: 52 },
  { d: "Fri", v: 41 },
  { d: "Sat", v: 67 },
  { d: "Sun", v: 58 },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="Welcome back, Arjun"
          title="Your placement command center."
          description="AI-curated next actions, signals, and momentum — all in one place."
          actions={
            <Link
              to="/mentor"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--gradient-aurora)] text-white text-sm font-medium glow"
            >
              <Sparkles className="size-4" /> Ask AI Mentor
            </Link>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="ATS Score" value="82" delta="+6 this week" icon={<Target className="size-5" />} accent="blue" />
          <StatCard label="Daily Streak" value="14d" delta="Personal best" icon={<Flame className="size-5" />} accent="purple" />
          <StatCard label="Mock Interviews" value="27" delta="+4 this week" icon={<Mic className="size-5" />} accent="cyan" />
          <StatCard label="Skills Mastered" value="38" delta="+3 this week" icon={<Trophy className="size-5" />} accent="green" />
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-5">
          <GlowCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">Weekly activity</div>
                <div className="text-xs text-muted-foreground">Mins of focused practice</div>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full glass">Last 7 days</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activity}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.24 300)" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="oklch(0.72 0.2 250)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.7 0.03 260)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.03 260)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.2 0.03 270 / 0.9)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.7 0.24 300)" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">AI Insights</div>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "You're underperforming on **Graphs** — add 3 sessions this week.",
                "Your resume is missing **system design** keywords.",
                "Best mock-interview window: 9–11 PM (confidence +12%).",
              ].map((t, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--neon-purple)] shrink-0" />
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.*?)\*\*/g, '<span class="text-foreground font-medium">$1</span>') }} />
                </li>
              ))}
            </ul>
          </GlowCard>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-5">
          <GlowCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">Recommended next steps</div>
              <Link to="/dsa" className="text-xs text-[var(--neon-cyan)] inline-flex items-center gap-1">
                View planner <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {[
                { t: "Solve 3 Graph mediums", s: "DSA Planner · 45 min", to: "/dsa" },
                { t: "Take a Google-style mock", s: "Mock Interview · 30 min", to: "/interview" },
                { t: "Re-run ATS scan on resume v3", s: "Resume Analyzer · 2 min", to: "/resume" },
              ].map((r) => (
                <Link
                  to={r.to}
                  key={r.t}
                  className="flex items-center gap-3 p-3 rounded-xl glass glow-hover"
                >
                  <div className="size-9 rounded-lg bg-[var(--gradient-aurora)]/20 border border-[var(--neon-purple)]/30 flex items-center justify-center">
                    <Sparkles className="size-4 text-[var(--neon-cyan)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.t}</div>
                    <div className="text-xs text-muted-foreground">{r.s}</div>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">Upcoming</div>
            </div>
            <div className="space-y-3">
              {[
                { t: "Amazon OA window", d: "Tomorrow · 7:00 PM" },
                { t: "Mock w/ AI · System Design", d: "Fri · 9:00 PM" },
                { t: "Adobe interview prep", d: "Sun · 11:00 AM" },
              ].map((u) => (
                <div key={u.t} className="flex items-start gap-3">
                  <div className="size-2 mt-1.5 rounded-full bg-[var(--neon-cyan)]" />
                  <div>
                    <div className="text-sm font-medium">{u.t}</div>
                    <div className="text-xs text-muted-foreground">{u.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {[
            { i: FileText, t: "Resume v3.pdf", s: "Analyzed 2 days ago · 82 ATS", to: "/resume" },
            { i: Mic, t: "DSA Mock #14", s: "Confidence 88%", to: "/interview" },
            { i: Target, t: "Skill gap → SDE", s: "5 skills missing", to: "/skills" },
          ].map((r) => {
            const I = r.i;
            return (
              <Link key={r.t} to={r.to} className="block">
                <GlowCard className="h-full">
                  <I className="size-5 text-[var(--neon-cyan)]" />
                  <div className="mt-3 font-medium">{r.t}</div>
                  <div className="text-xs text-muted-foreground">{r.s}</div>
                </GlowCard>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
