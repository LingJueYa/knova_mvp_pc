"use client";
/**
 * 机器人创建按钮组件
 * 集成全局状态管理
 */

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { botActions, useBotStore } from "@/store/bot";

// 音效播放函数
const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundPath: string) => {
    if (typeof window !== "undefined") {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundPath);
      } else {
        audioRef.current.src = soundPath;
      }
      
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(err => console.error("音效播放失败:", err));
    }
  }, []);

  return { playSound };
};

export function CreateBotButton() {
  const { playSound } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // 获取全局状态
  const { bots, maxBots } = useBotStore();
  
  // 计算剩余可创建数量
  const currentBotCount = bots.length;
  const remainingBots = maxBots - currentBotCount;
  const isLimitReached = remainingBots <= 0;
  
  const handleCreateBot = () => {
    if (!isLimitReached) {
      playSound("/music/login-button.mp3");
      botActions.openCreateDialog();
    }
  };
  
  return (
    <div className="flex flex-col items-center px-5 py-3">
      <div className="relative w-full">
        {/* 多彩光晕效果 - 仅在按钮非禁用状态显示 */}
        <div
          className={cn(
            "absolute -inset-[2px] rounded-full bg-gradient-to-r from-pink-500/60 via-purple-500/60 to-blue-500/60 opacity-0 blur-md transition-all duration-300",
            !isLimitReached && isHovered && "opacity-40",
            !isLimitReached && isPressed && "opacity-60 blur-lg"
          )}
        />
        
        <Button
          variant="outline"
          disabled={isLimitReached}
          className={cn(
            "relative overflow-hidden w-full bg-white dark:bg-secondary border-[#e1e1e1] dark:border-gray-700 text-[#1d1d1f] dark:text-primary",
            "px-5 py-2.5 h-10 rounded-full tracking-wide font-medium text-sm",
            "transition-all duration-300 ease-out",
            "shadow-[0_0_0_rgba(0,0,0,0)]",
            "hover:bg-[#f5f5f7] dark:hover:bg-gray-700 hover:border-[#d2d2d7] dark:hover:border-gray-600 hover:shadow-[0_2px_5px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_2px_5px_rgba(0,0,0,0.2)]",
            "active:scale-[0.98] active:shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:active:shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
            isHovered && !isLimitReached && "bg-[#f5f5f7] dark:bg-gray-800 border-[#d2d2d7] dark:border-gray-600",
            isPressed && !isLimitReached && "scale-[0.98] bg-[#f0f0f2] dark:bg-gray-800/90",
            isLimitReached && "opacity-60 cursor-not-allowed hover:bg-white dark:hover:bg-gray-800 hover:border-[#e1e1e1] dark:hover:border-gray-700 hover:shadow-none active:scale-100"
          )}
          onMouseEnter={() => !isLimitReached && setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => !isLimitReached && setIsPressed(true)}
          onMouseUp={() => !isLimitReached && setIsPressed(false)}
          onClick={handleCreateBot}
        >
          <span className={cn(
            "absolute inset-0 bg-gradient-to-b from-white to-[#f5f5f7] dark:from-gray-700 dark:to-gray-800 opacity-0",
            "transition-opacity duration-300",
            isHovered && !isLimitReached && "opacity-100"
          )} />
          
          <span className="relative flex items-center justify-center">
            {!isLimitReached && (
              <PlusCircle
                className={cn(
                  "mr-2 w-5 h-5 transition-colors duration-300",
                  isHovered ? "text-[#007AFF] dark:text-[#0A84FF]" : "text-[#1d1d1f] dark:text-gray-200"
                )}
                aria-hidden="true"
              />
            )}
            <span className={cn(
              "tracking-wider transition-colors duration-300",
              isHovered && !isLimitReached ? "text-[#007AFF] dark:text-[#0A84FF]" : "text-[#1d1d1f] dark:text-gray-200"
            )}>
              {isLimitReached ? "Bot Limit Reached" : "Create Bot"}
            </span>
          </span>
          
          <span className={cn(
            "absolute inset-0 rounded-full opacity-0",
            "transition-opacity duration-200 ease-out",
            "pointer-events-none",
            "bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]",
            isPressed && !isLimitReached && "opacity-30"
          )} />
        </Button>
      </div>
      
      {/* 底部提示文字 - 仅在未达上限时显示 */}
      {!isLimitReached && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          You can create {remainingBots} more bot{remainingBots !== 1 ? 's' : ''} of {maxBots} total
        </p>
      )}
    </div>
  );
} 