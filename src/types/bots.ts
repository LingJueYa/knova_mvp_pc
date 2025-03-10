export interface BotsContent {
    id: string;
    conclusion: string; // 一句话结论
    url: string; // 详情文章链接
    botId: string; // 机器人ID
    botName: string; // 机器人名称
    botAvatarUrl: string; // 机器人头像
    tags: string[]; // 标签
    grade: 'low' | 'medium' | 'high'; // 重要等级
    isChart: boolean; // 是否为图表
    isTimeline?: boolean; // 是否为时间线类型
    imageUrl: string; // 图片链接 [ IF isChart = false ]
    chartData?: string[]; // 图表数据 [ IF isChart = true ]
    timelineEvents?: TimelineEvent[]; // 时间线事件 [ IF isTimeline = true ]
    createdAt: string; // 创建时间
}

// 时间线事件结构
export interface TimelineEvent {
    id: string;
    title: string; // 事件标题
    description?: string; // 事件描述
    timestamp: string; // 时间戳 (ISO 格式)
    iconType?: 'milestone' | 'update' | 'release'; // 图标类型
}