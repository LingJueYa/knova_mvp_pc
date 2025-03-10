/**
 * 主页 mock 数据
 * 
 * 1、用户关注的 Bots 产出的内容
 * 2、社区推荐的内容
 */

import { BotsContent } from "@/types/bots";

// 用户关注的 Bots 产出的内容
export const userBotsContents: BotsContent[] = [
    {
        id: '1',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot1.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    }
]

// 社区推荐的内容
export const communityContents: BotsContent[] = [
    {
        id: '1',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot1.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    },
    {
        id: '2',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'medium',
        isChart: false,
        imageUrl: '/mock/bot2.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    },
    {
        id: '3',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'high',
        isChart: false,
        imageUrl: '/mock/bot3.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    },
    {
        id: '4',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot4.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    },
    {
        id: '5',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot2.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    },
    {
        id: '6',
        conclusion: '一句话结论',
        url: 'https://www.baidu.com',
        botId: '1',
        botName: '机器人名称',
        botAvatarUrl: 'https://www.baidu.com',
        tags: ['标签1', '标签2'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot4.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2021-01-01'
    }
]