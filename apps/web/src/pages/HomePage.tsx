import { startTransition, useDeferredValue, useEffect, useState } from "react";
import {
  BookOpen,
  Dna,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GenotypeChecker } from "@/components/GenotypeChecker";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { decorImages, weddingImages } from "@/content/visuals";
import { landingPageContent, type LandingPageContent } from "@/content/siteContent";
import { getLandingPageContent } from "@/lib/api";
import styles from "./HomePage.module.css";

const featureIcons = {
  culture: Globe2,
  matching: Sparkles,
  genotype: Dna,
  conversations: HeartHandshake,
  safety: ShieldCheck,
  stories: Star,
};

export function HomePage() {
  const [content, setContent] = useState<LandingPageContent>(landingPageContent);
  const [faqQuery, setFaqQuery] = useState("");
  const deferredQuery = useDeferredValue(faqQuery.trim().toLowerCase());

  useEffect(() => {
    let active = true;

    void getLandingPageContent().then((nextContent) => {
      if (!active) {
        return;
      }

      startTransition(() => {
        setContent(nextContent);
      });
    });

    return () => {
      active = false;
    };
  }, []);

  const filteredFaqs = content.faqs.filter((faq) => {
    if (!deferredQuery) {
      return true;
    }

    return `${faq.question} ${faq.answer}`.toLowerCase().includes(deferredQuery);
  });

  return (
    <div>
      <section className={`${styles.heroBackdrop} isolate`}>
        <div className={`${styles.orb} left-[-4rem] top-16 h-44 w-44 bg-brand-gold/45`} />
        <div className={`${styles.orb} right-10 top-20 h-28 w-28 bg-brand-moss/45`} />
        <div className={`${styles.orb} bottom-[-3rem] right-[18%] h-52 w-52 bg-brand-clay/30`} />

        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8 lg:py-20">
          <RevealOnScroll className="relative z-10 flex flex-col justify-center">
            <span className="eyebrow border-white/10 bg-white/10 text-brand-cream">
              Matrimony platform for Nigeria
            </span>
            <h1 className="mt-8 max-w-3xl font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl xl:text-7xl">
              Where culture, compatibility, and commitment meet.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-cream/80 sm:text-xl">
              Build serious relationships across Nigeria&apos;s ethnic and religious diversity
              with genotype awareness, thoughtful matching, and trust systems designed for
              marriage-minded people.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-brand-clay px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand-clay/30 transition hover:-translate-y-0.5 hover:bg-brand-gold"
                to="/signup"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                to="/how-it-works"
              >
                Learn How It Works
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {content.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-brand-cream"
                >
                  {metric}
                </span>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="relative z-10 self-center" delay={160}>
            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-[1.08fr_0.92fr]">
                <div className="overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/10 shadow-halo">
                  <img
                    alt={weddingImages[0].alt}
                    className="h-full min-h-[24rem] w-full object-cover transition duration-700 hover:scale-[1.04] lg:min-h-[33rem]"
                    decoding="async"
                    src={weddingImages[0].src}
                  />
                </div>

                <div className="grid gap-4">
                  {weddingImages.slice(1).map((image, index) => (
                    <div
                      key={image.src}
                      className={index === 2 ? "grid gap-4 sm:grid-cols-2" : ""}
                    >
                      {index < 2 ? (
                        <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/10 shadow-[0_18px_50px_rgba(8,28,21,0.16)]">
                          <img
                            alt={image.alt}
                            className="h-48 w-full object-cover transition duration-700 group-hover:scale-[1.05] lg:h-[15.5rem]"
                            decoding="async"
                            loading="lazy"
                            src={image.src}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/75 to-transparent px-5 py-4">
                            <p className="text-sm font-semibold text-white">{image.caption}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/10 shadow-[0_18px_50px_rgba(8,28,21,0.16)] sm:col-span-2">
                          <img
                            alt={image.alt}
                            className="h-52 w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                            decoding="async"
                            loading="lazy"
                            src={image.src}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/75 to-transparent px-5 py-4">
                            <p className="text-sm font-semibold text-white">{image.caption}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card mt-5 border-white/10 bg-white/95 p-6 sm:mx-8 lg:absolute lg:-bottom-10 lg:left-0 lg:right-0 lg:mt-0">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-forest/60">
                      Search preview
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-brand-ink">
                      Find matches with actual depth.
                    </h2>
                  </div>
                  <span className="self-start rounded-full bg-brand-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                    92% match score
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] bg-brand-forest/5 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-forest/60">
                      Ethnic preference
                    </p>
                    <p className="mt-2 text-base font-semibold text-brand-ink">
                      Yoruba, Igbo, open to all
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-brand-forest/5 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-forest/60">
                      Shared priorities
                    </p>
                    <p className="mt-2 text-base font-semibold text-brand-ink">
                      Faith, long-term intent, location
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-brand-forest/5 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-forest/60">
                      Genotype outlook
                    </p>
                    <p className="mt-2 text-base font-semibold text-brand-ink">
                      Low risk, values aligned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Visual atmosphere"
            title="Bring wedding energy into the product, not just copy"
            description="These image panels make the platform feel warm, human, and marriage-minded instead of reading like a generic startup landing page."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {decorImages.map((image, index) => (
            <RevealOnScroll key={image.src} delay={index * 120}>
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-halo">
                <img
                  alt={image.alt}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  decoding="async"
                  loading="lazy"
                  src={image.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-3xl font-semibold text-white">
                    {image.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-brand-cream/85">
                    {image.description}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="section-shell" id="features">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Product pillars"
            title="Built for finding the right person with clarity"
            description="The platform foundation is organized around the decisions serious users actually make: compatibility, safety, clarity, timing, and commitment."
          />
        </RevealOnScroll>

        <div className="section-grid mt-12">
          {content.features.map((feature, index) => {
            const Icon = featureIcons[feature.id as keyof typeof featureIcons] ?? UsersRound;

            return (
              <RevealOnScroll key={feature.id} delay={index * 80}>
                <article className="surface-card p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-forest/8 text-brand-emerald">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-brand-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/75">
                    {feature.description}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-brand-clay">
                    {feature.cta}
                  </p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0" id="genotype">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <RevealOnScroll>
            <div>
              <SectionHeading
                eyebrow="Industry-first feature"
                title="Genotype compatibility belongs inside the product, not in awkward late-stage conversations"
                description="The Sacred Match experience treats genotype as a guided, privacy-aware decision point. Users can learn, compare, and decide at the right relationship stage."
              />
              <div className="mt-8 grid gap-4">
                {[
                  "AA means no sickle cell gene present.",
                  "AS means a healthy carrier of the sickle cell trait.",
                  "SS means living with sickle cell disease and needing careful family planning.",
                  "The platform supports education, visibility controls, and counseling prompts.",
                ].map((item, index) => (
                  <RevealOnScroll key={item} delay={120 + index * 70}>
                    <div className="flex items-start gap-3 rounded-2xl border border-brand-forest/10 bg-white/70 px-5 py-4">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-clay" />
                      <p className="text-sm leading-7 text-brand-forest/75">{item}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <GenotypeChecker />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0" id="connection-flow">
        <RevealOnScroll>
          <div className="surface-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-brand-ink p-8 text-brand-cream sm:p-10">
                <SectionHeading
                  align="left"
                  eyebrow="Connection flow"
                  title="Keep the product focused on finding the right match"
                  description="Sacred Match should help people discover compatible partners, understand fit, and start real conversations. It should stay focused on that core job."
                />
                <div className="mt-8 grid gap-4">
                  {content.connectionSteps.map((step, index) => (
                    <RevealOnScroll key={step} delay={120 + index * 70}>
                      <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                          Step {index + 1}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-brand-cream/80">
                          {step}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <h3 className="font-display text-3xl font-semibold text-brand-ink">
                  Compatibility without off-platform distractions
                </h3>
                <p className="mt-4 text-base leading-7 text-brand-forest/80">
                  Culture, faith, and genotype still matter, but the product&apos;s job ends at helping two serious people find and evaluate a promising connection with clarity.
                </p>
                <div className="mt-8 grid gap-4">
                  {content.ethnicHighlights.map((highlight, index) => (
                    <RevealOnScroll key={highlight} delay={120 + index * 70}>
                      <div className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest">
                        {highlight}
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
                <div className="mt-8 overflow-hidden rounded-[1.75rem]">
                  <img
                    alt={decorImages[1].alt}
                    className="h-52 w-full object-cover"
                    decoding="async"
                    loading="lazy"
                    src={decorImages[1].src}
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0" id="stories">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Success stories"
            title="Every match story should explain why the connection worked"
            description="Instead of generic testimonials, Sacred Match stories should show what made the pair compatible and why the relationship felt worth pursuing."
          />
        </RevealOnScroll>

        <div className={`${styles.storyRail} mt-12 flex gap-5 overflow-x-auto pb-4`}>
          {content.testimonials.map((story, index) => (
            <RevealOnScroll
              key={story.names}
              className="min-w-[320px] max-w-sm flex-1"
              delay={index * 90}
            >
              <article className="surface-card overflow-hidden p-0">
                <img
                  alt={weddingImages[index % weddingImages.length].alt}
                  className="h-56 w-full object-cover"
                  decoding="async"
                  loading="lazy"
                  src={weddingImages[index % weddingImages.length].src}
                />
                <div className="p-7">
                  <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-clay">
                    {story.tag}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-brand-ink">
                    {story.names}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-brand-clay">{story.route}</p>
                  <p className="mt-5 text-sm leading-7 text-brand-forest/80">
                    {story.story}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-brand-forest">
                    {story.timeline}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0" id="safety">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Trust and safety"
              title="Safety is not a bolt-on feature"
              description="Verification, privacy, moderation, and compliance need to shape the core architecture. That work now exists in the product foundation instead of being deferred until after growth."
            />
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.safetyPillars.map((pillar, index) => (
              <RevealOnScroll key={pillar} delay={index * 70}>
                <div className="surface-card p-6">
                  <ShieldCheck className="text-brand-emerald" size={22} />
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">
                    {pillar}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0" id="resources">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Resources"
            title="Content should make better connections easier"
            description="Marriage education, genotype literacy, and compatibility guidance reduce confusion and help users make better decisions before emotions get ahead of clarity."
          />
        </RevealOnScroll>

        <div className="section-grid mt-12">
          {content.resources.map((resource, index) => (
            <RevealOnScroll key={resource.title} delay={index * 80}>
              <article className="surface-card p-7">
                <div className="flex items-center gap-3 text-brand-clay">
                  <BookOpen size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {resource.category}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand-ink">
                  {resource.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-brand-forest/80">
                  {resource.excerpt}
                </p>
                <p className="mt-6 text-sm font-semibold text-brand-forest">
                  {resource.readTime}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0" id="faq">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="FAQ"
              title="Users need clarity on sensitive decisions"
              description="This search-ready FAQ pattern supports the questions that determine whether a matrimony platform feels trustworthy enough to join."
            />
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="surface-card p-6 sm:p-8">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">
                  Search FAQs
                </span>
                <input
                  className="input-shell"
                  onChange={(event) => setFaqQuery(event.target.value)}
                  placeholder="Search privacy, genotype, compatibility..."
                  value={faqQuery}
                />
              </label>

              <div className="mt-6 grid gap-4">
                {filteredFaqs.map((faq, index) => (
                  <RevealOnScroll key={faq.question} delay={80 + index * 60}>
                    <details className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4">
                      <summary className="cursor-pointer list-none font-semibold text-brand-ink">
                        {faq.question}
                      </summary>
                      <p className="mt-4 text-sm leading-7 text-brand-forest/80">
                        {faq.answer}
                      </p>
                    </details>
                  </RevealOnScroll>
                ))}

                {filteredFaqs.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-brand-forest/15 px-5 py-6 text-sm text-brand-forest/70">
                    No FAQ entries matched that search term yet.
                  </div>
                ) : null}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-forest px-6 py-12 text-center text-brand-cream shadow-halo sm:px-12">
            <img
              alt={decorImages[2].alt}
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              decoding="async"
              loading="lazy"
              src={decorImages[2].src}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-forest/70 to-brand-ink/85" />
            <div className="relative z-10">
              <p className="eyebrow border-white/10 bg-white/10 text-brand-gold">
                Launch-ready direction
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Ready to help serious people find the right connection.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-cream/75 sm:text-lg">
                The current build establishes a scalable front door, product story, signup funnel,
                genotype engine, and backend shape for the next implementation passes.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  className="rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-ink transition hover:bg-brand-cream"
                  to="/signup"
                >
                  Start building profiles
                </Link>
                <Link
                  className="rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                  to="/genotype"
                >
                  Explore genotype feature
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}


