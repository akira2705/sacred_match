import { ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Seo } from "@/components/Seo";
import { SectionHeading } from "@/components/SectionHeading";
import { landingPageContent } from "@/content/siteContent";

const pillars = [
  {
    icon: Sparkles,
    title: "Culture with dignity",
    body: "Spousia is built to respect ethnic identity, faith, values, and long-term intent instead of reducing compatibility to a swipe score.",
  },
  {
    icon: UsersRound,
    title: "Connection-only scope",
    body: "The product exists to help serious people find compatible marriage-minded connections. It does not manage weddings, ceremonies, or family logistics.",
  },
  {
    icon: ShieldCheck,
    title: "Trust before growth",
    body: "Safety, moderation, privacy, and verification are part of the architecture from the first release instead of being bolted on later.",
  },
];

const teamMembers = [
  {
    name: "Adaora Okafor",
    role: "Product and Matching Strategy",
    body: "Owns the relationship discovery experience, profile quality, and the compatibility model that keeps the product serious rather than noisy.",
  },
  {
    name: "Tunde Salami",
    role: "Safety and Trust Operations",
    body: "Leads verification standards, reporting flows, moderation policy, and the systems that make cautious users feel safe enough to participate.",
  },
  {
    name: "Mariam Bello",
    role: "Community and Support",
    body: "Shapes support content, help flows, and editorial guidance so users understand how to move through the platform with clarity and respect.",
  },
];

const storyPoints = [
  "Spousia was designed around a simple gap: many people want marriage-minded discovery, but most products optimize for casual attention instead of serious compatibility.",
  "The platform responds to that gap by making culture, faith, location, verification, and genotype visibility first-class product decisions rather than side notes.",
  "That keeps the experience focused on helping the right people find each other and decide whether a connection is worth pursuing.",
];

export function AboutPage() {
  return (
    <div>
      <Seo
        title="About Us"
        description="Learn about Spousia — Nigeria's marriage-minded platform built around culture, genotype awareness, identity verification, and intentional connections."
        canonical="https://spousia.ng/about"
      />
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="About Spousia"
          title="A marriage platform built to help the right people find each other"
          description="Spousia exists to help serious Nigerians discover compatible partners with clarity around values, culture, genotype, and intent."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay">Why we exist</p>
              <div className="mt-6 grid gap-5 text-base leading-8 text-brand-forest/80">
                {storyPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="surface-card overflow-hidden p-0">
              <div className="bg-brand-ink p-8 text-brand-cream sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">Mission</p>
                <h2 className="mt-4 font-display text-4xl font-semibold text-white">
                  Bridge compatibility, clarity, and commitment.
                </h2>
                <p className="mt-5 text-base leading-8 text-brand-cream/80">
                  The product helps people evaluate fit before they invest deeply in a connection. That means better profile signals, safer messaging, and clearer expectations from the start.
                </p>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-clay">What the platform covers</p>
                <div className="mt-6 grid gap-4">
                  {[
                    "Verified account creation and onboarding",
                    "Compatibility-led match discovery",
                    "Genotype visibility and education",
                    "Messaging, blocking, reporting, and support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <RevealOnScroll key={pillar.title} delay={index * 70}>
                <article className="surface-card p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{pillar.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">{pillar.body}</p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card p-8 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay">Team</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">
                The people behind the product direction
              </h2>
            </div>
            <Link
              className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald"
              to="/signup"
            >
              Create an account
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <RevealOnScroll key={member.name} delay={index * 80}>
                <article className="rounded-[1.8rem] border border-brand-forest/10 bg-brand-forest/5 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay">{member.role}</p>
                  <h3 className="mt-4 font-display text-3xl font-semibold text-brand-ink">{member.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">{member.body}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
            <div className="bg-brand-ink p-8 text-brand-cream sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">Safety commitment</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-white">
                Trust features are part of the product, not an afterthought.
              </h2>
              <p className="mt-5 text-base leading-8 text-brand-cream/80">
                Relationship products only work when people feel protected enough to participate honestly. That is why verification, moderation, and user controls are central to the platform architecture.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-clay">Core safeguards</p>
              <div className="mt-6 grid gap-4">
                {landingPageContent.safetyPillars.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
