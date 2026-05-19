import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { GlowCard } from "@/components/ui-kit/GlowCard";
import { Moon, Sun, Bell, Key, Brain, Save, Check } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — HireGenie" }] }),
  component: SettingsPage,
});

const MODELS = [
  { id: "genie-pro", name: "Genie Pro", desc: "Best reasoning · slower", badge: "Recommended" },
  { id: "genie-fast", name: "Genie Fast", desc: "Sub-second responses" },
  { id: "genie-lite", name: "Genie Lite", desc: "Lightweight, mobile-friendly" },
];

function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState({ daily: true, mocks: true, weekly: false });
  const [model, setModel] = useState("genie-pro");
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-4xl">
        <PageHeader eyebrow="Settings" title="Tune your HireGenie." description="Manage profile, model, and preferences." />

        <div className="space-y-5">
          <GlowCard>
            <div className="text-sm font-semibold mb-4">Profile</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" defaultValue="Arjun Kapoor" />
              <Field label="Email" defaultValue="arjun@iiit.ac.in" />
              <Field label="Target role" defaultValue="AIML Engineer" />
              <Field label="Graduation" defaultValue="2026" />
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">AI Model</div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`text-left p-4 rounded-xl transition relative ${
                    model === m.id ? "gradient-border glow" : "glass glow-hover"
                  }`}
                >
                  {m.badge && (
                    <span className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full bg-[var(--gradient-aurora)] text-white uppercase tracking-wider">
                      {m.badge}
                    </span>
                  )}
                  <div className="font-medium text-sm">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.desc}</div>
                  {model === m.id && <Check className="size-4 text-[var(--neon-cyan)] mt-3" />}
                </button>
              ))}
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Key className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">API Key</div>
            </div>
            <Field label="HireGenie API key" defaultValue="sk-hg-************************a3f1" />
            <div className="text-xs text-muted-foreground mt-2">Used for programmatic access. Keep this secret.</div>
          </GlowCard>

          <GlowCard>
            <div className="text-sm font-semibold mb-4">Appearance</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Theme</div>
                <div className="text-xs text-muted-foreground">Dark mode optimized for late-night prep.</div>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl glass">
                <button
                  onClick={() => setDark(false)}
                  className={`size-9 rounded-lg flex items-center justify-center ${!dark ? "bg-[var(--gradient-aurora)] text-white" : "text-muted-foreground"}`}
                >
                  <Sun className="size-4" />
                </button>
                <button
                  onClick={() => setDark(true)}
                  className={`size-9 rounded-lg flex items-center justify-center ${dark ? "bg-[var(--gradient-aurora)] text-white" : "text-muted-foreground"}`}
                >
                  <Moon className="size-4" />
                </button>
              </div>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="size-4 text-[var(--neon-cyan)]" />
              <div className="text-sm font-semibold">Notifications</div>
            </div>
            <div className="space-y-3">
              {(["daily", "mocks", "weekly"] as const).map((k) => (
                <label key={k} className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-sm capitalize">{k} reminders</div>
                    <div className="text-xs text-muted-foreground">
                      {k === "daily" && "Streak reminder every evening"}
                      {k === "mocks" && "Nudge before scheduled mock interviews"}
                      {k === "weekly" && "Weekly progress summary email"}
                    </div>
                  </div>
                  <Toggle
                    on={notif[k]}
                    onChange={(v) => setNotif({ ...notif, [k]: v })}
                  />
                </label>
              ))}
            </div>
          </GlowCard>

          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gradient-aurora)] text-white text-sm font-medium glow"
          >
            {saved ? <Check className="size-4" /> : <Save className="size-4" />}
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      <input
        defaultValue={defaultValue}
        className="w-full h-10 px-3 rounded-lg bg-input/50 border border-border focus:border-primary/60 focus:bg-input/80 outline-none text-sm transition"
      />
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition ${on ? "bg-[var(--gradient-aurora)]" : "bg-input"}`}
    >
      <span className={`absolute top-0.5 size-5 rounded-full bg-white transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
