import { useEffect, useRef, useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   SACRED MATCH — Cinematic Loading Screen

   Sequence:
   1. LOADING  — floating gold particles + SVG ring drawing itself + SM monogram
   2. CHARGED  — ring completes, gold flash, particles intensify
   3. REVEAL   — gold lines shoot outward, letters flip in 3D one-by-one,
                  ornamental filigree wings extend, tagline compresses in
   4. HOLD     — everything pristine
   5. EXIT     — vertical curtain split (left half ← | → right half)
   6. DONE     — unmount
   ──────────────────────────────────────────────────────────────────────────── */

type Phase = "loading" | "charged" | "reveal" | "hold" | "exit" | "done";

const SACRED = "SACRED".split("");
const MATCH  = "MATCH".split("");

// Generate random particles once
function makeParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.45,
  }));
}

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [letterIdx, setLetterIdx] = useState(-1);       // current letter being revealed (-1 = none)
  const [linesShot, setLinesShot] = useState(false);     // gold lines extended
  const [filigreeOpen, setFiligreeOpen] = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const particles = useMemo(() => makeParticles(35), []);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timerRef.current.forEach(clearTimeout); timerRef.current = []; };
  const t = (fn: () => void, ms: number) => { timerRef.current.push(setTimeout(fn, ms)); };

  // ── Wait for page load ────────────────────────────────────────────────────
  useEffect(() => {
    const MIN = 600;
    const t0 = Date.now();
    const go = () => {
      const wait = Math.max(0, MIN - (Date.now() - t0));
      setTimeout(() => setPhase("charged"), wait);
    };
    document.readyState === "complete"
      ? go()
      : window.addEventListener("load", go, { once: true });
  }, []);

  // ── CHARGED — flash + transition to reveal ────────────────────────────────
  useEffect(() => {
    if (phase !== "charged") return;
    setFlashVisible(true);
    t(() => setFlashVisible(false), 220);
    t(() => setPhase("reveal"), 350);
    return clearTimers;
  }, [phase]);

  // ── REVEAL — orchestrate the full entrance ────────────────────────────────
  useEffect(() => {
    if (phase !== "reveal") return;

    // Gold lines shoot out
    t(() => setLinesShot(true), 0);

    // Letters flip in — SACRED (top) then MATCH (bottom)
    const totalLetters = SACRED.length + MATCH.length;
    for (let i = 0; i < totalLetters; i++) {
      t(() => setLetterIdx(i), 100 + i * 75);
    }

    // Filigree wings after letters
    t(() => setFiligreeOpen(true), 100 + totalLetters * 75 + 100);

    // Tagline
    t(() => setTaglineIn(true), 100 + totalLetters * 75 + 350);

    // Hold
    t(() => setPhase("hold"), 100 + totalLetters * 75 + 900);

    return clearTimers;
  }, [phase]);

  // ── HOLD → EXIT ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "hold") return;
    const id = setTimeout(() => setPhase("exit"), 700);
    return () => clearTimeout(id);
  }, [phase]);

  // ── EXIT → DONE ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exit") return;
    const id = setTimeout(() => setPhase("done"), 900);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "done") return null;

  const isExiting = phase === "exit";
  const pastLoading = phase !== "loading";
  const showContent = ["reveal", "hold", "exit"].includes(phase);

  // SVG ring
  const R = 44;
  const CIRC = 2 * Math.PI * R;

  return (
    <>
      {/* ── LEFT CURTAIN ─────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 z-[9999] h-full w-1/2 overflow-hidden select-none"
        style={{
          background: "linear-gradient(135deg, #0e0728 0%, #130a30 50%, #08031a 100%)",
          transform: isExiting ? "translateX(-100%)" : "translateX(0)",
          transition: isExiting ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          willChange: "transform",
        }}
      >
        {/* Particles (left half) */}
        {particles.filter(p => p.x < 50).map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x * 2}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(201,162,39,${p.opacity}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${p.size * 3}px rgba(201,162,39,${p.opacity * 0.5})`,
              animation: `smFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── RIGHT CURTAIN ────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 right-0 z-[9999] h-full w-1/2 overflow-hidden select-none"
        style={{
          background: "linear-gradient(225deg, #0e0728 0%, #130a30 50%, #08031a 100%)",
          transform: isExiting ? "translateX(100%)" : "translateX(0)",
          transition: isExiting ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          willChange: "transform",
        }}
      >
        {/* Particles (right half) */}
        {particles.filter(p => p.x >= 50).map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${(p.x - 50) * 2}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(201,162,39,${p.opacity}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${p.size * 3}px rgba(201,162,39,${p.opacity * 0.5})`,
              animation: `smFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── CENTER CONTENT (above curtains) ──────────────────────────────── */}
      <div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center select-none pointer-events-none"
        style={{
          opacity: isExiting ? 0 : 1,
          transition: isExiting ? "opacity 0.65s ease" : "none",
        }}
      >
        {/* ── Gold flash on ring complete ─────────────────────────────────── */}
        {flashVisible && (
          <div
            className="absolute rounded-full"
            style={{
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(255,230,100,0.7) 0%, rgba(201,162,39,0.2) 50%, transparent 70%)",
              animation: "smFlash 0.22s ease-out forwards",
            }}
          />
        )}

        {/* ── SVG Ring + SM Monogram ──────────────────────────────────────── */}
        <div className="relative mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="smGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#C9A227" />
                <stop offset="50%"  stopColor="#F5E17D" />
                <stop offset="100%" stopColor="#C9A227" />
              </linearGradient>
            </defs>

            {/* Track */}
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(201,162,39,0.06)" strokeWidth="1" />

            {/* Animated stroke */}
            <circle
              cx="60" cy="60" r={R}
              fill="none"
              stroke="url(#smGoldStroke)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={pastLoading ? 0 : CIRC * 0.25}
              style={{
                transformOrigin: "60px 60px",
                transform: "rotate(-90deg)",
                animation: phase === "loading" ? "smRingSpin 1.3s linear infinite" : "none",
                transition: pastLoading ? "stroke-dashoffset 0.5s ease" : "none",
                filter: pastLoading ? "drop-shadow(0 0 5px rgba(201,162,39,0.7))" : "none",
              }}
            />

            {/* 4 small diamond accents on ring */}
            {pastLoading && [0, 90, 180, 270].map(deg => {
              const rad = (deg - 90) * Math.PI / 180;
              const cx = 60 + R * Math.cos(rad);
              const cy = 60 + R * Math.sin(rad);
              return (
                <rect
                  key={deg}
                  x={cx - 2} y={cy - 2}
                  width={4} height={4}
                  fill="#F5E17D"
                  transform={`rotate(45 ${cx} ${cy})`}
                  style={{
                    opacity: 0,
                    animation: `smDiamondPop 0.35s ease ${0.15 + deg / 1000}s forwards`,
                  }}
                />
              );
            })}
          </svg>

          {/* SM Monogram */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.15rem",
              letterSpacing: "0.14em",
              fontWeight: "normal",
              color: pastLoading ? "#F5E17D" : "rgba(201,162,39,0.4)",
              textShadow: pastLoading ? "0 0 14px rgba(201,162,39,0.8)" : "none",
              transition: "color 0.4s ease, text-shadow 0.4s ease",
            }}
          >
            SM
          </div>
        </div>

        {/* ── SHOOTING GOLD LINES (left ← ─── · ─── → right) ────────────── */}
        <div className="relative flex items-center justify-center w-full mb-5" style={{ height: 2 }}>
          {/* Left line */}
          <div
            className="absolute right-1/2"
            style={{
              height: 2,
              width: linesShot ? "min(38vw, 300px)" : 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.3) 30%, #F5E17D 100%)",
              boxShadow: linesShot ? "0 0 12px rgba(201,162,39,0.5), 0 0 4px rgba(201,162,39,0.8)" : "none",
              transition: "width 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease",
              transformOrigin: "right center",
            }}
          />
          {/* Center diamond */}
          <div
            style={{
              width: 8, height: 8,
              background: "#F5E17D",
              transform: "rotate(45deg)",
              boxShadow: "0 0 10px rgba(201,162,39,0.8)",
              opacity: linesShot ? 1 : 0,
              transition: "opacity 0.3s ease 0.15s",
              zIndex: 1,
            }}
          />
          {/* Right line */}
          <div
            className="absolute left-1/2"
            style={{
              height: 2,
              width: linesShot ? "min(38vw, 300px)" : 0,
              background: "linear-gradient(270deg, transparent 0%, rgba(201,162,39,0.3) 30%, #F5E17D 100%)",
              boxShadow: linesShot ? "0 0 12px rgba(201,162,39,0.5), 0 0 4px rgba(201,162,39,0.8)" : "none",
              transition: "width 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* ── SACRED — letters flip in from top ──────────────────────────── */}
        <div className="flex items-center justify-center overflow-hidden mb-1" style={{ minHeight: "3rem" }}>
          {SACRED.map((char, i) => {
            const visible = letterIdx >= i;
            return (
              <span
                key={`s-${i}`}
                style={{
                  display: "inline-block",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.8rem, 5.5vw, 3rem)",
                  fontWeight: "normal",
                  letterSpacing: "0.28em",
                  color: "#ffffff",
                  transform: visible ? "rotateX(0deg) translateY(0)" : "rotateX(-90deg) translateY(-20px)",
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                  textShadow: visible ? "0 0 30px rgba(201,162,39,0.3)" : "none",
                  perspective: "600px",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* ── MATCH — letters flip in from bottom ────────────────────────── */}
        <div className="flex items-center justify-center overflow-hidden mb-5" style={{ minHeight: "3rem" }}>
          {MATCH.map((char, i) => {
            const idx = SACRED.length + i;
            const visible = letterIdx >= idx;
            return (
              <span
                key={`m-${i}`}
                style={{
                  display: "inline-block",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.8rem, 5.5vw, 3rem)",
                  fontWeight: "normal",
                  letterSpacing: "0.28em",
                  color: "#ffffff",
                  transform: visible ? "rotateX(0deg) translateY(0)" : "rotateX(90deg) translateY(20px)",
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                  textShadow: visible ? "0 0 30px rgba(201,162,39,0.3)" : "none",
                  perspective: "600px",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* ── ORNAMENTAL FILIGREE — gold wings with star accents ──────────── */}
        <div className="relative flex items-center justify-center w-full mb-4" style={{ height: 14 }}>
          {/* Left wing */}
          <svg
            className="absolute"
            style={{
              right: "calc(50% + 10px)",
              width: filigreeOpen ? "min(28vw, 200px)" : 0,
              height: 14,
              overflow: "visible",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
            viewBox="0 0 200 14"
            preserveAspectRatio="xMaxYMid meet"
          >
            <line x1="200" y1="7" x2="20" y2="7" stroke="#C9A227" strokeWidth="1" opacity="0.6" />
            <line x1="200" y1="7" x2="40" y2="7" stroke="url(#filGrad)" strokeWidth="0.5" />
            <circle cx="20" cy="7" r="2" fill="#F5E17D" />
            <polygon points="8,7 12,3 16,7 12,11" fill="#C9A227" opacity="0.7" />
            <defs>
              <linearGradient id="filGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="#C9A227" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center star */}
          <div
            style={{
              fontSize: "0.55rem",
              color: "#F5E17D",
              textShadow: "0 0 8px rgba(201,162,39,0.9)",
              opacity: filigreeOpen ? 1 : 0,
              transform: filigreeOpen ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)",
              transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ✦
          </div>

          {/* Right wing */}
          <svg
            className="absolute"
            style={{
              left: "calc(50% + 10px)",
              width: filigreeOpen ? "min(28vw, 200px)" : 0,
              height: 14,
              overflow: "visible",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
            viewBox="0 0 200 14"
            preserveAspectRatio="xMinYMid meet"
          >
            <line x1="0" y1="7" x2="180" y2="7" stroke="#C9A227" strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="7" x2="160" y2="7" stroke="url(#filGradR)" strokeWidth="0.5" />
            <circle cx="180" cy="7" r="2" fill="#F5E17D" />
            <polygon points="184,7 188,3 192,7 188,11" fill="#C9A227" opacity="0.7" />
            <defs>
              <linearGradient id="filGradR" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="#C9A227" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── TAGLINE — letter-spacing compresses in ─────────────────────── */}
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "0.65rem",
            letterSpacing: taglineIn ? "0.32em" : "1.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            paddingRight: taglineIn ? "0.32em" : "1.2em",
            opacity: taglineIn ? 1 : 0,
            transition: "opacity 0.7s ease, letter-spacing 0.8s cubic-bezier(0.22,1,0.36,1), padding-right 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          Serious connections only
        </p>
      </div>
    </>
  );
}
