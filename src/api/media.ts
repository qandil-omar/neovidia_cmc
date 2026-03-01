import apiClient from './client';
import { mockMedia } from '../data/mockData';
import type { MediaItem } from '../types';

export const getMediaApi = async (): Promise<MediaItem[]> => {
  try {
    const res = await apiClient.get<MediaItem[]>('/media');
    return res.data;
  } catch {
    return mockMedia;
  }
};

export const uploadMediaApi = async (file: File): Promise<MediaItem> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<MediaItem>('/media/upload', formData);
    return res.data;
  } catch {
    await new Promise((r) => setTimeout(r, 600));
    const url = URL.createObjectURL(file);
    return {
      id: `m-${Date.now()}`,
      filename: file.name,
      originalName: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: file.size,
      url,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
  }
};

export const deleteMediaApi = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/media/${id}`);
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
};
