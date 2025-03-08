/**
 * 标准导航项组件
 * 用于在侧边栏中展示可点击的导航选项，支持激活状态、动画效果和工具提示
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarRenderIcon } from "@/utils/SidebarRenderIcon";
import type { SidebarItemType } from "@/types/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  SidebarMenuItem,
  SidebarMenuButton
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
          {/* 导航链接 */}
          <Link 
            href={item.href} 
            passHref 
            onClick={() => playSound("/music/nav-click.mp3")}
            aria-current={isActive ? "page" : undefined}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1 rounded-2xl relative z-10"
          >
            {/* 导航按钮 */}
            <SidebarMenuButton 
              isActive={isActive}
              className={`flex items-center gap-2 px-5 py-5 rounded-2xl w-full ${isActive 
                ? '!bg-transparent' 
                : 'hover:bg-gray-50/70 active:bg-gray-100/50 transition-all duration-200'}`}
            >
              {/* 图标容器 */}
              <span className={`flex-shrink-0 w-8 flex items-center justify-center transition-all duration-200 ${
                isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-700'
              }`}>
                {sidebarRenderIcon(item.icon, isActive)}
              </span>
              {/* 文本标签 */}
              <span 
                className={`mr-2 font-medium text-[16px] transition-all duration-200 tracking-wider ${
                  isActive ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {item.label}
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </TooltipTrigger>
      {/* 工具提示内容 */}
      <TooltipContent side="right">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default NavItem; 