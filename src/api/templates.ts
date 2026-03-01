import apiClient from './client';
import { allTemplates } from '../data/templateConfigs';
import type { TemplateConfig } from '../types';

export const getTemplatesApi = async (): Promise<TemplateConfig[]> => {
  try {
    const res = await apiClient.get<TemplateConfig[]>('/templates');
    return res.data;
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

export const uploadTemplateApi = async (file: File): Promise<TemplateConfig> => {
  try {
    const formData = new FormData();
    formData.append('template', file);
    const res = await apiClient.post<TemplateConfig>('/templates/upload', formData);
    return res.data;
  } catch {
    throw new Error('Template upload requires a running backend server');
  }
};
