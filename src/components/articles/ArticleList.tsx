"use client";

import React, { memo } from 'react';
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
  // 检查文章列表是否为空
  if (!articles || articles.length === 0) {
    return (
      <EmptyState 
        title="Looking for Great Content"
        message="We're working hard to load quality content for you. Please take a moment to relax. Everything is proceeding as planned..."
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        animate="show"
        variants={container}
        role="region"
        aria-label="Article collection"
      >
        {articles.map((article) => (
          <motion.div 
            key={article.id}
            variants={item}
            layout="position"
            className="flex h-full" 
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// 使用 React.memo 优化性能，避免不必要的重新渲染
export default memo(ArticleList);