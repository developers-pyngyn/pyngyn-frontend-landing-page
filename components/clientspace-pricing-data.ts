import { SIGNUP_URL, DEMO_URL } from "./config";

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

// ============================================================================
// CLIENTSPACE PRICING PLANS (EASILY CUSTOMIZABLE)
// ============================================================================
export const CLIENTSPACE_PLANS: PricingPlan[] = [
  {
    id: "pro",
    name: "Pro",
    tagline: "Essential client workspace and statutory task tracking for boutique CA & tax practices.",
    monthlyPrice: 499,
    annualPrice: 399,
    currencySymbol: "₹",
    currencyCode: "INR",
    unit: "user / month",
    periodText: "billed monthly",
    featured: false,
    ctaText: "Start 7-Day Free Trial",
    ctaHref: SIGNUP_URL,
    ctaStyle: "primary",
    summaryLimits: [
      "Up to 25 Active Client Portfolios",
      "5 GB Secure Document Vault",
      "Unlimited Client Portal Guests",
    ],
    keyHighlights: [
      "Client Management & Entity Portfolios",
      "Statutory Due Date Calendar & Regulatory Tasks",
      "Single-tier Review Pipeline (To Do → Done)",
      "Standard White-labeled Client Portal",
      "Email Intake & Document Request Checklists",
      "Basic e-Signatures for Engagement Letters",
      "Standard Email & Knowledge Base Support",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "The complete practice operating system for high-velocity CA firms, audit assurance & tax teams.",
    monthlyPrice: 799,
    annualPrice: 649,
    currencySymbol: "₹",
    currencyCode: "INR",
    unit: "user / month",
    periodText: "billed monthly",
    featured: true,
    badge: "Most Popular for CA Practices",
    ctaText: "Start 7-Day Free Trial",
    ctaHref: SIGNUP_URL,
    ctaStyle: "accent",
    summaryLimits: [
      "Unlimited Client Portfolios",
      "50 GB Secure Document Vault",
      "Unlimited Client Portal Guests",
    ],
    keyHighlights: [
      "Everything in Pro, plus:",
      "Workload Cockpit: Capacity meters & 1-Click Auto-Rebalance",
      "Automation Engine: WhatsApp reminders & automated intake chase",
      "Full Accounting Integrations: Tally Prime, Computax & Zoho Books",
      "4-Eye Partner Review Gates (Associate → Manager → Partner Sign-off)",
      "Multi-Assignee Ownership & Partner Escalation Matrix",
      "Statutory Compliance Radar (GSTR-1, GSTR-3B, Advance Tax, Form 3CD)",
      "Audit Working Papers Tree & Bank Vouching Scrutiny Logs",
      "Live Effort Tracking (e.g. 2.5/4h) with Integrated Billing Timers",
      "Priority WhatsApp, Phone & Dedicated Support",
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
    badge: "Custom SLA & Migration",
    ctaText: "Contact Practice Advisory",
    ctaHref: DEMO_URL,
    ctaStyle: "ghost",
    summaryLimits: [
      "Unlimited Portfolios & Entities",
      "1 TB+ Bank-Grade Encrypted Storage",
      "Custom Branch & Department Partitions",
    ],
    keyHighlights: [
      "Everything in Business, plus:",
      "Custom ERP Integrations (SAP, Oracle, Custom REST APIs)",
      "Dedicated Practice Migration Specialist & White-Glove Onboarding",
      "Enterprise SSO (SAML 2.0, Okta, Azure AD, Google Workspace)",
      "Granular Role-Based Access Controls & Sensitive Audit Isolation",
      "Tamper-Evident Audit Trails & Institutional Activity Logs",
      "Guaranteed 99.9% Uptime SLA & 24/7 Dedicated Account Partner",
      "Tailored Partner & Staff Training Workshops",
      "Custom DPA (Data Processing Agreement) & Private Cloud Options",
    ],
  },
];

// ============================================================================
// COMPREHENSIVE FEATURE COMPARISON MATRIX
// ============================================================================
export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: "Client Management & Portal",
    features: [
      { name: "Active Client Portfolios", pro: "Up to 25", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Client Portal Guest Accounts", detail: "Clients invited to view their deliverables and upload documents", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Industry & Holdings Hierarchy", detail: "Manufacturing, Export, EPC, Retail sector classifications", pro: "Standard", business: "Advanced Multi-Tier", enterprise: "Custom Nested" },
      { name: "Compliance Health Flags", detail: "At-Risk, Attention, and Tier 1 priority indicators", pro: true, business: true, enterprise: true },
      { name: "White-Labeled Client Portal", detail: "Branded with your firm name and practice styling", pro: true, business: true, enterprise: "Custom Domain & Whitelabel" },
      { name: "Frictionless Magic Link Access", detail: "Clients enter without passwords or account setup", pro: true, business: true, enterprise: true },
    ],
  },
  {
    title: "Task, Deadlines & Compliance",
    features: [
      { name: "Statutory Filing Deadlines", detail: "GSTR-1, GSTR-3B, Advance Tax, Form 3CD, TDS, ROC", pro: true, business: true, enterprise: true },
      { name: "Statutory Overdue Grouping", detail: "Automatic escalation banners for overdue statutory targets", pro: true, business: true, enterprise: true },
      { name: "4-Eye Partner Review Gates", detail: "Lock completed computations until verified by partner", pro: false, business: true, enterprise: true },
      { name: "Multi-Assignee Ownership", detail: "Assign partners, working associates, and reviewers to one deliverable", pro: false, business: true, enterprise: true },
      { name: "Live Effort Tracking (e.g. 2.5/4h)", detail: "Actual time vs. allocated fee budgets to prevent write-offs", pro: "Basic", business: "Full Timers & Meters", enterprise: "Full Timers & Meters" },
      { name: "Audit Working Papers Tree", detail: "Structured scrutiny logs, bank vouching, and Form 3CD checklists", pro: false, business: true, enterprise: true },
      { name: "Compliance Calendar Grid", detail: "Interactive monthly regulatory view with multi-category stacks", pro: true, business: true, enterprise: true },
    ],
  },
  {
    title: "Workload & Team Operations",
    features: [
      { name: "Practice Workload Cockpit", detail: "Firm-wide capacity dashboard across all practitioners", pro: false, business: true, enterprise: true },
      { name: "Practitioner Capacity Meters", detail: "Track active hours, assigned filings, and bottleneck risks", pro: false, business: true, enterprise: true },
      { name: "1-Click Auto-Rebalance", detail: "Reallocate tasks from overloaded associates with one click", pro: false, business: true, enterprise: true },
      { name: "Filing Stage Distribution", detail: "Real-time donut ring of Scoping, Vouching, Review, and Filing", pro: false, business: true, enterprise: true },
      { name: "Persistent Timer Bar with Pyng Companion", detail: "Live task timer with quick shortcut launcher", pro: true, business: true, enterprise: true },
    ],
  },
  {
    title: "Automations & Communication",
    features: [
      { name: "Email Intake & Status Threading", detail: "Unified client communication history per engagement", pro: true, business: true, enterprise: true },
      { name: "WhatsApp Business Reminders", detail: "Auto-send filing deadlines and document reminders to clients", pro: false, business: true, enterprise: true },
      { name: "Automated Document Chase Rules", detail: "Auto-trigger follow-ups when requested bank statements are pending", pro: false, business: true, enterprise: true },
      { name: "Partner Escalation Triggers", detail: "Notify senior partner immediately when high-risk filing slips", pro: false, business: true, enterprise: true },
      { name: "Pyng Practice Assistant AI", detail: "Context-aware filing summaries and working paper assistance", pro: "Standard", business: "Advanced", enterprise: "Custom Tuned" },
    ],
  },
  {
    title: "Accounting Integrations",
    features: [
      { name: "Tally Prime & Tally.ERP 9", detail: "Sync client masters and ledger summaries", pro: false, business: true, enterprise: true },
      { name: "Computax / Winman Tax", detail: "Direct tax computation and return export links", pro: false, business: true, enterprise: true },
      { name: "Zoho Books & QuickBooks", detail: "Real-time ledger matching and transaction sync", pro: false, business: true, enterprise: true },
      { name: "Google Drive & OneDrive", detail: "Automated working paper folder synchronization", pro: true, business: true, enterprise: true },
      { name: "Google Calendar & Outlook", detail: "Statutory deadline synchronization to practitioner calendars", pro: true, business: true, enterprise: true },
      { name: "Custom API & ERP Integrations", detail: "SAP, Oracle Financials, or bespoke in-house software", pro: false, business: false, enterprise: true },
    ],
  },
  {
    title: "Security, Governance & Support",
    features: [
      { name: "Secure Storage Vault", detail: "Bank-grade 256-bit AES encrypted file storage", pro: "5 GB", business: "50 GB", enterprise: "1 TB+ Dedicated" },
      { name: "SOC 2 Aligned & ISO 27001 Infrastructure", detail: "Strict data privacy standards for financial records", pro: true, business: true, enterprise: true },
      { name: "Enterprise SSO & SAML 2.0", detail: "Single sign-on via Google Workspace, Okta, Azure AD", pro: false, business: false, enterprise: true },
      { name: "Tamper-Evident Audit Trails", detail: "Complete chronological logs of every document access and change", pro: false, business: true, enterprise: true },
      { name: "Customer Data Privacy Guarantee", detail: "Confidential financial data is never used to train public AI", pro: true, business: true, enterprise: true },
      { name: "Support Channels", detail: "Assistance from qualified practice support team", pro: "Email & Help Center", business: "Priority Phone, WhatsApp & Email", enterprise: "24/7 Dedicated Account Partner" },
      { name: "Dedicated Migration Specialist", detail: "Hands-on import of client records from spreadsheets and legacy tools", pro: false, business: "Assisted Onboarding", enterprise: "White-Glove Migration" },
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
    a: "You get full, unrestricted access to Pyngyn ClientSpace for 7 days with no credit card required. You can invite your team, add real client portfolios, connect Tally or Google Drive, and test statutory workflows before making any commitment.",
  },
  {
    q: "Can we switch between monthly and annual billing?",
    a: "Yes. You can switch between monthly and annual billing at any time from your practice settings. Annual billing provides an immediate 20% discount (equivalent to getting over 2 months free).",
  },
  {
    q: "What is the difference between Pro and Business?",
    a: "Pro (₹499/mo) is designed for solo practitioners and small boutique tax teams who need client portfolios, basic statutory task tracking, and client portal document intake. Business (₹799/mo) is our flagship practice tier: it unlocks the Workload Cockpit with 1-click rebalancing, automated WhatsApp reminders, 4-eye partner review gates, Tally/Computax integrations, and audit working paper trees.",
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
    a: "You can cancel your subscription at any time directly from your account billing settings. Cancellation stops future automatic renewals while your practice retains full access through the end of your current paid billing period. Plan upgrades and additional practitioner seats are prorated for the remaining days of your billing cycle. Payments for the ongoing billing period are non-refundable. For full details, see our Refund & Subscription Cancellation Policy.",
  },
];
