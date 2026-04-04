const baseURL = import.meta.env.VITE_API_URL;

type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

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

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("sacred-match-token");
}

async function apiRequest<TResponse>(
  path: string,
  options?: {
    method?: RequestMethod;
    body?: unknown;
    auth?: boolean; // default true — include token if available
  },
): Promise<TResponse> {
  if (!baseURL) {
    throw new Error("API URL is not configured");
  }

  const includeAuth = options?.auth !== false;
  const token = includeAuth ? getStoredToken() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${path}`, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { message?: string; error?: string };
      if (errorPayload.message) {
        message = errorPayload.message;
      } else if (errorPayload.error) {
        message = errorPayload.error;
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
    const response = await apiRequest<OverviewResponse>("/public/overview", { auth: false });
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
    auth: false,
  });
}

export async function loginUser(payload: LoginPayload) {
  if (!baseURL) {
    return {
      message: "Login flow is wired locally. Connect the API URL to authenticate users.",
      token: "local-development-token",
      role: null as string | null,
    };
  }

  const response = await apiRequest<{
    data?: { token?: string; user?: { role?: string } };
    message?: string;
  }>("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });

  return {
    message: response.message ?? "Login successful",
    token: response.data?.token ?? "",
    role: response.data?.user?.role ?? null,
  };
}

export async function getMe() {
  return apiRequest<{
    ok: boolean;
    data?: { id: string; email: string; firstName: string; lastName: string; role: string };
  }>("/auth/me");
}
