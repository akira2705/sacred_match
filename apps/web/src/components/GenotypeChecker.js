import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Dna, ShieldCheck, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { genotypeCompatibilityTable, getCompatibilityResult, } from "@/lib/genotype";
const formSchema = z.object({
    partnerA: z.enum(["AA", "AS", "SS"]),
    partnerB: z.enum(["AA", "AS", "SS"]),
});
const toneStyles = {
    low: "border-emerald-200 bg-emerald-50 text-emerald-900",
    moderate: "border-amber-200 bg-amber-50 text-amber-900",
    high: "border-rose-200 bg-rose-50 text-rose-900",
};
export function GenotypeChecker({ compact = false }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            partnerA: "AA",
            partnerB: "AS",
        },
    });
    const values = form.watch();
    const result = getCompatibilityResult(values.partnerA, values.partnerB);
    return (_jsx("div", { className: "surface-card overflow-hidden", children: _jsxs("div", { className: "grid gap-0 lg:grid-cols-[1.1fr_0.9fr]", children: [_jsxs("div", { className: "border-b border-brand-forest/10 p-6 sm:p-8 lg:border-b-0 lg:border-r", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-brand-emerald/10 p-3 text-brand-emerald", children: _jsx(Dna, { size: 20 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.22em] text-brand-forest/60", children: "Compatibility Checker" }), _jsx("h3", { className: "font-display text-2xl font-semibold text-brand-ink", children: "Quick genotype review" })] })] }), _jsxs("form", { className: "mt-8 grid gap-5", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Your genotype" }), _jsxs("select", { className: "input-shell", ...form.register("partnerA"), children: [_jsx("option", { value: "AA", children: "AA" }), _jsx("option", { value: "AS", children: "AS" }), _jsx("option", { value: "SS", children: "SS" })] })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Partner's genotype" }), _jsxs("select", { className: "input-shell", ...form.register("partnerB"), children: [_jsx("option", { value: "AA", children: "AA" }), _jsx("option", { value: "AS", children: "AS" }), _jsx("option", { value: "SS", children: "SS" })] })] })] }), !compact ? (_jsxs("div", { className: "mt-8 rounded-[1.5rem] border border-brand-forest/10 bg-brand-ink p-5 text-sm text-brand-cream", children: [_jsx("p", { className: "font-semibold text-white", children: "Privacy controls belong in the product, not in policy text alone." }), _jsx("p", { className: "mt-2 leading-6 text-brand-cream/75", children: "Sacred Match supports genotype visibility preferences so users can choose when to disclose, to whom, and under what relationship stage." })] })) : null] }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: clsx("rounded-[1.75rem] border p-6", toneStyles[result.risk]), children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.22em]", children: "Risk Level" }), _jsx("h4", { className: "mt-3 font-display text-2xl font-semibold", children: result.title })] }), _jsx("div", { className: "rounded-2xl bg-white/60 p-3", children: result.risk === "high" ? (_jsx(TriangleAlert, { size: 22 })) : (_jsx(ShieldCheck, { size: 22 })) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex items-end justify-between", children: [_jsx("p", { className: "text-sm font-medium", children: "Compatibility score" }), _jsxs("p", { className: "text-3xl font-bold", children: [result.score, "%"] })] }), _jsx("div", { className: "mt-3 h-3 overflow-hidden rounded-full bg-white/70", children: _jsx("div", { className: "h-full rounded-full bg-current transition-[width] duration-500", style: { width: `${result.score}%` } }) })] }), _jsx("p", { className: "mt-6 text-sm leading-6", children: result.summary }), _jsx("p", { className: "mt-3 text-sm font-medium leading-6", children: result.recommendation })] }), _jsx("div", { className: "mt-6 grid gap-3", children: genotypeCompatibilityTable.map((entry) => (_jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-brand-forest/10 bg-brand-forest/5 px-4 py-3 text-sm", children: [_jsxs("span", { className: "font-semibold text-brand-ink", children: [entry.left, " + ", entry.right] }), _jsx("span", { className: clsx("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]", entry.tone === "low" &&
                                            "bg-emerald-100 text-emerald-900", entry.tone === "moderate" &&
                                            "bg-amber-100 text-amber-900", entry.tone === "high" && "bg-rose-100 text-rose-900"), children: entry.label })] }, `${entry.left}-${entry.right}`))) })] })] }) }));
}
