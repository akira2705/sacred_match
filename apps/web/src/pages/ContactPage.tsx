import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";

const contactChannels = [
  {
    icon: Mail,
    title: "General enquiries",
    detail: "support@sacred-match.ng",
    note: "Product, support, and early-access requests"
  },
  {
    icon: PhoneCall,
    title: "Partnerships",
    detail: "+234 launch contact pending",
    note: "Verification, counseling, and healthcare partners"
  },
  {
    icon: MapPinned,
    title: "Launch corridor",
    detail: "Lagos, Abuja, Kano",
    note: "Initial market focus before wider Nigerian rollout"
  }
];

export function ContactPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Contact"
          title="Operate the launch with clear support and trust channels"
          description="Sacred Match is a high-trust product, which means support, verification, and genotype education all need visible contact paths."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;

            return (
              <article key={channel.title} className="surface-card p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                  <Icon size={22} />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{channel.title}</h2>
                <p className="mt-3 text-sm font-semibold text-brand-clay">{channel.detail}</p>
                <p className="mt-4 text-sm leading-7 text-brand-forest/80">{channel.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card overflow-hidden bg-brand-forest text-brand-cream">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">Deployment next</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-white">The product foundation is ready for the next delivery wave.</h2>
              <p className="mt-5 text-base leading-8 text-brand-cream/80">
                The next implementation passes should complete profile creation, matching, messaging, moderation, and richer signed-in browsing on top of the schema and routes already in place.
              </p>
            </div>
            <div className="flex items-center p-8 sm:p-10">
              <Link className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-cream" to="/signup">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
