export type IntentAnswers = {
  reason: string;
  timeline: string;
  commitment: string;
  passed: boolean | null;
};

export type DocumentVault = {
  idType: string;
  idFrontFile: string;
  idBackFile: string;
  photoFile: string;
};

export type LivenessData = {
  selfieFile: string;
  videoFile: string;
  completed: boolean;
};

export type ReadinessAnswer = {
  questionId: number;
  answer: string;
};

export type VerificationFlow = {
  intentAnswers: IntentAnswers;
  documents: DocumentVault;
  liveness: LivenessData;
  readinessAnswers: ReadinessAnswer[];
  reviewStatus: "pending" | "in_review" | "approved" | "rejected";
  currentStage: number;
};

const VERIFICATION_KEY = "sacred-match-verification";

export const defaultVerificationFlow: VerificationFlow = {
  intentAnswers: { reason: "", timeline: "", commitment: "", passed: null },
  documents: { idType: "", idFrontFile: "", idBackFile: "", photoFile: "" },
  liveness: { selfieFile: "", videoFile: "", completed: false },
  readinessAnswers: [],
  reviewStatus: "pending",
  currentStage: 0,
};

export function loadVerificationFlow(): VerificationFlow {
  if (!canUseStorage()) return defaultVerificationFlow;
  const raw = window.localStorage.getItem(VERIFICATION_KEY);
  if (!raw) return defaultVerificationFlow;
  try {
    return { ...defaultVerificationFlow, ...JSON.parse(raw) } as VerificationFlow;
  } catch {
    return defaultVerificationFlow;
  }
}

export function saveVerificationFlow(flow: VerificationFlow) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(VERIFICATION_KEY, JSON.stringify(flow));
}

export type OnboardingDraft = {
  personal: {
    dateOfBirth: string;
    gender: string;
    height: string;
    bodyType: string;
    state: string;
    lga: string;
    education: string;
    occupation: string;
    incomeRange: string;
    bio: string;
  };
  ethnicity: {
    ethnicGroup: string;
    openToAllEthnicities: boolean;
  };
  religion: {
    faith: string;
    subgroup: string;
    practiceLevel: string;
    interfaithOk: boolean;
  };
  marriage: {
    marriageTypes: string[];
    timeline: string;
  };
  photos: Array<{
    name: string;
    status: string;
  }>;
  genotype: {
    tested: "yes" | "no" | "later";
    genotype: string;
    testDate: string;
    facilityName: string;
    certificationCode: string;
    certificateName: string;
    privacy: string;
  };
  verification: {
    idType: string;
    idNumber: string;
    frontFileName: string;
    backFileName: string;
    status: string;
  };
  completed: boolean;
};

const STORAGE_KEY = "sacred-match-onboarding-draft";
const REMEMBER_KEY = "sacred-match-remembered-login";

export const defaultOnboardingDraft: OnboardingDraft = {
  personal: {
    dateOfBirth: "1995-06-12",
    gender: "Female",
    height: "5'7\"",
    bodyType: "Athletic",
    state: "Lagos",
    lga: "Eti-Osa",
    education: "Masters",
    occupation: "Product Manager",
    incomeRange: "?500k - ?1m",
    bio: "I value clarity, kindness, faith, and serious long-term intent."
  },
  ethnicity: {
    ethnicGroup: "Yoruba",
    openToAllEthnicities: true
  },
  religion: {
    faith: "Christianity",
    subgroup: "Pentecostal",
    practiceLevel: "Practicing",
    interfaithOk: false
  },
  marriage: {
    marriageTypes: ["Christian Wedding", "Civil Marriage"],
    timeline: "6-12 months"
  },
  photos: [
    { name: "profile-primary.jpg", status: "Verified" },
    { name: "weekend-portrait.jpg", status: "Pending review" }
  ],
  genotype: {
    tested: "yes",
    genotype: "AA",
    testDate: "2025-10-10",
    facilityName: "National Hospital Abuja Diagnostics",
    certificationCode: "SM-4482",
    certificateName: "genotype-certificate.png",
    privacy: "Show to serious matches"
  },
  verification: {
    idType: "National ID",
    idNumber: "12345678901",
    frontFileName: "national-id-front.png",
    backFileName: "",
    status: "Manual review in 24 hours"
  },
  completed: false
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadOnboardingDraft() {
  if (!canUseStorage()) {
    return defaultOnboardingDraft;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultOnboardingDraft;
  }

  try {
    return {
      ...defaultOnboardingDraft,
      ...JSON.parse(raw)
    } as OnboardingDraft;
  } catch {
    return defaultOnboardingDraft;
  }
}

export function saveOnboardingDraft(draft: OnboardingDraft) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function rememberLogin(email: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(REMEMBER_KEY, email);
}

export function forgetRememberedLogin() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(REMEMBER_KEY);
}

export function loadRememberedLogin() {
  if (!canUseStorage()) {
    return "";
  }

  return window.localStorage.getItem(REMEMBER_KEY) ?? "";
}
