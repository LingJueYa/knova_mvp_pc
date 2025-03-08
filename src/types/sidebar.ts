// 标准 [ 图标 + 文本 ] 侧边栏类型

export interface SidebarItemType {
  id: string;         // 唯一标识符
  icon: string;       // 图标名称
  label: string;      // 显示文本
  href: string;       // 链接路径
  tooltip?: string;   // 提示文本
  badge?: string;     // 可选徽章 (例如 "new" 或数字)
  badgeColor?: string;// 可选徽章颜色
}

// Bot [ 图片 + 文本 ] 侧边栏类型

export interface SidebarBotItemType {
  id: string;         // 唯一标识符
  name: string;       // Bot 名称
  avatarUrl: string;  // 头像图片URL
  href: string;       // 链接路径
  status: 'online' | 'offline' | 'busy'; // Bot 状态
  hasNewMessage: boolean; // 是否有新消息
  description?: string; // 可选描述
}