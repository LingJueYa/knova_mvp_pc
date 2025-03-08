/**
 * 侧边栏工具函数
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { getIconComponent } from "@/data/icons-config";

/**
 * 渲染图标的辅助函数
 * 根据不同的图标类型提供相应的渲染逻辑
 * 支持动态切换活跃/非活跃状态
 * 
 * @param iconName - 图标名称，用于从配置中获取图标
 * @param isActive - 当前图标是否处于活跃状态
 * @returns 渲染好的图标元素
 */
export const sidebarRenderIcon = (iconName: string, isActive: boolean = false) => {
  const icon = getIconComponent(iconName);
  
  if (!icon) return null;
  
  // 使用配置的光晕颜色或默认颜色
  const glowColor = icon.glowColor || "rgba(253, 161, 114, 0.6)";
  
  // 处理带有活跃状态的SVG图标
  if (icon.default && icon.active) {
    return (
      <div className="relative w-6 h-6 flex items-center justify-center" aria-hidden="true">
        <div className={`absolute flex items-center justify-center w-full h-full transition-opacity duration-300 ease-out ${isActive ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={icon.default}
            alt={iconName}
            width={24}
            height={24}
            className="w-[24px] h-[24px] object-contain"
          />
        </div>
        <motion.div 
          className={`absolute flex items-center justify-center w-full h-full transition-opacity duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
          animate={isActive ? {
            filter: `drop-shadow(0 0 3px ${glowColor})`
          } : {}}
        >
          <Image
            src={icon.active}
            alt={iconName}
            width={24}
            height={24}
            className="w-[24px] h-[24px] object-contain"
          />
        </motion.div>
      </div>
    );
  }
  
  // 处理普通图标，添加活跃状态样式
  const IconComponent = icon.component as IconType;
  
  if (isActive) {
    return (
      <motion.div
        animate={{
          filter: `drop-shadow(0 0 3px ${glowColor})`
        }}
      >
        <IconComponent 
          size={20} 
          className="text-orange-500 transition-all duration-300" 
          aria-hidden="true" 
        />
      </motion.div>
    );
  }
  
  return (
    <IconComponent 
      size={20} 
      className="text-gray-500 transition-all duration-300" 
      aria-hidden="true" 
    />
  );
}; 