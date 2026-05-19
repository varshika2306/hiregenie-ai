import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  ArrowRight,
  Brain,
  FileSearch,
  Target,
  Mic,
  Building2,
  LineChart,
  Github,
  Twitter,
  Linkedin,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HireGenie — Your Personal AI Placement Engineer" },
      {
        name: "description",
        content:
          "Futuristic AI platform for placement prep — resume analysis, mock interviews, DSA planner, and company insights tailored for software & AI/ML engineers.",
      },
      { property: "og:title", content: "HireGenie — Your Personal AI Placement Engineer" },
      {
        property: "og:description",
        content: "AI-powered prep: resume scans, mock interviews, DSA roadmaps, company insights.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    desc: "24/7 GPT-grade mentor that knows your skills, your gaps, and your timeline.",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "ATS scoring, skill extraction, and surgical edits in seconds.",
  },
  {
    icon: Target,
    title: "Skill Gap Engine",
    desc: "Compare yourself against the role you want. Get a roadmap, not a list.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    desc: "Voice-grade simulations with technical, behavioral, and DSA tracks.",
  },
  {
    icon: Building2,
    title: "Company Playbooks",
    desc: "Deep dives on Google, Amazon, Microsoft, Adobe, Goldman & more.",
  },
  {
    icon: LineChart,
    title: "Progress Tracker",
    desc: "Heatmaps, streaks, and AI nudges that compound your momentum.",
  },
];

const stats = [
  { v: "120K+", l: "Practice questions" },
  { v: "1.2M", l: "Mock answers scored" },
  { v: "94%", l: "Offer rate boost" },
  { v: "<2s", l: "Avg AI latency" },
];

const testimonials = [
  {
    name: "Ananya R.",
    role: "SDE-1 @ Amazon",
    quote:
      "The mock interviews felt eerily real. My confidence score went from 62 to 91 in two weeks.",
  },
  {
    name: "Rohan M.",
    role: "AIML Engineer @ Adobe",
    quote: "Resume Analyzer found 6 missing keywords. Got 3x more shortlists the next week.",
  },
  {
    name: "Priya S.",
    role: "Data Scientist @ Goldman",
    quote: "The DSA planner replaced 4 different trackers I was juggling. Pure flow state.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full opacity-60 pointer-events-none blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[var(--gradient-aurora)] flex items-center justify-center glow">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">
            Hire<span className="gradient-text">Genie</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#stats" className="hover:text-foreground transition">Stats</a>
          <a href="#testimonials" className="hover:text-foreground transition">Reviews</a>
          <Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
        </div>
        <Link
          to="/dashboard"
          className="text-sm px-4 py-2 rounded-lg glass glow-hover font-medium"
        >
          Launch app
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full glass mb-8"
        >
          <span className="size-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
          Now with adaptive interviews · v2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          Your Personal{" "}
          <span className="gradient-text">AI Placement Engineer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A single workspace that analyzes your resume, closes skill gaps, runs
          mock interviews, and builds a personalized roadmap — for software,
          AI/ML, and data roles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/dashboard"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gradient-aurora)] text-white font-medium glow hover:scale-[1.02] transition"
          >
            Get Started
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glow-hover font-medium"
          >
            <Upload className="size-4" />
            Upload Resume
          </Link>
        </motion.div>

        {/* Hero product card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-6 bg-[var(--gradient-aurora)] opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl gradient-border p-2 shadow-[0_30px_120px_-30px_oklch(0.7_0.24_300/0.5)]">
            <div className="rounded-xl overflow-hidden bg-background/80 backdrop-blur-xl">
              {/* Window chrome */}
              <div className="h-9 border-b border-border/60 flex items-center gap-1.5 px-4">
                <span className="size-2.5 rounded-full bg-red-400/60" />
                <span className="size-2.5 rounded-full bg-yellow-400/60" />
                <span className="size-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-3 text-[11px] text-muted-foreground font-mono">
                  hiregenie.app/dashboard
                </span>
              </div>
              {/* Mock dashboard preview */}
              <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-3 space-y-2">
                  {["Dashboard", "AI Mentor", "Resume", "DSA Planner", "Interview", "Companies"].map(
                    (s, i) => (
                      <div
                        key={s}
                        className={`text-xs px-3 py-2 rounded-lg ${
                          i === 0
                            ? "bg-[var(--gradient-aurora)] text-white"
                            : "glass text-muted-foreground"
                        }`}
                      >
                        {s}
                      </div>
                    ),
                  )}
                </div>
                <div className="col-span-9 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { l: "ATS Score", v: "82" },
                      { l: "Streak", v: "14d" },
                      { l: "Mocks", v: "27" },
                    ].map((s) => (
                      <div key={s.l} className="glass rounded-xl p-3 text-left">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {s.l}
                        </div>
                        <div className="text-xl font-semibold mt-1">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-xl p-4 text-left">
                    <div className="text-xs text-muted-foreground mb-3">Weekly activity</div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-md bg-[var(--gradient-aurora)] opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.l} className="glass rounded-2xl p-6 text-center glow-hover">
              <div className="text-3xl md:text-4xl font-semibold gradient-text">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full glass text-[var(--neon-cyan)] mb-4">
            Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Everything you need, <span className="gradient-text">nothing you don't</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl glass p-6 glow-hover overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 size-32 rounded-full bg-[var(--gradient-aurora)] opacity-0 group-hover:opacity-20 blur-2xl transition" />
                <div className="relative">
                  <div className="size-11 rounded-xl bg-[var(--gradient-aurora)]/15 border border-[var(--neon-purple)]/30 flex items-center justify-center text-[var(--neon-cyan)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Loved by <span className="gradient-text">engineers landing offers</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 glow-hover">
              <div className="flex gap-0.5 text-[var(--neon-cyan)] mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="size-9 rounded-full bg-[var(--gradient-aurora)] flex items-center justify-center text-xs font-semibold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="relative rounded-3xl gradient-border p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-aurora)] opacity-20" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Stop prepping. <span className="gradient-text">Start landing offers.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join thousands of engineers who replaced their tab graveyard with one AI workspace.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[var(--gradient-aurora)] text-white font-medium glow hover:scale-[1.02] transition"
            >
              Open dashboard <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-md bg-[var(--gradient-aurora)] flex items-center justify-center">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <span className="text-sm">
              © 2026 Hire<span className="gradient-text">Genie</span>
            </span>
          </div>
          <div className="flex items-center gap-5 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition"><Github className="size-4" /></a>
            <a href="#" className="hover:text-foreground transition"><Twitter className="size-4" /></a>
            <a href="#" className="hover:text-foreground transition"><Linkedin className="size-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
