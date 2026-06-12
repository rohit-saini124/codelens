import { ProfileSearchForm } from "@/components/profile-search-form";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="6"
        width="28"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="16" r="4" fill="currentColor" />
      <path
        d="M18 13h8M18 16h6M18 19h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 2 6-8" />
    </svg>
  );
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 7l-8.5 8.5-4-4L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "12K+", label: "Profiles Analyzed" },
  { value: "48", label: "DSA Topics Tracked" },
  { value: "2.4M", label: "Problems Mapped" },
  { value: "94%", label: "Roadmap Accuracy" },
];

const features = [
  {
    icon: ChartIcon,
    title: "Topic Coverage Analysis",
    description:
      "Understand which DSA patterns you've mastered and which need more attention.",
  },
  {
    icon: TrendIcon,
    title: "Progress Insights",
    description:
      "Visualize growth across topics, difficulty levels, and solving trends.",
  },
  {
    icon: SparklesIcon,
    title: "AI Roadmap Generation",
    description:
      "Get a personalized learning roadmap based on your coding history.",
  },
];

const steps = [
  {
    step: "01",
    icon: UserIcon,
    title: "Enter Your Username",
    description:
      "Paste your LeetCode username — no login or API keys required.",
  },
  {
    step: "02",
    icon: ScanIcon,
    title: "We Analyze Your Profile",
    description:
      "CodeLens scans your submissions, topics, and difficulty distribution.",
  },
  {
    step: "03",
    icon: MapIcon,
    title: "Get Your Roadmap",
    description:
      "Receive a tailored study plan highlighting gaps and next steps.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="relative min-h-full overflow-hidden bg-background text-foreground">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 glow-orb"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Navigation */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20 transition group-hover:bg-accent/15">
            <LogoIcon className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">CodeLens</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-foreground">
            How It Works
          </a>
          <a
            href="#analyze"
            className="rounded-lg bg-surface-elevated px-4 py-2 font-medium text-foreground ring-1 ring-border transition hover:bg-zinc-800"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section
          id="analyze"
          className="mx-auto max-w-6xl px-6 pb-20 pt-12 text-center lg:px-8 lg:pb-28 lg:pt-20"
        >
          <div className="animate-fade-in-up mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm text-muted backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Built for LeetCode practitioners
            </div>

            <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              CodeLens
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Turn your LeetCode history into actionable insights and a personalized DSA roadmap.
            </p>

            <ProfileSearchForm
              className="animate-fade-in-up animation-delay-100 mx-auto mt-10 max-w-xl"
              buttonLabel="Analyze Profile"
            />

            <p className="mt-4 text-xs text-zinc-600">
              Free to use · No account required · Read-only profile access
            </p>
          </div>

          {/* Hero preview card */}
          <div className="animate-fade-in-up animation-delay-200 mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-2xl shadow-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-zinc-500">
                  codelens — profile analysis
                </span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
                {[
                  { label: "Arrays", pct: 82, color: "bg-accent" },
                  { label: "Graphs", pct: 34, color: "bg-amber-400" },
                  { label: "DP", pct: 51, color: "bg-accent-secondary" },
                ].map((topic) => (
                  <div
                    key={topic.label}
                    className="rounded-xl border border-border bg-background/50 p-4"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{topic.label}</span>
                      <span className="font-mono text-muted">{topic.pct}%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${topic.color}`}
                        style={{ width: `${topic.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 lg:grid-cols-4 lg:px-8 lg:py-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to level up
            </h2>
            <p className="mt-4 text-muted">
              Turn raw submission data into actionable insights and a clear path
              forward.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-surface/50 p-8 transition hover:border-accent/30 hover:bg-surface/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition group-hover:bg-accent/15">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="border-t border-border bg-surface/20 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-accent-secondary">
                How It Works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From username to roadmap in minutes
              </h2>
              <p className="mt-4 text-muted">
                Three simple steps to understand where you stand and where to go
                next.
              </p>
            </div>

            <ol className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
              <div
                className="pointer-events-none absolute top-16 hidden h-px w-full bg-gradient-to-r from-transparent via-border to-transparent lg:block"
                aria-hidden="true"
              />
              {steps.map((item) => (
                <li key={item.step} className="relative text-center lg:text-left">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-accent ring-4 ring-background lg:mx-0">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-6 block font-mono text-xs font-medium uppercase tracking-widest text-accent/70">
                    Step {item.step}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-background px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 glow-orb opacity-60"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to see your coding profile clearly?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Stop guessing what to study next. Let CodeLens map your strengths,
                gaps, and the most efficient path to interview readiness.
              </p>
              <a
                href="#analyze"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-3.5 font-semibold text-zinc-950 transition hover:brightness-110"
              >
                Analyze My Profile
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
          <a href="#" className="flex items-center gap-2 text-sm text-muted transition hover:text-foreground">
            <LogoIcon className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">CodeLens</span>
          </a>
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} CodeLens. Built for developers, by
            developers.
          </p>
          <nav className="flex items-center gap-6 text-sm text-muted">
            <a href="#features" className="transition hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-foreground">
              How It Works
            </a>
            <a href="#analyze" className="transition hover:text-foreground">
              Get Started
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
