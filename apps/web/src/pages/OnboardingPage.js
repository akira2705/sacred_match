import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { bodyTypes, educationLevels, ethnicGroupsByRegion, genotypeOptions, genotypePrivacyOptions, idTypes, incomeRanges, lgasByState, marriageTypes, practiceLevels, religions, states, testingLabs, timelines } from "@/content/onboardingData";
import { loadOnboardingDraft, saveOnboardingDraft } from "@/lib/profileStorage";
const steps = [
    "Personal Info",
    "Ethnic Group",
    "Religion",
    "Marriage Preference",
    "Photo Upload",
    "Genotype",
    "ID Verification",
    "Complete"
];
function percentComplete(draft) {
    let score = 50;
    if (draft.personal.bio)
        score += 8;
    if (draft.ethnicity.ethnicGroup || draft.ethnicity.openToAllEthnicities)
        score += 8;
    if (draft.religion.faith)
        score += 8;
    if (draft.marriage.marriageTypes.length > 0)
        score += 8;
    if (draft.photos.length >= 2)
        score += 8;
    if (draft.genotype.tested !== "later")
        score += 5;
    if (draft.verification.idType && draft.verification.idNumber)
        score += 5;
    return Math.min(score, 96);
}
export function OnboardingPage({ mode = "create" }) {
    const navigate = useNavigate();
    const [draft, setDraft] = useState(() => loadOnboardingDraft());
    const [step, setStep] = useState(0);
    const [ethnicQuery, setEthnicQuery] = useState("");
    const [labState, setLabState] = useState("Lagos");
    useEffect(() => {
        saveOnboardingDraft(draft);
    }, [draft]);
    const visibleEthnicGroups = useMemo(() => {
        const query = ethnicQuery.trim().toLowerCase();
        if (!query)
            return ethnicGroupsByRegion;
        return ethnicGroupsByRegion
            .map((region) => ({
            ...region,
            groups: region.groups.filter((group) => group.toLowerCase().includes(query))
        }))
            .filter((region) => region.groups.length > 0);
    }, [ethnicQuery]);
    const visibleLabs = testingLabs.filter((lab) => lab.state === labState);
    const currentLgas = lgasByState[draft.personal.state] ?? [];
    const strength = percentComplete(draft);
    function update(section, next) {
        setDraft((current) => ({
            ...current,
            [section]: {
                ...current[section],
                ...next
            }
        }));
    }
    function toggleMarriageType(type) {
        const existing = draft.marriage.marriageTypes;
        const next = existing.includes(type)
            ? existing.filter((item) => item !== type)
            : [...existing, type];
        update("marriage", { marriageTypes: next });
    }
    function handlePhotoUpload(files) {
        if (!files)
            return;
        const incoming = Array.from(files).slice(0, 5).map((file) => ({
            name: file.name,
            status: "Pending review"
        }));
        setDraft((current) => ({
            ...current,
            photos: [...current.photos, ...incoming].slice(0, 5)
        }));
    }
    function reorderPhoto(index, direction) {
        setDraft((current) => {
            const next = [...current.photos];
            const target = index + direction;
            if (!next[target])
                return current;
            [next[index], next[target]] = [next[target], next[index]];
            return { ...current, photos: next };
        });
    }
    function nextStep() {
        if (step === steps.length - 2) {
            setDraft((current) => ({ ...current, completed: true }));
            setStep(steps.length - 1);
            return;
        }
        setStep((current) => Math.min(current + 1, steps.length - 1));
    }
    function previousStep() {
        setStep((current) => Math.max(current - 1, 0));
    }
    function finish() {
        navigate("/onboarding/intent");
    }
    return (_jsxs("div", { children: [_jsx("section", { className: "section-shell pb-10 pt-16", children: _jsx(SectionHeading, { eyebrow: mode === "edit" ? "Edit profile" : "Onboarding flow", title: mode === "edit" ? "Update your profile details" : "Complete your 7-step marriage profile", description: "Every step is auto-saved as you go so the product can shape better matches, stronger safety controls, and clearer compatibility signals." }) }), _jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "surface-card p-6 sm:p-8", children: [_jsx("div", { className: "flex flex-wrap gap-3", children: steps.map((label, index) => (_jsxs("div", { className: `rounded-full px-4 py-2 text-sm font-semibold ${index === step ? "bg-brand-forest text-white" : index < step ? "bg-brand-moss/15 text-brand-forest" : "bg-brand-forest/5 text-brand-forest/70"}`, children: [index + 1, ". ", label] }, label))) }), _jsx("div", { className: "mt-6 h-3 rounded-full bg-brand-forest/10", children: _jsx("div", { className: "h-3 rounded-full bg-brand-clay", style: { width: `${((step + 1) / steps.length) * 100}%` } }) })] }) }), _jsx("section", { className: "section-shell pt-0", children: _jsx(RevealOnScroll, { children: _jsxs("div", { className: "surface-card p-8 sm:p-10", children: [step === 0 ? (_jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Date of birth" }), _jsx("input", { className: "input-shell", type: "date", value: draft.personal.dateOfBirth, onChange: (e) => update("personal", { dateOfBirth: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Gender" }), _jsx("input", { className: "input-shell", value: draft.personal.gender, onChange: (e) => update("personal", { gender: e.target.value }), placeholder: "Female" })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Height" }), _jsx("input", { className: "input-shell", value: draft.personal.height, onChange: (e) => update("personal", { height: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Body type" }), _jsx("select", { className: "input-shell", value: draft.personal.bodyType, onChange: (e) => update("personal", { bodyType: e.target.value }), children: bodyTypes.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "State" }), _jsx("select", { className: "input-shell", value: draft.personal.state, onChange: (e) => update("personal", { state: e.target.value, lga: lgasByState[e.target.value]?.[0] ?? "" }), children: states.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "LGA" }), _jsx("select", { className: "input-shell", value: draft.personal.lga, onChange: (e) => update("personal", { lga: e.target.value }), children: currentLgas.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Education" }), _jsx("select", { className: "input-shell", value: draft.personal.education, onChange: (e) => update("personal", { education: e.target.value }), children: educationLevels.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Occupation" }), _jsx("input", { className: "input-shell", value: draft.personal.occupation, onChange: (e) => update("personal", { occupation: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2 md:col-span-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Income range" }), _jsx("select", { className: "input-shell", value: draft.personal.incomeRange, onChange: (e) => update("personal", { incomeRange: e.target.value }), children: incomeRanges.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2 md:col-span-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Bio" }), _jsx("textarea", { className: "input-shell min-h-[9rem]", value: draft.personal.bio, onChange: (e) => update("personal", { bio: e.target.value }) })] })] })) : null, step === 1 ? (_jsxs("div", { className: "grid gap-6", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Search ethnic group" }), _jsx("input", { className: "input-shell", value: ethnicQuery, onChange: (e) => setEthnicQuery(e.target.value), placeholder: "Search Yoruba, Igbo, Tiv..." })] }), _jsxs("label", { className: "inline-flex items-center gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest", children: [_jsx("input", { checked: draft.ethnicity.openToAllEthnicities, onChange: (e) => update("ethnicity", { openToAllEthnicities: e.target.checked }), type: "checkbox" }), " Open to all ethnicities"] }), _jsx("div", { className: "grid gap-4 md:grid-cols-2", children: visibleEthnicGroups.map((region) => (_jsxs("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-white p-5", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay", children: region.region }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: region.groups.map((group) => (_jsx("button", { className: `rounded-full px-4 py-2 text-sm font-semibold ${draft.ethnicity.ethnicGroup === group ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`, onClick: () => update("ethnicity", { ethnicGroup: group }), type: "button", children: group }, group))) })] }, region.region))) })] })) : null, step === 2 ? (_jsxs("div", { className: "grid gap-6", children: [_jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-5", children: religions.map((religion) => (_jsxs("label", { className: `rounded-[1.5rem] border px-5 py-4 text-sm font-semibold ${draft.religion.faith === religion.label ? "border-brand-forest bg-brand-forest text-white" : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest"}`, children: [_jsx("input", { className: "sr-only", checked: draft.religion.faith === religion.label, name: "faith", onChange: () => update("religion", { faith: religion.label, subgroup: religion.subgroups[0] ?? "" }), type: "radio" }), religion.label] }, religion.label))) }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Denomination / subgroup" }), _jsx("select", { className: "input-shell", value: draft.religion.subgroup, onChange: (e) => update("religion", { subgroup: e.target.value }), children: (religions.find((item) => item.label === draft.religion.faith)?.subgroups ?? ["Not specified"]).map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Practice level" }), _jsx("select", { className: "input-shell", value: draft.religion.practiceLevel, onChange: (e) => update("religion", { practiceLevel: e.target.value }), children: practiceLevels.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "inline-flex items-center gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest", children: [_jsx("input", { checked: draft.religion.interfaithOk, onChange: (e) => update("religion", { interfaithOk: e.target.checked }), type: "checkbox" }), " Open to interfaith relationships"] })] })) : null, step === 3 ? (_jsxs("div", { className: "grid gap-6", children: [_jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4", children: marriageTypes.map((item) => (_jsx("button", { className: `rounded-[1.5rem] border px-5 py-4 text-left text-sm font-semibold ${draft.marriage.marriageTypes.includes(item) ? "border-brand-forest bg-brand-forest text-white" : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest"}`, onClick: () => toggleMarriageType(item), type: "button", children: item }, item))) }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Preferred timeline" }), _jsx("select", { className: "input-shell", value: draft.marriage.timeline, onChange: (e) => update("marriage", { timeline: e.target.value }), children: timelines.map((item) => _jsx("option", { children: item }, item)) })] })] })) : null, step === 4 ? (_jsxs("div", { className: "grid gap-6", children: [_jsxs("label", { className: "rounded-[2rem] border border-dashed border-brand-forest/20 bg-brand-forest/5 p-8 text-center text-brand-forest", children: [_jsx(Upload, { className: "mx-auto mb-4", size: 24 }), _jsx("p", { className: "font-semibold", children: "Drag-and-drop or browse" }), _jsx("p", { className: "mt-2 text-sm text-brand-forest/70", children: "JPEG / PNG only, 2-5 photos, max 5MB each." }), _jsx("input", { className: "sr-only", multiple: true, accept: "image/png,image/jpeg", onChange: (e) => handlePhotoUpload(e.target.files), type: "file" })] }), _jsx("div", { className: "rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900", children: "Anti-catfishing notice: use recent, unedited photos that clearly show your face." }), _jsx("div", { className: "grid gap-4", children: draft.photos.map((photo, index) => (_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-brand-ink", children: photo.name }), _jsxs("p", { className: "text-sm text-brand-forest/70", children: [index === 0 ? "Primary photo" : `Photo ${index + 1}`, " \u2022 ", photo.status] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "rounded-full bg-brand-forest/5 px-4 py-2 text-sm font-semibold text-brand-forest", disabled: index === 0, onClick: () => reorderPhoto(index, -1), type: "button", children: "Up" }), _jsx("button", { className: "rounded-full bg-brand-forest/5 px-4 py-2 text-sm font-semibold text-brand-forest", disabled: index === draft.photos.length - 1, onClick: () => reorderPhoto(index, 1), type: "button", children: "Down" })] })] }, `${photo.name}-${index}`))) })] })) : null, step === 5 ? (_jsxs("div", { className: "grid gap-6", children: [_jsx("div", { className: "flex flex-wrap gap-3", children: [
                                            { label: "Have been tested", value: "yes" },
                                            { label: "Not yet tested", value: "no" },
                                            { label: "Add later", value: "later" }
                                        ].map((item) => (_jsx("button", { className: `rounded-full px-5 py-3 text-sm font-semibold ${draft.genotype.tested === item.value ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`, onClick: () => update("genotype", { tested: item.value }), type: "button", children: item.label }, item.value))) }), draft.genotype.tested === "yes" ? (_jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Genotype" }), _jsx("select", { className: "input-shell", value: draft.genotype.genotype, onChange: (e) => update("genotype", { genotype: e.target.value }), children: genotypeOptions.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Test date" }), _jsx("input", { className: "input-shell", type: "date", value: draft.genotype.testDate, onChange: (e) => update("genotype", { testDate: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Facility name" }), _jsx("input", { className: "input-shell", value: draft.genotype.facilityName, onChange: (e) => update("genotype", { facilityName: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Certification code" }), _jsx("input", { className: "input-shell", value: draft.genotype.certificationCode, onChange: (e) => update("genotype", { certificationCode: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2 md:col-span-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Privacy" }), _jsx("select", { className: "input-shell", value: draft.genotype.privacy, onChange: (e) => update("genotype", { privacy: e.target.value }), children: genotypePrivacyOptions.map((item) => _jsx("option", { children: item }, item)) })] })] })) : null, draft.genotype.tested === "no" ? (_jsxs("div", { className: "grid gap-5", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Search testing labs by state" }), _jsx("select", { className: "input-shell", value: labState, onChange: (e) => setLabState(e.target.value), children: states.filter((item) => testingLabs.some((lab) => lab.state === item)).map((item) => _jsx("option", { children: item }, item)) })] }), _jsx("div", { className: "grid gap-4 md:grid-cols-2", children: visibleLabs.map((lab) => (_jsxs("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80", children: [_jsx("p", { className: "font-semibold text-brand-ink", children: lab.name }), _jsx("p", { children: lab.address }), _jsx("p", { children: lab.phone }), _jsx("p", { children: lab.hours })] }, lab.name))) })] })) : null] })) : null, step === 6 ? (_jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [_jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "ID type" }), _jsx("select", { className: "input-shell", value: draft.verification.idType, onChange: (e) => update("verification", { idType: e.target.value }), children: idTypes.map((item) => _jsx("option", { children: item }, item)) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "ID number" }), _jsx("input", { className: "input-shell", value: draft.verification.idNumber, onChange: (e) => update("verification", { idNumber: e.target.value }) })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Front image file name" }), _jsx("input", { className: "input-shell", value: draft.verification.frontFileName, onChange: (e) => update("verification", { frontFileName: e.target.value }), placeholder: "national-id-front.png" })] }), _jsxs("label", { className: "grid gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-brand-forest", children: "Back image file name" }), _jsx("input", { className: "input-shell", value: draft.verification.backFileName, onChange: (e) => update("verification", { backFileName: e.target.value }), placeholder: "optional-back.png" })] }), _jsx("div", { className: "md:col-span-2 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest", children: "? Manual review in 24 hours" })] })) : null, step === 7 ? (_jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "surface-card border-brand-moss/20 bg-brand-moss/10 p-6 shadow-none", children: [_jsxs("div", { className: "flex items-center gap-3 text-brand-forest", children: [_jsx(CheckCircle2, { size: 22 }), _jsx("p", { className: "font-semibold", children: "Profile completion screen" })] }), _jsx("p", { className: "mt-3 text-sm leading-7 text-brand-forest/80", children: "All seven steps are saved. You can begin browsing serious matches now or keep refining your profile." })] }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [
                                            "Email verified",
                                            "Phone verified",
                                            draft.verification.status,
                                            draft.genotype.tested === "yes" ? "Genotype added" : "Genotype optional"
                                        ].map((item) => (_jsx("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest", children: item }, item))) }), _jsxs("div", { className: "rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("p", { className: "font-semibold text-brand-ink", children: "Profile strength" }), _jsxs("p", { className: "text-sm font-semibold text-brand-clay", children: [strength, "%"] })] }), _jsx("div", { className: "mt-4 h-3 rounded-full bg-brand-forest/10", children: _jsx("div", { className: "h-3 rounded-full bg-brand-clay", style: { width: `${strength}%` } }) })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx("button", { className: "rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold", onClick: finish, type: "button", children: "Continue to Verification" }), _jsx("button", { className: "rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest", onClick: () => setStep(0), type: "button", children: "Edit Profile" }), _jsx("button", { className: "rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest", onClick: () => navigate("/profile"), type: "button", children: "View My Profile" })] })] })) : null] }) }) }), step < 7 ? (_jsx("section", { className: "section-shell pt-0", children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 surface-card p-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-brand-ink", children: "Auto-saved progress" }), _jsxs("p", { className: "text-sm text-brand-forest/70", children: ["Current strength: ", strength, "%"] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("button", { className: "inline-flex items-center gap-2 rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest disabled:opacity-50", disabled: step === 0, onClick: previousStep, type: "button", children: [_jsx(ChevronLeft, { size: 16 }), " Back"] }), _jsxs("button", { className: "inline-flex items-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald", onClick: nextStep, type: "button", children: [step === 6 ? "Complete profile" : "Next step", " ", _jsx(ChevronRight, { size: 16 })] })] })] }) })) : null] }));
}
