import {
  ArrowRight,
  BadgeCheck,
  Filter,
  HeartHandshake,
  MessageCircleMore,
  ScrollText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    icon: ShieldCheck,
    step: "Step 1",
    title: "Sign up with email, phone, and strong password rules",
    body: "Account creation starts with identity-aware fields and strong validation so the product begins with better trust signals.",
  },
  {
    icon: BadgeCheck,
    step: "Step 2",
    title: "Verify your account with OTP",
    body: "A timed 6-digit OTP confirms contact channels before profile creation continues.",
  },
  {
    icon: ScrollText,
    step: "Step 3",
    title: "Complete the 7-step profile wizard",
    body: "Personal information, culture, religion, marriage preferences, photos, genotype details, and ID verification all feed profile quality and matching.",
  },
  {
    icon: Search,
    step: "Step 4",
    title: "Browse and filter serious matches",
    body: "Discovery uses age, culture, faith, location, genotype visibility, and intent signals instead of a shallow swipe-only experience.",
  },
  {
    icon: Filter,
    step: "Step 5",
    title: "Review match scores and compatibility breakdowns",
    body: "Users can see why someone is recommended before deciding whether to pass, view the full profile, or take the next step.",
  },
  {
    icon: HeartHandshake,
    step: "Step 6",
    title: "Send a connection request when interest is mutual",
    body: "The product keeps the next step clear: express interest intentionally instead of jumping straight into off-platform contact.",
  },
  {
    icon: MessageCircleMore,
    step: "Step 7",
    title: "Message safely inside the platform",
    body: "Once connected, users can chat, block, report, and manage conversations inside a trust-aware messaging space.",
  },
];

const platformResponsibilities = [
  "Help users build strong profiles with the signals that matter for marriage-minded compatibility.",
  "Make discovery clearer through filters, score breakdowns, and better profile context.",
  "Support connection requests, messaging, safety controls, and moderation workflows.",
  "Give users privacy controls for visibility, activity status, read receipts, and genotype sharing.",
];

export function HowItWorksPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="How it works"
          title="A clear relationship journey from verified signup to intentional conversation"
          description="Sacred Match is designed to move users from account creation to profile completion, compatible discovery, and safe communication without drifting into wedding logistics."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <RevealOnScroll key={item.title} delay={index * 60}>
                <article className="surface-card p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-clay">
                      {item.step}
                    </span>
                    <div className="rounded-2xl bg-brand-emerald/10 p-3 text-brand-emerald">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">{item.body}</p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-clay">What the product handles</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">
                The platform is responsible for helping users find and assess real compatibility.
              </h2>
              <div className="mt-8 grid gap-4">
                {platformResponsibilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="surface-card overflow-hidden p-0">
              <div className="bg-brand-ink p-8 text-brand-cream sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">Scope boundary</p>
                <h2 className="mt-4 font-display text-4xl font-semibold text-white">
                  Sacred Match stops at connection, compatibility, and communication.
                </h2>
                <p className="mt-5 text-base leading-8 text-brand-cream/80">
                  The product does not handle bride price, ceremony planning, family-introduction workflows, or wedding coordination. That line stays explicit so the experience stays focused and credible.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 p-8 sm:p-10">
                <Link
                  className="inline-flex items-center gap-3 rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold"
                  to="/signup"
                >
                  Start signup
                  <ArrowRight size={16} />
                </Link>
                <Link
                  className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest"
                  to="/faq"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
