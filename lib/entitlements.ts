/**
 * ClientSpace Plan Entitlements & Capacity Architecture
 *
 * Centralized entitlement definitions and configurable limits for Pyngyn ClientSpace.
 * Ensures consistent enforcement across frontend pricing, onboarding, and backend service gates
 * without hardcoding business assumptions or breaking existing subscriptions.
 */

export type PlanTierId = "trial" | "pro" | "business" | "enterprise";

export interface EntitlementLimits {
  /** Total active client portfolios managed in the firm workspace */
  maxClients: number | "unlimited";
  /** Maximum client entities with active GST compliance workflows (GSTR-1, 3B, 2B tracking) */
  maxGstClients: number | "unlimited";
  /** Maximum client entities with active Income Tax workflows (ITR, 26AS, Form 3CD) */
  maxIncomeTaxClients: number | "unlimited";
  /** Maximum active event-driven automation rules (statutory alerts, WhatsApp chasers, escalations) */
  maxAutomations: number | "unlimited";
  /** Maximum connected integrations (Tally Prime, Zoho Books, WhatsApp, Google Drive, etc.) */
  maxIntegrations: number | "unlimited";
  /** Secure cloud storage allocation in Gigabytes (GB) */
  storageGb: number | "unlimited";
  /** Maximum practitioner seats included or allowed on the plan */
  maxTeamMembers: number | "unlimited";
  /** Client portal guest accounts for taxpayer document uploads and deliverable reviews */
  guestPortalAccounts: "unlimited";
  /** Audit log history retention in days */
  auditLogRetentionDays: number | "unlimited";
}

export interface PlanEntitlement {
  id: PlanTierId;
  name: string;
  badge?: string;
  tagline: string;
  limits: EntitlementLimits;
  /** Granular capability flags supported on this plan */
  features: {
    clientPortals: boolean;
    magicLinkAccess: boolean;
    statutoryComplianceRadar: boolean;
    gstWorkflows: boolean;
    incomeTaxWorkflows: boolean;
    dscRegister: boolean;
    statutoryNoticesRegister: boolean;
    fourEyeReviewGates: boolean;
    workloadCockpit: boolean;
    capacityAutoRebalance: boolean;
    tallySync: boolean;
    zohoBooksIntegration: boolean;
    whatsAppReminders: boolean;
    emailIntake: boolean;
    customDomainWhitelabel: boolean;
    enterpriseSso: boolean;
    dedicatedMigration: boolean | "assisted" | "white-glove";
  };
}

/**
 * Baseline plan entitlements. All limits are configurable and can be overridden
 * per-workspace via database organization settings.
 */
export const PLAN_ENTITLEMENTS: Record<PlanTierId, PlanEntitlement> = {
  trial: {
    id: "trial",
    name: "Free Trial",
    badge: "7-Day Sandbox",
    tagline: "Full access to evaluate Pyngyn ClientSpace with up to 10 clients.",
    limits: {
      maxClients: 10,
      maxGstClients: 10,
      maxIncomeTaxClients: 10,
      maxAutomations: 5,
      maxIntegrations: 3,
      storageGb: 5,
      maxTeamMembers: 5,
      guestPortalAccounts: "unlimited",
      auditLogRetentionDays: 30,
    },
    features: {
      clientPortals: true,
      magicLinkAccess: true,
      statutoryComplianceRadar: true,
      gstWorkflows: true,
      incomeTaxWorkflows: true,
      dscRegister: true,
      statutoryNoticesRegister: true,
      fourEyeReviewGates: true,
      workloadCockpit: true,
      capacityAutoRebalance: false,
      tallySync: true,
      zohoBooksIntegration: true,
      whatsAppReminders: true,
      emailIntake: true,
      customDomainWhitelabel: false,
      enterpriseSso: false,
      dedicatedMigration: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pyngyn Professional",
    badge: "Essential Practice",
    tagline: "Tasks, projects, client spaces, collaboration, knowledge, workflows, client communication.",
    limits: {
      maxClients: 50,
      maxGstClients: 50,
      maxIncomeTaxClients: 50,
      maxAutomations: 10,
      maxIntegrations: 3,
      storageGb: 25,
      maxTeamMembers: "unlimited",
      guestPortalAccounts: "unlimited",
      auditLogRetentionDays: 90,
    },
    features: {
      clientPortals: true,
      magicLinkAccess: true,
      statutoryComplianceRadar: true,
      gstWorkflows: true,
      incomeTaxWorkflows: true,
      dscRegister: true,
      statutoryNoticesRegister: true,
      fourEyeReviewGates: false,
      workloadCockpit: false,
      capacityAutoRebalance: false,
      tallySync: false,
      zohoBooksIntegration: false,
      whatsAppReminders: false,
      emailIntake: true,
      customDomainWhitelabel: false,
      enterpriseSso: false,
      dedicatedMigration: false,
    },
  },
  business: {
    id: "business",
    name: "Pyngyn Business",
    badge: "Most Popular for Growing Firms",
    tagline: "Everything + automation, analytics, advanced permissions, AI, practice-level reporting.",
    limits: {
      maxClients: "unlimited",
      maxGstClients: "unlimited",
      maxIncomeTaxClients: "unlimited",
      maxAutomations: "unlimited",
      maxIntegrations: "unlimited",
      storageGb: 100,
      maxTeamMembers: "unlimited",
      guestPortalAccounts: "unlimited",
      auditLogRetentionDays: "unlimited",
    },
    features: {
      clientPortals: true,
      magicLinkAccess: true,
      statutoryComplianceRadar: true,
      gstWorkflows: true,
      incomeTaxWorkflows: true,
      dscRegister: true,
      statutoryNoticesRegister: true,
      fourEyeReviewGates: true,
      workloadCockpit: true,
      capacityAutoRebalance: true,
      tallySync: true,
      zohoBooksIntegration: true,
      whatsAppReminders: true,
      emailIntake: true,
      customDomainWhitelabel: false,
      enterpriseSso: false,
      dedicatedMigration: "assisted",
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    badge: "Large Partnerships",
    tagline: "Custom scale, dedicated compliance isolation, and white-glove migration for large partnerships.",
    limits: {
      maxClients: "unlimited",
      maxGstClients: "unlimited",
      maxIncomeTaxClients: "unlimited",
      maxAutomations: "unlimited",
      maxIntegrations: "unlimited",
      storageGb: 200,
      maxTeamMembers: "unlimited",
      guestPortalAccounts: "unlimited",
      auditLogRetentionDays: "unlimited",
    },
    features: {
      clientPortals: true,
      magicLinkAccess: true,
      statutoryComplianceRadar: true,
      gstWorkflows: true,
      incomeTaxWorkflows: true,
      dscRegister: true,
      statutoryNoticesRegister: true,
      fourEyeReviewGates: true,
      workloadCockpit: true,
      capacityAutoRebalance: true,
      tallySync: true,
      zohoBooksIntegration: true,
      whatsAppReminders: true,
      emailIntake: true,
      customDomainWhitelabel: true,
      enterpriseSso: true,
      dedicatedMigration: "white-glove",
    },
  },
};

/**
 * Retrieve plan entitlements by plan ID with safe fallback to Pro.
 */
export function getPlanEntitlements(planId: string): PlanEntitlement {
  const normalized = planId.toLowerCase() as PlanTierId;
  return PLAN_ENTITLEMENTS[normalized] || PLAN_ENTITLEMENTS.pro;
}

/**
 * Check if a numerical count satisfies an entitlement limit.
 * Returns true if under limit or if limit is unlimited.
 */
export function isWithinEntitlementLimit(
  currentUsage: number,
  limit: number | "unlimited"
): boolean {
  if (limit === "unlimited") return true;
  return currentUsage < limit;
}

/**
 * Format limit values for UI display.
 */
export function formatEntitlementLimit(
  limit: number | "unlimited",
  unit: string = ""
): string {
  if (limit === "unlimited") return "Unlimited";
  return unit ? `Up to ${limit} ${unit}` : `${limit}`;
}
