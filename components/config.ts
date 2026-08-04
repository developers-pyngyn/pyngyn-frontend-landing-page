// Central place for all outbound destinations.
// Change these one-liners to repoint the buttons anywhere.

// Website / app URLs use pyngyn.ai; mailbox addresses use pyngyn.com.
export const EMAIL_DOMAIN = "pyngyn.com";

// --- External app (separate deployments) ---
export const SIGNIN_URL = "https://app.pyngyn.ai/";
export const SIGNUP_URL = "https://app.pyngyn.ai/?signup=true";
export const DEMO_URL = "/demo";

// --- Internal routed pages on this site ---
export const BENEFITS_URL = "/benefits";   // formerly /features
export const CUSTOMERS_URL = "/customers";
export const PRICING_URL = "/pricing";
export const BLOG_URL = "/blog";
export const ABOUT_URL = "/about";
export const CAREERS_URL = "/careers";
export const PRIVACY_URL = "/privacy";
export const TERMS_URL = "/terms";
export const REFUND_URL = "/refund";
export const COOKIE_POLICY_URL = "/cookie-policy";
export const DPA_URL = "/dpa";
export const SUBPROCESSORS_URL = "/subprocessors";

// --- Additional content pages ---
export const INTEGRATIONS_URL = "/integrations";
export const CHANGELOG_URL = "/changelog";
export const ANNOUNCEMENTS_URL = "/announcements";
export const ROADMAP_URL = "/roadmap";
export const REFER_URL = "/refer-and-earn";
export const DOCS_URL = "/docs";
export const GUIDES_URL = "/guides";
export const BRAND_URL = "/brand";
export const PARTNERS_URL = "/partners";
export const STATUS_URL = "/status";
export const SUPPORT_URL = "/support";
export const KB_URL = "/knowledge-base";
export const COMPARE_URL = "/compare";
export const INVESTORS_URL = "/investors";
export const TOOLS_URL = "/tools";
export const PLAN_GEN_URL = "/tools/ai-project-plan";
export const ROI_URL = "/tools/roi-calculator";
export const STATUS_REPORT_URL = "/tools/status-report";
export const UTILIZATION_URL = "/tools/team-utilization";
export const COST_ESTIMATOR_URL = "/tools/cost-margin-estimator";
export const ANY_UPDATE_URL = "/tools/any-update-cost";

// --- Dedicated capability pages (previously all pointed at /clientspace or
// /benefits with no page of their own) ---
export const BRANDED_PORTAL_URL = "/clientspace/branded-portal";
export const SECURE_DOCUMENTS_URL = "/clientspace/secure-documents";
export const APPROVALS_URL = "/clientspace/approvals";
export const RISK_DETECTION_URL = "/benefits/risk-detection";
export const REPORTING_URL = "/benefits/reporting";
export const ADMIN_SECURITY_URL = "/benefits/admin-security";

// App store
export const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.pyngyn.io&hl=en_IN";

// Compare competitors -> /compare/<slug>
// Positioning: PYNGYN is the PS-native, SMB, operationally deep platform
// that unifies knowledge + tasks. These are the closest adjacent tools that
// professional-services and consulting firms currently stitch together.
export const COMPETITORS: { slug: string; name: string }[] = [
  { slug: "notion", name: "Notion" },
  { slug: "sana-labs", name: "Sana Labs" },
  { slug: "guru", name: "Guru" },
  { slug: "atlas", name: "Atlas" },
  { slug: "clickup", name: "ClickUp" },
  { slug: "asana", name: "Asana" },
  { slug: "jira", name: "Jira" },
  { slug: "twenty", name: "Twenty" },
  { slug: "wrike", name: "Wrike" },
];

// Social profiles (update to your real handles)
// Social profiles
export const SOCIAL_X = "https://x.com/Pyngyn_Official";
export const SOCIAL_LINKEDIN = "https://www.linkedin.com/company/pyngyn/";
export const SOCIAL_REDDIT = "https://www.reddit.com/user/Pyngyn_Official/";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/profile.php?id=61584474731354";
export const SOCIAL_YOUTUBE = "https://www.youtube.com/@PyngynOfficial";
export const SOCIAL_INSTAGRAM = "https://instagram.com/pyngyn_official";
