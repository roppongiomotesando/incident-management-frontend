export type IncidentSeverity = 1 | 2 | 3 | 4 | 5;

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  owner: string;
  source: string;
  trigger?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentDto {
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  owner: string;
  source: string;
  trigger?: string;
}

export interface UpdateIncidentDto {
  title?: string;
  severity?: IncidentSeverity;
  status?: IncidentStatus;
  owner?: string;
  source?: string;
  trigger?: string;
}

// Helper functions for incident management
export const getSeverityLabel = (severity: IncidentSeverity): string => {
  const labels: Record<IncidentSeverity, string> = {
    1: 'Critical',
    2: 'High',
    3: 'Medium',
    4: 'Low',
    5: 'Info'
  };
  return labels[severity];
};

export const getSeverityColor = (severity: IncidentSeverity): string => {
  const colors: Record<IncidentSeverity, string> = {
    1: 'bg-red-600',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-blue-500',
    5: 'bg-gray-500'
  };
  return colors[severity];
};

export const getStatusColor = (status: IncidentStatus): string => {
  const colors: Record<IncidentStatus, string> = {
    open: 'bg-red-500',
    investigating: 'bg-yellow-500',
    resolved: 'bg-green-500',
    closed: 'bg-gray-500'
  };
  return colors[status];
};

export const getStatusLabel = (status: IncidentStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
