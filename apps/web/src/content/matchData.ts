import { decorImages, weddingImages } from "./visuals";

export type MatchProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  state: string;
  ethnicGroup: string;
  religion: string;
  marriageTypes: string[];
  score: number;
  bio: string;
  lastActive: string;
  photos: string[];
  primaryLanguage: string;
  verificationBadges: string[];
  compatibility: {
    label: string;
    tone: "good" | "caution" | "risk";
    myGenotype: string;
    theirGenotype: string;
    summary: string;
  };
  breakdown: {
    cultural: number;
    personal: number;
    genotype: number;
    engagement: number;
  };
  details: {
    height: string;
    bodyType: string;
    education: string;
    occupation: string;
    income: string;
    timeline: string;
    children: string;
    smoking: string;
    alcohol: string;
    interests: string[];
    practiceLevel: string;
    region: string;
    culturalInterest: string;
  };
};

export type ConnectionBucket = {
  pending: MatchProfile[];
  accepted: MatchProfile[];
  rejected: MatchProfile[];
  blocked: MatchProfile[];
};

export type ConversationMessage = {
  id: string;
  sender: "me" | "them";
  body: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: string;
  participantId: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  archived?: boolean;
  messages: ConversationMessage[];
};

export const matchProfiles: MatchProfile[] = [
  {
    id: "adaeze-okafor",
    name: "Adaeze Okafor",
    age: 29,
    location: "Lekki, Lagos",
    state: "Lagos",
    ethnicGroup: "Igbo",
    religion: "Christianity",
    marriageTypes: ["Christian Wedding", "Civil Marriage"],
    score: 94,
    bio: "Product strategist who values warmth, faith, and a steady path toward marriage.",
    lastActive: "Active now",
    photos: [weddingImages[1].src, weddingImages[0].src, decorImages[0].src],
    primaryLanguage: "Igbo, English",
    verificationBadges: ["Email", "Phone", "ID", "Photos"],
    compatibility: {
      label: "Good match",
      tone: "good",
      myGenotype: "AA",
      theirGenotype: "AA",
      summary: "Perfect genotype pairing"
    },
    breakdown: {
      cultural: 35,
      personal: 29,
      genotype: 20,
      engagement: 10
    },
    details: {
      height: "5'7\"",
      bodyType: "Athletic",
      education: "MBA",
      occupation: "Product Strategist",
      income: "?900k - ?1.5m / month",
      timeline: "6-12 months",
      children: "No, wants children",
      smoking: "No",
      alcohol: "Occasionally",
      interests: ["Reading", "Travel", "Community work"],
      practiceLevel: "Practicing",
      region: "South East roots, Lagos based",
      culturalInterest: "High"
    }
  },
  {
    id: "mariam-bello",
    name: "Mariam Bello",
    age: 31,
    location: "Wuse, Abuja",
    state: "FCT",
    ethnicGroup: "Hausa-Fulani",
    religion: "Islam",
    marriageTypes: ["Civil Marriage", "Customary Marriage"],
    score: 89,
    bio: "Grounded, family-minded, and looking for a calm, respectful connection with long-term intent.",
    lastActive: "Last seen 2 hours ago",
    photos: [weddingImages[2].src, weddingImages[3].src, decorImages[1].src],
    primaryLanguage: "Hausa, English",
    verificationBadges: ["Email", "Phone", "Photos"],
    compatibility: {
      label: "Caution",
      tone: "caution",
      myGenotype: "AA",
      theirGenotype: "AS",
      summary: "Compatible with counseling awareness"
    },
    breakdown: {
      cultural: 33,
      personal: 27,
      genotype: 19,
      engagement: 10
    },
    details: {
      height: "5'6\"",
      bodyType: "Curvy",
      education: "BSc Economics",
      occupation: "Finance Officer",
      income: "?600k - ?900k / month",
      timeline: "0-6 months",
      children: "No, wants children",
      smoking: "No",
      alcohol: "No",
      interests: ["Cooking", "Faith gatherings", "Travel"],
      practiceLevel: "Very religious",
      region: "North West roots, Abuja based",
      culturalInterest: "High"
    }
  },
  {
    id: "tolani-adeyemi",
    name: "Tolani Adeyemi",
    age: 28,
    location: "Ibadan, Oyo",
    state: "Oyo",
    ethnicGroup: "Yoruba",
    religion: "Christianity",
    marriageTypes: ["Customary Marriage", "Christian Wedding"],
    score: 91,
    bio: "Creative professional who wants a stable, values-driven relationship that can grow into marriage.",
    lastActive: "Last seen 35 minutes ago",
    photos: [weddingImages[0].src, weddingImages[1].src, decorImages[2].src],
    primaryLanguage: "Yoruba, English",
    verificationBadges: ["Email", "Phone", "ID"],
    compatibility: {
      label: "Good match",
      tone: "good",
      myGenotype: "AA",
      theirGenotype: "AA",
      summary: "Low-risk genotype outlook"
    },
    breakdown: {
      cultural: 34,
      personal: 28,
      genotype: 20,
      engagement: 9
    },
    details: {
      height: "5'5\"",
      bodyType: "Slim",
      education: "BSc Architecture",
      occupation: "Interior Designer",
      income: "?500k - ?800k / month",
      timeline: "6-12 months",
      children: "No, wants children",
      smoking: "No",
      alcohol: "Occasionally",
      interests: ["Design", "Photography", "Music"],
      practiceLevel: "Practicing",
      region: "South West",
      culturalInterest: "Medium"
    }
  },
  {
    id: "daniel-uduak",
    name: "Daniel Uduak",
    age: 33,
    location: "Uyo, Akwa Ibom",
    state: "Akwa Ibom",
    ethnicGroup: "Efik",
    religion: "Christianity",
    marriageTypes: ["Civil Marriage", "Christian Wedding"],
    score: 84,
    bio: "Engineer who values emotional maturity, honesty, and steady planning toward marriage.",
    lastActive: "Last seen yesterday",
    photos: [weddingImages[3].src, weddingImages[2].src, decorImages[0].src],
    primaryLanguage: "Efik, English",
    verificationBadges: ["Email", "Phone", "ID", "Photos", "Genotype"],
    compatibility: {
      label: "Good match",
      tone: "good",
      myGenotype: "AA",
      theirGenotype: "AA",
      summary: "Perfect genotype pairing"
    },
    breakdown: {
      cultural: 31,
      personal: 26,
      genotype: 20,
      engagement: 7
    },
    details: {
      height: "5'10\"",
      bodyType: "Average",
      education: "MEng Civil Engineering",
      occupation: "Project Engineer",
      income: "?1.2m - ?1.8m / month",
      timeline: "1-2 years",
      children: "No, wants children",
      smoking: "No",
      alcohol: "Occasionally",
      interests: ["Football", "Travel", "Volunteering"],
      practiceLevel: "Practicing",
      region: "South South",
      culturalInterest: "Medium"
    }
  }
];

export const dashboardStats = [
  { label: "Matches available", value: "14" },
  { label: "Pending connections", value: "5" },
  { label: "Unread messages", value: "3" },
  { label: "Profile views", value: "27" }
];

export const connectionBuckets: ConnectionBucket = {
  pending: [matchProfiles[1], matchProfiles[3]],
  accepted: [matchProfiles[0], matchProfiles[2]],
  rejected: [matchProfiles[3]],
  blocked: [matchProfiles[1]]
};

export const conversations: Conversation[] = [
  {
    id: "ayo-chat",
    participantId: "adaeze-okafor",
    name: "Adaeze Okafor",
    avatar: matchProfiles[0].photos[0],
    online: true,
    lastSeen: "Active now",
    lastMessage: "I like that we both care about genotype clarity early.",
    lastTimestamp: "2 hours ago",
    unreadCount: 2,
    messages: [
      { id: "m1", sender: "them", body: "Hi, I liked how clear your profile was about intent.", time: "2:14 PM" },
      { id: "m2", sender: "me", body: "Thank you. I try to keep things honest from the start.", time: "2:17 PM", status: "read" },
      { id: "m3", sender: "them", body: "Same here. I also appreciate that the genotype conversation is not awkward on this app.", time: "2:20 PM" },
      { id: "m4", sender: "me", body: "That matters to me too. Better clarity than avoidable surprises later.", time: "2:23 PM", status: "read" }
    ]
  },
  {
    id: "mariam-chat",
    participantId: "mariam-bello",
    name: "Mariam Bello",
    avatar: matchProfiles[1].photos[0],
    online: false,
    lastSeen: "Last seen 2 hours ago",
    lastMessage: "Let me know what your ideal timeline looks like.",
    lastTimestamp: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: "m5", sender: "them", body: "I am looking for something intentional, not endless talking.", time: "Yesterday 8:10 PM" },
      { id: "m6", sender: "me", body: "Same. I prefer clarity over vague chatting.", time: "Yesterday 8:13 PM", status: "delivered" }
    ]
  },
  {
    id: "tolani-chat",
    participantId: "tolani-adeyemi",
    name: "Tolani Adeyemi",
    avatar: matchProfiles[2].photos[0],
    online: true,
    lastSeen: "Active now",
    lastMessage: "Have you lived in Lagos long?",
    lastTimestamp: "5 minutes ago",
    unreadCount: 1,
    messages: [
      { id: "m7", sender: "me", body: "You seem thoughtful. What usually matters most to you in a relationship?", time: "10:02 AM", status: "read" },
      { id: "m8", sender: "them", body: "Consistency, emotional maturity, and shared faith.", time: "10:05 AM" }
    ]
  }
];
