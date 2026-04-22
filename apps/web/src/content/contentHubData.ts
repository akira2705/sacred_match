export type BlogArticle = {
  slug: string;
  title: string;
  category: "Culture" | "Relationships" | "Safety" | "Genotype" | "Product";
  author: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  image: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export type CategorizedFaq = {
  category: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "culture-fit-beyond-swipe-right",
    title: "Culture Fit Beyond Swipe Right",
    category: "Culture",
    author: "Spousia Editorial",
    publishedAt: "March 28, 2026",
    readTime: "6 min read",
    excerpt: "Why serious marriage-minded matching in Nigeria needs more than photos, age, and location.",
    image: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?auto=format&fit=crop&fm=jpg&q=60&w=1800",
    sections: [
      {
        heading: "Compatibility starts before messaging",
        body: [
          "Marriage-minded discovery works best when users can see values, faith, location, and long-term intent before they invest emotionally.",
          "That reduces wasted conversations and makes every connection more deliberate."
        ]
      },
      {
        heading: "Culture should inform, not trap",
        body: [
          "Ethnic identity matters for many Nigerians, but the product should support both strong preferences and openness across backgrounds.",
          "The right product makes those signals clear without turning them into stereotypes."
        ]
      }
    ]
  },
  {
    slug: "genotype-conversations-early",
    title: "Why Genotype Conversations Need To Happen Early",
    category: "Genotype",
    author: "Spousia Health Desk",
    publishedAt: "March 24, 2026",
    readTime: "5 min read",
    excerpt: "The healthiest time to talk about genotype is before a strong relationship makes hard decisions harder.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&fm=jpg&q=60&w=1800",
    sections: [
      {
        heading: "Clarity beats avoidance",
        body: [
          "Couples deserve a calm, private way to understand AA, AS, and SS compatibility before the stakes feel personal and urgent.",
          "A good product helps them learn and decide without shame or panic."
        ]
      },
      {
        heading: "Privacy still matters",
        body: [
          "Not everyone wants genotype visible immediately. Visibility controls are part of trust, not a nice-to-have.",
          "That is why genotype belongs in product design, not in a side conversation."
        ]
      }
    ]
  },
  {
    slug: "how-to-spot-romance-scams-fast",
    title: "How To Spot Romance Scams Fast",
    category: "Safety",
    author: "Safety Team",
    publishedAt: "March 19, 2026",
    readTime: "7 min read",
    excerpt: "The earliest warning signs usually show up in pacing, money requests, and pressure around moving off-platform.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=jpg&q=60&w=1800",
    sections: [
      {
        heading: "Pressure is a signal",
        body: [
          "Scammers often try to speed up intimacy, move conversations off-platform, or create urgency around money and pity.",
          "Healthy connections do not need that kind of pressure."
        ]
      },
      {
        heading: "Use reporting tools early",
        body: [
          "Blocking and reporting should be simple, visible, and stigma-free.",
          "If something feels wrong, the safest move is to pause and report."
        ]
      }
    ]
  },
  {
    slug: "building-a-profile-serious-people-respond-to",
    title: "Building A Profile Serious People Respond To",
    category: "Relationships",
    author: "Product Team",
    publishedAt: "March 15, 2026",
    readTime: "6 min read",
    excerpt: "The right profile is specific, calm, and honest about values, not loud or performative.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&fm=jpg&q=60&w=1800",
    sections: [
      {
        heading: "Specificity creates trust",
        body: [
          "Profiles that communicate faith, lifestyle, location, and marriage intent clearly tend to attract more serious conversations.",
          "People should know what kind of connection you are available for."
        ]
      },
      {
        heading: "Photos should feel real",
        body: [
          "A small set of clear, recent, natural photos beats overly polished images that create doubt.",
          "Verification and photo review help maintain trust for everyone."
        ]
      }
    ]
  }
];

export const categorizedFaqs: CategorizedFaq[] = [
  {
    category: "How It Works",
    items: [
      {
        question: "What makes Spousia different from regular dating apps?",
        answer: "Spousia is designed for marriage-minded people. Matching, profile data, verification, and genotype controls are all optimized for serious commitment instead of casual discovery."
      },
      {
        question: "Do I need to complete onboarding before browsing matches?",
        answer: "Yes. The onboarding flow helps the system understand culture, faith, intent, and safety settings before discovery starts."
      }
    ]
  },
  {
    category: "Matching",
    items: [
      {
        question: "How does the match score work?",
        answer: "Scores combine cultural alignment, personal fit, genotype compatibility when shared, and profile quality signals."
      },
      {
        question: "Can cross-ethnic couples use the platform?",
        answer: "Yes. Users can keep strong preferences or stay open across backgrounds."
      }
    ]
  },
  {
    category: "Messaging",
    items: [
      {
        question: "Can I message someone before sharing my phone number?",
        answer: "Yes. The product is designed to keep early communication inside the platform until both people are comfortable."
      },
      {
        question: "What happens when I block someone?",
        answer: "They can no longer contact you, and the conversation is removed from your active inbox."
      }
    ]
  },
  {
    category: "Genotype",
    items: [
      {
        question: "Is genotype mandatory?",
        answer: "No. Users can add it, control visibility, or skip it while still using the platform."
      },
      {
        question: "Can I keep my genotype private?",
        answer: "Yes. You can keep it private, show it only to serious matches, or make it visible more broadly."
      }
    ]
  },
  {
    category: "Safety",
    items: [
      {
        question: "How do I report a user?",
        answer: "Use the report action from a profile, conversation, or the safety center and include as much context as you can."
      },
      {
        question: "Do you verify IDs and photos?",
        answer: "The product direction includes email, phone, ID, photo, and genotype verification states so trust is visible."
      }
    ]
  },
  {
    category: "Account",
    items: [
      {
        question: "Can I delete my account and download my data?",
        answer: "Yes. Settings include data export and permanent account deletion controls."
      },
      {
        question: "Can I hide my last seen and read receipts?",
        answer: "Yes. Privacy settings include visibility, activity, and read receipt controls."
      }
    ]
  }
];

export const helpTopics = [
  "How does the matching algorithm work?",
  "How do I verify my account?",
  "How do I report a user?",
  "How do I reset my password?",
  "How do I control who sees my genotype?",
  "How do I block someone in messages?"
];

export const supportSubjects = [
  "Account",
  "Safety",
  "Bug Report",
  "Feature Request",
  "Verification",
  "Other"
];

export const safetyTips = [
  "Never send money to someone you have only met online.",
  "Keep early conversations on-platform until trust is earned.",
  "Use video calls and verification badges before meeting in person.",
  "Tell a trusted person where you are going for a first meeting.",
  "Report pressure, threats, or suspicious behavior immediately."
];
