// The same developer, walking in place and waving hello under a night sky. Shown on the back of the hero flip card.
// Animations are CSS keyframes in globals.css (av-*); the bubble pops in when `active`.
const stars = [
  [64, 168, 1.6], [252, 40, 1.1], [300, 52, 1.4], [336, 96, 1], [70, 170, 1.2],
  [350, 170, 1.5], [60, 250, 1], [345, 250, 1.2], [110, 330, 1.1], [300, 330, 1],
];

export default function WavingAvatar({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Illustration of a developer waving hello">
      <defs>
        <radialGradient id="wv-sky" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="wv-hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Night sky */}
      <circle cx="200" cy="200" r="200" fill="url(#wv-sky)" />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" className="av-twinkle" style={{ animationDelay: `${i * 0.37}s` }} />
      ))}
      <circle cx="112" cy="56" r="16" fill="#fde68a" opacity="0.9" />
      <circle cx="120" cy="50" r="14" fill="#13213f" />

      {/* Speech bubble */}
      <g className={`av-bubble ${active ? "is-active" : ""}`}>
        <rect x="54" y="86" width="116" height="58" rx="16" fill="#ffffff" />
        <path d="M168 106 L184 116 L168 124 Z" fill="#ffffff" />
        <text x="112" y="108" textAnchor="middle" fontSize="13" fontWeight="500" fill="#71717a" fontFamily="var(--font-geist-sans), sans-serif">
          Hi there!
        </text>
        <text x="112" y="131" textAnchor="middle" fontSize="18" fontWeight="700" fill="#18181b" fontFamily="var(--font-geist-sans), sans-serif">
          I&apos;m Rohith
        </text>
      </g>

      {/* Ground shadow */}
      <ellipse cx="222" cy="372" rx="72" ry="7" fill="#000000" opacity="0.4" className="av-walk-shadow" />

      {/* Jeans + sneakers; each leg lifts in turn (tops tuck under the hoodie) */}
      <g className="av-leg av-leg-l">
        <rect x="194" y="300" width="25" height="60" rx="9" fill="#1e293b" />
        <path d="M197 358 h20 a6 6 0 0 1 6 6 v3 h-32 v-3 a6 6 0 0 1 6 -6 Z" fill="#f4f4f5" />
        <rect x="191" y="365" width="32" height="3" rx="1.5" fill="#3b82f6" />
      </g>
      <g className="av-leg av-leg-r">
        <rect x="225" y="300" width="25" height="60" rx="9" fill="#1e293b" />
        <path d="M228 358 h20 a6 6 0 0 1 6 6 v3 h-32 v-3 a6 6 0 0 1 6 -6 Z" fill="#f4f4f5" />
        <rect x="222" y="365" width="32" height="3" rx="1.5" fill="#3b82f6" />
      </g>

      {/* Upper body bobs with each step */}
      <g className="av-walk-bob">
      {/* Left arm (swings while walking, behind torso) */}
      <g className="av-swing-arm">
        <path d="M180 204 Q160 246 168 284" fill="none" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" />
        <circle cx="168" cy="292" r="11" fill="#c99065" />
      </g>

      {/* Right arm waving (rotates around the shoulder) */}
      <g className="av-wave-arm">
        <path d="M262 204 Q294 180 302 132" fill="none" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" />
        <rect x="290" y="96" width="26" height="30" rx="12" fill="#c99065" />
        <rect x="284" y="110" width="10" height="16" rx="5" fill="#b9825a" />
        <path d="M324 88 q9 -3 12 4 M326 104 q9 -1 11 6" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Hoodie */}
      <path
        d="M172 304 L172 214 C172 194 192 182 222 182 C252 182 272 194 272 214 L272 304 C272 309 268 312 263 312 L181 312 C176 312 172 309 172 304 Z"
        fill="url(#wv-hoodie)"
      />
      <rect x="172" y="298" width="100" height="14" rx="5" fill="#1d4ed8" />
      <path d="M198 272 h48 v18 a6 6 0 0 1 -6 6 h-36 a6 6 0 0 1 -6 -6 Z" fill="#1d4ed8" opacity="0.7" />
      <path d="M200 184 Q222 214 244 184" fill="#1d4ed8" />
      <line x1="214" y1="200" x2="212" y2="226" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <line x1="230" y1="200" x2="232" y2="226" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <text x="222" y="258" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff" fillOpacity="0.9" fontFamily="var(--font-geist-mono), monospace">{"</>"}</text>

      {/* Neck + head */}
      <rect x="211" y="160" width="22" height="26" rx="7" fill="#b9825a" />
      <g transform="translate(22 12)">
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
      </g>
      </g>
    </svg>
  );
}
