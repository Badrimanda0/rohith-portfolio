# Rohith Badri Manda — Portfolio

Personal portfolio of a full-stack developer, built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Framer Motion.

## Features
- Animated hero with an illustrated developer that flips to a waving "Hi!" on hover
- Welcome toast, scroll progress, magnetic buttons, 3D-tilt cards and scroll-reveal animations
- Logo tech marquee, experience timeline, skills and a contact form
- A case-study page for every project at `/projects/[slug]`
- Light and dark mode, following the system setting

## Backend
- `POST /api/contact`: contact form validated with Zod, with a honeypot spam trap and per-IP rate limiting. Sends email through Resend when `RESEND_API_KEY` is set; otherwise saves to `data/messages.json` locally.
- `GET /api/github`: public repos fetched server-side from the GitHub API and cached hourly with `"use cache"`.
- `GET /api/developer`: the profile as JSON.

## Run locally
```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

## Edit content
All text lives in `src/lib/data.ts`: profile, stats, projects and their case studies, experience and skills.
To use a photo in the hero, add `public/profile.jpg`.

## Deploy
Import the repo into Vercel. Add `RESEND_API_KEY` (and optionally `GITHUB_TOKEN`) under Project → Settings → Environment Variables.
