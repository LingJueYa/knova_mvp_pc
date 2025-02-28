// 输入框内容校验

import { z } from 'zod'

export const chatInputSchema = z.object({
  message: z
    .string()
    .min(1, '请输入内容')
    .max(1000, '内容不能超过1000字')
})

export type ChatInputSchema = z.infer<typeof chatInputSchema> 