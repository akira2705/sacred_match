import { useEffect, useRef, useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   SACRED MATCH — Cinematic Loading Screen

   1. LOADING  — floating gold particles, SVG ring progressively draws itself
                  while spinning, SM monogram inside
   2. CHARGED  — ring completes, gold flash, diamond accents appear
   3. REVEAL   — gold lines shoot outward, letters 3D-flip in one-by-one,
                  ornamental filigree wings, tagline letter-spacing compresses
   4. HOLD     — everything pristine
   5. EXIT     — vertical curtain split (left ← | → right)
   6. DONE     — unmount
   ──────────────────────────────────────────────────────────────────────────── */

type Phase = "loading" | "charged" | "reveal" | "hold" | "exit" | "done";

const SACRED = "SACRED".split("");
const MATCH  = "MATCH".split("");

const R    = 44;
const CIRC = 2 * Math.PI * R; // ≈ 276.5

// Generate random particles once
function makeParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,           // 4–10 px
    delay: Math.random() * 5,
    duration: 3.5 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.5,    // 0.3–0.8
  }));
}

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [ringOffset, setRingOffset] = useState(CIRC);    // fully hidden → 0 = fully drawn
  const [letterIdx, setLetterIdx] = useState(-1);
  const [linesShot, setLinesShot] = useState(false);
  const [filigreeOpen, setFiligreeOpen] = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const particles = useMemo(() => makeParticles(32), []);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef   = useRef<number | null>(null);

  const clearTimers = () => { timerRef.current.forEach(clearTimeout); timerRef.current = []; };
  const t = (fn: () => void, ms: number) => { timerRef.current.push(setTimeout(fn, ms)); };

  // ── JS-driven ring draw (ease-out over ~2.8s during loading) ──────────────
  useEffect(() => {
    if (phase !== "loading") return;
    const start = Date.now();
    const duration = 2800;
    const startOffset = CIRC;            // fully hidden
    const endOffset   = CIRC * 0.22;     // ~78% drawn

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setRingOffset(startOffset - (startOffset - endOffset) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Wait for page load → CHARGED ──────────────────────────────────────────
  useEffect(() => {
    const MIN = 800;
    const t0 = Date.now();
    const go = () => {
      const wait = Math.max(0, MIN - (Date.now() - t0));
      setTimeout(() => {
        setRingOffset(0);                  // complete the ring
        setPhase("charged");
      }, wait);
    };
    document.readyState === "complete"
      ? go()
      : window.addEventListener("load", go, { once: true });
  }, []);

  // ── CHARGED → flash → REVEAL ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "charged") return;
    setFlashVisible(true);
    t(() => setFlashVisible(false), 250);
    t(() => setPhase("reveal"), 400);
    return clearTimers;
  }, [phase]);

  // ── REVEAL — orchestrate everything ───────────────────────────────────────
  useEffect(() => {
    if (phase !== "reveal") return;

    t(() => setLinesShot(true), 0);

    const totalLetters = SACRED.length + MATCH.length;
    for (let i = 0; i < totalLetters; i++) {
      t(() => setLetterIdx(i), 120 + i * 75);
    }

    t(() => setFiligreeOpen(true), 120 + totalLetters * 75 + 120);
    t(() => setTaglineIn(true),    120 + totalLetters * 75 + 380);
    t(() => setPhase("hold"),      120 + totalLetters * 75 + 950);

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

  const isExiting  = phase === "exit";
  const isLoading  = phase === "loading";
  const pastLoading = phase !== "loading";
  const showContent = ["reveal", "hold", "exit"].includes(phase);

  // ── Diamond positions on ring ─────────────────────────────────────────────
  const diamonds = [0, 90, 180, 270].map(deg => {
    const rad = (deg - 90) * Math.PI / 180;
    return { deg, cx: 60 + R * Math.cos(rad), cy: 60 + R * Math.sin(rad) };
  });

  return (
    <>
      {/* ── LEFT CURTAIN ─────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 z-[9999] h-full w-1/2 select-none"
        style={{
          background: "linear-gradient(135deg, #0e0728 0%, #130a30 50%, #08031a 100%)",
          transform: isExiting ? "translateX(-100%)" : "translateX(0)",
          transition: isExiting ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {particles.filter(p => p.x < 50).map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x * 2}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `rgba(201,162,39,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,162,39,${p.opacity * 0.7}), 0 0 ${p.size * 4}px rgba(201,162,39,${p.opacity * 0.3})`,
              borderRadius: "50%",
              animation: `smFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── RIGHT CURTAIN ────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 right-0 z-[9999] h-full w-1/2 select-none"
        style={{
          background: "linear-gradient(225deg, #0e0728 0%, #130a30 50%, #08031a 100%)",
          transform: isExiting ? "translateX(100%)" : "translateX(0)",
          transition: isExiting ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {particles.filter(p => p.x >= 50).map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${(p.x - 50) * 2}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `rgba(201,162,39,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(201,162,39,${p.opacity * 0.7}), 0 0 ${p.size * 4}px rgba(201,162,39,${p.opacity * 0.3})`,
              borderRadius: "50%",
              animation: `smFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── CENTER CONTENT ───────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center select-none pointer-events-none"
        style={{
          opacity: isExiting ? 0 : 1,
          transition: isExiting ? "opacity 0.6s ease" : "none",
        }}
      >
        {/* ── Gold flash burst ───────────────────────────────────────────── */}
        {flashVisible && (
          <div
            className="absolute rounded-full"
            style={{
              width: 220, height: 220,
              background: "radial-gradient(circle, rgba(255,230,100,0.8) 0%, rgba(201,162,39,0.25) 50%, transparent 70%)",
              animation: "smFlash 0.25s ease-out forwards",
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

            {/* Faint track */}
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(201,162,39,0.06)" strokeWidth="1" />

            {/* Spinning group */}
            <g style={{
              transformOrigin: "60px 60px",
              animation: isLoading ? "smRingSpin 1.8s linear infinite" : "none",
              transform: isLoading ? undefined : "rotate(0deg)",
            }}>
              <circle
                cx="60" cy="60" r={R}
                fill="none"
                stroke="url(#smGoldStroke)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={ringOffset}
                style={{
                  transition: pastLoading ? "stroke-dashoffset 0.45s ease" : "none",
                  filter: pastLoading ? "drop-shadow(0 0 6px rgba(201,162,39,0.7))" : "none",
                }}
              />
            </g>

            {/* 4 diamond accents — fade+scale in, NO CSS transform animation */}
            {pastLoading && diamonds.map((d, idx) => (
              <rect
                key={d.deg}
                x={d.cx - 2.5} y={d.cy - 2.5}
                width={5} height={5}
                fill="#F5E17D"
                transform={`rotate(45 ${d.cx} ${d.cy})`}
                style={{
                  opacity: 0,
                  animation: `smFadeIn 0.35s ease ${0.1 + idx * 0.08}s forwards`,
                }}
              />
            ))}
          </svg>

          {/* SM Monogram */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.15rem",
              letterSpacing: "0.14em",
              color: pastLoading ? "#F5E17D" : "rgba(201,162,39,0.35)",
              textShadow: pastLoading ? "0 0 16px rgba(201,162,39,0.9)" : "none",
              transition: "color 0.4s ease, text-shadow 0.4s ease",
            }}
          >
            SM
          </div>
        </div>

        {/* ── SHOOTING GOLD LINES ────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center w-full mb-5" style={{ height: 2 }}>
          {/* Left line */}
          <div
            className="absolute right-1/2"
            style={{
              height: 2,
              width: linesShot ? "min(38vw, 300px)" : "0px",
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
              boxShadow: "0 0 10px rgba(201,162,39,0.8), 0 0 20px rgba(201,162,39,0.4)",
              opacity: linesShot ? 1 : 0,
              transition: "opacity 0.3s ease 0.12s",
              zIndex: 1,
            }}
          />
          {/* Right line */}
          <div
            className="absolute left-1/2"
            style={{
              height: 2,
              width: linesShot ? "min(38vw, 300px)" : "0px",
              background: "linear-gradient(270deg, transparent 0%, rgba(201,162,39,0.3) 30%, #F5E17D 100%)",
              boxShadow: linesShot ? "0 0 12px rgba(201,162,39,0.5), 0 0 4px rgba(201,162,39,0.8)" : "none",
              transition: "width 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* ── SACRED — letters 3D-flip from top ──────────────────────────── */}
        <div className="flex items-center justify-center mb-1" style={{ minHeight: "3.5rem", perspective: "800px" }}>
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
                  transform: visible ? "rotateX(0deg)" : "rotateX(-90deg)",
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                  textShadow: visible ? "0 0 30px rgba(201,162,39,0.25), 0 2px 10px rgba(0,0,0,0.5)" : "none",
                  transformOrigin: "center bottom",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* ── MATCH — letters 3D-flip from bottom ────────────────────────── */}
        <div className="flex items-center justify-center mb-5" style={{ minHeight: "3.5rem", perspective: "800px" }}>
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
                  transform: visible ? "rotateX(0deg)" : "rotateX(90deg)",
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                  textShadow: visible ? "0 0 30px rgba(201,162,39,0.25), 0 2px 10px rgba(0,0,0,0.5)" : "none",
                  transformOrigin: "center top",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* ── ORNAMENTAL FILIGREE WINGS ──────────────────────────────────── */}
        <div className="relative flex items-center justify-center w-full mb-4" style={{ height: 14 }}>
          {/* Left wing */}
          <svg
            className="absolute"
            style={{
              right: "calc(50% + 12px)",
              width: filigreeOpen ? "min(28vw, 200px)" : "0px",
              height: 14,
              overflow: "visible",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
            viewBox="0 0 200 14"
            preserveAspectRatio="xMaxYMid meet"
          >
            <line x1="200" y1="7" x2="20" y2="7" stroke="#C9A227" strokeWidth="1" opacity="0.6" />
            <line x1="200" y1="7" x2="40" y2="7" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
            <circle cx="20" cy="7" r="2.5" fill="#F5E17D" />
            <polygon points="6,7 11,3 16,7 11,11" fill="#C9A227" opacity="0.7" />
          </svg>

          {/* Center star */}
          <div
            style={{
              fontSize: "0.65rem",
              color: "#F5E17D",
              textShadow: "0 0 10px rgba(201,162,39,1), 0 0 20px rgba(201,162,39,0.5)",
              opacity: filigreeOpen ? 1 : 0,
              transform: filigreeOpen ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)",
              transition: "opacity 0.4s ease, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ✦
          </div>

          {/* Right wing */}
          <svg
            className="absolute"
            style={{
              left: "calc(50% + 12px)",
              width: filigreeOpen ? "min(28vw, 200px)" : "0px",
              height: 14,
              overflow: "visible",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
            viewBox="0 0 200 14"
            preserveAspectRatio="xMinYMid meet"
          >
            <line x1="0" y1="7" x2="180" y2="7" stroke="#C9A227" strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="7" x2="160" y2="7" stroke="#C9A227" strokeWidth="0.5" opacity="0.3" />
            <circle cx="180" cy="7" r="2.5" fill="#F5E17D" />
            <polygon points="184,7 189,3 194,7 189,11" fill="#C9A227" opacity="0.7" />
          </svg>
        </div>

        {/* ── TAGLINE — letter-spacing compress ──────────────────────────── */}
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
