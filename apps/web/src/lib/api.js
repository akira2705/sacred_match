const baseURL = import.meta.env.VITE_API_URL;
import { landingPageContent } from "@/content/siteContent";
async function apiRequest(path, options) {
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
            const errorPayload = (await response.json());
            if (errorPayload.message) {
                message = errorPayload.message;
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
        const response = await apiRequest("/public/overview");
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
    });
}
export async function loginUser(payload) {
    if (!baseURL) {
        return {
            message: "Login flow is wired locally. Connect the API URL to authenticate users.",
            token: "local-development-token",
        };
    }
    const response = await apiRequest("/auth/login", {
        method: "POST",
        body: payload,
    });
    return {
        message: response.message ?? "Login successful",
        token: response.data?.token ?? "",
    };
}
