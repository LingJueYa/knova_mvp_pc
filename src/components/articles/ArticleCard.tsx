"use client";

import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { BotsContent } from '@/types/bots';
import { useSidebarSound } from '@/hooks/useSidebarSound';
import { formatDate } from '@/utils/dateFormatter';
import TimelineView from './TimelineView';
import ArticleContent from './ArticleContent';
import { useArticleInteraction } from '@/hooks/useArticleInteraction';

// 文章卡片属性接口，扩展自BotsContent
interface ArticleCardProps {
  article: BotsContent & { 
    isFollowed?: boolean;
    summary?: string; // 文章摘要
    cardType?: 'image' | 'text' | 'timeline'; // 卡片类型
    isTimeline?: boolean;
    timelineEvents?: {
      id: string;
      title: string;
      description?: string;
      timestamp: string;
      iconType?: 'start' | 'normal' | 'important' | 'milestone' | 'end';
    }[];
    engagement?: {
      likes?: number;
      comments?: number;
      shares?: number;
      isLiked?: boolean;
      isBookmarked?: boolean;
    };
  };
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onBookmark?: (id: string) => void;
}

/**
 * 文章卡片组件
 * 支持三种类型：图片卡片、文本卡片和时间线卡片
 */
const ArticleCard: React.FC<ArticleCardProps> = ({ article, onLike, onComment, onShare, onBookmark }) => {
  // 基础状态管理
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 使用自定义Hook管理社交互动状态
  const {
    isLiked,
    isBookmarked,
    likes,
    comments,
    shares,
    handleLike,
    handleComment,
    handleShare,
    handleBookmark
  } = useArticleInteraction({
    initialEngagement: article.engagement || {
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false
    },
    onLike,
    onComment,
    onShare,
    onBookmark,
    articleId: article.id
  });
  
  // 获取声音效果Hook
  const { playSound } = useSidebarSound();

  // 辅助变量 - 卡片类型
  const hasImage = article.cardType === 'image' && !!article.imageUrl;
  const isTimeline = article.cardType === 'timeline';
  
  // 点击卡片处理函数
  const handleCardClick = useCallback(() => {
    playSound('/music/article.mp3');
    setIsExpanded(!isExpanded);
  }, [isExpanded, playSound]);
  
  // 卡片动画配置
  const cardVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      scale: 1.01,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)"
    },
    tap: { 
      scale: 0.99 
    },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25
      }
    }
  };

  // 卡片展开/收起按钮处理函数
  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex items-start">
      <motion.div 
        className="w-full bg-white dark:bg-gray-950 rounded-xl px-5 pt-5 pb-2 md:px-6 md:pt-6 md:pb-3 overflow-hidden border border-gray-100 dark:border-gray-900 cursor-pointer group"
        initial="initial"
        animate="animate"
        whileHover={!isExpanded ? "hover" : undefined}
        whileTap={!isExpanded ? "tap" : undefined}
        variants={cardVariants}
        layout={true}
        layoutId={`article-card-${article.id}`}
        onClick={handleCardClick}
      >
        {/* 条件渲染图片部分 */}
        {hasImage && (
          <div className="relative -mx-5 -mt-5 md:-mx-6 md:-mt-6 h-56 mb-6 overflow-hidden">
            <div className="absolute inset-0">
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-orange-50 via-amber-100 to-rose-100 dark:from-orange-950/40 dark:via-amber-900/30 dark:to-rose-900/40 animate-gradient-slow flex items-center justify-center bg-[length:200%_200%]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" 
                    className="w-10 h-10 text-orange-400/70 dark:text-orange-300/50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={article.imageUrl!}
                  alt={article.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={article.grade === 'high'}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>
        )}
        
        <div className="w-full">
          {/* 标签和重要等级 */}
          <div className="flex justify-between items-center mb-2">
            {/* 重要等级徽章 */}
            <div className="flex gap-2 items-center">
              <span 
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                  ${article.grade === 'high' 
                    ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400' 
                    : article.grade === 'medium' 
                      ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400' 
                      : 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                  }`}
              >
                {article.grade === 'high' ? 'High' : article.grade === 'medium' ? 'Medium' : 'Low'}
              </span>
              
              {/* 关注状态 */}
              {article.isFollowed && (
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium dark:bg-green-950/30 dark:text-green-400">
                  Followed
                </span>
              )}
            </div>
          </div>
          
          {/* 文章标题 */}
          <motion.h2 
            className="font-semibold text-base md:text-lg mb-4 leading-snug text-gray-900 dark:text-white tracking-wide"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {article.title}
          </motion.h2>
          
          {/* 文章内容 - 根据卡片类型渲染不同内容 */}
          {!isTimeline && article.content && (
            <ArticleContent content={article.content} isExpanded={isExpanded} />
          )}
          
          {/* 时间线内容 */}
          {isTimeline && article.timelineEvents && (
            <TimelineView events={article.timelineEvents} isExpanded={isExpanded} />
          )}
          
          {/* 作者信息和交互元素 */}
          <div className="flex flex-col mt-6 border-t border-gray-100 dark:border-gray-900 pt-4">
            {/* 上行：Bot名称和展开/收起按钮 */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white tracking-wide">
                {article.botName || 'AI Assistant'}
              </span>
              
              {/* 展开/收起按钮 */}
              <motion.button 
                onClick={handleExpandToggle}
                className={`text-sm font-medium flex items-center px-3 py-1 rounded-full whitespace-nowrap transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
              >
                {isExpanded ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    <span className="tracking-wide">Close</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
            
            {/* 下行：时间信息 */}
            <time dateTime={article.createdAt} className="text-base text-gray-500 dark:text-gray-400 tracking-wider font-normal">
              {formatDate(article.createdAt)}
            </time>
          </div>
        </div>
        
        {/* 社交互动区域 */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-900">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isLiked
                  ? "text-rose-600 dark:text-rose-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isLiked && "fill-current scale-110"
                }`}
              />
              <span className="text-xs font-medium">{likes}</span>
            </button>
            
            <button
              type="button"
              onClick={handleComment}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">{comments}</span>
            </button>
            
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-medium">{shares}</span>
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-all ${
              isBookmarked 
                ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" 
                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Bookmark className={`w-4 h-4 transition-transform ${
              isBookmarked && "fill-current scale-110"
            }`} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(ArticleCard);
