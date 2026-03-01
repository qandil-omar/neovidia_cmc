import apiClient from './client';
import { mockLeads } from '../data/mockData';
import type { Lead } from '../types';

export const getLeadsApi = async (): Promise<Lead[]> => {
  try {
    return await apiClient.get('/leads') as Lead[];
  } catch {
    return mockLeads;
  }
};

export const updateLeadStatusApi = async (id: string, status: Lead['status']): Promise<void> => {
  try {
    await apiClient.put(`/leads/${id}`, { status });
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
};

export const deleteLeadApi = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/leads/${id}`);
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
};
