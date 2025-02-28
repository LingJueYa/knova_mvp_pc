"use client";

import { Bot } from "@/types/bot";
import { toggleBot } from "@/actions/bot";
import { useState } from "react";

interface BotCardProps {
  bot: Bot;
  onDelete: (botId: string) => void;
  updateBotState: (updater: (prevBots: Bot[]) => Bot[]) => void;
}

export function BotCard({ bot, onDelete, updateBotState }: BotCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleBot(bot.id, bot.is_active ? 'stop' : 'start');
      updateBotState(prevBots => 
        prevBots.map(b => 
          b.id === bot.id ? { ...b, is_active: !b.is_active } : b
        )
      );
    } catch (error) {
      console.error('切换状态失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border" role="region" aria-labelledby={`bot-${bot.id}`}>
      <h3 className="text-lg font-medium" id={`bot-${bot.id}`}>{bot.name || '未命名助手'}</h3>
      <p className="text-sm text-gray-500 mt-1">{bot.topics}</p>
      <p className="text-sm text-gray-500 mt-1">逻辑限制: {bot.logic_limits || '无'}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`px-3 py-1 rounded-md ${
            bot.is_active 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
          aria-live="polite"
        >
          {isLoading ? '处理中...' : (bot.is_active ? '暂停' : '启动')}
        </button>
        <button
          onClick={() => onDelete(bot.id)}
          className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
          aria-label={`删除 ${bot.name || '未命名助手'}`}
        >
          删除
        </button>
      </div>
    </div>
  );
}
