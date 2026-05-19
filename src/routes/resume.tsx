import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { analyzeResume } from "@/services/mockApi";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

export const Route = createFileRoute("/resume")({
  head: () => ({ meta: [{ title: "Resume Analyzer — HireGenie" }] }),
  component: Resume,
});

type Analysis = Awaited<ReturnType<typeof analyzeResume>>;

function Resume() {
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);

  async function handleFile(file: File) {
    setAnalyzing(true);
    const r = await analyzeResume(file);
    setResult(r);
    setAnalyzing(false);
  }

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl">
        <PageHeader
          eyebrow="AI Resume Analyzer"
          title="Make your resume unmissable."
          description="Drop a PDF — we'll extract skills, run an ATS audit, and rewrite weak bullets."
        />

        {!result && (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            className={`block rounded-3xl border-2 border-dashed transition-all cursor-pointer p-14 text-center ${
              dragging
                ? "border-[var(--neon-purple)] bg-[var(--neon-purple)]/10 scale-[1.01]"
                : "border-border glass"
            }`}
          >
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {analyzing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="size-10 animate-spin text-[var(--neon-cyan)]" />
                <div className="text-sm">Analyzing your resume…</div>
                <div className="text-xs text-muted-foreground">Extracting skills, computing ATS score, generating recommendations</div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="size-16 rounded-2xl bg-[var(--gradient-aurora)]/20 border border-[var(--neon-purple)]/30 flex items-center justify-center glow animate-float">
                  <UploadCloud className="size-7 text-[var(--neon-cyan)]" />
                </div>
                <div className="text-lg font-medium">Drop your resume here</div>
                <div className="text-sm text-muted-foreground">PDF up to 10MB — fully on-device parsing</div>
                <div className="mt-2 text-xs px-3 py-1.5 rounded-full glass">or click to browse</div>
              </div>
            )}
          </label>
        )}

        {result && (
          <div className="grid lg:grid-cols-3 gap-5">
            <GlowCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-[var(--gradient-aurora)]/20 border border-[var(--neon-purple)]/30 flex items-center justify-center">
                  <FileText className="size-5 text-[var(--neon-cyan)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold truncate">{result.fileName}</div>
                  <div className="text-xs text-muted-foreground">Parsed · v3</div>
                </div>
              </div>
              <div className="h-48 -mx-2">
                <ResponsiveContainer>
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "ats", value: result.atsScore, fill: "url(#atsGrad)" }]} startAngle={90} endAngle={-270}>
                    <defs>
                      <linearGradient id="atsGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.72 0.2 250)" />
                        <stop offset="100%" stopColor="oklch(0.7 0.24 300)" />
                      </linearGradient>
                    </defs>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background={{ fill: "oklch(0.3 0.04 270 / 0.4)" }} dataKey="value" cornerRadius={20} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="-mt-32 text-center pointer-events-none">
                  <div className="text-4xl font-semibold gradient-text">{result.atsScore}</div>
                  <div className="text-xs text-muted-foreground">ATS Score</div>
                </div>
              </div>
              <button
                onClick={() => setResult(null)}
                className="mt-4 w-full text-xs px-3 py-2 rounded-lg glass hover:bg-surface transition"
              >
                Upload a different resume
              </button>
            </GlowCard>

            <GlowCard className="lg:col-span-2">
              <div className="text-sm font-semibold mb-3">Extracted skills</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {result.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full glass border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)]">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-sm font-semibold mb-3">Missing for SDE / AIML roles</div>
              <div className="flex flex-wrap gap-2">
                {result.missing.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-destructive/15 text-destructive border border-destructive/30">
                    {s}
                  </span>
                ))}
              </div>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <div className="text-sm font-semibold">Strengths</div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {result.strengths.map((s, i) => <li key={i} className="flex gap-2"><span className="text-emerald-400">→</span>{s}</li>)}
              </ul>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="size-4 text-amber-400" />
                <div className="text-sm font-semibold">Weaknesses</div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {result.weaknesses.map((s, i) => <li key={i} className="flex gap-2"><span className="text-amber-400">→</span>{s}</li>)}
              </ul>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="size-4 text-[var(--neon-cyan)]" />
                <div className="text-sm font-semibold">AI recommendations</div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {result.recommendations.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <Sparkles className="size-3.5 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </div>
        )}
      </div>
    </AppShell>
  );
}
