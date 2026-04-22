import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { submitRegistrationIntent } from "@/lib/api";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .regex(/^[A-Za-z -]+$/, "First name can only contain letters, spaces, and hyphens"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .regex(/^[A-Za-z -]+$/, "Last name can only contain letters, spaces, and hyphens"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, "Phone number is required")
      .transform((value) => value.replace(/\s+/g, ""))
      .refine((value) => /^(\+234|0)[789][01]\d{8}$/.test(value), "Phone must use a valid Nigerian format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Add at least one uppercase letter")
      .regex(/[a-z]/, "Add at least one lowercase letter")
      .regex(/\d/, "Add at least one number")
      .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Add at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    captchaConfirmed: z.boolean().refine((value) => value, "Confirm you are not a bot"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) score += 1;

  if (score <= 2) {
    return { label: "Weak", bar: "w-1/3 bg-rose-400" };
  }

  if (score <= 4) {
    return { label: "Fair", bar: "w-2/3 bg-amber-400" };
  }

  return { label: "Strong", bar: "w-full bg-emerald-400" };
}

export function SignupPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      captchaConfirmed: false,
    },
  });

  const passwordStrength = getPasswordStrength(watch("password", ""));

  async function onSubmit(values: SignupValues) {
    setMessage(null);
    setErrorMessage(null);

    const { captchaConfirmed: _captchaConfirmed, ...payload } = values;

    try {
      const response = await submitRegistrationIntent(payload);
      setMessage(response.message || "Account created. Continue with OTP verification.");
      navigate("/verify-otp", { state: { email: values.email } });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Signup failed");
    }
  }

  const inputClassName = "input-shell bg-white/90";

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Sign up"
            title="Create your account and move straight into verification"
            description="This entry flow follows the product's trust model: strong password rules, identity-aware fields, and an OTP checkpoint before onboarding begins."
          />
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <RevealOnScroll className="p-8 sm:p-10">
              <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-brand-forest">First name</span>
                    <input className={inputClassName} placeholder="Your first name" {...register("firstName")} />
                    {errors.firstName ? <span className="text-sm text-rose-600">{errors.firstName.message}</span> : null}
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-brand-forest">Last name</span>
                    <input className={inputClassName} placeholder="Your last name" {...register("lastName")} />
                    {errors.lastName ? <span className="text-sm text-rose-600">{errors.lastName.message}</span> : null}
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Email address</span>
                  <input className={inputClassName} placeholder="name@example.com" {...register("email")} />
                  {errors.email ? <span className="text-sm text-rose-600">{errors.email.message}</span> : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Phone number</span>
                  <input className={inputClassName} placeholder="+234 901 2345 678" {...register("phone")} />
                  {errors.phone ? <span className="text-sm text-rose-600">{errors.phone.message}</span> : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Password</span>
                  <div className="relative">
                    <input
                      className={`${inputClassName} pr-12`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 inline-flex items-center text-brand-forest/55 hover:text-brand-ink"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="h-2 rounded-full bg-brand-forest/10">
                    <div className={`h-2 rounded-full ${passwordStrength.bar}`} />
                  </div>
                  <span className="text-sm text-brand-forest/70">Strength: {passwordStrength.label}</span>
                  {errors.password ? <span className="text-sm text-rose-600">{errors.password.message}</span> : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Confirm password</span>
                  <div className="relative">
                    <input
                      className={`${inputClassName} pr-12`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 inline-flex items-center text-brand-forest/55 hover:text-brand-ink"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword ? <span className="text-sm text-rose-600">{errors.confirmPassword.message}</span> : null}
                </label>

                <label className="inline-flex items-center gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest">
                  <input type="checkbox" {...register("captchaConfirmed")} />
                  I am not a bot and I am creating this account for serious relationship use.
                </label>
                {errors.captchaConfirmed ? (
                  <span className="text-sm text-rose-600">{errors.captchaConfirmed.message}</span>
                ) : null}

                {message ? <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">{message}</div> : null}
                {errorMessage ? <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900">{errorMessage}</div> : null}

                <button
                  className="rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </form>
            </RevealOnScroll>

            <RevealOnScroll className="bg-brand-ink p-8 text-brand-cream sm:p-10" delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">What happens next</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-white">
                Sign up, verify OTP, complete profile, then start browsing.
              </h2>
              <div className="mt-6 grid gap-4 text-sm leading-7 text-brand-cream/80">
                <p>Your email and phone become the basis for recovery, safety, and verification flows.</p>
                <p>The OTP step sits between account creation and onboarding to keep the trust model intact.</p>
                <p>Once verified, the product moves you into the 7-step profile wizard before discovery begins.</p>
              </div>
              <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">Already have an account?</p>
                <Link className="mt-3 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-cream" to="/login">
                  Log in instead
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
