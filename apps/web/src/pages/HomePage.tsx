import { CheckCircle2, Clock, Dna, Flame, Heart, HeartCrack, MessageCircleX, Shield, ShieldCheck, ShieldX, Sparkles, Star, TrendingDown, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { weddingImages } from "@/content/visuals";
import styles from "./HomePage.module.css";

/* ─── Static data ─────────────────────────────────────────────────────────── */

const problemPoints = [
  { label: "Wasting time on people who aren't serious", icon: Clock },
  { label: "Emotional burn out", icon: HeartCrack },
  { label: "Conversations that go nowhere", icon: MessageCircleX },
  { label: "Unserious intentions", icon: ShieldX },
  { label: "Values & commitment gap", icon: TrendingDown },
  { label: "Serious connections that fade", icon: Heart },
];

const howItWorksSteps = [
  {
    number: "1",
    title: "Create Your Profile",
    description: "Tell us about yourself & what you're seeking in a partner.",
  },
  {
    number: "2",
    title: "Get Verified",
    description: "Identity & intent checks designed for your safety.",
  },
  {
    number: "3",
    title: "Connect Intentionally",
    description: "Meet verified people ready for marriage — like you.",
  },
];

const trustFeatures = [
  { icon: ShieldCheck, label: "ID Authentication" },
  { icon: CheckCircle2, label: "Phone & Email Verification" },
  { icon: Sparkles,    label: "Smart Profile Matching" },
  { icon: Shield,      label: "Verified & Secure" },
  { icon: Users,       label: "Manual Profile Review" },
  { icon: Star,        label: '"Verified for Marriage" Badge' },
];

const genotypeInfo = [
  { type: "AA × AA", result: "Safe", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { type: "AA × AS", result: "Safe", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { type: "AS × AS", result: "Caution", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { type: "AS × SS", result: "High Risk", color: "bg-rose-100 text-rose-800 border-rose-200" },
  { type: "SS × SS", result: "High Risk", color: "bg-rose-100 text-rose-800 border-rose-200" },
  { type: "AA × SS", result: "Caution", color: "bg-amber-100 text-amber-800 border-amber-200" },
];

const personas = [
  {
    title: "Faith Driven Professionals",
    tagline: "You want values, not vibes",
    image: weddingImages[0],
  },
  {
    title: "Mature & Intentional Singles",
    tagline: "You are ready for something real again",
    image: weddingImages[1],
  },
  {
    title: "Diaspora Africans",
    tagline: "You want culture + compatibility",
    image: weddingImages[2],
  },
];

const foundingBenefits = ["Early Access", "Free Verification", "Priority Matching"];

/* ─── Gold headline highlight ─────────────────────────────────────────────── */
const goldStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #C9A227 0%, #E8C96A 45%, #C9A227 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "goldShimmer 4s linear infinite",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HomePage() {
  return (
    <div className="font-body">

      {/* ══════════════════════════════════════════════════════════════════
          HERO — mottled purple, full viewport
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`${styles.heroBackdrop} isolate`}>
        <div className={`${styles.orb} left-[-3rem] top-24  h-36 w-36 bg-white/10`} />
        <div className={`${styles.orb} right-8   top-16  h-20 w-20 bg-brand-clay/20`} style={{ animationDelay: "4s" }} />
        <div className={`${styles.orb} bottom-0  right-[22%] h-44 w-44 bg-white/6`}  style={{ animationDelay: "8s" }} />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-0 sm:px-6 lg:grid-cols-2 lg:items-end lg:px-8">

          {/* Left copy */}
          <div className="relative z-10 flex flex-col justify-center self-center py-10">
            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Heart size={13} className="text-rose-400" fill="currentColor" />
                Real Intentions
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-clay/35 bg-brand-clay/15 px-4 py-2 text-sm font-medium text-brand-gold backdrop-blur-sm">
                <CheckCircle2 size={13} />
                Verified Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-[4.5rem]">
              Find a{" "}
              <span style={goldStyle}>Life Partner,</span>
              <br />
              Not Just a Date
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/70">
              A verified platform for marriage-minded singles ready for real commitment.
            </p>

            {/* Primary CTA */}
            <div className="mt-9">
              <Link className={styles.btnGold} to="/start">
                Join the First 1,000 Serious Singles
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <Flame size={15} className="text-orange-400" />
                <strong className="text-white">327 people</strong> joined this week
              </span>
              <Link
                to="/start"
                className="flex items-center gap-1.5 font-semibold text-white/80 underline-offset-2 transition hover:text-white hover:underline"
              >
                Join Now →
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-8">
              {[
                { icon: ShieldCheck, label: "Free Verification" },
                { icon: Users,       label: "Manual Review" },
                { icon: Shield,      label: "Privacy First" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-white/60">
                  <Icon size={14} className="text-brand-gold" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative z-10 hidden lg:flex lg:items-end lg:justify-center">
            <div
              style={{ animation: "fadeIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
            >
              <img
                alt={weddingImages[0].alt}
                className="h-[750px] w-auto max-w-none object-contain drop-shadow-2xl transition duration-700 hover:scale-[1.03]"
                decoding="async"
                src={weddingImages[0].src}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROBLEM — white / cream
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-bold text-brand-ink sm:text-4xl">
                Tired of Dating That Goes Nowhere?
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemPoints.map(({ label, icon: Icon }, i) => (
              <RevealOnScroll key={label} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-2xl border border-brand-forest/8 bg-brand-cream px-5 py-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(74,47,173,0.09)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-forest/8">
                    <Icon size={18} className="text-brand-forest" />
                  </div>
                  <span className="text-sm font-medium text-brand-ink/80">{label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={480}>
            <p className="mt-12 text-center font-display text-xl italic text-brand-forest/55 sm:text-2xl">
              Serious people deserve a serious platform.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — mottled purple
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`${styles.purpleSection} py-20 sm:py-28`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-bold text-white sm:text-4xl">
                How It Works
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 100}>
                <article className="group flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur transition duration-400 hover:-translate-y-2 hover:bg-white/14 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className={styles.stepNumber}>{step.number}.</div>
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-white/60">{step.description}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRUST — white
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-bold text-brand-ink sm:text-4xl">
                No Fake Profiles. No Games.{" "}
                <span className="block sm:inline">Just Real People.</span>
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustFeatures.map(({ icon: Icon, label }, i) => (
              <RevealOnScroll key={label} delay={i * 65}>
                <div className="flex items-center gap-4 rounded-2xl border border-brand-forest/8 bg-brand-cream px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-brand-moss/18 hover:shadow-[0_8px_28px_rgba(74,47,173,0.09)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-forest/10">
                    <Icon size={16} className="text-brand-forest" />
                  </div>
                  <span className="text-sm font-semibold text-brand-ink">{label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GENOTYPE / DNA — light lavender tint
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`${styles.dnaSection} py-20 sm:py-28`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/15 bg-brand-forest/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-forest">
                <Dna size={13} />
                Nigeria's First
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
                Smart Genotype Matching —{" "}
                <span style={{ ...goldStyle, animation: "none", backgroundPosition: "0% center" }}>
                  Built In
                </span>
              </h2>
              <p className="mt-5 text-base leading-8 text-brand-forest/70">
                Sacred Match is the only Nigerian matrimony platform that integrates genotype
                compatibility into the matchmaking process — privately, thoughtfully, and without
                awkward late-stage conversations.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  { label: "AA", desc: "No sickle cell gene — safest outcome" },
                  { label: "AS", desc: "Healthy carrier — awareness matters" },
                  { label: "SS", desc: "Lives with sickle cell — careful planning needed" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-brand-forest/8 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(74,47,173,0.05)]">
                    <span className="mt-0.5 rounded-lg bg-brand-forest px-2.5 py-1 text-xs font-bold text-white">
                      {item.label}
                    </span>
                    <p className="text-sm leading-6 text-brand-forest/80">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/genotype-guide"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-white px-6 py-3 text-sm font-semibold text-brand-forest shadow-[0_4px_20px_rgba(74,47,173,0.10)] transition hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(74,47,173,0.16)]"
              >
                <Dna size={15} />
                Learn about genotype matching
              </Link>
            </RevealOnScroll>

            {/* Right: compatibility grid */}
            <RevealOnScroll delay={120}>
              <div className="rounded-[2rem] border border-brand-forest/10 bg-white p-8 shadow-[0_12px_48px_rgba(74,47,173,0.10)]">
                <h3 className="font-display text-xl font-bold text-brand-ink">
                  Compatibility at a Glance
                </h3>
                <p className="mt-2 text-sm text-brand-forest/55">
                  Shown only to matches who both opt in — fully private.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {genotypeInfo.map((item) => (
                    <div
                      key={item.type}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold ${item.color}`}
                    >
                      <span>{item.type}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-xs">{item.result}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-brand-forest/8 bg-brand-cream px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-forest/50">
                    Privacy control
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-forest/75">
                    You choose who sees your genotype — show to all, matches only, or keep it
                    private until you're ready.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOUNDING MEMBER CTA — mottled purple
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`${styles.purpleSection} py-20 sm:py-28`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-4">
              <span className={styles.goldLine} />
              <h2 className="font-display text-center text-3xl font-bold text-white sm:text-4xl">
                Join the First{" "}
                <span style={goldStyle}>1,000 Serious</span>{" "}
                Members
              </h2>
              <span className={styles.goldLine} />
            </div>
          </RevealOnScroll>

          {/* Persona cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {personas.map((persona, i) => (
              <RevealOnScroll key={persona.title} delay={i * 100}>
                <article className="group overflow-hidden rounded-[2rem] shadow-[0_16px_50px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
                  <div className="overflow-hidden">
                    <img
                      alt={persona.image.alt}
                      className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                      decoding="async"
                      loading="lazy"
                      src={persona.image.src}
                    />
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-display text-lg font-bold leading-tight text-brand-forest">
                      {persona.title}
                    </p>
                    <p className="mt-1 text-sm text-brand-forest/60 italic">{persona.tagline}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          {/* Benefits + CTA */}
          <RevealOnScroll delay={380}>
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
                {foundingBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-clay/40 bg-brand-clay/15">
                      <CheckCircle2 size={13} className="text-brand-gold" />
                    </div>
                    <span className="text-sm font-medium text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link className={styles.btnGold} to="/start">
                Secure Your Spot
              </Link>

              <p className="text-sm text-white/45">
                Only verified members are accepted. Limited onboarding.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
