// LayOut

import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playwrite_IT_Moderna } from 'next/font/google';
// 导入配置
import { siteMetadata } from "@/config/siteMetadata";
// 导入工具函数
import { cn } from "@/lib/utils";
// 导入全局样式
import "@/styles/global.css";
// 版本输出
import { APP_VERSION } from "@/config/version";
import { ClerkProvider } from "@clerk/nextjs";

interface RootLayoutProps {
  children: React.ReactNode;
}

// 懒加载导航栏（保持SSR）
const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
  loading: () => <div className="h-16" />,
});

// 配置 Playwrite IT Moderna 字体
const playwrite = Playwrite_IT_Moderna({
  display: 'swap',
  variable: '--font-playwrite',
  weight: ['100', '200', '300', '400'],
});

// 全局元数据配置
export const metadata: Metadata = {
  ...siteMetadata,
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 视口配置
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: RootLayoutProps) {
  // 在开发环境下输出版本信息
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%cOTarot ฅ•ω•ฅ %cv${APP_VERSION.version}`,
      "color: #7C3AED; font-weight: bold; font-size: 14px;",
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
      <html lang="zh-CN" suppressHydrationWarning className={`h-full ${playwrite.variable}`}>
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body
          className={cn(
            "h-screen bg-white text-gray-900",
            "antialiased",
            "selection:bg-primary/20",
            "touch-pan-y",
            "overscroll-none",
            "overflow-hidden",
          )}
          suppressHydrationWarning
        >
          <div className="h-screen flex flex-col px-4 sm:px-6 md:px-8">
            <Navbar />
            <main className="h-[calc(100vh-56px)] max-w-screen-2xl w-full mx-auto overflow-hidden">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
