// Leaf, monk fruit, wave and badge icons drawn in the style of the pack.

export function LeafShape({ className, color = "#3f9a35", vein = "#e3f0d3" }: { className?: string; color?: string; vein?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden>
      <path d="M30 2 C55 20 58 62 30 98 C2 62 5 20 30 2Z" fill={color} />
      <path d="M30 10 V92" stroke={vein} strokeWidth="2" opacity="0.7" />
      {[24, 38, 52, 66].map((y) => (
        <g key={y} stroke={vein} strokeWidth="1.5" opacity="0.55" fill="none">
          <path d={`M30 ${y + 8} Q20 ${y} 14 ${y - 4}`} />
          <path d={`M30 ${y + 8} Q40 ${y} 46 ${y - 4}`} />
        </g>
      ))}
    </svg>
  );
}

export function MonkFruit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id="mf" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#b9c96a" />
          <stop offset="0.6" stopColor="#7f9a3a" />
          <stop offset="1" stopColor="#56702a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="52" r="44" fill="url(#mf)" />
      <ellipse cx="36" cy="34" rx="12" ry="7" fill="#fff" opacity="0.25" />
      <path d="M50 8 l-3 -6 M50 8 l4 -5" stroke="#5a4020" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Wave({ className, top = "#3f9a35", bottom = "#1c6a2c" }: { className?: string; top?: string; bottom?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 70 C320 10 640 110 960 60 C1180 25 1320 40 1440 55 V120 H0Z" fill={top} />
      <path d="M0 90 C360 40 700 125 1000 82 C1200 55 1340 70 1440 80 V120 H0Z" fill={bottom} />
    </svg>
  );
}

export function BadgeIcon({ kind, className }: { kind: "leaf" | "nosugar" | "heart" | "plant"; className?: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="21" {...s} />
      {kind === "leaf" && (
        <>
          <path d="M16 31 C16 20 24 14 33 14 C33 24 27 31 16 31Z" fill="currentColor" stroke="none" />
          <path d="M14 34 L26 22" {...s} stroke="#f8f3e6" />
        </>
      )}
      {kind === "nosugar" && (
        <>
          <path d="M24 13 C30 21 32 25 32 28 a8 8 0 0 1 -16 0 C16 25 18 21 24 13Z" {...s} />
          <path d="M14 34 L34 14" {...s} />
        </>
      )}
      {kind === "heart" && (
        <path d="M24 34 C14 27 13 22 13 19.5 a5.5 5.5 0 0 1 11 -1 a5.5 5.5 0 0 1 11 1 C35 22 34 27 24 34Z" {...s} />
      )}
      {kind === "plant" && (
        <>
          <path d="M24 35 V22" {...s} />
          <path d="M24 24 C24 17 18 14 13 15 C13 21 17 25 24 24Z" fill="currentColor" stroke="none" />
          <path d="M24 22 C24 15 30 12 35 13 C35 19 31 23 24 22Z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

// "Sweetzy Natura" wordmark styled after the pack logo
export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = { sm: ["text-2xl", "text-lg", "w-4"], md: ["text-3xl", "text-xl", "w-5"], lg: ["text-6xl md:text-7xl", "text-5xl md:text-6xl", "w-10"] }[size];
  return (
    <span className="relative inline-flex flex-col items-center leading-none">
      <span className="flex items-start">
        <span className={`font-script ${sz[0]} text-forest`}>Sweetzy</span>
        <LeafShape className={`${sz[2]} -ml-1 -mt-1 rotate-[30deg]`} color="#3f9a35" />
      </span>
      <span className={`font-round ${sz[1]} -mt-1 font-semibold text-leaf`}>Natura</span>
    </span>
  );
}
