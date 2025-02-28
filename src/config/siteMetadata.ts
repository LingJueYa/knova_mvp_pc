/**
 * 站点元数据配置文件
 */

import type { Metadata } from "next";

// 基础 URL 配置
const BASE_URL = "https://knova.example.com";

// 导出 SITE_INFO，增加类型定义提升代码可维护性
export const SITE_INFO = {
  name: "Knova MVP",
  title: "Knova MVP",
  description: "Knova MVP",
  image: {
    url: "/",
    width: 1200,
    height: 630,
    alt: "Knova MVP 封面图",
  },
} as const;

/**
 * 站点元数据配置
 * @description 增加可访问性和SEO优化配置
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_INFO.title,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: ["MVP"],
  authors: [{ name: "Knova 团队" }],

  // 增加语言配置
  alternates: {
    canonical: BASE_URL,
    languages: {
      "zh-CN": "/zh-CN",
    },
  },

  openGraph: {
    type: "website",
    siteName: SITE_INFO.name,
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    images: [
      {
        url: SITE_INFO.image.url,
        width: SITE_INFO.image.width,
        height: SITE_INFO.image.height,
        alt: SITE_INFO.image.alt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    images: [
      {
        url: SITE_INFO.image.url,
        width: SITE_INFO.image.width,
        height: SITE_INFO.image.height,
        alt: SITE_INFO.image.alt,
      },
    ],
  },

  other: {
    "wechat-share": JSON.stringify(SITE_INFO),
    "autoplay-policy": "no-user-gesture-required",
    accessibility: "true",
    "theme-color": "#ffffff",
  },
};
