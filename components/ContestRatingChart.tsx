"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  history: {
    attended: boolean;
    rating: number;
  }[];
};

export default function ContestRatingChart({
  history,
}: Props) {
  const data = history
  .filter((contest) => contest.attended)
  .map((contest, index) => ({
    contestNumber: index + 1,

    contestName:
      contest.contest?.title ??
      `Contest ${index + 1}`,

    rating: Math.round(contest.rating),

    change:
      index === 0
        ? 0
        : Math.round(
            contest.rating -
            history[index - 1].rating
          ),
  }));

  if (data.length < 2) {
    return null;
  }

  const ratings = data.map((d) => d.rating);

  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);

  const firstRating = data[0].rating;
  const currentRating = data[data.length - 1].rating;
  const growth = currentRating - firstRating;
  const peakRating = maxRating;

  return (
    <section className="rounded-2xl border border-border bg-surface/50 p-6 lg:col-span-3">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        Contest Journey
      </p>

      <p className="mt-2 text-sm text-muted">
        Rating progression across rated contests.
      </p>

      <div className="mt-4">
        <p className="text-2xl font-semibold">
          {firstRating} → {currentRating}
          {" "}
          ({growth >= 0 ? "+" : ""}
          {growth})
        </p>

        <p className="mt-1 text-sm text-muted">
          Peak Rating: {peakRating}
        </p>
      </div>

      <div className="mt-6 h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
                dataKey="contestNumber"
                tickCount={5}
                tickFormatter={(value) => `${value}`}
              label={{
                value: "Contest Number",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              domain={[
                minRating - 100,
                maxRating + 100,
              ]}
              label={{
                value: "Rating",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
                content={({ active, payload }) => {
                if (!active || !payload?.length) {
                    return null;
                    }

                const point = payload[0].payload;

                    return (
                <div className="rounded-lg border border-border bg-background p-3 shadow-lg">
                    <p className="font-medium">
                        {point.contestName}
                     </p>

                    <p className="mt-1">
                         Rating: {point.rating}
                    </p>

                     <p>
                     Change:
                        {point.change > 0 ? "+" : ""}
                        {point.change}
                             </p>
                </div>
    );
  }}
/>

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#34d399"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 7 }}
              isAnimationActive
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}