export type StandardStatus = 'CURRENT' | 'SUPERSEDED' | 'AMENDMENT_AVAILABLE' | 'REVIEW_REQUIRED';

export type AnalysisStatus = 'Completed' | 'In Progress' | 'Needs Review';

export type ComplianceStatus = 'Applicable' | 'Complete' | 'Review Required' | 'Missing';

export type RelationshipType =
  | 'Normative Reference'
  | 'Test Method'
  | 'Terminology Standard'
  | 'Safety Standard'
  | 'Installation Standard'
  | 'Related Product Standard';

export interface Standard {
  id: string;
  isNumber: string;
  title: string;
  category: string;
  industry: string;
  standardType: string;
  status: StandardStatus;
  year: string;
  latestAmendment: string;
  scope: string;
  requirements: string[];
  testMethods: string[];
  normativeReferences: string[];
  relatedStandards: string[];
  certificationRequirements: string[];
  relevance?: number;
  matchReasons?: string[];
}

export interface RelatedStandard {
  isNumber: string;
  title: string;
  relationship: RelationshipType;
  status: StandardStatus;
}

export interface Amendment {
  id: string;
  isNumber: string;
  title: string;
  previousVersion: string;
  latestVersion: string;
  status: StandardStatus;
  message: string;
  timeline: { year: string; label: string }[];
}

export interface ComplianceItem {
  id: string;
  name: string;
  applicability: ComplianceStatus;
  explanation: string;
  relatedStandard: string;
}

export interface AnalysisRecord {
  id: string;
  specification: string;
  product: string;
  standardsFound: number;
  related: number;
  alerts: number;
  certification: number;
  date: string;
  status: AnalysisStatus;
  confidence?: number;
  recommendedStandards?: number;
  alliedStandards?: number;
}

export interface Notification {
  id: string;
  type: 'amendment' | 'superseded' | 'analysis' | 'new_standard' | 'certification';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  status: 'success' | 'warning' | 'danger' | 'info';
  icon: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface SuggestedImprovement {
  id: string;
  title: string;
  description: string;
  icon: string;
}
