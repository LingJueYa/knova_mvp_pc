'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// 动态导入SplashScreen组件，仅在客户端执行
const SplashScreen = dynamic(() => import('.'), {
  ssr: false,
});

interface SplashScreenWrapperProps {
  children: React.ReactNode;
}

/**
 * 开屏动画包装组件 - 控制开屏动画的显示和页面内容的渲染时机
 */
const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [splashComplete, setSplashComplete] = useState(false);
  
  // 仅在首页显示闪屏动画
  const isHomePage = pathname === '/';

  // 非首页路由时立即设置splashComplete为true
  useEffect(() => {
    if (!isHomePage) {
      setSplashComplete(true);
    }
  }, [isHomePage]);
  
  // 处理闪屏动画完成事件
  const handleSplashComplete = () => {
    setSplashComplete(true);
  };
  
  return (
    <>
      {isHomePage && !splashComplete && (
        <div aria-live="polite" aria-atomic="true" role="status" aria-label="网站加载中">
          <SplashScreen 
            onAnimationComplete={handleSplashComplete} 
            aria-busy={!splashComplete}
          />
        </div>
      )}
      
      {/* 仅在闪屏动画完成后或非首页时渲染子组件 */}
      <main aria-hidden={isHomePage && !splashComplete}>
        {(splashComplete || !isHomePage) && children}
      </main>
    </>
  );
};

export default SplashScreenWrapper;
