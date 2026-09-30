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
      "Multi-step automated workflows & WhatsApp auto-chasing",
      "Workload Cockpit: live capacity meters & 1-click rebalance",
      "4-Eye partner review gates & advanced role permissions",
      "AI project plan generation & executive status reports",
      "Practice-level compliance radar & executive reporting",
      "100 GB bank-grade encrypted document vault",
      "Priority WhatsApp, phone & dedicated partner support",
    ],
    keyHighlights: [
      "Everything in Pyngyn Professional, plus:",
      "Automation: Multi-step triggers & WhatsApp automated document chasing",
      "Analytics: Workload Cockpit, capacity meters & 1-click team auto-rebalance",
      "Advanced Permissions: 4-Eye partner review gates (Associate → Manager → Partner)",
      "AI: AI project plans, living status reports & risk detection",
      "Practice-Level Reporting: Executive partner dashboards & firm-wide compliance radar",
      "Accounting Integrations: Tally Prime, Zoho Books & QuickBooks Online sync",
      "Compliance Registers: Statutory tax notices, DIN register & ITC tracking",
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
      "Unlimited Automations & Integrations",
      "Unlimited Staff & Article Assistants",
      "Unlimited Client Portal Guests",
    ],
    keyHighlights: [
      "Everything in Business, plus:",
      "Enterprise SSO (SAML 2.0, Okta, Azure AD)",
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
// Grouped into the 7 core CA practice categories:
// 1. CLIENT MANAGEMENT
// 2. CLIENT PORTAL
// 3. ACCOUNTING & TAX
// 4. AUTOMATION
// 5. INTEGRATIONS
// 6. WORKFLOW & PRODUCTIVITY
// 7. COLLABORATION
// ============================================================================
export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: "Client Management",
    features: [
      {
        name: "Active Client Portfolios",
        detail: "Centralized client master records with legal entity names, PAN, and GSTIN identifiers",
        pro: "Up to 50",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Entity Hierarchy & Group Portfolios",
        detail: "Manage parent companies, subsidiaries, directors, and partner relationships under one umbrella",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Compliance Health Flags",
        detail: "Visual At-Risk, Overdue, and Attention status indicators based on statutory deadlines",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "DSC (Digital Signature Certificate) Register",
        detail: "Track client DSC token holders, issuing authorities, and proactive expiry countdowns",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Statutory Tax Notices Register",
        detail: "Track Income Tax Department notices (Section 143(1), 148), DINs, demand amounts, and reply deadlines",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "1-Click Client Master Importer",
        detail: "Import client portfolios directly from Excel or CSV with automatic PAN and GSTIN validation",
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Client Portal",
    features: [
      {
        name: "Standalone Branded Client Portal",
        detail: "Dedicated portal branded with your firm's identity, logo, and practice styling",
        pro: true,
        business: true,
        enterprise: "Custom Domain & Whitelabel",
      },
      {
        name: "Frictionless Magic Link Access",
        detail: "Clients access their portal securely without remembering passwords or undergoing complicated signups",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Client Portal Guest Accounts",
        detail: "Invite client directors, accountants, and finance heads to upload files and review drafts",
        pro: "Unlimited",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "PBC Document Request Checklists",
        detail: "Structured document intake lists with real-time status (Pending → Uploaded → Verified)",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Deliverable & Report Downloads",
        detail: "Secure distribution of finalized tax computations, audit reports, and statutory acknowledgments",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Bank-Grade Encrypted Storage Vault",
        detail: "256-bit AES encryption at rest and TLS 1.3 in transit with audit-grade isolation",
        pro: "25 GB",
        business: "100 GB",
        enterprise: "200 GB (Customizable)",
      },
    ],
  },
  {
    title: "Accounting & Tax",
    features: [
      {
        name: "GST Client Compliance Tracking",
        detail: "Track monthly and quarterly filing milestones for GSTR-1, GSTR-3B, and annual returns",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "GSTR-2B Statement & ITC Reconciliation Tracking",
        detail: "Monitor auto-drafted ITC statements against purchase books and flag variance discrepancies",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Income Tax Client Workflows & ITR Due Dates",
        detail: "Track return filing cycles (ITR-1 through ITR-7), Assessment Year milestones, and Advance Tax dates",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Form 26AS & AIS Reconciliation Tracking",
        detail: "Cross-check TDS/TCS entries against client ledger claims to prevent demand intimations",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Form 3CD Tax Audit Working Papers",
        detail: "Clause-by-clause scrutiny checklists, vouching logs, and UDIN generation tracking",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Bank Reconciliation & Daybook Vouching Filters",
        detail: "Categorize bank transactions and verify vouchers directly from imported ledgers",
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Automation",
    features: [
      {
        name: "Statutory Deadline Escalations",
        detail: "Automated alert banners and task prioritizations as statutory filing dates draw near",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Automated WhatsApp Document Chasing",
        detail: "Trigger template-based WhatsApp follow-ups for pending bank statements, invoices, and signed letters",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Automated PBC Stage Triggers",
        detail: "Automatically update task status and notify assigned associates when a client uploads requested files",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Partner Review Escalation Rules",
        detail: "Auto-escalate high-priority filings to senior partners when review milestones are pending",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Active Automation Rules Limit",
        detail: "Maximum configurable workflow rules running concurrently across your firm",
        pro: "Up to 10",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    title: "Integrations",
    features: [
      {
        name: "GST Portal",
        detail: "Monthly returns, filing status tracking, and GSTR-2B ITC reconciliation",
        pro: "Status Tracking",
        business: "Directly Integrated",
        enterprise: "Directly Integrated",
      },
      {
        name: "Income Tax Portal",
        detail: "IT returns, statutory notices (Section 143(1)), and refund tracking",
        pro: "Status Tracking",
        business: "Directly Integrated",
        enterprise: "Directly Integrated",
      },
      {
        name: "Tally Prime",
        detail: "Accounting ledgers, trial balance, and daybook voucher sync via local bridge",
        pro: false,
        business: "Ready to Sync",
        enterprise: "Ready to Sync",
      },
      {
        name: "Zoho Books",
        detail: "Invoices, bills, client ledgers, and transactions synchronization",
        pro: false,
        business: "Ready to Sync",
        enterprise: "Ready to Sync",
      },
      {
        name: "QuickBooks Online",
        detail: "Invoices, bills, and ledger sync via Intuit OAuth active connection",
        pro: false,
        business: "Intuit OAuth Active",
        enterprise: "Intuit OAuth Active",
      },
      {
        name: "WhatsApp Business",
        detail: "Official client alerts, automated filing reminders, and PBC document requests",
        pro: false,
        business: "Active & Verified",
        enterprise: "Active & Verified",
      },
      {
        name: "Google Calendar",
        detail: "Review meetings, Meet video calls, and statutory deadline synchronization",
        pro: "Calendar Synced",
        business: "Calendar Synced",
        enterprise: "Calendar Synced",
      },
      {
        name: "Google Drive",
        detail: "Client audit folders, working papers, and continuous document synchronization",
        pro: "Storage Active",
        business: "Storage Active",
        enterprise: "Storage Active",
      },
      {
        name: "Gmail",
        detail: "Client email synchronization, auto-thread attachment intake, and task conversion",
        pro: "Email Synced",
        business: "Email Synced",
        enterprise: "Email Synced",
      },
      {
        name: "Document Vault",
        detail: "Bank-grade encrypted secure client document storage and deliverable exchange",
        pro: "25 GB Storage",
        business: "100 GB Storage",
        enterprise: "200 GB (Customizable)",
      },
      {
        name: "eMudhra & DocuSign eSign",
        detail: "Aadhaar OTP eSign, Class 3 DSC tokens, and client engagement letters (with Protean, Leegality & Digio)",
        pro: "Standard eSign",
        business: "Signing Active",
        enterprise: "Signing Active",
      },
      {
        name: "Razorpay Payments",
        detail: "UPI payment links, fee collections, and QR codes for client billing",
        pro: false,
        business: "Gateway Active",
        enterprise: "Gateway Active",
      },
    ],
  },
  {
    title: "Workflow & Productivity",
    features: [
      {
        name: "Practice Workload Cockpit",
        detail: "Firm-wide capacity meters displaying practitioner allocations, active filings, and bottlenecks",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "1-Click Workload Auto-Rebalance",
        detail: "Automatically redistribute pending filings from overloaded staff or article assistants",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Accounting Engagement Pipelines",
        detail: "Structured stage progression: Scoping → Vouching → Computation → 4-Eye Review → Filing",
        pro: "Single-Tier Pipeline",
        business: "Multi-Tier Pipelines",
        enterprise: "Custom Stage Gates",
      },
      {
        name: "4-Eye Partner Review Gates",
        detail: "Mandatory verification gate requiring partner or manager sign-off before deliverable dispatch",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Live Effort Tracking & Practice Timers",
        detail: "Track actual hours spent vs budgeted fees with persistent companion timer to avoid billing write-offs",
        pro: "Basic Tracking",
        business: "Full Timers & Meters",
        enterprise: "Full Timers & Meters",
      },
      {
        name: "AI Project Plan & Workflow Builder",
        detail: "Generate end-to-end task breakdowns, milestones, and statutory deliverables automatically",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "AI Living Status Reports & Risk Detection",
        detail: "Continuous automated synthesis of blocked tasks, pending client approvals, and deadline risks",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Practice-Level Executive Dashboards & Radar",
        detail: "Cross-client visibility into partner capacity, filing completion rates, and team throughput",
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Collaboration",
    features: [
      {
        name: "CA Firm Role Hierarchy",
        detail: "Granular permissions for Partners, Managers, Senior Associates, Article Assistants, and Administrative Staff",
        pro: "Standard Roles",
        business: "Enforced Hierarchy",
        enterprise: "Custom Granular RBAC",
      },
      {
        name: "Multi-Assignee Ownership",
        detail: "Assign a partner, supervising manager, and working associate to the same deliverable or return",
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Internal Scrutiny Notes & Work Threads",
        detail: "Private team commentary and query logs attached directly to client vouchers and audit clauses",
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Tamper-Evident Audit Trails",
        detail: "Unchangeable chronological history of who viewed, edited, signed off, or downloaded client files",
        pro: "90-Day Logs",
        business: "Unlimited History",
        enterprise: "Institutional Audit Trails",
      },
      {
        name: "Enterprise Single Sign-On (SAML 2.0)",
        detail: "Corporate authentication via standard SAML 2.0, Azure AD, or Okta",
        pro: false,
        business: false,
        enterprise: true,
      },
      {
        name: "Support Channels & Onboarding",
        detail: "Direct assistance from practice operations specialists",
        pro: "Email & Knowledge Base",
        business: "Priority WhatsApp, Phone & Email",
        enterprise: "24/7 Dedicated Account Partner",
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
    a: "You get full access to Pyngyn ClientSpace for 7 days with no credit card required. You can invite your team, add real client portfolios, connect Tally or cloud storage, and test statutory workflows before making any commitment.",
  },
  {
    q: "Can we switch between monthly and annual billing?",
    a: "Yes. You can switch between monthly and annual billing at any time from your practice settings. Annual billing provides an immediate 20% discount (equivalent to getting over 2 months free).",
  },
  {
    q: "What is the difference between Pyngyn Professional and Pyngyn Business?",
    a: "Pyngyn Professional (₹999/user/month) covers all essential day-to-day operations: tasks, projects, client spaces, team collaboration, firm knowledge base, standard workflows, and client communication. Pyngyn Business (₹1,599/user/month) adds full practice superpowers: multi-step automation, WhatsApp chasing, live workload analytics with auto-rebalancing, 4-eye partner review gates, AI project planning & status reporting, and firm-wide executive compliance reporting.",
  },
  {
    q: "How does Pyngyn handle GST and Income Tax compliance?",
    a: "Pyngyn ClientSpace tracks return filing statuses (GSTR-1, GSTR-3B, ITR-1 to 7), monitors GSTR-2B ITC variance against your books, reconciles Form 26AS/AIS entries, and manages Income Tax Department statutory notices (Section 143(1)). It streamlines your practice workflows and document collection. It does not replace your professional judgment or perform automated tax calculations without partner review.",
  },
  {
    q: "How do you protect client financial data and working papers?",
    a: "All client records and audit files are encrypted with 256-bit AES at rest and in transit via TLS 1.3 in ISO 27001-certified data centers. Your data is isolated per firm, and under no circumstances is confidential client financial information used to train public AI models.",
  },
  {
    q: "Can we import our existing client master list from Tally or Excel?",
    a: "Yes. ClientSpace includes a 1-click spreadsheet importer that automatically maps entity names, PAN/GSTIN numbers, contact persons, and industrial sectors. For Business and Enterprise plans, our practice onboarding team assists with your migration.",
  },
  {
    q: "How do cancellations, prorated billing, and refunds work?",
    a: "You can cancel your subscription at any time directly from your account billing settings. Cancellation stops future automatic renewals while your practice retains full access through the end of your current paid billing period. Plan upgrades and additional practitioner seats are prorated for the remaining days of your billing cycle. Payments for the ongoing billing period are non-refundable.",
  },
];
