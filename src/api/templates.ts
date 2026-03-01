import apiClient from './client';
import { allTemplates } from '../data/templateConfigs';
import type { TemplateConfig } from '../types';

export const getTemplatesApi = async (): Promise<TemplateConfig[]> => {
  try {
    return await apiClient.get('/templates') as TemplateConfig[];
  } catch {
    return allTemplates;
  }
};

export const activateTemplateApi = async (id: string): Promise<void> => {
  try {
    await apiClient.post(`/templates/${id}/activate`);
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};

export const uploadTemplateApi = async (_file: File): Promise<TemplateConfig> => {
  throw new Error('Template upload requires a running backend server');
};
