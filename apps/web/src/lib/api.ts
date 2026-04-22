import { landingPageContent } from "@/content/siteContent";

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

export type ApiConversation = {
  id: string;
  updatedAt: string;
  participants: Array<{
    userId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      photos: Array<{ url: string }>;
    };
  }>;
  messages: Array<{
    id: string;
    body: string;
    senderId: string;
    sentAt: string;
    status: string;
  }>;
  _count?: { messages: number };
};

export type ApiMessage = {
  id: string;
  body: string;
  senderId: string;
  sentAt: string;
  deliveredAt?: string | null;
  readAt?: string | null;
  status: string;
};

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
  return window.localStorage.getItem("spousia-token");
}

function requireBaseURL() {
  if (!baseURL) {
    throw new Error("API is not configured. Please set VITE_API_URL.");
  }
  return baseURL;
}

async function apiRequest<TResponse>(
  path: string,
  options?: {
    method?: RequestMethod;
    body?: unknown;
    auth?: boolean;
  },
): Promise<TResponse> {
  const url = requireBaseURL();
  const includeAuth = options?.auth !== false;
  const token = includeAuth ? getStoredToken() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${url}${path}`, {
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
  return apiRequest<{ message: string }>("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function loginUser(payload: LoginPayload) {
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

export async function loginWithGoogle(): Promise<{ token: string; role: string | null; email?: string }> {
  // Dynamically import firebase to avoid breaking builds without firebase config
  const { signInWithGoogle } = await import("./firebase");
  const idToken = await signInWithGoogle();

  const response = await apiRequest<{
    data?: { token?: string; user?: { role?: string; email?: string } };
    message?: string;
  }>("/auth/google", {
    method: "POST",
    body: { idToken },
    auth: false,
  });

  return {
    token: response.data?.token ?? "",
    role: response.data?.user?.role ?? null,
    email: response.data?.user?.email,
  };
}

export async function getMe() {
  return apiRequest<{
    ok: boolean;
    data?: { id: string; email: string; firstName: string; lastName: string; role: string };
  }>("/auth/me");
}

// ─── Messaging ───────────────────────────────────────────────────────────────

export async function getConversations(): Promise<ApiConversation[]> {
  const response = await apiRequest<{ ok: boolean; data: ApiConversation[] }>(
    "/messaging/conversations",
  );
  return response.data ?? [];
}

export async function getMessages(conversationId: string, page = 0): Promise<ApiMessage[]> {
  const response = await apiRequest<{
    ok: boolean;
    data: ApiMessage[];
    meta: { total: number; page: number; limit: number };
  }>(`/messaging/conversations/${conversationId}/messages?page=${page}`);
  return response.data ?? [];
}

export async function sendMessageToConversation(
  conversationId: string,
  body: string,
): Promise<ApiMessage> {
  const response = await apiRequest<{ ok: boolean; data: ApiMessage }>(
    `/messaging/conversations/${conversationId}/messages`,
    { method: "POST", body: { body } },
  );
  return response.data;
}
