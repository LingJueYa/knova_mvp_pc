"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ArticleSkeletonProps {
  count?: number;
}

const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/80 dark:shadow-gray-950 relative border border-gray-100 dark:border-gray-800"
        >
          {/* 渐变扫光效果覆盖层 */}
          <div className="absolute inset-0 z-20 overflow-hidden">
            <motion.div
              className="w-full h-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.5,
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
          </div>

          {/* 骨架内容 */}
          <div className="flex flex-col">
            {/* 图片骨架 */}
            <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
            
            {/* 内容骨架 */}
            <div className="p-6 space-y-4">
              {/* 标签骨架 */}
              <div className="flex items-center justify-between">
                <div className="h-7 w-20 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full" />
                {Math.random() > 0.5 && (
                  <div className="h-6 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
                )}
              </div>
              
              {/* 标题骨架 - 两行 */}
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-md w-full" />
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-md w-4/5" />
              </div>
              
              {/* 日期骨架 */}
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-full w-1/3 mt-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleSkeleton;
