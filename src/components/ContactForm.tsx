"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted/60 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-surface p-6">
        <CheckCircle2 className="text-accent" size={28} />
        <p className="text-lg font-medium">Thanks — your message is on its way.</p>
        <p className="text-sm text-muted">I usually reply within a day.</p>
        <button onClick={() => setStatus("idle")} className="mt-2 text-sm text-accent hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
          {fieldErrors.name && <span className="mt-1 block text-xs text-red-500">{fieldErrors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
          {fieldErrors.email && <span className="mt-1 block text-xs text-red-500">{fieldErrors.email}</span>}
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">Subject</span>
        <input name="subject" placeholder="Full-stack role, freelance project…" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">Message</span>
        <textarea name="message" required rows={5} placeholder="Tell me about what you're building." className={`${field} resize-y`} />
        {fieldErrors.message && <span className="mt-1 block text-xs text-red-500">{fieldErrors.message}</span>}
      </label>

      {/* Honeypot — hidden from humans */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-2 rounded-lg bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
