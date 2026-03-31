import axios from "axios";
import { landingPageContent, } from "@/content/siteContent";
const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL,
    timeout: 5000,
});
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
        const response = await api.get("/public/overview");
        const ethnicHighlights = response.data.data?.ethnicGroups?.map((group) => `${group.name} (${group.region}) - ${group.focus}`) ?? landingPageContent.ethnicHighlights;
        return {
            ...landingPageContent,
            resources: mapResources(response.data.data?.resources),
            faqs: mapFaqs(response.data.data?.faqs),
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
    const response = await api.post("/auth/register", payload);
    return response.data;
}
export async function loginUser(payload) {
    if (!baseURL) {
        return {
            message: "Login flow is wired locally. Connect the API URL to authenticate users.",
            token: "local-development-token",
        };
    }
    const response = await api.post("/auth/login", payload);
    return {
        message: response.data.message ?? "Login successful",
        token: response.data.data?.token ?? "",
    };
}
