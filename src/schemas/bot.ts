/**
 * Bot 表单验证规则
 */

import { z } from 'zod';

// Bot 创建表单验证规则
export const createBotSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter a bot name')
    .max(50, 'Bot name cannot exceed 50 characters'),
  theme: z
    .string()
    .min(1, 'Please enter a bot theme'),
  avatarUrl: z
    .string()
    .optional()
    .default('/mock/default-bot.jpg'),
  status: z
    .enum(['online', 'offline', 'busy'])
    .optional()
    .default('online'),
  hasNewMessage: z
    .boolean()
    .optional()
    .default(false)
});

// 导出类型定义
export type CreateBotSchema = z.infer<typeof createBotSchema>;

// Bot 编辑表单验证规则
export const editBotSchema = createBotSchema.extend({
  id: z.string()
});

export type EditBotSchema = z.infer<typeof editBotSchema>; 