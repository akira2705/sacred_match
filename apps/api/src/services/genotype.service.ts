export type GenotypePair = "AA-AA" | "AA-AS" | "AA-SS" | "AS-AS" | "AS-SS" | "SS-SS";

type CompatibilityResult = {
  code: "safe" | "caution" | "risk";
  headline: string;
  explanation: string;
  counselingRecommended: boolean;
};

const matrix: Record<GenotypePair, CompatibilityResult> = {
  "AA-AA": {
    code: "safe",
    headline: "100% healthy outcome expectation",
    explanation: "AA with AA avoids sickle-cell trait transmission.",
    counselingRecommended: false
  },
  "AA-AS": {
    code: "safe",
    headline: "Low-risk pairing",
    explanation: "Children may be AA or AS, with no SS risk.",
    counselingRecommended: false
  },
  "AA-SS": {
    code: "safe",
    headline: "Carrier-only outcome expectation",
    explanation: "Children are typically AS carriers but not SS.",
    counselingRecommended: true
  },
  "AS-AS": {
    code: "caution",
    headline: "25% SS risk",
    explanation: "This pairing has a material risk of sickle-cell disease in children.",
    counselingRecommended: true
  },
  "AS-SS": {
    code: "risk",
    headline: "50% SS risk",
    explanation: "This pairing carries a high risk and should be approached with genetic counseling.",
    counselingRecommended: true
  },
  "SS-SS": {
    code: "risk",
    headline: "100% SS risk",
    explanation: "This pairing presents the highest inheritance risk for sickle-cell disease.",
    counselingRecommended: true
  }
};

function normalizePair(left: string, right: string): GenotypePair | null {
  const pair = [left.toUpperCase(), right.toUpperCase()].sort().join("-") as GenotypePair;
  return pair in matrix ? pair : null;
}

export function getGenotypeCompatibility(left: string, right: string) {
  const key = normalizePair(left, right);

  if (!key) {
    return {
      code: "caution" as const,
      headline: "Unsupported genotype combination",
      explanation: "This foundation currently ships public guidance for AA, AS, and SS pairings.",
      counselingRecommended: true
    };
  }

  return matrix[key];
}
