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
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Member preview"
            title="A signed-in space that feels closer to the product"
            description="This preview is intentionally lightweight, but it gives you a sense of what the authenticated experience can grow into next."
          />
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <div className="surface-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay">
                Account snapshot
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">
                Welcome back, Demo Member.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Sparkles, title: "14", copy: "Recommended matches" },
                  { icon: MessageCircleMore, title: "3", copy: "Unread messages" },
                  { icon: ShieldCheck, title: "Verified", copy: "Phone + email ready" },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <RevealOnScroll key={item.copy} delay={index * 80}>
                      <div className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 p-5">
                        <Icon className="text-brand-emerald" size={20} />
                        <p className="mt-4 font-display text-3xl font-semibold text-brand-ink">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-brand-forest/80">{item.copy}</p>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-halo">
              <img
                alt={weddingImages[0].alt}
                className="h-72 w-full object-cover"
                decoding="async"
                loading="lazy"
                src={weddingImages[0].src}
              />
              <div className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
                  Product direction
                </p>
                <p className="mt-4 text-base leading-8 text-brand-forest/80">
                  The next step after login is to deepen this member area with profile
                  completion, match cards, conversations, saved filters, and account
                  controls connected to the backend.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Sample matches"
            title="A quick look at the style of the signed-in browsing experience"
            description="These are sample cards for the product direction, not fully dynamic results yet."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {sampleMatches.map((match, index) => (
            <RevealOnScroll key={match.name} delay={index * 80}>
              <article className="surface-card overflow-hidden p-0">
                <img
                  alt={weddingImages[index + 1].alt}
                  className="h-60 w-full object-cover"
                  decoding="async"
                  loading="lazy"
                  src={weddingImages[index + 1].src}
                />
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold text-brand-ink">
                      {match.name}
                    </h3>
                    <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-clay">
                      {match.score}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">
                    {match.summary}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
