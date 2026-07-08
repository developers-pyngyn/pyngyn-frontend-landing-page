"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pyngyn_roadmap_votes_v1";

type Voted = Record<string, boolean>;

function readVoted(): Voted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Voted) : {};
  } catch {
    return {};
  }
}

function writeVoted(v: Voted) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    /* storage blocked, keep in-memory only */
  }
}

export function RoadmapUpvote({
  id,
  initialVotes,
  color,
}: {
  id: string;
  initialVotes: number;
  color: string;
}) {
  // Render the server-provided number first to avoid hydration mismatch,
  // then sync the visitor's locally-stored vote state.
  const [count, setCount] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = readVoted();
    if (voted[id]) {
      setHasVoted(true);
      setCount(initialVotes + 1);
    }
  }, [id, initialVotes]);

  function toggle() {
    const voted = readVoted();
    if (voted[id]) {
      delete voted[id];
      setHasVoted(false);
      setCount(initialVotes);
    } else {
      voted[id] = true;
      setHasVoted(true);
      setCount(initialVotes + 1);
    }
    writeVoted(voted);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={hasVoted ? "You upvoted, click to remove" : "Upvote this item"}
      aria-label={`${count} upvotes${hasVoted ? ", upvoted" : ""}`}
      aria-pressed={hasVoted}
      className={`flex h-[52px] w-[44px] flex-none flex-col items-center justify-center rounded-[10px] border transition-all hover:-translate-y-0.5 active:scale-95 ${
        hasVoted
          ? "border-accent bg-accent-lt"
          : "border-line bg-canvas hover:border-accent/40"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ color: hasVoted ? "#4f46e5" : color }}
      >
        <path d="M12 5l7 8h-4v6H9v-6H5z" fill="currentColor" />
      </svg>
      <span
        className="mt-0.5 text-[12px] font-bold tabular-nums"
        style={{ color: hasVoted ? "#4f46e5" : undefined }}
      >
        {count}
      </span>
    </button>
  );
}
