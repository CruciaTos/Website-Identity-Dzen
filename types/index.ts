// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Stats / Credibility ─────────────────────────────────────────────────────
export interface Stat {
  value: string;
  accent: string;
  label: string;
  description: string;
}

// ─── Services ────────────────────────────────────────────────────────────────
export interface Service {
  num: string;
  title: string;
  description: string;
  scope: string;
  duration: string;
}

// ─── Case Studies ────────────────────────────────────────────────────────────
export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  tag: string;
  headline: string;
  body: string;
  metrics: CaseMetric[];
  industry: string;
  featured?: boolean;
}

// ─── Systems ─────────────────────────────────────────────────────────────────
export interface SystemCategory {
  icon: string;   // SVG path data
  name: string;
  items: string[];
}

// ─── Process Steps ───────────────────────────────────────────────────────────
export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  duration: string;
}

// ─── Security Pillars ────────────────────────────────────────────────────────
export interface SecurityPillar {
  icon: string;   // SVG path data
  title: string;
  description: string;
  badge: string;
}

// ─── Testimonials ────────────────────────────────────────────────────────────
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// ─── Workflow nodes ──────────────────────────────────────────────────────────
export interface WorkflowNode {
  label: string;
  name: string;
}

// ─── Target Areas ────────────────────────────────────────────────────────────
export interface TargetArea {
  icon: string;
  title: string;
  description: string;
  painPoints: string[];
  potential: number; // 0-100, automation-potential score
}

// ─── Optimisation Comparison ─────────────────────────────────────────────────
export interface ComparisonMetric {
  value: string;
  percent: number; // 0-100, relative bar width
}

export interface ComparisonRow {
  label: string;
  before: ComparisonMetric;
  after: ComparisonMetric;
  improvement: string;
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
  note?: string;
}
