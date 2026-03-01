import apiClient from './client';
import { mockSiteSettings, mockNavigation } from '../data/mockData';
import type { SiteSettings, NavigationItem } from '../types';

export const getSettingsApi = async (): Promise<SiteSettings> => {
  try {
    const res = await apiClient.get<SiteSettings>('/settings');
    return res.data;
  } catch {
    return mockSiteSettings;
  }
};

export const saveSettingsApi = async (settings: Partial<SiteSettings>): Promise<void> => {
  try {
    await apiClient.put('/settings', settings);
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};

export const getNavigationApi = async (): Promise<NavigationItem[]> => {
  try {
    const res = await apiClient.get<NavigationItem[]>('/navigation');
    return res.data;
  } catch {
    return mockNavigation;
  }
};

export const saveNavigationApi = async (items: NavigationItem[]): Promise<void> => {
  try {
    await apiClient.put('/navigation', { items });
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};
