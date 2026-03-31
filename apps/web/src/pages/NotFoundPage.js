import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export function NotFoundPage() {
    return (_jsx("div", { className: "section-shell flex min-h-[70vh] items-center justify-center", children: _jsxs("div", { className: "surface-card max-w-2xl p-10 text-center", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay", children: "404" }), _jsx("h1", { className: "mt-4 font-display text-5xl font-semibold text-brand-ink", children: "This route is not part of the current product surface." }), _jsx("p", { className: "mt-5 text-base leading-8 text-brand-forest/80", children: "The deployment foundation currently focuses on the acquisition flow, genotype experience, and authentication entry points." }), _jsxs(Link, { className: "mt-8 inline-flex items-center gap-3 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald", to: "/", children: ["Return home", _jsx(ArrowRight, { size: 16 })] })] }) }));
}
