/**
 * 标准导航项组件
 * 用于在侧边栏中展示可点击的导航选项，支持激活状态、动画效果和工具提示
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarRenderIcon } from "@/utils/SidebarRenderIcon";
import type { SidebarItemType } from "@/types/sidebar";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  SidebarMenuItem
} from "@/components/ui/sidebar";

/**
 * 导航项组件的属性接口
 */
interface NavItemProps {
  item: SidebarItemType;         // 导航项数据，包含标签、图标、链接等信息
  isActive: boolean;             // 当前项是否处于激活状态
  playSound: (path: string) => void; // 播放音效的回调函数
}

/**
 * 导航项组件
 * 渲染侧边栏中的单个导航项，包含图标、文本标签及激活状态动画效果
 */
const NavItem: React.FC<NavItemProps> = ({ item, isActive, playSound }) => {
  // 使用项目的tooltip属性，如果没有则使用label作为提示文本
  const tooltipText = item.tooltip || item.label;
  
  return (
    <Tooltip delayDuration={300}>
      {/* 工具提示触发器 */}
      <TooltipTrigger asChild>
        <SidebarMenuItem className="mb-1.5 relative">
          {/* 当导航项处于激活状态时显示的动画背景 */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-500/20 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-2xl z-0"
              layoutId="activeItem"
              transition={{ 
                type: "spring", 
                stiffness: 320, 
                damping: 30, 
                duration: 0.2
              }}
            />
          )}
          
          {/* 导航链接 */}
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 text-base font-medium tracking-wider rounded-xl z-10 relative",
              "transition-all duration-200 ease-out",
              isActive 
                ? "text-orange-600 dark:text-orange-400" 
                : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            )}
            onClick={() => playSound("/sounds/sidebar-click.mp3")}
            aria-current={isActive ? "page" : undefined}
          >
            {/* 导航图标 */}
            <span className="flex-shrink-0 w-6 h-6">
              {sidebarRenderIcon(item.icon, isActive)}
            </span>
            
            {/* 导航文本 */}
            <span className="pt-0.5">{item.label}</span>
          </Link>
        </SidebarMenuItem>
      </TooltipTrigger>
      
      {/* 工具提示内容 */}
      <TooltipContent 
        side="right" 
        sideOffset={10}
        className="bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm rounded-xl px-3 py-1.5"
      >
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default NavItem;