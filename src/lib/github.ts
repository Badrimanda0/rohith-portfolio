import { cacheLife } from "next/cache";
import { profile } from "./data";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  pushedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  size: number;
};

// Server-only: fetches public repos and caches the result for an hour so the
// GitHub rate limit is never hit by visitors.
export async function getRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");

  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as GitHubRepo[];
    return data
      .filter((r) => !r.fork && r.size > 0 && r.language)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        url: r.html_url,
        homepage: r.homepage || null,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      }));
  } catch {
    return [];
  }
}
