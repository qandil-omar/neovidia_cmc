import { mockMedia } from '../data/mockData';
import type { MediaItem } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const getToken = () => localStorage.getItem('neovidia_token');

export const getMediaApi = async (): Promise<MediaItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/media`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return mockMedia;
  }
};

export const uploadMediaApi = async (file: File): Promise<MediaItem> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE_URL}/media/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    await new Promise((r) => setTimeout(r, 600));
    return {
      id: `m-${Date.now()}`,
      filename: file.name,
      originalName: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
  }
};

export const deleteMediaApi = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error();
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
};
