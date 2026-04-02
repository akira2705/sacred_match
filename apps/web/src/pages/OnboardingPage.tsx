import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import {
  bodyTypes,
  educationLevels,
  ethnicGroupsByRegion,
  genotypeOptions,
  genotypePrivacyOptions,
  idTypes,
  incomeRanges,
  lgasByState,
  marriageTypes,
  practiceLevels,
  religions,
  states,
  testingLabs,
  timelines
} from "@/content/onboardingData";
import { defaultOnboardingDraft, loadOnboardingDraft, saveOnboardingDraft, type OnboardingDraft } from "@/lib/profileStorage";

type OnboardingPageProps = {
  mode?: "create" | "edit";
};

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

function percentComplete(draft: OnboardingDraft) {
  let score = 50;
  if (draft.personal.bio) score += 8;
  if (draft.ethnicity.ethnicGroup || draft.ethnicity.openToAllEthnicities) score += 8;
  if (draft.religion.faith) score += 8;
  if (draft.marriage.marriageTypes.length > 0) score += 8;
  if (draft.photos.length >= 2) score += 8;
  if (draft.genotype.tested !== "later") score += 5;
  if (draft.verification.idType && draft.verification.idNumber) score += 5;
  return Math.min(score, 96);
}

export function OnboardingPage({ mode = "create" }: OnboardingPageProps) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<OnboardingDraft>(() => loadOnboardingDraft());
  const [step, setStep] = useState(0);
  const [ethnicQuery, setEthnicQuery] = useState("");
  const [labState, setLabState] = useState("Lagos");

  useEffect(() => {
    saveOnboardingDraft(draft);
  }, [draft]);

  const visibleEthnicGroups = useMemo(() => {
    const query = ethnicQuery.trim().toLowerCase();
    if (!query) return ethnicGroupsByRegion;
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

  function update<K extends Exclude<keyof OnboardingDraft, "completed">>(section: K, next: Partial<OnboardingDraft[K]>) {
    setDraft((current) => ({
      ...current,
      [section]: {
        ...current[section],
        ...next
      }
    }));
  }

  function toggleMarriageType(type: string) {
    const existing = draft.marriage.marriageTypes;
    const next = existing.includes(type)
      ? existing.filter((item) => item !== type)
      : [...existing, type];
    update("marriage", { marriageTypes: next });
  }

  function handlePhotoUpload(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files).slice(0, 5).map((file) => ({
      name: file.name,
      status: "Pending review"
    }));
    setDraft((current) => ({
      ...current,
      photos: [...current.photos, ...incoming].slice(0, 5)
    }));
  }

  function reorderPhoto(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const next = [...current.photos];
      const target = index + direction;
      if (!next[target]) return current;
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

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow={mode === "edit" ? "Edit profile" : "Onboarding flow"}
          title={mode === "edit" ? "Update your profile details" : "Complete your 7-step marriage profile"}
          description="Every step is auto-saved as you go so the product can shape better matches, stronger safety controls, and clearer compatibility signals."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            {steps.map((label, index) => (
              <div key={label} className={`rounded-full px-4 py-2 text-sm font-semibold ${index === step ? "bg-brand-forest text-white" : index < step ? "bg-brand-moss/15 text-brand-forest" : "bg-brand-forest/5 text-brand-forest/70"}`}>
                {index + 1}. {label}
              </div>
            ))}
          </div>
          <div className="mt-6 h-3 rounded-full bg-brand-forest/10">
            <div className="h-3 rounded-full bg-brand-clay" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card p-8 sm:p-10">
            {step === 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Date of birth</span><input className="input-shell" type="date" value={draft.personal.dateOfBirth} onChange={(e) => update("personal", { dateOfBirth: e.target.value })} /></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Gender</span><input className="input-shell" value={draft.personal.gender} onChange={(e) => update("personal", { gender: e.target.value })} placeholder="Female" /></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Height</span><input className="input-shell" value={draft.personal.height} onChange={(e) => update("personal", { height: e.target.value })} /></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Body type</span><select className="input-shell" value={draft.personal.bodyType} onChange={(e) => update("personal", { bodyType: e.target.value })}>{bodyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">State</span><select className="input-shell" value={draft.personal.state} onChange={(e) => update("personal", { state: e.target.value, lga: lgasByState[e.target.value]?.[0] ?? "" })}>{states.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">LGA</span><select className="input-shell" value={draft.personal.lga} onChange={(e) => update("personal", { lga: e.target.value })}>{currentLgas.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Education</span><select className="input-shell" value={draft.personal.education} onChange={(e) => update("personal", { education: e.target.value })}>{educationLevels.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Occupation</span><input className="input-shell" value={draft.personal.occupation} onChange={(e) => update("personal", { occupation: e.target.value })} /></label>
                <label className="grid gap-2 md:col-span-2"><span className="text-sm font-semibold text-brand-forest">Income range</span><select className="input-shell" value={draft.personal.incomeRange} onChange={(e) => update("personal", { incomeRange: e.target.value })}>{incomeRanges.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2 md:col-span-2"><span className="text-sm font-semibold text-brand-forest">Bio</span><textarea className="input-shell min-h-[9rem]" value={draft.personal.bio} onChange={(e) => update("personal", { bio: e.target.value })} /></label>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-6">
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Search ethnic group</span><input className="input-shell" value={ethnicQuery} onChange={(e) => setEthnicQuery(e.target.value)} placeholder="Search Yoruba, Igbo, Tiv..." /></label>
                <label className="inline-flex items-center gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest"><input checked={draft.ethnicity.openToAllEthnicities} onChange={(e) => update("ethnicity", { openToAllEthnicities: e.target.checked })} type="checkbox" /> Open to all ethnicities</label>
                <div className="grid gap-4 md:grid-cols-2">
                  {visibleEthnicGroups.map((region) => (
                    <div key={region.region} className="rounded-[1.5rem] border border-brand-forest/10 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay">{region.region}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {region.groups.map((group) => (
                          <button key={group} className={`rounded-full px-4 py-2 text-sm font-semibold ${draft.ethnicity.ethnicGroup === group ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`} onClick={() => update("ethnicity", { ethnicGroup: group })} type="button">{group}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  {religions.map((religion) => (
                    <label key={religion.label} className={`rounded-[1.5rem] border px-5 py-4 text-sm font-semibold ${draft.religion.faith === religion.label ? "border-brand-forest bg-brand-forest text-white" : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest"}`}>
                      <input className="sr-only" checked={draft.religion.faith === religion.label} name="faith" onChange={() => update("religion", { faith: religion.label, subgroup: religion.subgroups[0] ?? "" })} type="radio" />
                      {religion.label}
                    </label>
                  ))}
                </div>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Denomination / subgroup</span><select className="input-shell" value={draft.religion.subgroup} onChange={(e) => update("religion", { subgroup: e.target.value })}>{(religions.find((item) => item.label === draft.religion.faith)?.subgroups ?? ["Not specified"]).map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Practice level</span><select className="input-shell" value={draft.religion.practiceLevel} onChange={(e) => update("religion", { practiceLevel: e.target.value })}>{practiceLevels.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="inline-flex items-center gap-3 rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-medium text-brand-forest"><input checked={draft.religion.interfaithOk} onChange={(e) => update("religion", { interfaithOk: e.target.checked })} type="checkbox" /> Open to interfaith relationships</label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {marriageTypes.map((item) => (
                    <button key={item} className={`rounded-[1.5rem] border px-5 py-4 text-left text-sm font-semibold ${draft.marriage.marriageTypes.includes(item) ? "border-brand-forest bg-brand-forest text-white" : "border-brand-forest/10 bg-brand-forest/5 text-brand-forest"}`} onClick={() => toggleMarriageType(item)} type="button">{item}</button>
                  ))}
                </div>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Preferred timeline</span><select className="input-shell" value={draft.marriage.timeline} onChange={(e) => update("marriage", { timeline: e.target.value })}>{timelines.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-6">
                <label className="rounded-[2rem] border border-dashed border-brand-forest/20 bg-brand-forest/5 p-8 text-center text-brand-forest">
                  <Upload className="mx-auto mb-4" size={24} />
                  <p className="font-semibold">Drag-and-drop or browse</p>
                  <p className="mt-2 text-sm text-brand-forest/70">JPEG / PNG only, 2-5 photos, max 5MB each.</p>
                  <input className="sr-only" multiple accept="image/png,image/jpeg" onChange={(e) => handlePhotoUpload(e.target.files)} type="file" />
                </label>
                <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">Anti-catfishing notice: use recent, unedited photos that clearly show your face.</div>
                <div className="grid gap-4">
                  {draft.photos.map((photo, index) => (
                    <div key={`${photo.name}-${index}`} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4">
                      <div>
                        <p className="font-semibold text-brand-ink">{photo.name}</p>
                        <p className="text-sm text-brand-forest/70">{index === 0 ? "Primary photo" : `Photo ${index + 1}`} • {photo.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-full bg-brand-forest/5 px-4 py-2 text-sm font-semibold text-brand-forest" disabled={index === 0} onClick={() => reorderPhoto(index, -1)} type="button">Up</button>
                        <button className="rounded-full bg-brand-forest/5 px-4 py-2 text-sm font-semibold text-brand-forest" disabled={index === draft.photos.length - 1} onClick={() => reorderPhoto(index, 1)} type="button">Down</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="grid gap-6">
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Have been tested", value: "yes" },
                    { label: "Not yet tested", value: "no" },
                    { label: "Add later", value: "later" }
                  ].map((item) => (
                    <button key={item.value} className={`rounded-full px-5 py-3 text-sm font-semibold ${draft.genotype.tested === item.value ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`} onClick={() => update("genotype", { tested: item.value as OnboardingDraft["genotype"]["tested"] })} type="button">{item.label}</button>
                  ))}
                </div>
                {draft.genotype.tested === "yes" ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Genotype</span><select className="input-shell" value={draft.genotype.genotype} onChange={(e) => update("genotype", { genotype: e.target.value })}>{genotypeOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Test date</span><input className="input-shell" type="date" value={draft.genotype.testDate} onChange={(e) => update("genotype", { testDate: e.target.value })} /></label>
                    <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Facility name</span><input className="input-shell" value={draft.genotype.facilityName} onChange={(e) => update("genotype", { facilityName: e.target.value })} /></label>
                    <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Certification code</span><input className="input-shell" value={draft.genotype.certificationCode} onChange={(e) => update("genotype", { certificationCode: e.target.value })} /></label>
                    <label className="grid gap-2 md:col-span-2"><span className="text-sm font-semibold text-brand-forest">Privacy</span><select className="input-shell" value={draft.genotype.privacy} onChange={(e) => update("genotype", { privacy: e.target.value })}>{genotypePrivacyOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
                  </div>
                ) : null}
                {draft.genotype.tested === "no" ? (
                  <div className="grid gap-5">
                    <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Search testing labs by state</span><select className="input-shell" value={labState} onChange={(e) => setLabState(e.target.value)}>{states.filter((item) => testingLabs.some((lab) => lab.state === item)).map((item) => <option key={item}>{item}</option>)}</select></label>
                    <div className="grid gap-4 md:grid-cols-2">
                      {visibleLabs.map((lab) => (
                        <div key={lab.name} className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm leading-7 text-brand-forest/80">
                          <p className="font-semibold text-brand-ink">{lab.name}</p>
                          <p>{lab.address}</p>
                          <p>{lab.phone}</p>
                          <p>{lab.hours}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 6 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">ID type</span><select className="input-shell" value={draft.verification.idType} onChange={(e) => update("verification", { idType: e.target.value })}>{idTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">ID number</span><input className="input-shell" value={draft.verification.idNumber} onChange={(e) => update("verification", { idNumber: e.target.value })} /></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Front image file name</span><input className="input-shell" value={draft.verification.frontFileName} onChange={(e) => update("verification", { frontFileName: e.target.value })} placeholder="national-id-front.png" /></label>
                <label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Back image file name</span><input className="input-shell" value={draft.verification.backFileName} onChange={(e) => update("verification", { backFileName: e.target.value })} placeholder="optional-back.png" /></label>
                <div className="md:col-span-2 rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm text-brand-forest">? Manual review in 24 hours</div>
              </div>
            ) : null}

            {step === 7 ? (
              <div className="grid gap-6">
                <div className="surface-card border-brand-moss/20 bg-brand-moss/10 p-6 shadow-none">
                  <div className="flex items-center gap-3 text-brand-forest">
                    <CheckCircle2 size={22} />
                    <p className="font-semibold">Profile completion screen</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-brand-forest/80">All seven steps are saved. You can begin browsing serious matches now or keep refining your profile.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    "Email verified",
                    "Phone verified",
                    draft.verification.status,
                    draft.genotype.tested === "yes" ? "Genotype added" : "Genotype optional"
                  ].map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">{item}</div>
                  ))}
                </div>
                <div className="rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-brand-ink">Profile strength</p>
                    <p className="text-sm font-semibold text-brand-clay">{strength}%</p>
                  </div>
                  <div className="mt-4 h-3 rounded-full bg-brand-forest/10"><div className="h-3 rounded-full bg-brand-clay" style={{ width: `${strength}%` }} /></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold" onClick={finish} type="button">Continue to Verification</button>
                  <button className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest" onClick={() => setStep(0)} type="button">Edit Profile</button>
                  <button className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest" onClick={() => navigate("/profile")} type="button">View My Profile</button>
                </div>
              </div>
            ) : null}
          </div>
        </RevealOnScroll>
      </section>

      {step < 7 ? (
        <section className="section-shell pt-0">
          <div className="flex flex-wrap items-center justify-between gap-4 surface-card p-6">
            <div>
              <p className="text-sm font-semibold text-brand-ink">Auto-saved progress</p>
              <p className="text-sm text-brand-forest/70">Current strength: {strength}%</p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest disabled:opacity-50" disabled={step === 0} onClick={previousStep} type="button"><ChevronLeft size={16} /> Back</button>
              <button className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" onClick={nextStep} type="button">{step === 6 ? "Complete profile" : "Next step"} <ChevronRight size={16} /></button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}



