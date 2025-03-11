import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleContentProps {
  content: string;
  isExpanded: boolean;
}

/**
 * 文章内容组件
 * 根据展开状态显示完整或部分内容
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ content, isExpanded }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isExpanded ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ 
            opacity: { duration: 0.3 },
            height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
          }}
          className="relative overflow-hidden"
        >
          <motion.div 
            className="text-sm md:text-base text-gray-700 leading-[1.5] dark:text-gray-300 pt-4 tracking-wider"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {content?.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-5 text-sm md:text-[18px] last:mb-2 leading-[1.5] tracking-widest">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="text-sm md:text-[18px] text-gray-700 dark:text-gray-300 line-clamp-3 leading-[1.5] tracking-widest">
            {content}
          </div>
          {/* 渐变遮罩效果 */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleContent; 