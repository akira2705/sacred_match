import { useRef, useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { LogOut, Menu, ShieldCheck, UserCircle2, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUiStore } from "@/store/useUiStore";

type NavItem = {
  label: string;
  href: string;
  end?: boolean;
};

type RouteMode = "public" | "member" | "admin";
type LayoutMode = "desktop" | "compact" | "mobile";

type NavMeasurements = {
  container: number;
  brand: number;
  desktopNav: number;
  desktopActions: number;
  compactBadge: number;
  compactActions: number;
  menuOnlyActions: number;
};

const publicNav: NavItem[] = [
  { label: "Home", href: "/", end: true },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Genotype Guide", href: "/genotype-guide" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const memberNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Matches", href: "/matches" },
  { label: "Connections", href: "/connections" },
  { label: "Messages", href: "/messages" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "/help" },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", end: true },
  { label: "Reports", href: "/admin/reports" },
  { label: "Users", href: "/admin/users" },
  { label: "Content", href: "/admin/content" },
  { label: "Analytics", href: "/admin/analytics" },
];

const memberRoutePrefixes = [
  "/dashboard",
  "/matches",
  "/connections",
  "/messages",
  "/profile",
  "/settings",
  "/safety",
  "/help",
];

const desktopLinkClass =
  "relative inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold tracking-tight text-brand-forest/75 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:text-brand-ink";

const measurementClass =
  "pointer-events-none absolute left-[-9999px] top-0 -z-50 opacity-0 overflow-hidden";

function readWidth(element: Element | null) {
  return element instanceof HTMLElement ? Math.ceil(element.getBoundingClientRect().width) : 0;
}

function matchesPath(pathname: string, item: NavItem) {
  if (item.end) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function detectRouteMode(pathname: string): RouteMode {
  if (pathname.startsWith("/admin")) {
    return "admin";
  }

  if (memberRoutePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return "member";
  }

  return "public";
}

function currentLabel(pathname: string, items: NavItem[]) {
  return items.find((item) => matchesPath(pathname, item))?.label ?? items[0]?.label ?? "Menu";
}

/** Animated mobile nav item: magnetic cursor tracking + scale-down on hover */
function MobileNavItem({ item, closeMobileMenu }: { item: NavItem; closeMobileMenu: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.1, y: (e.clientY - cy) * 0.1 });
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  }

  const isMoving = pos.x !== 0 || pos.y !== 0;

  return (
    <NavLink
      end={item.end}
      to={item.href}
      onClick={closeMobileMenu}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 0.96 : 1})`,
        transition: isMoving
          ? "transform 0.12s ease-out, background-color 0.3s, color 0.3s, border-color 0.3s"
          : "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), background-color 0.3s, color 0.3s, border-color 0.3s",
      }}
      className={({ isActive }) =>
        clsx(
          "block rounded-2xl border border-transparent bg-white/55 px-4 py-3 text-sm font-semibold text-brand-forest",
          isActive && "border-brand-ink/10 bg-brand-ink text-[#C9A227] shadow-[0_8px_24px_rgba(43,27,110,0.22)]",
        )
      }
    >
      {item.label}
    </NavLink>
  );
}

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu);
  const pathname = location.pathname;
  const routeMode = detectRouteMode(pathname);
  const isSignedIn = typeof window !== "undefined" && Boolean(window.localStorage.getItem("spousia-token"));

  const rowRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const desktopNavMeasureRef = useRef<HTMLDivElement | null>(null);
  const desktopActionsMeasureRef = useRef<HTMLDivElement | null>(null);
  const compactBadgeMeasureRef = useRef<HTMLSpanElement | null>(null);
  const compactActionsMeasureRef = useRef<HTMLDivElement | null>(null);
  const menuOnlyActionsMeasureRef = useRef<HTMLDivElement | null>(null);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return "desktop";
    if (typeof window !== "undefined" && window.innerWidth >= 640) return "compact";
    return "mobile";
  });
  const [showInlineAction, setShowInlineAction] = useState(true);
  const [measurements, setMeasurements] = useState<NavMeasurements>({
    container: 0,
    brand: 0,
    desktopNav: 0,
    desktopActions: 0,
    compactBadge: 0,
    compactActions: 0,
    menuOnlyActions: 0,
  });

  const navItems = useMemo(() => {
    if (routeMode === "admin") {
      return adminNav;
    }

    if (routeMode === "member") {
      return memberNav;
    }

    return publicNav;
  }, [routeMode]);

  const activeLabel = currentLabel(pathname, navItems);

  const primaryAction = useMemo(() => {
    if (routeMode === "admin") {
      return { label: "Member View", href: "/dashboard" };
    }

    if (routeMode === "member") {
      return { label: "Safety", href: "/safety" };
    }

    if (isSignedIn) {
      return { label: "Dashboard", href: "/dashboard" };
    }

    return { label: "Sign Up", href: "/signup" };
  }, [isSignedIn, routeMode]);

  const secondaryLink = routeMode === "public" && !isSignedIn ? { label: "Log In", href: "/login" } : null;

  function handleLogout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("spousia-token");
      window.localStorage.removeItem("spousia-role");
    }

    closeMobileMenu();
    navigate("/");
  }

  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const trackedNodes = [
      rowRef.current,
      brandRef.current,
      desktopNavMeasureRef.current,
      desktopActionsMeasureRef.current,
      compactBadgeMeasureRef.current,
      compactActionsMeasureRef.current,
      menuOnlyActionsMeasureRef.current,
    ].filter((node): node is HTMLElement => Boolean(node));

    const measure = () => {
      const next: NavMeasurements = {
        container: readWidth(rowRef.current),
        brand: readWidth(brandRef.current),
        desktopNav: readWidth(desktopNavMeasureRef.current),
        desktopActions: readWidth(desktopActionsMeasureRef.current),
        compactBadge: readWidth(compactBadgeMeasureRef.current),
        compactActions: readWidth(compactActionsMeasureRef.current),
        menuOnlyActions: readWidth(menuOnlyActionsMeasureRef.current),
      };

      setMeasurements((current) => {
        const changed = Object.keys(next).some((key) => next[key as keyof NavMeasurements] !== current[key as keyof NavMeasurements]);
        return changed ? next : current;
      });
    };

    measure();

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    trackedNodes.forEach((node) => observer?.observe(node));
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [activeLabel, navItems, primaryAction.label, routeMode, secondaryLink?.label]);

  useEffect(() => {
    const breathingRoom = 56;
    const compactBreathingRoom = 40;
    const mobileBreathingRoom = 24;

    const desktopFits =
      measurements.container >=
      measurements.brand + measurements.desktopNav + measurements.desktopActions + breathingRoom;
    const compactFits =
      measurements.container >=
      measurements.brand + measurements.compactBadge + measurements.compactActions + compactBreathingRoom;
    const mobileActionFits =
      measurements.container >=
      measurements.brand + measurements.compactActions + mobileBreathingRoom;

    if (desktopFits) {
      setLayoutMode("desktop");
      setShowInlineAction(true);
      return;
    }

    if (compactFits) {
      setLayoutMode("compact");
      setShowInlineAction(true);
      return;
    }

    setLayoutMode("mobile");
    setShowInlineAction(mobileActionFits);
  }, [measurements]);

  useEffect(() => {
    if (layoutMode === "desktop" && mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [closeMobileMenu, layoutMode, mobileMenuOpen]);

  const statusBadge =
    routeMode === "admin"
      ? "Admin workspace"
      : routeMode === "member"
        ? activeLabel
        : "Serious connections only";

  return (
    <header className="relative z-40 px-3 pt-3 sm:px-4" style={{ transition: "none" }}>
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-brand-forest/12 bg-brand-cream/90 shadow-velvet backdrop-blur-2xl">
        <div ref={rowRef} className="grid grid-cols-[minmax(0,auto)_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            ref={brandRef}
            className={clsx(
              "group flex min-w-0 shrink-0 items-center",
              layoutMode === "mobile" ? "gap-2.5" : "gap-3.5",
            )}
            to="/"
          >
            <img
              src="/spousia-logo.png"
              alt="Spousia"
              className="h-14 w-14 shrink-0 rounded-[1.6rem] object-cover shadow-[0_18px_40px_rgba(43,27,110,0.28)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.04]"
              onError={(e) => {
                // Fallback to text badge if logo not yet placed
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[1.6rem] bg-brand-forest text-xl font-extrabold text-brand-cream shadow-[0_18px_40px_rgba(43,27,110,0.28)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.04]"
              aria-hidden="true"
            >
              S
            </div>
            <div className="min-w-0">
              <p
                className={clsx(
                  "truncate font-display leading-none tracking-tight text-brand-ink",
                  layoutMode === "mobile"
                    ? "text-[1.35rem] sm:text-[1.45rem]"
                    : "text-[clamp(1.55rem,1.9vw,1.95rem)]",
                )}
              >
                Spousia
              </p>
              {routeMode !== "admin" ? (
                <p
                  className={clsx(
                    "mt-1 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.28em] text-brand-forest/68",
                    layoutMode === "desktop" ? "hidden sm:block" : "hidden",
                  )}
                >
                  Marriage-minded connections in Nigeria
                </p>
              ) : null}
            </div>
          </Link>

          {layoutMode === "desktop" ? (
            <nav className="min-w-0 items-center justify-center lg:flex">
              <div className="flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-brand-forest/10 bg-white/70 p-1.5 shadow-[0_14px_34px_rgba(43,27,110,0.07)]">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    className={({ isActive }) =>
                      clsx(
                        desktopLinkClass,
                        isActive &&
                          "bg-brand-forest text-white shadow-[0_10px_24px_rgba(43,27,110,0.25)] hover:bg-brand-forest hover:text-white",
                      )
                    }
                    end={item.end}
                    to={item.href}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>
          ) : layoutMode === "compact" ? (
            <div className="justify-self-center min-w-0 px-3">
              <span className="inline-flex max-w-[14rem] truncate rounded-full border border-brand-forest/10 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-forest">
                {statusBadge}
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
            {layoutMode === "desktop" ? (
              <>
                {secondaryLink ? (
                  <Link
                    className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-brand-forest/15 bg-white/55 px-5 text-sm font-semibold text-brand-forest transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-forest/30 hover:bg-white hover:text-brand-ink"
                    to={secondaryLink.href}
                  >
                    {secondaryLink.label}
                  </Link>
                ) : null}

                <Link
                  className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay px-5 text-sm font-semibold text-brand-ink shadow-[0_10px_28px_rgba(201,162,39,0.32)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-brand-gold hover:shadow-[0_16px_40px_rgba(201,162,39,0.38)]"
                  to={primaryAction.href}
                >
                  {primaryAction.label}
                </Link>

                {!secondaryLink ? (
                  <button
                    className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-forest/15 bg-white/55 px-5 text-sm font-semibold text-brand-forest transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-forest/30 hover:bg-white hover:text-brand-ink"
                    onClick={handleLogout}
                    type="button"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                ) : null}
              </>
            ) : (
              <>
                {showInlineAction ? (
                  <Link
                    className={clsx(
                      "inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay text-sm font-semibold text-brand-ink shadow-[0_10px_24px_rgba(201,162,39,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-brand-gold",
                      layoutMode === "mobile" ? "px-3.5" : "px-4",
                    )}
                    to={primaryAction.href}
                  >
                    {primaryAction.label}
                  </Link>
                ) : null}

                <button
                  aria-label="Toggle navigation"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-brand-forest/15 bg-white/60 text-brand-forest shadow-[0_10px_26px_rgba(43,27,110,0.07)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-white"
                  onClick={toggleMobileMenu}
                  type="button"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={measurementClass} aria-hidden="true">
          <div className="inline-flex flex-col gap-4 p-4">
            <div ref={desktopNavMeasureRef} className="flex items-center gap-1.5 rounded-full border border-brand-forest/10 bg-white/70 p-1.5">
              {navItems.map((item) => (
                <span key={`measure-desktop-${item.href}`} className={desktopLinkClass}>
                  {item.label}
                </span>
              ))}
            </div>

            <div ref={desktopActionsMeasureRef} className="flex items-center gap-3">
              {secondaryLink ? (
                <span className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-brand-forest/15 bg-white/55 px-5 text-sm font-semibold text-brand-forest">
                  {secondaryLink.label}
                </span>
              ) : null}
              <span className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay px-5 text-sm font-semibold text-white">
                {primaryAction.label}
              </span>
              {!secondaryLink ? (
                <span className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-brand-forest/15 bg-white/55 px-5 text-sm font-semibold text-brand-forest">
                  Log Out
                </span>
              ) : null}
            </div>

            <span ref={compactBadgeMeasureRef} className="inline-flex max-w-[14rem] truncate rounded-full border border-brand-forest/10 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-forest">
              {statusBadge}
            </span>

            <div ref={compactActionsMeasureRef} className="flex items-center gap-3">
              <span className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay px-4 text-sm font-semibold text-white">
                {primaryAction.label}
              </span>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-brand-forest/15 bg-white/60 text-brand-forest">
                <Menu size={18} />
              </span>
            </div>

            <div ref={menuOnlyActionsMeasureRef} className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-brand-forest/15 bg-white/60 text-brand-forest">
                <Menu size={18} />
              </span>
            </div>
          </div>
        </div>

        {mobileMenuOpen && layoutMode !== "desktop" ? (
          <div className="border-t border-brand-forest/10 bg-brand-cream/90">
            <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6">
              {navItems.map((item) => (
                <MobileNavItem key={item.href} item={item} closeMobileMenu={closeMobileMenu} />
              ))}

              <div className="grid gap-3 pt-2">
                {secondaryLink ? (
                  <Link
                    className="rounded-2xl border border-brand-forest/15 bg-white/55 px-4 py-3 text-center text-sm font-semibold text-brand-forest"
                    onClick={closeMobileMenu}
                    to={secondaryLink.href}
                  >
                    {secondaryLink.label}
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-forest/15 bg-white/55 px-4 py-3 text-sm font-semibold text-brand-forest"
                    onClick={handleLogout}
                    type="button"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                )}

                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-clay px-4 py-3 text-center text-sm font-semibold text-brand-ink"
                  onClick={closeMobileMenu}
                  to={primaryAction.href}
                >
                  {routeMode === "member" ? <ShieldCheck size={16} /> : null}
                  {routeMode === "admin" ? <UserCircle2 size={16} /> : null}
                  {primaryAction.label}
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
