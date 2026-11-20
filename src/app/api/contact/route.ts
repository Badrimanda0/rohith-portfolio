import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { profile } from "@/lib/data";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.email("Please enter a valid email").max(120),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(4000),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(200).optional(),
});

// Simple per-IP sliding window: 5 messages per 10 minutes per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

type Message = z.infer<typeof ContactSchema> & { receivedAt: string };

async function sendEmail(msg: Message) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? profile.email,
      reply_to: msg.email,
      subject: `Portfolio: ${msg.subject || `message from ${msg.name}`}`,
      text: `From: ${msg.name} <${msg.email}>\n\n${msg.message}`,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

// Fallback for local development: append to data/messages.json.
async function saveLocally(msg: Message) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "messages.json");
  await mkdir(dir, { recursive: true });
  let all: Message[] = [];
  try {
    all = JSON.parse(await readFile(file, "utf8"));
  } catch {}
  all.push(msg);
  await writeFile(file, JSON.stringify(all, null, 2));
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many messages — please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return Response.json({ ok: false, error: "Please fix the highlighted fields.", fieldErrors }, { status: 422 });
  }

  // Bots that fill the honeypot get a fake success.
  if (parsed.data.company) return Response.json({ ok: true });

  const msg: Message = { ...parsed.data, receivedAt: new Date().toISOString() };
  try {
    if (process.env.RESEND_API_KEY) await sendEmail(msg);
    else await saveLocally(msg);
  } catch (err) {
    console.error("Contact delivery failed", err);
    return Response.json(
      { ok: false, error: `Couldn't send right now — email me directly at ${profile.email}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
