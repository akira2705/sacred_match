import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BRAND = "SACRED MATCH";
const CHAR_DELAY = 60;       // ms between each character starting to settle
const SCRAMBLE_DURATION = 300; // ms each character scrambles before locking

type Phase = "loading" | "completed" | "revealing" | "holding" | "exit" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [chars, setChars] = useState<string[]>(
    BRAND.split("").map(c => (c === " " ? " " : SCRAMBLE_CHARS[0]))
  );
  const [lineReady, setLineReady] = useState(false);
  const [taglineReady, setTaglineReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  // ── Phase: loading → completed (on window.load) ──────────────────────────
  useEffect(() => {
    const MIN_DISPLAY = 500;
    const startTime = Date.now();

    const onLoaded = () => {
      const wait = Math.max(0, MIN_DISPLAY - (Date.now() - startTime));
      setTimeout(() => setPhase("completed"), wait);
    };

    if (document.readyState === "complete") {
      onLoaded();
    } else {
      window.addEventListener("load", onLoaded, { once: true });
    }
  }, []);

  // ── Phase: completed → revealing (ring glow moment) ──────────────────────
  useEffect(() => {
    if (phase !== "completed") return;
    const t = setTimeout(() => setPhase("revealing"), 480);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Phase: revealing — scramble animation ─────────────────────────────────
  useEffect(() => {
    if (phase !== "revealing") return;

    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;

      const next = BRAND.split("").map((target, i) => {
        if (target === " ") return " ";
        const charStart = i * CHAR_DELAY;
        const settledAt = charStart + SCRAMBLE_DURATION;
        if (elapsed < charStart) return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        if (elapsed >= settledAt) return target;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });

      setChars(next);

      // Last non-space char index
      const lastIdx = BRAND.split("").reduce((acc, c, i) => (c !== " " ? i : acc), 0);
      const allSettledAt = lastIdx * CHAR_DELAY + SCRAMBLE_DURATION + 80;

      if (elapsed >= allSettledAt) {
        setChars(BRAND.split("")); // lock to final
        setLineReady(true);
        setTimeout(() => setTaglineReady(true), 350);
        setTimeout(() => setPhase("holding"), 950);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // ── Phase: holding → exit ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "holding") return;
    const t = setTimeout(() => setPhase("exit"), 650);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Phase: exit → done (after iris animation completes) ───────────────────
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setPhase("done"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  // SVG ring geometry
  const r = 42;
  const circ = 2 * Math.PI * r; // ≈ 263.9

  const isSpinning = phase === "loading";
  const isComplete = phase !== "loading";
  const showText = phase === "revealing" || phase === "holding" || phase === "exit";
  const isExiting = phase === "exit";

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 42% 38%, #1c0f3d 0%, #0a061a 55%, #060310 100%)",
        clipPath: isExiting ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: isExiting ? "clip-path 1s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        willChange: "clip-path",
      }}
    >
      {/* ── Ambient radial glow ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,107,224,0.14) 0%, transparent 68%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── SVG ring + SM monogram ────────────────────────────────────────── */}
      <div className="relative mb-8 flex items-center justify-center">
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          style={{ overflow: "visible" }}
          aria-hidden
        >
          <defs>
            <linearGradient id="smArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E8C96A" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="smRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A227" />
              <stop offset="50%" stopColor="#F0D878" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          </defs>

          {/* Track (faint full circle) */}
          <circle
            cx="55" cy="55" r={r}
            fill="none"
            stroke="rgba(201,162,39,0.08)"
            strokeWidth="1"
          />

          {/* Animated arc / complete ring */}
          <circle
            cx="55" cy="55" r={r}
            fill="none"
            stroke={isComplete ? "url(#smRingGrad)" : "url(#smArcGrad)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={
              isComplete
                ? `${circ} 0`
                : `${circ * 0.68} ${circ}`
            }
            strokeDashoffset="0"
            style={{
              transformOrigin: "55px 55px",
              transform: "rotate(-90deg)",
              animation: isSpinning ? "smRingRotate 1.25s linear infinite" : "none",
              filter: isComplete
                ? "drop-shadow(0 0 7px rgba(201,162,39,0.75))"
                : "none",
              transition: isComplete
                ? "stroke-dasharray 0.55s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease"
                : "none",
            }}
          />
        </svg>

        {/* SM monogram */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            color: isComplete ? "#F0D878" : "rgba(201,162,39,0.45)",
            textShadow: isComplete ? "0 0 22px rgba(201,162,39,0.85)" : "none",
            animation: isSpinning ? "smMonoPulse 2.2s ease-in-out infinite" : "none",
            transition: "color 0.5s ease, text-shadow 0.5s ease",
          }}
        >
          SM
        </div>
      </div>

      {/* ── Brand name — scramble reveal ──────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(1.1rem, 3.2vw, 1.75rem)",
          letterSpacing: "0.42em",
          color: "#ffffff",
          minHeight: "2.6rem",
          marginBottom: "1rem",
          opacity: showText ? 1 : 0,
          transition: "opacity 0.35s ease",
          paddingRight: "0.42em", // compensate for trailing letter-spacing
        }}
      >
        {chars.map((char, i) => {
          const isSettled = char === BRAND[i];
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                minWidth: char === " " ? "0.55em" : undefined,
                color: isSettled ? "#ffffff" : "rgba(201,162,39,0.5)",
                transition: "color 0.08s ease",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* ── Gold divider ─────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          height: "1px",
          width: "180px",
          background: "linear-gradient(90deg, transparent 0%, #C9A227 50%, transparent 100%)",
          marginBottom: "0.9rem",
          transform: lineReady ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* ── Tagline ───────────────────────────────────────────────────────── */}
      <p
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "0.6rem",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          opacity: taglineReady ? 1 : 0,
          transform: taglineReady ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        Serious connections only
      </p>
    </div>
  );
}
