import { Dna, ShieldCheck } from "lucide-react";
import { GenotypeChecker } from "@/components/GenotypeChecker";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { genotypeCompatibilityTable } from "@/lib/genotype";

export function GenotypePage() {
  return (
    <div>
      <Seo
        title="Genotype Guide — AA, AS, SS Compatibility"
        description="Understand genotype compatibility in Nigerian marriages. Spousia integrates AA, AS, and SS genotype awareness privately into the matchmaking process."
        canonical="https://spousia.ng/genotype-guide"
      />
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Genotype feature"
          title="A medically sensitive feature built into the matchmaking journey"
          description="Spousia treats genotype compatibility as an informed-decision layer with privacy, education, and counseling-oriented product language."
        />
      </section>

      <section className="section-shell pt-0">
        <GenotypeChecker />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald">
              <Dna size={22} />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold text-brand-ink">What the feature needs to do</h2>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-brand-forest/80">
              <p>Explain AA, AS, and SS in direct language that does not trivialize sickle-cell risk.</p>
              <p>Allow users to control when genotype is shown and to whom it becomes visible.</p>
              <p>Trigger counseling prompts for caution and high-risk pairings instead of only color labels.</p>
              <p>Support future integrations with verified testing labs and medical education content.</p>
            </div>
          </div>

          <div className="surface-card p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-clay/10 text-brand-clay">
              <ShieldCheck size={22} />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold text-brand-ink">Public matrix shipped in this foundation</h2>
            <div className="mt-6 grid gap-3">
              {genotypeCompatibilityTable.map((entry) => (
                <div key={`${entry.left}-${entry.right}`} className="flex items-center justify-between rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm">
                  <span className="font-semibold text-brand-ink">{entry.left} + {entry.right}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-forest">
                    {entry.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
