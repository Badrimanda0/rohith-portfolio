import { existsSync } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, GraduationCap, Layout, Lock, Mail, PenTool, Server } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import Tilt from "@/components/Tilt";
import BackToTop from "@/components/BackToTop";
import WelcomeToast from "@/components/WelcomeToast";
import ContactForm from "@/components/ContactForm";
import GitHubRepos from "@/components/GitHubRepos";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { education, profile, projects, services, skills } from "@/lib/data";

// Use public/profile.{jpg,jpeg,png,webp} automatically once it exists.
const photoFile = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"].find((f) =>
  existsSync(path.join(process.cwd(), "public", f)),
);

const serviceIcons: Record<string, React.ReactNode> = {
  layout: <Layout size={22} />,
  server: <Server size={22} />,
  database: <Database size={22} />,
  pen: <PenTool size={22} />,
};

const projectThemes = [
  "from-blue-600 to-blue-500",
  "from-slate-700 to-slate-600",
  "from-zinc-800 to-zinc-700",
  "from-slate-600 to-slate-500",
  "from-blue-700 to-indigo-600",
];

async function Year() {
  "use cache";
  return new Date().getFullYear();
}

function Heading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero photo={photoFile ? `/${photoFile}` : undefined} />
        <TechMarquee />

        {/* ── ABOUT + WHAT I DO ── */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Heading eyebrow="About me" title="What I do" intro={profile.summary} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:scale-110">
                    {serviceIcons[s.icon]}
                  </span>
                  <h3 className="mt-5 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="border-y border-line bg-surface/50">
          <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
            <Heading eyebrow="Career" title="Work experience" />
            <Timeline />
            <Reveal className="mt-12">
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap size={22} />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{education.degree}</p>
                  <p className="text-sm text-muted">{education.school}</p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="text-muted">{education.period}</p>
                  <p className="font-semibold text-accent">CGPA {education.cgpa}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Heading eyebrow="Portfolio" title="Featured projects" intro="Real products I've designed, built and shipped — frontend, backend and database." />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => {
              return (
                <Reveal key={p.slug} delay={i * 0.1} className="h-full">
                  <Tilt className="h-full" max={5}>
                  <article className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:shadow-2xl hover:shadow-black/10">
                    <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${projectThemes[i % projectThemes.length]} p-5`}>
                      <div className="absolute inset-x-5 top-5 bottom-0 translate-y-3 rounded-t-xl bg-white/95 shadow-2xl transition duration-500 group-hover:translate-y-0 dark:bg-zinc-900/95">
                        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2 dark:border-white/10">
                          <span className="size-2 rounded-full bg-red-400" />
                          <span className="size-2 rounded-full bg-amber-400" />
                          <span className="size-2 rounded-full bg-green-400" />
                          <span className="ml-2 truncate rounded bg-black/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500 dark:bg-white/10">
                            {p.live ? p.live.replace("https://", "") : `${p.slug}.app`}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="text-lg font-bold text-zinc-900 dark:text-white">{p.title}</p>
                          <p className="mt-1 text-xs text-zinc-500">{p.layer}</p>
                          <div className="mt-3 flex gap-2">
                            <span className={`h-2 w-16 rounded-full bg-gradient-to-r ${projectThemes[i % projectThemes.length]}`} />
                            <span className="h-2 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                            <span className="h-2 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-accent">{p.tag}</span>
                          {p.prs && (
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {p.prs} PRs merged
                            </span>
                          )}
                        </div>
                        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-surface-2 text-muted transition group-hover:bg-fg group-hover:text-bg">
                          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">
                        {/* Stretched link: the whole card opens the project page */}
                        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
                      <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                        {p.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span key={t} className="rounded-md bg-surface-2 px-2 py-1 text-xs font-medium text-muted">{t}</span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 text-sm font-medium">
                          <span className="text-fg transition group-hover:text-accent">View details →</span>
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer" className="relative z-10 inline-flex items-center gap-1 text-muted hover:text-fg">
                              Live demo <ArrowUpRight size={14} />
                            </a>
                          )}
                          {p.repo ? (
                            <a href={p.repo} target="_blank" rel="noreferrer" className="relative z-10 inline-flex items-center gap-1.5 text-muted hover:text-fg">
                              <GitHubIcon size={14} /> Code
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-muted">
                              <Lock size={13} /> Private codebase
                            </span>
                          )}
                        </div>
                    </div>
                  </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-16">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold">Latest on GitHub</h3>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
                View all <ArrowUpRight size={14} />
              </a>
            </div>
            <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl bg-surface-2" />}>
              <GitHubRepos />
            </Suspense>
          </Reveal>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="border-y border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <Heading eyebrow="Toolbox" title="Skills & technologies" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-surface p-6">
                    <h3 className="font-semibold">{s.group}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((it, k) => (
                        <Reveal key={it} delay={i * 0.06 + k * 0.04} y={10}>
                          <span className="block cursor-default rounded-lg border border-line px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                            {it}
                          </span>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line bg-surface lg:grid lg:grid-cols-[1fr_1.2fr]">
              <div className="relative isolate bg-zinc-900 p-8 text-white sm:p-10">
                <div className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-white/10" />
                <div className="absolute -bottom-20 -left-10 -z-10 size-48 rounded-full bg-white/10" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s work together</h2>
                <p className="mt-4 text-white/85">
                  Have a role or a project in mind? I&apos;m open to full-time full-stack positions and freelance work. I usually reply within a day.
                </p>
                <ul className="mt-10 space-y-4 text-sm">
                  <li><a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:underline"><Mail size={18} /> {profile.email}</a></li>
                  <li><a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><GitHubIcon size={18} /> github.com/{profile.githubUser}</a></li>
                  <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><LinkedInIcon size={18} /> LinkedIn</a></li>
                </ul>
              </div>
              <div className="p-8 sm:p-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <BackToTop />
      <WelcomeToast />

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <p>© <Year /> {profile.name}. All rights reserved.</p>
          <a href="#top" className="hover:text-fg">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
