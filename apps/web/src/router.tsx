import { useEffect, type ReactElement } from "react";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { AboutPage } from "@/pages/AboutPage";
import {
  AdminAnalyticsPage,
  AdminContentPage,
  AdminDashboardPage,
  AdminReportsPage,
  AdminUsersPage,
} from "@/pages/AdminPages";
import { ContactPage } from "@/pages/ContactPage";
import { BlogArticlePage, BlogPage, FaqPage, LegalPage } from "@/pages/ContentPages";
import {
  ConnectionsPage,
  DashboardPage,
  MatchProfilePage,
  MatchesPage,
} from "@/pages/DiscoveryPages";
import { VerifyOtpPage, ForgotPasswordPage, ResetPasswordPage } from "@/pages/AuthFlowPages";
import { GenotypePage } from "@/pages/GenotypePage";
import { HomePage } from "@/pages/HomePage";
import { HowItWorksPage } from "@/pages/HowItWorksPage";
import { LoginPage } from "@/pages/LoginPage";
import { HelpPage, MessagesPage, ProfilePage, SafetyPage, SettingsPage } from "@/pages/MemberPages";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { SignupPage } from "@/pages/SignupPage";
import {
  DocumentVaultPage,
  IntentWallPage,
  LivenessCheckPage,
  ReviewPage,
} from "@/pages/VerificationPages";

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function RootLayout() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink">
      <RouteEffects />
      <ScrollRestoration />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RequireAuth({ children }: { children: ReactElement }) {
  const location = useLocation();
  const hasToken = typeof window !== "undefined" && Boolean(window.localStorage.getItem("sacred-match-token"));

  if (!hasToken) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  return children;
}

const privacySections = [
  { heading: "What we collect", body: ["We collect the account, profile, verification, and messaging data needed to run a serious marriage-focused matching product.", "Sensitive fields like genotype and ID data are handled with privacy controls and limited operational access."] },
  { heading: "How we use it", body: ["Data is used for matching, verification, safety review, fraud prevention, and user-controlled product features.", "We do not frame the product around offline ceremony or wedding logistics." ] }
];

const termsSections = [
  { heading: "Platform use", body: ["Sacred Match is intended for serious, marriage-minded relationship discovery.", "Harassment, scams, impersonation, and abuse of verification systems are prohibited."] },
  { heading: "Safety enforcement", body: ["We may review reports, apply warnings, suspend accounts, or remove access when safety policies are violated.", "Users are expected to keep early high-risk interactions on-platform where safety tools exist."] }
];

const dataProtectionSections = [
  { heading: "NDPR-aware handling", body: ["The product is structured with privacy, visibility controls, moderation auditability, and user data export/delete controls in mind.", "Sensitive profile attributes should always have clear purpose, storage boundaries, and user-facing controls."] }
];

const cookieSections = [
  { heading: "Cookies and storage", body: ["Cookies and local storage may be used for session continuity, remembering preferences, and protecting account flows.", "Users should be able to review legal terms and understand what storage powers the signed-in experience."] }
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "how-it-works", element: <HowItWorksPage /> },
      { path: "genotype", element: <GenotypePage /> },
      { path: "genotype-guide", element: <GenotypePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogArticlePage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <LegalPage eyebrow="Privacy policy" title="How Sacred Match handles personal data" description="A clear overview of what data the platform collects and how that data supports trust, matching, and safety." sections={privacySections} /> },
      { path: "terms", element: <LegalPage eyebrow="Terms of service" title="Rules for using the platform responsibly" description="These terms focus on serious relationship use, safety, trust, and respectful conduct." sections={termsSections} /> },
      { path: "data-protection", element: <LegalPage eyebrow="Data protection" title="Data handling principles for a trust-sensitive product" description="A summary of the privacy and operational standards expected from the platform." sections={dataProtectionSections} /> },
      { path: "cookies", element: <LegalPage eyebrow="Cookie policy" title="How session and preference storage works" description="A simple explanation of how storage supports authentication and experience continuity." sections={cookieSections} /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "onboarding", element: <OnboardingPage /> },
      { path: "onboarding/intent", element: <IntentWallPage /> },
      { path: "onboarding/documents", element: <DocumentVaultPage /> },
      { path: "onboarding/liveness", element: <LivenessCheckPage /> },
      { path: "onboarding/review", element: <ReviewPage /> },
      { path: "dashboard", element: <RequireAuth><DashboardPage /></RequireAuth> },
      { path: "matches", element: <RequireAuth><MatchesPage /></RequireAuth> },
      { path: "matches/:id", element: <RequireAuth><MatchProfilePage /></RequireAuth> },
      { path: "connections", element: <RequireAuth><ConnectionsPage /></RequireAuth> },
      { path: "messages", element: <RequireAuth><MessagesPage /></RequireAuth> },
      { path: "messages/:conversationId", element: <RequireAuth><MessagesPage /></RequireAuth> },
      { path: "profile", element: <RequireAuth><ProfilePage /></RequireAuth> },
      { path: "profile/edit", element: <RequireAuth><OnboardingPage mode="edit" /></RequireAuth> },
      { path: "settings", element: <RequireAuth><SettingsPage /></RequireAuth> },
      { path: "safety", element: <RequireAuth><SafetyPage /></RequireAuth> },
      { path: "help", element: <RequireAuth><HelpPage /></RequireAuth> },
      { path: "admin", element: <RequireAuth><AdminDashboardPage /></RequireAuth> },
      { path: "admin/reports", element: <RequireAuth><AdminReportsPage /></RequireAuth> },
      { path: "admin/users", element: <RequireAuth><AdminUsersPage /></RequireAuth> },
      { path: "admin/content", element: <RequireAuth><AdminContentPage /></RequireAuth> },
      { path: "admin/analytics", element: <RequireAuth><AdminAnalyticsPage /></RequireAuth> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

