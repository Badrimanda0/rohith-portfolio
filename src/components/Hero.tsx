"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";
import WavingAvatar from "./WavingAvatar";
import DeveloperAvatar from "./DeveloperAvatar";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { profile, stats } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const badges = [
  { label: "React", pos: "-left-6 top-10", delay: "0s" },
  { label: "Node.js", pos: "-right-8 top-24", delay: "1.2s" },
  { label: "PostgreSQL", pos: "-left-10 bottom-16", delay: "0.6s" },
  { label: "Next.js", pos: "-right-4 bottom-4", delay: "1.8s" },
];

export default function Hero({ photo }: { photo?: string }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("");
  const headline = "I build fast, scalable web apps — from database to UI.".split(" ");

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute right-0 top-20 -z-10 size-[26rem] animate-blob rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.25fr_1fr] lg:pb-10">
        {/* Text */}
        <motion.div variants={container} initial={reduce ? false : "hidden"} animate="show">
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <MapPin size={13} /> {profile.location}
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-7 text-lg font-medium text-muted">
            Hi, I&apos;m <span className="text-fg">{profile.name}</span>{" "}
            <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
          </motion.p>

          <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl">
            {headline.map((w, i) => (
              <motion.span key={i} variants={item} className="relative mr-[0.25em] inline-block">
                {w === "scalable" || w === "database" ? (
                  <>
                    <span className="text-shimmer">{w}</span>
                    <motion.span
                      aria-hidden="true"
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-accent/25"
                    />
                  </>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            <span className="font-medium text-fg">Full-Stack Developer</span> skilled in React, Next.js, Node.js, Express and
            PostgreSQL. I turn ideas and Figma designs into production-ready products.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-85"
              >
                View my work <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold transition hover:border-fg/30"
              >
                <Download size={16} className="transition group-hover:translate-y-0.5" /> Download résumé
              </a>
            </Magnetic>
            <div className="flex items-center gap-1 pl-1">
              {[
                { href: profile.github, label: "GitHub", icon: <GitHubIcon size={20} /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon size={20} /> },
                { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={20} /> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="rounded-full p-2.5 text-muted transition hover:-translate-y-0.5 hover:bg-surface-2 hover:text-fg">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight">
                  <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual: person with rotating ring */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto size-72 sm:size-80 lg:size-[24rem]"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--accent),transparent_55%,var(--accent))]" />
          {/* Hover (or tap) flips to a standing developer saying hi */}
          <button
            type="button"
            aria-label={flipped ? "Show developer at work" : "Say hi"}
            aria-pressed={flipped}
            onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
            onPointerDown={(e) => (pointerType.current = e.pointerType)}
            onClick={() => {
              // Mouse already flips on hover; touch and keyboard toggle on click.
              if (pointerType.current !== "mouse") setFlipped((f) => !f);
              pointerType.current = "";
            }}
            className="flip-scene absolute inset-1.5 cursor-pointer rounded-full"
          >
            <div className={`flip-card relative size-full ${flipped ? "is-flipped" : ""}`}>
              <div className="flip-face absolute inset-0 overflow-hidden rounded-full bg-surface">
                {photo ? (
                  <Image src={photo} alt={profile.name} fill priority sizes="24rem" className="object-cover" />
                ) : (
                  <DeveloperAvatar className="size-full" />
                )}
              </div>
              <div className="flip-face flip-back absolute inset-0 overflow-hidden rounded-full bg-surface">
                <WavingAvatar active={flipped} className="size-full" />
              </div>
            </div>
          </button>
          {badges.map((b) => (
            <span
              key={b.label}
              style={{ animationDelay: b.delay }}
              className={`absolute ${b.pos} animate-float rounded-xl border border-line bg-surface/90 px-3.5 py-2 text-sm font-medium shadow-lg backdrop-blur`}
            >
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
