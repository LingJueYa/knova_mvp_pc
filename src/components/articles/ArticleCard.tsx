"use client";

import React, { memo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { BotsContent } from '@/types/bots';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

// 扩展 BotsContent 类型，增加 isFollowed 属性
interface ArticleCardProps {
  article: BotsContent & { 
    isFollowed?: boolean;
    summary?: string; // 添加可选的summary属性
    cardType?: 'image' | 'text' | 'timeline'; // 添加cardType属性
    isTimeline?: boolean;
    timelineEvents?: {
      id: string;
      title: string;
      description?: string;
      timestamp: string;
      iconType?: 'milestone' | 'release' | 'update';
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

// 格式化日期函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // 计算时间差（毫秒）
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) {
    // 不到一天，显示 xx h xx m ago
    const hours = diffInHours;
    const minutes = diffInMinutes - (diffInHours * 60);
    
    if (hours === 0) {
      return `${minutes} m ago`;
    } else if (minutes === 0) {
      return `${hours} h ago`;
    } else {
      return `${hours} h ${minutes} m ago`;
    }
  } else if (diffInDays < 7) {
    // 1-7天内，显示 xx d ago
    return `${diffInDays} d ago`;
  } else {
    // 超过一周，显示完整日期（使用美国标准格式）
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
};

// 格式化时间线日期函数
const formatTimelineDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onLike, onComment, onShare, onBookmark }) => {
  // 状态控制
  const [isExpanded, setIsExpanded] = useState(false);
  // 添加图片加载状态
  const [imageError, setImageError] = useState(false);
  // 添加社交互动状态
  const [isLiked, setIsLiked] = useState(article.engagement?.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState(article.engagement?.isBookmarked ?? false);
  const [likes, setLikes] = useState(article.engagement?.likes ?? 0);
  const [comments, setComments] = useState(article.engagement?.comments ?? 0);
  const [shares, setShares] = useState(article.engagement?.shares ?? 0);
  
  // ----- Refs & 辅助变量 -----
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: timelineContainerRef
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 1]);
  
  // 卡片类型辅助变量
  const hasImage = article.cardType === 'image' && !!article.imageUrl;
  const isTimeline = article.cardType === 'timeline';
  
  // ----- 动画相关配置 -----
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

  // 处理卡片点击
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  
  // ----- 渲染辅助组件 -----
  
  // 渲染时间线组件
  const renderTimeline = () => {
    if (!isTimeline) return null;
    
    return (
      <div className={`relative ${isExpanded ? "h-96" : "h-64"} overflow-hidden transition-all duration-300`}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" />
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" 
        />
        
        <div 
          ref={timelineContainerRef}
          className="h-full overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600"
        >
          <div className="relative ml-4 border-l-2 border-gray-200 dark:border-gray-800 rounded-b-lg pb-2 pt-4">
            {article.timelineEvents?.map((event, index) => (
              <motion.div 
                key={event.id}
                className="mb-5 last:mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="flex flex-col relative">
                  <span 
                    className={`absolute -left-[22px] w-10 h-10 flex items-center justify-center rounded-full
                      ${event.iconType === 'milestone' ? 'bg-orange-50 dark:bg-orange-950/30' : 
                        event.iconType === 'release' ? 'bg-blue-50 dark:bg-blue-950/30' : 
                        event.iconType === 'update' ? 'bg-purple-50 dark:bg-purple-950/30' : 
                        'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    {event.iconType === 'milestone' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-orange-500 dark:text-orange-400">
                        <path fillRule="evenodd" d="M10.788 3.21c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                    ) : event.iconType === 'release' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-blue-500 dark:text-blue-400">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    ) : event.iconType === 'update' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-purple-500 dark:text-purple-400">
                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-gray-500 dark:text-gray-400">
                        <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <div className="pl-5 pr-2">
                    <motion.div 
                      className="flex items-center text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {event.title}
                    </motion.div>
                    {event.description && (
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 leading-[1.5] line-clamp-2 tracking-wider">
                        {event.description}
                      </p>
                    )}
                    <time className="text-sm md:text-base text-gray-500 dark:text-gray-500 font-medium block" dateTime={event.timestamp}>
                      {formatTimelineDate(event.timestamp)}
                    </time>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染文章内容（文本或图片卡片）
  const renderContent = () => {
    if (isTimeline) return null;
    
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
              {article.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-5 last:mb-2 leading-[1.5] tracking-wider">
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
            <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 line-clamp-3 leading-[1.5] tracking-wider">
              {article.content}
            </div>
            {/* 渐变遮罩效果 */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  // ----- 主要渲染部分 -----
  
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
        {/* 条件渲染图片部分 - 仅在有图片卡片 */}
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
            className="font-semibold text-base md:text-lg mb-4 leading-snug text-gray-900 dark:text-white"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {article.title}
          </motion.h2>
          
          {/* 展开内容或内容预览 */}
          {renderContent()}
          
          {/* 时间线内容 */}
          {renderTimeline()}
          
          {/* 作者信息和交互元素 - 使用更精致的布局 */}
          <div className="flex flex-row items-center justify-between mt-6 border-t border-gray-100 dark:border-gray-900 pt-4">
            {/* 左侧：Bot名称和时间组合显示 */}
            <div className="flex flex-col">
              {/* Bot名称 - 更精致的字体样式 */}
              <span className="text-sm font-medium text-gray-900 dark:text-white tracking-wide mb-1">
                {article.botName || 'AI Assistant'}
              </span>
              
              {/* 时间信息 - 更优雅的时间显示 */}
              <time dateTime={article.createdAt} className="text-xs text-gray-500 dark:text-gray-400 tracking-wider font-light">
                {formatDate(article.createdAt)}
              </time>
            </div>
            
            {/* 右侧：Read More / Close 按钮 - 更精致的设计 */}
            <motion.button 
              onClick={(e) => {
                e.stopPropagation(); // 防止触发父元素的点击事件
                setIsExpanded(!isExpanded);
              }}
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
        </div>
        
        {/* 社交互动区域 */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-900">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
                setLikes(prev => isLiked ? prev - 1 : prev + 1);
                onLike?.(article.id);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                setComments(prev => prev + 1);
                onComment?.(article.id);
              }}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">{comments}</span>
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShares(prev => prev + 1);
                onShare?.(article.id);
              }}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-medium">{shares}</span>
            </button>
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
              onBookmark?.(article.id);
            }}
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

// 使用 React.memo 优化性能，避免不必要的重新渲染
export default memo(ArticleCard);
