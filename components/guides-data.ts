export type GuideCategory = "Planning" | "Status" | "Risk" | "Rollout" | "AI" | "Workflows";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  readingTime: string;
  featured?: boolean;
  sections: GuideSection[];
};

export const CATEGORY_COLOR: Record<GuideCategory, string> = {
  Planning: "#4f46e5",
  Status: "#0d9488",
  Risk: "#dc2626",
  Rollout: "#9333ea",
  AI: "#f97316",
  Workflows: "#0ea5e9",
};

export const GUIDES: Guide[] = [
  {
    slug: "plan-launch-in-an-afternoon",
    category: "Planning",
    readingTime: "8 min",
    featured: true,
    title: "Plan an audit or client engagement in an afternoon",
    excerpt: "Go from client intake to a structured statutory engagement with tasks, owners, PBC checklists, and realistic partner review milestones.",
    sections: [
      {
        heading: "1. Frame the statutory scope and hard deadlines",
        paragraphs: [
          "Every accounting engagement begins with statutory or contractual due dates (e.g., September 30 for Tax Audit, July 31 for ITR, or monthly GSTR-3B filings). Start by anchoring your engagement around the hard statutory date, then work backwards.",
          "Identify the essential milestones: planning and risk assessment, interim fieldwork, balance confirmation collection, draft computation, manager 4-eye review, and final partner sign-off.",
        ],
        bullets: [
          "Anchor to the statutory deadline first",
          "Break into 4-6 verifiable milestones",
          "Identify critical client-dependency deliverables early",
        ],
      },
      {
        heading: "2. Define the PBC (Provided By Client) checklist",
        paragraphs: [
          "70% of audit and filing delays occur because of missing client documents: bank statements, ledgers, vendor TDS certificates, and stock valuations. Define your PBC list immediately during planning.",
          "Assign each requested document a specific due date at least two weeks before your team's scheduled review gate.",
        ],
      },
      {
        heading: "3. Establish multi-tier review gates",
        paragraphs: [
          "Quality assurance in a professional accounting firm requires multi-level checks. Configure your workflow with explicit review stages: Prepared by Articled Assistant → Verified by Audit Manager → Final Sign-Off by Signing Partner.",
        ],
      },
    ],
  },
  {
    slug: "kill-the-status-meeting",
    category: "Status",
    readingTime: "6 min",
    featured: true,
    title: "Kill the weekly status meeting in your CA practice",
    excerpt: "How CA partnerships replace repetitive Monday status meetings with self-updating client cockpits and automated WhatsApp intake.",
    sections: [
      {
        heading: "The hidden cost of manual status calls",
        paragraphs: [
          "Partners and senior managers spend upwards of 5 hours every week in internal status calls asking: 'Did we get the bank statements from XYZ Ltd? Who is working on the GST reconciliation?'",
          "When the practice workspace updates automatically from the work itself, internal status calls become redundant.",
        ],
      },
      {
        heading: "Replace status meetings with automated health indicators",
        paragraphs: [
          "By implementing real-time task statuses (Not Started, Pending Client PBC, Under Manager Review, Ready for Partner Sign-Off), the managing partner can glance at the statutory radar in 60 seconds and instantly know what needs attention.",
        ],
        bullets: [
          "Automate document chase via WhatsApp reminders",
          "Use 4-eye review queues to track bottlenecks",
          "Give clients self-serve access to their own milestones",
        ],
      },
    ],
  },
  {
    slug: "spot-risk-before-it-bites",
    category: "Risk",
    readingTime: "7 min",
    featured: true,
    title: "Spot compliance and filing risk before deadlines slip",
    excerpt: "Read early warning signals in associate workloads, client document delays, and complex reconciliations to protect statutory deadlines.",
    sections: [
      {
        heading: "Why statutory deadlines slip unnoticed",
        paragraphs: [
          "Filing penalties, client disputes, and interest under sections 234A/B/C rarely happen without warning signs. The signals are almost always visible 10 to 14 days in advance: an unresponded PBC query, an overloaded senior associate, or an unreviewed trial balance.",
        ],
      },
      {
        heading: "Proactive risk indicators for CA firms",
        paragraphs: [
          "Configure threshold alerts for unreceived client records and stalled review queues. If an articled assistant has 12 returns assigned with 3 days remaining, the Workload Cockpit flags an overload risk so you can reassign tasks before quality suffers.",
        ],
      },
    ],
  },
  {
    slug: "write-goals-ai-understands",
    category: "Planning",
    readingTime: "5 min",
    title: "Draft engagement scopes and audit programs with AI",
    excerpt: "How to use AI drafting to create standardized accounting programs, engagement letters, and compliance checklists in minutes.",
    sections: [
      {
        heading: "Structure inputs for professional precision",
        paragraphs: [
          "When generating engagement programs, provide the exact entity type (Pvt Ltd, LLP, Partnership), turnover bracket, and applicable statutory frameworks (Companies Act, Ind AS, Income Tax Act).",
        ],
      },
      {
        heading: "Review and refine standard operating procedures",
        paragraphs: [
          "AI generates a comprehensive 80% draft of audit procedures; your senior team reviews and adapts it to client-specific risk matrices.",
        ],
      },
    ],
  },
  {
    slug: "scope-without-padding",
    category: "Planning",
    readingTime: "6 min",
    title: "Scope accounting retainers and audit fees without guessing",
    excerpt: "Use actual historical hours and resource effort to price fixed-fee corporate retainers and audit engagements profitably.",
    sections: [
      {
        heading: "The fixed-fee trap in professional practices",
        paragraphs: [
          "Under-quoting retainers leads to partner burnout and write-offs; over-quoting risks losing bids to competitive practices. Track billable versus realization hours across previous years to set realistic fixed fees.",
        ],
      },
    ],
  },
  {
    slug: "dependency-first-plans",
    category: "Planning",
    readingTime: "7 min",
    title: "Dependency-first planning for multi-entity corporate groups",
    excerpt: "Map holding-subsidiary dependencies and consolidation schedules before assigning individual compliance tasks.",
    sections: [
      {
        heading: "Sequencing multi-tier corporate compliances",
        paragraphs: [
          "In corporate groups, subsidiary financials must close before consolidated accounts can be audited, and board approval must precede ROC filing. Dependency-first planning ensures tasks unlock only when prerequisite steps are verified.",
        ],
      },
    ],
  },
  {
    slug: "make-status-self-update",
    category: "Status",
    readingTime: "5 min",
    title: "Automate document collection and client update loops",
    excerpt: "Connect client intake portals with WhatsApp notifications so engagement statuses stay 100% current without manual entry.",
    sections: [
      {
        heading: "Self-updating client portals",
        paragraphs: [
          "When a client uploads their GST bank reconciliation file, the task automatically shifts from 'Pending Client' to 'Ready for Associate Verification' without a single phone call.",
        ],
      },
    ],
  },
  {
    slug: "the-2-line-update",
    category: "Status",
    readingTime: "4 min",
    title: "The high-impact partner briefing template",
    excerpt: "A concise 2-minute status format for managing partners overseeing dozens of active client filings simultaneously.",
    sections: [
      {
        heading: "What managing partners actually need to know",
        paragraphs: [
          "Skip verbose progress reports. Focus exclusively on: 1) What was filed this week, 2) Which clients are bottlenecked on PBC documents, and 3) Next week's critical statutory targets.",
        ],
      },
    ],
  },
  {
    slug: "read-velocity-honestly",
    category: "Risk",
    readingTime: "6 min",
    title: "Track practice capacity and article staff velocity",
    excerpt: "Measure actual turnaround times on tax filings, book closures, and working papers to benchmark team performance.",
    sections: [
      {
        heading: "Understanding firm throughput",
        paragraphs: [
          "Discover how many days each phase typically takes in your practice: from ledger receipt to draft tax computation. Identifying lag points allows you to optimize staffing before tax season peaks.",
        ],
      },
    ],
  },
  {
    slug: "the-friday-risk-review",
    category: "Risk",
    readingTime: "5 min",
    title: "The 15-minute Friday practice risk review",
    excerpt: "A rapid end-of-week ritual for partners to catch 80% of avoidable compliance misses and billing delays.",
    sections: [
      {
        heading: "The 3-step Friday checklist",
        paragraphs: [
          "1. Inspect all tasks due within the next 7 calendar days. 2. Verify all 4-eye partner review gates awaiting signature. 3. Send automated weekend reminder batches to non-responsive clients.",
        ],
      },
    ],
  },
  {
    slug: "onboard-a-new-team",
    category: "Rollout",
    readingTime: "8 min",
    title: "Roll out ClientSpace across your CA firm in 7 days",
    excerpt: "A structured timeline for transitioning your partners, managers, articled assistants, and clients onto Pyngyn smoothly.",
    sections: [
      {
        heading: "Day-by-day practice onboarding plan",
        paragraphs: [
          "Day 1: Import client master records and PAN/GSTIN profiles. Day 2: Configure team members and reviewer permissions. Day 3: Set up standard compliance templates. Day 4-5: Run pilot engagements. Day 6-7: Invite clients to their branded portals.",
        ],
      },
    ],
  },
  {
    slug: "migrate-from-spreadsheets",
    category: "Rollout",
    readingTime: "7 min",
    title: "Migrate client masters from Excel & Tally without chaos",
    excerpt: "Step-by-step instructions to export client lists, entity details, and statutory categories into Pyngyn cleanly.",
    sections: [
      {
        heading: "Say goodbye to scattered Excel trackers",
        paragraphs: [
          "Spreadsheets lack role controls, live reminders, and audit trails. Learn how to map columns from existing Excel master sheets into Pyngyn's unified client management hierarchy.",
        ],
      },
    ],
  },
  {
    slug: "rollout-across-multiple-pods",
    category: "Rollout",
    readingTime: "9 min",
    title: "Scale across audit, direct tax, and corporate law branches",
    excerpt: "How multi-partner and multi-branch firms structure permissions, shared clients, and partner escalation matrixes.",
    sections: [
      {
        heading: "Branch and department segregation",
        paragraphs: [
          "Organize practice groups by department (Statutory Audit, Direct Tax, Transfer Pricing, Corporate Secretarial) while keeping a unified firm-wide executive radar for managing partners.",
        ],
      },
    ],
  },
  {
    slug: "prompt-pyngyn-better",
    category: "AI",
    readingTime: "5 min",
    title: "Leverage AI for notice drafting and tax research queries",
    excerpt: "Practical guidance on utilizing Pyngyn's Business Brain to query client engagement histories and statutory precedents.",
    sections: [
      {
        heading: "Context-aware practice intelligence",
        paragraphs: [
          "Ask Pyngyn: 'What was the depreciation treatment applied for Client X in FY 2024-25?' and retrieve exact verified working paper references instantly.",
        ],
      },
    ],
  },
  {
    slug: "when-to-override-the-ai",
    category: "AI",
    readingTime: "4 min",
    title: "Human professional judgment in automated practice systems",
    excerpt: "Why partner sign-offs and 4-eye verification gates remain mandatory alongside automated workflows.",
    sections: [
      {
        heading: "AI drafts; qualified professionals sign",
        paragraphs: [
          "Automations handle routine follow-ups, date calculations, and checklist verifications. Professional tax interpretations and audit opinions always rest with qualified practitioners.",
        ],
      },
    ],
  },
  {
    slug: "client-engagement-workflow",
    category: "Workflows",
    readingTime: "8 min",
    title: "The standard CA client engagement lifecycle",
    excerpt: "From initial KYC and engagement letter to fieldwork, 4-eye review, final statutory filing, and invoice settlement.",
    sections: [
      {
        heading: "End-to-end statutory delivery pipeline",
        paragraphs: [
          "Standardize your practice around 5 clear phases: 1. Client Onboarding & Engagement Letter e-Signature, 2. PBC Document Collection, 3. Fieldwork & Working Paper Preparation, 4. Multi-Tier Partner Review, 5. Filing Confirmation & Client Handover.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
