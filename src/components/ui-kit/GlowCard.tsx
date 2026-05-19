import { ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
  gradient = false,
}: {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl ${gradient ? "gradient-border" : "glass"} glow-hover p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon,
  accent = "blue",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  accent?: "blue" | "purple" | "cyan" | "green";
}) {
  const colors = {
    blue: "from-[var(--neon-blue)]/30 to-transparent text-[var(--neon-blue)]",
    purple: "from-[var(--neon-purple)]/30 to-transparent text-[var(--neon-purple)]",
    cyan: "from-[var(--neon-cyan)]/30 to-transparent text-[var(--neon-cyan)]",
    green: "from-emerald-400/30 to-transparent text-emerald-400",
  };
  return (
    <GlowCard>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {delta && (
            <div className="mt-1 text-xs text-emerald-400 font-medium">{delta}</div>
          )}
        </div>
        {icon && (
          <div
            className={`size-10 rounded-xl bg-gradient-to-br ${colors[accent]} flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
      </div>
    </GlowCard>
  );
}
