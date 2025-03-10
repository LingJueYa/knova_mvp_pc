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
    imageUrl: string; // 图片链接 [ IF isChart = false ]
    chartData?: string[]; // 图表数据 [ IF isChart = true ]
    createdAt: string; // 创建时间
}