import { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessagesSquare,
  FileText,
  TrendingUp,
  ListChecks,
  Mic,
  Building2,
  LineChart,
  Settings,
  Sparkles,
  Bell,
  Search,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentor", label: "AI Mentor Chat", icon: MessagesSquare },
  { to: "/resume", label: "Resume Analyzer", icon: FileText },
  { to: "/skills", label: "Skill Gap Analysis", icon: TrendingUp },
  { to: "/dsa", label: "DSA Planner", icon: ListChecks },
  { to: "/interview", label: "Mock Interview", icon: Mic },
  { to: "/companies", label: "Company Prep", icon: Building2 },
  { to: "/progress", label: "Progress Tracker", icon: LineChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2.5 px-6 h-16 border-b border-border/60">
          <div className="size-8 rounded-lg bg-[var(--gradient-aurora)] flex items-center justify-center glow">
            <Sparkles className="size-4 text-white" />
          </div>
          <div className="font-semibold tracking-tight text-[15px]">
            Hire<span className="gradient-text">Genie</span>
          </div>
        </Link>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3 space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-[var(--gradient-aurora)] text-white shadow-[0_0_24px_-8px_var(--neon-purple)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl p-4 glass relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[var(--gradient-aurora)]" />
          <div className="relative">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/90">
              Pro tier
            </div>
            <p className="text-xs text-white/80 mt-1.5">Unlock unlimited mock interviews & AI insights.</p>
            <button className="mt-3 w-full text-xs font-medium px-3 py-1.5 rounded-md bg-white/15 hover:bg-white/25 transition border border-white/20">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-16 border-b border-border/60 glass-strong flex items-center px-4 md:px-6 gap-4">
          <div className="lg:hidden font-semibold">
            Hire<span className="gradient-text">Genie</span>
          </div>
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search topics, companies, questions..."
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-input/50 border border-border/60 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-input/80 transition"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative size-9 rounded-lg border border-border/60 bg-surface/60 hover:bg-surface flex items-center justify-center transition">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[var(--neon-purple)] animate-pulse-glow" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-border/60">
              <div className="size-8 rounded-full bg-[var(--gradient-aurora)] flex items-center justify-center text-xs font-semibold text-white">
                AK
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-medium">Arjun K.</div>
                <div className="text-[11px] text-muted-foreground">AIML · Final year</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
