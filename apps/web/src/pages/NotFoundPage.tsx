import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="section-shell flex min-h-[70vh] items-center justify-center">
      <div className="surface-card max-w-2xl p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-brand-ink">This route is not part of the current product surface.</h1>
        <p className="mt-5 text-base leading-8 text-brand-forest/80">
          The deployment foundation currently focuses on the acquisition flow, genotype experience, and authentication entry points.
        </p>
        <Link className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" to="/">
          Return home
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
