import { experience, profile, projects, skills } from "@/lib/data";

// Machine-readable profile — the same payload the hero terminal shows.
export async function GET() {
  return Response.json({
    name: profile.name,
    role: profile.role,
    location: profile.location,
    available: true,
    skills: Object.fromEntries(skills.map((s) => [s.group.toLowerCase(), s.items])),
    experience: experience.map(({ company, role, period }) => ({ company, role, period })),
    projects: projects.map(({ title, stack, live, repo }) => ({ title, stack, live, repo })),
    contact: { email: profile.email, github: profile.github, linkedin: profile.linkedin },
  });
}
