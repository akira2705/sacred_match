export type GenotypeValue = "AA" | "AS" | "SS";
export type RiskLevel = "low" | "moderate" | "high";

export type CompatibilityResult = {
  score: number;
  risk: RiskLevel;
  title: string;
  summary: string;
  recommendation: string;
};

const compatibilityMap: Record<string, CompatibilityResult> = {
  "AA:AA": {
    score: 100,
    risk: "low",
    title: "100% healthy genotype outcome",
    summary: "AA and AA pairings do not produce sickle cell disease in children.",
    recommendation: "This pairing is fully compatible from a sickle cell risk perspective.",
  },
  "AA:AS": {
    score: 88,
    risk: "low",
    title: "Healthy children with carrier possibility",
    summary: "Children can inherit AA or AS, with no SS outcome expected.",
    recommendation: "Compatible pairing. Counseling is optional but still useful for planning.",
  },
  "AA:SS": {
    score: 76,
    risk: "low",
    title: "No SS outcome, all children likely carriers",
    summary: "Children are expected to inherit the AS genotype.",
    recommendation: "Compatible, though couples should understand the carrier implications.",
  },
  "AS:AS": {
    score: 42,
    risk: "moderate",
    title: "Counseling strongly recommended",
    summary: "Each pregnancy carries a meaningful chance of SS outcome.",
    recommendation: "Proceed only with informed counseling and a clear medical support plan.",
  },
  "AS:SS": {
    score: 18,
    risk: "high",
    title: "High-risk pairing",
    summary: "This pairing significantly increases the likelihood of SS outcomes.",
    recommendation: "Medical counseling is essential before moving forward with marriage plans.",
  },
  "SS:SS": {
    score: 0,
    risk: "high",
    title: "Very high-risk pairing",
    summary: "SS and SS pairings result in children inheriting sickle cell disease.",
    recommendation: "This outcome requires specialist medical guidance and serious family planning discussion.",
  },
};

export function getCompatibilityResult(
  partnerA: GenotypeValue,
  partnerB: GenotypeValue,
): CompatibilityResult {
  const directKey = `${partnerA}:${partnerB}`;
  const reverseKey = `${partnerB}:${partnerA}`;

  return (
    compatibilityMap[directKey] ??
    compatibilityMap[reverseKey] ?? {
      score: 50,
      risk: "moderate",
      title: "Compatibility requires review",
      summary: "This combination is not yet configured in the product matrix.",
      recommendation: "Consult a clinician before drawing conclusions.",
    }
  );
}

export const genotypeCompatibilityTable = [
  { left: "AA", right: "AA", label: "Safe", tone: "low" },
  { left: "AA", right: "AS", label: "Safe", tone: "low" },
  { left: "AA", right: "SS", label: "Safe", tone: "low" },
  { left: "AS", right: "AS", label: "Caution", tone: "moderate" },
  { left: "AS", right: "SS", label: "Risk", tone: "high" },
  { left: "SS", right: "SS", label: "Risk", tone: "high" },
] as const;
