// The same developer, standing and waving hello. Shown on the back of the hero flip card.
// Animations are CSS keyframes in globals.css (av-*); the bubble pops in when `active`.
export default function WavingAvatar({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Illustration of a developer waving hello">
      <defs>
        <linearGradient id="wv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#wv-bg)" />
      <circle cx="200" cy="200" r="150" fill="var(--surface)" opacity="0.35" />

      {/* Speech bubble */}
      <g className={`av-bubble ${active ? "is-active" : ""}`}>
        <rect x="44" y="70" width="150" height="54" rx="16" fill="#ffffff" />
        <path d="M150 122 L170 142 L168 120 Z" fill="#ffffff" />
        <text x="119" y="104" textAnchor="middle" fontSize="19" fontWeight="700" fill="#18181b" fontFamily="var(--font-geist-sans), sans-serif">
          Hi! I&apos;m Rohith 👋
        </text>
      </g>

      {/* Legs + shoes */}
      <rect x="172" y="268" width="24" height="74" rx="10" fill="#27272a" />
      <rect x="204" y="268" width="24" height="74" rx="10" fill="#27272a" />
      <ellipse cx="182" cy="346" rx="18" ry="8" fill="#e4e4e7" />
      <ellipse cx="218" cy="346" rx="18" ry="8" fill="#e4e4e7" />
      <ellipse cx="200" cy="358" rx="70" ry="6" fill="var(--muted)" opacity="0.3" />

      {/* Left arm (relaxed) */}
      <path d="M160 196 Q144 236 150 272" fill="none" stroke="var(--accent)" strokeWidth="22" strokeLinecap="round" />
      <circle cx="150" cy="280" r="11" fill="#c99065" />

      {/* Torso */}
      <path d="M150 284 L150 206 C150 182 170 170 200 170 C230 170 250 182 250 206 L250 284 Z" fill="var(--accent)" />
      <path d="M180 172 L200 198 L220 172" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" />
      <line x1="192" y1="190" x2="190" y2="214" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <line x1="208" y1="190" x2="210" y2="214" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <text x="200" y="250" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff" fillOpacity="0.85" fontFamily="var(--font-geist-mono), monospace">{"</>"}</text>

      {/* Right arm waving (rotates around the shoulder) */}
      <g className="av-wave-arm">
        <path d="M242 194 Q272 168 282 122" fill="none" stroke="var(--accent)" strokeWidth="22" strokeLinecap="round" />
        <circle cx="284" cy="110" r="13" fill="#c99065" />
        <path d="M296 92 q8 -4 12 2 M300 104 q9 -2 12 4" fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Neck + head */}
      <rect x="189" y="150" width="22" height="24" rx="7" fill="#b9825a" />
      <g className="av-head">
        <circle cx="157" cy="122" r="9" fill="#c68b5f" />
        <circle cx="243" cy="122" r="9" fill="#c68b5f" />
        <circle cx="200" cy="116" r="44" fill="#c99065" />
        <path d="M156 114 C152 62 248 56 245 112 C240 92 228 84 212 84 C203 92 184 94 170 89 C163 96 159 104 156 114 Z" fill="#1c1917" />
        <path d="M175 101 Q184 97 192 100" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M208 100 Q216 97 225 101" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <g className="av-blink">
          <ellipse cx="185" cy="117" rx="4" ry="5" fill="#1c1917" />
          <ellipse cx="215" cy="117" rx="4" ry="5" fill="#1c1917" />
        </g>
        <circle cx="185" cy="117" r="12.5" fill="#ffffff" fillOpacity="0.08" stroke="#1c1917" strokeWidth="3" />
        <circle cx="215" cy="117" r="12.5" fill="#ffffff" fillOpacity="0.08" stroke="#1c1917" strokeWidth="3" />
        <line x1="197.5" y1="116" x2="202.5" y2="116" stroke="#1c1917" strokeWidth="3" />
        {/* Open, happy smile */}
        <path d="M186 136 Q200 154 214 136 Z" fill="#7c2d12" />
        <circle cx="174" cy="134" r="5" fill="#f87171" opacity="0.35" />
        <circle cx="226" cy="134" r="5" fill="#f87171" opacity="0.35" />
      </g>
    </svg>
  );
}
