import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { adminReports, adminStats, adminUsers, analyticsHighlights } from "@/content/adminData";
import { blogArticles, categorizedFaqs } from "@/content/contentHubData";

export function AdminDashboardPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Admin dashboard" title="Moderation, content, and growth visibility in one place" description="A moderator-facing view of reports, user health, and product momentum." />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{adminStats.map((item) => <div key={item.label} className="surface-card p-6"><p className="text-sm text-brand-forest/65">{item.label}</p><p className="mt-3 font-display text-4xl font-semibold text-brand-ink">{item.value}</p></div>)}</div>
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-7"><h2 className="font-display text-3xl font-semibold text-brand-ink">Recent reports</h2><div className="mt-6 grid gap-4">{adminReports.slice(0, 3).map((report) => <div key={report.id} className="rounded-[1.5rem] bg-brand-forest/5 px-5 py-4"><p className="font-semibold text-brand-ink">{report.reason} • {report.reportedUser}</p><p className="mt-2 text-sm text-brand-forest/70">{report.description}</p></div>)}</div></div>
          <div className="surface-card p-7"><h2 className="font-display text-3xl font-semibold text-brand-ink">Quick links</h2><div className="mt-6 grid gap-3 text-sm font-semibold">{[{label:"Safety reports",href:"/admin/reports"},{label:"User management",href:"/admin/users"},{label:"Content management",href:"/admin/content"},{label:"Analytics",href:"/admin/analytics"}].map((item) => <Link key={item.href} className="rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-brand-forest" to={item.href}>{item.label}</Link>)}</div></div>
        </div>
      </section>
    </div>
  );
}

export function AdminReportsPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16"><SectionHeading eyebrow="Safety reports" title="Review, dismiss, warn, suspend, or ban" description="Moderation tools should make report handling structured and defensible." /></section>
      <section className="section-shell pt-0"><div className="grid gap-4">{adminReports.map((report) => <div key={report.id} className="surface-card p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-clay">{report.id} • {report.status}</p><h2 className="mt-3 font-display text-3xl font-semibold text-brand-ink">{report.reason}</h2><p className="mt-3 text-sm leading-7 text-brand-forest/80">Reporter: {report.reporter} • Reported user: {report.reportedUser}</p><p className="mt-2 text-sm leading-7 text-brand-forest/80">{report.description}</p><p className="mt-2 text-sm text-brand-forest/60">Evidence: {report.evidence}</p></div><div className="flex flex-wrap gap-2 text-sm font-semibold"><button className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest">Dismiss</button><button className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest">Warn</button><button className="rounded-full bg-amber-500 px-4 py-2 text-white">Suspend</button><button className="rounded-full bg-rose-600 px-4 py-2 text-white">Ban</button></div></div></div>)}</div></section>
    </div>
  );
}

export function AdminUsersPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16"><SectionHeading eyebrow="User management" title="Search users, inspect verification, and take action" description="Moderators need fast visibility into trust, activity, and account history." /></section>
      <section className="section-shell pt-0"><div className="grid gap-4">{adminUsers.map((user) => <div key={user.email} className="surface-card p-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-3xl font-semibold text-brand-ink">{user.name}</h2><p className="mt-2 text-sm text-brand-forest/70">{user.email} • {user.phone}</p><p className="mt-2 text-sm text-brand-clay">{user.verified}</p><p className="mt-2 text-sm text-brand-forest/60">Joined {user.joined} • Last active {user.lastActive}</p></div><div className="flex flex-wrap gap-2 text-sm font-semibold"><button className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest">View profile</button><button className="rounded-full border border-amber-200 px-4 py-2 text-amber-700">Suspend</button><button className="rounded-full border border-rose-200 px-4 py-2 text-rose-700">Ban</button></div></div></div>)}</div></section>
    </div>
  );
}

export function AdminContentPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16"><SectionHeading eyebrow="Content management" title="Manage blog and FAQ content" description="Editorial content, FAQ updates, and publishing tools belong in one operational surface." /></section>
      <section className="section-shell pt-0"><div className="grid gap-6 lg:grid-cols-2"><div className="surface-card p-7"><h2 className="font-display text-3xl font-semibold text-brand-ink">Blog articles</h2><div className="mt-6 grid gap-3">{blogArticles.map((article) => <div key={article.slug} className="rounded-[1.4rem] bg-brand-forest/5 px-5 py-4"><p className="font-semibold text-brand-ink">{article.title}</p><p className="mt-2 text-sm text-brand-forest/70">{article.category} • {article.publishedAt}</p></div>)}</div></div><div className="surface-card p-7"><h2 className="font-display text-3xl font-semibold text-brand-ink">FAQ categories</h2><div className="mt-6 grid gap-3">{categorizedFaqs.map((group) => <div key={group.category} className="rounded-[1.4rem] bg-brand-forest/5 px-5 py-4"><p className="font-semibold text-brand-ink">{group.category}</p><p className="mt-2 text-sm text-brand-forest/70">{group.items.length} entries</p></div>)}</div></div></div></section>
    </div>
  );
}

export function AdminAnalyticsPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16"><SectionHeading eyebrow="Analytics" title="Monitor growth, retention, and safety patterns" description="Use operational analytics to understand where the platform is healthy and where intervention is needed." /></section>
      <section className="section-shell pt-0"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{adminStats.map((item) => <div key={item.label} className="surface-card p-6"><p className="text-sm text-brand-forest/65">{item.label}</p><p className="mt-3 font-display text-4xl font-semibold text-brand-ink">{item.value}</p></div>)}</div></section>
      <section className="section-shell pt-0"><div className="grid gap-4">{analyticsHighlights.map((item) => <div key={item} className="surface-card p-6 text-sm leading-7 text-brand-forest/80">{item}</div>)}</div></section>
    </div>
  );
}
