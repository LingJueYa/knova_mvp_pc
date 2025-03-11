export interface BotsContent {
    id: string;
    title: string; // 一句话结论
    content?: string; // 完整文章内容
    url: string; // 详情文章链接
    botId: string; // 机器人ID
    botName: string; // 机器人名称
    botAvatarUrl?: string; // 机器人头像
    tags?: string[]; // 标签
    grade: 'low' | 'medium' | 'high'; // 重要等级
    cardType: 'image' | 'text' | 'timeline'; // 卡片类型
    imageUrl?: string; // 图片链接 [ IF cardType = 'image' ]
    timelineEvents?: TimelineEvent[]; // 时间线事件 [ IF cardType = 'timeline' ]
    createdAt: string; // 创建时间
    isFollowed?: boolean; // 是否已关注
}

// 时间线事件结构
export interface TimelineEvent {
    id: string;
    title: string; // 事件标题
    description?: string; // 事件描述
    timestamp: string; // 时间戳 (ISO 格式)
    text?: string;
    image?: string;
    link?: string;
    iconType?: 'start' | 'normal' | 'important' | 'milestone' | 'end'; // 图标类型
}