import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { MessageCircleMore, ShieldCheck, Sparkles, Send, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { categorizedFaqs, helpTopics, safetyTips, supportSubjects } from "@/content/contentHubData";
import { loadOnboardingDraft } from "@/lib/profileStorage";
import {
  type ApiConversation,
  type ApiMessage,
  getConversations,
  getMessages,
  getMe,
  sendMessageToConversation,
} from "@/lib/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getOtherParticipant(conversation: ApiConversation, myId: string | null) {
  return (
    conversation.participants.find((p) => p.user.id !== myId)?.user ??
    conversation.participants[0]?.user
  );
}

function formatTime(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

const POLL_INTERVAL = 3000; // 3 s

// ─── MessagesPage ─────────────────────────────────────────────────────────────

export function MessagesPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId?: string }>();

  const [myId, setMyId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ApiConversation[]>([]);
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [draftMessage, setDraftMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [convError, setConvError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeConvIdRef = useRef<string | undefined>(undefined);

  // Scroll to bottom of chat
  function scrollToBottom() {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  // Load current user once
  useEffect(() => {
    getMe()
      .then((res) => { if (res.data?.id) setMyId(res.data.id); })
      .catch(() => {});
  }, []);

  // Load conversations
  const refreshConversations = useCallback(() => {
    getConversations()
      .then((data) => {
        setConversations(data);
        setConvError(null);
      })
      .catch((err: unknown) => {
        setConvError(err instanceof Error ? err.message : "Failed to load conversations");
      })
      .finally(() => setLoadingConvs(false));
  }, []);

  useEffect(() => {
    setLoadingConvs(true);
    refreshConversations();
  }, [refreshConversations]);

  const activeConversationId = conversationId ?? conversations[0]?.id;

  // Fetch messages for the active conversation + start polling
  const fetchActiveMessages = useCallback(
    (convId: string, showLoader = false) => {
      if (showLoader) setLoadingMsgs(true);
      return getMessages(convId)
        .then((data) => {
          setMessages(data);
          return data;
        })
        .catch(() => [])
        .finally(() => { if (showLoader) setLoadingMsgs(false); });
    },
    [],
  );

  useEffect(() => {
    if (!activeConversationId) return;

    // Stop previous poll
    if (pollRef.current) clearInterval(pollRef.current);

    activeConvIdRef.current = activeConversationId;
    fetchActiveMessages(activeConversationId, true).then(scrollToBottom);

    pollRef.current = setInterval(() => {
      if (activeConvIdRef.current) {
        fetchActiveMessages(activeConvIdRef.current).then((data) => {
          if (data.length > messages.length) scrollToBottom();
        });
      }
    }, POLL_INTERVAL);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversationId]);

  // Filtered conversations list
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const other = getOtherParticipant(conv, myId);
      const name = other ? `${other.firstName} ${other.lastName}` : "";
      const lastMsg = conv.messages[0]?.body ?? "";
      const haystack = `${name} ${lastMsg}`.toLowerCase();
      if (!haystack.includes(query.trim().toLowerCase())) return false;
      if (filter === "Unread") {
        // No unreadCount from server yet — skip Unread filter for now
      }
      return true;
    });
  }, [conversations, filter, myId, query]);

  const activeConversation = filteredConversations.find((c) => c.id === activeConversationId)
    ?? conversations.find((c) => c.id === activeConversationId)
    ?? filteredConversations[0];

  const otherParticipant = activeConversation
    ? getOtherParticipant(activeConversation, myId)
    : null;

  async function sendMessage() {
    if (!draftMessage.trim() || !activeConversationId || sending) return;
    const text = draftMessage.trim();
    setDraftMessage("");
    setSendError(null);
    setSending(true);

    try {
      await sendMessageToConversation(activeConversationId, text);
      const data = await fetchActiveMessages(activeConversationId);
      if (data) scrollToBottom();
      refreshConversations();
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Failed to send message");
      setDraftMessage(text); // restore draft on error
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Messages"
          title="Keep conversations intentional and safe"
          description="Search conversations, follow read states, and stay inside a trust-aware messaging flow."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-halo lg:grid lg:grid-cols-[0.9fr_1.1fr]">

          {/* Sidebar */}
          <aside className="border-b border-brand-forest/10 p-6 lg:border-b-0 lg:border-r">
            <div className="grid gap-4">
              <input
                className="input-shell"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
              />
              <select
                className="input-shell"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Unread</option>
              </select>
            </div>

            <div className="mt-6 grid gap-3">
              {loadingConvs ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin text-brand-forest/40" size={24} />
                </div>
              ) : convError ? (
                <p className="text-sm text-rose-600 px-2">{convError}</p>
              ) : filteredConversations.length === 0 ? (
                <p className="text-sm text-brand-forest/50 px-2">No conversations yet.</p>
              ) : (
                filteredConversations.map((conv) => {
                  const other = getOtherParticipant(conv, myId);
                  const avatar = other?.photos[0]?.url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(`${other?.firstName ?? "?"} ${other?.lastName ?? ""}`)}&background=1C1240&color=fff`;
                  const lastMsg = conv.messages[0];
                  const isActive = activeConversation?.id === conv.id;

                  return (
                    <button
                      key={conv.id}
                      className={`flex w-full items-center gap-4 rounded-[1.5rem] px-4 py-4 text-left transition ${isActive ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest hover:bg-brand-forest/10"}`}
                      onClick={() => navigate(`/messages/${conv.id}`)}
                      type="button"
                    >
                      <img
                        alt={`${other?.firstName} ${other?.lastName}`}
                        className="h-14 w-14 rounded-full object-cover"
                        src={avatar}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold truncate">
                            {other ? `${other.firstName} ${other.lastName}` : "Unknown"}
                          </p>
                          {lastMsg && (
                            <p className={`text-xs shrink-0 ${isActive ? "text-white/70" : "text-brand-forest/55"}`}>
                              {formatTime(lastMsg.sentAt)}
                            </p>
                          )}
                        </div>
                        <p className={`truncate text-sm ${isActive ? "text-white/80" : "text-brand-forest/70"}`}>
                          {lastMsg?.body ?? "No messages yet"}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Chat panel */}
          <div className="flex min-h-[42rem] flex-col">
            {!activeConversation ? (
              <div className="flex flex-1 items-center justify-center p-10 text-center">
                <div>
                  <MessageCircleMore className="mx-auto text-brand-forest/20" size={48} />
                  <p className="mt-4 text-base font-semibold text-brand-forest/50">Select a conversation to start messaging</p>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="border-b border-brand-forest/10 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {otherParticipant && (
                        <img
                          alt={`${otherParticipant.firstName} ${otherParticipant.lastName}`}
                          className="h-14 w-14 rounded-full object-cover"
                          src={
                            otherParticipant.photos[0]?.url ??
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(`${otherParticipant.firstName} ${otherParticipant.lastName}`)}&background=1C1240&color=fff`
                          }
                        />
                      )}
                      <div>
                        <p className="font-display text-2xl font-semibold text-brand-ink">
                          {otherParticipant
                            ? `${otherParticipant.firstName} ${otherParticipant.lastName}`
                            : "Conversation"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm font-semibold">
                      {otherParticipant && (
                        <Link
                          className="rounded-full border border-brand-forest/15 px-4 py-2 text-brand-forest"
                          to={`/matches/${otherParticipant.id}`}
                        >
                          View profile
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {loadingMsgs ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="animate-spin text-brand-forest/40" size={24} />
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="text-center text-sm text-brand-forest/50">No messages yet. Say hello!</p>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.senderId === myId;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[32rem] rounded-[1.6rem] px-5 py-4 text-sm leading-7 ${isMe ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`}
                          >
                            <p>{msg.body}</p>
                            <p className={`mt-2 text-xs ${isMe ? "text-white/70" : "text-brand-forest/55"}`}>
                              {formatTime(msg.sentAt)}
                              {isMe && msg.status ? ` · ${msg.status.toLowerCase()}` : ""}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Composer */}
                <div className="border-t border-brand-forest/10 px-6 py-5">
                  {sendError ? (
                    <p className="mb-2 text-xs text-rose-600">{sendError}</p>
                  ) : null}
                  <div className="rounded-[1.6rem] border border-brand-forest/10 bg-brand-forest/5 p-4">
                    <textarea
                      className="min-h-[5rem] w-full resize-none bg-transparent text-sm leading-7 text-brand-ink outline-none"
                      value={draftMessage}
                      onChange={(e) => setDraftMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message…"
                      disabled={sending}
                    />
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-brand-forest/55">Enter = send · Shift+Enter = new line</p>
                      <button
                        className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={sendMessage}
                        disabled={sending || !draftMessage.trim()}
                        type="button"
                      >
                        {sending ? <Loader2 className="animate-spin" size={15} /> : <Send size={15} />}
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ProfilePage ──────────────────────────────────────────────────────────────

export function ProfilePage() {
  const draft = loadOnboardingDraft();
  const profileStrength = draft.completed ? 95 : 78;

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="My profile"
          title="Review the profile other serious matches will see"
          description="Everything here reflects the onboarding flow, verification status, and the signals the matching engine uses."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <RevealOnScroll>
            <div className="surface-card p-7">
              <h2 className="mt-6 font-display text-4xl font-semibold text-brand-ink">My Profile</h2>
              <p className="mt-2 text-brand-clay">
                {draft.personal.state} · {draft.ethnicity.ethnicGroup}
              </p>
              <p className="mt-5 text-sm leading-7 text-brand-forest/80">{draft.personal.bio}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Email verified",
                  "Phone verified",
                  draft.verification.status,
                  draft.genotype.genotype
                    ? `${draft.genotype.genotype} · Verified`
                    : "Genotype private",
                ].map((item) => (
                  <span key={item} className="pill-chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 h-3 rounded-full bg-brand-forest/10">
                <div
                  className="h-3 rounded-full bg-brand-clay"
                  style={{ width: `${profileStrength}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-brand-forest">
                Profile strength: {profileStrength}% complete
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white"
                  to="/profile/edit"
                >
                  Edit profile
                </Link>
              </div>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6">
            {[
              {
                heading: "Personal info",
                body: [
                  `Height: ${draft.personal.height}`,
                  `Body type: ${draft.personal.bodyType}`,
                  `Education: ${draft.personal.education}`,
                  `Occupation: ${draft.personal.occupation}`,
                  `Income: ${draft.personal.incomeRange}`,
                ],
              },
              {
                heading: "Ethnic group & language",
                body: [
                  `Ethnic group: ${draft.ethnicity.ethnicGroup || "Open to all"}`,
                  "Primary languages: English + local language preference",
                ],
              },
              {
                heading: "Religion & practice",
                body: [
                  `Faith: ${draft.religion.faith}`,
                  `Subgroup: ${draft.religion.subgroup}`,
                  `Practice level: ${draft.religion.practiceLevel}`,
                ],
              },
              {
                heading: "Marriage preference",
                body: [
                  `Marriage types: ${draft.marriage.marriageTypes.join(", ") || "None selected"}`,
                  `Timeline: ${draft.marriage.timeline}`,
                ],
              },
              {
                heading: "Genotype",
                body: [
                  draft.genotype.genotype
                    ? `${draft.genotype.genotype} · ${draft.genotype.privacy}`
                    : "Not added yet",
                ],
              },
            ].map((section, index) => (
              <RevealOnScroll key={section.heading} delay={index * 60}>
                <div className="surface-card p-7">
                  <h2 className="font-display text-3xl font-semibold text-brand-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-5 grid gap-3 text-sm leading-7 text-brand-forest/80">
                    {section.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
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

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export function SettingsPage() {
  const [tab, setTab] = useState("Account");
  const tabs = ["Account", "Privacy", "Notifications", "Preferences", "Safety", "Data"];

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Settings"
          title="Control privacy, notifications, and account safety"
          description="Every high-trust relationship product needs clear settings for visibility, security, and personal data."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="flex flex-wrap gap-3">
          {tabs.map((item) => (
            <button
              key={item}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === item ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest"}`}
              onClick={() => setTab(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="surface-card p-8">
          {tab === "Account" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input className="input-shell" placeholder="Email address" type="email" />
              <input className="input-shell" placeholder="Phone number" type="tel" />
              <input className="input-shell" placeholder="Current password" type="password" />
              <input className="input-shell" placeholder="New password" type="password" />
              <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white col-span-full w-fit">
                Save changes
              </button>
            </div>
          ) : null}
          {tab === "Privacy" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {["Profile visibility", "Genotype visibility", "Last seen", "Read receipts", "Activity status", "Who can message you"].map((item) => (
                <label key={item} className="grid gap-2">
                  <span className="text-sm font-semibold text-brand-forest">{item}</span>
                  <select className="input-shell">
                    <option>Matches only</option>
                    <option>Everyone</option>
                    <option>Private</option>
                  </select>
                </label>
              ))}
            </div>
          ) : null}
          {tab === "Notifications" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {["New matches", "Connection requests", "Messages", "Promotional"].map((item) => (
                <label key={item} className="inline-flex items-center gap-3 rounded-[1.4rem] bg-brand-forest/5 px-5 py-4">
                  <input defaultChecked type="checkbox" /> {item}
                </label>
              ))}
            </div>
          ) : null}
          {tab === "Preferences" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">Language</span>
                <select className="input-shell"><option>English</option></select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-brand-forest">Theme</span>
                <select className="input-shell"><option>Light</option><option>Dark</option></select>
              </label>
            </div>
          ) : null}
          {tab === "Safety" ? (
            <div className="grid gap-4">
              <p className="text-sm text-brand-forest/60">Users you have blocked will appear here.</p>
            </div>
          ) : null}
          {tab === "Data" ? (
            <div className="grid gap-4">
              <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white w-fit">
                Download my data
              </button>
              <button className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700 w-fit">
                Delete account
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

// ─── SafetyPage ───────────────────────────────────────────────────────────────

export function SafetyPage() {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Safety"
          title="Review verification status, reports, and safety guidance"
          description="Trust features need to be visible, understandable, and easy to act on when something feels wrong."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Verification dashboard</h2>
            <div className="mt-6 grid gap-4">
              {["Email · Verified", "Phone · Verified", "ID · Pending manual review", "Photos · Under review", "Genotype · Verified"].map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">{item}</div>
              ))}
            </div>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Report a user</h2>
            <div className="mt-6 grid gap-4">
              <input className="input-shell" placeholder="Search user" />
              <select className="input-shell">
                <option>Scam</option>
                <option>Catfish</option>
                <option>Inappropriate</option>
                <option>Other</option>
              </select>
              <textarea className="input-shell min-h-[9rem]" placeholder="Describe the issue" />
              <button className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Submit report</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {safetyTips.map((tip) => (
            <div key={tip} className="surface-card p-6 text-sm leading-7 text-brand-forest/80">{tip}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── HelpPage ─────────────────────────────────────────────────────────────────

export function HelpPage() {
  const [subject, setSubject] = useState(supportSubjects[0]);

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Help & support"
          title="Find answers quickly or contact support"
          description="Search product guidance, browse the knowledge base, or send a support request directly."
        />
      </section>
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Knowledge base</h2>
            <div className="mt-6 grid gap-3">
              {helpTopics.map((topic) => (
                <div key={topic} className="rounded-[1.4rem] bg-brand-forest/5 px-5 py-4 text-sm font-semibold text-brand-forest">
                  {topic}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              {categorizedFaqs.slice(0, 3).map((group) => (
                <details key={group.category} className="rounded-[1.5rem] border border-brand-forest/10 bg-white px-5 py-4">
                  <summary className="cursor-pointer font-semibold text-brand-ink">{group.category}</summary>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-brand-forest/80">
                    {group.items.map((item) => (
                      <p key={item.question}>
                        <span className="font-semibold text-brand-ink">{item.question}</span>
                        <br />
                        {item.answer}
                      </p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="surface-card p-7">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">Contact support</h2>
            <div className="mt-6 grid gap-4">
              <select className="input-shell" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {supportSubjects.map((item) => <option key={item}>{item}</option>)}
              </select>
              <input className="input-shell" placeholder="Your email address" type="email" />
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
            { icon: ShieldCheck, title: "Safety guidance", body: "Use reporting, blocking, and verification tools effectively." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="surface-card p-6">
                <Icon className="text-brand-emerald" size={22} />
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-forest/80">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
