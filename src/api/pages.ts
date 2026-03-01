import apiClient from './client';
import { mockPages } from '../data/mockData';
import type { Page, PageContent } from '../types';

export const getPagesApi = async (): Promise<Page[]> => {
  try {
    const res = await apiClient.get<Page[]>('/pages');
    return res.data;
  } catch {
    return mockPages;
  }
};

export const getPageApi = async (id: string): Promise<Page | undefined> => {
  try {
    const res = await apiClient.get<Page>(`/pages/${id}`);
    return res.data;
  } catch {
    return mockPages.find((p) => p.id === id);
  }
};

export const savePageContentApi = async (id: string, content: PageContent): Promise<void> => {
  try {
    await apiClient.put(`/pages/${id}/content`, { content });
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};
