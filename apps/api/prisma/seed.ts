import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ethnicGroups = [
  {
    name: "Yoruba",
    slug: "yoruba",
    region: "South West",
    summary: "A major Nigerian identity with strong emphasis on values, respect, and long-term compatibility.",
    bridePriceLabel: null,
    ceremonyStyle: null
  },
  {
    name: "Igbo",
    slug: "igbo",
    region: "South East",
    summary: "A major Nigerian identity where clarity, ambition, and family background can shape compatibility decisions.",
    bridePriceLabel: null,
    ceremonyStyle: null
  },
  {
    name: "Hausa-Fulani",
    slug: "hausa-fulani",
    region: "North West",
    summary: "A major Nigerian identity where faith, respect, and long-term intent can be central to serious matching.",
    bridePriceLabel: null,
    ceremonyStyle: null
  },
  {
    name: "Efik",
    slug: "efik",
    region: "South South",
    summary: "A major Nigerian identity associated with warmth, confidence, and strong social presence.",
    bridePriceLabel: null,
    ceremonyStyle: null
  },
  {
    name: "Tiv",
    slug: "tiv",
    region: "North Central",
    summary: "A major Nigerian identity where directness, practicality, and clear expectations can matter in compatibility.",
    bridePriceLabel: null,
    ceremonyStyle: null
  }
] as const;

const religions = [
  {
    name: "Christianity",
    slug: "christianity",
    description: "Faith visibility and denomination-aware matching for Christian users."
  },
  {
    name: "Islam",
    slug: "islam",
    description: "Faith-aligned matching for Muslim users who want serious marriage-minded connections."
  },
  {
    name: "Traditional",
    slug: "traditional",
    description: "Heritage-aware identity fields for users whose beliefs are part of compatibility."
  }
] as const;

const faqEntries = [
  {
    question: "What makes Sacred Match different from regular dating apps?",
    answer: "Sacred Match is designed for marriage-minded people. Matching, profile data, verification, and genotype controls are all optimized for serious commitment instead of casual discovery.",
    category: "Product",
    isFeatured: true,
    sortOrder: 1
  },
  {
    question: "Is genotype information mandatory?",
    answer: "No. Users can participate in genotype-aware matching, limit visibility, or keep genotype completely private.",
    category: "Genotype",
    isFeatured: true,
    sortOrder: 2
  },
  {
    question: "How does the matching algorithm work?",
    answer: "The current product direction weights shared values, marriage intent, culture, faith, location, genotype preferences, and safety signals. The exact tuning remains configurable in the backend.",
    category: "Matching",
    isFeatured: true,
    sortOrder: 3
  },
  {
    question: "Can I get to know someone before sharing personal contact details?",
    answer: "Yes. The product direction favors protected discovery and intentional messaging before either person chooses to move the conversation off-platform.",
    category: "Privacy",
    isFeatured: true,
    sortOrder: 4
  },
  {
    question: "Can cross-ethnic couples use the platform?",
    answer: "Yes. The platform supports both strong preference matching and open discovery across backgrounds.",
    category: "Matching",
    isFeatured: true,
    sortOrder: 5
  }
] as const;

async function main() {
  for (const ethnicGroup of ethnicGroups) {
    await prisma.ethnicGroup.upsert({
      where: {
        slug: ethnicGroup.slug
      },
      update: ethnicGroup,
      create: ethnicGroup
    });
  }

  for (const religion of religions) {
    await prisma.religion.upsert({
      where: {
        slug: religion.slug
      },
      update: religion,
      create: religion
    });
  }

  for (const faq of faqEntries) {
    await prisma.faqEntry.upsert({
      where: {
        question: faq.question
      },
      update: faq,
      create: faq
    });
  }

  const demoPasswordHash = await bcrypt.hash("SacredMatch123!", 12);

  const demoUser = await prisma.user.upsert({
    where: {
      email: "demo@sacred-match.ng"
    },
    update: {
      phone: "+2348011112233",
      passwordHash: demoPasswordHash,
      firstName: "Demo",
      lastName: "Member",
      status: "ACTIVE"
    },
    create: {
      email: "demo@sacred-match.ng",
      phone: "+2348011112233",
      passwordHash: demoPasswordHash,
      firstName: "Demo",
      lastName: "Member",
      status: "ACTIVE"
    }
  });

  const profile = await prisma.userProfile.upsert({
    where: {
      userId: demoUser.id
    },
    update: {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      occupation: "Product Manager",
      educationLevel: "Bachelors",
      denomination: "Christian",
      maritalIntent: "Marriage within 12 months",
      familyInvolvementLevel: null,
      ceremonyPreference: null,
      visibility: "EVERYONE"
    },
    create: {
      userId: demoUser.id,
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      occupation: "Product Manager",
      educationLevel: "Bachelors",
      denomination: "Christian",
      maritalIntent: "Marriage within 12 months",
      familyInvolvementLevel: null,
      ceremonyPreference: null,
      visibility: "EVERYONE"
    }
  });

  await prisma.userPreference.upsert({
    where: {
      userId: demoUser.id
    },
    update: {
      preferredAgeMin: 24,
      preferredAgeMax: 36,
      preferredStates: ["Lagos", "Abuja", "Oyo"],
      openToAllEthnicGroups: true,
      interfaithOk: true,
      minimumEducation: "Bachelors",
      desiredCeremonyTypes: [],
      genotypeVisibility: "MATCHES_ONLY",
      allowGuestPreview: true
    },
    create: {
      userId: demoUser.id,
      preferredAgeMin: 24,
      preferredAgeMax: 36,
      preferredStates: ["Lagos", "Abuja", "Oyo"],
      openToAllEthnicGroups: true,
      interfaithOk: true,
      minimumEducation: "Bachelors",
      desiredCeremonyTypes: [],
      genotypeVisibility: "MATCHES_ONLY",
      allowGuestPreview: true
    }
  });

  await prisma.notificationSetting.upsert({
    where: {
      userId: demoUser.id
    },
    update: {
      emailNewMatches: true,
      emailMessages: true,
      emailIntroductions: true,
      pushEnabled: true,
      smsEnabled: false,
      frequency: "INSTANT"
    },
    create: {
      userId: demoUser.id,
      emailNewMatches: true,
      emailMessages: true,
      emailIntroductions: true,
      pushEnabled: true,
      smsEnabled: false,
      frequency: "INSTANT"
    }
  });

  await prisma.genotypeInfo.upsert({
    where: {
      userId: demoUser.id
    },
    update: {
      genotype: "AA",
      visibility: "MATCHES_ONLY",
      isVerified: true,
      laboratoryName: "Sacred Match Demo Lab"
    },
    create: {
      userId: demoUser.id,
      genotype: "AA",
      visibility: "MATCHES_ONLY",
      isVerified: true,
      laboratoryName: "Sacred Match Demo Lab"
    }
  });

  const yoruba = await prisma.ethnicGroup.findUnique({
    where: {
      slug: "yoruba"
    }
  });

  const christianity = await prisma.religion.findUnique({
    where: {
      slug: "christianity"
    }
  });

  if (yoruba) {
    await prisma.userEthnicity.upsert({
      where: {
        profileId_ethnicGroupId: {
          profileId: profile.id,
          ethnicGroupId: yoruba.id
        }
      },
      update: {
        isPrimary: true
      },
      create: {
        profileId: profile.id,
        ethnicGroupId: yoruba.id,
        isPrimary: true
      }
    });
  }

  if (christianity) {
    await prisma.userReligion.upsert({
      where: {
        profileId_religionId: {
          profileId: profile.id,
          religionId: christianity.id
        }
      },
      update: {
        isPrimary: true
      },
      create: {
        profileId: profile.id,
        religionId: christianity.id,
        isPrimary: true
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

