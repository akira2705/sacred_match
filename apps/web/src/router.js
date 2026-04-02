import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Navigate, Outlet, ScrollRestoration, createBrowserRouter, useLocation, } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { AboutPage } from "@/pages/AboutPage";
import { AdminAnalyticsPage, AdminContentPage, AdminDashboardPage, AdminReportsPage, AdminUsersPage, } from "@/pages/AdminPages";
import { ContactPage } from "@/pages/ContactPage";
import { BlogArticlePage, BlogPage, FaqPage, LegalPage } from "@/pages/ContentPages";
import { ConnectionsPage, DashboardPage, MatchProfilePage, MatchesPage, } from "@/pages/DiscoveryPages";
import { VerifyOtpPage, ForgotPasswordPage, ResetPasswordPage } from "@/pages/AuthFlowPages";
import { GenotypePage } from "@/pages/GenotypePage";
import { HomePage } from "@/pages/HomePage";
import { HowItWorksPage } from "@/pages/HowItWorksPage";
import { LoginPage } from "@/pages/LoginPage";
import { HelpPage, MessagesPage, ProfilePage, SafetyPage, SettingsPage } from "@/pages/MemberPages";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { SignupPage } from "@/pages/SignupPage";
import { DocumentVaultPage, IntentWallPage, LivenessCheckPage, ReviewPage, } from "@/pages/VerificationPages";
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
    return (_jsxs("div", { className: "min-h-screen bg-brand-cream text-brand-ink", children: [_jsx(RouteEffects, {}), _jsx(ScrollRestoration, {}), _jsx(NavBar, {}), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
}
function RequireAuth({ children }) {
    const location = useLocation();
    const hasToken = typeof window !== "undefined" && Boolean(window.localStorage.getItem("sacred-match-token"));
    if (!hasToken) {
        return _jsx(Navigate, { replace: true, state: { from: location.pathname }, to: "/login" });
    }
    return children;
}
const privacySections = [
    { heading: "What we collect", body: ["We collect the account, profile, verification, and messaging data needed to run a serious marriage-focused matching product.", "Sensitive fields like genotype and ID data are handled with privacy controls and limited operational access."] },
    { heading: "How we use it", body: ["Data is used for matching, verification, safety review, fraud prevention, and user-controlled product features.", "We do not frame the product around offline ceremony or wedding logistics."] }
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
        element: _jsx(RootLayout, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}) },
            { path: "about", element: _jsx(AboutPage, {}) },
            { path: "how-it-works", element: _jsx(HowItWorksPage, {}) },
            { path: "genotype", element: _jsx(GenotypePage, {}) },
            { path: "genotype-guide", element: _jsx(GenotypePage, {}) },
            { path: "blog", element: _jsx(BlogPage, {}) },
            { path: "blog/:slug", element: _jsx(BlogArticlePage, {}) },
            { path: "faq", element: _jsx(FaqPage, {}) },
            { path: "contact", element: _jsx(ContactPage, {}) },
            { path: "privacy", element: _jsx(LegalPage, { eyebrow: "Privacy policy", title: "How Sacred Match handles personal data", description: "A clear overview of what data the platform collects and how that data supports trust, matching, and safety.", sections: privacySections }) },
            { path: "terms", element: _jsx(LegalPage, { eyebrow: "Terms of service", title: "Rules for using the platform responsibly", description: "These terms focus on serious relationship use, safety, trust, and respectful conduct.", sections: termsSections }) },
            { path: "data-protection", element: _jsx(LegalPage, { eyebrow: "Data protection", title: "Data handling principles for a trust-sensitive product", description: "A summary of the privacy and operational standards expected from the platform.", sections: dataProtectionSections }) },
            { path: "cookies", element: _jsx(LegalPage, { eyebrow: "Cookie policy", title: "How session and preference storage works", description: "A simple explanation of how storage supports authentication and experience continuity.", sections: cookieSections }) },
            { path: "signup", element: _jsx(SignupPage, {}) },
            { path: "login", element: _jsx(LoginPage, {}) },
            { path: "verify-otp", element: _jsx(VerifyOtpPage, {}) },
            { path: "forgot-password", element: _jsx(ForgotPasswordPage, {}) },
            { path: "reset-password", element: _jsx(ResetPasswordPage, {}) },
            { path: "onboarding", element: _jsx(OnboardingPage, {}) },
            { path: "onboarding/intent", element: _jsx(IntentWallPage, {}) },
            { path: "onboarding/documents", element: _jsx(DocumentVaultPage, {}) },
            { path: "onboarding/liveness", element: _jsx(LivenessCheckPage, {}) },
            { path: "onboarding/review", element: _jsx(ReviewPage, {}) },
            { path: "dashboard", element: _jsx(RequireAuth, { children: _jsx(DashboardPage, {}) }) },
            { path: "matches", element: _jsx(RequireAuth, { children: _jsx(MatchesPage, {}) }) },
            { path: "matches/:id", element: _jsx(RequireAuth, { children: _jsx(MatchProfilePage, {}) }) },
            { path: "connections", element: _jsx(RequireAuth, { children: _jsx(ConnectionsPage, {}) }) },
            { path: "messages", element: _jsx(RequireAuth, { children: _jsx(MessagesPage, {}) }) },
            { path: "messages/:conversationId", element: _jsx(RequireAuth, { children: _jsx(MessagesPage, {}) }) },
            { path: "profile", element: _jsx(RequireAuth, { children: _jsx(ProfilePage, {}) }) },
            { path: "profile/edit", element: _jsx(RequireAuth, { children: _jsx(OnboardingPage, { mode: "edit" }) }) },
            { path: "settings", element: _jsx(RequireAuth, { children: _jsx(SettingsPage, {}) }) },
            { path: "safety", element: _jsx(RequireAuth, { children: _jsx(SafetyPage, {}) }) },
            { path: "help", element: _jsx(RequireAuth, { children: _jsx(HelpPage, {}) }) },
            { path: "admin", element: _jsx(RequireAuth, { children: _jsx(AdminDashboardPage, {}) }) },
            { path: "admin/reports", element: _jsx(RequireAuth, { children: _jsx(AdminReportsPage, {}) }) },
            { path: "admin/users", element: _jsx(RequireAuth, { children: _jsx(AdminUsersPage, {}) }) },
            { path: "admin/content", element: _jsx(RequireAuth, { children: _jsx(AdminContentPage, {}) }) },
            { path: "admin/analytics", element: _jsx(RequireAuth, { children: _jsx(AdminAnalyticsPage, {}) }) },
        ],
    },
    {
        path: "*",
        element: _jsx(NotFoundPage, {}),
    },
]);
