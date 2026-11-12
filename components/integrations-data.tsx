import type { ReactNode } from "react";

export type Integration = {
  name: string;
  categories: string[];
  description: string;
  /** Short line for the home page's Integrations section. */
  tagline: string;
  logo: ReactNode;
  popular?: boolean;
};

export const INTEGRATION_CATEGORIES = [
  "All",
  "Email",
  "Calendar",
  "Files",
  "Payments",
  "Accounting",
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
  gcal: (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="10" width="32" height="30" rx="3" fill="#fff" stroke="#4285f4" strokeWidth="3" />
      <rect x="8" y="10" width="32" height="8" rx="3" fill="#4285f4" />
      <text x="24" y="34" textAnchor="middle" fill="#4285f4" fontSize="14" fontWeight="700" fontFamily="Arial">31</text>
    </svg>
  ),
  gdrive: (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#0f9d58" d="M8.2 3h7.6l-6 10.4H2.2z" />
      <path fill="#fbbc04" d="M15.8 3l6 10.4-3.8 6.6-6-10.4z" />
      <path fill="#4285f4" d="M2.2 13.4h19.6L18 20H6z" />
    </svg>
  ),
  razorpay: (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#3395ff" d="M9.6 7.4L8.4 11.6l6.9-4.5-4.5 16.4h3.2L19.6 1z" />
      <path fill="#072654" d="M4.1 16.3L2.4 22.4h7.2L12.7 11z" />
    </svg>
  ),
  // generic category icons (neutral)
  generic: (stroke: string, d: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};


// Only the integrations that are live today. Add more here as they ship.
export const INTEGRATIONS: Integration[] = [
  { name: "Gmail", categories: ["Email"], popular: true, tagline: "Client emails & task conversion", description: "Turn client emails into tasks without leaving your inbox, and keep status in sync.", logo: L.gmail },
  { name: "Google Calendar", categories: ["Calendar"], popular: true, tagline: "Deadlines & practice meetings", description: "Sync deadlines and client milestones so timelines live where your firm plans the day, and upcoming sessions appear automatically in the client's Clientspace.", logo: L.gcal },
  { name: "Google Drive", categories: ["Files"], popular: true, tagline: "Client folders & document storage", description: "Keep client folders in Drive and attach files to tasks, so work and documents stay connected.", logo: L.gdrive },
  { name: "Razorpay", categories: ["Payments"], popular: true, tagline: "Fee collection & payment status", description: "Collect fees and retainers through Razorpay, with payment status synced back to the engagement and shown in the client's Clientspace.", logo: L.razorpay },
  { name: "Zoho Books", categories: ["Accounting"], popular: true, tagline: "Invoices & payment reconciliation", description: "Sync clients, invoices, and payments with Zoho Books so billable work stays reconciled, and invoice status appears in the client's Clientspace automatically.", logo: L.generic("#e42527", "M7 3h7l4 4v14H7zM14 3v4h4M9 11h6M9 15h4") },
  { name: "Tally Prime", categories: ["Accounting"], popular: true, tagline: "Ledgers, trial balance & vouchers", description: "Secure connectivity to sync accounting ledgers, trial balance, and vouchers.", logo: L.generic("#1d4ed8", "M4 6h16v12H4zM8 6v12M16 6v12") },
];
