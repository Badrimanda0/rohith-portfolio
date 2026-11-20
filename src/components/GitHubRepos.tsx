import { ArrowUpRight, Star } from "lucide-react";
import { getRepos } from "@/lib/github";

export default async function GitHubRepos() {
  const repos = (await getRepos()).slice(0, 4);
  if (repos.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {repos.map((r) => (
        <a
          key={r.name}
          href={r.homepage ?? r.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/40"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="break-all font-mono text-sm font-semibold group-hover:text-accent">{r.name}</p>
            <ArrowUpRight size={16} className="shrink-0 text-muted transition group-hover:text-accent" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-accent" /> {r.language}
            </span>
            <span className="flex items-center gap-1"><Star size={12} /> {r.stars}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
