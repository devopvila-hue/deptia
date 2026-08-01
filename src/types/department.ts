export type DepartmentStatus = "available" | "coming-soon";

export interface DepartmentMember {
  id: string;
  role: string;
  initials: string;
  pattern: "wave" | "grid" | "orbit" | "spiral" | "bars" | "dots";
  responsibilities: string[];
}

export type PermissionLevel = "can" | "approval" | "never";

export interface PermissionItem {
  action: string;
  level: PermissionLevel;
  example: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  duration: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IntegrationRef {
  name: string;
  category: "communication" | "productivity" | "crm" | "social" | "design" | "storage";
  color: string;
  reads: string;
  prepares: string;
  requiresApproval: string;
}

export interface Department {
  slug: string;
  name: string;
  shortName: string;
  promise: string;
  description: string;
  tagline: string;
  category: string;
  status: DepartmentStatus;
  priceFrom: number;
  priceCurrency: string;
  metrics: { label: string; value: string }[];
  members: DepartmentMember[];
  capabilities: string[];
  deliverables: string[];
  problems: { title: string; description: string }[];
  integrations: string[];
  workflow: WorkflowStep[];
  permissions: PermissionItem[];
  faq: FAQItem[];
  mission: {
    brief: string;
    response: string;
    tasks: string[];
  };
  color: {
    base: string;
    accent: string;
  };
  ordering: number;
  /** Optional asset overrides — falls back to `/departments/{slug}/{hero|team|output}.png` */
  assets?: {
    hero?: string;
    team?: string;
    output?: string;
  };
}

export interface PricingPlan {
  slug: string;
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
  currency: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  badge?: string;
}
