import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

/** Single shimmer bar */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-brand-forest/8",
        className,
      )}
    />
  );
}

/** A multi-line text block placeholder */
export function SkeletonText({ lines = 3, className }: SkeletonProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

/** A card-shaped skeleton placeholder */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx("rounded-2xl border border-brand-forest/10 bg-brand-cream p-5", className)}>
      <Skeleton className="mb-4 h-40 w-full rounded-xl" />
      <Skeleton className="mb-2 h-5 w-2/3" />
      <SkeletonText lines={2} />
    </div>
  );
}

/** Full-page API loading state: grid of skeleton cards */
export function SkeletonGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={clsx("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/** Inline pill / badge skeleton */
export function SkeletonPill({ className }: { className?: string }) {
  return <Skeleton className={clsx("h-8 w-24 rounded-full", className)} />;
}
