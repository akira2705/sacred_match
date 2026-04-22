import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { landingPageContent } from "@/content/siteContent";
const pillars = [
    {
        icon: Sparkles,
        title: "Culture with dignity",
        body: "Sacred Match is built to respect ethnic identity, faith, values, and long-term intent instead of reducing compatibility to a swipe score.",
    },
    {
        icon: UsersRound,
        title: "Connection-only scope",
        body: "The product exists to help serious people find compatible marriage-minded connections. It does not manage weddings, ceremonies, or family logistics.",
    },
    {
        icon: ShieldCheck,
        title: "Trust before growth",
        body: "Safety, moderation, privacy, and verification are part of the architecture from the first release instead of being bolted on later.",
    },
];
const teamMembers = [
    {
        name: "Adaora Okafor",
        role: "Product and Matching Strategy",
        body: "Owns the relationship discovery experience, profile quality, and the compatibility model that keeps the product serious rather than noisy.",
    },
    {
        name: "Tunde Salami",
        role: "Safety and Trust Operations",
        body: "Leads verification standards, reporting flows, moderation policy, and the systems that make cautious users feel safe enough to participate.",
    },
    {
        name: "Mariam Bello",
        role: "Community and Support",
        body: "Shapes support content, help flows, and editorial guidance so users understand how to move through the platform with clarity and respect.",
    },
];
const storyPoints = [
    "Sacred Match was designed around a simple gap: many people want marriage-minded discovery, but most products optimize for casual attention instead of serious compatibility.",
    "The platform responds to that gap by making culture, faith, location, verification, and genotype visibility first-class product decisions rather than side notes.",
    "That keeps the experience focused on helping the right people find each other and decide whether a connection is worth pursuing.",
];
export function AboutPage() {
    return (_jsxs("div", { children: [_jsx(Seo, { title: "About Us", description: "Learn about Sacred Match \u2014 Nigeria's marriage-minded platform built around culture, genotype awareness, identity verification, and intentional connections.", canonical: "https://sacred-match.ng/about" }), _jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "About Sacred Match", title: "A marriage platform built to help the right people find each other", description: "Sacred Match exists to help serious Nigerians discover compatible partners with clarity around values, culture, genotype, and intent." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.08fr_0.92fr]", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "surface-card p-8 sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay", children: "Why we exist" }), _jsx("div", { className: "mt-6 grid gap-5 text-base leading-8 text-brand-forest/80", children: storyPoints.map((point) => (_jsx("p", { children: point }, point))) })] }) }), _jsx(RevealOnScroll, { delay: 120, children: _jsxs("div", { className: "surface-card overflow-hidden p-0", children: [_jsxs("div", { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Mission" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-white", children: "Bridge compatibility, clarity, and commitment." }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-cream/80", children: "The product helps people evaluate fit before they invest deeply in a connection. That means better profile signals, safer messaging, and clearer expectations from the start." })] }), _jsxs("div", { className: "p-8 sm:p-10", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-brand-clay", children: "What the platform covers" }), _jsx("div", { className: "mt-6 grid gap-4", children: [
                                                    "Verified account creation and onboarding",
                                                    "Compatibility-led match discovery",
                                                    "Genotype visibility and education",
                                                    "Messaging, blocking, reporting, and support",
                                                ].map((item) => (_jsx("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80", children: item }, item))) })] })] }) })] }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "grid gap-6 lg:grid-cols-3", children: pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        return (_jsx(RevealOnScroll, { delay: index * 70, children: _jsxs("article", { className: "surface-card p-7", children: [_jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald", children: _jsx(Icon, { size: 22 }) }), _jsx("h2", { className: "mt-6 font-display text-2xl font-semibold text-brand-ink", children: pillar.title }), _jsx("p", { className: "mt-4 text-sm leading-7 text-brand-forest/80", children: pillar.body })] }) }, pillar.title));
                    }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "surface-card p-8 sm:p-10", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay", children: "Team" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-brand-ink", children: "The people behind the product direction" })] }), _jsx(Link, { className: "rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald", to: "/signup", children: "Create an account" })] }), _jsx("div", { className: "mt-10 grid gap-6 lg:grid-cols-3", children: teamMembers.map((member, index) => (_jsx(RevealOnScroll, { delay: index * 80, children: _jsxs("article", { className: "rounded-[1.8rem] border border-brand-forest/10 bg-brand-forest/5 p-7", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay", children: member.role }), _jsx("h3", { className: "mt-4 font-display text-3xl font-semibold text-brand-ink", children: member.name }), _jsx("p", { className: "mt-4 text-sm leading-7 text-brand-forest/80", children: member.body })] }) }, member.name))) })] }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "surface-card overflow-hidden", children: _jsxs("div", { className: "grid gap-0 lg:grid-cols-[1fr_0.95fr]", children: [_jsxs("div", { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Safety commitment" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-white", children: "Trust features are part of the product, not an afterthought." }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-cream/80", children: "Relationship products only work when people feel protected enough to participate honestly. That is why verification, moderation, and user controls are central to the platform architecture." })] }), _jsxs("div", { className: "p-8 sm:p-10", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-brand-clay", children: "Core safeguards" }), _jsx("div", { className: "mt-6 grid gap-4", children: landingPageContent.safetyPillars.map((item) => (_jsx("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80", children: item }, item))) })] })] }) }) })] }));
}
