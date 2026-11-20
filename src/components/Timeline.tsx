"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

// Experience list with a line that fills as you scroll through it.
export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <ol ref={ref} className="relative space-y-12 pl-8 sm:pl-10">
      <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-line" />
      <motion.span style={{ scaleY: scrollYProgress }} className="absolute left-[7px] top-2 bottom-2 w-0.5 origin-top bg-accent" />
      {experience.map((e, i) => (
        <li key={e.company} className="relative">
          <span className="absolute -left-8 top-1.5 flex size-4 items-center justify-center rounded-full border-2 border-accent bg-bg sm:-left-10">
            {i === 0 && <span className="size-1.5 rounded-full bg-accent" />}
          </span>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="font-medium text-accent">{e.company}</p>
                </div>
                <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">{e.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
