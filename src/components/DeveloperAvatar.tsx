// Animated illustration of a developer typing on a laptop.
// Animations are CSS keyframes in globals.css (av-*), disabled for reduced motion.
export default function DeveloperAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Illustration of a developer typing on a laptop">
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="av-hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 70%, var(--accent-2))" />
        </linearGradient>
        <linearGradient id="av-laptop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4e4e7" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#av-bg)" />
      <circle cx="200" cy="200" r="150" fill="var(--surface)" opacity="0.35" />

      {/* Floating code glyphs */}
      <g className="av-float-1" fontFamily="var(--font-geist-mono), monospace" fontWeight="700" fontSize="20">
        <text x="62" y="120" fill="var(--accent)">{"</>"}</text>
      </g>
      <g className="av-float-2" fontFamily="var(--font-geist-mono), monospace" fontWeight="700" fontSize="18">
        <text x="300" y="100" fill="var(--accent-2)">{"{ }"}</text>
      </g>
      <g className="av-float-3" fontFamily="var(--font-geist-mono), monospace" fontWeight="700" fontSize="14">
        <text x="306" y="210" fill="var(--accent)">SQL</text>
      </g>

      {/* Body */}
      <path d="M112 330 C112 255 148 214 200 214 C252 214 288 255 288 330 Z" fill="url(#av-hoodie)" />
      <path d="M178 216 L200 246 L222 216" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
      <line x1="190" y1="236" x2="188" y2="262" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <line x1="210" y1="236" x2="212" y2="262" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <rect x="187" y="192" width="26" height="26" rx="8" fill="#b9825a" />

      {/* Head (gently bobbing) */}
      <g className="av-head">
        <circle cx="151" cy="158" r="10" fill="#c68b5f" />
        <circle cx="249" cy="158" r="10" fill="#c68b5f" />
        <circle cx="200" cy="152" r="50" fill="#c99065" />
        {/* Hair */}
        <path d="M150 150 C146 92 254 86 251 148 C246 126 232 116 214 116 C204 126 182 128 166 122 C158 130 153 139 150 150 Z" fill="#1c1917" />
        {/* Eyebrows */}
        <path d="M172 136 Q182 131 192 135" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M208 135 Q218 131 228 136" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <g className="av-blink">
          <ellipse cx="183" cy="153" rx="4.5" ry="5.5" fill="#1c1917" />
          <ellipse cx="217" cy="153" rx="4.5" ry="5.5" fill="#1c1917" />
        </g>
        {/* Glasses */}
        <circle cx="183" cy="153" r="14" fill="#ffffff" fillOpacity="0.08" stroke="#1c1917" strokeWidth="3" />
        <circle cx="217" cy="153" r="14" fill="#ffffff" fillOpacity="0.08" stroke="#1c1917" strokeWidth="3" />
        <line x1="197" y1="152" x2="203" y2="152" stroke="#1c1917" strokeWidth="3" />
        {/* Smile */}
        <path d="M187 176 Q200 188 213 176" stroke="#7c3f22" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Laptop (back of screen faces us) */}
      <rect x="126" y="244" width="148" height="92" rx="10" fill="url(#av-laptop)" />
      <g className="av-glow">
        <circle cx="200" cy="290" r="13" fill="var(--accent)" opacity="0.9" />
        <text x="200" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="var(--font-geist-mono), monospace">{"</>"}</text>
      </g>

      {/* Hands typing */}
      <circle className="av-type-l" cx="128" cy="330" r="12" fill="#c99065" />
      <circle className="av-type-r" cx="272" cy="330" r="12" fill="#c99065" />

      {/* Desk */}
      <rect x="64" y="336" width="272" height="8" rx="4" fill="var(--muted)" opacity="0.45" />
      <rect x="108" y="332" width="184" height="6" rx="3" fill="#71717a" />

      {/* Coffee mug + steam */}
      <rect x="302" y="304" width="26" height="30" rx="5" fill="var(--accent-2)" />
      <path d="M328 312 q12 0 12 9 q0 9 -12 9" fill="none" stroke="var(--accent-2)" strokeWidth="4" />
      <path className="av-steam" d="M309 296 q-5 -8 0 -16 q5 -8 0 -16" fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
      <path className="av-steam av-steam-2" d="M321 296 q-5 -8 0 -16 q5 -8 0 -16" fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
