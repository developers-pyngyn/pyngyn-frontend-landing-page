export type KbSection = { heading?: string; paragraphs: string[]; bullets?: string[] };

export type KbArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string; // display string
  popular?: boolean;
  editorsPick?: boolean;
  cover?: string;
  routePath?: string;
  mockupType?: string;
  body?: KbSection[];
};

export const KB_CATEGORIES = [
  "All",
  "Client Management",
  "Compliance",
  "Tax & GST",
  "Client Portal",
  "Quality & Governance",
  "Integrations",
  "Practice Operations",
] as const;

const RAW_KB_ARTICLES: KbArticle[] = [
  // 1. Client Management
  {
    slug: "client-portfolios-entity-hierarchies",
    title: "Client Portfolios & Entity Hierarchies (PAN, GSTIN, DIN)",
    excerpt: "Organize client corporate groups, parent holding companies, subsidiaries, LLPs, state-wise GSTINs, and director DIN profiles.",
    category: "Client Management",
    readingTime: "5 min",
    date: "Sep 2026",
    popular: true,
    editorsPick: true,
    cover: "/kb/diagram_1_architecture.png",
    body: [
      {
        paragraphs: [
          "Pyngyn ClientSpace is built specifically around the multi-entity reality of modern accounting practices. Rather than treating client companies as isolated, disconnected rows in a spreadsheet, ClientSpace models corporate relationships exactly as the Ministry of Corporate Affairs and tax authorities do.",
        ],
      },
      {
        heading: "1. Multi-Tier Entity Hierarchy Modeling",
        paragraphs: [
          "Structure business groups with parent holding entities, Indian operating subsidiaries, foreign holding arms, and linked LLPs. Each entity inherits group-level compliance policies while maintaining isolated statutory registers.",
        ],
        bullets: [
          "Parent holding company with consolidated and standalone compliance rollups",
          "Operating subsidiaries with multi-state GSTIN assignments and branch accounts",
          "Promoter and Director personal tax files linked to their corporate DIN profiles",
          "Automated compliance health scoring across the entire conglomerate group",
        ],
      },
      {
        heading: "2. Statutory ID & Identifier Master",
        paragraphs: [
          "Every client workspace contains verified fields for PAN, TAN, CIN/LLPIN, multi-state GSTINs, PF/ESI numbers, and authorized signatory profiles. Changes made to an entity profile automatically update all associated filing calendars.",
        ],
      },
      {
        heading: "3. Compliance Tiering & Risk Flags",
        paragraphs: [
          "Categorize clients into Tier 1 (Large Corporate), Tier 2 (Growing SME), and Tier 3 (Monthly Retainer). The system automatically adjusts deadline warning thresholds and review gate rigor based on the client tier.",
        ],
      },
      {
        heading: "4. Signatory & Contact Role Permissions",
        paragraphs: [
          "Assign specific client contacts as primary accounting points of contact, finance controllers, or legal signing directors. Only authorized signing directors can execute formal approvals and e-signatures in the client portal.",
        ],
      },
    ],
  },

  // 2. Compliance
  {
    slug: "statutory-compliance-master-calendar",
    title: "Configuring the Statutory Compliance Master Calendar",
    excerpt: "Track GSTR-1, GSTR-3B, Advance Tax Q1-Q4, Form 3CD, AOC-4, MGT-7, and TDS 24Q/26Q deadlines across all active client entities.",
    category: "Compliance",
    readingTime: "6 min",
    date: "Sep 2026",
    popular: true,
    cover: "/kb/diag_calendar_flow.png",
    body: [
      {
        paragraphs: [
          "The Statutory Compliance Master Calendar is the core operational radar of Pyngyn ClientSpace. It replaces fragmented desktop wall charts and Excel trackers with a real-time, interactive compliance grid that tracks regulatory due dates across central and state authorities.",
        ],
      },
      {
        heading: "1. Pre-Configured Statutory Due Date Rules",
        paragraphs: [
          "ClientSpace comes out of the box with statutory filing logic for Indian accounting and CA practices:",
        ],
        bullets: [
          "Monthly GST filings: GSTR-1 (11th of each month) and GSTR-3B (20th/22nd/24th based on state turnover)",
          "Quarterly Advance Tax deadlines: 15% by June 15, 45% by Sept 15, 75% by Dec 15, 100% by March 15",
          "TDS/TCS returns: Form 24Q, 26Q, 27Q quarterly filings with challan reconciliation",
          "MCA annual filings: AOC-4 (Financial Statements) and MGT-7 (Annual Return) with SRN tracking",
          "Direct Tax statutory audits: Section 44AB Form 3CD and corporate ITR-6 filing milestones",
        ],
      },
      {
        heading: "2. Automated Filing Task Instantiation",
        paragraphs: [
          "15 days before each statutory due date, ClientSpace automatically instantiates execution tasks for the assigned engagement team, complete with PBC document request checklists and manager review gates.",
        ],
      },
      {
        heading: "3. Penalty Risk Mitigation & Countdown Timers",
        paragraphs: [
          "Every upcoming statutory deadline displays a live countdown timer. If client documents remain pending within 5 days of cutoff, the system triggers automated high-priority escalation alerts to prevent late filing fees.",
        ],
      },
      {
        heading: "4. Client View Simulation",
        paragraphs: [
          "Practitioners can switch to 'Simulate Client View' with a single click to verify what corporate clients see on their white-labeled portal calendar, ensuring transparent stakeholder alignment.",
        ],
      },
    ],
  },

  // 3. Quality & Governance
  {
    slug: "four-eye-partner-review-gates",
    title: "Setting Up 4-Eye Partner Review Gates & Sign-Offs",
    excerpt: "Enforce ICAI SQC-1 quality control protocols. Route working papers from article trainee to audit manager to signing partner before release.",
    category: "Quality & Governance",
    readingTime: "5 min",
    date: "Sep 2026",
    popular: true,
    editorsPick: true,
    cover: "/kb/diag_esign_flow.png",
    body: [
      {
        paragraphs: [
          "Under ICAI SQC-1 (Standard on Quality Control) and global auditing frameworks, no deliverable, tax computation, or audit report may be issued without multi-tier verification. Pyngyn enforces this with automated 4-Eye Partner Review Gates.",
        ],
      },
      {
        heading: "1. 3-Tier Maker-Checker Architecture",
        paragraphs: [
          "Every deliverable moves through a rigorous three-step quality progression before it can be submitted to government portals or presented to the client:",
        ],
        bullets: [
          "Tier 1 (Preparer / Article Assistant): Compiles working papers, ledger vouchers, and draft tax computation.",
          "Tier 2 (Audit Manager / Senior CA): Verifies trial balance alignment, checks statutory clauses, and approves schedules.",
          "Tier 3 (Engagement Partner): Conducts Engagement Quality Control Review (EQCR) and applies digital signature.",
        ],
      },
      {
        heading: "2. Observation Query Registers",
        paragraphs: [
          "Reviewers can highlight specific line items in draft schedules and log observation queries. Preparers receive instant notifications and must attach ledger evidence before the query can be resolved.",
        ],
      },
      {
        heading: "3. Cryptographic Tamper-Evident Audit Trails",
        paragraphs: [
          "Every sign-off records an immutable log containing the reviewer's user ID, IP address, timestamp, and SHA-256 document checksum, ensuring effortless compliance during ICAI Peer Reviews.",
        ],
      },
    ],
  },

  // 4. Tax & GST
  {
    slug: "gst-reconciliation-gsp-sync",
    title: "GST Reconciliation (GSTR-1, 3B, 2B) & GSP Sync",
    excerpt: "Automate 3-way reconciliation between GSTR-2B, purchase registers, and GSTR-3B with GSP direct portal synchronization.",
    category: "Tax & GST",
    readingTime: "7 min",
    date: "Sep 2026",
    popular: true,
    cover: "/kb/diag_gst_recon_flow.png",
    body: [
      {
        paragraphs: [
          "Manual GST reconciliation across multiple GSTINs leads to missed input tax credit (ITC) and costly notice inquiries. Pyngyn connects directly to GSTN via authorized GSPs to streamline monthly reconciliations.",
        ],
      },
      {
        heading: "1. Authorized GSP Direct Integration",
        paragraphs: [
          "Connect client GSTIN portals using secure OTP authorization and 30-day session tokens. ClientSpace executes automated background data syncs at 04:00 AM every morning to pull the latest GSTR-2B returns.",
        ],
      },
      {
        heading: "2. Automated 3-Way ITC Matching",
        paragraphs: [
          "The reconciliation engine automatically compares invoices from your accounting software purchase register with government GSTR-2B records, bucketing transactions into 4 actionable categories:",
        ],
        bullets: [
          "Matched: Invoice number, date, GSTIN, taxable value, and tax amounts match within ₹5 tolerance.",
          "Missing in 2B: Invoices in your client's books where the vendor has failed to file GSTR-1.",
          "ITC Ineligible / Blocked: Invoices categorized under Section 17(5) or reverse charge mechanisms.",
          "Value Discrepancy: Invoices matching on invoice number but differing in tax rate or value.",
        ],
      },
      {
        heading: "3. Automated Vendor Follow-Ups via WhatsApp",
        paragraphs: [
          "When missing GSTR-2B invoices threaten your client's input tax credit, ClientSpace can auto-generate and dispatch professional WhatsApp reminders directly to non-compliant vendors requesting filing confirmation.",
        ],
      },
      {
        heading: "4. Return Filing & ARN Archive",
        paragraphs: [
          "After partner sign-off, filing acknowledgments (ARN receipts) and PMT-06 challans are automatically archived into the client's permanent GST document vault for year-end audit retrieval.",
        ],
      },
    ],
  },

  // 5. Tax & GST
  {
    slug: "income-tax-notice-triage",
    title: "Direct Tax Filing, 26AS/AIS Pre-fill & Notice Register",
    excerpt: "Streamline ITR-1 through ITR-7 computation pipelines, 26AS/AIS mismatch detection, and Section 142/143/148 department notice triage.",
    category: "Tax & GST",
    readingTime: "6 min",
    date: "Sep 2026",
    cover: "/kb/diag_master_arch.png",
    body: [
      {
        paragraphs: [
          "Managing peak tax season requires end-to-end visibility from preliminary data collection and computation worksheets to final e-filing acknowledgments and scrutiny defense.",
        ],
      },
      {
        heading: "1. 26AS & AIS Automated Reconciliation",
        paragraphs: [
          "ClientSpace imports Annual Information Statements (AIS) and Form 26AS directly into client portfolios. The reconciliation engine highlights unreported interest, TDS variances, and high-value financial transactions before return drafting begins.",
        ],
      },
      {
        heading: "2. Statutory Notice Management Register",
        paragraphs: [
          "Centralize all department communications under Section 142(1) (inquiry), Section 143(1)(a) (prima facie adjustments), Section 143(2) (scrutiny), and Section 148 (reassessment).",
        ],
        bullets: [
          "Automatic 30-day statutory reply countdown timers",
          "Assigned tax specialist ownership and review gate tracking",
          "Draft reply repository with supporting computation attachments",
          "Portal acknowledgment and order closure logging",
        ],
      },
      {
        heading: "3. Section 154 Rectification Workflows",
        paragraphs: [
          "When CPC intimations contain apparent errors, teams can track rectification petitions from drafting through submission and CPC reprocessing directly on the client workspace.",
        ],
      },
    ],
  },

  // 6. Integrations
  {
    slug: "whatsapp-business-api-setup",
    title: "Connecting WhatsApp Business Cloud API for Client Intake",
    excerpt: "Configure official Meta WhatsApp Business Cloud API for automated document collection, statutory filing reminders, and two-way client chat.",
    category: "Integrations",
    readingTime: "5 min",
    date: "Sep 2026",
    popular: true,
    cover: "/kb/diag_whatsapp_flow.png",
    body: [
      {
        paragraphs: [
          "Indian accounting and CA practices run on WhatsApp. Rather than having sensitive tax documents and trial balances scattered across staff personal WhatsApp chats, Pyngyn integrates the official Meta WhatsApp Business Cloud API into your firm command center.",
        ],
      },
      {
        heading: "1. Meta Embedded Signup Wizard",
        paragraphs: [
          "Connect your practice phone number via Meta's official Graph API v19.0 in five simple steps:",
        ],
        bullets: [
          "Step 1: Log in with your firm's Meta Business Suite account.",
          "Step 2: Select your practice business portfolio.",
          "Step 3: Register your dedicated practice WhatsApp phone number.",
          "Step 4: Verify phone ownership with a 6-digit OTP.",
          "Step 5: Authorize Pyngyn to subscribe to automated message webhooks.",
        ],
      },
      {
        heading: "2. Pre-Approved CA Statutory Message Templates",
        paragraphs: [
          "Pyngyn includes pre-approved templates designed for practice communications, including GSTR-3B due date alerts, Advance Tax challan reminders, PBC document requests, and digital sign-off links.",
        ],
      },
      {
        heading: "3. Two-Way Document Ingestion",
        paragraphs: [
          "When a client replies to a document request with a PDF or image on WhatsApp, ClientSpace automatically extracts the file, runs virus scanning, and files it into the client's secure document vault.",
        ],
      },
    ],
  },

  // 7. Integrations
  {
    slug: "tally-prime-accounting-sync",
    title: "Connecting Tally Prime & Desktop Accounting Ledgers",
    excerpt: "Sync trial balances, general ledgers, voucher registers, and bank books from Tally Prime desktop into Pyngyn ClientSpace.",
    category: "Integrations",
    readingTime: "5 min",
    date: "Sep 2026",
    cover: "/kb/diag_tally_flow.png",
    body: [
      {
        paragraphs: [
          "Most Indian businesses maintain their accounting books on desktop Tally Prime. Pyngyn's secure local connector bridges desktop Tally Prime with your cloud practice workspace without complex networking or firewall changes.",
        ],
      },
      {
        heading: "1. Local Bridge Connector Architecture",
        paragraphs: [
          "The Pyngyn Tally Agent runs locally alongside Tally Prime, querying Tally via XML/ODBC protocols on localhost (port 9000). The agent encrypts extracted ledger data with AES-256 before transmitting it to your cloud practice vault.",
        ],
      },
      {
        heading: "2. Automated Ledger & Trial Balance Sync",
        paragraphs: [
          "Daily or on-demand synchronization pulls active voucher registers, party balances, inventory summaries, and closing trial balances directly into engagement working paper trees.",
        ],
        bullets: [
          "Zero manual Excel exporting or re-uploading",
          "Automated ledger mapping to standard Schedule III groupings",
          "Instant detection of out-of-period journal entries",
          "Multi-company Tally support mapped to client entities",
        ],
      },
    ],
  },

  // 8. Integrations
  {
    slug: "zoho-books-cloud-sync",
    title: "Two-Way Zoho Books Synchronization",
    excerpt: "Connect cloud Zoho Books organizations with OAuth 2.0 for real-time bill, invoice, TDS withholding, and ledger synchronization.",
    category: "Integrations",
    readingTime: "4 min",
    date: "Sep 2026",
    cover: "/kb/diag_zoho_flow.png",
    body: [
      {
        paragraphs: [
          "Connect client Zoho Books organizations to automate monthly closing workflows, AP/AR voucher reconciliation, and statutory tax tracking.",
        ],
      },
      {
        heading: "1. Multi-Region OAuth 2.0 Authorization",
        paragraphs: [
          "Pyngyn supports all Zoho data centers (zoho.in for Indian data residency, zoho.com for US/Global, and zoho.eu for European compliance). One-click OAuth authorization links client books in seconds.",
        ],
      },
      {
        heading: "2. Automated Voucher & Withholding Tax Sync",
        paragraphs: [
          "Client vendor invoices, customer bills, and TDS deduction entries sync bi-directionally, ensuring your compliance calendar and statutory returns always reflect live book balances.",
        ],
      },
    ],
  },

  // 9. Integrations
  {
    slug: "google-workspace-integration",
    title: "Google Workspace Integration: Drive, Gmail, & Calendar",
    excerpt: "Auto-provision client Google Drive folders, ingest invoice attachments from Gmail, and sync statutory filing dates to Google Calendar.",
    category: "Integrations",
    readingTime: "5 min",
    date: "Sep 2026",
    cover: "/kb/diag_drive_flow.png",
    body: [
      {
        paragraphs: [
          "Deep integration with Google Workspace allows your firm to keep using familiar tools while ClientSpace provides the structured practice hierarchy and automated audit controls.",
        ],
      },
      {
        heading: "1. Automated Google Drive Folder Provisioning",
        paragraphs: [
          "When a new client or engagement is created, Pyngyn automatically provisions a structured folder tree in your practice Google Drive:",
        ],
        bullets: [
          "Client Name / FY 2025-26 / 01 Statutory Audit / Working Papers",
          "Client Name / FY 2025-26 / 02 Direct Tax / Computations & Challans",
          "Client Name / FY 2025-26 / 03 GST / Returns & GSTR-2B Reconciliations",
          "Client Name / Permanent Records / DSC & Incorporation Documents",
        ],
      },
      {
        heading: "2. Gmail Invoice & Document Ingestion",
        paragraphs: [
          "Client emails sent to your practice inbox are parsed by Pyngyn. Invoices, bank statements, and tax receipts are matched against client domain profiles and ingested directly into pending intake queues.",
        ],
      },
      {
        heading: "3. Calendar Sync",
        paragraphs: [
          "Statutory due dates, client tax meetings, and partner review gates sync directly into Google Calendar with configurable 24-hour reminder notifications.",
        ],
      },
    ],
  },

  // 10. Quality & Governance
  {
    slug: "aadhaar-esign-statutory-gateway",
    title: "Aadhaar eSign & Section 65B Audit Trail Verification",
    excerpt: "Collect legally binding electronic signatures under Information Technology Act, 2000 with automated Section 65B audit certificates.",
    category: "Quality & Governance",
    readingTime: "5 min",
    date: "Sep 2026",
    editorsPick: true,
    cover: "/kb/diag_payments_esign_arch.png",
    body: [
      {
        paragraphs: [
          "Collecting physical signatures on engagement letters, representation letters, and tax computation approvals wastes billable days. Pyngyn integrates accredited Indian Electronic Signature Providers (ESPs) for instant digital execution.",
        ],
      },
      {
        heading: "1. Legal Validity under Indian Law",
        paragraphs: [
          "Electronic signatures executed through Pyngyn comply with Section 3A and Section 5 of the Information Technology Act, 2000, rendering them fully equivalent to physical handwritten signatures in court.",
        ],
      },
      {
        heading: "2. Frictionless Mobile Aadhaar OTP Signing",
        paragraphs: [
          "Clients receive a secure signing link on WhatsApp or email. Entering their Aadhaar number and submitting a one-time password (OTP) affixes a cryptographic signature to the PDF in under 60 seconds.",
        ],
      },
      {
        heading: "3. Section 65B Tamper-Evident Certificates",
        paragraphs: [
          "Every completed document automatically appends a formal Evidence Act Section 65B Certificate containing signer details, Aadhaar hashing, timestamp, IP address, and cryptographic signature verification.",
        ],
      },
    ],
  },

  // 11. Client Portal
  {
    slug: "branded-client-portal-magic-links",
    title: "Deploying Your Branded Client Portal with Magic Links",
    excerpt: "White-label your client portal on your own domain with passwordless magic-link login and 100% tenant data isolation.",
    category: "Client Portal",
    readingTime: "6 min",
    date: "Sep 2026",
    popular: true,
    cover: "/kb/diagram_2_intake_flow.png",
    body: [
      {
        paragraphs: [
          "Give your corporate clients a modern, branded collaboration experience. Your client portal reflects your firm's brand identity while eliminating password management friction.",
        ],
      },
      {
        heading: "1. White-Label Domain & Branding Setup",
        paragraphs: [
          "Deploy your portal on your practice domain (e.g. portal.yourfirm.com) with custom logo, primary color scheme, and firm contact information.",
        ],
      },
      {
        heading: "2. Passwordless Magic Links",
        paragraphs: [
          "Clients never have to remember passwords or submit password reset requests. They receive single-use, time-limited magic links via WhatsApp or verified email that grant immediate, authenticated access.",
        ],
      },
      {
        heading: "3. Multi-Tenant Data Isolation",
        paragraphs: [
          "Every client workspace operates in complete data isolation. Clients can only see their designated legal entities and approved deliverables, with zero visibility into other firm matters or internal notes.",
        ],
      },
    ],
  },

  // 12. Client Portal
  {
    slug: "automated-pbc-document-checklists",
    title: "Automating Provided-By-Client (PBC) Document Chasers",
    excerpt: "Set structured document intake checklists, automate WhatsApp reminders, and track client fulfillment progress.",
    category: "Client Portal",
    readingTime: "5 min",
    date: "Sep 2026",
    cover: "/kb/diagram_5_conversion_sequence.png",
    body: [
      {
        paragraphs: [
          "Chasing missing bank statements, fixed asset registers, and loan sanction letters is the largest source of unbilled administrative churn in accounting firms.",
        ],
      },
      {
        heading: "1. Standardized PBC Intake Templates",
        paragraphs: [
          "Deploy pre-built checklist templates for Statutory Audits, Tax Audits (Form 3CD), Monthly Bookkeeping Closes, and GST Annual Filings in one click.",
        ],
      },
      {
        heading: "2. Configurable Chase Cadences",
        paragraphs: [
          "Configure automated follow-up cadences (e.g. initial request $\\rightarrow$ friendly reminder at 7 days $\\rightarrow$ urgent alert at 3 days before cutoff) sent automatically via WhatsApp and email.",
        ],
      },
      {
        heading: "3. Instant Progress Meters & Review",
        paragraphs: [
          "Track intake fulfillment on live meters (e.g. 18/25 documents verified). Staff can accept files or reject unreadable uploads with specific feedback directly in the portal.",
        ],
      },
    ],
  },

  // 13. Practice Operations
  {
    slug: "workload-cockpit-capacity-planning",
    title: "Balancing Practice Workload & Article Trainee Hours",
    excerpt: "Monitor real-time team bandwidth, rebalance engagement tasks, and prevent peak-season burnout with capacity heatmaps.",
    category: "Practice Operations",
    readingTime: "5 min",
    date: "Sep 2026",
    editorsPick: true,
    cover: "/kb/diagram_3_pipeline_stages.png",
    body: [
      {
        paragraphs: [
          "Peak audit and tax seasons often push article assistants and managers to extreme burnout while other staff remain under-utilized. Pyngyn's Workload Cockpit gives partners real-time capacity visibility.",
        ],
      },
      {
        heading: "1. Practice Bandwidth Heatmaps",
        paragraphs: [
          "View every partner, manager, qualified CA, and article trainee on a visual capacity spectrum: Under-allocated (<30h/wk), Balanced (35–45h/wk), or Over-allocated (>50h/wk).",
        ],
      },
      {
        heading: "2. One-Click Task Rebalancing",
        paragraphs: [
          "Drag and drop pending audit vouching tasks or tax computation drafts from overloaded team members to available staff with instant schedule recalculation.",
        ],
      },
      {
        heading: "3. Leave Calendar & Statutory Overlap Detection",
        paragraphs: [
          "The cockpit overlays approved staff leave on statutory due date calendars, alerting partners weeks in advance if a senior auditor's absence overlaps with a major filing deadline.",
        ],
      },
    ],
  },

  // 14. Compliance
  {
    slug: "dsc-token-vault-management",
    title: "Managing DSC USB Tokens & Statutory Portal Credentials",
    excerpt: "Centralize Digital Signature Certificate validity tracking, physical USB token custody logs, and role-gated government portal logins.",
    category: "Compliance",
    readingTime: "4 min",
    date: "Sep 2026",
    cover: "/kb/diag_gst_system_arch.png",
    body: [
      {
        paragraphs: [
          "Disorganized DSC USB cryptotokens and forgotten portal passwords create severe statutory filing delays. The DSC & Credential Vault centralizes token custody with military-grade encryption.",
        ],
      },
      {
        heading: "1. DSC Token Validity & Auto-Renewal Alerts",
        paragraphs: [
          "Track director and partner Class 3 DSC token validity, serial numbers, issuance authorities, and linked PANs. The system dispatches automated renewal reminders 30 days before token expiration.",
        ],
      },
      {
        heading: "2. Physical Token Custody Registry",
        paragraphs: [
          "Maintain an unalterable log tracking which article trainee or partner currently possesses the physical USB token, eliminating office searches on filing day.",
        ],
      },
      {
        heading: "3. Role-Gated Portal Credentials",
        paragraphs: [
          "Store MCA-V3, GSTN, TRACES, and Income Tax portal logins in an encrypted, permission-gated vault. Staff can access filing sessions without exposing master passwords in personal chats.",
        ],
      },
    ],
  },

  // 15. Practice Operations
  {
    slug: "my-work-timesheets-execution",
    title: "Personal Daily Driver: My Tasks, Review Queue & Timesheets",
    excerpt: "Organize personal daily priorities, review queues, billable timesheet timers, and high-risk client filing watchlists.",
    category: "Practice Operations",
    readingTime: "4 min",
    date: "Sep 2026",
    cover: "/kb/diag_gmail_flow.png",
    body: [
      {
        paragraphs: [
          "The My Work view serves as the personalized daily driver for every practitioner in the firm, consolidating tasks, review items, and timesheets into a single screen.",
        ],
      },
      {
        heading: "1. My Tasks & Subtasks",
        paragraphs: [
          "View assigned deliverables organized by statutory urgency, client tier, or engagement milestone in Table, Board, or Timeline views.",
        ],
      },
      {
        heading: "2. Four-Eye Review Queue",
        paragraphs: [
          "Managers and partners have a dedicated queue highlighting all deliverables awaiting review, allowing 1-click approvals or inline revision requests.",
        ],
      },
      {
        heading: "3. Daily Billable Timesheets",
        paragraphs: [
          "Log billable effort directly against specific client engagements with real-time timers or manual entries, preventing unbilled write-offs on fixed retainers.",
        ],
      },
    ],
  },

  // 16. Practice Operations
  {
    slug: "razorpay-retainer-payments",
    title: "Collecting Client Retainer Payments via Razorpay",
    excerpt: "Automate monthly client retainer invoicing, payment links via WhatsApp, and instant settlement reconciliations with Razorpay.",
    category: "Practice Operations",
    readingTime: "4 min",
    date: "Sep 2026",
    cover: "/kb/diag_razorpay_flow.png",
    body: [
      {
        paragraphs: [
          "Eliminate delayed client collections and manual bank transfer reconciliations with integrated digital invoicing and payment collection.",
        ],
      },
      {
        heading: "1. Razorpay Payment Gateway Integration",
        paragraphs: [
          "Connect your practice Razorpay merchant account to generate automated payment links with support for UPI, NetBanking, Credit Cards, and NEFT/RTGS.",
        ],
      },
      {
        heading: "2. 1-Click Client Portal Settlements",
        paragraphs: [
          "Clients can view pending practice invoices and settle monthly retainers directly in their ClientSpace portal with instant GST-compliant receipt generation.",
        ],
      },
      {
        heading: "3. Automated Retainer Realization",
        paragraphs: [
          "Settled payments automatically update your engagement billing ledger, marking invoices as cleared and updating practice realization metrics.",
        ],
      },
    ],
  },

  // 17. Quality & Governance
  {
    slug: "caro-2020-statutory-audit-workpapers",
    title: "Standardizing CARO 2020 & Form 3CD Audit Workpapers",
    excerpt: "Deploy clause-by-clause audit checklists for CARO 2020, Schedule III financial statements, and Form 3CD tax audit clauses.",
    category: "Quality & Governance",
    readingTime: "6 min",
    date: "Sep 2026",
    cover: "/kb/diag_gst_filing_flow.png",
    body: [
      {
        paragraphs: [
          "Standardize statutory assurance engagements with pre-configured audit programmes aligned with Companies Act 2013 disclosures and CARO 2020 reporting requirements.",
        ],
      },
      {
        heading: "1. CARO 2020 Verification Programmes",
        paragraphs: [
          "Clause-by-clause testing checklists covering property, plant & equipment physical verifications, working capital limits, statutory dues, and whistle-blower complaints.",
        ],
      },
      {
        heading: "2. Form 3CD 44-Clause Testing Workpapers",
        paragraphs: [
          "Pre-built schedules for depreciation under Section 32, disallowances under Section 40A(3), Section 43B statutory dues, and quantitative stock reconciliations.",
        ],
      },
      {
        heading: "3. Engagement Quality Control Review (EQCR)",
        paragraphs: [
          "Formal independent partner sign-off gates ensuring all audit queries are resolved before releasing the final independent auditor report.",
        ],
      },
    ],
  },

  // 18. Tax & GST
  {
    slug: "statutory-notice-response-management",
    title: "Tracking ITD & GST Assessment Notices (ASMT-10, DRC-01)",
    excerpt: "Log department notices, track 30-day response limitation windows, and archive faceless assessment submission acknowledgments.",
    category: "Tax & GST",
    readingTime: "5 min",
    date: "Sep 2026",
    cover: "/kb/diag_master_arch.png",
    body: [
      {
        paragraphs: [
          "Manage faceless income tax assessments and GST department inquiries without missing statutory limitation deadlines or risking adverse ex-parte orders.",
        ],
      },
      {
        heading: "1. Notice Categorization & Logging",
        paragraphs: [
          "Log notices by statutory category: GST ASMT-10 (scrutiny of returns), DRC-01 (show cause notice), ITD Section 142(1), Section 143(2), or Section 148.",
        ],
      },
      {
        heading: "2. 30-Day Response Countdown",
        paragraphs: [
          "Automated countdown timers alert the assigned tax manager 15, 7, and 2 days before the department reply deadline.",
        ],
      },
      {
        heading: "3. Faceless Response Archive",
        paragraphs: [
          "Draft responses, technical submissions, and portal acknowledgment receipts are permanently archived in the client portfolio for future appeal reference.",
        ],
      },
    ],
  },
];

const ARTICLE_METADATA_MAP: Record<string, { routePath: string; mockupType: string }> = {
  "client-portfolios-entity-hierarchies": {
    routePath: "app.pyngyn.ai/clientspace/directory/apex-group",
    mockupType: "client-hierarchies",
  },
  "statutory-compliance-master-calendar": {
    routePath: "app.pyngyn.ai/clientspace/compliance/calendar-2026",
    mockupType: "statutory-calendar",
  },
  "four-eye-partner-review-gates": {
    routePath: "app.pyngyn.ai/clientspace/governance/review-gates/eqcr-901",
    mockupType: "four-eye-review",
  },
  "gst-reconciliation-gsp-sync": {
    routePath: "app.pyngyn.ai/clientspace/gst/3-way-recon/27AABCU9603R1ZX",
    mockupType: "gst-recon",
  },
  "income-tax-notice-triage": {
    routePath: "app.pyngyn.ai/clientspace/tax/notices/sec-143-2",
    mockupType: "direct-tax",
  },
  "whatsapp-business-api-setup": {
    routePath: "app.pyngyn.ai/clientspace/comms/whatsapp/live-inbox",
    mockupType: "whatsapp-inbox",
  },
  "tally-prime-accounting-sync": {
    routePath: "app.pyngyn.ai/clientspace/connectors/tally-prime-daemon",
    mockupType: "tally-connector",
  },
  "zoho-books-cloud-sync": {
    routePath: "app.pyngyn.ai/clientspace/connectors/zoho-books-sync",
    mockupType: "tally-connector",
  },
  "google-workspace-integration": {
    routePath: "app.pyngyn.ai/clientspace/intake/unified-hub",
    mockupType: "intake-pipeline",
  },
  "aadhaar-esign-statutory-gateway": {
    routePath: "app.pyngyn.ai/clientspace/governance/esign-uidai-gateway",
    mockupType: "four-eye-review",
  },
  "branded-client-portal-magic-links": {
    routePath: "portal.kapadia-associates.com/client/horizon-exports",
    mockupType: "client-portal",
  },
  "automated-pbc-document-checklists": {
    routePath: "app.pyngyn.ai/clientspace/intake/pbc-checklists/audit-2026",
    mockupType: "intake-pipeline",
  },
  "workload-cockpit-capacity-planning": {
    routePath: "app.pyngyn.ai/clientspace/cockpit/workload-heatmaps",
    mockupType: "workload-cockpit",
  },
  "dsc-token-vault-management": {
    routePath: "app.pyngyn.ai/clientspace/compliance/dsc-token-vault",
    mockupType: "dsc-vault",
  },
  "my-work-timesheets-execution": {
    routePath: "app.pyngyn.ai/clientspace/my-work/daily-driver",
    mockupType: "workload-cockpit",
  },
  "razorpay-retainer-payments": {
    routePath: "app.pyngyn.ai/clientspace/billing/retainers-razorpay",
    mockupType: "payments",
  },
  "caro-2020-statutory-audit-workpapers": {
    routePath: "app.pyngyn.ai/clientspace/governance/caro-2020-working-papers",
    mockupType: "audit-papers",
  },
  "statutory-notice-response-management": {
    routePath: "app.pyngyn.ai/clientspace/compliance/notice-registry",
    mockupType: "direct-tax",
  },
};

export const KB_ARTICLES: KbArticle[] = RAW_KB_ARTICLES.map((article) => {
  const meta = ARTICLE_METADATA_MAP[article.slug] || {
    routePath: `app.pyngyn.ai/clientspace/${article.slug}`,
    mockupType: "gst-recon",
  };
  return {
    ...article,
    cover: `/kb/platform/${article.slug}.png`,
    routePath: meta.routePath,
    mockupType: meta.mockupType,
  };
});

// Lookup helpers
export function getArticle(slug: string): KbArticle | undefined {
  return KB_ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 3): KbArticle[] {
  const current = getArticle(slug);
  if (!current) return [];
  const sameCat = KB_ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const others = KB_ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}

// Default body shown when an article has no custom `body` yet.
export function defaultBody(a: KbArticle): KbSection[] {
  return [
    { paragraphs: [a.excerpt] },
    {
      heading: "Overview",
      paragraphs: [
        `This guide covers ${a.title.toLowerCase()}, part of the ${a.category} section of the Pyngyn ClientSpace knowledge base.`,
      ],
    },
    {
      heading: "Key Steps & Verification",
      paragraphs: [
        "1. Navigate to the relevant module in your ClientSpace dashboard.",
        "2. Review client portfolios and associated statutory filing rules.",
        "3. Follow the standardized workflow checklists to complete execution.",
      ],
    },
  ];
}
