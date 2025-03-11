/**
 * 侧边栏菜单区块组件
 * 根据itemType渲染不同类型的菜单项(导航项 或 Bots 项)
 */

import React from "react";
import { motion } from "framer-motion";
import { SidebarMenu } from "@/components/ui/sidebar";
import { itemVariants } from "@/animations/sidebar";
import NavItem from "@/components/sidebar/NavItem";
import BotItem from "@/components/sidebar/BotItem";
import { SidebarItemType, SidebarBotItemType } from "@/types/sidebar";

/**
 * 导航菜单部分的属性接口
 * 用于处理普通导航项目的菜单区块
 */
interface NavMenuSectionProps {
  items: SidebarItemType[];        // 导航项目数组
  itemType: 'nav';                 // 项目类型标识为'nav'
  label: string;                   // 菜单区块的标签文本
  className?: string;              // 可选的额外CSS类名
  pathname: string;                // 当前路径，用于确定活动状态
  playSound: (url: string) => void;// 播放声音的回调函数
}

/**
 * 机器人菜单部分的属性接口
 * 用于处理机器人类型项目的菜单区块
 */
interface BotMenuSectionProps {
  items: SidebarBotItemType[];     // 机器人项目数组
  itemType: 'bot';                 // 项目类型标识为'bot'
  label: string;                   // 菜单区块的标签文本
  className?: string;              // 可选的额外CSS类名
  pathname: string;                // 当前路径，用于确定活动状态
  playSound: (url: string) => void;// 播放声音的回调函数
}

// 联合类型，使组件可以处理两种不同类型的菜单项
type MenuSectionProps = NavMenuSectionProps | BotMenuSectionProps;


const MenuSection = (props: MenuSectionProps) => {
  const { items, itemType, label, className = "py-4 px-3", pathname, playSound } = props;
  
  return (
    <SidebarMenu 
      className={className} 
      aria-label={label}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          {itemType === 'nav' ? (
            // 渲染导航类型项目
            <NavItem 
              item={item as SidebarItemType} 
              isActive={pathname === item.href} 
              playSound={playSound} 
            />
          ) : (
            // 渲染机器人类型项目
            <BotItem 
              bot={item as SidebarBotItemType} 
              isActive={pathname === item.href} 
              playSound={playSound} 
            />
          )}
        </motion.div>
      ))}
    </SidebarMenu>
  );
};

export default MenuSection; 