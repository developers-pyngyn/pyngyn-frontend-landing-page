// POST /api/chat: proxies to Groq so the API key never reaches the browser.
// Runs on the edge runtime so it works with @cloudflare/next-on-pages.
//
// Set the key in the Cloudflare Pages dashboard:
//   Settings → Environment variables → add  GROQ_API_KEY  (mark as Secret)
//   (optional)  GROQ_MODEL: defaults to llama-3.3-70b-versatile

import {
  SIGNUP_URL,
  SOCIAL_X,
  SOCIAL_LINKEDIN,
  SOCIAL_REDDIT,
  SOCIAL_FACEBOOK,
  SOCIAL_YOUTUBE,
  SOCIAL_INSTAGRAM,
} from "@/components/config";

export const runtime = "edge";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const DEMO_LINK = "https://pyngyn.ai/demo";

const SYSTEM_PROMPT = `You are Pyng, the friendly aviator-penguin assistant for PYNGYN, the operating system for professional-services firms (consultancies, accounting and CA firms, law firms, agencies, creative studios, and architecture practices).
You help visitors understand how PYNGYN runs a firm's internal work and its client work in one place: a Workspace for internal projects, finances, and billable time, plus Clientspace, a branded client portal add-on. PYNGYN turns plain-language goals into a living plan with tasks, owners, timelines, and status, all kept current by AI.
Be warm, concise, and helpful. Keep answers short unless asked for detail. Never invent features, pricing, or links you are unsure about.

Key links (share the exact URL when relevant, written out in full so it is clickable):
- Book a demo or see it live: ${DEMO_LINK}
- Start a free trial, sign up, or try it: ${SIGNUP_URL}
- Social media:
  - X (Twitter): ${SOCIAL_X}
  - LinkedIn: ${SOCIAL_LINKEDIN}
  - Instagram: ${SOCIAL_INSTAGRAM}
  - YouTube: ${SOCIAL_YOUTUBE}
  - Reddit: ${SOCIAL_REDDIT}
  - Facebook: ${SOCIAL_FACEBOOK}

When a visitor wants to see PYNGYN live or asks about a demo, give the demo link. When they want to try it, sign up, or start a trial, give the trial link. When they ask where to follow PYNGYN or for social media, share the relevant profile link or links. Only use the URLs listed above; do not make up any other links.`;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    return json({ error: "Server is missing GROQ_API_KEY." }, 500);
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  // Guardrails: cap message size and history length.
  const trimmed = incoming
    .filter((m) => m && typeof m.content === "string" && m.content.length <= 4000)
    .slice(-12);

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...trimmed,
  ];

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 600,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      return json({ error: "Groq request failed.", detail }, groqRes.status);
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I didn't catch that.";
    return json({ reply });
  } catch (err) {
    return json({ error: "Upstream error.", detail: String(err) }, 502);
  }
}
