import {
  BENEFITS_URL, PRICING_URL, CUSTOMERS_URL, BLOG_URL, DEMO_URL,
  INTEGRATIONS_URL, CHANGELOG_URL, DOCS_URL, GUIDES_URL, SUPPORT_URL, STATUS_URL, KB_URL,
  ANNOUNCEMENTS_URL, ROADMAP_URL, REFER_URL,
  COMPARE_URL, COMPETITORS,
  TOOLS_URL, PLAN_GEN_URL, ROI_URL, STATUS_REPORT_URL, UTILIZATION_URL, COST_ESTIMATOR_URL, ANY_UPDATE_URL,
  BRANDED_PORTAL_URL, SECURE_DOCUMENTS_URL, APPROVALS_URL, RISK_DETECTION_URL, REPORTING_URL, ADMIN_SECURITY_URL,
} from "./config";

export type MegaItem = {
  label: string;
  href: string;
  icon: string;   // svg path data, viewBox 0 0 24 24
  color: string;  // colorful icon (ClickUp style)
};

export type MegaColumn = { heading: string; items: MegaItem[]; seeAll?: { label: string; href: string } };

export type MegaMenu = {
  key: string;
  label: string;
  columns: MegaColumn[];
  // optional featured cards on the right (like ClickUp's Solutions menu)
  featured?: { title: string; body: string; href: string; color: string }[];
};

const I = {
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
  flow: "M5 6h6M5 12h14M5 18h9M17 9l3 3-3 3",
  plug: "M9 7V3M15 7V3M7 7h10v4a5 5 0 01-10 0zM12 16v5",
  tag: "M3 3h7l11 11-7 7L3 10z M7 7h.01",
  board: "M4 5h16v14H4zM4 10h16M9 5v14",
  users: "M16 18v-2a4 4 0 00-8 0v2M12 11a3 3 0 100-6 3 3 0 000 6M21 18v-1.5a3.5 3.5 0 00-3-3.4",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM9 7h7M9 11h7",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h4",
  help: "M12 18h.01M9.1 9a3 3 0 015.8 1c0 2-3 2.5-3 4M12 21a9 9 0 100-18 9 9 0 000 18z",
  pulse: "M3 12h4l2-6 4 12 2-6h6",
  swap: "M7 4L3 8l4 4M3 8h12M17 20l4-4-4-4M21 16H9",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  target: "M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0M12 3a9 9 0 100 18 9 9 0 000-18z",
  chart: "M5 20V10M10 20V4M15 20v-8M20 20V7",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  clock: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
};

const C = {
  indigo: "#4f46e5", pink: "#ec4899", green: "#0b7a4b", orange: "#f97316",
  blue: "#2563eb", purple: "#9333ea", teal: "#0d9488", red: "#dc2626",
};

export const MEGA_MENUS: MegaMenu[] = [
  {
    key: "product",
    label: "Product",
    columns: [
      {
        heading: "Products",
        items: [
          { label: "Clientspace", href: "/clientspace", icon: I.spark, color: C.indigo },
          { label: "Workspace", href: "/workspace", icon: I.board, color: C.blue },
          { label: "Benefits", href: BENEFITS_URL, icon: I.target, color: C.purple },
          { label: "Risk detection", href: RISK_DETECTION_URL, icon: I.pulse, color: C.red },
        ],
      },
      {
        heading: "Capabilities",
        items: [
          { label: "Branded client portal", href: BRANDED_PORTAL_URL, icon: I.users, color: C.indigo },
          { label: "Secure documents", href: SECURE_DOCUMENTS_URL, icon: I.shield, color: C.green },
          { label: "Approvals & sign-off", href: APPROVALS_URL, icon: I.flow, color: C.blue },
          { label: "Reporting", href: REPORTING_URL, icon: I.chart, color: C.teal },
        ],
      },
      {
        heading: "Connect",
        items: [
          { label: "Integrations", href: INTEGRATIONS_URL, icon: I.plug, color: C.purple },
          { label: "Docs", href: DOCS_URL, icon: I.doc, color: C.blue },
          { label: "Admin & security", href: ADMIN_SECURITY_URL, icon: I.shield, color: C.green },
          { label: "Changelog", href: CHANGELOG_URL, icon: I.clock, color: C.orange },
        ],
      },
      {
        heading: "More",
        items: [
          { label: "Pricing", href: PRICING_URL, icon: I.tag, color: C.green },
          { label: "Customers", href: CUSTOMERS_URL, icon: I.users, color: C.orange },
          { label: "Book a demo", href: DEMO_URL, icon: I.spark, color: C.indigo },
        ],
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    columns: [
      {
        heading: "By practice",
        items: [
          { label: "Lawyers", href: "/solutions/lawyers", icon: I.users, color: C.indigo },
          { label: "Accountants & CAs", href: "/solutions/accountants", icon: I.chart, color: C.teal },
           { label: "Marketing Consultants", href: "/solutions/consultants", icon: I.spark, color: C.pink },
        ],
      },
      {
        heading: "More firms",
        items: [
          { label: "Creative Services", href: "/solutions/creative-services", icon: I.board, color: C.purple },
          { label: "Architects", href: "/solutions/architects", icon: I.flow, color: C.orange },
          { label: "Consultancies", href: "/solutions/consultants", icon: I.users, color: C.blue },
        ],
      },
    ],
    featured: [
      { title: "Clientspace", body: "The branded client portal for your firm", href: "/clientspace", color: C.indigo },
      { title: "Book a demo", body: "See a client portal go live", href: DEMO_URL, color: C.purple },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        items: [
          { label: "Blog", href: BLOG_URL, icon: I.book, color: C.indigo },
          { label: "Guides", href: GUIDES_URL, icon: I.doc, color: C.blue },
          { label: "Docs", href: DOCS_URL, icon: I.doc, color: C.purple },
          { label: "Changelog", href: CHANGELOG_URL, icon: I.clock, color: C.orange },
        ],
      },
      {
        heading: "Product news",
        items: [
          { label: "Announcements", href: ANNOUNCEMENTS_URL, icon: I.spark, color: C.indigo },
          { label: "Roadmap", href: ROADMAP_URL, icon: I.target, color: C.purple },
        ],
      },
      {
        heading: "Free tools",
        items: [
          { label: "\"Any update?\" cost calculator", href: ANY_UPDATE_URL, icon: I.pulse, color: C.teal },
          { label: "AI project plan generator", href: PLAN_GEN_URL, icon: I.spark, color: C.pink },
          { label: "Status report generator", href: STATUS_REPORT_URL, icon: I.doc, color: C.blue },
          { label: "Cost of chaos ROI calculator", href: ROI_URL, icon: I.chart, color: C.indigo },
          { label: "Team utilization calculator", href: UTILIZATION_URL, icon: I.users, color: C.orange },
          { label: "Cost & margin estimator", href: COST_ESTIMATOR_URL, icon: I.tag, color: C.green },
          { label: "All tools", href: TOOLS_URL, icon: I.target, color: C.teal },
        ],
      },
      {
        heading: "Programs",
        items: [
          { label: "Refer & earn", href: REFER_URL, icon: I.spark, color: C.green },
        ],
      },
      {
        heading: "Support",
        items: [
          { label: "Knowledge base", href: KB_URL, icon: I.book, color: C.indigo },
          { label: "Help & support", href: SUPPORT_URL, icon: I.help, color: C.green },
          { label: "Status", href: STATUS_URL, icon: I.pulse, color: C.teal },
        ],
      },
    ],
    featured: [
      { title: "Free: AI plan generator", body: "Turn a brief into a project plan in seconds", href: PLAN_GEN_URL, color: C.pink },
      { title: "Talk to our team", body: "Questions? We'll help you get set up", href: DEMO_URL, color: C.indigo },
    ],
  },
  {
    key: "compare",
    label: "Compare",
    columns: [
      {
        heading: "PYNGYN vs",
        items: COMPETITORS.slice(0, 3).map((c) => ({
          label: `vs ${c.name}`, href: `${COMPARE_URL}/${c.slug}`, icon: I.swap, color: C.indigo,
        })),
        seeAll: { label: "All comparisons", href: COMPARE_URL },
      },
      {
        heading: "More tools",
        items: COMPETITORS.slice(3).map((c) => ({
          label: `vs ${c.name}`, href: `${COMPARE_URL}/${c.slug}`, icon: I.swap, color: C.purple,
        })),
      },
    ],
  },
];
