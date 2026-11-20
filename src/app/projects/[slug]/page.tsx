import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, Lock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GitHubIcon } from "@/components/BrandIcons";
import { profile, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.blurb,
  };
}

const themes = ["from-blue-600 to-blue-500", "from-slate-700 to-slate-600", "from-zinc-800 to-zinc-700", "from-slate-600 to-slate-500", "from-blue-700 to-indigo-600"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">{children}</h2>;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = projects[index];
  const d = p.details;
  const next = projects[(index + 1) % projects.length];
  const theme = themes[index % themes.length];

  const meta = [
    { label: "Role", value: d.role },
    { label: "Type", value: d.type },
    ...(d.period ? [{ label: "Timeline", value: d.period }] : []),
    ...(p.prs ? [{ label: "Contribution", value: `${p.prs} PRs merged` }] : []),
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-fg">
            <ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> All projects
          </Link>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-fg text-xs font-bold text-bg">RB</span>
            <span className="hidden sm:inline">Rohith Badri</span>
          </Link>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-85">
            <Download size={15} /> <span className="hidden sm:inline">Résumé</span>
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        {/* Intro */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">{p.tag}</span>
            {p.prs && (
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {p.prs} PRs merged
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{p.title}</h1>
          <p className="mt-2 text-lg text-muted">{p.layer}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed">{p.blurb}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-85">
                Visit live site <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {p.repo ? (
              <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:bg-surface-2">
                <GitHubIcon size={16} /> Source code
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted">
                <Lock size={15} /> Private codebase
              </span>
            )}
          </div>
        </Reveal>

        {/* Meta */}
        <Reveal delay={0.1}>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-surface p-5">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted">{m.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Preview */}
        <Reveal delay={0.15}>
          <div className={`mt-10 overflow-hidden rounded-3xl bg-gradient-to-br ${theme} px-6 pt-8 sm:px-12 sm:pt-12`}>
            <div className="rounded-t-2xl bg-white/95 shadow-2xl dark:bg-zinc-900/95">
              <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3 dark:border-white/10">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-green-400" />
                <span className="ml-3 truncate rounded-md bg-black/5 px-3 py-1 font-mono text-xs text-zinc-500 dark:bg-white/10">
                  {p.live ? p.live.replace(/^https?:\/\//, "") : `${p.slug}.app`}
                </span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
                {d.features.slice(0, 3).map((f) => (
                  <div key={f.title} className="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
                    <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${theme}`} />
                    <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-100">{f.title}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Overview + problem */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <SectionLabel>Overview</SectionLabel>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              {d.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <SectionLabel>The problem</SectionLabel>
              <p className="mt-4 leading-relaxed">{d.problem}</p>
            </div>
          </Reveal>
        </div>

        {/* Features */}
        <section className="mt-20">
          <Reveal>
            <SectionLabel>What I built</SectionLabel>
            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Key features</h3>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {d.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-semibold">{f.title}</h4>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mt-20">
          <Reveal>
            <SectionLabel>Tech stack</SectionLabel>
            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">How it&apos;s built</h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.architecture.map((a, i) => (
              <Reveal key={a.layer} delay={i * 0.06} className="h-full">
                <div className="relative h-full rounded-2xl border border-line bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{a.layer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.items.map((it) => (
                      <span key={it} className="rounded-md bg-surface-2 px-2.5 py-1 text-sm font-medium">
                        {it}
                      </span>
                    ))}
                  </div>
                  {i < d.architecture.length - 1 && (
                    <ArrowRight size={16} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-bg text-muted lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="mt-20">
          <Reveal>
            <SectionLabel>Challenges</SectionLabel>
            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Problems I solved</h3>
          </Reveal>
          <div className="mt-8 space-y-4">
            {d.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="grid gap-2 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <h4 className="font-semibold">{c.title}</h4>
                  <p className="text-sm leading-relaxed text-muted">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <Reveal className="mt-20">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Outcome</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {d.outcome.map((o) => (
                <li key={o} className="flex gap-3 text-lg font-medium leading-snug">
                  <Check size={20} className="mt-1 shrink-0 text-emerald-400" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Next project */}
        <Reveal className="mt-16">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/40 hover:shadow-lg sm:p-8"
          >
            <div>
              <p className="text-sm text-muted">Next project</p>
              <p className="mt-1 text-2xl font-bold">{next.title}</p>
              <p className="text-sm text-muted">{next.layer}</p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-full bg-fg text-bg transition group-hover:translate-x-1">
              <ArrowRight size={20} />
            </span>
          </Link>
        </Reveal>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <p>{profile.name}</p>
          <Link href="/#contact" className="hover:text-fg">Get in touch →</Link>
        </div>
      </footer>
    </>
  );
}
