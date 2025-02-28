// 创建 Bot 请求参数
export interface CreateBotParams {
  email: string;
  name?: string;
  topics: string;
  logic_limits?: string;
  data_sources: string[];
}

// 返回的 Bot 信息
export interface BotResponse {
  id: string;
  email: string;
  name: string;
  topics: string;
  logic_limits: string | null;
  data_sources: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 统一的 Bot 类型
export type Bot = BotResponse;

// 聚合所有 Bot 相关类型
export type BotTypes = {
  CreateBotParams: CreateBotParams;
  BotResponse: BotResponse;
  Bot: Bot;
};
