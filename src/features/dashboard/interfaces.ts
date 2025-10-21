export interface DashboardSummary {
  totalApplications: number;
  totalResumes: number;
  averageFitScore: number;
}

export interface DashboardChart {
  labels: string[];
  data: number[];
}

export interface DashboardApplication {
  id: string;
  company: string;
  position: string;
  source?: string;
  status?: string;
  appliedDate?: string | null;
  deadline?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  salary?: number | null;
  createdAt?: string;
  updatedAt?: string;
  notes?: string | null;
  description?: string | null;
}

export interface DashboardTopMatch {
  company: string;
  position: string;
  fitScore: number;
  explanation: Record<string, unknown>;
}

export interface DashboardData {
  summary: DashboardSummary;
  statusChart: DashboardChart;
  applicationsChart: DashboardChart;
  recentApplications: DashboardApplication[];
  topMatches: DashboardTopMatch[];
}
