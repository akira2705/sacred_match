import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  Lock,
  Shield,
  ShieldCheck,
  Upload,
  Video,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import {
  loadVerificationFlow,
  saveVerificationFlow,
  type VerificationFlow,
} from "@/lib/profileStorage";

/* ─── shared progress bar ─── */

const STAGES = [
  { label: "Intent", path: "/onboarding/intent" },
  { label: "Documents", path: "/onboarding/documents" },
  { label: "Liveness", path: "/onboarding/liveness" },
  { label: "Review", path: "/onboarding/review" },
];

function VerificationProgress({ current }: { current: number }) {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between gap-2">
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i < current
                  ? "bg-brand-clay text-white"
                  : i === current
                    ? "bg-brand-forest text-white"
                    : "bg-brand-forest/10 text-brand-forest/50"
              }`}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                i <= current ? "text-brand-ink" : "text-brand-forest/40"
              }`}
            >
              {stage.label}
            </span>
            {i < STAGES.length - 1 && (
              <div
                className={`mx-1 hidden h-0.5 flex-1 rounded sm:block ${
                  i < current ? "bg-brand-clay" : "bg-brand-forest/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAGE 1: INTENT WALL
   ═══════════════════════════════════════════ */

const intentQuestions = [
  {
    id: "reason",
    question: "Are you seeking a casual relationship or a life partner for marriage?",
    options: [
      { label: "A life partner for marriage", pass: true },
      { label: "A casual relationship", pass: false },
      { label: "Not sure yet", pass: false },
      { label: "Just exploring", pass: false },
    ],
  },
  {
    id: "verification",
    question: "Are you willing to undergo government ID verification to protect this community?",
    subtext: "Please note that your data is encrypted and handled with strict confidentiality.",
    options: [
      { label: "Yes, I understand and agree", pass: true },
      { label: "No, I'd rather skip that", pass: false },
    ],
  },
  {
    id: "sincerity",
    question: "Do you agree to our Code of Sincerity?",
    subtext: "No harassment. No ghosting. No fishing. Spousia is a space of radical honesty and respect.",
    options: [
      { label: "Yes, I agree to the Code of Sincerity", pass: true },
      { label: "No, I don't agree", pass: false },
    ],
  },
];

export function IntentWallPage() {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<VerificationFlow>(() =>
    loadVerificationFlow()
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { label: string; pass: boolean }>
  >({});
  const [showResult, setShowResult] = useState(false);
  const [failed, setFailed] = useState(false);

  function selectAnswer(
    questionId: string,
    option: { label: string; pass: boolean }
  ) {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  }

  function handleNext() {
    if (currentQ < intentQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      return;
    }

    // Evaluate all answers
    const allPass = Object.values(answers).every((a) => a.pass);
    const updated: VerificationFlow = {
      ...flow,
      intentAnswers: {
        reason: answers.reason?.label ?? "",
        timeline: answers.timeline?.label ?? "",
        commitment: answers.commitment?.label ?? "",
        passed: allPass,
      },
      currentStage: allPass ? 1 : 0,
    };
    setFlow(updated);
    saveVerificationFlow(updated);
    setFailed(!allPass);
    setShowResult(true);
  }

  const q = intentQuestions[currentQ];
  const currentAnswer = answers[q.id];

  if (showResult && failed) {
    return (
      <div>
        <section className="section-shell pb-10 pt-16">
          <SectionHeading
            eyebrow="Intent check"
            title="Spousia may not be the right fit right now"
            description="Our platform is specifically designed for people who are actively seeking marriage."
          />
        </section>
        <section className="section-shell pt-0">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="text-amber-600" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                We're sorry
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-brand-forest/70 leading-7">
                Spousia is exclusively for people with genuine marital intent.
                If your situation changes, you're welcome to return and start your
                journey with us.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald"
                  to="/"
                >
                  Return Home
                </Link>
                <button
                  className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest"
                  onClick={() => {
                    setShowResult(false);
                    setFailed(false);
                    setCurrentQ(0);
                    setAnswers({});
                  }}
                  type="button"
                >
                  Try Again
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    );
  }

  if (showResult && !failed) {
    return (
      <div>
        <section className="section-shell pb-10 pt-16">
          <SectionHeading
            eyebrow="Intent verified"
            title="You're in the right place"
            description="Your responses show you're serious about finding a life partner."
          />
        </section>
        <section className="section-shell pt-0">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="text-emerald-600" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Welcome to the trust journey
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-brand-forest/70 leading-7">
                Next, we'll verify your identity. This keeps our community safe
                and ensures every profile is real.
              </p>
              <button
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold"
                onClick={() => navigate("/onboarding/documents")}
                type="button"
              >
                Continue to Document Verification <ChevronRight size={16} />
              </button>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Step 1 of 4 — Intent check"
          title="Before we begin, let's make sure we're aligned"
          description="Spousia is built for people seeking marriage. These three questions help us protect the community."
        />
      </section>

      <section className="section-shell pt-0">
        <VerificationProgress current={0} />
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card p-8 sm:p-10">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-semibold text-brand-forest">
                Question {currentQ + 1} of {intentQuestions.length}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-brand-ink sm:text-2xl">
              {q.question}
            </h3>
            {"subtext" in q && q.subtext && (
              <p className="mt-3 text-sm leading-6 text-brand-forest/70">{q.subtext}</p>
            )}
            <div className="mt-6 grid gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt.label}
                  className={`rounded-[1.5rem] border px-6 py-4 text-left text-sm font-semibold transition ${
                    currentAnswer?.label === opt.label
                      ? "border-brand-forest bg-brand-forest text-white"
                      : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest hover:border-brand-forest/30"
                  }`}
                  onClick={() => selectAnswer(q.id, opt)}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest disabled:opacity-40"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ((c) => c - 1)}
                type="button"
              >
                Back
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-40"
                disabled={!currentAnswer}
                onClick={handleNext}
                type="button"
              >
                {currentQ === intentQuestions.length - 1
                  ? "Submit"
                  : "Next"}{" "}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAGE 2: DOCUMENT VAULT
   ═══════════════════════════════════════════ */

export function DocumentVaultPage() {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<VerificationFlow>(() =>
    loadVerificationFlow()
  );
  const [idType, setIdType] = useState(flow.documents.idType || "");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  // Redirect if intent not passed
  useEffect(() => {
    const f = loadVerificationFlow();
    if (!f.intentAnswers.passed) {
      navigate("/onboarding/intent");
    }
  }, [navigate]);

  const handleDragOver = useCallback(
    (e: React.DragEvent, zone: string) => {
      e.preventDefault();
      setDragOver(zone);
    },
    []
  );

  const handleDragLeave = useCallback(() => setDragOver(null), []);

  function handleDrop(e: React.DragEvent, setter: (f: File) => void) {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setter(file);
    }
  }

  function handleSubmit() {
    if (!idType || !frontFile || !photoFile) return;
    const updated: VerificationFlow = {
      ...flow,
      documents: {
        idType,
        idFrontFile: frontFile.name,
        idBackFile: backFile?.name ?? "",
        photoFile: photoFile.name,
      },
      currentStage: 2,
    };
    setFlow(updated);
    saveVerificationFlow(updated);
    navigate("/onboarding/liveness");
  }

  const isValid = idType && frontFile;

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Step 2 of 4 — Document verification"
          title="Upload your identity documents"
          description="Your documents are encrypted and stored securely. They are only used for verification and never shared."
        />
      </section>

      <section className="section-shell pt-0">
        <VerificationProgress current={1} />
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card p-8 sm:p-10">
            {/* Security banner */}
            <div className="mb-8 flex items-start gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4">
              <Lock className="mt-0.5 shrink-0 text-brand-forest" size={18} />
              <div className="text-sm leading-6 text-brand-forest/80">
                <span className="font-semibold text-brand-ink">Your data is encrypted.</span>{" "}
                We do not store your ID number. We only verify that the name and face on your
                document match your profile. All uploads are handled with bank-grade security.
              </div>
            </div>

            <div className="grid gap-8">
              {/* ID Type Selection */}
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">
                  ID Type
                </span>
                <select
                  className="input-shell"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="">Select your ID type...</option>
                  <option>NIN Slip</option>
                  <option>International Passport</option>
                  <option>Voter's Card</option>
                  <option>Driver's License</option>
                </select>
              </label>

              {/* Front of ID */}
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">
                  Front of ID <span className="text-rose-500">*</span>
                </span>
                <div
                  className={`relative rounded-[2rem] border-2 border-dashed p-8 text-center transition ${
                    dragOver === "front"
                      ? "border-brand-clay bg-brand-clay/5"
                      : frontFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-brand-forest/20 bg-brand-forest/5"
                  }`}
                  onDragLeave={handleDragLeave}
                  onDragOver={(e) => handleDragOver(e, "front")}
                  onDrop={(e) => handleDrop(e, setFrontFile)}
                >
                  {frontFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText
                        className="text-emerald-600"
                        size={20}
                      />
                      <span className="font-semibold text-emerald-900">
                        {frontFile.name}
                      </span>
                      <button
                        className="rounded-full p-1 hover:bg-emerald-100"
                        onClick={() => setFrontFile(null)}
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload
                        className="mx-auto mb-3 text-brand-forest/40"
                        size={28}
                      />
                      <p className="font-semibold text-brand-forest">
                        Drag & drop or{" "}
                        <button
                          className="text-brand-clay underline"
                          onClick={() => frontRef.current?.click()}
                          type="button"
                        >
                          browse
                        </button>
                      </p>
                      <p className="mt-1 text-sm text-brand-forest/60">
                        JPEG, PNG or PDF, max 10MB
                      </p>
                    </>
                  )}
                  <input
                    ref={frontRef}
                    accept="image/*,application/pdf"
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files?.[0] && setFrontFile(e.target.files[0])
                    }
                    type="file"
                  />
                </div>
              </div>

              {/* Back of ID (optional) */}
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">
                  Back of ID{" "}
                  <span className="text-brand-forest/50">(optional)</span>
                </span>
                <div
                  className={`relative rounded-[2rem] border-2 border-dashed p-8 text-center transition ${
                    dragOver === "back"
                      ? "border-brand-clay bg-brand-clay/5"
                      : backFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-brand-forest/20 bg-brand-forest/5"
                  }`}
                  onDragLeave={handleDragLeave}
                  onDragOver={(e) => handleDragOver(e, "back")}
                  onDrop={(e) => handleDrop(e, setBackFile)}
                >
                  {backFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="text-emerald-600" size={20} />
                      <span className="font-semibold text-emerald-900">
                        {backFile.name}
                      </span>
                      <button
                        className="rounded-full p-1 hover:bg-emerald-100"
                        onClick={() => setBackFile(null)}
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload
                        className="mx-auto mb-3 text-brand-forest/40"
                        size={28}
                      />
                      <p className="font-semibold text-brand-forest">
                        Drag & drop or{" "}
                        <button
                          className="text-brand-clay underline"
                          onClick={() => backRef.current?.click()}
                          type="button"
                        >
                          browse
                        </button>
                      </p>
                      <p className="mt-1 text-sm text-brand-forest/60">
                        JPEG, PNG or PDF, max 10MB
                      </p>
                    </>
                  )}
                  <input
                    ref={backRef}
                    accept="image/*,application/pdf"
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files?.[0] && setBackFile(e.target.files[0])
                    }
                    type="file"
                  />
                </div>
              </div>

              {/* Passport photo */}
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">
                  Profile photo{" "}
                  <span className="text-brand-forest/50">(optional, but strongly recommended)</span>
                </span>
                <p className="text-xs text-brand-forest/60">No inappropriate photos. Clear face, no filters.</p>
                <div
                  className={`relative rounded-[2rem] border-2 border-dashed p-8 text-center transition ${
                    dragOver === "photo"
                      ? "border-brand-clay bg-brand-clay/5"
                      : photoFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-brand-forest/20 bg-brand-forest/5"
                  }`}
                  onDragLeave={handleDragLeave}
                  onDragOver={(e) => handleDragOver(e, "photo")}
                  onDrop={(e) => handleDrop(e, setPhotoFile)}
                >
                  {photoFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <Camera className="text-emerald-600" size={20} />
                      <span className="font-semibold text-emerald-900">
                        {photoFile.name}
                      </span>
                      <button
                        className="rounded-full p-1 hover:bg-emerald-100"
                        onClick={() => setPhotoFile(null)}
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Camera
                        className="mx-auto mb-3 text-brand-forest/40"
                        size={28}
                      />
                      <p className="font-semibold text-brand-forest">
                        Take a photo or{" "}
                        <button
                          className="text-brand-clay underline"
                          onClick={() => photoRef.current?.click()}
                          type="button"
                        >
                          upload one
                        </button>
                      </p>
                      <p className="mt-1 text-sm text-brand-forest/60">
                        Clear, well-lit, face centered, no filters
                      </p>
                    </>
                  )}
                  <input
                    ref={photoRef}
                    accept="image/*"
                    capture="user"
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files?.[0] && setPhotoFile(e.target.files[0])
                    }
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest"
                onClick={() => navigate("/onboarding/intent")}
                type="button"
              >
                Back
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:opacity-40"
                disabled={!isValid}
                onClick={handleSubmit}
                type="button"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAGE 3: LIVENESS CHECK
   ═══════════════════════════════════════════ */

export function LivenessCheckPage() {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<VerificationFlow>(() =>
    loadVerificationFlow()
  );
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [step, setStep] = useState<"instructions" | "selfie" | "video" | "done">(
    "instructions"
  );
  const selfieRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const f = loadVerificationFlow();
    if (!f.intentAnswers.passed) {
      navigate("/onboarding/intent");
    } else if (!f.documents.idFrontFile) {
      navigate("/onboarding/documents");
    }
  }, [navigate]);

  function handleSubmit() {
    if (!selfieFile) return;
    const updated: VerificationFlow = {
      ...flow,
      liveness: {
        selfieFile: selfieFile.name,
        videoFile: videoFile?.name ?? "",
        completed: true,
      },
      currentStage: 3,
    };
    setFlow(updated);
    saveVerificationFlow(updated);
    navigate("/onboarding/review");
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Step 3 of 4 — Liveness check"
          title="Prove you're a real person"
          description="A quick selfie and optional video confirm you're who you say you are. This protects you and every member."
        />
      </section>

      <section className="section-shell pt-0">
        <VerificationProgress current={2} />
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card p-8 sm:p-10">
            {step === "instructions" && (
              <div className="grid gap-8">
                <div className="mx-auto max-w-lg text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-forest/10">
                    <Shield className="text-brand-forest" size={36} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-ink">
                    How liveness verification works
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-forest/70">
                    We'll compare your selfie against the ID photo you uploaded.
                    This ensures no one is using someone else's identity.
                  </p>
                </div>

                <div className="mx-auto grid max-w-2xl gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 p-6">
                    <Camera
                      className="mb-3 text-brand-clay"
                      size={22}
                    />
                    <p className="font-semibold text-brand-ink">
                      Live selfie
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-forest/70">
                      Take a clear, well-lit photo of your face. Remove
                      sunglasses, hats, or face coverings.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 p-6">
                    <Video className="mb-3 text-brand-clay" size={22} />
                    <p className="font-semibold text-brand-ink">
                      Short video{" "}
                      <span className="text-brand-forest/50">(optional)</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-forest/70">
                      A 3-second liveness video or 3D selfie confirms you're
                      real and matches your face against your ID photo.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                  <strong>Tips for success:</strong> Ensure your face is well-lit.
                  Remove glasses and hats. Face the camera directly with your
                  full face visible.
                </div>

                <div className="text-center">
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald"
                    onClick={() => setStep("selfie")}
                    type="button"
                  >
                    I'm ready — let's go <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === "selfie" && (
              <div className="grid gap-6">
                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  Take your selfie
                </h3>
                <div
                  className={`rounded-[2rem] border-2 border-dashed p-10 text-center transition ${
                    selfieFile
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-brand-forest/20 bg-brand-forest/5"
                  }`}
                >
                  {selfieFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2
                          className="text-emerald-600"
                          size={28}
                        />
                      </div>
                      <p className="font-semibold text-emerald-900">
                        {selfieFile.name}
                      </p>
                      <button
                        className="text-sm text-brand-clay underline"
                        onClick={() => {
                          setSelfieFile(null);
                          selfieRef.current?.click();
                        }}
                        type="button"
                      >
                        Retake
                      </button>
                    </div>
                  ) : (
                    <>
                      <Camera
                        className="mx-auto mb-4 text-brand-forest/40"
                        size={40}
                      />
                      <p className="font-semibold text-brand-forest">
                        <button
                          className="text-brand-clay underline"
                          onClick={() => selfieRef.current?.click()}
                          type="button"
                        >
                          Open camera
                        </button>{" "}
                        or upload a selfie
                      </p>
                    </>
                  )}
                  <input
                    ref={selfieRef}
                    accept="image/*"
                    capture="user"
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files?.[0] && setSelfieFile(e.target.files[0])
                    }
                    type="file"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest"
                    onClick={() => setStep("instructions")}
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-40"
                    disabled={!selfieFile}
                    onClick={() => setStep("video")}
                    type="button"
                  >
                    Next: Video <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === "video" && (
              <div className="grid gap-6">
                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  Record a short video{" "}
                  <span className="text-base font-normal text-brand-forest/50">
                    (optional)
                  </span>
                </h3>
                <p className="text-sm leading-7 text-brand-forest/70">
                  Record a 5-second video turning your head slowly left and
                  right. This adds a "Liveness Verified" badge to your profile.
                </p>
                <div
                  className={`rounded-[2rem] border-2 border-dashed p-10 text-center transition ${
                    videoFile
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-brand-forest/20 bg-brand-forest/5"
                  }`}
                >
                  {videoFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2
                          className="text-emerald-600"
                          size={28}
                        />
                      </div>
                      <p className="font-semibold text-emerald-900">
                        {videoFile.name}
                      </p>
                      <button
                        className="text-sm text-brand-clay underline"
                        onClick={() => {
                          setVideoFile(null);
                          videoRef.current?.click();
                        }}
                        type="button"
                      >
                        Re-record
                      </button>
                    </div>
                  ) : (
                    <>
                      <Video
                        className="mx-auto mb-4 text-brand-forest/40"
                        size={40}
                      />
                      <p className="font-semibold text-brand-forest">
                        <button
                          className="text-brand-clay underline"
                          onClick={() => videoRef.current?.click()}
                          type="button"
                        >
                          Record video
                        </button>{" "}
                        or upload a clip
                      </p>
                      <p className="mt-2 text-sm text-brand-forest/50">
                        MP4 or MOV, max 30 seconds
                      </p>
                    </>
                  )}
                  <input
                    ref={videoRef}
                    accept="video/*"
                    capture="user"
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files?.[0] && setVideoFile(e.target.files[0])
                    }
                    type="file"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest"
                    onClick={() => setStep("selfie")}
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold"
                    onClick={handleSubmit}
                    type="button"
                  >
                    Submit verification <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STAGE 4: REVIEW + MARRIAGE READINESS QUESTIONNAIRE
   ═══════════════════════════════════════════ */

const readinessQuestions = [
  {
    id: 1,
    question: "Ideally, how soon are you looking to transition from meeting to marriage?",
    type: "single" as const,
    options: [
      "I am ready now",
      "Within 6 months",
      "6–12 months",
      "1–2 years",
    ],
  },
  {
    id: 2,
    question: "What is your genotype?",
    type: "single" as const,
    options: ["AA", "AS", "SS", "Prefer not to say / Not yet tested"],
  },
  {
    id: 3,
    question: "What is your current stance on having or raising children?",
    type: "single" as const,
    options: [
      "Want children",
      "Have children & want more",
      "Have children & done",
      "Not looking to have children",
    ],
  },
  {
    id: 4,
    question: "Are you open to relocating for the right partner?",
    type: "single" as const,
    options: [
      "Yes, locally (within Nigeria)",
      "Yes, internationally (Diaspora)",
      "No, I am settled where I am",
    ],
  },
  {
    id: 5,
    question: "How do you view financial management in a marriage?",
    type: "single" as const,
    options: [
      "Fully joint accounts",
      "Separate accounts with a joint household fund",
      "Traditional (one primary breadwinner)",
    ],
  },
  {
    id: 6,
    question: "How important is it that your partner has a similar level of career ambition or income?",
    type: "single" as const,
    options: [
      "Very important",
      "Somewhat important",
      "I value character over career status",
    ],
  },
  {
    id: 7,
    question: "Are you currently managing any significant financial commitments (e.g., family support, business loans) that a partner should be aware of?",
    type: "single" as const,
    options: [
      "Yes, and I'm comfortable disclosing this to a serious partner",
      "Yes, but I'd prefer to discuss it at the right time",
      "No significant commitments",
    ],
  },
  {
    id: 8,
    question: "On a scale of 1–5, how central is your religious practice to your daily life and decision-making?",
    type: "single" as const,
    options: ["1 — Not central at all", "2", "3 — Moderately central", "4", "5 — Central to everything I do"],
  },
  {
    id: 9,
    question: "Would you consider a partner from a different denomination or faith background if your core values aligned?",
    type: "single" as const,
    options: [
      "Strictly my faith only",
      "Open to different denominations",
      "Open to other faiths",
    ],
  },
  {
    id: 10,
    question: "How involved do you expect your extended family to be in your marital decisions?",
    type: "single" as const,
    options: [
      "Highly involved (Traditional)",
      "Consulted but we decide independently",
      "Fully independent",
    ],
  },
  {
    id: 11,
    question: "When a disagreement arises, how do you typically handle it?",
    type: "single" as const,
    options: [
      "Address it immediately",
      "Take space to reflect first",
      "Prefer a mediator or counselor",
    ],
  },
  {
    id: 12,
    question: "In one sentence, what is the one character trait that is absolutely mandatory for your future spouse?",
    type: "text" as const,
    options: [],
    placeholder: "e.g., Honesty, God-fearing, emotional maturity, ambition...",
  },
];

export function ReviewPage() {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<VerificationFlow>(() =>
    loadVerificationFlow()
  );
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const f = loadVerificationFlow();
    if (!f.intentAnswers.passed) {
      navigate("/onboarding/intent");
    } else if (!f.documents.idFrontFile) {
      navigate("/onboarding/documents");
    } else if (!f.liveness.completed) {
      navigate("/onboarding/liveness");
    }
  }, [navigate]);

  function selectAnswer(questionId: number, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  function handleQuestionnaireSubmit() {
    const readinessAnswers = Object.entries(answers).map(([qId, answer]) => ({
      questionId: Number(qId),
      answer,
    }));
    const updated: VerificationFlow = {
      ...flow,
      readinessAnswers,
      reviewStatus: "in_review",
    };
    setFlow(updated);
    saveVerificationFlow(updated);
    setSubmitted(true);
  }

  function handleFinish() {
    window.localStorage.setItem("spousia-token", "verified-user-token");
    navigate("/dashboard");
  }

  const q = readinessQuestions[currentQ];
  const answeredCount = Object.keys(answers).length;

  // Main waiting / review screen
  if (!showQuestionnaire && !submitted) {
    return (
      <div>
        <section className="section-shell pb-10 pt-16">
          <SectionHeading
            eyebrow="Step 4 of 4 — Under review"
            title="Your documents are being reviewed"
            description="While you wait, complete the Marriage Readiness Questionnaire to strengthen your profile."
          />
        </section>

        <section className="section-shell pt-0">
          <VerificationProgress current={3} />
        </section>

        <section className="section-shell pt-0">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10">
              {/* Review status animation */}
              <div className="mx-auto max-w-lg text-center">
                <div className="relative mx-auto mb-6 h-24 w-24">
                  <div className="absolute inset-0 animate-ping rounded-full bg-brand-clay/20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand-clay/10">
                    <ShieldCheck className="text-brand-clay" size={40} />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-semibold text-brand-ink">
                  Verification in progress
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-forest/70">
                  Our team is reviewing your identity documents. We manually
                  review every profile to ensure a high-trust environment.
                  Expect approval within 12–24 hours.
                </p>

                {/* Progress steps */}
                <div className="mx-auto mt-8 max-w-sm text-left">
                  {[
                    {
                      label: "Documents uploaded",
                      done: true,
                    },
                    {
                      label: "Liveness verified",
                      done: true,
                    },
                    {
                      label: "Human review",
                      done: false,
                      active: true,
                    },
                    { label: "Profile activated", done: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 border-l-2 border-brand-forest/10 py-3 pl-4 last:border-transparent"
                    >
                      {item.done ? (
                        <CheckCircle2
                          className="shrink-0 text-emerald-500"
                          size={18}
                        />
                      ) : item.active ? (
                        <Loader2
                          className="shrink-0 animate-spin text-brand-clay"
                          size={18}
                        />
                      ) : (
                        <div className="h-[18px] w-[18px] shrink-0 rounded-full border-2 border-brand-forest/20" />
                      )}
                      <span
                        className={`text-sm font-semibold ${
                          item.done
                            ? "text-brand-ink"
                            : item.active
                              ? "text-brand-clay"
                              : "text-brand-forest/40"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to questionnaire */}
              <div className="mt-10 rounded-[2rem] border border-brand-clay/20 bg-brand-clay/5 p-8 text-center">
                <h4 className="font-display text-lg font-semibold text-brand-ink">
                  While you wait — complete your Marriage Readiness Questionnaire
                </h4>
                <p className="mt-2 text-sm leading-6 text-brand-forest/70">
                  Your answers help us shape better, deeper matches. This directly
                  improves the quality of people we connect you with.
                </p>
                <button
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold"
                  onClick={() => setShowQuestionnaire(true)}
                  type="button"
                >
                  Start Questionnaire <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    );
  }

  // Submitted state
  if (submitted) {
    return (
      <div>
        <section className="section-shell pb-10 pt-16">
          <SectionHeading
            eyebrow="All done"
            title="You've completed everything"
            description="Your verification is under review and your questionnaire has been submitted."
          />
        </section>

        <section className="section-shell pt-0">
          <VerificationProgress current={4} />
        </section>

        <section className="section-shell pt-0">
          <RevealOnScroll>
            <div className="surface-card p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="text-emerald-600" size={36} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Your profile is nearly ready
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-brand-forest/70 leading-7">
                We'll notify you by email once human review is complete
                (typically 24-48 hours). In the meantime, you can explore your
                dashboard preview.
              </p>

              <div className="mx-auto mt-8 grid max-w-md gap-4 text-left">
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 size={16} /> Intent verified
                </div>
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 size={16} /> Documents submitted
                </div>
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 size={16} /> Liveness confirmed
                </div>
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 size={16} /> Readiness questionnaire complete
                </div>
                <div className="flex items-center gap-3 rounded-[1.5rem] bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900">
                  <Loader2 className="animate-spin" size={16} /> Human review in
                  progress
                </div>
              </div>

              <button
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold"
                onClick={handleFinish}
                type="button"
              >
                Go to Dashboard Preview <ChevronRight size={16} />
              </button>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    );
  }

  // Questionnaire flow
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Marriage Readiness Questionnaire"
          title="Help us understand what matters to you"
          description="Your honest answers improve match quality. There are no wrong answers — only your truth."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-brand-forest">
              Question {currentQ + 1} of {readinessQuestions.length}
            </span>
            <span className="text-sm text-brand-forest/60">
              {answeredCount} answered
            </span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-brand-forest/10">
            <div
              className="h-3 rounded-full bg-brand-clay transition-all"
              style={{
                width: `${((currentQ + 1) / readinessQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card p-8 sm:p-10">
            <h3 className="font-display text-xl font-semibold text-brand-ink sm:text-2xl">
              {q.question}
            </h3>

            {q.type === "single" && (
              <div className="mt-6 grid gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    className={`rounded-[1.5rem] border px-6 py-4 text-left text-sm font-semibold transition ${
                      answers[q.id] === opt
                        ? "border-brand-forest bg-brand-forest text-white"
                        : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest hover:border-brand-forest/30"
                    }`}
                    onClick={() => selectAnswer(q.id, opt)}
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === "text" && (
              <textarea
                className="input-shell mt-6 min-h-[8rem]"
                placeholder={q.placeholder}
                value={answers[q.id] ?? ""}
                onChange={(e) => selectAnswer(q.id, e.target.value)}
              />
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest disabled:opacity-40"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ((c) => c - 1)}
                type="button"
              >
                Previous
              </button>
              <div className="flex gap-3">
                {currentQ < readinessQuestions.length - 1 ? (
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:opacity-40"
                    disabled={!answers[q.id]}
                    onClick={() => setCurrentQ((c) => c + 1)}
                    type="button"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-brand-clay px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold disabled:opacity-40"
                    disabled={answeredCount < 10}
                    onClick={handleQuestionnaireSubmit}
                    type="button"
                  >
                    Submit Questionnaire <CheckCircle2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {currentQ === readinessQuestions.length - 1 &&
              answeredCount < 10 && (
                <p className="mt-4 text-center text-sm text-amber-600">
                  Please answer at least 10 questions before submitting.
                </p>
              )}
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
