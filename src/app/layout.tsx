// LayOut

import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playwrite_IT_Moderna } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import SplashScreenWrapper from "@/components/SplashScreen/SplashScreenWrapper";
import { ThemeProvider } from "next-themes";


import { siteMetadata } from "@/config/siteMetadata";
import { APP_VERSION } from "@/config/version";

import { cn } from "@/lib/utils";
import "@/styles/global.css";

interface RootLayoutProps {
  children: React.ReactNode;
}


// 动态导入侧边栏组件(保持SSR)
const Sidebar = dynamic(() => import("@/components/layout/Sidebar"), {
  ssr: true,
  loading: () => <div className="w-16" aria-label="sidebar-loading" role="progressbar" />,
});


// 字体配置
const playwrite = Playwrite_IT_Moderna({
  display: 'swap',
  variable: '--font-playwrite',
  weight: ['100', '200', '300', '400'],
});

// SEO 元数据配置
export const metadata: Metadata = {
  ...siteMetadata,
  manifest: "/manifest.json",
  icons: {
    icon: [{ 
      url: "/icon/favicon.ico", 
      sizes: "32x32", 
      type: "image/x-icon" 
    }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 响应式视口配置
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: RootLayoutProps) {
  // 开发环境版本信息输出
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%cKnova AI %cv${APP_VERSION.version}`,
      "color: #0EA5E9; font-weight: bold; font-size: 14px;",
      "color: #666; font-size: 12px;"
    );
    console.log(
      `%c构建时间: %c${new Date(APP_VERSION.buildTime).toLocaleString()}`,
      "color: #666;",
      "color: #0EA5E9;"
    );
  }

  return (
    <ClerkProvider>
      <html 
        lang="zh-CN" 
        suppressHydrationWarning 
        className={`h-full ${playwrite.variable}`}
      >
        <head>
          <link 
            rel="manifest" 
            href="/manifest.json"
          />
          <meta name="color-scheme" content="light dark" />
        </head>
        <body
          className={cn(
            // 基础样式
            "h-screen bg-white text-gray-900",
            "antialiased",
            // 选择文本样式
            "selection:bg-primary/20",
            // 触摸和滚动行为
            "touch-pan-y",
            "overscroll-none",
            "overflow-hidden",
            // 深色模式适配
            "dark:bg-gray-900 dark:text-gray-100",
            // 减少动画
            "@media(prefers-reduced-motion: reduce) motion-reduce"
          )}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 开屏动画包装器 */}
            <SplashScreenWrapper>
              {/* 主布局容器 */}
              <div 
                className="h-screen flex"
                role="main"
              >
                {/* 侧边栏区域 */}
                <aside role="complementary" aria-label="sidebar-navigation">
                  <Sidebar />
                </aside>
                
                {/* 内容区域容器 */}
                <div className="flex-1 flex flex-col overflow-hidden px-4 sm:px-6 md:px-8">
                  
                  {/* 主内容区域 */}
                  <main 
                    className="h-[calc(100vh-56px)] max-w-screen-2xl w-full mx-auto overflow-hidden scrollbar-elegant"
                    role="main"
                    aria-label="main-content-area"
                  >
                    {children}
                  </main>
                </div>
              </div>
            </SplashScreenWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
