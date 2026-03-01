import apiClient from './client';
import { mockSiteSettings, mockNavigation } from '../data/mockData';
import type { SiteSettings, NavigationItem } from '../types';

export const getSettingsApi = async (): Promise<SiteSettings> => {
  try {
    return await apiClient.get('/settings') as SiteSettings;
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
    return await apiClient.get('/navigation') as NavigationItem[];
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
