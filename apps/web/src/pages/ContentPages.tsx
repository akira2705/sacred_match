import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Seo } from "@/components/Seo";
import { Skeleton, SkeletonText } from "@/components/Skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { blogArticles, categorizedFaqs, type BlogArticle } from "@/content/contentHubData";

export function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const haystack = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const categories = ["All", ...new Set(blogArticles.map((article) => article.category))];

  return (
    <div>
      <Seo
        title="Blog — Relationship & Genotype Guides"
        description="Read Spousia's guides on genotype compatibility, Nigerian marriage culture, profile quality, and building serious relationships."
        canonical="https://spousia.ng/blog"
      />
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="Blog"
          title="Guidance for better connections, safer conversations, and clearer decisions"
          description="Searchable editorial content on genotype, compatibility, profile quality, and relationship safety."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card p-6 sm:p-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Search articles</span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest/45" size={18} />
                <input
                  className="input-shell pl-11"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search genotype, safety, culture..."
                />
              </div>
            </label>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-brand-forest text-white" : "bg-brand-forest/5 text-brand-forest hover:bg-brand-forest/10"}`}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="section-grid">
          {filteredArticles.map((article, index) => (
            <RevealOnScroll key={article.slug} delay={index * 70}>
              <article className="surface-card overflow-hidden p-0">
                <img alt={article.title} className="h-56 w-full object-cover" src={article.image} />
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay">
                    {article.category} � {article.readTime}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink">{article.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-brand-forest/80">{article.excerpt}</p>
                  <p className="mt-5 text-sm text-brand-forest/65">By {article.author} � {article.publishedAt}</p>
                  <Link className="mt-6 inline-flex rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-emerald" to={`/blog/${article.slug}`}>
                    Read article
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}

function RelatedArticles({ article }: { article: BlogArticle }) {
  const related = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {related.map((item) => (
        <Link key={item.slug} className="surface-card p-6" to={`/blog/${item.slug}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-clay">{item.category}</p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-brand-forest/80">{item.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug) ?? blogArticles[0];

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <RevealOnScroll>
          <div className="max-w-4xl">
            <p className="eyebrow">{article.category}</p>
            <h1 className="mt-6 font-display text-5xl font-semibold text-brand-ink">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-brand-forest/80">{article.excerpt}</p>
            <p className="mt-5 text-sm text-brand-forest/60">By {article.author} � {article.publishedAt} � {article.readTime}</p>
          </div>
        </RevealOnScroll>
      </section>

      <section className="section-shell pt-0">
        <div className="overflow-hidden rounded-[2rem]">
          <img alt={article.title} className="h-[24rem] w-full object-cover" src={article.image} />
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-4xl grid gap-8">
          {article.sections.map((section, index) => (
            <RevealOnScroll key={section.heading} delay={index * 60}>
              <article className="surface-card p-8">
                <h2 className="font-display text-3xl font-semibold text-brand-ink">{section.heading}</h2>
                <div className="mt-5 grid gap-4 text-base leading-8 text-brand-forest/80">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <SectionHeading
          eyebrow="Related"
          title="More reading"
          description="Keep exploring the content that supports smarter matching and safer conversations."
        />
        <div className="mt-10">
          <RelatedArticles article={article} />
        </div>
      </section>
    </div>
  );
}

export function FaqPage() {
  const [query, setQuery] = useState("");

  const groups = categorizedFaqs
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(query.trim().toLowerCase()))
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Search the questions users ask before they trust a marriage platform"
          description="Searchable FAQs across matching, safety, genotype, messaging, and account controls."
        />
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card p-6 sm:p-8">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-brand-forest">Search the FAQ</span>
            <input className="input-shell" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search matching, genotype, messaging..." />
          </label>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-8">
          {groups.map((group, index) => (
            <RevealOnScroll key={group.category} delay={index * 70}>
              <div className="surface-card p-7">
                <h2 className="font-display text-3xl font-semibold text-brand-ink">{group.category}</h2>
                <div className="mt-6 grid gap-4">
                  {group.items.map((item) => (
                    <details key={item.question} className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-forest/5 px-5 py-4">
                      <summary className="cursor-pointer list-none font-semibold text-brand-ink">{item.question}</summary>
                      <p className="mt-4 text-sm leading-7 text-brand-forest/80">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export function LegalPage({ eyebrow, title, description, sections }: LegalPageProps) {
  return (
    <div>
      <section className="section-shell pb-10 pt-16">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-4xl grid gap-6">
          {sections.map((section) => (
            <article key={section.heading} className="surface-card p-8">
              <h2 className="font-display text-3xl font-semibold text-brand-ink">{section.heading}</h2>
              <div className="mt-5 grid gap-4 text-base leading-8 text-brand-forest/80">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
