import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email address")
});

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Add an uppercase letter").regex(/[a-z]/, "Add a lowercase letter").regex(/\d/, "Add a number").regex(/[!@#$%^&*(),.?":{}|<>]/, "Add a special character"),
    confirmPassword: z.string().min(1, "Confirm your password")
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

function passwordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 2) return { label: "Weak", bar: "w-1/3 bg-rose-400" };
  if (score <= 4) return { label: "Fair", bar: "w-2/3 bg-amber-400" };
  return { label: "Strong", bar: "w-full bg-emerald-400" };
}

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? "demo@spousia.ng";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [message, setMessage] = useState<string | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
      setResendCooldown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const otpValue = digits.join("");
  const formattedTimer = `${Math.floor(secondsLeft / 60).toString().padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  function updateDigit(index: number, nextValue: string) {
    const clean = nextValue.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = clean;
    setDigits(nextDigits);

    if (clean && index < refs.current.length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  function resendOtp() {
    setResendCooldown(60);
    setMessage("A fresh OTP was sent to your email and phone demo channel.");
  }

  function submitOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (otpValue.length !== 6) {
      setMessage("Enter the complete 6-digit OTP.");
      return;
    }

    setMessage("OTP verified successfully.");
    navigate("/onboarding");
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Verify OTP"
          title="Enter the 6-digit code to continue"
          description={`We sent a verification code to ${email}. Complete verification to begin profile creation.`}
        />
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl surface-card p-8 sm:p-10">
            <form className="grid gap-6" onSubmit={submitOtp}>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {digits.map((digit, index) => (
                  <input
                    key={`otp-${index}`}
                    ref={(node) => {
                      refs.current[index] = node;
                    }}
                    className="h-16 w-14 rounded-2xl border border-brand-forest/15 text-center text-2xl font-semibold text-brand-ink outline-none focus:border-brand-moss focus:ring-4 focus:ring-brand-moss/10"
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event.key)}
                    value={digit}
                  />
                ))}
              </div>

              <div className="grid gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest/80 sm:grid-cols-2">
                <p>Code expires in <span className="font-semibold text-brand-ink">{formattedTimer}</span></p>
                <p className="sm:text-right">Resend available in <span className="font-semibold text-brand-ink">{resendCooldown}s</span></p>
              </div>

              {message ? <div className="rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest">{message}</div> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" type="submit">
                  Verify OTP
                </button>
                <button className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest/5 disabled:opacity-60" disabled={resendCooldown > 0} onClick={resendOtp} type="button">
                  Resend code
                </button>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" }
  });

  function onSubmit(values: z.infer<typeof forgotSchema>) {
    setMessage(`A reset link has been sent to ${values.email}.`);
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Forgot password"
          title="Send yourself a secure reset link"
          description="Enter the email connected to your account and we will send a password reset link."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="mx-auto max-w-3xl surface-card p-8 sm:p-10">
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Email address</span>
              <input className="input-shell" placeholder="name@example.com" {...register("email")} />
              {errors.email ? <span className="text-sm text-rose-600">{errors.email.message}</span> : null}
            </label>
            {message ? <div className="rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest">{message}</div> : null}
            <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-70" disabled={isSubmitting} type="submit">
              Send reset link
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export function ResetPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const passwordValue = watch("password", "");
  const strength = passwordStrength(passwordValue);

  function onSubmit() {
    setMessage("Password updated successfully. You can now sign in.");
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Reset password"
          title="Choose a stronger password"
          description="Use a unique password with uppercase, lowercase, number, and special character requirements."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="mx-auto max-w-3xl surface-card p-8 sm:p-10">
          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">New password</span>
              <input className="input-shell" type="password" {...register("password")} />
              <div className="h-2 rounded-full bg-brand-forest/10"><div className={`h-2 rounded-full ${strength.bar}`} /></div>
              <span className="text-sm text-brand-forest/70">Strength: {strength.label}</span>
              {errors.password ? <span className="text-sm text-rose-600">{errors.password.message}</span> : null}
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Confirm password</span>
              <input className="input-shell" type="password" {...register("confirmPassword")} />
              {errors.confirmPassword ? <span className="text-sm text-rose-600">{errors.confirmPassword.message}</span> : null}
            </label>
            {message ? <div className="rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest">{message}</div> : null}
            <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-70" disabled={isSubmitting} type="submit">
              Update password
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}


