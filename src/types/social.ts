import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

/**
 * 社交媒体项目的基础接口
 */
interface SocialItemBase {
  tooltip: string;
  color: string;
  ariaLabel: string;
}

/**
 * Lucide图标社交媒体项
 */
interface LucideSocialItem extends SocialItemBase {
  icon: LucideIcon;
  isLucide: true;
  isComponent?: false;
}

/**
 * 自定义组件社交媒体项
 */
interface ComponentSocialItem extends SocialItemBase {
  icon: ComponentType<{ className?: string }>;
  isLucide?: false;
  isComponent: true;
}

/**
 * 社交媒体项目类型 - 使用判别联合类型
 */
export type SocialItem = LucideSocialItem | ComponentSocialItem;

/**
 * 社交组件属性接口
 */
export interface SocialProps {
  // 可以在这里添加Social组件可能接收的任何属性
  // 例如：自定义class、额外的社交媒体项等
  className?: string;
  additionalItems?: SocialItem[];
} 