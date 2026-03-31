import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SectionHeading({ eyebrow, title, description, align = "left", }) {
    const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
    return (_jsxs("div", { className: alignment, children: [_jsx("span", { className: "eyebrow", children: eyebrow }), _jsx("h2", { className: "mt-6 font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl", children: title }), _jsx("p", { className: "mt-4 text-base leading-7 text-brand-forest/80 sm:text-lg", children: description })] }));
}
