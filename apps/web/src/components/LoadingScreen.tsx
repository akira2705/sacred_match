import { useEffect, useState } from "react";

type Phase = "loading" | "revealing" | "done";

const LOGO_TEXT = "Sacred Match";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [lettersVisible, setLettersVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = () => {
      // Step 1: animate letters in
      setLettersVisible(true);

      // Step 2: after letters settle, begin exit slide-up
      setTimeout(() => {
        setExiting(true);
        setPhase("revealing");

        // Step 3: fully unmount after slide-up completes
        setTimeout(() => {
          setPhase("done");
        }, 900);
      }, 2200);
    };

    if (document.readyState === "complete") {
      setTimeout(start, 200);
    } else {
      window.addEventListener("load", start, { once: true });
    }
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-[#1C1240]",
        "transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)]",
        exiting ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      style={{
        backgroundImage: "url('/purple-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a041c]/40" />

      <div className="relative flex flex-col items-center gap-5">

        {/* Logo mark — pulsing while loading, solid when loaded */}
        <div
          className={[
            "flex h-16 w-16 items-center justify-center rounded-full",
            "bg-gradient-to-br from-[#4A2FAD] to-[#7B6BE0]",
            "shadow-[0_0_40px_rgba(123,107,224,0.5)]",
            "transition-all duration-500",
            lettersVisible ? "scale-100 opacity-100" : "animate-[loadingPulse_1.4s_ease-in-out_infinite] opacity-90",
          ].join(" ")}
        >
          <span className="font-display text-xl font-bold tracking-tight text-white">SM</span>
        </div>

        {/* "Sacred Match" — letters appear one by one */}
        <div className="flex items-center gap-0 overflow-hidden">
          {LOGO_TEXT.split("").map((char, i) => (
            <span
              key={i}
              className="font-display font-bold text-white"
              style={{
                fontSize: "2rem",
                letterSpacing: "0.02em",
                display: "inline-block",
                opacity: 0,
                transform: "translateY(16px)",
                animation: lettersVisible
                  ? `letterRise 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms forwards`
                  : "none",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Tagline fades in after letters */}
        <p
          className="text-sm font-medium tracking-[0.25em] uppercase text-white/50"
          style={{
            opacity: 0,
            animation: lettersVisible
              ? `letterRise 0.6s cubic-bezier(0.22,1,0.36,1) ${LOGO_TEXT.length * 55 + 150}ms forwards`
              : "none",
          }}
        >
          Serious connections only
        </p>

        {/* Loading bar — visible while loading */}
        {!lettersVisible && (
          <div className="mt-4 h-0.5 w-24 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C9A227] to-[#E8C96A]"
              style={{ animation: "loadingBar 1.6s ease-in-out infinite" }}
            />
          </div>
        )}

        {/* Gold accent line under logo — fades in with letters */}
        {lettersVisible && (
          <div
            className="h-px w-20 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
            style={{
              opacity: 0,
              animation: `letterRise 0.8s ease ${LOGO_TEXT.length * 55 + 300}ms forwards`,
            }}
          />
        )}
      </div>
    </div>
  );
}
