import { getRepos } from "@/lib/github";

export async function GET() {
  const repos = await getRepos();
  return Response.json({ count: repos.length, repos });
}
