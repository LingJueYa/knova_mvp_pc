import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { formatTimelineDate } from '@/utils/dateFormatter';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  iconType?: 'start' | 'normal' | 'important' | 'milestone' | 'end';
}

interface TimelineViewProps {
  events: TimelineEvent[];
  isExpanded: boolean;
}

/**
 * 时间线视图组件
 * 显示时间线形式的事件列表
 */
const TimelineView: React.FC<TimelineViewProps> = ({ events, isExpanded }) => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: timelineContainerRef
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 1]);
  
  // 根据图标类型返回对应的SVG图标
  const renderIcon = (iconType: string = 'normal') => {
    switch (iconType) {
      case 'start':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            className="w-5 h-5 text-green-500 dark:text-green-400">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
          </svg>
        );
      case 'important':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            className="w-5 h-5 text-blue-500 dark:text-blue-400">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        );
      case 'milestone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            className="w-5 h-5 text-orange-500 dark:text-orange-400">
            <path fillRule="evenodd" d="M10.788 3.21c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
          </svg>
        );
      case 'end':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            className="w-5 h-5 text-red-500 dark:text-red-400">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.59L7.3 8.59a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V5z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            className="w-5 h-5 text-gray-500 dark:text-gray-400">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // 返回图标背景样式
  const getIconBgStyle = (iconType: string = 'normal') => {
    switch (iconType) {
      case 'start':
        return 'bg-green-50 dark:bg-green-950/30';
      case 'important':
        return 'bg-blue-50 dark:bg-blue-950/30';
      case 'milestone':
        return 'bg-orange-50 dark:bg-orange-950/30';
      case 'end':
        return 'bg-red-50 dark:bg-red-950/30';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className={`relative ${isExpanded ? "h-96" : "h-64"} overflow-hidden transition-all duration-300 rounded-lg`}>
      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" />
      
      {/* 底部渐变遮罩 */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-50 to-transparent h-10 z-10 pointer-events-none dark:from-gray-900" 
      />
      
      {/* 时间线滚动容器 */}
      <div 
        ref={timelineContainerRef}
        className="h-full overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600"
      >
        <div className="relative ml-4 border-l-2 border-gray-200 dark:border-gray-800 rounded-b-lg pb-2 pt-4">
          {/* 渲染时间线事件 */}
          {events?.map((event, index) => (
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
                {/* 事件图标 */}
                <span 
                  className={`absolute -left-[22px] w-10 h-10 flex items-center justify-center rounded-full ${getIconBgStyle(event.iconType)}`}
                >
                  {renderIcon(event.iconType)}
                </span>
                
                <div className="pl-5 pr-2">
                  {/* 事件标题 */}
                  <motion.div 
                    className="flex items-center text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {event.title}
                  </motion.div>
                  
                  {/* 事件描述 */}
                  {event.description && (
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 leading-[1.5] line-clamp-2 tracking-wider">
                      {event.description}
                    </p>
                  )}
                  
                  {/* 事件时间戳 */}
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

export default TimelineView; 