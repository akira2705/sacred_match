export type FeatureCard = {
  id: string;
  title: string;
  description: string;
  cta: string;
};

export type StoryCard = {
  names: string;
  route: string;
  story: string;
  timeline: string;
  tag: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ResourceCard = {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
};

export type LandingPageContent = {
  metrics: string[];
  features: FeatureCard[];
  safetyPillars: string[];
  ethnicHighlights: string[];
  testimonials: StoryCard[];
  resources: ResourceCard[];
  faqs: FaqItem[];
  connectionSteps: string[];
};

export const landingPageContent: LandingPageContent = {
  metrics: [
    "371+ Nigerian ethnic identities respected",
    "Genotype-aware matching logic",
    "Intent-first discovery flow",
    "Nigeria-first trust and verification standards",
  ],
  features: [
    {
      id: "culture",
      title: "Culture with clarity",
      description:
        "Profiles and filters respect ethnic identity, faith, location, and openness to cross-cultural matches without flattening people into generic swipes.",
      cta: "Explore compatibility",
    },
    {
      id: "matching",
      title: "Serious compatibility matching",
      description:
        "Recommendations balance shared values, marriage intent, geography, lifestyle fit, and mutual openness so the product stays focused on real long-term potential.",
      cta: "See scoring logic",
    },
    {
      id: "genotype",
      title: "Genetic compatibility checks",
      description:
        "Genotype visibility and compatibility give couples a structured way to make informed decisions about sickle cell risk before relationships become difficult to unwind.",
      cta: "Learn about genotype",
    },
    {
      id: "conversations",
      title: "Intentional conversation flow",
      description:
        "Once two people connect, the experience should help them talk with clarity and pace instead of collapsing into casual, low-signal chat behavior.",
      cta: "Review the connection flow",
    },
    {
      id: "safety",
      title: "Trust-first verification",
      description:
        "Identity, phone, email, and safety moderation foundations are planned from day one so growth does not come at the expense of trust.",
      cta: "Read safety standards",
    },
    {
      id: "stories",
      title: "Success stories with substance",
      description:
        "The experience highlights why a match made sense, what compatibility signals mattered, and how the relationship progressed beyond first impressions.",
      cta: "Read stories",
    },
  ],
  safetyPillars: [
    "Email, SMS, photo, and ID verification lanes",
    "Report, block, moderation, and audit-ready admin actions",
    "Privacy controls for genotype, visibility, read receipts, and activity",
    "Nigeria Data Protection Regulation aware architecture",
  ],
  ethnicHighlights: [
    "Ethnic identity can be visible, optional, and preference-aware.",
    "Cross-ethnic matching works without flattening cultural differences.",
    "Faith, denomination, and location stay part of compatibility.",
    "Marriage intent and timing matter as much as attraction.",
  ],
  testimonials: [
    {
      names: "Ayo (Yoruba) & Nkechi (Igbo)",
      route: "Matched through shared values and openness",
      story:
        "We needed more than age and city filters. Sacred Match surfaced values, genotype compatibility, and relationship intent early enough to take the connection seriously.",
      timeline: "Exclusive in 6 weeks",
      tag: "Cross-ethnic success",
    },
    {
      names: "Zainab (Hausa-Fulani) & Yusuf (Kanuri)",
      route: "Matched through faith and life goals",
      story:
        "The product let us move at the right pace, discuss genotype compatibility early, and focus on whether the connection was truly right for marriage.",
      timeline: "Strong connection in 9 weeks",
      tag: "Faith-led pathway",
    },
    {
      names: "Chioma (Igbo) & Tunde (Yoruba)",
      route: "Matched through cross-cultural openness and genotype awareness",
      story:
        "The biggest difference was clarity. We could see compatibility signals upfront instead of guessing whether we were aligned on the things that matter long term.",
      timeline: "Still building with confidence",
      tag: "Modern matrimony",
    },
  ],
  resources: [
    {
      title: "Understanding genotypes: AA, AS, SS explained",
      excerpt:
        "A practical guide to genotype language, risk, and why couples in Nigeria talk about it early.",
      readTime: "5 min read",
      category: "Genotype",
    },
    {
      title: "Building a marriage-ready profile that attracts serious matches",
      excerpt:
        "How to present intent, values, and lifestyle clearly so the right people can recognize alignment faster.",
      readTime: "6 min read",
      category: "Profiles",
    },
    {
      title: "Cross-ethnic marriages in Nigeria: making it work",
      excerpt:
        "A grounded guide to communication, expectations, and compatibility when two backgrounds come together.",
      readTime: "6 min read",
      category: "Relationships",
    },
  ],
  faqs: [
    {
      question: "What makes Sacred Match different from regular dating apps?",
      answer:
        "Sacred Match is designed for marriage-minded people. Matching, profile data, verification, and genotype controls are all optimized for serious commitment instead of casual discovery.",
    },
    {
      question: "Is genotype information mandatory?",
      answer:
        "No. Users can participate in genotype-aware matching, limit visibility, or keep genotype completely private.",
    },
    {
      question: "How does the matching algorithm work?",
      answer:
        "The current product direction weights shared values, marriage intent, culture, faith, location, genotype preferences, and safety signals. The exact tuning remains configurable in the backend.",
    },
    {
      question: "Can I get to know someone before sharing personal contact details?",
      answer:
        "Yes. The product direction favors protected discovery and intentional messaging before either person chooses to move the conversation off-platform.",
    },
    {
      question: "Can cross-ethnic couples use the platform?",
      answer:
        "Yes. The platform supports both strong preference matching and open discovery across backgrounds.",
    },
  ],
  connectionSteps: [
    "Create a thoughtful profile with clear marriage intent.",
    "Filter for culture, faith, location, and the deal-breakers that matter to you.",
    "Review compatibility signals before investing emotional energy.",
    "Start a respectful conversation only when the connection feels promising.",
  ],
};
