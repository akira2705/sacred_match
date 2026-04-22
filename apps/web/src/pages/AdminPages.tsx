import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Flag,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
  Zap,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { adminReports, adminStats, adminUsers, analyticsHighlights } from "@/content/adminData";
import { blogArticles, categorizedFaqs } from "@/content/contentHubData";
import { RevealOnScroll } from "@/components/RevealOnScroll";

// ─── Shared admin layout pieces ────────────────────────────────────────────

const adminNavLinks = [
  { href: "/admin", label: "Overview", icon: BarChart3, end: true },
  { href: "/admin/reports", label: "Reports", icon: Flag },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: Activity },
];

function AdminSidebar() {
  return (
    <aside className="hidden xl:flex xl:w-56 xl:shrink-0 xl:flex-col">
      <nav className="flex flex-col gap-1">
        {adminNavLinks.map(({ href, label, icon: Icon, end }) => (
          <NavLink
            key={href}
            end={end}
            to={href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-brand-forest text-white shadow-[0_8px_24px_rgba(43,27,110,0.25)]"
                  : "text-brand-forest/70 hover:-translate-y-0.5 hover:bg-brand-forest/8 hover:text-brand-forest"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-brand-clay/25 bg-brand-clay/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-clay">
            Admin
          </span>
          <span className="text-xs text-brand-forest/40">Spousia Moderation</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-brand-forest/60">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2 rounded-2xl border border-brand-forest/10 bg-white px-4 py-2 shadow-[0_4px_16px_rgba(43,27,110,0.06)]">
        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-brand-forest/70">Live</span>
        <span className="text-xs text-brand-forest/40">April 1, 2026</span>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  trend?: "up" | "down" | "warn";
  trendLabel?: string;
  icon: React.ElementType;
  accent?: boolean;
}) {
  const trendColor =
    trend === "up" ? "text-emerald-600" : trend === "warn" ? "text-amber-600" : "text-rose-500";

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border p-6 transition duration-300 hover:-translate-y-1 ${
        accent
          ? "border-brand-forest/20 bg-brand-forest text-white shadow-[0_12px_40px_rgba(43,27,110,0.25)]"
          : "border-brand-forest/10 bg-white shadow-[0_4px_24px_rgba(43,27,110,0.07)]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          accent ? "bg-white/15" : "bg-brand-forest/8"
        }`}
      >
        <Icon size={18} className={accent ? "text-brand-gold" : "text-brand-forest"} />
      </div>
      <p className={`mt-4 text-sm font-medium ${accent ? "text-white/60" : "text-brand-forest/60"}`}>
        {label}
      </p>
      <p
        className={`mt-1 font-display text-3xl font-bold ${accent ? "text-white" : "text-brand-ink"}`}
      >
        {value}
      </p>
      {trendLabel ? (
        <p className={`mt-2 text-xs font-semibold ${accent ? "text-white/50" : trendColor}`}>
          {trendLabel}
        </p>
      ) : null}
      {/* decorative gradient blob */}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${
          accent ? "bg-brand-gold/15" : "bg-brand-moss/10"
        }`}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-amber-50 border-amber-200 text-amber-800",
    Reviewed: "bg-blue-50 border-blue-200 text-blue-800",
    Resolved: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${
        map[status] ?? "bg-gray-50 border-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────────────────

const FOUNDING_GOAL = 1000;
const FOUNDING_CURRENT = 327;
const FOUNDING_PCT = Math.round((FOUNDING_CURRENT / FOUNDING_GOAL) * 100);

const dashboardStats = [
  { label: "Total Members", value: "12,480", trend: "up" as const, trendLabel: "↑ 12% this month", icon: Users, accent: true },
  { label: "Active Today",  value: "1,184",  trend: "up" as const, trendLabel: "↑ 5% vs yesterday", icon: Zap },
  { label: "Matches Today", value: "342",    trend: "up" as const, trendLabel: "↑ 8% vs yesterday", icon: TrendingUp },
  { label: "Pending Reports", value: "18",   trend: "warn" as const, trendLabel: "⚠ Needs review", icon: ShieldAlert },
];

const recentActivity = [
  { type: "signup",  label: "Chisom Obi joined from Lagos",         time: "2 min ago" },
  { type: "report",  label: "New report filed: RPT-1025",           time: "14 min ago" },
  { type: "match",   label: "87 new connections made today",        time: "1 hr ago" },
  { type: "verify",  label: "Abubakar Sani verified ID",            time: "2 hr ago" },
  { type: "message", label: "Message volume up 12% today",          time: "3 hr ago" },
  { type: "signup",  label: "Fatima Bello joined from Abuja",       time: "4 hr ago" },
];

const activityIcons: Record<string, React.ElementType> = {
  signup:  UserCheck,
  report:  Flag,
  match:   CheckCircle2,
  verify:  ShieldCheck,
  message: MessageSquare,
};

const genotypeStats = [
  { label: "AA profiles",  value: "6,240",  pct: 50 },
  { label: "AS profiles",  value: "4,368",  pct: 35 },
  { label: "SS profiles",  value: "748",    pct: 6  },
  { label: "Not disclosed",value: "1,124",  pct: 9  },
];

export function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader
            title="Dashboard"
            subtitle="Platform health, moderation queue, and live activity."
          />

          {/* ── Founding Member Banner ───────────────────────────────────── */}
          <RevealOnScroll>
            <div className="mb-6 overflow-hidden rounded-[2rem] bg-brand-forest p-6 text-white shadow-[0_12px_48px_rgba(74,47,173,0.28)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
                    Founding Member Drive
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white">
                    {FOUNDING_CURRENT.toLocaleString()} / {FOUNDING_GOAL.toLocaleString()} members
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    {FOUNDING_GOAL - FOUNDING_CURRENT} spots remaining in the founding cohort
                  </p>
                </div>
                <span className="rounded-2xl border border-brand-gold/30 bg-brand-gold/15 px-5 py-2 text-2xl font-bold text-brand-gold">
                  {FOUNDING_PCT}%
                </span>
              </div>
              <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-[1.5s] ease-out"
                  style={{
                    width: `${FOUNDING_PCT}%`,
                    background: "linear-gradient(90deg, #C9A227, #E8C96A)",
                    boxShadow: "0 0 12px rgba(201,162,39,0.45)",
                  }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs text-white/40">
                <span>0</span>
                <span>{FOUNDING_GOAL.toLocaleString()} founding members</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── Stat Cards ─────────────────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 60}>
                <StatCard {...stat} />
              </RevealOnScroll>
            ))}
          </div>

          {/* ── Body grid ──────────────────────────────────────────────── */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.52fr]">

            {/* Recent reports */}
            <div className="flex flex-col gap-6">
              <RevealOnScroll>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(74,47,173,0.07)]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-brand-ink">Recent Reports</h2>
                    <Link
                      to="/admin/reports"
                      className="flex items-center gap-1 text-xs font-semibold text-brand-forest/60 transition hover:text-brand-forest"
                    >
                      View all <ChevronRight size={13} />
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {adminReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-brand-forest/8 bg-brand-cream px-4 py-4 transition duration-200 hover:border-brand-moss/20 hover:shadow-[0_4px_16px_rgba(74,47,173,0.08)]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-brand-forest/40">{report.id}</span>
                            <StatusBadge status={report.status} />
                          </div>
                          <p className="mt-1.5 truncate text-sm font-semibold text-brand-ink">
                            {report.reason} · {report.reportedUser}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-brand-forest/55">
                            {report.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-brand-forest/40">{report.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Genotype breakdown */}
              <RevealOnScroll delay={80}>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(74,47,173,0.07)]">
                  <h2 className="font-display text-xl font-semibold text-brand-ink">Genotype Distribution</h2>
                  <p className="mt-1 text-xs text-brand-forest/50">Among profiles that disclosed</p>
                  <div className="mt-5 grid gap-3">
                    {genotypeStats.map((g) => (
                      <div key={g.label}>
                        <div className="flex items-center justify-between text-xs font-semibold text-brand-ink/70">
                          <span>{g.label}</span>
                          <span>{g.value} <span className="text-brand-forest/40 font-normal">({g.pct}%)</span></span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-brand-forest/8">
                          <div
                            className="h-full rounded-full bg-brand-forest"
                            style={{ width: `${g.pct}%`, opacity: 0.7 + g.pct / 200 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Quick actions */}
              <RevealOnScroll delay={80}>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(74,47,173,0.07)]">
                  <h2 className="font-display text-xl font-semibold text-brand-ink">Quick Actions</h2>
                  <div className="mt-4 grid gap-2">
                    {adminNavLinks.slice(1).map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        className="flex items-center gap-3 rounded-2xl border border-brand-forest/8 bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-forest transition duration-200 hover:-translate-y-0.5 hover:border-brand-moss/20 hover:bg-white hover:shadow-[0_4px_16px_rgba(74,47,173,0.08)]"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-forest/8">
                          <Icon size={14} className="text-brand-forest" />
                        </div>
                        {label}
                        <ChevronRight size={14} className="ml-auto text-brand-forest/30" />
                      </Link>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Platform health */}
              <RevealOnScroll delay={100}>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(74,47,173,0.07)]">
                  <h2 className="font-display text-xl font-semibold text-brand-ink">Platform Health</h2>
                  <div className="mt-4 grid gap-3">
                    {[
                      { label: "Verified profiles",    value: "78%", ok: true  },
                      { label: "Connection accept rate",value: "64%", ok: true  },
                      { label: "Avg. response time",   value: "4.2h", ok: true  },
                      { label: "Report resolution",    value: "91%", ok: true  },
                      { label: "Spam detection rate",  value: "99%", ok: true  },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="text-brand-forest/65">{item.label}</span>
                        <span className={`font-bold ${item.ok ? "text-emerald-600" : "text-rose-600"}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Live activity feed */}
              <RevealOnScroll delay={140}>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(74,47,173,0.07)]">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <h2 className="font-display text-xl font-semibold text-brand-ink">Live Activity</h2>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {recentActivity.map((item) => {
                      const Icon = activityIcons[item.type] ?? Activity;
                      return (
                        <div key={item.label} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-forest/8">
                            <Icon size={13} className="text-brand-forest" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-brand-ink/80">{item.label}</p>
                            <p className="flex items-center gap-1 text-xs text-brand-forest/45">
                              <Clock size={10} />
                              {item.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Reports ──────────────────────────────────────────────────────────

export function AdminReportsPage() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Reviewed" | "Resolved">("All");

  const filtered =
    filter === "All" ? adminReports : adminReports.filter((r) => r.status === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader
            title="Safety Reports"
            subtitle="Review, dismiss, warn, suspend, or permanently ban flagged users."
          />

          {/* Filter tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {(["All", "Pending", "Reviewed", "Resolved"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  filter === tab
                    ? "bg-brand-forest text-white shadow-[0_6px_20px_rgba(43,27,110,0.22)]"
                    : "border border-brand-forest/12 bg-white text-brand-forest/70 hover:bg-brand-forest/5"
                }`}
                type="button"
              >
                {tab}
                {tab === "Pending" ? (
                  <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">
                    1
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {filtered.map((report, i) => (
              <RevealOnScroll key={report.id} delay={i * 60}>
                <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.06)] transition duration-300 hover:shadow-[0_8px_32px_rgba(43,27,110,0.1)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-brand-forest/40">{report.id}</span>
                        <StatusBadge status={report.status} />
                        <span className="text-xs text-brand-forest/40">{report.date}</span>
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-semibold text-brand-ink">
                        {report.reason}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-forest/70">
                        <span>Reporter: <strong className="text-brand-ink">{report.reporter}</strong></span>
                        <span>Reported: <strong className="text-brand-ink">{report.reportedUser}</strong></span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-brand-forest/75">
                        {report.description}
                      </p>
                      <p className="mt-1 text-xs text-brand-forest/45">
                        Evidence: {report.evidence}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        className="rounded-full border border-brand-forest/15 px-4 py-2 text-sm font-semibold text-brand-forest/70 transition hover:bg-brand-forest/5"
                        type="button"
                      >
                        Dismiss
                      </button>
                      <button
                        className="rounded-full border border-brand-forest/15 px-4 py-2 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest/5"
                        type="button"
                      >
                        Warn
                      </button>
                      <button
                        className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition hover:bg-amber-600"
                        type="button"
                      >
                        Suspend
                      </button>
                      <button
                        className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(225,29,72,0.3)] transition hover:bg-rose-700"
                        type="button"
                      >
                        Ban
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            {filtered.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-brand-forest/15 py-14 text-center text-sm text-brand-forest/50">
                No reports match the selected filter.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Users ────────────────────────────────────────────────────────────

export function AdminUsersPage() {
  const verificationColor = (v: string) =>
    v.includes("ID") && v.includes("Photos")
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : v.includes("ID")
        ? "text-blue-700 bg-blue-50 border-blue-200"
        : "text-amber-700 bg-amber-50 border-amber-200";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader
            title="User Management"
            subtitle="Search users, inspect verification, and take action."
          />

          {/* Search bar */}
          <div className="mb-6">
            <input
              className="input-shell max-w-sm bg-white shadow-[0_4px_16px_rgba(43,27,110,0.06)]"
              placeholder="Search by name or email…"
              type="search"
            />
          </div>

          <div className="grid gap-4">
            {adminUsers.map((user, i) => (
              <RevealOnScroll key={user.email} delay={i * 70}>
                <div className="flex flex-wrap items-center justify-between gap-5 rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.06)] transition duration-300 hover:shadow-[0_8px_32px_rgba(43,27,110,0.1)]">
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-forest font-display text-lg font-bold text-brand-cream shadow-[0_6px_20px_rgba(43,27,110,0.2)]">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-semibold text-brand-ink">{user.name}</h2>
                      <p className="text-xs text-brand-forest/60">
                        {user.email} · {user.phone}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${verificationColor(user.verified)}`}
                        >
                          ✓ {user.verified}
                        </span>
                        <span className="text-xs text-brand-forest/45">
                          Joined {user.joined}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-brand-forest/45">
                          <Clock size={10} />
                          {user.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-full border border-brand-forest/15 px-4 py-2 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest/5"
                      type="button"
                    >
                      View profile
                    </button>
                    <button
                      className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                      type="button"
                    >
                      Suspend
                    </button>
                    <button
                      className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                      type="button"
                    >
                      Ban
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Content ──────────────────────────────────────────────────────────

export function AdminContentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader
            title="Content Management"
            subtitle="Manage blog articles and FAQ entries."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <RevealOnScroll>
              <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.07)]">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-brand-ink">
                    Blog Articles
                  </h2>
                  <Link
                    to="/blog"
                    className="text-xs font-semibold text-brand-forest/60 transition hover:text-brand-forest"
                  >
                    View blog →
                  </Link>
                </div>
                <div className="mt-5 grid gap-3">
                  {blogArticles.map((article) => (
                    <div
                      key={article.slug}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-brand-forest/8 bg-brand-cream px-4 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-brand-ink">
                          {article.title}
                        </p>
                        <p className="mt-0.5 text-xs text-brand-forest/55">
                          {article.category} · {article.publishedAt}
                        </p>
                      </div>
                      <button
                        className="shrink-0 text-xs font-semibold text-brand-forest/50 transition hover:text-brand-forest"
                        type="button"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.07)]">
                <h2 className="font-display text-xl font-semibold text-brand-ink">
                  FAQ Categories
                </h2>
                <div className="mt-5 grid gap-3">
                  {categorizedFaqs.map((group) => (
                    <div
                      key={group.category}
                      className="flex items-center justify-between rounded-2xl border border-brand-forest/8 bg-brand-cream px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-brand-ink">{group.category}</p>
                        <p className="mt-0.5 text-xs text-brand-forest/55">
                          {group.items.length} {group.items.length === 1 ? "entry" : "entries"}
                        </p>
                      </div>
                      <button
                        className="text-xs font-semibold text-brand-forest/50 transition hover:text-brand-forest"
                        type="button"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Analytics ────────────────────────────────────────────────────────

const analyticsStats = [
  { label: "Total Users", value: "12,480", trend: "up" as const, trendLabel: "↑ 12% this month", icon: Users },
  { label: "New This Week", value: "284", trend: "up" as const, trendLabel: "↑ 9% vs last week", icon: TrendingUp },
  { label: "Messages Today", value: "4,921", trend: "up" as const, trendLabel: "↑ 15% vs yesterday", icon: MessageSquare },
  { label: "Connection Rate", value: "68%", trend: "up" as const, trendLabel: "↑ 3pts this week", icon: CheckCircle2 },
];

const topStates = [
  { name: "Lagos", value: 42 },
  { name: "Abuja", value: 28 },
  { name: "Oyo", value: 16 },
  { name: "Rivers", value: 11 },
  { name: "Kano", value: 9 },
];

export function AdminAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader
            title="Analytics"
            subtitle="Platform growth, retention, and engagement patterns."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {analyticsStats.map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 60}>
                <StatCard {...stat} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.6fr]">
            {/* Highlights */}
            <RevealOnScroll>
              <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.07)]">
                <h2 className="font-display text-xl font-semibold text-brand-ink">
                  Key Insights
                </h2>
                <div className="mt-5 grid gap-3">
                  {analyticsHighlights.map((item, i) => (
                    <RevealOnScroll key={item} delay={i * 60}>
                      <div className="flex items-start gap-3 rounded-2xl border border-brand-forest/8 bg-brand-cream px-4 py-4">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-forest/8">
                          <TrendingUp size={12} className="text-brand-forest" />
                        </div>
                        <p className="text-sm leading-6 text-brand-forest/80">{item}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Top states bar chart */}
            <RevealOnScroll delay={80}>
              <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.07)]">
                <h2 className="font-display text-xl font-semibold text-brand-ink">
                  Top States
                </h2>
                <p className="mt-1 text-xs text-brand-forest/50">By user signups</p>
                <div className="mt-6 grid gap-4">
                  {topStates.map((state, i) => (
                    <div key={state.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-brand-ink">{state.name}</span>
                        <span className="text-xs text-brand-forest/50">{state.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-brand-forest/8">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${state.value}%`,
                            background: i === 0
                              ? "linear-gradient(90deg, #2B1B6E, #6B5CE7)"
                              : i === 1
                                ? "linear-gradient(90deg, #3D2A8A, #6B5CE7)"
                                : "linear-gradient(90deg, #6B5CE7, #9b8ef0)",
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Safety report stats */}
          <RevealOnScroll delay={120}>
            <div className="mt-6 rounded-[2rem] border border-brand-forest/10 bg-white p-6 shadow-[0_4px_24px_rgba(43,27,110,0.07)]">
              <h2 className="font-display text-xl font-semibold text-brand-ink">
                Safety Report Summary
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Reports Filed", value: "73", icon: Flag, color: "text-brand-forest" },
                  { label: "Accounts Suspended", value: "12", icon: UserX, color: "text-amber-600" },
                  { label: "Accounts Banned", value: "4", icon: ShieldAlert, color: "text-rose-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-brand-forest/8 bg-brand-cream px-5 py-4"
                  >
                    <Icon size={20} className={color} />
                    <div>
                      <p className="text-xs text-brand-forest/55">{label}</p>
                      <p className="mt-0.5 font-display text-2xl font-bold text-brand-ink">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
