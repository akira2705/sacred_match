import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Dna, ShieldCheck, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  GenotypeValue,
  genotypeCompatibilityTable,
  getCompatibilityResult,
} from "@/lib/genotype";

const formSchema = z.object({
  partnerA: z.enum(["AA", "AS", "SS"]),
  partnerB: z.enum(["AA", "AS", "SS"]),
});

type FormValues = z.infer<typeof formSchema>;

const toneStyles = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-900",
  moderate: "border-amber-200 bg-amber-50 text-amber-900",
  high: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

type GenotypeCheckerProps = {
  compact?: boolean;
};

export function GenotypeChecker({ compact = false }: GenotypeCheckerProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partnerA: "AA",
      partnerB: "AS",
    },
  });

  const values = form.watch();
  const result = getCompatibilityResult(
    values.partnerA as GenotypeValue,
    values.partnerB as GenotypeValue,
  );

  return (
    <div className="surface-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-brand-forest/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-emerald/10 p-3 text-brand-emerald">
              <Dna size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-forest/60">
                Compatibility Checker
              </p>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Quick genotype review
              </h3>
            </div>
          </div>

          <form className="mt-8 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">
                Your genotype
              </span>
              <select className="input-shell" {...form.register("partnerA")}>
                <option value="AA">AA</option>
                <option value="AS">AS</option>
                <option value="SS">SS</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">
                Partner&apos;s genotype
              </span>
              <select className="input-shell" {...form.register("partnerB")}>
                <option value="AA">AA</option>
                <option value="AS">AS</option>
                <option value="SS">SS</option>
              </select>
            </label>
          </form>

          {!compact ? (
            <div className="mt-8 rounded-[1.5rem] border border-brand-forest/10 bg-brand-ink p-5 text-sm text-brand-cream">
              <p className="font-semibold text-white">
                Privacy controls belong in the product, not in policy text alone.
              </p>
              <p className="mt-2 leading-6 text-brand-cream/75">
                Spousia supports genotype visibility preferences so users can
                choose when to disclose, to whom, and under what relationship stage.
              </p>
            </div>
          ) : null}
        </div>

        <div className="p-6 sm:p-8">
          <div
            className={clsx(
              "rounded-[1.75rem] border p-6",
              toneStyles[result.risk],
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                  Risk Level
                </p>
                <h4 className="mt-3 font-display text-2xl font-semibold">
                  {result.title}
                </h4>
              </div>
              <div className="rounded-2xl bg-white/60 p-3">
                {result.risk === "high" ? (
                  <TriangleAlert size={22} />
                ) : (
                  <ShieldCheck size={22} />
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <p className="text-sm font-medium">Compatibility score</p>
                <p className="text-3xl font-bold">{result.score}%</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/70">
                <div
                  className="h-full rounded-full bg-current transition-[width] duration-500"
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            <p className="mt-6 text-sm leading-6">{result.summary}</p>
            <p className="mt-3 text-sm font-medium leading-6">
              {result.recommendation}
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {genotypeCompatibilityTable.map((entry) => (
              <div
                key={`${entry.left}-${entry.right}`}
                className="flex items-center justify-between rounded-2xl border border-brand-forest/10 bg-brand-forest/5 px-4 py-3 text-sm"
              >
                <span className="font-semibold text-brand-ink">
                  {entry.left} + {entry.right}
                </span>
                <span
                  className={clsx(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                    entry.tone === "low" &&
                      "bg-emerald-100 text-emerald-900",
                    entry.tone === "moderate" &&
                      "bg-amber-100 text-amber-900",
                    entry.tone === "high" && "bg-rose-100 text-rose-900",
                  )}
                >
                  {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
