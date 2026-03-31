const baseURL = import.meta.env.VITE_API_URL;

type RequestMethod = "GET" | "POST";

export type RegistrationIntent = {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
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
  features: Array<{
    id: string;
    title: string;
    description: string;
    cta: string;
  }>;
  safetyPillars: string[];
  ethnicHighlights: string[];
  testimonials: Array<{
    names: string;
    route: string;
    story: string;
    timeline: string;
    tag: string;
  }>;
  resources: ResourceCard[];
  faqs: FaqItem[];
  connectionSteps: string[];
};

import { landingPageContent } from "@/content/siteContent";

type OverviewPayload = {
  resources?: Array<{
    title: string;
    excerpt: string;
    readTime: string;
    category: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  ethnicGroups?: Array<{
    name: string;
    region: string;
    focus: string;
  }>;
};

type OverviewResponse = {
  data?: OverviewPayload;
};

async function apiRequest<TResponse>(
  path: string,
  options?: {
    method?: RequestMethod;
    body?: unknown;
  },
): Promise<TResponse> {
  if (!baseURL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${baseURL}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { message?: string };
      if (errorPayload.message) {
        message = errorPayload.message;
      }
    } catch {
      // Keep the fallback message when the response body is not JSON.
    }

    throw new Error(message);
  }

  return (await response.json()) as TResponse;
}

function mapResources(resources?: OverviewPayload["resources"]): ResourceCard[] {
  return (
    resources?.map((resource) => ({
      title: resource.title,
      excerpt: resource.excerpt,
      readTime: resource.readTime,
      category: resource.category,
    })) ?? landingPageContent.resources
  );
}

function mapFaqs(faqs?: OverviewPayload["faqs"]): FaqItem[] {
  return (
    faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) ?? landingPageContent.faqs
  );
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  if (!baseURL) {
    return landingPageContent;
  }

  try {
    const response = await apiRequest<OverviewResponse>("/public/overview");
    const ethnicHighlights =
      response.data?.ethnicGroups?.map(
        (group) => `${group.name} (${group.region}) - ${group.focus}`,
      ) ?? landingPageContent.ethnicHighlights;

    return {
      ...landingPageContent,
      resources: mapResources(response.data?.resources),
      faqs: mapFaqs(response.data?.faqs),
      ethnicHighlights,
    };
  } catch {
    return landingPageContent;
  }
}

export async function submitRegistrationIntent(payload: RegistrationIntent) {
  if (!baseURL) {
    return {
      message:
        "Signup flow is wired locally. Connect the API URL to persist registrations.",
    };
  }

  return apiRequest<{ message: string }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function loginUser(payload: LoginPayload) {
  if (!baseURL) {
    return {
      message:
        "Login flow is wired locally. Connect the API URL to authenticate users.",
      token: "local-development-token",
    };
  }

  const response = await apiRequest<{ data?: { token?: string }; message?: string }>(
    "/auth/login",
    {
      method: "POST",
      body: payload,
    },
  );

  return {
    message: response.message ?? "Login successful",
    token: response.data?.token ?? "",
  };
}
