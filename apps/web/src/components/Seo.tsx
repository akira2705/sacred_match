import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_NAME = "Sacred Match";
const DEFAULT_DESCRIPTION =
  "Sacred Match is Nigeria's premium matrimony platform for culture-first compatibility, genotype awareness, and serious marriage-minded connections.";
const DEFAULT_OG_IMAGE = "https://sacred-match.ng/og-image.png";

export function Seo({ title, description, canonical, ogImage, noIndex }: SeoProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const ogImg = ogImage ?? DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const upsertMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr.split("=")[0], attr.split("=")[1] ?? attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta('meta[name="description"]', "name=description", metaDescription);
    upsertMeta('meta[property="og:title"]', "property=og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property=og:description", metaDescription);
    upsertMeta('meta[property="og:image"]', "property=og:image", ogImg);
    upsertMeta('meta[property="og:type"]', "property=og:type", "website");
    upsertMeta('meta[name="twitter:card"]', "name=twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name=twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name=twitter:description", metaDescription);
    upsertMeta('meta[name="twitter:image"]', "name=twitter:image", ogImg);

    if (noIndex) {
      upsertMeta('meta[name="robots"]', "name=robots", "noindex,nofollow");
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link") as HTMLLinkElement;
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [fullTitle, metaDescription, ogImg, canonical, noIndex]);

  return null;
}
