"use client";

import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import EmptyState from '@/components/ui/EmptyState';
import { BotsContent } from '@/types/bots';

interface ArticleListProps {
  articles: (BotsContent & { isFollowed?: boolean })[];
}

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
  const [columnCount, setColumnCount] = useState(3);
  
  // 根据窗口宽度动态调整列数
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };
    
    handleResize(); // 初始化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 检查文章列表是否为空
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
    // 创建每列的文章数组
    const columns: (BotsContent & { isFollowed?: boolean })[][] = Array.from({ length: columnCount }, () => []);
    
    // 分配文章到各列，采用最短列优先策略
    articles.forEach((article) => {
      // 找出当前高度最小的列
      const shortestColumnIndex = columns
        .map((col) => col.reduce((height) => height + 1, 0))
        .reduce((minIndex, height, currentIndex, heights) => 
          height < heights[minIndex] ? currentIndex : minIndex, 0);
      
      // 将文章添加到最短的列
      columns[shortestColumnIndex].push(article);
    });
    
    return columns;
  };
  
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
        {masonryColumns.map((column, columnIndex) => (
          <div 
            key={`column-${columnIndex}`} 
            className="flex-1 flex flex-col gap-6 md:gap-8"
          >
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

// 使用 React.memo 优化性能，避免不必要的重新渲染
export default memo(ArticleList);