import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { generateInterviewQuestions, scoreAnswer, type MockQuestion } from "@/services/mockApi";
import { Mic, Play, Loader2, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Mock Interview — HireGenie" }] }),
  component: Interview,
});

const TRACKS = ["Technical", "HR", "AIML", "DSA"] as const;
type Track = (typeof TRACKS)[number];

function Interview() {
  const [track, setTrack] = useState<Track>("Technical");
  const [stage, setStage] = useState<"idle" | "interview" | "feedback">("idle");
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<Awaited<ReturnType<typeof scoreAnswer>> | null>(null);

  async function start() {
    setLoading(true);
    const qs = await generateInterviewQuestions(track);
    setQuestions(qs);
    setIdx(0);
    setAnswer("");
    setStage("interview");
    setLoading(false);
  }

  async function submit() {
    setLoading(true);
    const s = await scoreAnswer(answer);
    setScores(s);
    setStage("feedback");
    setLoading(false);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setAnswer("");
      setScores(null);
      setStage("interview");
    } else {
      setStage("idle");
      setQuestions([]);
    }
  }

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-6xl">
        <PageHeader
          eyebrow="Mock Interview"
          title="Train like it's the real round."
          description="Adaptive questions, instant feedback, and a confidence score that compounds."
        />

        {stage === "idle" && (
          <div className="grid lg:grid-cols-3 gap-5">
            <GlowCard className="lg:col-span-2">
              <div className="text-sm font-semibold mb-3">Choose your track</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {TRACKS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrack(t)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                      track === t ? "bg-[var(--gradient-aurora)] text-white glow" : "glass glow-hover text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={start}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[var(--gradient-aurora)] text-white font-medium glow hover:scale-[1.01] transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : <Play className="size-5" />}
                Start {track} interview
              </button>
              <div className="mt-4 text-xs text-muted-foreground">
                You'll get 3 questions. AI scores confidence, communication & technical depth.
              </div>
            </GlowCard>

            <GlowCard>
              <div className="text-sm font-semibold mb-4">Recent sessions</div>
              <div className="space-y-3">
                {[
                  { t: "Technical · Mar 18", s: 88 },
                  { t: "DSA · Mar 15", s: 76 },
                  { t: "HR · Mar 12", s: 92 },
                ].map((s) => (
                  <div key={s.t} className="flex items-center justify-between text-sm p-2.5 rounded-lg glass">
                    <span>{s.t}</span>
                    <span className="text-[var(--neon-cyan)] font-mono">{s.s}%</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )}

        {stage === "interview" && questions[idx] && (
          <div className="grid lg:grid-cols-3 gap-5">
            <GlowCard className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs px-2.5 py-1 rounded-full glass">
                  Question {idx + 1} of {questions.length} · {track}
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--neon-cyan)]">
                  <Mic className="size-3.5" /> Recording
                </div>
              </div>
              <div className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                {questions[idx].question}
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here — structure with STAR, code, or pseudocode..."
                className="w-full h-64 p-4 rounded-xl bg-input/50 border border-border focus:border-primary/60 focus:bg-input/80 transition outline-none resize-none text-sm leading-relaxed font-mono"
              />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={submit}
                  disabled={!answer.trim() || loading}
                  className="px-5 py-2.5 rounded-xl bg-[var(--gradient-aurora)] text-white text-sm font-medium glow inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                  Submit for AI feedback
                </button>
                <button onClick={() => setStage("idle")} className="px-5 py-2.5 rounded-xl glass text-sm">
                  End session
                </button>
              </div>
            </GlowCard>

            <GlowCard>
              <div className="text-sm font-semibold mb-3">Tips for this question</div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-[var(--neon-cyan)]">→</span>Restate before solving — clarify constraints.</li>
                <li className="flex gap-2"><span className="text-[var(--neon-cyan)]">→</span>Think aloud. Silence = uncertainty signal.</li>
                <li className="flex gap-2"><span className="text-[var(--neon-cyan)]">→</span>End with trade-offs and what you'd do next.</li>
              </ul>
            </GlowCard>
          </div>
        )}

        {stage === "feedback" && scores && (
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { l: "Confidence", v: scores.confidence },
              { l: "Communication", v: scores.communication },
              { l: "Technical", v: scores.technical },
            ].map((s) => (
              <GlowCard key={s.l}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-2 text-5xl font-semibold gradient-text">{s.v}</div>
                <div className="mt-3 h-1.5 rounded-full bg-input overflow-hidden">
                  <div className="h-full bg-[var(--gradient-aurora)]" style={{ width: `${s.v}%` }} />
                </div>
              </GlowCard>
            ))}
            <GlowCard className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-4 text-[var(--neon-cyan)]" />
                <div className="text-sm font-semibold">AI Feedback</div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{scores.feedback}</p>
              <div className="mt-5 flex gap-3">
                <button onClick={next} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gradient-aurora)] text-white text-sm font-medium glow">
                  Next question <ArrowRight className="size-4" />
                </button>
                <button onClick={() => setStage("idle")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm">
                  <RotateCcw className="size-4" /> New session
                </button>
              </div>
            </GlowCard>
          </div>
        )}
      </div>
    </AppShell>
  );
}
