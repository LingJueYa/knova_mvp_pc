'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

/**
 * 启动屏组件 - 品牌加载动画
 * 仅在首页显示，动画完成后自动隐藏
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  
  // 仅在首页显示启动屏
  const showSplash = pathname === '/';

  useEffect(() => {
    // 非首页时跳过动画
    if (!showSplash) {
      setIsVisible(false);
      return;
    }
    
    // 动画完成后，隐藏启动屏并执行回调
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2000); // 简洁动画，持续2秒

    return () => clearTimeout(timer);
  }, [onAnimationComplete, showSplash]);

  // 字母动画 - 优雅的上浮显现效果
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1],
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
  
  // 形状动画
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 0.015,
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  
  // 线条动画
  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "140px",
      opacity: 0.3,
      transition: {
        width: { duration: 0.5, ease: "easeOut", delay: 0.4 },
        opacity: { duration: 0.2, delay: 0.4 },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && showSplash && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          {/* 纯白背景 */}
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
          />
          
          {/* 极简艺术元素 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 单个大圆 */}
            <motion.div
              variants={shapeVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] border-[0.5px] border-black dark:border-white rounded-full opacity-[0.01] transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {/* 品牌名称动画 */}
          <div className="flex items-center justify-center relative z-10">
            {/* 字母动画 - 每个字母单独设置动画以实现级联效果 */}
            {/* K */}
            <motion.div
              custom={0}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-thin mx-[0.2rem] relative tracking-widest"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-black dark:text-white font-playwrite">K</span>
            </motion.div>
            
            {/* n */}
            <motion.div
              custom={1}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-thin mx-[0.2rem] relative tracking-widest"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-black dark:text-white font-playwrite">n</span>
            </motion.div>
            
            {/* o */}
            <motion.div
              custom={2}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-thin mx-[0.2rem] relative tracking-widest"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-black dark:text-white font-playwrite">o</span>
            </motion.div>
            
            {/* v */}
            <motion.div
              custom={3}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-thin mx-[0.2rem] relative tracking-widest"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-black dark:text-white font-playwrite">v</span>
            </motion.div>
            
            {/* a */}
            <motion.div
              custom={4}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-thin mx-[0.2rem] relative tracking-widest"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-black dark:text-white font-playwrite">a</span>
            </motion.div>
          </div>
          
          {/* 艺术下划线 */}
          <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-10 h-[0.5px] bg-black dark:bg-white"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
