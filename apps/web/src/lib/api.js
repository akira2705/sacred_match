const baseURL = import.meta.env.VITE_API_URL;
import { landingPageContent } from "@/content/siteContent";
function getStoredToken() {
    if (typeof window === "undefined")
        return null;
    return window.localStorage.getItem("sacred-match-token");
}
async function apiRequest(path, options) {
    if (!baseURL) {
        throw new Error("API URL is not configured");
    }
    const includeAuth = options?.auth !== false;
    const token = includeAuth ? getStoredToken() : null;
    const headers = {
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
            const errorPayload = (await response.json());
            if (errorPayload.message) {
                message = errorPayload.message;
            }
            else if (errorPayload.error) {
                message = errorPayload.error;
            }
        }
        catch {
            // Keep the fallback message when the response body is not JSON.
        }
        throw new Error(message);
    }
    return (await response.json());
}
function mapResources(resources) {
    return (resources?.map((resource) => ({
        title: resource.title,
        excerpt: resource.excerpt,
        readTime: resource.readTime,
        category: resource.category,
    })) ?? landingPageContent.resources);
}
function mapFaqs(faqs) {
    return (faqs?.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
    })) ?? landingPageContent.faqs);
}
export async function getLandingPageContent() {
    if (!baseURL) {
        return landingPageContent;
    }
    try {
        const response = await apiRequest("/public/overview", { auth: false });
        const ethnicHighlights = response.data?.ethnicGroups?.map((group) => `${group.name} (${group.region}) - ${group.focus}`) ?? landingPageContent.ethnicHighlights;
        return {
            ...landingPageContent,
            resources: mapResources(response.data?.resources),
            faqs: mapFaqs(response.data?.faqs),
            ethnicHighlights,
        };
    }
    catch {
        return landingPageContent;
    }
}
export async function submitRegistrationIntent(payload) {
    if (!baseURL) {
        return {
            message: "Signup flow is wired locally. Connect the API URL to persist registrations.",
        };
    }
    return apiRequest("/auth/register", {
        method: "POST",
        body: payload,
        auth: false,
    });
}
export async function loginUser(payload) {
    if (!baseURL) {
        return {
            message: "Login flow is wired locally. Connect the API URL to authenticate users.",
            token: "local-development-token",
            role: null,
        };
    }
    const response = await apiRequest("/auth/login", {
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
    return apiRequest("/auth/me");
}
