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
              Status
            </p>
            <p className="mt-4 text-2xl font-semibold">Profile Loaded</p>
            <p className="mt-2 text-sm text-muted">
            LeetCode analytics will appear here once profile data is fetched.
            </p>
          </section>

          <section className="rounded-2xl border border-dashed border-border bg-surface/30 p-6 lg:col-span-3">
            <p className="text-sm font-medium text-muted">Coming next</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                "Topic coverage breakdown",
                "Difficulty progression charts",
                "Personalized DSA roadmap",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
