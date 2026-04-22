import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];
const countries = [
    "Nigeria",
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "Italy",
    "France",
    "Netherlands",
    "South Africa",
    "Ghana",
    "Other"
];
const intakeSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .regex(/^[A-Za-z -]+$/, "Letters only"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .regex(/^[A-Za-z -]+$/, "Letters only"),
    gender: z.enum(["Male", "Female"], { required_error: "Please select your gender" }),
    email: z.string().email("Please enter a valid email address"),
    country: z.string().min(1, "Please select your country"),
    state: z.string().min(1, "Please enter your state or region"),
    city: z.string().min(2, "Please enter your city"),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || val.trim() === "" || /^[\+\d\s\-()]{7,20}$/.test(val.trim()), "Please enter a valid phone number"),
});
const INTAKE_KEY = "sacred-match-intake";
export function IntakePage() {
    const navigate = useNavigate();
    const [country, setCountry] = useState("Nigeria");
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(intakeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: undefined,
            email: "",
            country: "Nigeria",
            state: "",
            city: "",
            phone: "",
        },
    });
    const watchedCountry = watch("country");
    function onSubmit(values) {
        // Persist intake data for later use in signup/onboarding
        window.localStorage.setItem(INTAKE_KEY, JSON.stringify(values));
        navigate("/onboarding/intent");
    }
    const isNigeria = watchedCountry === "Nigeria" || country === "Nigeria";
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(RevealOnScroll, { children: _jsx(SectionHeading, { eyebrow: "Get started", title: "You're one step away from serious matches", description: "Tell us a little about yourself. This takes less than 2 minutes and gets you into the verification flow." }) }) }), _jsx("section", { className: "section-shell pt-0 pb-16", children: _jsx("div", { className: "surface-card overflow-hidden", children: _jsxs("div", { className: "grid lg:grid-cols-[1.1fr_0.9fr]", children: [_jsx(RevealOnScroll, { className: "p-8 sm:p-10", children: _jsxs("form", { className: "grid gap-5", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "First name" }), _jsx("input", { className: "input-shell", placeholder: "Your first name", ...register("firstName") }), errors.firstName && (_jsx("span", { className: "text-sm text-rose-600", children: errors.firstName.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Last name" }), _jsx("input", { className: "input-shell", placeholder: "Your last name", ...register("lastName") }), errors.lastName && (_jsx("span", { className: "text-sm text-rose-600", children: errors.lastName.message }))] })] }), _jsxs("fieldset", { className: "grid gap-2", children: [_jsx("legend", { className: "text-sm font-semibold text-brand-forest", children: "Gender" }), _jsx("div", { className: "flex gap-3", children: ["Male", "Female"].map((g) => (_jsxs("label", { className: "flex flex-1 cursor-pointer items-center gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest has-[:checked]:border-brand-forest has-[:checked]:bg-brand-forest has-[:checked]:text-white", children: [_jsx("input", { className: "sr-only", type: "radio", value: g, ...register("gender") }), g] }, g))) }), errors.gender && (_jsx("span", { className: "text-sm text-rose-600", children: errors.gender.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Email address" }), _jsx("input", { className: "input-shell", placeholder: "name@example.com", type: "email", ...register("email") }), errors.email && (_jsx("span", { className: "text-sm text-rose-600", children: errors.email.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Country of residence" }), _jsx("select", { className: "input-shell", ...register("country", {
                                                        onChange: (e) => setCountry(e.target.value),
                                                    }), children: countries.map((c) => (_jsx("option", { children: c }, c))) }), errors.country && (_jsx("span", { className: "text-sm text-rose-600", children: errors.country.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "State / Region" }), isNigeria ? (_jsxs("select", { className: "input-shell", ...register("state"), children: [_jsx("option", { value: "", children: "Select a state..." }), nigerianStates.map((s) => (_jsx("option", { children: s }, s)))] })) : (_jsx("input", { className: "input-shell", placeholder: "Your state or region", ...register("state") })), errors.state && (_jsx("span", { className: "text-sm text-rose-600", children: errors.state.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "City" }), _jsx("input", { className: "input-shell", placeholder: "Your city", ...register("city") }), errors.city && (_jsx("span", { className: "text-sm text-rose-600", children: errors.city.message }))] }), _jsxs("label", { className: "grid gap-2", children: [_jsxs("span", { className: "text-sm font-semibold text-brand-forest", children: ["Phone number", " ", _jsx("span", { className: "font-normal text-brand-forest/50", children: "(optional)" })] }), _jsx("input", { className: "input-shell", placeholder: "+234 801 234 5678", type: "tel", ...register("phone") }), errors.phone && (_jsx("span", { className: "text-sm text-rose-600", children: errors.phone.message }))] }), _jsxs("div", { className: "flex items-start gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest/70", children: [_jsx(Lock, { className: "mt-0.5 shrink-0 text-brand-forest/40", size: 16 }), "Your information is encrypted and never shared with third parties."] }), _jsxs("button", { className: "inline-flex items-center justify-center gap-2 rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-70", disabled: isSubmitting, type: "submit", children: ["Continue to Verification ", _jsx(ChevronRight, { size: 16 })] })] }) }), _jsxs(RevealOnScroll, { className: "bg-brand-ink p-8 text-brand-cream sm:p-10", delay: 120, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold", children: "What happens next" }), _jsx("h2", { className: "mt-4 font-display text-3xl font-semibold text-white", children: "Four steps stand between you and serious matches." }), _jsx("div", { className: "mt-6 grid gap-5", children: [
                                            {
                                                step: "1",
                                                title: "Intent Check",
                                                body: "Three questions that confirm you're here for marriage — not casual encounters.",
                                            },
                                            {
                                                step: "2",
                                                title: "Document Vault",
                                                body: "Upload a government ID so we can verify your identity. Encrypted and never stored in full.",
                                            },
                                            {
                                                step: "3",
                                                title: "Liveness Check",
                                                body: "A quick selfie or short video confirms you're real and matches your ID photo.",
                                            },
                                            {
                                                step: "4",
                                                title: "Human Review",
                                                body: "Our team manually reviews every profile. Expect approval within 12–24 hours.",
                                            },
                                        ].map((item) => (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-clay text-xs font-bold text-white", children: item.step }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-white", children: item.title }), _jsx("p", { className: "mt-1 text-sm leading-6 text-brand-cream/70", children: item.body })] })] }, item.step))) })] })] }) }) })] }));
}
