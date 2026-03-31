import { useEffect, useMemo, useSyncExternalStore } from "react";
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
  "relative inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold tracking-tight text-brand-forest/82 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:text-brand-ink";

function subscribeToViewport(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback);

  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

function getViewportWidth() {
  return typeof window === "undefined" ? 1600 : window.innerWidth;
}

function useNavLayoutMode() {
  const width = useSyncExternalStore(subscribeToViewport, getViewportWidth, () => 1600);

  if (width < 920) {
    return { width, mode: "mobile" as const };
  }

  if (width < 1380) {
    return { width, mode: "compact" as const };
  }

  return { width, mode: "desktop" as const };
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

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { width, mode } = useNavLayoutMode();
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen);
  const toggleMobileMenu = useUiStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu);
  const pathname = location.pathname;
  const routeMode = detectRouteMode(pathname);
  const isSignedIn = typeof window !== "undefined" && Boolean(window.localStorage.getItem("sacred-match-token"));

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
  const showCompactAction = width >= 480;

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
      window.localStorage.removeItem("sacred-match-token");
    }

    closeMobileMenu();
    navigate("/");
  }

  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, pathname]);

  useEffect(() => {
    if (mode === "desktop" && mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [closeMobileMenu, mobileMenuOpen, mode]);

  return (
    <header className="relative z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/80 bg-brand-cream/82 shadow-velvet backdrop-blur-2xl">
        <div className="grid grid-cols-[minmax(0,auto)_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
          <Link className="group flex min-w-0 shrink-0 items-center gap-3.5" to="/">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.6rem] bg-brand-forest text-xl font-extrabold text-brand-cream shadow-[0_18px_40px_rgba(27,67,50,0.22)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.04]">
              SM
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-[clamp(1.55rem,1.9vw,1.95rem)] leading-none tracking-tight text-brand-ink">
                Sacred Match
              </p>
              <p className="mt-1 hidden whitespace-nowrap text-[0.72rem] uppercase tracking-[0.28em] text-brand-forest/68 sm:block">
                Marriage-minded connections in Nigeria
              </p>
            </div>
          </Link>

          {mode === "desktop" ? (
            <nav className="min-w-0 items-center justify-center lg:flex">
              <div className="flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-brand-forest/10 bg-white/70 p-1.5 shadow-[0_14px_34px_rgba(8,28,21,0.06)]">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    className={({ isActive }) =>
                      clsx(
                        desktopLinkClass,
                        isActive &&
                          "bg-brand-forest text-white shadow-[0_10px_24px_rgba(27,67,50,0.2)] hover:bg-brand-forest hover:text-white",
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
          ) : (
            <div className="justify-self-center">
              <span className="hidden rounded-full border border-brand-forest/10 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-forest sm:inline-flex">
                {routeMode === "admin"
                  ? "Admin workspace"
                  : routeMode === "member"
                    ? activeLabel
                    : "Serious connections only"}
              </span>
            </div>
          )}

          <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
            {mode === "desktop" ? (
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
                  className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay px-5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(181,101,73,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-brand-gold hover:shadow-[0_22px_44px_rgba(212,163,115,0.28)]"
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
                {showCompactAction ? (
                  <Link
                    className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-clay px-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(181,101,73,0.24)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-brand-gold"
                    to={primaryAction.href}
                  >
                    {primaryAction.label}
                  </Link>
                ) : null}

                <button
                  aria-label="Toggle navigation"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-brand-forest/15 bg-white/60 text-brand-forest shadow-[0_10px_26px_rgba(8,28,21,0.06)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-white"
                  onClick={toggleMobileMenu}
                  type="button"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && mode !== "desktop" ? (
          <div className="border-t border-brand-forest/10 bg-brand-cream/90">
            <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-2xl border border-transparent bg-white/55 px-4 py-3 text-sm font-semibold text-brand-forest transition-all duration-300 hover:border-brand-forest/10 hover:bg-white",
                      isActive && "border-brand-forest/10 bg-brand-forest text-white hover:bg-brand-forest",
                    )
                  }
                  end={item.end}
                  onClick={closeMobileMenu}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-clay px-4 py-3 text-center text-sm font-semibold text-white"
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
