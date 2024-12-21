import { apiClient } from './client';
import { Incident, CreateIncidentDto, UpdateIncidentDto } from '../types/incident';

const BASE_PATH = '/incidents';

export const incidentsApi = {
  // Get all incidents
  getAll: async (): Promise<Incident[]> => {
    const response = await apiClient.get<Incident[]>(BASE_PATH);
    return response.data;
  },

  // Get a single incident by ID
  getById: async (id: string): Promise<Incident> => {
    const response = await apiClient.get<Incident>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  // Create a new incident
  create: async (incident: CreateIncidentDto): Promise<Incident> => {
    const response = await apiClient.post<Incident>(BASE_PATH, incident);
    return response.data;
  },

  // Update an existing incident
  update: async (id: string, incident: UpdateIncidentDto): Promise<Incident> => {
    const response = await apiClient.patch<Incident>(`${BASE_PATH}/${id}`, incident);
    return response.data;
  },

  // Delete an incident
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },

  // Update incident status
  updateStatus: async (id: string, status: Incident['status']): Promise<Incident> => {
    const response = await apiClient.patch<Incident>(`${BASE_PATH}/${id}/status`, { status });
    return response.data;
  },

  // Update incident severity
  updateSeverity: async (id: string, severity: Incident['severity']): Promise<Incident> => {
    const response = await apiClient.patch<Incident>(`${BASE_PATH}/${id}/severity`, { severity });
    return response.data;
  }
};
