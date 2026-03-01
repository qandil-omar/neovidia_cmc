import apiClient from './client';
import { mockPages } from '../data/mockData';
import type { Page, PageContent } from '../types';

export const getPagesApi = async (): Promise<Page[]> => {
  try {
    return await apiClient.get('/pages') as Page[];
  } catch {
    return mockPages;
  }
};

export const getPageApi = async (id: string): Promise<Page | undefined> => {
  try {
    return await apiClient.get(`/pages/${id}`) as Page;
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
