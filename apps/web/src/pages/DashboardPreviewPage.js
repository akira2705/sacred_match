import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingImages } from "@/content/visuals";
const sampleMatches = [
    {
        name: "Adaeze Okafor",
        summary: "Igbo, Christian, Lagos-based, open to cross-cultural marriage and genotype-aware matching.",
        score: "94%",
    },
    {
        name: "Mariam Bello",
        summary: "Hausa-Fulani, Muslim, serious about shared values, healthy pacing, and long-term intent.",
        score: "89%",
    },
    {
        name: "Tolani Adeyemi",
        summary: "Yoruba, Christian, career-focused, looking for a clear path to marriage.",
        score: "91%",
    },
];
export function DashboardPreviewPage() {
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(RevealOnScroll, { children: _jsx(SectionHeading, { eyebrow: "Member preview", title: "A signed-in space that feels closer to the product", description: "This preview is intentionally lightweight, but it gives you a sense of what the authenticated experience can grow into next." }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[0.95fr_1.05fr]", children: [_jsx(RevealOnScroll, { children: _jsxs("div", { className: "surface-card p-8", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay", children: "Account snapshot" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-brand-ink", children: "Welcome back, Demo Member." }), _jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
                                            { icon: Sparkles, title: "14", copy: "Recommended matches" },
                                            { icon: MessageCircleMore, title: "3", copy: "Unread messages" },
                                            { icon: ShieldCheck, title: "Verified", copy: "Phone + email ready" },
                                        ].map((item, index) => {
                                            const Icon = item.icon;
                                            return (_jsx(RevealOnScroll, { delay: index * 80, children: _jsxs("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 p-5", children: [_jsx(Icon, { className: "text-brand-emerald", size: 20 }), _jsx("p", { className: "mt-4 font-display text-3xl font-semibold text-brand-ink", children: item.title }), _jsx("p", { className: "mt-2 text-sm leading-6 text-brand-forest/80", children: item.copy })] }) }, item.copy));
                                        }) })] }) }), _jsx(RevealOnScroll, { delay: 120, children: _jsxs("div", { className: "overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-halo", children: [_jsx("img", { alt: weddingImages[0].alt, className: "h-72 w-full object-cover", decoding: "async", loading: "lazy", src: weddingImages[0].src }), _jsxs("div", { className: "p-8", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Product direction" }), _jsx("p", { className: "mt-4 text-base leading-8 text-brand-forest/80", children: "The next step after login is to deepen this member area with profile completion, match cards, conversations, saved filters, and account controls connected to the backend." })] })] }) })] }) }), _jsxs("section", { className: "section-shell pt-0", children: [_jsx(RevealOnScroll, { children: _jsx(SectionHeading, { eyebrow: "Sample matches", title: "A quick look at the style of the signed-in browsing experience", description: "These are sample cards for the product direction, not fully dynamic results yet." }) }), _jsx("div", { className: "mt-12 grid gap-6 lg:grid-cols-3", children: sampleMatches.map((match, index) => (_jsx(RevealOnScroll, { delay: index * 80, children: _jsxs("article", { className: "surface-card overflow-hidden p-0", children: [_jsx("img", { alt: weddingImages[index + 1].alt, className: "h-60 w-full object-cover", decoding: "async", loading: "lazy", src: weddingImages[index + 1].src }), _jsxs("div", { className: "p-7", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("h3", { className: "font-display text-2xl font-semibold text-brand-ink", children: match.name }), _jsx("span", { className: "rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-clay", children: match.score })] }), _jsx("p", { className: "mt-4 text-sm leading-7 text-brand-forest/80", children: match.summary })] })] }) }, match.name))) })] })] }));
}
