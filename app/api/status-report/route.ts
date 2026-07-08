// POST /api/status-report
// Takes raw weekly notes and turns them into a structured client-ready
// status report. Used by the /tools/status-report tool.
//
// CRITICAL HONESTY RULE for this endpoint:
// The system prompt explicitly tells the model NEVER to invent facts. The
// LLM's job is to restructure and clean up what is in the notes, not to add
// information. If notes are sparse the report will be sparse — that is the
// correct behaviour.
//
// Env (Cloudflare Pages → Settings → Environment variables):
//   GROQ_API_KEY  (Secret)
//   GROQ_MODEL    (optional, defaults to llama-3.3-70b-versatile)

export const runtime = "edge";

// ---- Types ---------------------------------------------------------------

type Audience = "client" | "internal" | "exec";
type Status = "green" | "yellow" | "red";

type Blocker = { title: string; detail: string };

type StatusReport = {
  subject: string;
  status: Status;
  statusReason: string;
  tldr: string;
  shipped: string[];
  inFlight: string[];
  blockers: Blocker[];
  asks: string[];
  nextWeek: string[];
  source: "ai" | "template";
};

type ReportRequest = {
  projectName?: string;
  period?: string;
  notes?: string;
  audience?: Audience;
};

// ---- Helpers -------------------------------------------------------------

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function clampString(v: unknown, max: number, fallback = ""): string {
  if (typeof v !== "string") return fallback;
  return v.trim().slice(0, max);
}

function clampAudience(v: unknown): Audience {
  return v === "internal" || v === "exec" ? v : "client";
}

function extractJsonBlock(text: string): string | null {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return candidate.slice(start, end + 1);
}

function isReport(x: unknown): x is Omit<StatusReport, "source"> {
  if (!x || typeof x !== "object") return false;
  const r = x as Record<string, unknown>;
  return (
    typeof r.subject === "string" &&
    (r.status === "green" || r.status === "yellow" || r.status === "red") &&
    typeof r.statusReason === "string" &&
    typeof r.tldr === "string" &&
    Array.isArray(r.shipped) &&
    Array.isArray(r.inFlight) &&
    Array.isArray(r.blockers) &&
    Array.isArray(r.asks) &&
    Array.isArray(r.nextWeek)
  );
}

// ---- System prompt -------------------------------------------------------

const SYSTEM_PROMPT = `You are PYNGYN's status report engine. You take raw notes from someone running client work and produce a clean, structured weekly status update.

CRITICAL RULES:
- NEVER invent facts. Only restructure, summarise, and clean up what is actually in the notes.
- If a fact is unclear or implied, leave it ambiguous rather than guessing.
- If a section has nothing in the notes, return an empty array. Do not pad.
- Status color: "green" = on track, no significant issues. "yellow" = at risk or has blockers but recoverable. "red" = off track, major blockers, dates likely missed.
- Audience adjusts tone, not content:
  - "client": formal, externally polished, focus on outcomes and asks. Remove internal team frustrations.
  - "internal": candid, includes team-side details and friction points.
  - "exec": very concise, focus on status color, TL;DR, asks. Trim aggressively.
- Output ONLY valid JSON matching this exact schema. No commentary, no markdown fences, no prose outside JSON.

Schema:
{
  "subject": "Subject line in the form: '<project> - weekly update, <period>'",
  "status": "green" | "yellow" | "red",
  "statusReason": "One short sentence explaining the colour.",
  "tldr": "One sentence summary of where the project is.",
  "shipped": ["Plain-language bullet of what got done", "..."],
  "inFlight": ["Bullet of what is currently being worked on", "..."],
  "blockers": [{ "title": "Short blocker name", "detail": "One-sentence elaboration" }],
  "asks": ["Things the audience needs to decide or deliver", "..."],
  "nextWeek": ["What is planned for next week", "..."]
}

Limits:
- shipped: at most 6 bullets
- inFlight: at most 5 bullets
- blockers: at most 4
- asks: at most 4 bullets
- nextWeek: at most 5 bullets
Each bullet is one short sentence.`;

// ---- Template fallback (deterministic, parses common note patterns) -----

const SECTION_HINTS: Record<string, RegExp> = {
  shipped: /\b(done|shipped?|complete[ds]?|wrapp(?:ed|ing)?|finish(?:ed)?|deliver(?:ed)?|launch(?:ed)?|achieved|accomplished|did)\b/i,
  inFlight: /\b(in[- ]progress|in[- ]flight|working[- ]on|underway|ongoing|wip|in[- ]the[- ]works|started|in[- ]motion)\b/i,
  blockers: /\b(blocker[s]?|blocked|block|stuck|wait(?:ing)?|risk[s]?|delay(?:ed)?|issue[s]?|problem[s]?|concern[s]?|behind|slip(?:ping)?|late)\b/i,
  asks: /\b(need[seds]?|ask(?:s|ing|ed)?|require[ds]?|please|sign[- ]?off|approval[s]?|decision[s]?|confirm(?:ation)?)\b/i,
  nextWeek: /\b(next[- ]week|upcoming|planning|will|going[- ]to|next|plan[- ]to|on[- ]deck)\b/i,
};

function templateReport(input: {
  projectName: string;
  period: string;
  notes: string;
  audience: Audience;
}): StatusReport {
  const { projectName, period, notes } = input;

  // Split notes into lines, strip bullet markers and trim
  const rawLines = notes
    .split(/\r?\n/)
    .map((l) => l.replace(/^[\s\-*•·]+/, "").trim())
    .filter(Boolean);

  // Detect explicit section headers, e.g. "Done:", "Blockers:", "Next week:"
  const sections: Record<keyof typeof SECTION_HINTS, string[]> = {
    shipped: [],
    inFlight: [],
    blockers: [],
    asks: [],
    nextWeek: [],
  };

  type SectionKey = keyof typeof sections;
  let currentSection: SectionKey | null = null;

  for (const line of rawLines) {
    // A header must be either:
    //   "# Done", "## Blockers"  — markdown style, OR
    //   "Done:", "Next week —"   — short label ending in : / - / em-dash
    // Plain content lines never count as headers, even if they happen to
    // contain a section keyword. This prevents "API integration stuck"
    // from being interpreted as a header that resets the section.
    const headerMatch = line.match(
      /^(?:#{1,3}\s+([A-Za-z][A-Za-z\s]{0,28})|([A-Za-z][A-Za-z\s]{0,28})\s*[:\-—–])\s*$/
    );
    if (headerMatch) {
      const h = (headerMatch[1] || headerMatch[2] || "").toLowerCase();
      const key = (Object.keys(SECTION_HINTS) as SectionKey[]).find((k) =>
        SECTION_HINTS[k].test(h)
      );
      if (key) {
        currentSection = key;
        continue;
      }
    }

    if (currentSection) {
      sections[currentSection].push(line);
      continue;
    }

    // No header context — classify the line by keyword
    const found = (Object.keys(SECTION_HINTS) as SectionKey[]).find((k) =>
      SECTION_HINTS[k].test(line)
    );
    if (found) {
      sections[found].push(line);
    } else {
      // Default unclassified content to shipped (what happened)
      sections.shipped.push(line);
    }
  }

  // Trim each section to reasonable limits
  const shipped = sections.shipped.slice(0, 6);
  const inFlight = sections.inFlight.slice(0, 5);
  const asks = sections.asks.slice(0, 4);
  const nextWeek = sections.nextWeek.slice(0, 5);
  const blockers: Blocker[] = sections.blockers.slice(0, 4).map((b) => ({
    title: b.split(/[,.;:]/)[0].slice(0, 80) || b.slice(0, 80),
    detail: b,
  }));

  // Status colour heuristic
  let status: Status = "green";
  let statusReason = "On track, no significant issues flagged in the notes.";
  if (blockers.length >= 3) {
    status = "red";
    statusReason = "Multiple blockers, dates at material risk.";
  } else if (blockers.length >= 1) {
    status = "yellow";
    statusReason = `Recoverable but ${blockers.length} blocker${blockers.length === 1 ? "" : "s"} need attention.`;
  }

  const subject = `${projectName || "Project"} - weekly update${period ? ", " + period : ""}`;
  const tldr =
    shipped.length > 0
      ? `Progress this week. ${shipped.length} item${shipped.length === 1 ? "" : "s"} shipped, ${inFlight.length} in flight, ${blockers.length} blocker${blockers.length === 1 ? "" : "s"}.`
      : "Light week. See blockers and asks for what needs attention.";

  return {
    subject,
    status,
    statusReason,
    tldr,
    shipped,
    inFlight,
    blockers,
    asks,
    nextWeek,
    source: "template",
  };
}

// ---- Handler -------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  let body: ReportRequest;
  try {
    body = (await request.json()) as ReportRequest;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const cleaned = {
    projectName: clampString(body.projectName, 120, "Project"),
    period: clampString(body.period, 60, ""),
    notes: clampString(body.notes, 6000, ""),
    audience: clampAudience(body.audience),
  };

  if (cleaned.notes.length < 20) {
    return json({ error: "notes_too_short" }, 400);
  }

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  // No key → deterministic template fallback so the tool always works
  if (!apiKey) {
    return json({ report: templateReport(cleaned), source: "template" });
  }

  const userPrompt = [
    `Project: ${cleaned.projectName}`,
    cleaned.period ? `Reporting period: ${cleaned.period}` : null,
    `Audience: ${cleaned.audience}`,
    "",
    "Raw notes from the team:",
    "---",
    cleaned.notes,
    "---",
    "",
    "Return the structured status report as JSON only.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3, // low — we want faithful restructuring, not creativity
        max_tokens: 1600,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) {
      return json({ report: templateReport(cleaned), source: "template", warning: "upstream_failed" });
    }

    const data = (await groqRes.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = data.choices?.[0]?.message?.content ?? "";

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const block = extractJsonBlock(raw);
      if (!block) {
        return json({ report: templateReport(cleaned), source: "template", warning: "parse_failed" });
      }
      try {
        parsed = JSON.parse(block);
      } catch {
        return json({ report: templateReport(cleaned), source: "template", warning: "parse_failed" });
      }
    }

    if (!isReport(parsed)) {
      return json({ report: templateReport(cleaned), source: "template", warning: "schema_failed" });
    }

    const report: StatusReport = { ...parsed, source: "ai" };
    return json({ report, source: "ai" });
  } catch (err) {
    return json(
      { report: templateReport(cleaned), source: "template", warning: "exception", detail: String(err) },
      200
    );
  }
}
