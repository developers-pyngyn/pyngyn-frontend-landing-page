// Single source of truth for ClientSpace pricing. Every page that shows a
// price reads from here, so a price change is a one-file edit.
//
// One plan with every feature; the only choice is team size. USD for every
// visitor. Annual billing is 20% off, rounded down to a whole dollar.

export type PricingTier = {
  users: number;
  monthly: number; // USD per month, billed monthly
  annual: number; // USD per month, billed yearly
  popular?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  { users: 5, monthly: 49, annual: 39 },
  { users: 10, monthly: 99, annual: 79, popular: true },
  { users: 15, monthly: 149, annual: 119 },
  { users: 20, monthly: 199, annual: 159 },
  { users: 50, monthly: 499, annual: 399 },
  { users: 100, monthly: 999, annual: 799 },
];

export const ANNUAL_DISCOUNT_PCT = 20;
export const ENTERPRISE_FROM_USERS = 100;

const entry = PRICING_TIERS[0];
/** e.g. "$49/month for up to 5 users" — use wherever a page says "from". */
export const STARTING_PRICE_LABEL = `$${entry.monthly}/month for up to ${entry.users} users`;
export const STARTING_PRICE_SHORT = `$${entry.monthly}/mo`;

export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

export interface IncludedGroup {
  title: string;
  items: string[];
}

// Everything below is included in every team size.
export const INCLUDED_FEATURES: IncludedGroup[] = [
  {
    title: "Tasks & compliance",
    items: [
      "Task lists, Kanban boards, timelines & milestones",
      "Statutory due-date calendar for GST, TDS, Income Tax & ROC",
      "Recurring compliance tasks & practice workflow templates",
      "1-click client & task import from Excel / CSV",
    ],
  },
  {
    title: "Client portal",
    items: [
      "Branded client spaces with magic-link login",
      "Unlimited client guests at no extra cost",
      "PBC document request checklists & secure uploads",
      "Deliverable sign-offs & client portal messaging",
    ],
  },
  {
    title: "Team & review",
    items: [
      "4-eye partner review gates (maker-checker)",
      "Partner, Manager, Associate & Article Assistant roles",
      "Workload Cockpit with capacity meters & rebalancing",
      "Live effort tracking against fees",
    ],
  },
  {
    title: "AI, reporting & security",
    items: [
      "AI project plans, status reports & risk detection",
      "Practice-level dashboards & firm reporting",
      "100 GB AES-256 encrypted document vault",
      "Full activity history & priority support",
    ],
  },
];

export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: "How does team-size pricing work?",
    a: `You pick the plan that covers the number of people in your firm who use Pyngyn: up to 5 users for $49/month, 10 for $99, 15 for $149, 20 for $199, 50 for $499 or 100 for $999. Every plan includes every feature; only the number of users changes. Firms with more than ${ENTERPRISE_FROM_USERS} users can talk to us about a custom plan.`,
  },
  {
    q: "Who counts as a user?",
    a: "A user is anyone at your firm with a Pyngyn login: partners, managers, associates and article assistants. Your clients are not users. Client portal guests are unlimited and free on every plan.",
  },
  {
    q: "What happens when my team grows past my plan?",
    a: "Move up to the next team size from your billing settings at any time. Upgrades take effect immediately and are prorated for the rest of your billing period, so you only pay the difference.",
  },
  {
    q: "Do my clients have to pay anything to access their Client Portal?",
    a: "No, never. All client portal guest accounts are free and unlimited on every plan. Your clients receive secure magic links, view their deliverables, approve drafts, and upload requested documents at no cost to them or your firm.",
  },
  {
    q: "How does the 7-day free trial work?",
    a: "You get full access to Pyngyn ClientSpace for 7 days with no credit card required. You can invite your team, add real client portfolios, import spreadsheets, and test practice workflows before making any commitment.",
  },
  {
    q: "Can we switch between monthly and annual billing?",
    a: `Yes. You can switch between monthly and annual billing at any time from your practice settings. Annual billing saves ${ANNUAL_DISCOUNT_PCT}%: for example, the 5-user plan is $39/month billed yearly instead of $49/month.`,
  },
  {
    q: "Are prices in US dollars?",
    a: "Yes. All plans are priced in US dollars for every country. Applicable taxes, such as GST for Indian firms, are added at checkout.",
  },
  {
    q: "How do you protect client financial data and working papers?",
    a: "All client records and audit files are encrypted with 256-bit AES at rest and TLS 1.3 in transit. Your data is isolated per firm, and confidential client financial information is never used to train public AI models.",
  },
  {
    q: "How do cancellations, prorated billing, and refunds work?",
    a: "You can cancel your subscription at any time directly from your account billing settings. Cancellation stops future automatic renewals while your practice retains full access through the end of your current paid billing period. Upgrades to a larger team size are prorated for the remaining days of your billing cycle. Payments for the ongoing billing period are non-refundable; see the Refund & Subscription Cancellation Policy.",
  },
];
