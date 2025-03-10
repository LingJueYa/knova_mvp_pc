/**
 * 分割线标题组件
 * 用于显示侧边栏中各个区域的标题，包含文本和分隔线，支持淡入动画效果
 */

import React from "react";
import { motion } from "framer-motion";
import { SidebarSeparator } from "@/components/ui/sidebar";

/**
 * 区域标题组件的属性接口
 */
interface SectionTitleProps {
  title: string;      // 标题文本内容
  className?: string; // 可选的自定义CSS类名
}

const SectionTitle = ({ title, className = "px-6 pb-3" }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={className} 
      role="separator"
      aria-orientation="horizontal" 
    >
      <div className="flex items-center">
        {/* 标题文本 */}
        <span 
          className="text-xs font-semibold text-gray-500 dark:text-primary uppercase tracking-widest" 
          style={{ fontSize: '11px', letterSpacing: '0.1em' }}  // 精细控制字体大小和字间距
        >
          {title}
        </span>
        {/* 分隔线 */}
        <div className="ml-2 flex-grow">
          <SidebarSeparator className="bg-gray-200/80 dark:bg-primary/60 h-[0.5px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default SectionTitle; 