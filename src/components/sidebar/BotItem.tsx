/**
 * 侧边栏机器人项组件
 * 用于展示可点击的机器人选项，支持激活状态、头像显示和动画效果
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SidebarBotItemType } from "@/types/sidebar";

import {
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

/**
 * 机器人项组件的属性接口
 */
interface BotItemProps {
  bot: SidebarBotItemType;        // 机器人数据，包含名称、头像、链接等信息
  isActive: boolean;              // 当前项是否处于激活状态
  playSound: (path: string) => void; // 播放音效的回调函数
}

/**
 * 机器人项组件
 * 渲染侧边栏中的单个机器人项，包含头像、名称及激活状态动画效果
 */
const BotItem: React.FC<BotItemProps> = ({ bot, isActive, playSound }) => {
  return (
    <SidebarMenuItem className="mb-3.5 relative">
      {/* 当机器人项处于激活状态时显示的动画背景 */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-white border border-orange-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl z-0"
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
        href={bot.href} 
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
            : 'hover:bg-gray-50/70 active:bg-gray-100/50 transition-all duration-200'}`}
        >
          {/* 头像容器 */}
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {/* 头像图片容器，激活状态有额外的环形高亮 */}
            <div className={`w-6 h-6 rounded-md overflow-hidden relative ${
              isActive ? 'ring-2 ring-orange-300 ring-opacity-70' : ''
            }`}>
              {/* 机器人头像图片，激活状态有放大效果 */}
              <Image 
                src={bot.avatarUrl}
                alt=""
                fill
                sizes="24px"
                className={`object-cover transition-transform duration-300 ${
                  isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                }`}
              />
            </div>
          </span>
          {/* 机器人名称 */}
          <span 
            className={`font-medium text-[16px] transition-all duration-200 tracking-widest ${
              isActive ? 'text-gray-900' : 'text-gray-700'
            }`}
          >
            {bot.name}
          </span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

export default BotItem; 