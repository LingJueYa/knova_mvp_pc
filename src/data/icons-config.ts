import { IconType } from "react-icons";

/**
 * 图标配置映射
 * 集中管理应用中使用的所有图标
 */
export interface IconConfig {
  default?: string;
  active?: string;
  component?: IconType | undefined;
  glowColor?: string;
}

export const iconConfig: Record<string, IconConfig> = {
  // 主菜单图标
  explore: {
    default: "/svg/explore-default.svg",
    active: "/svg/explore-active.svg",
    glowColor: "rgba(253, 161, 114, 0.6)"
  },
  follow: { 
    default: "/svg/follow-default.svg",
    active: "/svg/follow-active.svg",
    glowColor: "rgba(231, 76, 60, 0.6)"
  },
  popular: { 
    default: "/svg/popular-default.svg",
    active: "/svg/popular-active.svg",
    glowColor: "rgba(46, 204, 113, 0.6)"
  },
  // 工具菜单图标
  help: { 
    default: "/svg/help-default.svg",
    active: "/svg/help-active.svg",
    glowColor: "rgba(74, 144, 226, 0.6)"
  },
  blog: { 
    default: "/svg/blog-default.svg",
    active: "/svg/blog-active.svg",
    glowColor: "rgba(179, 136, 255, 0.6)"
  },
  setting: { 
    default: "/svg/setting-default.svg",
    active: "/svg/setting-active.svg",
    glowColor: "rgba(52, 73, 94, 0.6)"
  },
};

// 获取图标组件的辅助函数
export function getIconComponent(iconName: string) {
  return iconConfig[iconName] || null;
}