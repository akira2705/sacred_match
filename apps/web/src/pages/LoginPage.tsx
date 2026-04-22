import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { loginUser, loginWithGoogle } from "@/lib/api";
import {
  forgetRememberedLogin,
  loadRememberedLogin,
  rememberLogin,
} from "@/lib/profileStorage";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_MS = LOCKOUT_MINUTES * 60 * 1000;
const ATTEMPTS_KEY = "spousia-login-attempts";
const LOCKOUT_KEY = "spousia-login-lockout-until";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginValues = z.infer<typeof loginSchema>;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getAttemptCount() {
  if (!canUseStorage()) return 0;
  return Number(window.localStorage.getItem(ATTEMPTS_KEY) ?? 0);
}

function setAttemptCount(count: number) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ATTEMPTS_KEY, String(count));
}

function getLockoutUntil() {
  if (!canUseStorage()) return 0;
  return Number(window.localStorage.getItem(LOCKOUT_KEY) ?? 0);
}

function setLockoutUntil(value: number) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(LOCKOUT_KEY, String(value));
}

function clearThrottleState() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ATTEMPTS_KEY);
  window.localStorage.removeItem(LOCKOUT_KEY);
}

function formatRemaining(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const rememberedEmail = loadRememberedLogin();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [lockedUntil, setLockedUntilState] = useState<number>(() => getLockoutUntil());
  const [clock, setClock] = useState(() => Date.now());
  const redirectTo =
    ((location.state as { from?: string } | null)?.from as string | undefined) ?? "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
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
    if (!lockedUntil) return;

    if (lockedUntil <= Date.now()) {
      clearThrottleState();
      setLockedUntilState(0);
      return;
    }

    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [lockedUntil]);

  useEffect(() => {
    if (lockedUntil && clock >= lockedUntil) {
      clearThrottleState();
      setLockedUntilState(0);
      setErrorMessage(null);
    }
  }, [clock, lockedUntil]);

  function applyLogin(token: string, role: string | null, email: string, remember: boolean) {
    clearThrottleState();
    setLockedUntilState(0);
    if (remember) {
      rememberLogin(email);
    } else {
      forgetRememberedLogin();
    }
    window.localStorage.setItem("spousia-token", token);
    const isAdmin = role === "ADMIN" || role === "admin";
    if (isAdmin) {
      window.localStorage.setItem("spousia-role", "admin");
    } else {
      window.localStorage.removeItem("spousia-role");
    }
    navigate(isAdmin ? "/admin" : redirectTo);
  }

  async function onSubmit(values: LoginValues) {
    setMessage(null);
    setErrorMessage(null);

    if (isLocked) {
      setErrorMessage(`Too many failed attempts. Try again in ${formatRemaining(remainingSeconds)}.`);
      return;
    }

    try {
      const response = await loginUser({ email: values.email, password: values.password });
      setMessage(response.message);
      applyLogin(response.token, response.role, values.email, values.rememberMe);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
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
      setErrorMessage(
        `${message}. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining before a ${LOCKOUT_MINUTES}-minute lockout.`,
      );
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setErrorMessage(null);
    try {
      const response = await loginWithGoogle();
      applyLogin(response.token, response.role, response.email ?? "", true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Log in"
            title="Return to your dashboard, matches, and conversations"
            description="Sign in with your email and password, or continue with Google."
          />
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-xl overflow-hidden rounded-[2.2rem] border border-white/80 bg-white shadow-halo">
          <RevealOnScroll className="p-8 sm:p-10">
            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">Email address</span>
                <input
                  autoComplete="email"
                  className="input-shell bg-white/90"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email ? (
                  <span className="text-sm text-rose-600">{errors.email.message}</span>
                ) : null}
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">Password</span>
                <input
                  autoComplete="current-password"
                  className="input-shell bg-white/90"
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                />
                {errors.password ? (
                  <span className="text-sm text-rose-600">{errors.password.message}</span>
                ) : null}
              </label>

              <div className="flex flex-col gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 text-sm font-medium text-brand-forest">
                  <input type="checkbox" {...register("rememberMe")} />
                  Remember me on this device
                </label>
                <Link className="text-sm font-semibold text-brand-clay" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {isLocked ? (
                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                  Login is temporarily locked. Try again in {formatRemaining(remainingSeconds)}.
                </div>
              ) : null}
              {message ? (
                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                  {message}
                </div>
              ) : null}
              {errorMessage ? (
                <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900">
                  {errorMessage}
                </div>
              ) : null}

              <button
                className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting || isLocked}
                type="submit"
              >
                {isSubmitting ? "Signing in..." : "Log in"}
              </button>

              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-brand-forest/10" />
                <span className="text-xs text-brand-forest/50">or</span>
                <div className="h-px flex-1 bg-brand-forest/10" />
              </div>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-full border border-brand-forest/15 bg-white px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-70"
                disabled={googleLoading || isLocked}
                onClick={handleGoogleSignIn}
                type="button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {googleLoading ? "Signing in..." : "Continue with Google"}
              </button>

              <p className="text-center text-sm text-brand-forest/60">
                Don&apos;t have an account?{" "}
                <Link className="font-semibold text-brand-clay" to="/signup">
                  Create one
                </Link>
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
