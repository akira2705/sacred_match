import { useMemo, useState } from "react";
import { MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { categorizedFaqs, helpTopics, safetyTips, supportSubjects } from "@/content/contentHubData";
import { conversations } from "@/content/matchData";
import { loadOnboardingDraft } from "@/lib/profileStorage";

export function MessagesPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [draftMessage, setDraftMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<Record<string, string[]>>({});

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      if (filter === "Unread" && conversation.unreadCount === 0) return false;
      if (filter === "Archived" && !conversation.archived) return false;
      if (filter === "All") {
        const haystack = `${conversation.name} ${conversation.lastMessage}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      }
      const haystack = `${conversation.name} ${conversation.lastMessage}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
  }, [filter, query]);

  const activeConversation = filteredConversations.find((item) => item.id === conversationId) ?? filteredConversations[0] ?? conversations[0];
  const appendedMessages = localMessages[activeConversation.id] ?? [];

  function sendMessage() {
    if (!draftMessage.trim()) return;
    setLocalMessages((current) => ({
      ...current,
      [activeConversation.id]: [...(current[activeConversation.id] ?? []), draftMessage.trim()]
    }));
    setDraftMessage("");
    setTyping(false);
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Messages" title="Keep conversations intentional and safe" description="Search conversations, follow read states, and stay inside a trust-aware messaging flow." />
      </section>

      <section className="section-shell pt-0">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-halo lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="border-b border-brand-forest/10 p-6 lg:border-b-0 lg:border-r">
            <div className="grid gap-4">
              <input className="input-shell" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" />
              <select className="input-shell" value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option>All</option>
                <option>Unread</option>
                <option>Archived</option>
              </select>
            </div>
            <div className="mt-6 grid gap-3">
              {filteredConversations.map((conversation) => (
                <button key={conversation.id} className={`flex w-full items-center gap-4 rounded-[1.5rem] px-4 py-4 text-left transition ${activeConversation.id === conversation.id ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest hover:bg-brand-forest/10"}`} onClick={() => navigate(`/messages/${conversation.id}`)} type="button">
                  <div className="relative">
                    <img alt={conversation.name} className="h-14 w-14 rounded-full object-cover" src={conversation.avatar} />
                    <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${conversation.online ? "bg-emerald-500" : "bg-slate-300"}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{conversation.name}</p>
                      <p className={`text-xs ${activeConversation.id === conversation.id ? "text-white/70" : "text-brand-forest/55"}`}>{conversation.lastTimestamp}</p>
                    </div>
                    <p className={`truncate text-sm ${activeConversation.id === conversation.id ? "text-white/80" : "text-brand-forest/70"}`}>{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 ? <span className="rounded-full bg-rose-500 px-2 py-1 text-xs font-semibold text-white">{conversation.unreadCount}</span> : null}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[42rem] flex-col">
            <div className="border-b border-brand-forest/10 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img alt={activeConversation.name} className="h-14 w-14 rounded-full object-cover" src={activeConversation.avatar} />
                  <div>
                    <p className="font-display text-2xl font-semibold text-brand-ink">{activeConversation.name}</p>
                    <p className="text-sm text-brand-forest/70">{activeConversation.online ? "Active now" : activeConversation.lastSeen}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-sm font-semibold">
                  <Link className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest" to={`/matches/${activeConversation.participantId}`}>View profile</Link>
                  <button className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest" type="button">Block</button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[32rem] rounded-[1.6rem] px-5 py-4 text-sm leading-7 ${message.sender === "me" ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`}>
                    <p>{message.body}</p>
                    <p className={`mt-2 text-xs ${message.sender === "me" ? "text-white/70" : "text-brand-forest/55"}`}>{message.time}{message.status ? ` • ${message.status}` : ""}</p>
                  </div>
                </div>
              ))}
              {appendedMessages.map((message, index) => (
                <div key={`${message}-${index}`} className="flex justify-end">
                  <div className="max-w-[32rem] rounded-[1.6rem] bg-brand-forest px-5 py-4 text-sm leading-7 text-white">
                    <p>{message}</p>
                    <p className="mt-2 text-xs text-white/70">Just now • sending...</p>
                  </div>
                </div>
              ))}
              {typing ? <p className="text-sm text-brand-forest/60">{activeConversation.name.split(" ")[0]} is typing...</p> : null}
            </div>

            <div className="border-t border-brand-forest/10 px-6 py-5">
              <div className="rounded-[1.6rem] border border-brand-forest/10 bg-brand-forest/5 p-4">
                <textarea className="min-h-[6rem] w-full resize-none bg-transparent text-sm leading-7 text-brand-ink outline-none" value={draftMessage} onChange={(event) => { setDraftMessage(event.target.value); setTyping(event.target.value.length > 0); }} placeholder="Type a message..." />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-brand-forest/55">Enter = send • Shift+Enter = new line</p>
                  <button className="rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" onClick={sendMessage} type="button">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProfilePage() {
  const draft = loadOnboardingDraft();
  const profileStrength = draft.completed ? 95 : 78;

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="My profile" title="Review the profile other serious matches will see" description="Everything here reflects the onboarding flow, verification status, and the signals the matching engine uses." />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <RevealOnScroll>
            <div className="surface-card p-7">
              <img alt="My profile" className="h-72 w-full rounded-[1.8rem] object-cover" src={conversations[0].avatar} />
              <h2 className="mt-6 font-display text-4xl font-semibold text-brand-ink">Demo Member</h2>
              <p className="mt-2 text-brand-clay">29 • {draft.personal.state} • {draft.ethnicity.ethnicGroup}</p>
              <p className="mt-5 text-sm leading-7 text-brand-forest/80">{draft.personal.bio}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Email verified", "Phone verified", draft.verification.status, draft.genotype.genotype ? `${draft.genotype.genotype} • Verified` : "Genotype private"].map((item) => <span key={item} className="pill-chip">{item}</span>)}
              </div>
              <div className="mt-6 h-3 rounded-full bg-brand-forest/10"><div className="h-3 rounded-full bg-brand-clay" style={{ width: `${profileStrength}%` }} /></div>
              <p className="mt-3 text-sm font-semibold text-brand-forest">Profile strength: {profileStrength}% complete</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white" to="/profile/edit">Edit profile</Link>
                <button className="rounded-full border border-brand-forest/15 px-5 py-3 text-sm font-semibold text-brand-forest" type="button">View as others see</button>
              </div>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6">
            {[
              { heading: "Personal info", body: [`Height: ${draft.personal.height}`, `Body type: ${draft.personal.bodyType}`, `Education: ${draft.personal.education}`, `Occupation: ${draft.personal.occupation}`, `Income: ${draft.personal.incomeRange}`] },
              { heading: "Ethnic group & language", body: [`Ethnic group: ${draft.ethnicity.ethnicGroup || "Open to all"}`, "Primary languages: English + local language preference"] },
              { heading: "Religion & practice", body: [`Faith: ${draft.religion.faith}`, `Subgroup: ${draft.religion.subgroup}`, `Practice level: ${draft.religion.practiceLevel}`] },
              { heading: "Marriage preference", body: [`Marriage types: ${draft.marriage.marriageTypes.join(", ") || "None selected"}`, `Timeline: ${draft.marriage.timeline}`] },
              { heading: "Genotype", body: [draft.genotype.genotype ? `${draft.genotype.genotype} • ${draft.genotype.privacy}` : "Not added yet"] }
            ].map((section, index) => (
              <RevealOnScroll key={section.heading} delay={index * 60}>
                <div className="surface-card p-7">
                  <h2 className="font-display text-3xl font-semibold text-brand-ink">{section.heading}</h2>
                  <div className="mt-5 grid gap-3 text-sm leading-7 text-brand-forest/80">
                    {section.body.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState("Account");
  const tabs = ["Account", "Privacy", "Notifications", "Preferences", "Safety", "Data"];

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Settings" title="Control privacy, notifications, and account safety" description="Every high-trust relationship product needs clear settings for visibility, security, and personal data." />
      </section>
      <section className="section-shell pt-0">
        <div className="flex flex-wrap gap-3">{tabs.map((item) => <button key={item} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === item ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`} onClick={() => setTab(item)} type="button">{item}</button>)}</div>
      </section>
      <section className="section-shell pt-0">
        <div className="surface-card p-8">
          {tab === "Account" ? <div className="grid gap-4 md:grid-cols-2"><input className="input-shell" defaultValue="demo@sacred-match.ng" /><input className="input-shell" defaultValue="+2348011112233" /><input className="input-shell" placeholder="Current password" type="password" /><input className="input-shell" placeholder="New password" type="password" /></div> : null}
          {tab === "Privacy" ? <div className="grid gap-4 md:grid-cols-2">{["Profile visibility", "Genotype visibility", "Last seen", "Read receipts", "Activity status", "Who can message you"].map((item) => <label key={item} className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">{item}</span><select className="input-shell"><option>Matches only</option><option>Everyone</option><option>Private</option></select></label>)}</div> : null}
          {tab === "Notifications" ? <div className="grid gap-4 md:grid-cols-2">{["New matches", "Connection requests", "Messages", "Promotional"].map((item) => <label key={item} className="inline-flex items-center gap-3 rounded-[1.4rem] bg-brand-forest/5 px-5 py-4"><input defaultChecked type="checkbox" /> {item}</label>)}</div> : null}
          {tab === "Preferences" ? <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Language</span><select className="input-shell"><option>English</option></select></label><label className="grid gap-2"><span className="text-sm font-semibold text-brand-forest">Theme</span><select className="input-shell"><option>Light</option><option>Dark</option></select></label></div> : null}
          {tab === "Safety" ? <div className="grid gap-4">{["Blocked: Mariam Bello", "Blocked: Ifeanyi Ugo"].map((item) => <div key={item} className="rounded-[1.4rem] bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">{item}</div>)}</div> : null}
          {tab === "Data" ? <div className="grid gap-4"><button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Download my data</button><button className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700">Delete account</button></div> : null}
        </div>
      </section>
    </div>
  );
}

export function SafetyPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Safety" title="Review verification status, reports, and safety guidance" description="Trust features need to be visible, understandable, and easy to act on when something feels wrong." />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Verification dashboard</h2>
            <div className="mt-6 grid gap-4">{["Email ? Verified", "Phone ? Verified", "ID ? Pending manual review", "Photos ? 2/2 reviewed", "Genotype ? Verified"].map((item) => <div key={item} className="rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">{item}</div>)}</div>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Report a user</h2>
            <div className="mt-6 grid gap-4"><input className="input-shell" placeholder="Search user" /><select className="input-shell"><option>Scam</option><option>Catfish</option><option>Inappropriate</option><option>Other</option></select><textarea className="input-shell min-h-[9rem]" placeholder="Describe the issue" /><button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Submit report</button></div>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{safetyTips.map((tip) => <div key={tip} className="surface-card p-6 text-sm leading-7 text-brand-forest/80">{tip}</div>)}</div>
      </section>
    </div>
  );
}

export function HelpPage() {
  const [subject, setSubject] = useState(supportSubjects[0]);

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow="Help & support" title="Find answers quickly or contact support" description="Search product guidance, browse the knowledge base, or send a support request directly." />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Knowledge base</h2>
            <div className="mt-6 grid gap-3">{helpTopics.map((topic) => <div key={topic} className="rounded-[1.4rem] bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">{topic}</div>)}</div>
            <div className="mt-8 grid gap-4">
              {categorizedFaqs.slice(0, 3).map((group) => (
                <details key={group.category} className="rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4">
                  <summary className="cursor-pointer font-semibold text-brand-ink">{group.category}</summary>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-brand-forest/80">{group.items.map((item) => <p key={item.question}><span className="font-semibold text-brand-ink">{item.question}</span><br />{item.answer}</p>)}</div>
                </details>
              ))}
            </div>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Contact support</h2>
            <div className="mt-6 grid gap-4">
              <select className="input-shell" value={subject} onChange={(event) => setSubject(event.target.value)}>{supportSubjects.map((item) => <option key={item}>{item}</option>)}</select>
              <input className="input-shell" defaultValue="demo@sacred-match.ng" />
              <textarea className="input-shell min-h-[10rem]" placeholder="Describe the issue in detail" />
              <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Send message</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Matching clarity", body: "Understand how scoring and filters work before browsing." },
            { icon: MessageCircleMore, title: "Messaging help", body: "Learn how to keep conversations intentional and safe." },
            { icon: ShieldCheck, title: "Safety guidance", body: "Use reporting, blocking, and verification tools effectively." }
          ].map((item) => {
            const Icon = item.icon;
            return <div key={item.title} className="surface-card p-6"><Icon className="text-brand-emerald" size={22} /><h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">{item.title}</h3><p className="mt-3 text-sm leading-7 text-brand-forest/80">{item.body}</p></div>;
          })}
        </div>
      </section>
    </div>
  );
}
