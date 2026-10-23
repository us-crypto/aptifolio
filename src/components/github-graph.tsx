import { useMemo, useState } from "react";
import { contributions, contributionTotal } from "@/data/contributions";
import { profile } from "@/data/portfolio";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function GitHubGraph() {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const weeks = useMemo(() => {
    const cols: (typeof contributions)[] = [];
    for (let i = 0; i < contributions.length; i += 7) cols.push(contributions.slice(i, i + 7));
    return cols;
  }, []);

  const monthMarks = useMemo(() => {
    let last = -1;
    return weeks.map((week) => {
      const date = new Date(`${week[0].date}T00:00:00`);
      const month = date.getMonth();
      if (month === last) return "";
      last = month;
      return MONTHS[month];
    });
  }, [weeks]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-muted">
          {contributionTotal.toLocaleString()} contributions in the last year
        </p>
        <a
          href={profile.githubProfile}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          @{profile.githubUser}
        </a>
      </div>
      <div className="gh-scroll pb-2">
        <div className="flex gap-2">
          <div className="mt-5 flex w-8 flex-col justify-between py-0.5 text-[10px] text-muted">
            {DAYS.map((day) => (
              <span key={day} className={day === "Sun" || day === "Tue" || day === "Thu" || day === "Sat" ? "invisible" : ""}>
                {day}
              </span>
            ))}
          </div>
          <div className="relative">
            <div
              className="gh-months text-[10px] text-muted"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}
            >
              {monthMarks.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
            <div className="gh-board" style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}>
              {weeks.flatMap((week, column) =>
                Array.from({ length: 7 }, (_, row) => {
                  const cell = week[row];
                  if (!cell) {
                    return <span key={`${column}-${row}`} className="gh-cell opacity-0" />;
                  }
                  return (
                    <button
                      key={cell.date}
                      type="button"
                      className={`gh-cell gh-${cell.level} block p-0`}
                      aria-label={`${cell.count} contributions on ${cell.date}`}
                      onMouseEnter={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        setTip({
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                          text: `${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`,
                        });
                      }}
                      onMouseLeave={() => setTip(null)}
                      onFocus={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        setTip({
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                          text: `${cell.count} contributions on ${cell.date}`,
                        });
                      }}
                      onBlur={() => setTip(null)}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>
      {tip ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md border border-line bg-bg px-2 py-1 text-[11px] text-fg shadow-lg"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          {tip.text}
        </div>
      ) : null}
    </div>
  );
}
