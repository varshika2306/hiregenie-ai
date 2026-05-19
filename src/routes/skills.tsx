import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [{ title: "Skill Gap Analysis — HireGenie" }] }),
  component: Skills,
});

const ROLES: Record<string, { current: { skill: string; you: number; target: number }[]; missing: string[]; roadmap: string[] }> = {
  "AIML Engineer": {
    current: [
      { skill: "Python", you: 90, target: 95 },
      { skill: "PyTorch", you: 80, target: 90 },
      { skill: "ML Theory", you: 70, target: 85 },
      { skill: "MLOps", you: 40, target: 80 },
      { skill: "System Design", you: 30, target: 70 },
      { skill: "SQL", you: 60, target: 75 },
    ],
    missing: ["Kubernetes", "Kafka", "Distributed Training", "LLM Fine-tuning"],
    roadmap: [
      "Week 1 — Ship an end-to-end MLOps pipeline (FastAPI + Docker + GitHub Actions)",
      "Week 2 — Fine-tune a small LLM on a domain dataset and benchmark latency",
      "Week 3 — Build a streaming inference service with Kafka",
      "Week 4 — Mock interviews focused on ML system design",
    ],
  },
  SDE: {
    current: [
      { skill: "DSA", you: 75, target: 90 },
      { skill: "System Design", you: 35, target: 80 },
      { skill: "Backend", you: 70, target: 85 },
      { skill: "Databases", you: 60, target: 80 },
      { skill: "OS / Networks", you: 55, target: 75 },
      { skill: "DevOps", you: 45, target: 70 },
    ],
    missing: ["Distributed Systems", "Caching Patterns", "Microservices", "gRPC"],
    roadmap: [
      "Week 1 — Daily 3 mediums (Graphs + DP focus)",
      "Week 2 — Build a URL shortener with metrics, caching, and rate limiting",
      "Week 3 — System design deep dives (Twitter feed, Uber, WhatsApp)",
      "Week 4 — Behavioral STAR drills + 5 mock interviews",
    ],
  },
  "Data Scientist": {
    current: [
      { skill: "Stats", you: 80, target: 90 },
      { skill: "SQL", you: 85, target: 90 },
      { skill: "Python", you: 88, target: 90 },
      { skill: "Storytelling", you: 50, target: 80 },
      { skill: "ML", you: 70, target: 85 },
      { skill: "Experimentation", you: 45, target: 80 },
    ],
    missing: ["Causal Inference", "A/B Testing", "DBT", "Tableau"],
    roadmap: [
      "Week 1 — A/B testing course + 3 case studies",
      "Week 2 — Causal inference primer + reproduce 1 paper",
      "Week 3 — Storytelling: 3 dashboards with crisp narratives",
      "Week 4 — Mock case interviews",
    ],
  },
  "Backend Engineer": {
    current: [
      { skill: "APIs", you: 80, target: 90 },
      { skill: "Databases", you: 70, target: 85 },
      { skill: "System Design", you: 40, target: 80 },
      { skill: "DSA", you: 65, target: 80 },
      { skill: "Cloud", you: 55, target: 75 },
      { skill: "Security", you: 45, target: 70 },
    ],
    missing: ["Message Queues", "Sharding", "Observability", "OAuth flows"],
    roadmap: [
      "Week 1 — Build a sharded multi-tenant API",
      "Week 2 — Add tracing, metrics, alerts",
      "Week 3 — Implement OAuth + RBAC",
      "Week 4 — System design mocks",
    ],
  },
};

function Skills() {
  const [role, setRole] = useState<keyof typeof ROLES>("AIML Engineer");
  const data = ROLES[role];
  const radar = data.current.map((c) => ({ subject: c.skill, you: c.you, target: c.target }));

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="Skill Gap Engine"
          title="Compare yourself to the role you want."
          description="Pick a target role — we'll surface what's missing and ship a 4-week roadmap."
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(ROLES) as (keyof typeof ROLES)[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`text-sm px-4 py-2 rounded-xl transition ${
                role === r
                  ? "bg-[var(--gradient-aurora)] text-white glow"
                  : "glass glow-hover text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <GlowCard className="lg:col-span-2">
            <div className="text-sm font-semibold mb-2">You vs target — {role}</div>
            <div className="h-80">
              <ResponsiveContainer>
                <RadarChart data={radar}>
                  <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.85 0.02 260)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Target" dataKey="target" stroke="oklch(0.7 0.24 300)" fill="oklch(0.7 0.24 300)" fillOpacity={0.15} />
                  <Radar name="You" dataKey="you" stroke="oklch(0.82 0.16 200)" fill="oklch(0.82 0.16 200)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="text-sm font-semibold mb-3">Missing skills</div>
            <div className="space-y-2">
              {data.missing.map((m) => (
                <div key={m} className="flex items-center gap-2 text-sm">
                  <Circle className="size-3.5 text-destructive" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm font-semibold mb-3">Current skills</div>
            <div className="space-y-2.5">
              {data.current.map((c) => (
                <div key={c.skill}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{c.skill}</span>
                    <span className="text-muted-foreground">{c.you}/{c.target}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-input overflow-hidden">
                    <div
                      className="h-full bg-[var(--gradient-aurora)]"
                      style={{ width: `${(c.you / c.target) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">AI-generated 4-week roadmap</div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {data.roadmap.map((r, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl glass glow-hover">
                  <div className="size-9 rounded-lg bg-[var(--gradient-aurora)] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-sm">{r}</div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </AppShell>
  );
}
