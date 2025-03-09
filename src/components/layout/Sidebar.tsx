"use client";

/**
 * 全局侧边栏组件
 * 
 * 负责呈现应用的主侧边栏导航，包含以下功能区块：
 * 1. 顶部Logo及用户
 * 2. 主导航菜单
 * 3. AI机器人列表
 * 4. 底部工具栏
 * 5. 社交媒体链接
 */

import React, { useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import Social from "@/components/Social";
import MenuSection from "@/components/sidebar/MenuSection";
import SectionTitle from "@/components/sidebar/SectionTitle";
import HeaderSection from "@/components/sidebar/HeaderSection";

import { useSidebarSound } from "@/hooks/useSidebarSound";
import { fadeInVariants } from "@/animations/sidebar";

import { CreateBotButton } from "@/components/sidebar/CreateBotButton";
import { sidebarNavItems } from "@/data/sidebar/nav";         // 主导航项目数据
import { sidebarToolsItems } from "@/data/sidebar/tools";     // 工具栏项目数据
import { mockBots } from "@/data/mock/bot";                   // 机器人列表数据

const GlobalSidebar = () => {
  // 获取当前路径，用于确定活动菜单项
  const pathname = usePathname();
  
  // 音效播放钩子
  const { playSound } = useSidebarSound();
  
  // 用户认证状态钩子
  const { isSignedIn } = useAuth();
  
  // 路由钩子，用于预加载页面
  const router = useRouter();
  
  // 用于存储已预加载路径的集合，避免重复预加载
  const preloadedPaths = useRef(new Set()).current;
  
  // 页面预加载逻辑
  useEffect(() => {
    // 确保在浏览器环境并且支持requestIdleCallback API
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // 在浏览器空闲时触发预加载逻辑
      const idleCallback = window.requestIdleCallback(() => {
        // 预加载主导航页面
        sidebarNavItems.forEach(item => {
          // 仅预加载未加载且非当前页面的路径
          if (item.href && !preloadedPaths.has(item.href) && item.href !== pathname) {
            router.prefetch(item.href);
            preloadedPaths.add(item.href);
            console.log(`预加载页面: ${item.href}`);
          }
        });
      }, { timeout: 2000 }); // 设置2秒超时，确保预加载不会无限期等待
    
      return () => {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleCallback);
        }
      };
    }
  }, [router, pathname, preloadedPaths]);

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="h-full"
      >
        {/* 全局CSS样式定义 */}
        <style jsx global>{`
          /* 深色模式侧边栏优化 */
          @media (prefers-color-scheme: dark) {
            .sidebar-scroll {
              scrollbar-color: rgba(75, 85, 99, 0.5) rgba(31, 41, 55, 0.1);
            }
            
            .sidebar-scroll::-webkit-scrollbar-track {
              background-color: rgba(31, 41, 55, 0.1);
            }
            
            .sidebar-scroll::-webkit-scrollbar-thumb {
              background-color: rgba(75, 85, 99, 0.5);
              border-radius: 6px;
            }
          }
          
          /* @keyframes subtle-pulse {
            0% {
              filter: drop-shadow(0 0 0.5px rgba(253, 161, 114, 0));
              transform: scale(1.05) rotate(1deg);
            }
            50% {
              filter: drop-shadow(0 0 2px rgba(253, 161, 114, 0.3));
              transform: scale(1.08) rotate(1.5deg);
            }
            100% {
              filter: drop-shadow(0 0 0.5px rgba(253, 161, 114, 0));
              transform: scale(1.05) rotate(1deg);
            }
          }
          
          .animate-subtle-pulse {
            animation: subtle-pulse 3s ease-in-out infinite;
          } */
        `}</style>

        {/* 侧边栏主框架 */}
        <TooltipProvider>
          <SidebarProvider defaultOpen={true}>
            <Sidebar 
              className="min-h-screen w-72" 
              aria-label="main-navigation"
            >
              <SidebarContent className="p-2 h-full flex flex-col dark:bg-secondary">
                
                {/* 侧边栏主内容区域 */}
                <div className="bg-gray-50/80 dark:bg-secondary rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm h-full">
                  <div className="bg-white/95 dark:bg-bg m-1 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)] border border-purple-100/80 dark:border-gray-700/50 overflow-y-auto h-[90%] flex flex-col sidebar-scroll">
                  
                  
                    {/* 顶部区域 */}
                    <HeaderSection 
                      isSignedIn={isSignedIn ?? false} 
                      playSound={playSound} 
                    />
                    
                    {/* 主导航菜单区域 */}
                    <MenuSection 
                      items={sidebarNavItems}
                      itemType="nav"
                      label="main-features"
                      pathname={pathname}
                      playSound={playSound}
                    />
                    
                    {/* 我的 Bots 分隔线 */}
                    <SectionTitle title="My Bots" />
                    
                    {/* 我的 Bots 创建按钮 */}
                    <CreateBotButton 
                      currentBotCount={mockBots.length}
                      onCreateBot={() => {}}
                    />

                    {/* 我的 Bots 列表区域 */}
                    <MenuSection 
                      items={mockBots}
                      itemType="bot"
                      label="my-bots-list"
                      className="py-2 px-3 flex-shrink-0"
                      pathname={pathname}
                      playSound={playSound}
                    />

                    {/* 关注 Bots 分隔线 */}
                    <SectionTitle title="Concerned Bots" />
                    
                    {/* 关注 Bots 列表区域 */}
                    <MenuSection 
                      items={mockBots}
                      itemType="bot"
                      label="concerned-bots-list"
                      className="py-2 px-3 flex-shrink-0"
                      pathname={pathname}
                      playSound={playSound}
                    />
                    
                    {/* 工具 分隔线 */}
                    <SectionTitle title="Resources" />
                    
                    {/* 底部工具栏 */}
                    <MenuSection 
                      items={sidebarToolsItems}
                      itemType="nav"
                      label="tools"
                      pathname={pathname}
                      playSound={playSound}
                    />
                  </div>
                  
                  {/* 社交链接区域 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6 pb-3 px-6 flex flex-col gap-4"
                  >
                    <Social />
                  </motion.div>
                </div>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </TooltipProvider>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSidebar;
