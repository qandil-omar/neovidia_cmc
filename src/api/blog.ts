import apiClient from './client';
import { mockBlogPosts } from '../data/mockData';
import type { BlogPost } from '../types';

export const getBlogPostsApi = async (): Promise<BlogPost[]> => {
  try {
    const res = await apiClient.get<BlogPost[]>('/blog');
    return res.data;
  } catch {
    return mockBlogPosts;
  }
};

export const saveBlogPostApi = async (post: BlogPost): Promise<BlogPost> => {
  try {
    const res = post.id
      ? await apiClient.put<BlogPost>(`/blog/${post.id}`, post)
      : await apiClient.post<BlogPost>('/blog', post);
    return res.data;
  } catch {
    await new Promise((r) => setTimeout(r, 400));
    return { ...post, id: post.id || `post-${Date.now()}` };
  }
};

export const deleteBlogPostApi = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/blog/${id}`);
  } catch {
    await new Promise((r) => setTimeout(r, 300));
  }
};
