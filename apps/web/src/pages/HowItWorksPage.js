import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, BadgeCheck, Filter, HeartHandshake, MessageCircleMore, ScrollText, Search, ShieldCheck, } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
const steps = [
    {
        icon: ShieldCheck,
        step: "Step 1",
        title: "Sign up with email, phone, and strong password rules",
        body: "Account creation starts with identity-aware fields and strong validation so the product begins with better trust signals.",
    },
    {
        icon: BadgeCheck,
        step: "Step 2",
        title: "Verify your account with OTP",
        body: "A timed 6-digit OTP confirms contact channels before profile creation continues.",
    },
    {
        icon: ScrollText,
        step: "Step 3",
        title: "Complete the 7-step profile wizard",
        body: "Personal information, culture, religion, marriage preferences, photos, genotype details, and ID verification all feed profile quality and matching.",
    },
    {
        icon: Search,
        step: "Step 4",
        title: "Browse and filter serious matches",
        body: "Discovery uses age, culture, faith, location, genotype visibility, and intent signals instead of a shallow swipe-only experience.",
    },
    {
        icon: Filter,
        step: "Step 5",
        title: "Review match scores and compatibility breakdowns",
        body: "Users can see why someone is recommended before deciding whether to pass, view the full profile, or take the next step.",
    },
    {
        icon: HeartHandshake,
        step: "Step 6",
        title: "Send a connection request when interest is mutual",
        body: "The product keeps the next step clear: express interest intentionally instead of jumping straight into off-platform contact.",
    },
    {
        icon: MessageCircleMore,
        step: "Step 7",
        title: "Message safely inside the platform",
        body: "Once connected, users can chat, block, report, and manage conversations inside a trust-aware messaging space.",
    },
];
const platformResponsibilities = [
    "Help users build strong profiles with the signals that matter for marriage-minded compatibility.",
    "Make discovery clearer through filters, score breakdowns, and better profile context.",
    "Support connection requests, messaging, safety controls, and moderation workflows.",
    "Give users privacy controls for visibility, activity status, read receipts, and genotype sharing.",
];
export function HowItWorksPage() {
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "How it works", title: "A clear relationship journey from verified signup to intentional conversation", description: "Sacred Match is designed to move users from account creation to profile completion, compatible discovery, and safe communication without drifting into wedding logistics." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "grid gap-6 lg:grid-cols-2 xl:grid-cols-3", children: steps.map((item, index) => {
                        const Icon = item.icon;
                        return (_jsx(RevealOnScroll, { delay: index * 60, children: _jsxs("article", { className: "surface-card p-7", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("span", { className: "rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-clay", children: item.step }), _jsx("div", { className: "rounded-2xl bg-brand-emerald/10 p-3 text-brand-emerald", children: _jsx(Icon, { size: 20 }) })] }), _jsx("h2", { className: "mt-6 font-display text-2xl font-semibold text-brand-ink", children: item.title }), _jsx("p", { className: "mt-4 text-sm leading-7 text-brand-forest/80", children: item.body })] }) }, item.title));
                    }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.05fr_0.95fr]", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "surface-card p-8 sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay", children: "What the product handles" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-brand-ink", children: "The platform is responsible for helping users find and assess real compatibility." }), _jsx("div", { className: "mt-8 grid gap-4", children: platformResponsibilities.map((item) => (_jsx("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80", children: item }, item))) })] }) }), _jsx(RevealOnScroll, { delay: 120, children: _jsxs("div", { className: "surface-card overflow-hidden p-0", children: [_jsxs("div", { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Scope boundary" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-white", children: "Sacred Match stops at connection, compatibility, and communication." }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-cream/80", children: "The product does not handle bride price, ceremony planning, family-introduction workflows, or wedding coordination. That line stays explicit so the experience stays focused and credible." })] }), _jsxs("div", { className: "flex flex-wrap gap-3 p-8 sm:p-10", children: [_jsxs(Link, { className: "inline-flex items-center gap-3 rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold", to: "/signup", children: ["Start signup", _jsx(ArrowRight, { size: 16 })] }), _jsx(Link, { className: "rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest", to: "/faq", children: "Read the FAQ" })] })] }) })] }) })] }));
}
