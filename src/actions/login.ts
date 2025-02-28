"use server";

import { apiClient } from '@/lib/axios';

interface LoginParams {
  email: string;
  name: string;
  action: "login";
}

export async function syncUserToBackend({ email, name, action }: LoginParams) {
  try {
    const data = await apiClient.post('/api/user', { 
      email, 
      name, 
      action 
    });
    return data;
  } catch (error) {
    console.error('同步用户信息失败:', error);
    throw new Error('同步用户信息失败，请稍后重试');
  }
}
