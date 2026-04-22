import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { loginUser } from "@/lib/api";
import { forgetRememberedLogin, loadRememberedLogin, rememberLogin, } from "@/lib/profileStorage";
const demoCredentials = {
    email: "demo@sacred-match.ng",
    password: "SacredMatch123!",
};
const adminCredentials = {
    email: "admin@sacred-match.ng",
    password: "Admin@Sacred1!",
};
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_MS = LOCKOUT_MINUTES * 60 * 1000;
const ATTEMPTS_KEY = "sacred-match-login-attempts";
const LOCKOUT_KEY = "sacred-match-login-lockout-until";
const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().default(false),
});
function canUseStorage() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function getAttemptCount() {
    if (!canUseStorage()) {
        return 0;
    }
    return Number(window.localStorage.getItem(ATTEMPTS_KEY) ?? 0);
}
function setAttemptCount(count) {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.setItem(ATTEMPTS_KEY, String(count));
}
function getLockoutUntil() {
    if (!canUseStorage()) {
        return 0;
    }
    return Number(window.localStorage.getItem(LOCKOUT_KEY) ?? 0);
}
function setLockoutUntil(value) {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.setItem(LOCKOUT_KEY, String(value));
}
function clearThrottleState() {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.removeItem(ATTEMPTS_KEY);
    window.localStorage.removeItem(LOCKOUT_KEY);
}
function formatRemaining(seconds) {
    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const remainder = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
}
function isNetworkFailure(error) {
    return error instanceof Error && error.message === "Network Error";
}
function normalizeLoginError(error) {
    if (isNetworkFailure(error)) {
        return "Unable to reach the API. Start the API and database, then try again.";
    }
    return error instanceof Error ? error.message : "Login failed";
}
export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const rememberedEmail = loadRememberedLogin();
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [lockedUntil, setLockedUntilState] = useState(() => getLockoutUntil());
    const [clock, setClock] = useState(() => Date.now());
    const redirectTo = location.state?.from ?? "/dashboard";
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: rememberedEmail,
            password: "",
            rememberMe: Boolean(rememberedEmail),
        },
    });
    const isLocked = lockedUntil > clock;
    const remainingSeconds = isLocked ? Math.max(Math.ceil((lockedUntil - clock) / 1000), 0) : 0;
    useEffect(() => {
        if (!lockedUntil) {
            return;
        }
        if (lockedUntil <= Date.now()) {
            clearThrottleState();
            setLockedUntilState(0);
            return;
        }
        const timer = window.setInterval(() => {
            setClock(Date.now());
        }, 1000);
        return () => window.clearInterval(timer);
    }, [lockedUntil]);
    useEffect(() => {
        if (lockedUntil && clock >= lockedUntil) {
            clearThrottleState();
            setLockedUntilState(0);
            setErrorMessage(null);
        }
    }, [clock, lockedUntil]);
    async function onSubmit(values) {
        setMessage(null);
        setErrorMessage(null);
        if (isLocked) {
            setErrorMessage(`Too many failed attempts. Try again in ${formatRemaining(remainingSeconds)}.`);
            return;
        }
        const isAdminLogin = values.email === adminCredentials.email && values.password === adminCredentials.password;
        const isDemoLogin = values.email === demoCredentials.email && values.password === demoCredentials.password;
        function applyOfflineLogin(asAdmin) {
            clearThrottleState();
            setLockedUntilState(0);
            if (values.rememberMe) {
                rememberLogin(values.email);
            }
            else {
                forgetRememberedLogin();
            }
            window.localStorage.setItem("sacred-match-token", asAdmin ? "admin-development-token" : "local-development-token");
            if (asAdmin) {
                window.localStorage.setItem("sacred-match-role", "admin");
            }
            else {
                window.localStorage.removeItem("sacred-match-role");
            }
            navigate(asAdmin ? "/admin" : redirectTo);
        }
        try {
            const response = await loginUser({ email: values.email, password: values.password });
            clearThrottleState();
            setLockedUntilState(0);
            if (values.rememberMe) {
                rememberLogin(values.email);
            }
            else {
                forgetRememberedLogin();
            }
            window.localStorage.setItem("sacred-match-token", response.token || (isAdminLogin ? "admin-development-token" : "local-development-token"));
            // Use role from server response; fall back to credential-based check for offline mode
            const serverRole = response.role ?? (isAdminLogin ? "ADMIN" : null);
            const isAdmin = serverRole === "ADMIN" || serverRole === "admin" || isAdminLogin;
            if (isAdmin) {
                window.localStorage.setItem("sacred-match-role", "admin");
            }
            else {
                window.localStorage.removeItem("sacred-match-role");
            }
            setMessage(response.message);
            navigate(isAdmin ? "/admin" : redirectTo);
        }
        catch (error) {
            const normalizedError = normalizeLoginError(error);
            if (isNetworkFailure(error)) {
                // API unreachable (Vercel/no backend) — allow offline login for demo & admin accounts
                if (isAdminLogin || isDemoLogin) {
                    applyOfflineLogin(isAdminLogin);
                    return;
                }
                setErrorMessage(normalizedError);
                return;
            }
            const nextAttempts = getAttemptCount() + 1;
            if (nextAttempts >= MAX_ATTEMPTS) {
                const nextLockout = Date.now() + LOCKOUT_MS;
                setLockoutUntil(nextLockout);
                setLockedUntilState(nextLockout);
                setAttemptCount(0);
                setErrorMessage(`Too many failed attempts. Login is locked for ${LOCKOUT_MINUTES} minutes.`);
                return;
            }
            setAttemptCount(nextAttempts);
            const attemptsRemaining = MAX_ATTEMPTS - nextAttempts;
            setErrorMessage(`${normalizedError}. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining before a ${LOCKOUT_MINUTES}-minute lockout.`);
        }
    }
    function fillDemoCredentials() {
        setValue("email", demoCredentials.email, { shouldDirty: true, shouldTouch: true });
        setValue("password", demoCredentials.password, { shouldDirty: true, shouldTouch: true });
        setValue("rememberMe", true, { shouldDirty: true, shouldTouch: true });
    }
    function fillAdminCredentials() {
        setValue("email", adminCredentials.email, { shouldDirty: true, shouldTouch: true });
        setValue("password", adminCredentials.password, { shouldDirty: true, shouldTouch: true });
        setValue("rememberMe", false, { shouldDirty: true, shouldTouch: true });
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(RevealOnScroll, { children: _jsx(SectionHeading, { eyebrow: "Log in", title: "Return to your dashboard, matches, and conversations", description: "Sign in with email and password, keep your login remembered if you want, and stay inside the platform's protected connection flow." }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "mx-auto max-w-5xl overflow-hidden rounded-[2.2rem] border border-white/80 bg-white shadow-halo", children: _jsxs("div", { className: "grid gap-0 lg:grid-cols-[1fr_0.92fr]", children: [_jsx(RevealOnScroll, { className: "p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Email address" }), _jsx("input", { autoComplete: "email", className: "input-shell bg-white/90", placeholder: "name@example.com", ...register("email") }), errors.email ? (_jsx("span", { className: "text-sm text-rose-600", children: errors.email.message })) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Password" }), _jsx("input", { autoComplete: "current-password", className: "input-shell bg-white/90", type: "password", placeholder: "Your password", ...register("password") }), errors.password ? (_jsx("span", { className: "text-sm text-rose-600", children: errors.password.message })) : null] }), _jsxs("div", { className: "flex flex-col gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("label", { className: "inline-flex items-center gap-3 text-sm font-medium text-brand-forest", children: [_jsx("input", { type: "checkbox", ...register("rememberMe") }), "Remember me on this device"] }), _jsx(Link, { className: "text-sm font-semibold text-brand-clay", to: "/forgot-password", children: "Forgot password?" })] }), isLocked ? (_jsxs("div", { className: "rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900", children: ["Login is temporarily locked. Try again in ", formatRemaining(remainingSeconds), "."] })) : null, message ? (_jsx("div", { className: "rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900", children: message })) : null, errorMessage ? (_jsx("div", { className: "rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900", children: errorMessage })) : null, _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [_jsx("button", { className: "rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:cursor-not-allowed disabled:opacity-70", disabled: isSubmitting || isLocked, type: "submit", children: isSubmitting ? "Signing in..." : "Log in" }), _jsx("button", { className: "rounded-full border border-brand-forest/15 bg-white px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-cream", onClick: fillDemoCredentials, type: "button", children: "Use demo credentials" }), _jsx("button", { className: "rounded-full border border-brand-clay/30 bg-brand-clay/10 px-6 py-3 text-sm font-semibold text-brand-clay transition hover:bg-brand-clay/15", onClick: fillAdminCredentials, type: "button", children: "Use admin credentials" })] })] }) }), _jsxs(RevealOnScroll, { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", delay: 120, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "Test credentials" }), _jsx("h2", { className: "mt-4 font-display text-3xl font-semibold text-white", children: "Seeded accounts for a quick walkthrough" }), _jsxs("div", { className: "mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold", children: "Member account" }), _jsx("p", { className: "mt-3 text-sm text-brand-cream/60", children: "Email" }), _jsx("p", { className: "font-semibold text-white", children: demoCredentials.email }), _jsx("p", { className: "mt-3 text-sm text-brand-cream/60", children: "Password" }), _jsx("p", { className: "font-semibold text-white", children: demoCredentials.password })] }), _jsxs("div", { className: "mt-4 rounded-[1.5rem] border border-brand-clay/25 bg-brand-clay/10 p-5", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay", children: "Admin account" }), _jsx("p", { className: "mt-3 text-sm text-brand-cream/60", children: "Email" }), _jsx("p", { className: "font-semibold text-white", children: adminCredentials.email }), _jsx("p", { className: "mt-3 text-sm text-brand-cream/60", children: "Password" }), _jsx("p", { className: "font-semibold text-white", children: adminCredentials.password })] }), _jsxs("div", { className: "mt-5 grid gap-3 text-sm leading-7 text-brand-cream/65", children: [_jsx("p", { children: "Five failed attempts trigger a 15-minute lockout." }), _jsxs("p", { children: ["Admin login redirects directly to ", _jsx("code", { className: "rounded bg-white/10 px-2 py-0.5", children: "/admin" }), "."] })] })] })] }) }) })] }));
}
