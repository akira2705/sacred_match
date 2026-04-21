import { useMemo, useState } from "react";
import { Filter, Heart, MessageCircleMore, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Seo } from "@/components/Seo";
import { SkeletonCard, SkeletonGrid } from "@/components/Skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { blogArticles } from "@/content/contentHubData";
import { connectionBuckets, conversations, dashboardStats, matchProfiles } from "@/content/matchData";
import { loadOnboardingDraft } from "@/lib/profileStorage";

function scoreTone(score: number) {
  if (score >= 80) return "bg-emerald-100 text-emerald-800";
  if (score >= 60) return "bg-amber-100 text-amber-800";
  return "bg-orange-100 text-orange-800";
}

function compatibilityTone(tone: string) {
  if (tone === "good") return "text-emerald-700";
  if (tone === "caution") return "text-amber-700";
  return "text-rose-700";
}

export function DashboardPage() {
  const draft = loadOnboardingDraft();
  const featuredMatches = matchProfiles.slice(0, 3);
  const featuredArticle = blogArticles[0];

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Dashboard"
          title={`Welcome back${draft.personal.occupation ? ", Demo Member" : ""}!`}
          description="Your home for serious matches, recent conversations, and the signals that matter most."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <div className="surface-card p-7">
              <img alt="Demo member" className="h-56 w-full rounded-[1.7rem] object-cover" src={matchProfiles[0].photos[0]} />
              <h2 className="mt-6 font-display text-3xl font-semibold text-brand-ink">Demo Member</h2>
              <p className="mt-2 text-sm text-brand-clay">29 � {draft.personal.state || "Lagos"} � {draft.ethnicity.ethnicGroup || "Yoruba"}</p>
              <p className="mt-4 text-sm leading-7 text-brand-forest/80">{draft.personal.bio}</p>
              <div className="mt-6 h-3 rounded-full bg-brand-forest/10"><div className="h-3 rounded-full bg-brand-clay" style={{ width: draft.completed ? "95%" : "78%" }} /></div>
              <p className="mt-3 text-sm font-semibold text-brand-forest">Profile completion: {draft.completed ? "95%" : "78%"}</p>
              <Link className="mt-6 inline-flex rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" to="/profile">View my profile</Link>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((item, index) => (
                <RevealOnScroll key={item.label} delay={index * 60}>
                  <div className="surface-card p-6">
                    <p className="text-sm text-brand-forest/65">{item.label}</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-brand-ink">{item.value}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={120}>
              <div className="surface-card p-7">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-3xl font-semibold text-brand-ink">Today&apos;s matches</h2>
                  <Link className="text-sm font-semibold text-brand-clay" to="/matches">Browse all</Link>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {featuredMatches.map((match) => (
                    <article key={match.id} className="overflow-hidden rounded-[1.7rem] border border-brand-forest/10 bg-brand-forest/5">
                      <img alt={match.name} className="h-48 w-full object-cover" src={match.photos[0]} />
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-brand-ink">{match.name}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreTone(match.score)}`}>{match.score}%</span>
                        </div>
                        <p className="mt-2 text-sm text-brand-forest/70">{match.age} � {match.location}</p>
                        <div className="mt-4 flex gap-2 text-sm">
                          <Link className="rounded-full bg-brand-forest px-4 py-2 font-semibold text-white" to={`/matches/${match.id}`}>View</Link>
                          <button className="rounded-full border border-brand-forest/15 px-4 py-2 font-semibold text-brand-forest" type="button">Like</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="surface-card p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl font-semibold text-brand-ink">Recent connections</h2>
                <Link className="text-sm font-semibold text-brand-clay" to="/connections">Manage</Link>
              </div>
              <div className="mt-6 grid gap-4">
                {[...connectionBuckets.pending, ...connectionBuckets.accepted].slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-[1.5rem] bg-brand-forest/5 px-4 py-4">
                    <img alt={item.name} className="h-14 w-14 rounded-full object-cover" src={item.photos[0]} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-brand-ink">{item.name}</p>
                      <p className="text-sm text-brand-forest/70">{item.location}</p>
                    </div>
                    <Link className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-forest" to={`/matches/${item.id}`}>View</Link>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="surface-card p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl font-semibold text-brand-ink">Recent messages</h2>
                <Link className="text-sm font-semibold text-brand-clay" to="/messages">Open inbox</Link>
              </div>
              <div className="mt-6 grid gap-4">
                {conversations.slice(0, 3).map((conversation) => (
                  <Link key={conversation.id} className="flex items-center gap-4 rounded-[1.5rem] bg-brand-forest/5 px-4 py-4" to={`/messages/${conversation.id}`}>
                    <img alt={conversation.name} className="h-14 w-14 rounded-full object-cover" src={conversation.avatar} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-brand-ink">{conversation.name}</p>
                        <p className="text-xs text-brand-forest/60">{conversation.lastTimestamp}</p>
                      </div>
                      <p className="truncate text-sm text-brand-forest/70">{conversation.lastMessage}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0">
        <RevealOnScroll>
          <div className="surface-card overflow-hidden p-0 lg:grid lg:grid-cols-[1fr_1.05fr]">
            <img alt={featuredArticle.title} className="h-full min-h-[20rem] w-full object-cover" src={featuredArticle.image} />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">Featured content</p>
              <h2 className="mt-6 font-display text-4xl font-semibold text-brand-ink">{featuredArticle.title}</h2>
              <p className="mt-5 text-base leading-8 text-brand-forest/80">{featuredArticle.excerpt}</p>
              <Link className="mt-8 inline-flex rounded-full bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold" to={`/blog/${featuredArticle.slug}`}>Read article</Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

export function MatchesPage() {
  const [ageRange, setAgeRange] = useState(60);
  const [stateFilter, setStateFilter] = useState("Any");
  const [religionFilter, setReligionFilter] = useState("Any");
  const [genotypeFilter, setGenotypeFilter] = useState("Any");
  const [visibleIds, setVisibleIds] = useState(() => matchProfiles.map((profile) => profile.id));

  const filteredProfiles = useMemo(() => {
    return matchProfiles.filter((profile) => {
      if (!visibleIds.includes(profile.id)) return false;
      if (profile.age > ageRange) return false;
      if (stateFilter !== "Any" && profile.state !== stateFilter) return false;
      if (religionFilter !== "Any" && profile.religion !== religionFilter) return false;
      if (genotypeFilter !== "Any" && profile.compatibility.theirGenotype !== genotypeFilter) return false;
      return true;
    });
  }, [ageRange, genotypeFilter, religionFilter, stateFilter, visibleIds]);

  function removeCard(id: string) {
    setVisibleIds((current) => current.filter((item) => item !== id));
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Browse matches"
          title="Use filters, scores, and profile depth to find better connections"
          description="The discovery experience stays centered on serious, marriage-minded compatibility instead of endless swiping."
        />
      </section>

      <section className="sticky top-0 z-20 mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8 bg-brand-cream/95 backdrop-blur-md shadow-sm">
        <div className="surface-card border-brand-forest/10 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-forest"><Filter size={16} /> Filter bar</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="grid gap-2 text-sm font-semibold text-brand-forest">Age range up to {ageRange}<input type="range" min={18} max={60} value={ageRange} onChange={(e) => setAgeRange(Number(e.target.value))} /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-forest">Location<select className="input-shell" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}><option>Any</option><option>Lagos</option><option>FCT</option><option>Oyo</option><option>Akwa Ibom</option></select></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-forest">Religion<select className="input-shell" value={religionFilter} onChange={(e) => setReligionFilter(e.target.value)}><option>Any</option><option>Christianity</option><option>Islam</option></select></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-forest">Genotype<select className="input-shell" value={genotypeFilter} onChange={(e) => setGenotypeFilter(e.target.value)}><option>Any</option><option>AA</option><option>AS</option><option>SS</option></select></label>
            <div className="flex items-end gap-3"><button className="rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white">Apply Filters ({filteredProfiles.length})</button><button className="text-sm font-semibold text-brand-clay" onClick={() => { setAgeRange(60); setStateFilter("Any"); setReligionFilter("Any"); setGenotypeFilter("Any"); }} type="button">Clear all</button></div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        {filteredProfiles.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <p className="font-display text-4xl font-semibold text-brand-ink">You&apos;ve seen all available matches</p>
            <p className="mt-4 text-base leading-8 text-brand-forest/80">Adjust your filters or check back tomorrow for new members.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile, index) => (
              <RevealOnScroll key={profile.id} delay={index * 60}>
                <article className="surface-card overflow-hidden p-0">
                  <img alt={profile.name} className="h-80 w-full object-cover" src={profile.photos[0]} />
                  <div className="p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="font-display text-3xl font-semibold text-brand-ink">{profile.name}</h2>
                        <p className="text-sm text-brand-forest/70">{profile.age} � {profile.location}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreTone(profile.score)}`}>{profile.score}/100</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="pill-chip">{profile.ethnicGroup}</span>
                      <span className="pill-chip">{profile.religion}</span>
                      {profile.marriageTypes.map((item) => <span key={item} className="pill-chip">{item}</span>)}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-brand-forest/80">{profile.bio}</p>
                    <p className={`mt-4 text-sm font-semibold ${compatibilityTone(profile.compatibility.tone)}`}>{profile.compatibility.label}: {profile.compatibility.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                      <button className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-rose-700" onClick={() => removeCard(profile.id)} type="button"><X size={16} /> Pass</button>
                      <Link className="rounded-full bg-brand-forest px-4 py-2 text-white" to={`/matches/${profile.id}`}>View profile</Link>
                      <button className="inline-flex items-center gap-2 rounded-full border border-brand-moss/25 px-4 py-2 text-brand-emerald" onClick={() => removeCard(profile.id)} type="button"><Heart size={16} /> Like</button>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function MatchProfilePage() {
  const { id } = useParams();
  const profile = matchProfiles.find((item) => item.id === id) ?? matchProfiles[0];
  const similarProfiles = matchProfiles.filter((item) => item.id !== profile.id).slice(0, 3);
  const total = profile.breakdown.cultural + profile.breakdown.personal + profile.breakdown.genotype + profile.breakdown.engagement;

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <RevealOnScroll>
            <div className="grid gap-4">
              <img alt={profile.name} className="h-[28rem] w-full rounded-[2rem] object-cover" src={profile.photos[0]} />
              <div className="grid gap-4 sm:grid-cols-3">
                {profile.photos.map((photo) => <img key={photo} alt={profile.name} className="h-28 w-full rounded-[1.4rem] object-cover" src={photo} />)}
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <div className="surface-card p-8">
              <p className="eyebrow">Match profile</p>
              <h1 className="mt-6 font-display text-5xl font-semibold text-brand-ink">{profile.name}</h1>
              <p className="mt-3 text-base text-brand-clay">{profile.age} � {profile.location} � {profile.lastActive}</p>
              <div className="mt-5 flex flex-wrap gap-2">{profile.verificationBadges.map((badge) => <span key={badge} className="pill-chip">? {badge}</span>)}</div>
              <div className="mt-8 rounded-[1.7rem] bg-brand-forest/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-clay">Match score</p>
                <p className="mt-3 font-display text-5xl font-semibold text-brand-ink">{total}/100</p>
                <div className="mt-5 grid gap-3 text-sm text-brand-forest/80">
                  <p>Cultural: {profile.breakdown.cultural}/40</p>
                  <p>Personal: {profile.breakdown.personal}/30</p>
                  <p>Genotype: {profile.breakdown.genotype}/20</p>
                  <p>Engagement: {profile.breakdown.engagement}/10</p>
                  <p className={`font-semibold ${compatibilityTone(profile.compatibility.tone)}`}>Your genotype: {profile.compatibility.myGenotype} � Their genotype: {profile.compatibility.theirGenotype} � {profile.compatibility.summary}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" type="button">Send Connection Request</button>
                <button className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest" type="button">Pass</button>
                <button className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700" type="button">Report</button>
                <button className="rounded-full border border-brand-forest/15 px-6 py-3 text-sm font-semibold text-brand-forest" type="button">Block</button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-6">
            <div className="surface-card p-7">
              <h2 className="font-display text-3xl font-semibold text-brand-ink">About</h2>
              <p className="mt-4 text-base leading-8 text-brand-forest/80">{profile.bio}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2 text-sm text-brand-forest/80">
                <p>Height: {profile.details.height}</p><p>Body type: {profile.details.bodyType}</p><p>Education: {profile.details.education}</p><p>Occupation: {profile.details.occupation}</p><p>Income: {profile.details.income}</p><p>Timeline: {profile.details.timeline}</p><p>Children: {profile.details.children}</p><p>Smoking: {profile.details.smoking}</p><p>Alcohol: {profile.details.alcohol}</p><p>Practice level: {profile.details.practiceLevel}</p>
              </div>
            </div>
            <div className="surface-card p-7">
              <h2 className="font-display text-3xl font-semibold text-brand-ink">Cultural background</h2>
              <div className="mt-6 grid gap-3 text-sm text-brand-forest/80">
                <p>Ethnic group: {profile.ethnicGroup}</p>
                <p>Primary language: {profile.primaryLanguage}</p>
                <p>Region: {profile.details.region}</p>
                <p>Cultural interest level: {profile.details.culturalInterest}</p>
              </div>
            </div>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Similar to {profile.name.split(" ")[0]}</h2>
            <div className="mt-6 grid gap-4">
              {similarProfiles.map((item) => (
                <Link key={item.id} className="flex items-center gap-4 rounded-[1.5rem] bg-brand-forest/5 px-4 py-4" to={`/matches/${item.id}`}>
                  <img alt={item.name} className="h-16 w-16 rounded-full object-cover" src={item.photos[0]} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-brand-ink">{item.name}</p>
                    <p className="text-sm text-brand-forest/70">{item.location} � {item.score}% match</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ConnectionsPage() {
  const [tab, setTab] = useState<keyof typeof connectionBuckets>("pending");

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Connections" title="Manage requests, active matches, and blocked profiles" description="Everything from pending requests to accepted matches is organized in one place." />
      </section>
      <section className="section-shell pt-0">
        <div className="flex flex-wrap gap-3">
          {Object.keys(connectionBuckets).map((key) => (
            <button key={key} className={`rounded-full px-5 py-3 text-sm font-semibold capitalize ${tab === key ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`} onClick={() => setTab(key as keyof typeof connectionBuckets)} type="button">{key}</button>
          ))}
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-4">
          {connectionBuckets[tab].map((item) => (
            <div key={`${tab}-${item.id}`} className="surface-card p-5">
              <div className="flex flex-wrap items-center gap-4">
                <img alt={item.name} className="h-20 w-20 rounded-[1.4rem] object-cover" src={item.photos[0]} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-2xl font-semibold text-brand-ink">{item.name}</p>
                  <p className="text-sm text-brand-forest/70">{item.age} � {item.location}</p>
                  <p className="mt-2 text-sm text-brand-clay capitalize">{tab === "pending" ? "Request sent 2 days ago" : tab === "accepted" ? "Matched 5 days ago" : tab === "rejected" ? "Declined 10 days ago" : "Blocked recently"}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  {tab === "accepted" ? <Link className="rounded-full bg-brand-forest px-4 py-2 text-white" to={`/messages/${conversations[0].id}`}>Message</Link> : null}
                  <Link className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest" to={`/matches/${item.id}`}>View Profile</Link>
                  <button className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest" type="button">{tab === "blocked" ? "Unblock" : tab === "pending" ? "Cancel Request" : tab === "rejected" ? "Try Again" : "Unmatch"}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
