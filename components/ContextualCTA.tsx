import { SIGNUP_URL, DEMO_URL } from "./config";

type Variant = {
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  href: string;
};

// Maps a post/article category to a CTA that actually relates to what the
// reader just read, instead of the same generic banner on every page.
// "product" picks the visual accent; each entry still gets its own copy.
const BY_CATEGORY: Record<string, Variant> = {
  // ---- Blog categories -----------------------------------------------
  Engagements: {
    eyebrow: "See it in practice",
    title: "Managing engagements like this? See what your clients would see.",
    body: "Clientspace gives every client a branded portal, standalone, no Workspace required, so status like this stops living in your inbox.",
    label: "See Clientspace",
    href: "/clientspace",
  },
  Risk: {
    eyebrow: "Catch it earlier",
    title: "PYNGYN flags risk like this automatically, before it's a surprise.",
    body: "Workspace reads workload and dependencies to surface what threatens a deadline, and the client sees the honest status in their own Clientspace.",
    label: "See how risk detection works",
    href: "/workspace",
  },
  Knowledge: {
    eyebrow: "Put it to work",
    title: "Your firm's knowledge, answering questions on its own.",
    body: "Business Brain, built into Workspace, gives AI features context from your firm's own history instead of generic answers.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Teamwork: {
    eyebrow: "Run it this way",
    title: "This is what Workspace looks like day to day.",
    body: "Projects, tasks, and calendar in one place, with roles for directors, managers, and ICs so everyone sees what matters to them.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Workflow: {
    eyebrow: "See the workflow",
    title: "This kind of workflow is what Workspace automates.",
    body: "Plain-English automation builder and 240+ templates mean this doesn't have to be rebuilt by hand every time.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Leadership: {
    eyebrow: "For the person who has to see it all",
    title: "This is the view a director gets in Workspace.",
    body: "Finance dashboard, engagement health, and skill-gap insights across the whole firm, not just one project.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Guides: {
    eyebrow: "See it live",
    title: "Read enough? See it running on a real engagement.",
    body: "A 30-minute walkthrough on Workspace and Clientspace, tailored to how your firm actually works.",
    label: "Book a demo",
    href: DEMO_URL,
  },
  Estimation: {
    eyebrow: "Estimate with real data",
    title: "Stop estimating from memory. Workspace tracks it.",
    body: "Billable vs. non-billable time and margin against the plan, logged automatically as work happens.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Prioritization: {
    eyebrow: "Let AI help",
    title: "Workspace helps decide what to work on next.",
    body: "AI reads workload and dependencies to flag what's actually urgent, not just what's loudest.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Productivity: {
    eyebrow: "Fewer tools, less admin",
    title: "This is the busywork PYNGYN removes.",
    body: "Smart Inbox, AI meeting agendas, and status that drafts itself, so the day goes to the work, not the tracking.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  "Remote Work": {
    eyebrow: "Stay in sync, async",
    title: "Distributed team? Status shouldn't need a meeting.",
    body: "Workspace keeps plans current automatically, and clients get the same clarity in their own Clientspace, wherever everyone's working from.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Operations: {
    eyebrow: "Run the firm on this",
    title: "This is exactly what Workspace is built to run.",
    body: "Projects, finances, and billable time in one place, with AI keeping the plan honest as things change.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  Planning: {
    eyebrow: "Plan it in seconds",
    title: "Turn a plan like this into tasks, owners, and deadlines.",
    body: "The AI Project Plan Generator turns a plain-English brief into a structured plan, free, no signup.",
    label: "Try the free plan generator",
    href: "/tools/ai-project-plan",
  },
  Product: {
    eyebrow: "See it for yourself",
    title: "This is what Clientspace and Workspace actually look like.",
    body: "A 30-minute walkthrough on your own workflows, or start a free trial and explore on your own.",
    label: "Book a demo",
    href: DEMO_URL,
  },
  "How it works": {
    eyebrow: "See the mechanics",
    title: "Curious how this actually runs inside PYNGYN?",
    body: "See Workspace and Clientspace set up live on a real engagement of yours, no slide deck.",
    label: "Book a demo",
    href: DEMO_URL,
  },

  // ---- Knowledge-base categories --------------------------------------
  Collaboration: {
    eyebrow: "This is Clientspace",
    title: "Sharing status like this is what Clientspace is for.",
    body: "A standalone, branded portal per client, no Workspace required, so this kind of update shows up without you sending it.",
    label: "See Clientspace",
    href: "/clientspace",
  },
  "AI features": {
    eyebrow: "Built into Workspace",
    title: "This AI feature lives inside Workspace.",
    body: "Business Brain, risk detection, and auto-status are part of the same product, not a bolt-on.",
    label: "Explore Workspace",
    href: "/workspace",
  },
  "Getting started": {
    eyebrow: "Try it yourself",
    title: "Fastest way to see this: start a free trial.",
    body: "No credit card required. Clientspace and Workspace both offer a 7-day trial.",
    label: "Start free trial",
    href: SIGNUP_URL,
  },
  "Admin & security": {
    eyebrow: "For IT and ops",
    title: "Questions about security or setup at scale?",
    body: "Enterprise plans add SSO/SAML, RBAC, audit log, and data residency options on top of Workspace and Clientspace.",
    label: "Talk to sales",
    href: DEMO_URL,
  },
  Integrations: {
    eyebrow: "Connect your stack",
    title: "See the rest of your tools feeding Workspace.",
    body: "QuickBooks, Xero, DocuSign, Slack, and more sync into Workspace, and the result shows up in each client's Clientspace automatically.",
    label: "See all integrations",
    href: "/integrations",
  },
  Troubleshooting: {
    eyebrow: "Still stuck?",
    title: "If this didn't fix it, talk to a human.",
    body: "Book a short call and we'll sort it out with you directly.",
    label: "Contact support",
    href: DEMO_URL,
  },
};

const DEFAULT_VARIANT: Variant = {
  eyebrow: "See it for yourself",
  title: "See it on your own projects.",
  body: "Book a 30-minute walkthrough tailored to how your firm works.",
  label: "Book a demo",
  href: DEMO_URL,
};

export function ContextualCTA({ category }: { category: string }) {
  const v = BY_CATEGORY[category] ?? DEFAULT_VARIANT;
  return (
    <div className="mt-12 rounded-2xl border border-accent/25 bg-accent-lt p-7 text-center">
      <span className="eyebrow justify-center"><span className="eyebrow-dot" aria-hidden="true" />{v.eyebrow}</span>
      <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug tracking-[-0.02em]">
        {v.title}
      </h2>
      <p className="mx-auto mt-2 max-w-[460px] text-[15px] text-muted">{v.body}</p>
      <a href={v.href} className="btn btn-accent mt-5">
        {v.label} →
      </a>
    </div>
  );
}
