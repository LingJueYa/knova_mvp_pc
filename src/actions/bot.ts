"use server";

import { apiClient } from '@/lib/axios';
import { type BotResponse, type CreateBotParams, type Bot } from '@/types/bot';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

// 获取当前认证用户的邮箱地址
// 如果用户未认证或邮箱不存在则抛出错误
async function getCurrentUserEmail(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('未认证的用户');
  }
  
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;
  
  if (!email) {
    throw new Error('未找到用户邮箱');
  }
  
  return email;
}

// 后端 API 返回的机器人数据结构
interface BotServerResponse {
  ID: string;
  Name: string;
  Email: string;
  Topics: string;
  LogicLimits?: string;
  DataSources: string;
  IsActive: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;
}

// 将后端数据结构转换为前端使用的格式
function transformBotResponse(data: BotServerResponse): Bot {
  return {
    id: data.ID,
    name: data.Name,
    email: data.Email,
    topics: data.Topics,
    logic_limits: data.LogicLimits || null,
    data_sources: data.DataSources,
    is_active: data.IsActive,
    created_at: data.CreatedAt || new Date().toISOString(),
    updated_at: data.UpdatedAt || new Date().toISOString()
  };
}

// 创建新的机器人助手
export async function createBot(params: CreateBotParams): Promise<BotResponse> {
  try {
    const email = await getCurrentUserEmail();
    const { data } = await apiClient.post(
      '/api/bot/create', 
      { ...params, email },
      { headers: { 'X-User-Email': email } }
    );
    
    console.log('[Bot Action] 创建助手响应:', data);
    return transformBotResponse(data);
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown }; message: string };
    console.error('创建助手失败:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    throw new Error('创建助手失败，请稍后重试');
  }
}

// 删除指定的机器人助手
export async function deleteBot(botId: string): Promise<void> {
  try {
    const email = await getCurrentUserEmail();
    await apiClient.post(
      '/api/bot/delete', 
      { bot_id: botId, email },
      { headers: { 'X-User-Email': email } }
    );
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown }; message: string };
    console.error('删除助手失败:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    throw new Error('删除助手失败，请稍后重试');
  }
}

// 切换机器人助手的运行状态（启动/停止）
export async function toggleBot(
  botId: string, 
  action: 'start' | 'stop'
): Promise<void> {
  try {
    const email = await getCurrentUserEmail();
    await apiClient.post(
      '/api/bot/toggle', 
      { bot_id: botId, email, action },
      { headers: { 'X-User-Email': email } }
    );
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown }; message: string };
    console.error('更新助手状态失败:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    throw new Error('更新助手状态失败，请稍后重试');
  }
}

// 获取当前用户的所有机器人助手列表
export async function listBots(): Promise<BotResponse[]> {
  try {
    const email = await getCurrentUserEmail();
    const { data } = await apiClient.post(
      '/api/bot/list', 
      { email }, 
      { headers: { 'X-User-Email': email } }
    );

    console.log('[Bot Action] 获取助手列表响应:', data);

    // 处理直接返回的数组数据
    if (Array.isArray(data)) {
      return data.map(transformBotResponse);
    }
    
    // 处理嵌套在 data 字段中的数组数据
    if (data && Array.isArray(data.data)) {
      return data.data.map(transformBotResponse);
    }
    
    return [];
  } catch (error: unknown) {
    const err = error as { 
      response?: { 
        status: number; 
        data: unknown 
      }; 
      message: string 
    };
    console.error('获取助手列表失败:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    throw new Error('获取助手列表失败，请稍后重试');
  }
}
