"use client";

import { useMemo, useState } from "react";
import { INTEGRATIONS, INTEGRATION_CATEGORIES } from "./integrations-data";
import { DEMO_URL } from "./config";

export function IntegrationsDirectory() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const popular = useMemo(() => INTEGRATIONS.filter((i) => i.popular), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATIONS.filter((i) => {
      const matchesCat = active === "All" || i.categories.includes(active);
      const matchesQ =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.categories.some((c) => c.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, active]);

  return (
    <div className="wrap pb-[80px]">
      {/* Most popular */}
      <div className="mt-2">
        <div className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Most popular</div>
        <div className="flex flex-wrap gap-2.5">
          {popular.map((i) => (
            <span key={i.name} className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[14px] font-semibold shadow-card">
              <span className="grid h-5 w-5 place-items-center">{i.logo}</span>
              {i.name}
            </span>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-[340px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations"
            aria-label="Search integrations"
            className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-[15px] outline-none focus-visible:border-accent"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {INTEGRATION_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              active === c ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 text-[13px] text-muted">{filtered.length} integrations</div>
      <div className="mt-4 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <div key={i.name} className="flex h-full flex-col rounded-[18px] border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line">{i.logo}</span>
              <div>
                <div className="text-[16px] font-bold">{i.name}</div>
                <div className="text-[12px] text-muted">{i.categories.join(", ")}</div>
              </div>
            </div>
            <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-muted">{i.description}</p>
            <a href={DEMO_URL} className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-accent">
              Learn more →
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-line bg-white p-10 text-center">
          <p className="text-[16px] font-semibold">No integrations match &ldquo;{query}&rdquo;</p>
          <p className="mt-2 text-[14px] text-muted">
            Don&apos;t see what you need? <a href={DEMO_URL} className="font-semibold text-accent">Ask us</a> and we&apos;ll help you connect it.
          </p>
        </div>
      )}

      {/* CTA strip */}
      <div className="mt-14 flex flex-col items-center gap-4 rounded-[22px] border border-line bg-[#fbfbfd] p-10 text-center">
        <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em]">Don&apos;t see your tool?</h2>
        <p className="max-w-[460px] text-[15px] text-muted">
          We&apos;re adding integrations all the time, and our API lets you connect anything.
          Tell us what you use and we&apos;ll help you wire it up.
        </p>
        <a href={DEMO_URL} className="btn btn-primary mt-1">Talk to us →</a>
      </div>
    </div>
  );
}
