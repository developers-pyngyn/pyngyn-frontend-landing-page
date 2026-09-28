// Detailed per-competitor content used by the /compare/[slug] pages and the
// /compare landscape matrix.
//
// Positioning:
//   "Client Management for CA & Accounting Firms"
//   PYNGYN ClientSpace = Purpose-built practice operating system for Chartered Accountants,
//   tax professionals, and accounting firms in India & globally.

export type Cell = boolean | "limited" | "integration" | "partial";

export type CapabilityRow = {
  label: string;
  category?: string;
  detail?: string;
  pyngyn: Cell;
  // keyed by competitor slug
  competitor: Record<string, Cell>;
};

export type CompareDifference = {
  title: string;
  pyngyn: string;
  them: string;
};

export type CompareFaq = { q: string; a: string };

export type CompareContent = {
  slug: string;
  name: string;
  // Short positioning of the competitor (one line)
  tagline: string;
  // 1–2 sentence intro that frames the comparison
  intro: string;
  // TL;DR verdict shown near the top
  verdict: {
    pickPyngyn: string;
    pickThem: string;
  };
  // 4–5 detailed differences (the meat of the page)
  differences: CompareDifference[];
  // Honest "they're better for this" list
  bestFor: string[];
  // Pricing context, kept generic on purpose
  pricingNote: string;
  // 3–4 step migration outline
  migrationSteps: { title: string; body: string }[];
  // Quotable line a customer might say about switching
  switcherQuote?: { quote: string; attribution: string };
  // FAQs
  faqs: CompareFaq[];
};

export const COMPARE_LEGEND =
  "✓ Full native support · Limited Partial / basic capability · Integration Requires third-party app · — Not available";

export const COMPARE_FOOTNOTE =
  "Independent product feature evaluation based on publicly available documentation, practice user workflows, and platform specifications as of 2026.";

// Shared capability matrix across the 14 practice categories requested for CA & accounting firms:
// Client Management, Client Portal, Client Communication, Document Collection, Document Management,
// Task Management, Workload Management, Deadline Management, GST Workflows, Income Tax Workflows,
// Automations, Integrations, Team Collaboration, Client Onboarding.
export const CAPABILITY_ROWS: CapabilityRow[] = [
  {
    label: "Client Management",
    category: "Client Management",
    detail:
      "Structured client profiles, PAN/GSTIN identifiers, entity group structures (parent-subsidiary), compliance health indicators, and DSC registers.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "Client Portal",
    category: "Client Portal",
    detail:
      "Standalone branded web portal with friction-free magic link login, unlimited client guest accounts, deliverable downloads, and PBC checklists.",
    pyngyn: true,
    competitor: {
      karbon: "limited",
      taxdome: true,
      canopy: true,
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
  {
    label: "Client Communication",
    category: "Client Communication",
    detail:
      "WhatsApp Business automation, client messaging drawer, synchronized email intake, and template-based client notifications.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
  {
    label: "Document Collection",
    category: "Document Collection",
    detail:
      "Automated PBC document request chasing, mobile photo/file drops via WhatsApp or magic link, and status tracking (Requested → Uploaded → Verified).",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
  {
    label: "Document Management",
    category: "Document Management",
    detail:
      "Bank-grade 256-bit AES encrypted file vault, multi-tier engagement folders, audit working papers tree, and version history.",
    pyngyn: true,
    competitor: {
      karbon: "integration",
      taxdome: true,
      canopy: true,
      "zoho-practice": "limited",
      spreadsheets: "limited",
    },
  },
  {
    label: "Task Management",
    category: "Task Management",
    detail:
      "Accounting-specific task stages (Scoping → Vouching → Computation → 4-Eye Review → Filing), subtasks, and task inspector checklists.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "Workload Management",
    category: "Workload Management",
    detail:
      "Practice Workload Cockpit, live practitioner capacity meters, stage distribution donut charts, and 1-click team task rebalancing.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: "limited",
      canopy: "limited",
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
  {
    label: "Deadline Management",
    category: "Deadline Management",
    detail:
      "Statutory compliance radar tracking GSTR-1, GSTR-3B, Advance Tax, Form 3CD, TDS returns, and DSC token expiry countdowns.",
    pyngyn: true,
    competitor: {
      karbon: "limited",
      taxdome: "limited",
      canopy: "limited",
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "GST Workflows",
    category: "GST Workflows",
    detail:
      "GST client compliance tracking, return filing status monitoring (GSTR-1, GSTR-3B), and GSTR-2B ITC statement variance reconciliation views.",
    pyngyn: true,
    competitor: {
      karbon: false,
      taxdome: false,
      canopy: false,
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "Income Tax Workflows",
    category: "Income Tax Workflows",
    detail:
      "ITR due date tracking, Form 26AS/AIS reconciliation views, Form 3CD tax audit checklists, and ITD Section 143(1) intimation notices tracking.",
    pyngyn: true,
    competitor: {
      karbon: false,
      taxdome: "limited",
      canopy: "limited",
      "zoho-practice": "limited",
      spreadsheets: "limited",
    },
  },
  {
    label: "Automations",
    category: "Automations",
    detail:
      "Event-driven automation rules: auto-escalate overdue statutory dates, trigger WhatsApp follow-ups for pending bank statements, and notify partners.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: "limited",
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
  {
    label: "Integrations",
    category: "Integrations",
    detail:
      "Tally Prime & Tally.ERP 9 local XML bridge, Zoho Books ledger matching, WhatsApp Business API, Google Drive, OneDrive, and Google Calendar.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "Team Collaboration",
    category: "Team Collaboration",
    detail:
      "Mandatory 4-eye partner review gates, multi-assignee ownership (Partner, Manager, Article Assistant), internal work threads, and audit activity trails.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": true,
      spreadsheets: "limited",
    },
  },
  {
    label: "Client Onboarding",
    category: "Client Onboarding",
    detail:
      "1-click client master spreadsheet importer, KYC & engagement letter e-signatures, automated PBC welcome packet, and portal invitation.",
    pyngyn: true,
    competitor: {
      karbon: true,
      taxdome: true,
      canopy: true,
      "zoho-practice": "limited",
      spreadsheets: false,
    },
  },
];

export const COMPARE_CONTENT: Record<string, CompareContent> = {
  karbon: {
    slug: "karbon",
    name: "Karbon",
    tagline: "Global accounting practice management & collaborative email triage",
    intro:
      "Karbon is an industry-leading global practice management platform acclaimed for its deep email triage and collaborative work templates. While Karbon excels for US, UK, and Australian accounting firms running on QuickBooks and Xero, Pyngyn ClientSpace is built specifically for CA and tax practices needing native GST & Income Tax workflows, Tally Prime integration, automated WhatsApp client intake, and accessible team pricing.",
    verdict: {
      pickPyngyn:
        "Choose Pyngyn ClientSpace if your firm manages Indian tax and statutory compliance (GST, ITR, TDS), connects with Tally Prime, requires automated WhatsApp document intake, and needs cost-effective seats for article assistants.",
      pickThem:
        "Choose Karbon if your practice is primarily located in the US, UK, or Australia, standardizes on QuickBooks Online or Xero, and relies primarily on deep email triage workflows.",
    },
    differences: [
      {
        title: "Indian Statutory Deadlines vs Generic Task Dates",
        pyngyn:
          "Includes pre-configured statutory compliance radars for GSTR-1, GSTR-3B, Advance Tax, Form 3CD, TDS, and DSC token expiry tracking.",
        them:
          "Relies on generic repeating work templates. Indian statutory due dates and compliance calendars must be configured and maintained manually.",
      },
      {
        title: "Accounting Software Ecosystem (Tally vs Xero/QBO)",
        pyngyn:
          "Provides a local XML bridge for Tally Prime and Tally.ERP 9 to sync client masters, daybook ledgers, and voucher batches, plus Zoho Books integration.",
        them:
          "Integrates primarily with QuickBooks Online and Xero. Does not provide native connectivity to Tally Prime or desktop accounting software.",
      },
      {
        title: "Client Intake via WhatsApp Business vs Email Triage",
        pyngyn:
          "Combines synchronized email intake with automated WhatsApp Business document requests and reminders—tailored for SME clients who rarely read email.",
        them:
          "Centers heavily on email inbox triage and client tasks delivered via email links. Does not offer native WhatsApp messaging or reminders.",
      },
      {
        title: "Seat Economics for CA Firm Hierarchies",
        pyngyn:
          "Priced from ₹499 to ₹799/user/month with unlimited client guest portals, making full firm deployment viable for partners, managers, and article assistants.",
        them:
          "Priced between $59 and $89+ USD per user per month (approx. ₹5,000–₹7,500/seat/mo), which can become cost-prohibitive for large teams of trainees.",
      },
    ],
    bestFor: [
      "Firms located in North America, the UK, Australia, or New Zealand",
      "Practices standardized entirely on QuickBooks Online or Xero",
      "Teams that process heavy volumes of incoming client emails directly in Karbon Triage",
    ],
    pricingNote:
      "Karbon plans range from approximately $59 to $89+ per user/month billed annually. Pyngyn ClientSpace plans start at ₹499/user/month with monthly and annual options and no per-client charges.",
    migrationSteps: [
      {
        title: "Export Client Database",
        body: "Export client contacts, organizations, and engagement types from Karbon into CSV format.",
      },
      {
        title: "Map Indian Tax Identifiers",
        body: "Use Pyngyn's 1-click spreadsheet importer to map PAN, GSTIN, entity hierarchy, and sector classifications.",
      },
      {
        title: "Sync Tally Prime Masters",
        body: "Connect the Pyngyn local XML bridge to reconcile ledger accounts and voucher summaries automatically.",
      },
      {
        title: "Activate Statutory Compliance Radars",
        body: "Enable GSTR-1, GSTR-3B, and Advance Tax radars to begin automated tracking and client portal document chasing.",
      },
    ],
    switcherQuote: {
      quote:
        "Karbon was great for email, but our team was still tracking GST and ITR deadlines on side Excel sheets because Karbon had no Indian tax intelligence. Pyngyn brought our Tally data, WhatsApp intake, and statutory deadlines into one unified cockpit.",
      attribution: "Managing Partner, 14-Member CA Practice, Mumbai",
    },
    faqs: [
      {
        q: "Can Pyngyn replace Karbon's work templates?",
        a: "Yes. Pyngyn ClientSpace provides pre-built practice workflows for Statutory Audits, Tax Audits (Form 3CD), GST Compliance, and Monthly Bookkeeping, complete with 4-eye partner sign-off gates.",
      },
      {
        q: "Does Pyngyn offer email integration like Karbon?",
        a: "Yes. Pyngyn supports email intake and client communication synchronization, while adding native WhatsApp Business automation for document collection.",
      },
      {
        q: "How does Pyngyn handle Tally data?",
        a: "Pyngyn connects securely via a local bridge to read Tally Prime and Tally.ERP 9 company data, allowing ledger reconciliation and voucher scrutiny without manual exports.",
      },
    ],
  },

  taxdome: {
    slug: "taxdome",
    name: "TaxDome",
    tagline: "All-in-one practice management & client portal for US/UK tax professionals",
    intro:
      "TaxDome is a well-established practice management suite offering client portals, workflow pipelines, and e-signatures for North American and European tax preparers. Pyngyn ClientSpace delivers a tailored alternative for CA firms and tax professionals that require Tally Prime integration, Indian GST & Income Tax tracking, automated WhatsApp document collection, and flexible month-to-month pricing.",
    verdict: {
      pickPyngyn:
        "Choose Pyngyn ClientSpace if your firm prepares Indian GST and Income Tax returns, reconciles Tally Prime ledgers, and collects documents from clients over WhatsApp.",
      pickThem:
        "Choose TaxDome if your firm prepares US 1040/1120 tax returns, needs integrated credit card / ACH billing in USD, and serves predominantly Western clients.",
    },
    differences: [
      {
        title: "Statutory Compliance: Indian GST/ITD vs US IRS Pipelines",
        pyngyn:
          "Natively tracks GSTR-1, GSTR-3B, GSTR-2B ITC variance, Form 26AS/AIS reconciliation, Form 3CD tax audits, and CPC Section 143(1) intimation notices.",
        them:
          "Tailored for US tax seasons (1040, 1120, W-2, 1099) and UK Self Assessment. Does not support Indian statutory compliance frameworks.",
      },
      {
        title: "Tally Prime Integration vs US Accounting Connectors",
        pyngyn:
          "Integrates directly with Tally Prime, Tally.ERP 9, and Zoho Books with automated ledger matching and daybook voucher filtering.",
        them:
          "Integrates with QuickBooks Online and Xero. Has no native integration or bridge for Tally Prime.",
      },
      {
        title: "Client Portal & Friction-Free WhatsApp Intake",
        pyngyn:
          "Offers zero-friction magic links and automated WhatsApp Business document drops so clients can upload bank statements and bills directly from their phones.",
        them:
          "Requires clients to download the TaxDome mobile app or log into a portal with username and password, which can introduce friction for Indian SME clients.",
      },
      {
        title: "Contract & Billing Flexibility",
        pyngyn:
          "Offers both monthly and discounted annual billing with no long-term lock-in and unlimited free client guest access.",
        them:
          "Requires multi-year or annual upfront contract commitments per user seat ($50–$66+/user/month billed annually).",
      },
    ],
    bestFor: [
      "Tax preparers and CPAs handling US IRS filings and international clients",
      "Firms requiring integrated credit card payment processing (Stripe, CPACharge)",
      "Practices with Western clients comfortable with password-protected portal apps",
    ],
    pricingNote:
      "TaxDome requires annual upfront payment starting around $50–$66 per user/month. Pyngyn ClientSpace starts at ₹499/user/month with transparent monthly and annual plans.",
    migrationSteps: [
      {
        title: "Export Client Records & Tags",
        body: "Download your client database and contact lists from TaxDome into a spreadsheet.",
      },
      {
        title: "Import Entities into Pyngyn",
        body: "Map company PANs, GSTINs, and contact details with Pyngyn's guided import wizard.",
      },
      {
        title: "Establish Workload & Review Pipelines",
        body: "Configure 4-eye review gates (Associate → Manager → Partner) and assign practice roles.",
      },
      {
        title: "Invite Clients via Magic Link",
        body: "Distribute branded portal links and WhatsApp document requests to clients without password setup.",
      },
    ],
    switcherQuote: {
      quote:
        "TaxDome was powerful for US clients, but for our Indian business practice, clients refused to log in with passwords and we had no way to track GSTR-3B filings or connect Tally. Pyngyn solved this from day one.",
      attribution: "Senior Partner, Audit & Tax Advisory, Bengaluru",
    },
    faqs: [
      {
        q: "Can clients upload documents without logging in with a password?",
        a: "Yes. Pyngyn ClientSpace provides secure magic links and WhatsApp upload channels, allowing verified clients to upload documents directly from any browser or mobile phone.",
      },
      {
        q: "Does Pyngyn support e-signatures?",
        a: "Yes. Pyngyn includes digital signatures for engagement letters, representation letters, and deliverable sign-offs.",
      },
      {
        q: "Can we track statutory tax notices in Pyngyn?",
        a: "Yes. Pyngyn features a dedicated statutory notice tracking register for DIN numbers, Section 143(1) intimations, demand amounts, and response due dates.",
      },
    ],
  },

  canopy: {
    slug: "canopy",
    name: "Canopy",
    tagline: "Modular practice management & tax resolution software",
    intro:
      "Canopy is a modular cloud practice management system known for its IRS tax resolution, client CRM, and document management for American CPAs. Pyngyn ClientSpace offers an integrated, all-in-one practice operating system for CA firms with unified compliance radars, Tally sync, and automated client chasing without costly per-module add-ons.",
    verdict: {
      pickPyngyn:
        "Choose Pyngyn ClientSpace for an integrated practice platform with Indian statutory due dates, Tally Prime sync, WhatsApp document intake, and built-in 4-eye review gates.",
      pickThem:
        "Choose Canopy if your practice specializes in US IRS tax resolution, transcript analysis, and requires an a-la-carte modular software purchasing model.",
    },
    differences: [
      {
        title: "All-in-One vs Modular Add-On Pricing",
        pyngyn:
          "Includes Client Portals, Compliance Radars, Workload Cockpit, Review Gates, and Document Vault in one transparent tier.",
        them:
          "Charges separately for individual modules (Document Management, Workflow, Time & Billing, and Tax Resolution), significantly raising the total software cost.",
      },
      {
        title: "Statutory Tax Notice Tracking (CPC vs IRS)",
        pyngyn:
          "Includes structured tracking for Indian Income Tax Department notices (Section 143(1), 148, demand tracking) with DIN verification and response countdowns.",
        them:
          "Specializes in US IRS transcripts, Offer in Compromise, and federal tax resolution forms. Does not support Indian ITD or GST notice handling.",
      },
      {
        title: "Tally Prime & Indian Accounting Sync",
        pyngyn:
          "Native local XML connector bridges client ledgers, vouchers, and trial balances from Tally Prime and Tally.ERP 9 into engagement files.",
        them:
          "Integrates with QuickBooks Online and desktop via third-party bridges, but offers no support for Tally Prime or Indian accounting software.",
      },
      {
        title: "CA Hierarchy & 4-Eye Review Controls",
        pyngyn:
          "Designed around the traditional CA firm structure (Partner → Manager → Senior Associate → Article Assistant) with enforced review sign-offs before client delivery.",
        them:
          "Provides general task assignment without built-in professional quality assurance gates or trainee workload balancing.",
      },
    ],
    bestFor: [
      "CPA practices focused heavily on IRS tax representation and collections",
      "Firms that only need one specific module (such as standalone document storage)",
      "Practices with dedicated software budgets for multi-module procurement",
    ],
    pricingNote:
      "Canopy charges modular pricing per user/month for each feature (e.g. $40/mo Document Management + $35/mo Workflow + $25/mo Time & Billing). Pyngyn ClientSpace bundles all core capabilities starting at ₹499/user/month.",
    migrationSteps: [
      {
        title: "Export Client Folders & Contacts",
        body: "Export your client directories and master contacts from Canopy's document manager.",
      },
      {
        title: "Import into Pyngyn Vault",
        body: "Upload documents into Pyngyn's 256-bit encrypted client vaults with automated FY/AY folder partitioning.",
      },
      {
        title: "Set Up Statutory Calendars",
        body: "Activate pre-configured GST, TDS, Advance Tax, and Tax Audit due date tracking.",
      },
      {
        title: "Connect Practice Channels",
        body: "Link your firm's email and WhatsApp Business channels for automated client follow-ups.",
      },
    ],
    switcherQuote: {
      quote:
        "With Canopy, we were paying separate monthly invoices for document storage, task workflows, and billing. Pyngyn gave our CA firm everything in one platform, plus native GST tracking and Tally sync that Canopy simply couldn't provide.",
      attribution: "Founding Partner, Multi-Partner Tax Practice, Delhi NCR",
    },
    faqs: [
      {
        q: "Does Pyngyn charge separately for document management?",
        a: "No. Pyngyn includes bank-grade encrypted cloud document vaults in all plans with generous storage limits and zero modular surcharges.",
      },
      {
        q: "Can we track partner review sign-offs?",
        a: "Yes. Pyngyn's 4-eye review gates require designated reviewers or partners to review and digitally sign off on working papers before final client filing.",
      },
      {
        q: "Is there a limit on client document uploads?",
        a: "Client uploads are constrained only by your overall firm storage plan, with no per-file or per-client bandwidth penalties.",
      },
    ],
  },

  "zoho-practice": {
    slug: "zoho-practice",
    name: "Zoho Practice",
    tagline: "Practice management software for chartered accountants in the Zoho ecosystem",
    intro:
      "Zoho Practice is built for Indian Chartered Accountants, offering task tracking and deep integration with Zoho Books. Pyngyn ClientSpace is an independent, practice-first operating system that offers superior workload capacity rebalancing, standalone client portals, automated WhatsApp document chasing, and seamless support for both Tally Prime and multi-accounting stacks.",
    verdict: {
      pickPyngyn:
        "Choose Pyngyn ClientSpace if your clients use Tally Prime, you need automated WhatsApp document collection, and you want advanced workload capacity rebalancing with 4-eye review gates.",
      pickThem:
        "Choose Zoho Practice if your firm and all your clients are standardized entirely on Zoho Books, Zoho Sign, and the broader Zoho One business ecosystem.",
    },
    differences: [
      {
        title: "Accounting Ecosystem Independence (Tally Prime vs Zoho Books)",
        pyngyn:
          "Supports both Tally Prime / Tally.ERP 9 and Zoho Books, accommodating firms whose clients use diverse accounting software.",
        them:
          "Primarily designed to lock your firm into the Zoho ecosystem. Support for Tally is limited and lacks native continuous sync.",
      },
      {
        title: "Workload Cockpit & Capacity Rebalancing",
        pyngyn:
          "Features a live Workload Cockpit with practitioner capacity meters, bottleneck indicators, and 1-click automatic task rebalancing.",
        them:
          "Offers standard task lists and time tracking, but lacks dynamic firm-wide capacity meters and automatic workload redistribution.",
      },
      {
        title: "Client Portal & WhatsApp Automation",
        pyngyn:
          "Provides standalone, friction-free client portals with magic link login and automated WhatsApp Business document reminders for pending bank statements.",
        them:
          "Relies on the standard Zoho Books client portal and email notifications, with limited automated WhatsApp integration.",
      },
      {
        title: "Enforced 4-Eye Review Gates",
        pyngyn:
          "Built-in mandatory review gates prevent junior staff or article assistants from closing engagements or sharing drafts without senior partner sign-off.",
        them:
          "Tasks can typically be marked complete without enforced multi-tier review checkpoints.",
      },
    ],
    bestFor: [
      "Firms whose client base is exclusively hosted on Zoho Books",
      "Practices already invested in Zoho One, Zoho CRM, and Zoho Desk",
      "Accounting firms seeking single-vendor software billing under Zoho",
    ],
    pricingNote:
      "Zoho Practice offers low baseline software costs but requires your clients and staff to adopt Zoho Books and Zoho One licenses. Pyngyn ClientSpace provides transparent per-user pricing with no required client software licenses.",
    migrationSteps: [
      {
        title: "Export Client Master Data",
        body: "Export your client records and contacts from Zoho Practice into Excel or CSV.",
      },
      {
        title: "Import to Pyngyn ClientSpace",
        body: "Use the Pyngyn importer to map client entities, GSTINs, and sector categories.",
      },
      {
        title: "Connect Tally Prime & Zoho Books",
        body: "Link your local Tally instances and existing Zoho Books accounts to centralize ledgers in Pyngyn.",
      },
      {
        title: "Deploy WhatsApp Document Chasing",
        body: "Set up automated reminders to collect bank statements, invoices, and vouchers from clients.",
      },
    ],
    switcherQuote: {
      quote:
        "Zoho Practice worked fine as long as our clients were on Zoho Books. But over 75% of our clients run on Tally Prime. Pyngyn allowed us to manage all our clients regardless of their accounting software, and the Workload Cockpit completely eliminated tax season burnouts.",
      attribution: "Partner, 22-Member Accounting & Assurance Firm, Ahmedabad",
    },
    faqs: [
      {
        q: "Can we still use Zoho Books with Pyngyn?",
        a: "Yes. Pyngyn ClientSpace integrates with Zoho Books so you can sync ledgers while managing tasks, documents, and compliance in Pyngyn.",
      },
      {
        q: "How does Pyngyn handle Tally data differently?",
        a: "Pyngyn features a local XML bridge that communicates directly with Tally Prime on your office network, synchronizing ledgers and vouchers securely without third-party cloud plugins.",
      },
      {
        q: "Does Pyngyn offer article assistant tracking?",
        a: "Yes. Pyngyn's Workload Cockpit specifically tracks capacity, active hours, and assigned filings for article assistants and working associates.",
      },
    ],
  },

  spreadsheets: {
    slug: "spreadsheets",
    name: "Spreadsheets & Email",
    tagline: "Excel, Google Sheets, Gmail & WhatsApp personal chats",
    intro:
      "Over 70% of boutique CA and accounting practices start by managing client compliance on Excel sheets, desktop folders, and personal WhatsApp threads. While spreadsheets offer total flexibility and zero incremental software cost, Pyngyn ClientSpace eliminates the severe compliance risks of missed statutory deadlines, misplaced audit trails, and untracked article assistant bottlenecks.",
    verdict: {
      pickPyngyn:
        "Choose Pyngyn ClientSpace as soon as your firm manages more than 15 clients, employs multiple staff members or article assistants, and cannot afford the financial and reputational risk of a missed statutory deadline.",
      pickThem:
        "Choose Spreadsheets & Email only if you are a solo practitioner in your first months of practice with fewer than 10 clients and zero software budget.",
    },
    differences: [
      {
        title: "Automated Statutory Radars vs Manual Spreadsheet Updates",
        pyngyn:
          "Automatically updates statutory deadlines for GSTR-1, GSTR-3B, Advance Tax, Form 3CD, and TDS returns with countdown alerts and partner escalation flags.",
        them:
          "Requires staff to manually update Excel rows every day. A single missed cell update can lead to an overlooked return and client penalties.",
      },
      {
        title: "Centralized Encrypted Vault vs Scattered Personal Inboxes",
        pyngyn:
          "All client documents uploaded via portal, email, or WhatsApp are organized into 256-bit encrypted client vaults and structured audit folders.",
        them:
          "Documents sit scattered across staff personal WhatsApp chats, email attachments, and desktop download folders with no central index or backup.",
      },
      {
        title: "Enforced Partner Sign-Off Gates vs Unprotected Cells",
        pyngyn:
          "Mandatory 4-eye review gates require senior partner sign-off before computations or audit working papers can be released.",
        them:
          "Any team member can accidentally overwrite formulas, delete rows, or change status flags in a shared Google Sheet with no accountability.",
      },
      {
        title: "Professional Client Image & Magic Link Access",
        pyngyn:
          "Provides your clients with a white-labeled, professional client portal carrying your firm's brand, increasing client confidence and retention.",
        them:
          "Clients receive sporadic email requests and personal WhatsApp messages, projecting a fragmented and unorganized firm image.",
      },
    ],
    bestFor: [
      "Solo practitioners handling fewer than 10 total clients",
      "Newly established practices in their first three months with zero budget",
      "Personal tracking of side engagements",
    ],
    pricingNote:
      "Spreadsheets carry zero incremental software license fees, but the hidden cost of missed deadlines, article assistant downtime, and partner time spent chasing documents far exceeds the ₹499–₹799/month investment in Pyngyn ClientSpace.",
    migrationSteps: [
      {
        title: "Upload Existing Excel Trackers",
        body: "Upload your existing client tracking spreadsheet directly into Pyngyn's 1-click importer.",
      },
      {
        title: "Auto-Map Columns & Identifiers",
        body: "Pyngyn automatically matches client names, PANs, GSTINs, and assigned team members.",
      },
      {
        title: "Activate Deadlines & Document Checklists",
        body: "Statutory filing radars immediately calculate upcoming deadlines and generate PBC checklists.",
      },
      {
        title: "Decommission Unsecure Channels",
        body: "Transition client communication to branded portal links and official WhatsApp reminders.",
      },
    ],
    switcherQuote: {
      quote:
        "We used Excel for 8 years until an article assistant accidentally marked an Advance Tax filing as completed when it wasn't, resulting in interest and client fury. Moving to Pyngyn gave us complete partner visibility, review gates, and eliminated human error completely.",
      attribution: "Senior Partner, 18-Member Audit Firm, Hyderabad",
    },
    faqs: [
      {
        q: "How difficult is it to migrate from our Excel tracker to Pyngyn?",
        a: "It takes under 15 minutes. Pyngyn's guided spreadsheet importer accepts your current Excel or CSV file and automatically creates all client portfolios and statutory tasks.",
      },
      {
        q: "Can we still export data to Excel from Pyngyn?",
        a: "Yes. All reports, client registers, filing statuses, and workload capacity tables can be exported to Excel or PDF at any time.",
      },
      {
        q: "Will our clients be able to use Pyngyn easily?",
        a: "Yes. Clients love Pyngyn because they don't have to remember passwords. They simply click a secure magic link or reply to a WhatsApp prompt to upload their documents.",
      },
    ],
  },
};

export function getCompareContent(slug: string): CompareContent | undefined {
  return COMPARE_CONTENT[slug];
}
