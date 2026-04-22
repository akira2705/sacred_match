import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, Clock, Dna, Flame, Heart, HeartCrack, MessageCircleX, Shield, ShieldCheck, ShieldX, Sparkles, Star, TrendingDown, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Seo } from "@/components/Seo";
import { weddingImages } from "@/content/visuals";
import styles from "./HomePage.module.css";
/* ─── Static data ─────────────────────────────────────────────────────────── */
const problemPoints = [
    { label: "Wasting time on people who aren't serious", icon: Clock },
    { label: "Emotional burn out", icon: HeartCrack },
    { label: "Conversations that go nowhere", icon: MessageCircleX },
    { label: "Unserious intentions", icon: ShieldX },
    { label: "Values & commitment gap", icon: TrendingDown },
    { label: "Serious connections that fade", icon: Heart },
];
const howItWorksSteps = [
    {
        number: "1",
        title: "Create Your Profile",
        description: "Tell us about yourself & what you're seeking in a partner.",
    },
    {
        number: "2",
        title: "Get Verified",
        description: "Identity & intent checks designed for your safety.",
    },
    {
        number: "3",
        title: "Connect Intentionally",
        description: "Meet verified people ready for marriage — like you.",
    },
];
const trustFeatures = [
    { icon: ShieldCheck, label: "ID Authentication" },
    { icon: CheckCircle2, label: "Phone & Email Verification" },
    { icon: Sparkles, label: "Smart Profile Matching" },
    { icon: Shield, label: "Verified & Secure" },
    { icon: Users, label: "Manual Profile Review" },
    { icon: Star, label: '"Verified for Marriage" Badge' },
];
const genotypeInfo = [
    { type: "AA × AA", result: "Safe", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    { type: "AA × AS", result: "Safe", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    { type: "AS × AS", result: "Caution", color: "bg-amber-100 text-amber-800 border-amber-200" },
    { type: "AS × SS", result: "High Risk", color: "bg-rose-100 text-rose-800 border-rose-200" },
    { type: "SS × SS", result: "High Risk", color: "bg-rose-100 text-rose-800 border-rose-200" },
    { type: "AA × SS", result: "Caution", color: "bg-amber-100 text-amber-800 border-amber-200" },
];
const personas = [
    {
        title: "Faith Driven Professionals",
        tagline: "You want values, not vibes",
        image: { src: "https://images.pexels.com/photos/3770254/pexels-photo-3770254.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Confident Nigerian professional woman in traditional attire" },
    },
    {
        title: "Mature & Intentional Singles",
        tagline: "You are ready for something real again",
        image: { src: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Mature African professional man with a warm smile" },
    },
    {
        title: "Diaspora Africans",
        tagline: "You want culture + compatibility",
        image: { src: "https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Elegant African woman in contemporary attire" },
    },
];
const foundingBenefits = ["Early Access", "Free Verification", "Priority Matching"];
/* ─── Gold headline highlight ─────────────────────────────────────────────── */
const goldStyle = {
    background: "linear-gradient(90deg, #C9A227 0%, #E8C96A 45%, #C9A227 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "goldShimmer 4s linear infinite",
};
/* ─── Component ──────────────────────────────────────────────────────────── */
export function HomePage() {
    return (_jsxs("div", { className: "font-body", children: [_jsx(Seo, { title: "Find a Life Partner, Not Just a Date", description: "Sacred Match is Nigeria's premium matrimony platform for verified, marriage-minded singles. Genotype-aware matching, identity verification, and culture-first compatibility.", canonical: "https://sacred-match.ng" }), _jsxs("section", { className: `${styles.heroBackdrop} isolate`, children: [_jsx("div", { className: `${styles.orb} left-[-3rem] top-24  h-36 w-36 bg-white/10` }), _jsx("div", { className: `${styles.orb} right-8   top-16  h-20 w-20 bg-brand-clay/20`, style: { animationDelay: "4s" } }), _jsx("div", { className: `${styles.orb} bottom-0  right-[22%] h-44 w-44 bg-white/6`, style: { animationDelay: "8s" } }), _jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 pt-6 pb-0 sm:px-6 lg:grid-cols-2 lg:items-end lg:px-8", children: [_jsxs("div", { className: "relative z-10 flex flex-col justify-center self-center py-10", children: [_jsxs("h1", { className: "font-display text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-[4.5rem]", style: { paddingTop: "2.5rem" }, children: ["Find a", " ", _jsx("span", { style: goldStyle, children: "Life Partner," }), _jsx("br", {}), "Not Just a Date"] }), _jsx("p", { className: "mt-5 max-w-md text-lg leading-8 text-white/70", children: "A verified platform for marriage-minded singles ready for real commitment." }), _jsx("div", { className: "mt-9", children: _jsx(Link, { className: styles.btnGold, to: "/start", children: "Join the First 1,000 Serious Singles" }) }), _jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-5 text-sm text-white/60", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Flame, { size: 15, className: "text-orange-400" }), _jsx("strong", { className: "text-white", children: "327 people" }), " joined this week"] }), _jsx(Link, { to: "/start", className: "flex items-center gap-1.5 font-semibold text-white/80 underline-offset-2 transition hover:text-white hover:underline", children: "Join Now \u2192" })] }), _jsx("div", { className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-8", children: [
                                            { icon: ShieldCheck, label: "Free Verification" },
                                            { icon: Users, label: "Manual Review" },
                                            { icon: Shield, label: "Privacy First" },
                                        ].map(({ icon: Icon, label }) => (_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-white/60", children: [_jsx(Icon, { size: 14, className: "text-brand-gold" }), label] }, label))) })] }), _jsx("div", { className: "relative z-10 flex items-end justify-center lg:items-end lg:justify-center", children: _jsx("div", { style: { animation: "fadeIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both" }, children: _jsx("img", { alt: weddingImages[0].alt, className: "mx-auto h-[340px] w-auto max-w-full object-contain drop-shadow-2xl transition duration-700 hover:scale-[1.03] sm:h-[480px] lg:h-[750px] lg:max-w-none", decoding: "async", src: weddingImages[0].src }) }) })] })] }), _jsx("section", { className: "bg-white py-8 sm:py-10", children: _jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("span", { className: styles.goldLine }), _jsx("h2", { className: "font-display text-center text-3xl font-bold text-brand-ink sm:text-4xl", children: "Tired of Dating That Goes Nowhere?" }), _jsx("span", { className: styles.goldLine })] }) }), _jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: problemPoints.map(({ label, icon: Icon }, i) => (_jsx(RevealOnScroll, { delay: i * 70, children: _jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-brand-forest/20 bg-brand-cream px-5 py-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(74,47,173,0.09)]", children: [_jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-forest/8", children: _jsx(Icon, { size: 18, className: "text-brand-forest" }) }), _jsx("span", { className: "text-sm font-medium text-brand-ink/80", children: label })] }) }, label))) }), _jsx(RevealOnScroll, { delay: 480, children: _jsx("p", { className: "mt-12 text-center font-display text-xl italic text-brand-forest/55 sm:text-2xl", children: "Serious people deserve a serious platform." }) })] }) }), _jsx("section", { className: `${styles.purpleSection} py-8 sm:py-10`, children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("span", { className: styles.goldLine }), _jsx("h2", { className: "font-display text-center text-3xl font-bold text-white sm:text-4xl", children: "How It Works" }), _jsx("span", { className: styles.goldLine })] }) }), _jsx("div", { className: "mt-10 grid gap-4 md:grid-cols-3", children: howItWorksSteps.map((step, i) => (_jsx(RevealOnScroll, { delay: i * 100, children: _jsxs("article", { className: "group flex flex-col gap-5 rounded-[2rem] border border-white/20 bg-white/8 p-8 backdrop-blur transition duration-400 hover:-translate-y-2 hover:bg-white/14 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: styles.stepNumber, children: [step.number, "."] }), _jsx("h3", { className: "font-display text-xl font-bold text-white", children: step.title })] }), _jsx("p", { className: "text-sm leading-7 text-white/60", children: step.description })] }) }, step.number))) })] }) }), _jsx("section", { className: "bg-white py-8 sm:py-10", children: _jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("span", { className: styles.goldLine }), _jsxs("h2", { className: "font-display text-center text-3xl font-bold text-brand-ink sm:text-4xl", children: ["No Fake Profiles. No Games.", " ", _jsx("span", { className: "block sm:inline", children: "Just Real People." })] }), _jsx("span", { className: styles.goldLine })] }) }), _jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: trustFeatures.map(({ icon: Icon, label }, i) => (_jsx(RevealOnScroll, { delay: i * 65, children: _jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-brand-forest/20 bg-brand-cream px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-brand-moss/18 hover:shadow-[0_8px_28px_rgba(74,47,173,0.09)]", children: [_jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-forest/10", children: _jsx(Icon, { size: 16, className: "text-brand-forest" }) }), _jsx("span", { className: "text-sm font-semibold text-brand-ink", children: label })] }) }, label))) })] }) }), _jsx("section", { className: `${styles.dnaSection} py-8 sm:py-10`, children: _jsx("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:items-center", children: [_jsxs(RevealOnScroll, { children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-brand-forest/15 bg-brand-forest/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-forest", children: [_jsx(Dna, { size: 13 }), "Genotype Matching"] }), _jsxs("h2", { className: "mt-5 font-display text-3xl font-bold text-brand-ink sm:text-4xl", children: ["Smart Genotype Matching \u2014", " ", _jsx("span", { style: { ...goldStyle, animation: "none", backgroundPosition: "0% center" }, children: "Built In" })] }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-forest/70", children: "Sacred Match is the only Nigerian matrimony platform that integrates genotype compatibility into the matchmaking process \u2014 privately, thoughtfully, and without awkward late-stage conversations." }), _jsx("div", { className: "mt-8 grid gap-3", children: [
                                            { label: "AA", desc: "No sickle cell gene — safest outcome" },
                                            { label: "AS", desc: "Healthy carrier — awareness matters" },
                                            { label: "SS", desc: "Lives with sickle cell — careful planning needed" },
                                        ].map((item) => (_jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-brand-forest/20 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(74,47,173,0.05)]", children: [_jsx("span", { className: "mt-0.5 rounded-lg bg-brand-forest px-2.5 py-1 text-xs font-bold text-white", children: item.label }), _jsx("p", { className: "text-sm leading-6 text-brand-forest/80", children: item.desc })] }, item.label))) }), _jsxs(Link, { to: "/genotype-guide", className: "mt-8 inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-white px-6 py-3 text-sm font-semibold text-brand-forest shadow-[0_4px_20px_rgba(74,47,173,0.10)] transition hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(74,47,173,0.16)]", children: [_jsx(Dna, { size: 15 }), "Learn about genotype matching"] })] }), _jsx(RevealOnScroll, { delay: 120, children: _jsxs("div", { className: "rounded-[2rem] border border-brand-forest/25 bg-white p-8 shadow-[0_12px_48px_rgba(74,47,173,0.10)]", children: [_jsx("h3", { className: "font-display text-xl font-bold text-brand-ink", children: "Compatibility at a Glance" }), _jsx("p", { className: "mt-2 text-sm text-brand-forest/55", children: "Shown only to matches who both opt in \u2014 fully private." }), _jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: genotypeInfo.map((item) => (_jsxs("div", { className: `flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold ${item.color}`, children: [_jsx("span", { children: item.type }), _jsx("span", { className: "rounded-full px-2.5 py-0.5 text-xs", children: item.result })] }, item.type))) }), _jsxs("div", { className: "mt-6 rounded-2xl border border-brand-forest/20 bg-brand-cream px-5 py-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest/50", children: "Privacy control" }), _jsx("p", { className: "mt-2 text-sm leading-6 text-brand-forest/75", children: "You choose who sees your genotype \u2014 show to all, matches only, or keep it private until you're ready." })] })] }) })] }) }) }), _jsx("section", { className: `${styles.purpleSection} py-8 sm:py-10`, children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("span", { className: styles.goldLine }), _jsxs("h2", { className: "font-display text-center text-3xl font-bold text-white sm:text-4xl", children: ["Join the First", " ", _jsx("span", { style: goldStyle, children: "1,000 Serious" }), " ", "Members"] }), _jsx("span", { className: styles.goldLine })] }) }), _jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: personas.map((persona, i) => (_jsx(RevealOnScroll, { delay: i * 100, children: _jsxs("article", { className: "group overflow-hidden rounded-[2rem] shadow-[0_16px_50px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)]", children: [_jsx("div", { className: "overflow-hidden", children: _jsx("img", { alt: persona.image.alt, className: "h-64 w-full object-cover object-top transition duration-700 group-hover:scale-[1.06]", decoding: "async", loading: "lazy", src: persona.image.src }) }), _jsxs("div", { className: "bg-white px-5 py-4", children: [_jsx("p", { className: "font-display text-lg font-bold leading-tight text-brand-forest", children: persona.title }), _jsx("p", { className: "mt-1 text-sm text-brand-forest/60 italic", children: persona.tagline })] })] }) }, persona.title))) }), _jsx(RevealOnScroll, { delay: 380, children: _jsxs("div", { className: "mt-12 flex flex-col items-center gap-6", children: [_jsx("div", { className: "flex flex-col items-center gap-3 sm:flex-row sm:gap-8", children: foundingBenefits.map((benefit) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-clay/40 bg-brand-clay/15", children: _jsx(CheckCircle2, { size: 13, className: "text-brand-gold" }) }), _jsx("span", { className: "text-sm font-medium text-white/80", children: benefit })] }, benefit))) }), _jsx(Link, { className: styles.btnGold, to: "/start", children: "Secure Your Spot" }), _jsx("p", { className: "text-sm text-white/45", children: "Only verified members are accepted. Limited onboarding." })] }) })] }) })] }));
}
