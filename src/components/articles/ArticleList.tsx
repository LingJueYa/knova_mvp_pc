"use client";

import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import EmptyState from '@/components/ui/EmptyState';
import { BotsContent } from '@/types/bots';

// 组件接收的文章列表属性
interface ArticleListProps {
  articles: (BotsContent & { isFollowed?: boolean })[];
}

// 动画配置
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
      duration: 0.2,
    }
  }
};

// 单个文章卡片动画配置
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 40,
      duration: 0.2
    }
  }
};

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  // 列数状态，默认为3列
  const [columnCount, setColumnCount] = useState(3);
  
  // 根据窗口宽度动态调整列数
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);        // 小屏幕显示1列
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);        // 中等屏幕显示2列
      } else {
        setColumnCount(3);        // 大屏幕显示3列
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 文章列表为空时显示空状态组件
  if (!articles || articles.length === 0) {
    return (
      <EmptyState 
        title="Looking for Great Content"
        message="We're working hard to load quality content for you. Please take a moment to relax. Everything is proceeding as planned..."
      />
    );
  }
  
  // 创建瀑布流布局
  const createMasonryLayout = () => {
    // 初始化列数组，每列包含多篇文章
    const columns: (BotsContent & { isFollowed?: boolean })[][] = Array.from({ length: columnCount }, () => []);
    
    // 分配文章到各列，采用最短列优先策略
    articles.forEach((article) => {
      // 计算每列当前的文章数量
      const columnHeights = columns.map((col) => col.reduce((height) => height + 1, 0));
      
      // 找出当前高度最小的列的索引
      const shortestColumnIndex = columnHeights.reduce(
        (minIndex, height, currentIndex, heights) => 
          height < heights[minIndex] ? currentIndex : minIndex, 
        0
      );
      
      // 将文章添加到最短的列
      columns[shortestColumnIndex].push(article);
    });
    
    return columns;
  };
  
  // 获取瀑布流列数据
  const masonryColumns = createMasonryLayout();

  return (
    <AnimatePresence>
      <motion.div 
        className="flex gap-6 md:gap-8 w-full"
        initial="hidden"
        animate="show"
        variants={container}
        role="region"
        aria-label="Article collection"
      >
        {/* 渲染每一列 */}
        {masonryColumns.map((column, columnIndex) => (
          <div 
            key={`column-${columnIndex}`} 
            className="flex-1 flex flex-col gap-6 md:gap-8"
          >
            {/* 渲染列中的每篇文章 */}
            {column.map((article) => (
              <motion.div 
                key={article.id}
                variants={item}
                layout="position"
                className="w-full" 
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(ArticleList);