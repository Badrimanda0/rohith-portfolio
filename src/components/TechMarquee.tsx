import { Cloud, Database } from "lucide-react";
import {
  siApollographql,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGraphql,
  siJavascript,
  siJest,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siRazorpay,
  siReact,
  siSentry,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type Tech = { name: string; icon: SimpleIcon } | { name: string; lucide: "cloud" | "db"; hex: string };

const rowOne: Tech[] = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "GraphQL", icon: siGraphql },
  { name: "Apollo", icon: siApollographql },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Python", icon: siPython },
];

const rowTwo: Tech[] = [
  { name: "AWS Lambda", lucide: "cloud", hex: "FF9900" },
  { name: "DynamoDB", lucide: "db", hex: "FF9900" },
  { name: "MongoDB", icon: siMongodb },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "Prisma", icon: siPrisma },
  { name: "Supabase", icon: siSupabase },
  { name: "Stripe", icon: siStripe },
  { name: "Razorpay", icon: siRazorpay },
  { name: "Docker", icon: siDocker },
  { name: "Sentry", icon: siSentry },
  { name: "Jest", icon: siJest },
  { name: "Git", icon: siGit },
  { name: "Figma", icon: siFigma },
];

// Very dark brand colours (Next.js, Express, Prisma…) would vanish on a dark
// background, so those fall back to the text colour on hover.
function brandColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.3 ? "var(--fg)" : `#${hex}`;
}

function Chip({ tech }: { tech: Tech }) {
  const hex = "icon" in tech ? tech.icon.hex : tech.hex;
  return (
    <span
      style={{ "--brand": brandColor(hex) } as React.CSSProperties}
      className="group/chip flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-muted shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:text-fg"
    >
      <span className="text-muted/80 transition-colors duration-300 group-hover/chip:text-[var(--brand)]">
        {"icon" in tech ? (
          <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
            <path d={tech.icon.path} />
          </svg>
        ) : tech.lucide === "cloud" ? (
          <Cloud size={18} />
        ) : (
          <Database size={18} />
        )}
      </span>
      {tech.name}
    </span>
  );
}

function Row({ items, slow }: { items: Tech[]; slow?: boolean }) {
  return (
    <div className="marquee-mask overflow-hidden py-1">
      <div className={`marquee-track flex w-max gap-3 ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <Chip key={`${t.name}-${i}`} tech={t} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="border-y border-line bg-surface-2/40 py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">Technologies I work with</p>
      <div className="space-y-3">
        <Row items={rowOne} />
        <Row items={rowTwo} slow />
      </div>
    </div>
  );
}
