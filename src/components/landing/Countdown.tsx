"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-11-30T00:00:00+01:00").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(): Remaining {
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining());
    const timeout = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  const units = [
    { label: "DAYS", value: remaining?.days },
    { label: "HRS", value: remaining?.hours },
    { label: "MINS", value: remaining?.minutes },
    { label: "SECS", value: remaining?.seconds },
  ];

  return (
    <div
      className="oytf-countdown"
      aria-label="Countdown to Ogbor Youth Tech Fest 2026"
    >
      {units.map((unit) => (
        <div className="oytf-countdown-unit" key={unit.label}>
          <strong>
            {unit.value === undefined
              ? "—"
              : String(unit.value).padStart(2, "0")}
          </strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
