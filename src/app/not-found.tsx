'use client'

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"


export function Illustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 362 145" 
      aria-hidden="true"
      role="img"
      aria-label="404 图形插图"
      {...props}
    >
      <path
        fill="currentColor"
        d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z" />
    </svg>
  );
}

// NotFound 组件属性接口定义
interface NotFoundProps {
  title?: string;           // 页面标题
  description?: string;     // 页面描述文本
  titleId?: string;         // 标题元素ID，用于无障碍关联
}

/**
 * 404 页面内容组件
 */
export function NotFound({
  title = "Page not found",
  description = "Lost, this page is. In another system, it may be.",
  titleId
}: NotFoundProps) {
  return (
    <div className="relative text-center z-[1] pt-52">
      {/* 主标题 */}
      <h1
        id={titleId}
        className="mt-4 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl"
        tabIndex={0}
      >
        {title}
      </h1>
      
      {/* 描述文本 */}
      <p
        className="mt-6 text-pretty text-lg font-medium text-muted-foreground tracking-wider sm:text-xl/8"
        tabIndex={0}
      >
        {description}
      </p>
      
      {/* 导航按钮组 */}
      <div
        className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6"
        role="navigation"
        aria-label="页面导航选项"
      >
        {/* 返回上一页按钮 */}
        <Button 
          onClick={() => history.go(-1)} 
          variant="secondary" 
          asChild 
          className="group"
          aria-label="返回上一页"
        >
          <div className="flex items-center">
            <ArrowLeft
              className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Go back
          </div>
        </Button>
        
        {/* 返回首页按钮 */}
        <Button 
          className="-order-1 sm:order-none" 
          asChild
          aria-label="返回首页"
        >
          <Link href="/">Take me home</Link>
        </Button>
      </div>
    </div>
  );
}

/**
 * 404 错误页面根组件
 * 组合图形插图和内容，提供完整的错误页面体验
 */
export default function App() {
  // 定义错误页面标题ID，用于无障碍关联
  const errorTitleId = "error-title";
  
  return (
    <main 
      className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10 overflow-hidden"
      role="main"
      aria-labelledby={errorTitleId} // 连接到主标题
    >
      <div className="relative max-w-3xl mx-auto w-full">
        <div className="absolute inset-0">
          {/* 基础404 SVG图形 */}
          <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
          
          {/* 渐变白色雾气遮罩 - 从70%位置开始逐渐变白 */}
          <div 
            className="absolute inset-0 w-full h-[50vh] pointer-events-none" 
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 65%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.98) 100%)',
              opacity: 0.75, // 增加整体透明度使效果更明显
            }}
            aria-hidden="true"
          />
          
          {/* 轻微模糊效果辅助层 */}
          <div 
            className="absolute inset-0 w-full h-[50vh] pointer-events-none" 
            style={{
              background: 'rgba(255,255,255,0)',
              backdropFilter: 'blur(2.5px)',
              WebkitBackdropFilter: 'blur(2.5px)',
              opacity: 0.5,
              maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,1) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,1) 100%)'
            }}
            aria-hidden="true"
          />
          
          {/* 增加额外的雾气效果层 */}
          <div 
            className="absolute inset-0 w-full h-[50vh] pointer-events-none" 
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.3) 100%)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
              opacity: 0.7,
              mixBlendMode: 'overlay'
            }}
            aria-hidden="true"
          />
        </div>
        
        {/* 404 页面内容 */}
        <NotFound
          title="Page not found"
          description="Lost, this page is. In another system, it may be."
          titleId={errorTitleId}
        />
      </div>
    </main>
  );
}