"use client";

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroBadge from '@/components/ui/hero-badge'
import { TentIcon } from "@/components/icons/TentIcon"
import ArticleList from '@/components/articles/ArticleList';
import ArticleSkeleton from '@/components/skeleton/ArticleSkeleton';
import { userBotsContents, communityContents } from '@/data/mock/home';
import { BotsContent } from '@/types/bots';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [allContent, setAllContent] = useState<Array<BotsContent & { isFollowed?: boolean }>>([]);
  
  // 模拟数据加载
  useEffect(() => {
    const fetchData = async () => {
      // 真实项目中这里会是实际的 API 请求
      await new Promise(resolve => setTimeout(resolve, 800)); // 模拟网络延迟
      
      // 合并数据，标记关注内容
      const combinedContent = [
        ...userBotsContents.map(item => ({ ...item, isFollowed: true })),
        ...communityContents.map(item => ({ ...item, isFollowed: false }))
      ];
      
      setAllContent(combinedContent);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  return (
    <div className='w-full h-fit min-h-screen overflow-y-auto bg-[#FAFAFA] text-gray-900'>
      <motion.div 
        className="w-full max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Slogan */}
        <HeroBadge
          text="Talk is cheap. Show me the data."
          icon={<TentIcon className="h-4 w-4" />}
        />
        
        <div className='px-6 md:px-8 lg:px-10 pb-16'>
          {/* 所有内容 */}
          <motion.section 
            className="mt-6 md:mt-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mt-6">
              {isLoading ? (
                <ArticleSkeleton count={6} />
              ) : (
                <ArticleList articles={allContent} />
              )}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  )
}
