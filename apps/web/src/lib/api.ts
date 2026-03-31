import axios from "axios";
import {
  landingPageContent,
  type FaqItem,
  type LandingPageContent,
  type ResourceCard,
} from "@/content/siteContent";

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

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 5000,
});

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
    const response = await api.get<OverviewResponse>("/public/overview");
    const ethnicHighlights =
      response.data.data?.ethnicGroups?.map(
        (group) => `${group.name} (${group.region}) - ${group.focus}`,
      ) ?? landingPageContent.ethnicHighlights;

    return {
      ...landingPageContent,
      resources: mapResources(response.data.data?.resources),
      faqs: mapFaqs(response.data.data?.faqs),
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

  const response = await api.post<{ message: string }>("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload: LoginPayload) {
  if (!baseURL) {
    return {
      message:
        "Login flow is wired locally. Connect the API URL to authenticate users.",
      token: "local-development-token",
    };
  }

  const response = await api.post<{ data?: { token?: string }; message?: string }>(
    "/auth/login",
    payload,
  );

  return {
    message: response.data.message ?? "Login successful",
    token: response.data.data?.token ?? "",
  };
}
