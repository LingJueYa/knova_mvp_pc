"use client";

import React, { memo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useTransform, useScroll } from 'framer-motion';
import { BotsContent } from '@/types/bots';

// 扩展 BotsContent 类型，增加 isFollowed 属性
interface ArticleCardProps {
  article: BotsContent & { 
    isFollowed?: boolean;
    summary?: string; // 添加可选的summary属性
    isTimeline?: boolean;
    timelineEvents?: {
      id: string;
      title: string;
      description?: string;
      timestamp: string;
      iconType?: 'milestone' | 'release' | 'update';
    }[];
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // ----- 映射与常量 -----
  
  // 根据grade值映射显示的文本标签
  const gradeTextMap: Record<string, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };
  
  // 根据grade值映射颜色
  const gradeColorMap: Record<string, { bg: string, text: string, shadow: string }> = {
    low: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      shadow: 'shadow-green-500/20'
    },
    medium: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      shadow: 'shadow-yellow-500/20'
    },
    high: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      shadow: 'shadow-red-500/20'
    }
  };
  
  // ----- 计算派生值 -----
  
  const gradeText = gradeTextMap[article.grade.toLowerCase()] || 'Low';
  const gradeColor = gradeColorMap[article.grade.toLowerCase()] || {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/20'
  };
  
  // 检查是否有图片
  const hasImage = article.imageUrl && article.imageUrl.trim() !== '';
  
  // 检查是否为时间线类型
  const isTimeline = article.isTimeline && article.timelineEvents && article.timelineEvents.length > 0;
  
  // ----- 引用与动画控制 -----
  
  // 时间线滚动控制
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: timelineContainerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
  
  // Card variants based on if it has image or not
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 15,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }
    },
    hover: {
      scale: 0.985,
      y: -3,
      boxShadow: '0 14px 30px -8px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    tap: {
      scale: 0.96,
    }
  };
  
  // ----- 辅助函数 -----
  
  // 根据grade返回对应的SVG图标
  const getGradeIcon = (grade: string) => {
    const lowerGrade = grade.toLowerCase();
    
    switch(lowerGrade) {
      case 'low':
        return (
          <Image src="/svg/low.svg" alt="Low" width={16} height={16} className='mr-1.5'/>
        );
      case 'medium':
        return (
          <Image src="/svg/medium.svg" alt="Medium" width={16} height={16} className='mr-1.5'/>
        );
      case 'high':
        return (
          <Image src="/svg/high.svg" alt="High" width={16} height={16} className='mr-1.5'/>
        );
      default:
        return null;
    }
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  // 格式化时间线时间戳（精确到小时，如果无小时则截止到天）
  const formatTimelineDate = (dateString: string) => {
    const date = new Date(dateString);
    // 检查时间是否为午夜整点，如果是则视为无具体小时
    const isStartOfDay = date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
    
    const options: Intl.DateTimeFormatOptions = isStartOfDay 
      ? { month: 'short', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  // 根据是否为high grade来决定边框样式
  const cardBorderStyle = () => {
    if (article.grade.toLowerCase() === 'high') {
      return 'border-2 border-red-400 dark:border-red-500/60 ring-1 ring-red-400 dark:ring-red-500/60';
    }
    return 'border-gray-100 dark:border-gray-800';
  };
  
  // ----- 渲染辅助组件 -----
  
  // 渲染时间线组件
  const renderTimeline = () => {
    if (!isTimeline) return null;
    
    return (
      <div className="relative h-72 overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" />
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" 
        />
        
        <div 
          ref={timelineContainerRef}
          className="h-full overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600"
        >
          <div className="relative ml-4 border-l-2 border-gray-200 dark:border-gray-800 pb-2 pt-4">
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
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                    ) : event.iconType === 'release' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-blue-500 dark:text-blue-400">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    ) : event.iconType === 'update' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        className="w-5 h-5 text-purple-500 dark:text-purple-400">
                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
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
                      className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-1"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {event.title}
                    </motion.div>
                    {event.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <time className="text-xs text-gray-500 dark:text-gray-500 font-medium block" dateTime={event.timestamp}>
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
  
  // ----- 主要渲染部分 -----
  
  return (
    <Link 
      className="w-full group h-full"
      href={article.url}
      aria-label={`Read article: ${article.conclusion}`}
    >
      <motion.div 
        className={`bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg shadow-gray-200/60 dark:shadow-gray-950/40 flex flex-col border ${cardBorderStyle()} backdrop-blur-sm h-full`}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
      >
        {/* 条件渲染图片部分 */}
        {hasImage && !isTimeline && (
          <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">
            <div className="w-full h-full relative">
              {/* 图片容器 */}
              <motion.div 
                className="w-full h-full transform"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <Image 
                  src={article.imageUrl || '/mock/bot1.jpg'} 
                  alt={article.conclusion}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover will-change-transform"
                  loading="lazy"
                />
              </motion.div>
              {/* 暗化遮罩层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 z-10"></div>
            </div>
          </div>
        )}
        
        {/* 时间线渲染 */}
        {isTimeline && renderTimeline()}
        
        {/* 文本内容部分 - 根据是否有图片调整样式 */}
        <div className={`flex flex-col justify-between ${hasImage && !isTimeline ? 'px-7 py-6' : 'px-8 py-5'} space-y-3 relative flex-grow`}>
          <article className="flex flex-col justify-between items-start space-y-3">
            <motion.div 
              className="flex items-center flex-wrap gap-2 w-full"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <p className={`text-xs font-medium tracking-wide flex items-center ${gradeColor.text} px-2.5 py-1.5 rounded-full ${gradeColor.bg} shadow-sm ${gradeColor.shadow}`}>
                {getGradeIcon(article.grade)}
                <span className="tracking-wider">{gradeText}</span>
              </p>
              
              {/* 关注状态标签 */}
              {article.isFollowed && (
                <motion.div 
                  className="flex items-center text-xs font-medium tracking-wide px-2.5 py-1.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 shadow-sm shadow-orange-500/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  Following
                </motion.div>
              )}
            </motion.div>
            
            {/* 标题 - 时间线卡片使用更小的标题 */}
            <motion.h2 
              className={`${isTimeline 
                ? 'line-clamp-2 text-base leading-snug sm:text-lg sm:leading-snug' 
                : hasImage 
                  ? 'line-clamp-2 text-lg leading-relaxed sm:text-xl sm:leading-relaxed' 
                  : 'line-clamp-3 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed'} 
                font-semibold tracking-tight text-gray-900 dark:text-white`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {article.conclusion}
            </motion.h2>
            
            {/* 仅在无图片且非时间线情况下显示简短摘要 (如果存在) */}
            {!hasImage && !isTimeline && article.summary && (
              <motion.p
                className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {article.summary}
              </motion.p>
            )}
          </article>
          
          {/* 时间和阅读更多部分 - 只在非时间线卡片中显示时间 */}
          <motion.div
            className="flex flex-col items-start gap-2 w-full mt-auto pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {!isTimeline && (
              <motion.time 
                dateTime={article.createdAt} 
                className="block text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 whitespace-nowrap"
              >
                {formatDate(article.createdAt)}
              </motion.time>
            )}
            
            {/* 添加一个精美的阅读更多指示器 */}
            <motion.div 
              className={`text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center opacity-70 group-hover:opacity-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap`}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

// 使用 React.memo 优化性能，避免不必要的重新渲染
export default memo(ArticleCard);
