"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { profile } from "@/lib/data";

const SHOW_AFTER_MS = 900;
const VISIBLE_MS = 7000;

// Greets every visitor on page load / refresh. Auto-dismisses; hovering pauses the countdown.
export default function WelcomeToast() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.25 } }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="toast group fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl shadow-black/20 backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <div className="flex gap-4 p-4 pr-10">
            <div className="relative shrink-0">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-2xl">
                <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-surface bg-emerald-500" />
            </div>

            <div className="min-w-0">
              <p className="font-semibold">Hello! Welcome to my portfolio</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                I&apos;m {profile.firstName}, a full-stack developer. Take a look around — I&apos;d love to hear from you.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-xs font-semibold text-bg transition hover:opacity-85"
                >
                  Say hi <ArrowRight size={13} className="transition group-hover/btn:translate-x-0.5" />
                </a>
                <a
                  href="#projects"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-2 hover:text-fg"
                >
                  See projects
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setOpen(false)}
            className="absolute right-2.5 top-2.5 rounded-full p-1.5 text-muted transition hover:bg-surface-2 hover:text-fg"
          >
            <X size={15} />
          </button>

          {/* Countdown bar — pauses while hovered (see .toast in globals.css) */}
          <div className="h-0.5 bg-line">
            <div
              className="toast-progress h-full origin-left bg-accent"
              style={{ animationDuration: `${VISIBLE_MS}ms` }}
              onAnimationEnd={() => setOpen(false)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
