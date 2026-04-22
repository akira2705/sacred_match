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
    .refine(
      (val) => !val || val.trim() === "" || /^[\+\d\s\-()]{7,20}$/.test(val.trim()),
      "Please enter a valid phone number"
    ),
});

type IntakeValues = z.infer<typeof intakeSchema>;

const INTAKE_KEY = "spousia-intake";

export function IntakePage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("Nigeria");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IntakeValues>({
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

  function onSubmit(values: IntakeValues) {
    // Persist intake data for later use in signup/onboarding
    window.localStorage.setItem(INTAKE_KEY, JSON.stringify(values));
    navigate("/onboarding/intent");
  }

  const isNigeria = watchedCountry === "Nigeria" || country === "Nigeria";

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Get started"
            title="You're one step away from serious matches"
            description="Tell us a little about yourself. This takes less than 2 minutes and gets you into the verification flow."
          />
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0 pb-16">
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <RevealOnScroll className="p-8 sm:p-10">
              <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-brand-forest">First name</span>
                    <input
                      className="input-shell"
                      placeholder="Your first name"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <span className="text-sm text-rose-600">{errors.firstName.message}</span>
                    )}
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-brand-forest">Last name</span>
                    <input
                      className="input-shell"
                      placeholder="Your last name"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <span className="text-sm text-rose-600">{errors.lastName.message}</span>
                    )}
                  </label>
                </div>

                {/* Gender */}
                <fieldset className="grid gap-2">
                  <legend className="text-sm font-semibold text-brand-forest">Gender</legend>
                  <div className="flex gap-3">
                    {(["Male", "Female"] as const).map((g) => (
                      <label
                        key={g}
                        className="flex flex-1 cursor-pointer items-center gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest has-[:checked]:border-brand-forest has-[:checked]:bg-brand-forest has-[:checked]:text-white"
                      >
                        <input
                          className="sr-only"
                          type="radio"
                          value={g}
                          {...register("gender")}
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <span className="text-sm text-rose-600">{errors.gender.message}</span>
                  )}
                </fieldset>

                {/* Email */}
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Email address</span>
                  <input
                    className="input-shell"
                    placeholder="name@example.com"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-sm text-rose-600">{errors.email.message}</span>
                  )}
                </label>

                {/* Country */}
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">Country of residence</span>
                  <select
                    className="input-shell"
                    {...register("country", {
                      onChange: (e) => setCountry(e.target.value),
                    })}
                  >
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <span className="text-sm text-rose-600">{errors.country.message}</span>
                  )}
                </label>

                {/* State */}
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">State / Region</span>
                  {isNigeria ? (
                    <select className="input-shell" {...register("state")}>
                      <option value="">Select a state...</option>
                      {nigerianStates.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input-shell"
                      placeholder="Your state or region"
                      {...register("state")}
                    />
                  )}
                  {errors.state && (
                    <span className="text-sm text-rose-600">{errors.state.message}</span>
                  )}
                </label>

                {/* City */}
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">City</span>
                  <input
                    className="input-shell"
                    placeholder="Your city"
                    {...register("city")}
                  />
                  {errors.city && (
                    <span className="text-sm text-rose-600">{errors.city.message}</span>
                  )}
                </label>

                {/* Phone (optional) */}
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">
                    Phone number{" "}
                    <span className="font-normal text-brand-forest/50">(optional)</span>
                  </span>
                  <input
                    className="input-shell"
                    placeholder="+234 801 234 5678"
                    type="tel"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span className="text-sm text-rose-600">{errors.phone.message}</span>
                  )}
                </label>

                {/* Privacy note */}
                <div className="flex items-start gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest/70">
                  <Lock className="mt-0.5 shrink-0 text-brand-forest/40" size={16} />
                  Your information is encrypted and never shared with third parties.
                </div>

                <button
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Continue to Verification <ChevronRight size={16} />
                </button>
              </form>
            </RevealOnScroll>

            {/* Side panel */}
            <RevealOnScroll className="bg-brand-ink p-8 text-brand-cream sm:p-10" delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
                What happens next
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-white">
                Four steps stand between you and serious matches.
              </h2>
              <div className="mt-6 grid gap-5">
                {[
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
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-clay text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-brand-cream/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
