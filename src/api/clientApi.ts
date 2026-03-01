import apiClient from './client';
import { mockClientAccount } from '../data/mockData';
import type { ClientAccount, ClientPermissions } from '../types';

export const getClientAccountApi = async (): Promise<ClientAccount> => {
  try {
    const res = await apiClient.get<ClientAccount>('/client');
    return res.data;
  } catch {
    return mockClientAccount;
  }
};

export const updateClientPermissionsApi = async (permissions: ClientPermissions): Promise<void> => {
  try {
    await apiClient.put('/client/permissions', { permissions });
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};

export const updateClientAccountApi = async (data: Partial<ClientAccount>): Promise<void> => {
  try {
    await apiClient.put('/client', data);
  } catch {
    await new Promise((r) => setTimeout(r, 400));
  }
};
