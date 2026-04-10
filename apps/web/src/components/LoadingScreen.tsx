import { useEffect, useState } from "react";

type Phase = "loading" | "journeying" | "merging" | "revealing" | "holding" | "exit" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [showBrand, setShowBrand]     = useState(false);
  const [showLine, setShowLine]       = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // Trigger journey on page load
  useEffect(() => {
    const MIN = 400;
    const t0 = Date.now();
    const go = () => {
      const wait = Math.max(0, MIN - (Date.now() - t0));
      setTimeout(() => setPhase("journeying"), wait);
    };
    document.readyState === "complete"
      ? go()
      : window.addEventListener("load", go, { once: true });
  }, []);

  // journeying → merging (after orbs travel to center)
  useEffect(() => {
    if (phase !== "journeying") return;
    const t = setTimeout(() => setPhase("merging"), 1250);
    return () => clearTimeout(t);
  }, [phase]);

  // merging → revealing (bloom flash, then brand appears)
  useEffect(() => {
    if (phase !== "merging") return;
    const t1 = setTimeout(() => { setShowBrand(true); setPhase("revealing"); }, 260);
    return () => clearTimeout(t1);
  }, [phase]);

  // revealing — stagger line and tagline
  useEffect(() => {
    if (phase !== "revealing") return;
    const t1 = setTimeout(() => setShowLine(true),    380);
    const t2 = setTimeout(() => setShowTagline(true), 680);
    const t3 = setTimeout(() => setPhase("holding"),  900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  // holding → exit
  useEffect(() => {
    if (phase !== "holding") return;
    const t = setTimeout(() => setPhase("exit"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // exit → done
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setPhase("done"), 950);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  const traveling  = phase !== "loading";
  const orbsGone   = ["merging", "revealing", "holding", "exit"].includes(phase);
  const isExiting  = phase === "exit";
  const isLoading  = phase === "loading";

  return (
    <div
      className="fixed inset-0 z-[9999] select-none overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 48%, #1e0f40 0%, #08031c 65%)",
        transform: isExiting ? "scale(1.9)"  : "scale(1)",
        opacity:   isExiting ? 0             : 1,
        filter:    isExiting ? "blur(18px)"  : "none",
        transition: isExiting
          ? "transform 0.95s cubic-bezier(0.4,0,0.6,1), opacity 0.95s ease, filter 0.95s ease"
          : "none",
        willChange: "transform, opacity",
      }}
    >
      {/* ── Radar ping rings — visible while waiting ──────────────────────── */}
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute rounded-full border border-[rgba(201,162,39,0.22)]"
            style={{ width: 72, height: 72, animation: "smPing 2.4s ease-out infinite" }} />
          <div className="absolute rounded-full border border-[rgba(201,162,39,0.12)]"
            style={{ width: 72, height: 72, animation: "smPing 2.4s ease-out 1.1s infinite" }} />
        </div>
      )}

      {/* ── LEFT ORB — warm gold ───────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 110, height: 110,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,218,70,1) 0%, rgba(201,162,39,0.55) 42%, transparent 68%)",
          filter: "blur(12px)",
          transform: traveling
            ? "translate(-50%, -50%)"
            : "translate(calc(-50% - 46vw), -50%)",
          opacity: orbsGone ? 0 : 1,
          transition: "transform 1.25s cubic-bezier(0.4, 0, 1, 1), opacity 0.28s ease",
        }}
      />

      {/* ── RIGHT ORB — warm violet ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 110, height: 110,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,148,255,1) 0%, rgba(123,107,224,0.55) 42%, transparent 68%)",
          filter: "blur(12px)",
          transform: traveling
            ? "translate(-50%, -50%)"
            : "translate(calc(-50% + 46vw), -50%)",
          opacity: orbsGone ? 0 : 1,
          transition: "transform 1.25s cubic-bezier(0.4, 0, 1, 1), opacity 0.28s ease",
        }}
      />

      {/* ── BLOOM — burst of light on collision ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 220, height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,245,160,0.98) 0%, rgba(201,162,39,0.35) 48%, transparent 70%)",
          filter: "blur(22px)",
          transform: "translate(-50%, -50%)",
          opacity: phase === "merging" ? 1 : 0,
          transition: phase === "merging"
            ? "opacity 0.18s ease"
            : "opacity 0.38s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── Residual merged glow ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 140, height: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(123,107,224,0.1) 55%, transparent 70%)",
          filter: "blur(18px)",
          transform: "translate(-50%, -50%)",
          opacity: showBrand ? 1 : 0,
          transition: "opacity 0.7s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── Brand content — born from the merge ───────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{
          opacity:   showBrand ? 1 : 0,
          transform: showBrand ? "scale(1) translateY(0)" : "scale(0.9) translateY(6px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1.25rem, 3.6vw, 1.85rem)",
            fontWeight: "normal",
            letterSpacing: "0.44em",
            color: "#ffffff",
            margin: 0,
            paddingRight: "0.44em",
          }}
        >
          SACRED MATCH
        </h1>

        {/* Gold divider */}
        <div
          style={{
            height: "1px",
            width: "180px",
            background: "linear-gradient(90deg, transparent, #C9A227, transparent)",
            transform: showLine ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
            margin: 0,
            opacity:   showTagline ? 1 : 0,
            transform: showTagline ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          Serious connections only
        </p>
      </div>
    </div>
  );
}
