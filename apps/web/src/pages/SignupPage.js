import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8)
        score += 1;
    if (/[A-Z]/.test(password))
        score += 1;
    if (/[a-z]/.test(password))
        score += 1;
    if (/\d/.test(password))
        score += 1;
    if (/[!@#$%^&*(),.?\":{}|<>]/.test(password))
        score += 1;
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
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm({
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
    async function onSubmit(values) {
        setMessage(null);
        setErrorMessage(null);
        const { captchaConfirmed: _captchaConfirmed, ...payload } = values;
        try {
            const response = await submitRegistrationIntent(payload);
            setMessage(response.message || "Account created. Continue with OTP verification.");
            navigate("/verify-otp", { state: { email: values.email } });
        }
        catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Signup failed");
        }
    }
    const inputClassName = "input-shell bg-white/90";
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(RevealOnScroll, { children: _jsx(SectionHeading, { eyebrow: "Sign up", title: "Create your account and move straight into verification", description: "This entry flow follows the product's trust model: strong password rules, identity-aware fields, and an OTP checkpoint before onboarding begins." }) }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "surface-card overflow-hidden", children: _jsxs("div", { className: "grid gap-0 lg:grid-cols-[1.1fr_0.9fr]", children: [_jsx(RevealOnScroll, { className: "p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "First name" }), _jsx("input", { className: inputClassName, placeholder: "Your first name", ...register("firstName") }), errors.firstName ? _jsx("span", { className: "text-sm text-rose-600", children: errors.firstName.message }) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Last name" }), _jsx("input", { className: inputClassName, placeholder: "Your last name", ...register("lastName") }), errors.lastName ? _jsx("span", { className: "text-sm text-rose-600", children: errors.lastName.message }) : null] })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Email address" }), _jsx("input", { className: inputClassName, placeholder: "name@example.com", ...register("email") }), errors.email ? _jsx("span", { className: "text-sm text-rose-600", children: errors.email.message }) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Phone number" }), _jsx("input", { className: inputClassName, placeholder: "+234 901 2345 678", ...register("phone") }), errors.phone ? _jsx("span", { className: "text-sm text-rose-600", children: errors.phone.message }) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { className: `${inputClassName} pr-12`, type: showPassword ? "text" : "password", placeholder: "Create a strong password", ...register("password") }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-3 inline-flex items-center text-brand-forest/55 hover:text-brand-ink", onClick: () => setShowPassword((current) => !current), children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), _jsx("div", { className: "h-2 rounded-full bg-brand-forest/10", children: _jsx("div", { className: `h-2 rounded-full ${passwordStrength.bar}` }) }), _jsxs("span", { className: "text-sm text-brand-forest/70", children: ["Strength: ", passwordStrength.label] }), errors.password ? _jsx("span", { className: "text-sm text-rose-600", children: errors.password.message }) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Confirm password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { className: `${inputClassName} pr-12`, type: showConfirmPassword ? "text" : "password", placeholder: "Confirm your password", ...register("confirmPassword") }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-3 inline-flex items-center text-brand-forest/55 hover:text-brand-ink", onClick: () => setShowConfirmPassword((current) => !current), children: showConfirmPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), errors.confirmPassword ? _jsx("span", { className: "text-sm text-rose-600", children: errors.confirmPassword.message }) : null] }), _jsxs("label", { className: "inline-flex items-center gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest", children: [_jsx("input", { type: "checkbox", ...register("captchaConfirmed") }), "I am not a bot and I am creating this account for serious relationship use."] }), errors.captchaConfirmed ? (_jsx("span", { className: "text-sm text-rose-600", children: errors.captchaConfirmed.message })) : null, message ? _jsx("div", { className: "rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900", children: message }) : null, errorMessage ? _jsx("div", { className: "rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900", children: errorMessage }) : null, _jsx("button", { className: "rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-70", disabled: isSubmitting, type: "submit", children: isSubmitting ? "Creating account..." : "Create account" })] }) }), _jsxs(RevealOnScroll, { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", delay: 120, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "What happens next" }), _jsx("h2", { className: "mt-4 font-display text-4xl font-semibold text-white", children: "Sign up, verify OTP, complete profile, then start browsing." }), _jsxs("div", { className: "mt-6 grid gap-4 text-sm leading-7 text-brand-cream/80", children: [_jsx("p", { children: "Your email and phone become the basis for recovery, safety, and verification flows." }), _jsx("p", { children: "The OTP step sits between account creation and onboarding to keep the trust model intact." }), _jsx("p", { children: "Once verified, the product moves you into the 7-step profile wizard before discovery begins." })] }), _jsxs("div", { className: "mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-brand-gold", children: "Already have an account?" }), _jsx(Link, { className: "mt-3 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-cream", to: "/login", children: "Log in instead" })] })] })] }) }) })] }));
}
