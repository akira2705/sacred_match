import { CheckCircle2, Heart, Shield, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { weddingImages } from "@/content/visuals";
import styles from "./HomePage.module.css";

const problemPoints = [
  "Fake profiles & scams",
  "Emotional burn out",
  "Endless talking stages",
  "Unserious intentions",
  "Values & commitment gap",
  "Wrong match, wrong time",
];

const howItWorksSteps = [
  {
    number: "1",
    title: "Create Your Profile",
    description: "Tell us about yourself and what you're seeking in a partner.",
  },
  {
    number: "2",
    title: "Get Verified",
    description: "Identity and intent checks designed for your safety.",
  },
  {
    number: "3",
    title: "Connect Intentionally",
    description: "Meet marriage-minded singles matched to your values.",
  },
];

const trustFeatures = [
  { icon: ShieldCheck, label: "ID Authentication" },
  { icon: CheckCircle2, label: "Phone & Email Verification" },
  { icon: Sparkles, label: "Smart Profile Matching" },
  { icon: Shield, label: "Verified & Secure" },
  { icon: Users, label: "Manual Profile Review" },
  { icon: Star, label: '"Verified for Marriage" Badge' },
];

const personas = [
  {
    title: "Faith Driven Professionals",
    image: weddingImages[0],
  },
  {
    title: "Mature & Intentional Singles",
    image: weddingImages[1],
  },
  {
    title: "Diaspora Africans",
    image: weddingImages[2],
  },
];

const foundingBenefits = ["Early Access", "Free Verification", "Priority Matching"];

export function HomePage() {
  return (
    <div className="font-body">
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className={`${styles.heroBackdrop} isolate`}>
        <div className={`${styles.orb} left-[-3rem] top-24 h-40 w-40 bg-brand-moss/30`} />
        <div className={`${styles.orb} right-8 top-16 h-24 w-24 bg-brand-clay/25`} style={{ animationDelay: "3s" }} />
        <div className={`${styles.orb} bottom-[-2rem] right-[20%] h-48 w-48 bg-brand-moss/20`} style={{ animationDelay: "6s" }} />

        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          {/* Left: copy */}
          <div className="relative z-10 flex flex-col justify-center">
            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Heart size={14} className="text-rose-400" fill="currentColor" />
                Not a dating app
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-clay/30 bg-brand-clay/15 px-4 py-2 text-sm font-medium text-brand-gold backdrop-blur-sm">
                <CheckCircle2 size={14} />
                Built for serious relationships
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl xl:text-[4.25rem]">
              Where Real Intentions{" "}
              <br className="hidden sm:block" />
              Meet Real{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #C9A227 0%, #E8C96A 50%, #C9A227 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "goldShimmer 4s linear infinite",
                }}
              >
                Connections
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-white/70">
              A trusted platform for marriage-minded singles.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link className={styles.btnGold} to="/signup">
                Click Here to Start
              </Link>
              <Link className={styles.btnOutline} to="/how-it-works">
                Get Verified
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-8">
              {[
                { icon: ShieldCheck, label: "ID Verified Profiles" },
                { icon: Users, label: "Human Moderation" },
                { icon: Shield, label: "Privacy First" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-white/65">
                  <Icon size={15} className="text-brand-gold" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative z-10 hidden lg:block">
            <div
              className="overflow-hidden rounded-[2.5rem] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
              style={{ animation: "fadeIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
            >
              <img
                alt={weddingImages[0].alt}
                className="h-[600px] w-full object-cover transition duration-700 hover:scale-[1.03]"
                decoding="async"
                src={weddingImages[0].src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            </div>
            {/* Floating match score badge */}
            <div
              className="absolute -bottom-5 -left-8 rounded-[1.5rem] border border-white/20 bg-white/95 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur"
              style={{ animation: "fadeUpSoft 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s both" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest/50">
                Match Score
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-brand-ink">
                94{" "}
                <span className="text-lg font-normal text-brand-forest/40">/ 100</span>
              </p>
              <div className="mt-2 h-1.5 w-36 overflow-hidden rounded-full bg-brand-forest/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "94%",
                    background: "linear-gradient(90deg, #2B1B6E, #6B5CE7)",
                    transition: "width 1.4s cubic-bezier(0.22,1,0.36,1) 0.8s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM SECTION ──────────────────────────────────────────── */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-semibold text-brand-ink sm:text-4xl">
                Modern Dating Is Broken
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemPoints.map((point, i) => (
              <RevealOnScroll key={point} delay={i * 75}>
                <div className="flex items-center gap-3 rounded-2xl border border-brand-forest/8 bg-white px-5 py-4 shadow-[0_4px_24px_rgba(43,27,110,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(43,27,110,0.1)]">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-clay" />
                  <span className="text-sm font-medium text-brand-ink/80">{point}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={500}>
            <p className="mt-12 text-center font-display text-xl italic text-brand-forest/60 sm:text-2xl">
              Serious people deserve a serious platform.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className={`${styles.purpleSection} py-20 sm:py-28`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-semibold text-white sm:text-4xl">
                How It Works
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 100}>
                <article className="group rounded-[2rem] border border-white/12 bg-white/8 p-8 backdrop-blur transition duration-400 hover:-translate-y-2 hover:bg-white/14 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <div
                    className={styles.stepNumber}
                    style={{ transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
                  >
                    {step.number}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {step.description}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUILT ON TRUST ───────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-semibold text-brand-ink sm:text-4xl">
                Built on Trust
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustFeatures.map(({ icon: Icon, label }, i) => (
              <RevealOnScroll key={label} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-2xl border border-brand-forest/8 bg-brand-cream px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-brand-moss/20 hover:shadow-[0_8px_32px_rgba(43,27,110,0.09)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-forest/8">
                    <Icon size={18} className="text-brand-forest" />
                  </div>
                  <span className="text-sm font-semibold text-brand-ink">{label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─────────────────────────────────────────────── */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-semibold text-brand-ink sm:text-4xl">
                Who It&apos;s For
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {personas.map((persona, i) => (
              <RevealOnScroll key={persona.title} delay={i * 110}>
                <article className="group relative overflow-hidden rounded-[2rem] shadow-[0_16px_50px_rgba(43,27,110,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(43,27,110,0.2)]">
                  <img
                    alt={persona.image.alt}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    decoding="async"
                    loading="lazy"
                    src={persona.image.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-xl font-semibold text-white">
                      {persona.title}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDING MEMBER CTA ──────────────────────────────────────── */}
      <section className={`${styles.purpleSection} py-20 sm:py-28`}>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Become a Founding Member
              </h2>
              <span className={styles.goldLine} />
            </div>

            <p className="mt-5 text-lg text-white/65">
              Be among the first{" "}
              <span className="font-bold text-brand-gold">1,000</span> serious singles.
            </p>

            <div className="mt-10 inline-flex flex-col items-start gap-4 rounded-[2rem] border border-white/10 bg-white/6 px-8 py-6 backdrop-blur sm:flex-row sm:items-center sm:gap-10">
              {foundingBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-clay/40 bg-brand-clay/15">
                    <CheckCircle2 size={13} className="text-brand-gold" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link className={styles.btnGold} to="/signup">
                Reserve Your Spot
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
