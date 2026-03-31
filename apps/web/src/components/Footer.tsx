import { Link } from "react-router-dom";

const footerColumns = {
  Product: [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Genotype Guide", href: "/genotype-guide" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety", href: "/safety" },
    { label: "Contact", href: "/contact" },
    { label: "Log In", href: "/login" },
    { label: "Sign Up", href: "/signup" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Data Protection", href: "/data-protection" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-forest/10 bg-brand-ink text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <span className="eyebrow border-white/10 bg-white/5 text-brand-gold">
            Sacred Match
          </span>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">
            Compatibility, clarity, and safe conversation for marriage-minded Nigerians.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-brand-cream/75">
            The platform is intentionally scoped to help people discover compatible connections,
            evaluate fit, and communicate safely. It does not extend into offline ceremony or
            wedding logistics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-brand-cream/80">
            <span className="pill-chip border-white/10 bg-white/5 text-brand-cream">
              Connection-only scope
            </span>
            <span className="pill-chip border-white/10 bg-white/5 text-brand-cream">
              Verification-aware
            </span>
            <span className="pill-chip border-white/10 bg-white/5 text-brand-cream">
              Safe messaging
            </span>
          </div>
        </div>

        {Object.entries(footerColumns).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-gold">
              {heading}
            </h4>
            <div className="mt-5 grid gap-3 text-sm text-brand-cream/75">
              {links.map((link) => (
                <Link key={link.label} className="transition hover:text-white" to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-brand-cream/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Sacred Match Nigeria. All rights reserved.</p>
          <p>Built for profile quality, compatibility, messaging, moderation, and trust.</p>
        </div>
      </div>
    </footer>
  );
}
