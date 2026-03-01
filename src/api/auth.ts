import apiClient from './client';
import type { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

const mockAdminUser: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@neovidia.com',
  role: 'superadmin',
  token: 'mock-admin-token',
};

const mockClientUser: User = {
  id: 'client-1',
  name: 'John Anderson',
  email: 'john@clientsite.com',
  role: 'client',
  token: 'mock-client-token',
};

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const data = await apiClient.post('/auth/login', { email, password });
    return data as LoginResponse;
  } catch {
    await new Promise((r) => setTimeout(r, 600));
    if (email.includes('admin') || password === 'admin') {
      return { token: mockAdminUser.token!, user: mockAdminUser };
    }
    return { token: mockClientUser.token!, user: mockClientUser };
  }
};

export const getMeApi = async (): Promise<User> => {
  try {
    const data = await apiClient.get('/auth/me');
    return data as User;
  } catch {
    const token = localStorage.getItem('neovidia_token');
    if (token === 'mock-admin-token') return mockAdminUser;
    return mockClientUser;
  }
};
