import type { ReactNode } from "react";

export type Integration = {
  name: string;
  categories: string[];
  description: string;
  logo: ReactNode;
  popular?: boolean;
};

export const INTEGRATION_CATEGORIES = [
  "All",
  "Communication",
  "Files",
  "Calendar",
  "Accounting & Billing",
  "Productivity",
  "CRM & Sales",
  "Analytics",
  "Automation",
] as const;

// Brand-colored inline logos (hand-built; swap for official SVGs when available).
const L = {
  gmail: (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285f4" d="M21.4 19h-2.9V9.9l-6.5 4.9-6.5-4.9V19H2.6c-.6 0-1-.5-1-1V6c0-.7.8-1.1 1.4-.7l9 6.8 9-6.8c.6-.4 1.4 0 1.4.7v12c0 .5-.4 1-1 1z" />
      <path fill="#34a853" d="M1.6 18V6.6L5.5 9.5V19H2.6c-.6 0-1-.4-1-1z" />
      <path fill="#fbbc04" d="M22.4 18c0 .6-.4 1-1 1h-2.9V9.5l3.9-2.9z" />
      <path fill="#ea4335" d="M1.6 6c0-.7.8-1.1 1.4-.7l9 6.8 9-6.8c.6-.4 1.4 0 1.4.7l-1.4 1L12 14.8 2.6 6.7z" />
    </svg>
  ),
  slack: (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#36c5f0" d="M6.8 14.7a2 2 0 11-2-2h2v2zm1 0a2 2 0 014 0v5a2 2 0 11-4 0v-5z" />
      <path fill="#2eb67d" d="M9.8 6.8a2 2 0 11-2-2 2 2 0 012 2zm0 1a2 2 0 010 4h-5a2 2 0 110-4h5z" />
      <path fill="#ecb22e" d="M17.2 9.8a2 2 0 112-2v2h-2zm-1 0a2 2 0 01-4 0v-5a2 2 0 114 0v5z" />
      <path fill="#e01e5a" d="M14.2 17.2a2 2 0 112 2 2 2 0 01-2-2zm0-1a2 2 0 010-4h5a2 2 0 110 4h-5z" />
    </svg>
  ),
  github: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
    </svg>
  ),
  gcal: (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="10" width="32" height="30" rx="3" fill="#fff" stroke="#4285f4" strokeWidth="3" />
      <rect x="8" y="10" width="32" height="8" rx="3" fill="#4285f4" />
      <text x="24" y="34" textAnchor="middle" fill="#4285f4" fontSize="14" fontWeight="700" fontFamily="Arial">31</text>
    </svg>
  ),
  linear: (
    <svg width="24" height="24" viewBox="0 0 100 100" aria-hidden="true">
      <path fill="#5e6ad2" d="M3 56a47 47 0 0041 41L3 56zM3 44l53 53a48 48 0 0012-3L6 32a48 48 0 00-3 12zm6-22l69 69a48 48 0 008-8L17 14a48 48 0 00-8 8zm17-13l60 60A47 47 0 0026 9z" />
    </svg>
  ),
  n8n: (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 12h3M14 8.5l3 2.2M14 15.5l3-2.2" stroke="#ea4b71" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="5" cy="12" r="2.4" fill="#ea4b71" />
      <circle cx="12" cy="7" r="2.4" fill="#ea4b71" />
      <circle cx="12" cy="17" r="2.4" fill="#ea4b71" />
      <circle cx="19" cy="12" r="2.4" fill="#ea4b71" />
    </svg>
  ),
  // generic category icons (neutral)
  generic: (stroke: string, d: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const ACC = "#4f46e5";
const GREY = "#6b7280";

export const INTEGRATIONS: Integration[] = [
  { name: "Slack", categories: ["Communication"], popular: true, description: "Turn requests and action items from Slack into trackable tasks, and push status back.", logo: L.slack },
  { name: "Gmail", categories: ["Communication"], popular: true, description: "Turn emails into tasks without leaving your inbox, and keep status in sync.", logo: L.gmail },
  { name: "QuickBooks", categories: ["Accounting & Billing"], popular: true, description: "Sync clients, invoices, and time entries so billable work flows into your books, and invoice status appears in the client's Clientspace automatically.", logo: L.generic("#2ca01c", "M12 2a10 10 0 100 20 10 10 0 000-20zm1 4v2.2a3.8 3.8 0 010 7.4V18h-2v-2.2a3.8 3.8 0 010-7.4V6z") },
  { name: "Zoho Books", categories: ["Accounting & Billing"], description: "Sync clients, invoices, and payments with Zoho Books so billable work stays reconciled, and invoice status appears in the client's Clientspace automatically.", logo: L.generic("#e42527", "M7 3h7l4 4v14H7zM14 3v4h4M9 11h6M9 15h4") },
  { name: "Computax", categories: ["Accounting & Billing"], description: "Keep return filings and computation status tied to the underlying engagement, so your team and the client both see where a filing stands.", logo: L.generic("#0b5cab", "M7 3h7l4 4v14H7zM14 3v4h4M9 15l2 2 4-5") },
  { name: "Google Calendar", categories: ["Calendar"], popular: true, description: "Sync deadlines and client milestones so timelines live where your firm plans the day, and upcoming sessions appear automatically in the client's Clientspace.", logo: L.gcal },
  { name: "Xero", categories: ["Accounting & Billing"], popular: true, description: "Push approved time and expenses to Xero and keep invoicing in sync with delivered work, visible to the client in Clientspace as soon as it's approved.", logo: L.generic("#13b5ea", "M12 2a10 10 0 100 20 10 10 0 000-20zM8 9l8 6M16 9l-8 6") },
  { name: "Microsoft Teams", categories: ["Communication"], description: "Bring conversations into actionable items and post status to your channels.", logo: L.generic(ACC, "M4 5h16v10H8l-4 4V5z") },
  { name: "Outlook", categories: ["Communication", "Calendar"], description: "Turn emails into work and sync meetings and deadlines to your plan.", logo: L.generic(ACC, "M3 6h18v12H3V6zm0 1l9 6 9-6") },
  { name: "Google Drive", categories: ["Files"], description: "Attach Drive files to tasks and keep work and docs connected.", logo: L.generic(GREY, "M8 4h8l4 7-4 7H8l-4-7z") },
  { name: "Dropbox", categories: ["Files"], description: "Attach Dropbox files to tasks and automate uploads with rules.", logo: L.generic(GREY, "M6 4l6 4-6 4-6-4zM18 4l6 4-6 4-6-4M6 12l6 4-6 4-6-4M18 12l6 4-6 4-6-4") },
  { name: "DocuSign", categories: ["Files"], description: "Send engagement letters and approvals for e-signature. Status tracks against the matter in Workspace and updates the client's Clientspace the moment it's signed.", logo: L.generic("#d4b106", "M7 3h7l4 4v14H7zM14 3v4h4M9 14c2-3 4 3 6 0") },
  { name: "Zoom", categories: ["Communication"], description: "Make meetings actionable with tasks and searchable transcripts.", logo: L.generic(ACC, "M4 7h11v10H4zM15 10l5-3v10l-5-3z") },
  { name: "Figma", categories: ["Productivity"], description: "Share design work with live Figma embeds inside your tasks.", logo: L.generic(GREY, "M12 2a3 3 0 000 6 3 3 0 100 6 3 3 0 100 6M12 2a3 3 0 010 6M12 8a3 3 0 110 6") },
  { name: "Salesforce", categories: ["CRM & Sales"], description: "Streamline collaboration across the sales cycle and sync key records.", logo: L.generic(ACC, "M7 14a4 4 0 01.5-8 5 5 0 019.3-1A4 4 0 1118 17H8a3 3 0 01-1-3z") },
  { name: "HubSpot", categories: ["CRM & Sales"], description: "View deals and campaign info in tasks and automate updates.", logo: L.generic(ACC, "M12 7v4m0 0a3 3 0 103 3M12 11a3 3 0 11-3 3M12 3v2M12 5a2 2 0 100 4 2 2 0 000-4z") },
  { name: "Stripe", categories: ["Accounting & Billing"], description: "Bill clients and collect retainer and invoice payments, with status synced back to the engagement.", logo: L.generic("#635bff", "M5 8h14M5 12h14M5 16h9") },
  { name: "Zapier", categories: ["Automation"], description: "Connect PYNGYN to thousands of apps and automate repetitive work.", logo: L.generic(ACC, "M12 3v18M3 12h18M6 6l12 12M18 6L6 18") },
  { name: "n8n", categories: ["Automation"], popular: true, description: "Self-host or cloud, wire PYNGYN into 400+ apps with branching workflows, custom code, and webhooks. Built for teams that want to own their automations.", logo: L.n8n },
  { name: "Make", categories: ["Automation"], description: "Build visual automations between PYNGYN and the tools you use.", logo: L.generic(GREY, "M5 12l3-6 4 12 4-12 3 6") },
  { name: "Google Sheets", categories: ["Analytics", "Productivity"], description: "Sync project data to Sheets and build custom reports.", logo: L.generic("#0f9d58", "M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h6") },
  { name: "Power BI", categories: ["Analytics"], description: "Bring your team's project data to life with live dashboards.", logo: L.generic("#f2b900", "M5 20V10M10 20V4M15 20v-8M20 20V7") },
  { name: "Tableau", categories: ["Analytics"], description: "Explore and share real-time analytics from your project data.", logo: L.generic(ACC, "M12 3v18M3 12h18M7 7v10M17 7v10") },
  { name: "Webhooks", categories: ["Automation"], description: "Trigger your own services on any event with outgoing webhooks.", logo: L.generic(GREY, "M9 12a3 3 0 116 0M12 9V3M5 19l4-7M19 19l-4-7") },
  { name: "Google Docs", categories: ["Files", "Productivity"], description: "Add context from Docs right into the flow of your work.", logo: L.generic("#4285f4", "M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h4") },
  { name: "Calendly", categories: ["Calendar"], description: "Turn booked meetings into scheduled work automatically.", logo: L.generic(ACC, "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4") },
];
