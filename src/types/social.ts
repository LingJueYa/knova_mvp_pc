import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

/**
 * 社交媒体项基础结构，定义共同属性
 */
interface SocialItemBase {
  tooltip: string;
  color: string;
  ariaLabel: string;
}

/**
 * Lucide图标社交媒体项
 */
export interface LucideSocialItem extends SocialItemBase {
  type: 'lucide';
  icon: LucideIcon;
}

/**
 * 自定义组件社交媒体项
 */
export interface ComponentSocialItem extends SocialItemBase {
  type: 'component';
  icon: ComponentType<{ className?: string }>;
}

/**
 * 社交媒体项目类型 - 判别联合类型
 */
export type SocialItem = LucideSocialItem | ComponentSocialItem;

/**
 * 社交组件属性接口
 */
export interface SocialProps {
  className?: string;
  additionalItems?: SocialItem[];
} 