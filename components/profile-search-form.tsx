"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getAnalyzePath, isValidUsername } from "@/lib/username";

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

type ProfileSearchFormProps = {
  className?: string;
  buttonLabel?: string;
};

export function ProfileSearchForm({
  className = "",
  buttonLabel = "Analyze Profile",
}: ProfileSearchFormProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!isValidUsername(username)) {
      setError("Please enter your LeetCode username.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/leetcode/${username}`
      );

      const data = await response.json();

      if (!data.success) {
        setError("User not found.");
        return;
      }

      router.push(getAnalyzePath(username));
    } catch {
      setError(
        "Unable to verify profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
      >
        <div className="relative flex-1">
          <label
            htmlFor="leetcode-username"
            className="sr-only"
          >
            LeetCode username
          </label>

          <input
            id="leetcode-username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);

              if (error) {
                setError(null);
              }
            }}
            placeholder="LeetCode username"
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? "username-error" : undefined
            }
            className="h-12 w-full rounded-xl border border-border bg-surface/80 px-4 py-3.5 text-foreground placeholder:text-zinc-500 backdrop-blur-sm transition focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 font-semibold text-zinc-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-70 sm:px-8"
        >
          {loading
            ? "Checking..."
            : buttonLabel}

          <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>

      {error && (
        <p
          id="username-error"
          role="alert"
          className="mt-3 text-left text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}