/**
 * 侧边栏机器人项组件
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SidebarBotItemType } from "@/types/sidebar";

import {
  SidebarMenuButton
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

/**
 * 机器人项组件的属性接口
 */
interface BotItemProps {
  bot: SidebarBotItemType;        // 机器人数据，包含名称、头像、链接等信息
  isActive: boolean;              // 当前项是否处于激活状态
  playSound: (path: string) => void; // 播放音效的回调函数
}

const BotItem: React.FC<BotItemProps> = ({ bot, isActive, playSound }) => {
  const { name, avatarUrl, href, status, hasNewMessage } = bot;

  // 根据状态确定头像样式
  const avatarClassName = cn(
    "rounded-[10px] object-cover transition-all duration-300",
    // 根据状态添加样式
    status === "offline" && "filter grayscale opacity-70"
  );

  return (
    <li className={cn("mb-3.5 relative", isActive && "active-item")}>
      {/* 当机器人项处于激活状态时显示的动画背景 */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-500/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-2xl z-0"
          layoutId="activeItem"
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 30,
            mass: 1
          }}
        />
      )}
      {/* 机器人链接 */}
      <Link 
        href={href} 
        passHref
        onClick={() => playSound("/music/nav-click.mp3")}
        aria-current={isActive ? "page" : undefined}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1 rounded-2xl relative z-10"
      >
        {/* 机器人按钮 */}
        <SidebarMenuButton 
          isActive={isActive}
          className={`flex items-center gap-2 px-5 py-5 rounded-2xl w-full ${isActive 
            ? '!bg-transparent' 
            : 'hover:bg-gray-50/70 dark:hover:bg-gray-700/40 active:bg-gray-100/50 dark:active:bg-gray-700/60 transition-all duration-200'}`}
        >
          {/* 头像容器 */}
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center relative">
            {/* 新消息指示器 */}
            {hasNewMessage && (
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#55b685] dark:bg-[#6ece9a] rounded-full z-10 shadow-[0_0_4px_rgba(85,182,133,0.2)] dark:shadow-[0_0_4px_rgba(110,206,154,0.4)]" />
            )}
            
            {/* 头像图片容器 */}
            <div className="relative w-8 h-8 overflow-hidden">
              {/* 机器人头像图片 */}
              <Image 
                src={avatarUrl}
                alt={name}
                fill
                sizes="40px"
                className={cn(
                  avatarClassName,
                  "transition-all duration-300"
                )}
              />
            </div>
          </span>
          
          {/* 机器人名称和状态 */}
          <div className="flex items-center gap-2">
            <span 
              className={`font-medium text-[16px] transition-all duration-200 tracking-widest ${
                isActive 
                  ? 'text-gray-900 dark:text-gray-100' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {name}
            </span>
            
            {/* Busy 状态标签 */}
            {status === "busy" && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded-md bg-white text-orange-500 border border-orange-400 tracking-wider dark:bg-white">
                Busy
              </span>
            )}
          </div>
        </SidebarMenuButton>
      </Link>
    </li>
  );
};

export default BotItem; 