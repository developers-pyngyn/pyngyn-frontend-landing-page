// POST /api/plan
// Generates a structured project plan from user input via Groq.
// Designed for the AI Project Plan Generator tool at /tools/ai-project-plan.
//
// Returns JSON conforming to GeneratedPlan (see below). If the LLM returns
// invalid JSON, or the API key is missing, the route returns a 5xx with a
// machine-readable error code so the client can fall back to its local
// template engine and still give the visitor a usable plan.
//
// Env (Cloudflare Pages → Settings → Environment variables):
//   GROQ_API_KEY  (Secret)
//   GROQ_MODEL    (optional, defaults to llama-3.3-70b-versatile)

export const runtime = "edge";

// ----- Request / response shapes ------------------------------------------

type PlanRequest = {
  projectName?: string;
  projectType?: string;
  industry?: string;
  weeks?: number;
  teamSize?: number;
  goals?: string;
};

type Task = {
  name: string;
  effort: string; // e.g. "2-3 days", "1 week"
  owner: string; // e.g. "Engagement lead"
};

type Phase = {
  name: string;
  durationWeeks: number;
  owner: string;
  tasks: Task[];
  milestone: string;
};

type Risk = {
  title: string;
  mitigation: string;
  severity: "low" | "medium" | "high";
};

type TeamRole = {
  role: string;
  count: number;
  allocation: string; // e.g. "Full-time", "50% allocation"
};

type GeneratedPlan = {
  summary: string;
  phases: Phase[];
  team: TeamRole[];
  risks: Risk[];
  cadence: string[];
  source: "ai" | "template";
};

// ----- Helpers ------------------------------------------------------------

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function clampString(v: unknown, max: number, fallback = ""): string {
  if (typeof v !== "string") return fallback;
  return v.trim().slice(0, max);
}

// Extract the first {...} block in case the model wraps JSON in markdown fences.
function extractJsonBlock(text: string): string | null {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return candidate.slice(start, end + 1);
}

function isPlan(x: unknown): x is GeneratedPlan {
  if (!x || typeof x !== "object") return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.summary === "string" &&
    Array.isArray(p.phases) &&
    Array.isArray(p.team) &&
    Array.isArray(p.risks) &&
    Array.isArray(p.cadence)
  );
}

// ----- System prompt ------------------------------------------------------

const SYSTEM_PROMPT = `You are PYNGYN's project planning engine. You output ONLY valid JSON, no prose, no markdown, no commentary.

The JSON must match exactly this schema:

{
  "summary": "One sentence describing the engagement and intended outcome.",
  "phases": [
    {
      "name": "Phase name (e.g. Discovery, Delivery, Review)",
      "durationWeeks": 2,
      "owner": "Role that owns the phase",
      "tasks": [
        { "name": "Task name", "effort": "2-3 days", "owner": "Role responsible" }
      ],
      "milestone": "What success looks like at the end of this phase"
    }
  ],
  "team": [
    { "role": "Role title", "count": 1, "allocation": "Full-time" }
  ],
  "risks": [
    { "title": "Short risk name", "mitigation": "How to reduce it", "severity": "low" }
  ],
  "cadence": [
    "Weekly status review with client stakeholders",
    "Twice-weekly internal team check-in"
  ]
}

Rules:
- Generate between 3 and 6 phases. Total of durationWeeks across phases must approximately equal the requested timeline.
- Each phase has 3 to 6 tasks.
- Recommend a realistic team for the given size and engagement type.
- Provide 3 risks with mitigations. Severity is "low" | "medium" | "high".
- Provide 2 to 4 cadence items.
- Use professional services language. Owners are roles, not people.
- Severity values MUST be exactly "low", "medium", or "high" in lowercase.
- Do not include any text outside the JSON object. Do not wrap in markdown.`;

// ----- Template fallback (server-side mirror of the client-side fallback) -

function templatePlan(input: Required<Omit<PlanRequest, "industry">> & { industry: string }): GeneratedPlan {
  const { projectName, projectType, industry, weeks, teamSize, goals } = input;
  const name = projectName || "Project";
  const type = projectType || "Engagement";
  const ind = industry ? ` for a ${industry.toLowerCase()} client` : "";

  // Allocate phases proportionally
  const totalWeeks = clampInt(weeks, 1, 104, 8);
  const phases: { name: string; share: number; owner: string; tasks: Task[]; milestone: string }[] = [
    {
      name: "Discovery & alignment",
      share: 0.2,
      owner: "Engagement lead",
      tasks: [
        { name: "Kickoff workshop with stakeholders", effort: "1-2 days", owner: "Engagement lead" },
        { name: "Map current state and constraints", effort: "3-4 days", owner: "Senior consultant" },
        { name: "Confirm success metrics and scope", effort: "2 days", owner: "Engagement lead" },
        { name: "Sign off on the work plan", effort: "1 day", owner: "Client sponsor" },
      ],
      milestone: "Signed scope, agreed metrics, named decision makers",
    },
    {
      name: "Design",
      share: 0.25,
      owner: "Solution architect",
      tasks: [
        { name: "Draft target state design", effort: "1 week", owner: "Solution architect" },
        { name: "Validate with technical stakeholders", effort: "3 days", owner: "Solution architect" },
        { name: "Finalize architecture and decisions", effort: "2 days", owner: "Engagement lead" },
        { name: "Plan delivery phases", effort: "1-2 days", owner: "Delivery lead" },
      ],
      milestone: "Approved approach and delivery plan",
    },
    {
      name: "Delivery",
      share: 0.35,
      owner: "Delivery lead",
      tasks: [
        { name: "Produce core deliverables", effort: "1-2 weeks", owner: "Delivery team" },
        { name: "Coordinate with the client's teams", effort: "1 week", owner: "Senior consultant" },
        { name: "Internal quality review", effort: "3-4 days", owner: "Reviewer" },
        { name: "Client checkpoint demo", effort: "1 day", owner: "Engagement lead" },
      ],
      milestone: "Draft deliverables accepted by the client",
    },
    {
      name: "Rollout & handover",
      share: 0.2,
      owner: "Engagement lead",
      tasks: [
        { name: "Run user training sessions", effort: "2-3 days", owner: "Trainer" },
        { name: "Final delivery to the client", effort: "1-2 days", owner: "Delivery team" },
        { name: "Hypercare and issue triage", effort: "1 week", owner: "Support lead" },
        { name: "Final retrospective and handover", effort: "1 day", owner: "Engagement lead" },
      ],
      milestone: "Engagement delivered and signed off by the client",
    },
  ];

  const built: Phase[] = phases.map((p) => ({
    name: p.name,
    durationWeeks: Math.max(1, Math.round(totalWeeks * p.share)),
    owner: p.owner,
    tasks: p.tasks,
    milestone: p.milestone,
  }));

  const size = clampInt(teamSize, 1, 50, 5);
  const team: TeamRole[] = [
    { role: "Engagement lead", count: 1, allocation: "50% allocation" },
    { role: "Solution architect", count: 1, allocation: "Full-time" },
    { role: "Delivery team", count: Math.max(1, size - 3), allocation: "Full-time" },
    { role: "QA lead", count: 1, allocation: "50% allocation" },
  ];

  const risks: Risk[] = [
    {
      title: "Scope creep from late stakeholder input",
      mitigation: "Lock scope at end of discovery with sign-off, run a weekly change board",
      severity: "high",
    },
    {
      title: "Dependency delays from the client side",
      mitigation: "Map integrations in week one, pull dependent owners into kickoff",
      severity: "medium",
    },
    {
      title: "Adoption resistance at rollout",
      mitigation: "Recruit power users early, run training in week before cutover",
      severity: "medium",
    },
  ];

  const cadence = [
    "Weekly status review with client sponsor",
    "Twice-weekly internal team check-in",
    "Fortnightly steering committee with executive sponsor",
  ];

  const summary = `A ${totalWeeks}-week ${type.toLowerCase()} for ${name}${ind}, delivered by a team of ${size}${
    goals ? `, focused on: ${clampString(goals, 140)}` : ""
  }.`;

  return {
    summary,
    phases: built,
    team,
    risks,
    cadence,
    source: "template",
  };
}

// ----- Handler ------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  // 1. Parse + sanitize input
  let body: PlanRequest;
  try {
    body = (await request.json()) as PlanRequest;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const cleaned = {
    projectName: clampString(body.projectName, 120, "New engagement"),
    projectType: clampString(body.projectType, 80, "Consulting engagement"),
    industry: clampString(body.industry, 80, ""),
    weeks: clampInt(body.weeks, 1, 52, 8),
    teamSize: clampInt(body.teamSize, 1, 50, 5),
    goals: clampString(body.goals, 1200, ""),
  };

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  // 2. If no API key, return the deterministic template plan so the tool still works.
  if (!apiKey) {
    return json({ plan: templatePlan(cleaned), source: "template" });
  }

  const userPrompt = [
    `Project name: ${cleaned.projectName}`,
    `Engagement type: ${cleaned.projectType}`,
    cleaned.industry ? `Client industry: ${cleaned.industry}` : null,
    `Timeline: ${cleaned.weeks} weeks`,
    `Team size: ${cleaned.teamSize} people`,
    cleaned.goals ? `Goals and deliverables:\n${cleaned.goals}` : null,
    "",
    "Return the project plan as JSON only.",
  ]
    .filter(Boolean)
    .join("\n");

  // 3. Call Groq
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 1800,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) {
      // Upstream failure — return template so the user gets something useful.
      return json({ plan: templatePlan(cleaned), source: "template", warning: "upstream_failed" });
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = data.choices?.[0]?.message?.content ?? "";

    // 4. Parse model output
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const block = extractJsonBlock(raw);
      if (!block) {
        return json({ plan: templatePlan(cleaned), source: "template", warning: "parse_failed" });
      }
      try {
        parsed = JSON.parse(block);
      } catch {
        return json({ plan: templatePlan(cleaned), source: "template", warning: "parse_failed" });
      }
    }

    if (!isPlan(parsed)) {
      return json({ plan: templatePlan(cleaned), source: "template", warning: "schema_failed" });
    }

    // 5. Stamp the source and return
    const plan: GeneratedPlan = { ...parsed, source: "ai" };
    return json({ plan, source: "ai" });
  } catch (err) {
    return json(
      { plan: templatePlan(cleaned), source: "template", warning: "exception", detail: String(err) },
      200
    );
  }
}
