import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function passwordStrength(password) {
    let score = 0;
    if (password.length >= 8)
        score += 1;
    if (/[A-Z]/.test(password))
        score += 1;
    if (/[a-z]/.test(password))
        score += 1;
    if (/\d/.test(password))
        score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password))
        score += 1;
    if (score <= 2)
        return { label: "Weak", bar: "w-1/3 bg-rose-400" };
    if (score <= 4)
        return { label: "Fair", bar: "w-2/3 bg-amber-400" };
    return { label: "Strong", bar: "w-full bg-emerald-400" };
}
export function VerifyOtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email ?? "demo@sacred-match.ng";
    const [digits, setDigits] = useState(["", "", "", "", "", ""]);
    const [secondsLeft, setSecondsLeft] = useState(600);
    const [resendCooldown, setResendCooldown] = useState(60);
    const [message, setMessage] = useState(null);
    const refs = useRef([]);
    useEffect(() => {
        const timer = window.setInterval(() => {
            setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
            setResendCooldown((current) => (current > 0 ? current - 1 : 0));
        }, 1000);
        return () => window.clearInterval(timer);
    }, []);
    const otpValue = digits.join("");
    const formattedTimer = `${Math.floor(secondsLeft / 60).toString().padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;
    function updateDigit(index, nextValue) {
        const clean = nextValue.replace(/\D/g, "").slice(-1);
        const nextDigits = [...digits];
        nextDigits[index] = clean;
        setDigits(nextDigits);
        if (clean && index < refs.current.length - 1) {
            refs.current[index + 1]?.focus();
        }
    }
    function handleKeyDown(index, key) {
        if (key === "Backspace" && !digits[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    }
    function resendOtp() {
        setResendCooldown(60);
        setMessage("A fresh OTP was sent to your email and phone demo channel.");
    }
    function submitOtp(event) {
        event.preventDefault();
        if (otpValue.length !== 6) {
            setMessage("Enter the complete 6-digit OTP.");
            return;
        }
        setMessage("OTP verified successfully.");
        navigate("/onboarding");
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "Verify OTP", title: "Enter the 6-digit code to continue", description: `We sent a verification code to ${email}. Complete verification to begin profile creation.` }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx(RevealOnScroll, { children: _jsx("div", { className: "mx-auto max-w-3xl surface-card p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-6", onSubmit: submitOtp, children: [_jsx("div", { className: "flex flex-wrap justify-center gap-3 sm:gap-4", children: digits.map((digit, index) => (_jsx("input", { ref: (node) => {
                                            refs.current[index] = node;
                                        }, className: "h-16 w-14 rounded-2xl border border-brand-forest/15 text-center text-2xl font-semibold text-brand-ink outline-none focus:border-brand-moss focus:ring-4 focus:ring-brand-moss/10", inputMode: "numeric", maxLength: 1, onChange: (event) => updateDigit(index, event.target.value), onKeyDown: (event) => handleKeyDown(index, event.key), value: digit }, `otp-${index}`))) }), _jsxs("div", { className: "grid gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest/80 sm:grid-cols-2", children: [_jsxs("p", { children: ["Code expires in ", _jsx("span", { className: "font-semibold text-brand-ink", children: formattedTimer })] }), _jsxs("p", { className: "sm:text-right", children: ["Resend available in ", _jsxs("span", { className: "font-semibold text-brand-ink", children: [resendCooldown, "s"] })] })] }), message ? _jsx("div", { className: "rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest", children: message }) : null, _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [_jsx("button", { className: "rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald", type: "submit", children: "Verify OTP" }), _jsx("button", { className: "rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest/5 disabled:opacity-60", disabled: resendCooldown > 0, onClick: resendOtp, type: "button", children: "Resend code" })] })] }) }) }) })] }));
}
export function ForgotPasswordPage() {
    const [message, setMessage] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: "" }
    });
    function onSubmit(values) {
        setMessage(`A reset link has been sent to ${values.email}.`);
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "Forgot password", title: "Send yourself a secure reset link", description: "Enter the email connected to your account and we will send a password reset link." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "mx-auto max-w-3xl surface-card p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Email address" }), _jsx("input", { className: "input-shell", placeholder: "name@example.com", ...register("email") }), errors.email ? _jsx("span", { className: "text-sm text-rose-600", children: errors.email.message }) : null] }), message ? _jsx("div", { className: "rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest", children: message }) : null, _jsx("button", { className: "rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-70", disabled: isSubmitting, type: "submit", children: "Send reset link" })] }) }) })] }));
}
export function ResetPasswordPage() {
    const [message, setMessage] = useState(null);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(resetSchema),
        defaultValues: { password: "", confirmPassword: "" }
    });
    const passwordValue = watch("password", "");
    const strength = passwordStrength(passwordValue);
    function onSubmit() {
        setMessage("Password updated successfully. You can now sign in.");
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: "Reset password", title: "Choose a stronger password", description: "Use a unique password with uppercase, lowercase, number, and special character requirements." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx("div", { className: "mx-auto max-w-3xl surface-card p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "New password" }), _jsx("input", { className: "input-shell", type: "password", ...register("password") }), _jsx("div", { className: "h-2 rounded-full bg-brand-forest/10", children: _jsx("div", { className: `h-2 rounded-full ${strength.bar}` }) }), _jsxs("span", { className: "text-sm text-brand-forest/70", children: ["Strength: ", strength.label] }), errors.password ? _jsx("span", { className: "text-sm text-rose-600", children: errors.password.message }) : null] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Confirm password" }), _jsx("input", { className: "input-shell", type: "password", ...register("confirmPassword") }), errors.confirmPassword ? _jsx("span", { className: "text-sm text-rose-600", children: errors.confirmPassword.message }) : null] }), message ? _jsx("div", { className: "rounded-[1.5rem] border border-brand-moss/20 bg-brand-moss/10 px-5 py-4 text-sm text-brand-forest", children: message }) : null, _jsx("button", { className: "rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-70", disabled: isSubmitting, type: "submit", children: "Update password" })] }) }) })] }));
}
