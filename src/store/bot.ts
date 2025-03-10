/**
 * Bot 全局状态管理
 * TODO：待定方案
 */

import { proxy, useSnapshot } from 'valtio';
import { SidebarBotItemType } from '@/types/sidebar';
import { mockBots } from '@/data/mock/bot';

// 定义Bot状态类型
interface BotStore {
  // Bot列表
  bots: SidebarBotItemType[];
  // 弹窗状态
  createDialogOpen: boolean;
  // 当前选中的Bot ID
  selectedBotId: string | null;
  // 加载状态
  isLoading: boolean;
  // 最大Bot数量限制
  maxBots: number;
}

// 创建全局状态
export const botStore = proxy<BotStore>({
  bots: mockBots,
  createDialogOpen: false,
  selectedBotId: null,
  isLoading: false,
  maxBots: 5
});

// Bot 操作方法
export const botActions = {
  // 打开创建Bot弹窗
  openCreateDialog: () => {
    botStore.createDialogOpen = true;
  },
  
  // 关闭创建Bot弹窗
  closeCreateDialog: () => {
    botStore.createDialogOpen = false;
  },
  
  // 创建新Bot
  createBot: (newBot: Omit<SidebarBotItemType, 'id'>) => {
    // 随机生成Bot ID
    const id = `bot${Date.now()}`;
    
    // 设置加载状态
    botStore.isLoading = true;
    
    // 模拟API请求延迟
    setTimeout(() => {
      // 添加新Bot到列表
      botStore.bots = [
        ...botStore.bots,
        { id, ...newBot }
      ];
      
      // 重置加载状态
      botStore.isLoading = false;
      
      // 关闭弹窗
      botStore.createDialogOpen = false;
    }, 800);
  },
  
  // 选择Bot
  selectBot: (id: string) => {
    botStore.selectedBotId = id;
  },
  
  // 删除Bot
  deleteBot: (id: string) => {
    botStore.bots = botStore.bots.filter(bot => bot.id !== id);
    
    // 如果删除的是当前选中的Bot，重置选中状态
    if (botStore.selectedBotId === id) {
      botStore.selectedBotId = null;
    }
  }
};

// 自定义Hook便于组件使用
export function useBotStore() {
  return useSnapshot(botStore);
} 