import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
/** Single shimmer bar */
export function Skeleton({ className }) {
    return (_jsx("div", { className: clsx("animate-pulse rounded-xl bg-brand-forest/8", className) }));
}
/** A multi-line text block placeholder */
export function SkeletonText({ lines = 3, className }) {
    return (_jsx("div", { className: clsx("space-y-2", className), children: Array.from({ length: lines }).map((_, i) => (_jsx(Skeleton, { className: clsx("h-4", i === lines - 1 ? "w-3/4" : "w-full") }, i))) }));
}
/** A card-shaped skeleton placeholder */
export function SkeletonCard({ className }) {
    return (_jsxs("div", { className: clsx("rounded-2xl border border-brand-forest/10 bg-brand-cream p-5", className), children: [_jsx(Skeleton, { className: "mb-4 h-40 w-full rounded-xl" }), _jsx(Skeleton, { className: "mb-2 h-5 w-2/3" }), _jsx(SkeletonText, { lines: 2 })] }));
}
/** Full-page API loading state: grid of skeleton cards */
export function SkeletonGrid({ count = 6, className }) {
    return (_jsx("div", { className: clsx("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className), children: Array.from({ length: count }).map((_, i) => (_jsx(SkeletonCard, {}, i))) }));
}
/** Inline pill / badge skeleton */
export function SkeletonPill({ className }) {
    return _jsx(Skeleton, { className: clsx("h-8 w-24 rounded-full", className) });
}
