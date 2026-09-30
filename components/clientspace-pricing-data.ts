import { SIGNUP_URL, DEMO_URL } from "./config";
import { PLAN_ENTITLEMENTS } from "@/lib/entitlements";
import { type MarketCode } from "@/lib/pricing/config";

export interface PricingPlan {
  id: "pro" | "business" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currencySymbol: string;
  currencyCode: string;
  unit: string;
  periodText: string;
  featured?: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
  ctaStyle: "primary" | "accent" | "ghost";
  summaryLimits: string[];
  keyHighlights: string[];
}

export interface FeatureRow {
  name: string;
  detail?: string;
  pro: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

export interface FeatureCategory {
  title: string;
  features: FeatureRow[];
}

export interface PricingFaq {
  q: string;
  a: string;
}
 
export type ClientSpaceMarketPrices = {
  currencySymbol: string;
  currencyCode: string;
  proMonthly: number;
  proAnnual: number;
  bizMonthly: number;
  bizAnnual: number;
  taxNote: string;
};

export const MARKET_PRICING_MAP: Record<MarketCode, ClientSpaceMarketPrices> = {
  IN: {
    currencySymbol: "₹",
    currencyCode: "INR",
    proMonthly: 999,
    proAnnual: 799,
    bizMonthly: 1599,
    bizAnnual: 1279,
    taxNote: "+ GST 18%",
  },
  US: {
    currencySymbol: "$",
    currencyCode: "USD",
    proMonthly: 29,
    proAnnual: 24,
    bizMonthly: 49,
    bizAnnual: 39,
    taxNote: "Sales tax (state)",
  },
  GB: {
    currencySymbol: "£",
    currencyCode: "GBP",
    proMonthly: 24,
    proAnnual: 19,
    bizMonthly: 39,
    bizAnnual: 32,
    taxNote: "VAT 20% (incl.)",
  },
  CA: {
    currencySymbol: "C$",
    currencyCode: "CAD",
    proMonthly: 39,
    proAnnual: 32,
    bizMonthly: 65,
    bizAnnual: 52,
    taxNote: "GST/HST/PST (varies)",
  },
  AU: {
    currencySymbol: "A$",
    currencyCode: "AUD",
    proMonthly: 44,
    proAnnual: 36,
    bizMonthly: 75,
    bizAnnual: 62,
    taxNote: "GST 10% (incl.)",
  },
  AE: {
    currencySymbol: "AED ",
    currencyCode: "AED",
    proMonthly: 110,
    proAnnual: 89,
    bizMonthly: 180,
    bizAnnual: 149,
    taxNote: "VAT 5% (itemized)",
  },
  DEFAULT: {
    currencySymbol: "$",
    currencyCode: "USD",
    proMonthly: 29,
    proAnnual: 24,
    bizMonthly: 49,
    bizAnnual: 39,
    taxNote: "Tax calculated at checkout",
  },
};

// ============================================================================
// CLIENTSPACE PRICING PLANS (CENTRALIZED VIA LIB/ENTITLEMENTS)
// ============================================================================
export const CLIENTSPACE_PLANS: PricingPlan[] = [
  {
    id: "pro",
    name: "Pyngyn Professional",
    tagline: "Tasks, projects, client spaces, collaboration, knowledge, workflows, client communication.",
    monthlyPrice: 999,
    annualPrice: 799,
    currencySymbol: "₹",
    currencyCode: "INR",
    unit: "user / month",
    periodText: "billed monthly",
    featured: false,
    ctaText: "Start 7-Day Free Trial",
    ctaHref: SIGNUP_URL,
    ctaStyle: "primary",
    summaryLimits: [
      "Tasks, Kanban boards, project timelines & milestones",
      "Branded client spaces with magic link login",
      "Team collaboration, internal comments & activity feeds",
      "Firm knowledge base & practice SOP documentation",
      "Practice workflows, checklists & statutory due date calendar",
      "Client communication, portal messaging & email intake",
      "25 GB bank-grade encrypted document vault",
      "Unlimited client portal guests",
    ],
    keyHighlights: [
      "Task lists, Kanban boards & project timelines",
      "Branded client spaces with frictionless magic links",
      "Team collaboration, discussions & activity feeds",
      "Practice knowledge base & firm SOPs",
      "Standard practice workflows & statutory due date tracking",
      "Client communication & unified email intake",
      "PBC document request checklists & secure uploads",
      "Standard role permissions (Owner, Member, Guest)",
      "25 GB bank-grade encrypted document vault",
      "Standard email & help center support",
    ],
  },
  {
    id: "business",
    name: "Pyngyn Business",
    tagline: "Everything + automation, analytics, advanced permissions, AI, practice-level reporting.",
    monthlyPrice: 1599,
    annualPrice: 1279,
    currencySymbol: "₹",
    currencyCode: "INR",
    unit: "user / month",
    periodText: "billed monthly",
    featured: true,
    badge: "Most Popular for Growing Firms",
    ctaText: "Start 7-Day Free Trial",
    ctaHref: SIGNUP_URL,
    ctaStyle: "accent",
    summaryLimits: [
      "Everything in Pyngyn Professional",
      "Multi-step automated workflows & trigger rules",
      "Workload Cockpit: live capacity meters & 1-click rebalance",
      "4-Eye partner review gates & advanced role permissions",
      "AI project plan generation & executive status reports",
      "Practice-level compliance radar & executive reporting",
      "100 GB bank-grade encrypted document vault",
      "Priority WhatsApp, phone & dedicated partner support",
    ],
    keyHighlights: [
      "Everything in Pyngyn Professional, plus:",
      "Automation: Multi-step triggers & automated workflow rules",
      "Analytics: Workload Cockpit, capacity meters & 1-click team auto-rebalance",
      "Advanced Permissions: 4-Eye partner review gates & granular roles",
      "AI: AI project plans, living status reports & risk detection",
      "Practice-Level Reporting: Executive partner dashboards & firm-wide compliance radar",
      "Document Requests: Automated PBC intake & client status notifications",
      "Audit Trail: Detailed activity history & file version control",
      "100 GB secure document vault with audit trail history",
      "Priority WhatsApp, phone & dedicated partner advisory support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom scale, dedicated compliance isolation, and white-glove migration for large partnerships.",
    monthlyPrice: null,
    annualPrice: null,
    currencySymbol: "",
    currencyCode: "INR",
    unit: "Custom practice pricing",
    periodText: "tailored to your firm",
    featured: false,
    badge: "Large Partnerships",
    ctaText: "Contact Practice Advisory",
    ctaHref: DEMO_URL,
    ctaStyle: "ghost",
    summaryLimits: [
      "Unlimited Portfolios & Multi-Branch Entities",
      "200 GB Storage (Customizable)",
      "Unlimited Automations & Workflows",
      "Unlimited Staff & Team Members",
      "Unlimited Client Portal Guests",
    ],
    keyHighlights: [
      "Everything in Business, plus:",
      "Multi-Branch & Multi-Office Practice Partitions",
      "Dedicated White-Glove Client & Document Migration Specialist",
      "Custom DPA (Data Processing Agreement) & Sensitive Audit Isolation",
      "Guaranteed 99.9% Uptime SLA & 24/7 Dedicated Account Partner",
    ],
  },
];

export function getPlansForMarket(market: MarketCode): PricingPlan[] {
  const p = MARKET_PRICING_MAP[market] || MARKET_PRICING_MAP.DEFAULT;
  // Hide Enterprise plan as requested; show only Professional and Business
  return CLIENTSPACE_PLANS.filter((plan) => plan.id !== "enterprise").map((plan) => {
    if (plan.id === "pro") {
      return {
        ...plan,
        currencySymbol: p.currencySymbol,
        currencyCode: p.currencyCode,
        monthlyPrice: p.proMonthly,
        annualPrice: p.proAnnual,
      };
    }
    if (plan.id === "business") {
      return {
        ...plan,
        currencySymbol: p.currencySymbol,
        currencyCode: p.currencyCode,
        monthlyPrice: p.bizMonthly,
        annualPrice: p.bizAnnual,
      };
    }
    return {
      ...plan,
      currencySymbol: p.currencySymbol,
      currencyCode: p.currencyCode,
    };
  });
}

// ============================================================================
// PROTOTYPE-ALIGNED FEATURE COMPARISON MATRIX
// Grouped into the core practice categories:
// 1. TASKS & PROJECTS
// 2. CLIENT SPACES & PORTAL
// 3. COLLABORATION & KNOWLEDGE
// 4. WORKFLOWS & COMMUNICATION
// 5. AUTOMATION (BUSINESS)
// 6. ANALYTICS, PERMISSIONS & AI (BUSINESS)
// 7. STORAGE, SECURITY & SUPPORT
// ============================================================================
export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: "Tasks & Projects",
    features: [
      {
        name: "Task Lists & Kanban Boards",
        detail: "Interactive task execution tables, status columns, priorities, and flexible Kanban views",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Project Timelines & Milestones",
        detail: "Structured phases, engagement milestones, and deliverable target tracking",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Due Dates & Target Tracking",
        detail: "Custom due dates, recurring task schedules, and statutory filing target milestones",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Spreadsheet Importer (Excel / CSV)",
        detail: "1-Click import of client master records and task lists with column auto-mapping",
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Client Spaces & Portal",
    features: [
      {
        name: "Branded Client Spaces",
        detail: "Dedicated, private portal for each client branded with your firm's name and logo",
        pro: true,
        business: true,
        enterprise: "Custom Domain & Whitelabel",
      },
      {
        name: "Frictionless Magic Link Access",
        detail: "Clients log in securely via 1-click magic link with zero passwords to remember",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Unlimited Client Guest Accounts",
        detail: "Invite client directors, accountants, and finance heads at zero additional cost",
        pro: "Unlimited",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "PBC Document Request Checklists",
        detail: "Structured document intake lists with real-time status (Requested → Uploaded → Approved)",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Deliverable & Report Downloads",
        detail: "Secure client access to finalized tax computations, reports, and acknowledgments",
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Collaboration & Knowledge",
    features: [
      {
        name: "Team Collaboration & Discussions",
        detail: "Internal comments, query notes, @mentions, and discussions linked directly to tasks",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Firm Knowledge Base & SOPs",
        detail: "Centralized practice documentation, standard operating procedures, and compliance guidelines",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Activity Feeds & Audit History",
        detail: "Chronological activity logging across all tasks, client spaces, and deliverables",
        pro: "90-Day History",
        business: "Unlimited History",
        enterprise: "Unlimited History",
      },
    ],
  },
  {
    title: "Workflows & Client Communication",
    features: [
      {
        name: "Practice Workflows & Checklists",
        detail: "Standardized workflow templates for routine accounting, tax, and audit procedures",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Client Portal Messaging",
        detail: "Direct, contextual client communications attached directly to deliverables and requests",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Unified Email Intake",
        detail: "Forward client requests and documents directly into task queues and client spaces",
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Automation (Business Plan)",
    features: [
      {
        name: "Multi-Step Workflow Automations",
        detail: "Configurable event-driven trigger rules that automate routine practice actions",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Automatic Task & Stage Triggers",
        detail: "Auto-advance task status and alert assignees when clients upload requested documents",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Deadline Escalation Rules",
        detail: "Automatic escalation alerts to managers and partners as statutory target dates approach",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Active Automation Rules Limit",
        detail: "Number of concurrent automated rules running across your practice",
        pro: "Up to 10",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    title: "Analytics, Permissions & AI (Business Plan)",
    features: [
      {
        name: "Practice Workload Cockpit",
        detail: "Live capacity meters displaying practitioner allocations, active filings, and bottlenecks",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "1-Click Workload Auto-Rebalance",
        detail: "Redistribute pending deliverables from overloaded staff or article assistants with one click",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "4-Eye Partner Review Gates",
        detail: "Mandatory verification gate requiring partner or manager sign-off before deliverable dispatch",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Granular Role Hierarchy",
        detail: "Role-based permissions tailored for Partner, Manager, Senior Associate, and Article Assistant",
        pro: "Standard Roles",
        business: "Enforced Hierarchy",
        enterprise: "Custom Granular RBAC",
      },
      {
        name: "Live Effort Tracking & Timers",
        detail: "Track actual hours spent vs budgeted fees with persistent companion timers",
        pro: "Basic Tracking",
        business: "Full Timers & Meters",
        enterprise: "Full Timers & Meters",
      },
      {
        name: "AI Project Plan & Workflow Builder",
        detail: "Generate end-to-end task breakdowns, milestones, and deliverables automatically",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "AI Status Reports & Risk Detection",
        detail: "Automated synthesis of blocked tasks, pending client approvals, and deadline risks",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Practice-Level Executive Dashboards",
        detail: "Cross-client visibility into partner capacity, filing completion rates, and team throughput",
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Storage, Security & Support",
    features: [
      {
        name: "Encrypted Document Vault Storage",
        detail: "Bank-grade 256-bit AES encrypted secure client document storage",
        pro: "25 GB Storage",
        business: "100 GB Storage",
        enterprise: "200 GB Storage",
      },
      {
        name: "Google Calendar & Drive Integration",
        detail: "Sync task deadlines to calendar and link Google Drive working paper folders",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Support Channels & Onboarding",
        detail: "Direct assistance from practice operations specialists",
        pro: "Email & Help Center",
        business: "Priority Support",
        enterprise: "Dedicated Account Partner",
      },
    ],
  },
];

// ============================================================================
// PRACTICE FAQS SPECIFIC TO CA & ACCOUNTING FIRMS
// ============================================================================
export const PRICING_FAQS: PricingFaq[] = [
  {
    q: "Do my clients have to pay anything to access their Client Portal?",
    a: "No, never. All client portal guest accounts are 100% free and unlimited on all plans. Your clients receive secure magic links, view their deliverables, approve drafts, and upload requested documents at zero additional cost to them or your firm.",
  },
  {
    q: "How does the 7-day free trial work?",
    a: "You get full access to Pyngyn ClientSpace for 7 days with no credit card required. You can invite your team, add real client portfolios, import spreadsheets, and test practice workflows before making any commitment.",
  },
  {
    q: "Can we switch between monthly and annual billing?",
    a: "Yes. You can switch between monthly and annual billing at any time from your practice settings. Annual billing provides an immediate 20% discount (equivalent to getting over 2 months free).",
  },
  {
    q: "What is the difference between Pyngyn Professional and Pyngyn Business?",
    a: "Pyngyn Professional (₹999/user/month) covers all essential day-to-day operations: tasks, projects, client spaces, team collaboration, firm knowledge base, standard workflows, and client communication. Pyngyn Business (₹1,599/user/month) adds full practice superpowers: multi-step automation, live workload analytics with auto-rebalancing, 4-eye partner review gates, AI project planning & status reporting, and firm-wide executive reporting.",
  },
  {
    q: "How does Pyngyn handle statutory deadlines and compliance workflows?",
    a: "Pyngyn ClientSpace organizes compliance schedules, task checklists, and statutory target dates (such as GST and Income Tax filing milestones). It streamlines document collection, client follow-ups, and internal review queues so your team never misses a statutory deadline.",
  },
  {
    q: "How do you protect client financial data and working papers?",
    a: "All client records and audit files are encrypted with 256-bit AES at rest and in transit via TLS 1.3 in ISO 27001-certified data centers. Your data is isolated per firm, and under no circumstances is confidential client financial information used to train public AI models.",
  },
  {
    q: "Can we import our existing client master list from Excel or CSV?",
    a: "Yes. ClientSpace includes a 1-click spreadsheet importer that automatically maps entity names, PAN/GSTIN numbers, contact persons, and industrial sectors. For Business and Enterprise plans, our practice onboarding team assists with your migration.",
  },
  {
    q: "How do cancellations, prorated billing, and refunds work?",
    a: "You can cancel your subscription at any time directly from your account billing settings. Cancellation stops future automatic renewals while your practice retains full access through the end of your current paid billing period. Plan upgrades and additional practitioner seats are prorated for the remaining days of your billing cycle. Payments for the ongoing billing period are non-refundable.",
  },
];
