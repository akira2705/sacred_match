import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
const contactChannels = [
    {
        icon: Mail,
        title: "General enquiries",
        detail: "support@sacred-match.ng",
        note: "Product, support, and early-access requests"
    },
    {
        icon: PhoneCall,
        title: "Partnerships",
        detail: "+234 launch contact pending",
        note: "Verification, counseling, and healthcare partners"
    },
    {
        icon: MapPinned,
        title: "Launch corridor",
        detail: "Lagos, Abuja, Kano",
        note: "Initial market focus before wider Nigerian rollout"
    }
];
export function ContactPage() {
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "Contact", title: "Operate the launch with clear support and trust channels", description: "Sacred Match is a high-trust product, which means support, verification, and genotype education all need visible contact paths." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "grid gap-6 lg:grid-cols-3", children: contactChannels.map((channel) => {
                        const Icon = channel.icon;
                        return (_jsxs("article", { className: "surface-card p-7", children: [_jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald", children: _jsx(Icon, { size: 22 }) }), _jsx("h2", { className: "mt-6 font-display text-2xl font-semibold text-brand-ink", children: channel.title }), _jsx("p", { className: "mt-3 text-sm font-semibold text-brand-clay", children: channel.detail }), _jsx("p", { className: "mt-4 text-sm leading-7 text-brand-forest/80", children: channel.note })] }, channel.title));
                    }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "surface-card overflow-hidden bg-brand-forest text-brand-cream", children: _jsxs("div", { className: "grid gap-0 lg:grid-cols-[1.1fr_0.9fr]", children: [_jsxs("div", { className: "p-8 sm:p-10", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Deployment next" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-white", children: "The product foundation is ready for the next delivery wave." }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-cream/80", children: "The next implementation passes should complete profile creation, matching, messaging, moderation, and richer signed-in browsing on top of the schema and routes already in place." })] }), _jsx("div", { className: "flex items-center p-8 sm:p-10", children: _jsx(Link, { className: "inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-cream", to: "/signup", children: "Create an account" }) })] }) }) })] }));
}
