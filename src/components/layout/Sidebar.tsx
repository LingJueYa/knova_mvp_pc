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
              aria-label="主导航菜单"
            >
              <SidebarContent className="p-2 h-full flex flex-col">
                
                {/* 侧边栏主内容区域 */}
                <div className="bg-gray-50/80 rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-sm h-full">
                  <div className="bg-white/95 m-1 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-purple-100/80 overflow-y-auto h-[90%] flex flex-col sidebar-scroll">
                  
                    {/* 顶部区域 */}
                    <HeaderSection 
                      isSignedIn={isSignedIn ?? false} 
                      playSound={playSound} 
                    />
                    
                    {/* 主导航菜单区域 */}
                    <MenuSection 
                      items={sidebarNavItems}
                      itemType="nav"
                      label="主要功能"
                      pathname={pathname}
                      playSound={playSound}
                    />
                    
                    {/* Bots 分隔线 */}
                    <SectionTitle title="Bots" />
                    
                    {/* Bots 列表区域 */}
                    <MenuSection 
                      items={mockBots}
                      itemType="bot"
                      label="机器人助手"
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
                      label="工具栏"
                      pathname={pathname}
                      playSound={playSound}
                    />
                  </div>
                  
                  {/* 社交链接区域 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6 pb-3 px-6"
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
