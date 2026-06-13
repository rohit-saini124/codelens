import { calculateMetrics } from "@/lib/metrics";
import { generateObservations } from "@/lib/analysis";
import { getLeetCodeProfile } from "@/lib/leetcode";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  decodeUsernameParam,
  isValidUsername,
  normalizeUsername,
} from "@/lib/username";

type AnalyzePageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: AnalyzePageProps): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeUsernameParam(username);

  return {
    title: `Analyzing ${decoded} — CodeLens`,
    description: `CodeLens is analyzing the LeetCode profile for ${decoded}.`,
  };
}

export default async function AnalyzePage({ params }: AnalyzePageProps) {
  const { username } = await params;
  const decodedUsername = decodeUsernameParam(username);
  const displayUsername = normalizeUsername(decodedUsername);

  if (!isValidUsername(displayUsername)) {
    notFound();
  }
  const profile = await getLeetCodeProfile(displayUsername);
  const observations = profile
  ? generateObservations(profile)
  : [];
  const metrics = profile
  ? calculateMetrics(profile)
  : null;

  const topTopics = profile
  ? [
      ...profile.topics.fundamental,
      ...profile.topics.intermediate,
      ...profile.topics.advanced,
    ]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 5)
  : [];

  if (!profile) {
    notFound();
  } 
  let insight = "";

  if (profile.solved < 50) {
    insight =
      "You are in the early stages of your DSA journey. Focus on building consistency and solving problems across multiple topics.";
  } else if (profile.solved < 200) {
    insight =
      "You have built a solid foundation. Continue increasing medium-level problem exposure and topic coverage.";
  } else {
    insight =
      "You have significant problem-solving experience. Focus on advanced topics, contest performance, and interview-oriented preparation.";
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 glow-orb"
        aria-hidden="true"
      />

      <header className="relative z-10 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            CodeLens
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Profile Loaded
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Analyzing profile:{" "}
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              {displayUsername}
            </span>
          </h1>

          <p className="mt-4 text-muted">
            We&apos;re preparing insights for this LeetCode profile. Full
            analysis features will appear here soon.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-surface/50 p-6 lg:col-span-2">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Profile
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted">LeetCode username</p>
                <p className="mt-1 font-mono text-2xl font-semibold">
                  {displayUsername}
                </p>
              </div>
              <a
                href={`https://leetcode.com/u/${encodeURIComponent(displayUsername)}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm font-medium transition hover:border-accent/30 hover:text-accent"
              >
                View on LeetCode ↗
              </a>
            </div>
          </section>

<section className="rounded-2xl border border-border bg-surface/50 p-6">
  <p className="text-sm font-medium uppercase tracking-widest text-accent-secondary">
    Stats
  </p>

  <div className="mt-4 space-y-3">
    <div className="flex justify-between">
      <span>Total Solved</span>
      <span className="font-semibold">{profile.solved}</span>
    </div>

    <div className="flex justify-between">
      <span>Easy</span>
      <span className="font-semibold">{profile.easy}</span>
    </div>

    <div className="flex justify-between">
      <span>Medium</span>
      <span className="font-semibold">{profile.medium}</span>
    </div>

    <div className="flex justify-between">
      <span>Hard</span>
      <span className="font-semibold">{profile.hard}</span>
    </div>

    <div className="flex justify-between">
      <span>Ranking</span>
      <span className="font-semibold">{profile.ranking}</span>
    </div>
  </div>
</section>
<section className="rounded-2xl border border-border bg-surface/50 p-6 lg:col-span-3">
<p className="text-sm font-medium uppercase tracking-widest text-accent">
  Topic Exposure
</p>
<p className="mt-2 text-sm text-muted">
  Based on {profile.solved} solved problems
</p>
  <div className="mt-6 space-y-4">
    {topTopics.map((topic) => (
      <div key={topic.tagSlug}>
        <div className="mb-2 flex items-center justify-between text-sm">
  <span>{topic.tagName}</span>

  <span className="font-mono text-muted">
    {topic.problemsSolved} solves •{" "}
    {Math.round(
      (topic.problemsSolved / profile.solved) * 100
    )}
    %
  </span>
</div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
      className="h-full rounded-full bg-accent"
        style={{
          width: `${Math.min(
            (topic.problemsSolved / profile.solved) * 100,
              100
        )}%`,
       }}
          />
        </div>
      </div>
    ))}
  </div>

  <p className="mt-6 text-xs text-muted">
  * Percentages represent the share of solved problems
  containing that topic tag. A problem may belong to
  multiple topics, so percentages can overlap.
</p>

</section>

<section className="rounded-2xl border border-border bg-surface/50 p-6 lg:col-span-3">
  <p className="text-sm font-medium uppercase tracking-widest text-accent">
    Profile Assessment
  </p>

  {metrics && (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs text-muted">
        Coverage Level
      </p>
  
      <p className="mt-2 text-2xl font-semibold">
        {metrics.coverageLevel}
      </p>
    </div>
  
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs text-muted">
        Topic Breadth
      </p>
  
      <p className="mt-2 text-2xl font-semibold">
        {metrics.topicCount}
      </p>
    </div>
  
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs text-muted">
        Difficulty Profile
      </p>
  
      <p className="mt-2 text-2xl font-semibold">
        {metrics.difficultyProfile}
      </p>
    </div>
  
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs text-muted">
        Advanced Topics
      </p>
  
      <p className="mt-2 text-2xl font-semibold">
        {metrics.advancedTopicCount}
      </p>
    </div>
  
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs text-muted">
        Confidence Level
      </p>
  
      <p className="mt-2 text-2xl font-semibold">
        {metrics.confidence}
      </p>
    </div>
  
  </div>
  )}
</section>


<section className="rounded-2xl border border-border bg-surface/50 p-6 lg:col-span-3">
  <p className="text-sm font-medium uppercase tracking-widest text-accent">
    Observations
  </p>

  <div className="mt-4 space-y-3">
    {observations.map((observation, index) => (
      <div
        key={index}
        className="rounded-xl border border-border bg-background/40 p-4"
      >
        {observation}
      </div>
    ))}
  </div>
</section>
        </div>
      </main>
    </div>

  );
}
