/**
 * 主页 mock 数据
 * 
 * 1、用户关注的 Bots 产出的内容
 * 2、社区推荐的内容
 */

import { BotsContent } from "@/types/bots";

// 用户关注的 Bots 产出的内容
export const userBotsContents: (BotsContent & { isFollowed?: boolean; summary?: string })[] = [
    {
        id: 'user-bots-1',
        conclusion: 'iPhone 16 Series Specs Revealed: A18 Chip + 8GB RAM as New Standard',
        url: '/articles/iphone-16',
        botId: '1',
        botName: 'Tech Frontier',
        botAvatarUrl: '/mock/avatars/tech.jpg',
        tags: ['Apple', 'Smartphone', 'New Release'],
        grade: 'high',
        isChart: false,
        imageUrl: '/mock/bot1.jpg',
        chartData: ['1', '2', '3'],
        createdAt: '2025-03-05T14:30:00Z',
        isFollowed: true,
        summary: 'Latest news shows that iPhone 16 series will feature 8GB RAM as standard across all models, equipped with A18 chip, while Pro models will use titanium frames. Expected to launch in September this year.'
    },
    {
        id: 'user-bots-2',
        conclusion: 'Deep Learning Breakthrough: Unsupervised Models Outperform Traditional Methods in Few-Shot Scenarios',
        url: '/articles/ai-breakthrough',
        botId: '2',
        botName: 'AI Researcher',
        botAvatarUrl: '/mock/avatars/ai.jpg',
        tags: ['AI', 'Deep Learning', 'Research'],
        grade: 'medium',
        isChart: false,
        imageUrl: '',
        chartData: [],
        createdAt: '2025-03-08T09:15:00Z',
        isFollowed: true,
        summary: 'Researchers have discovered in recent experiments that contrastive learning-based unsupervised models can significantly outperform traditional supervised learning methods with only small amounts of labeled data. This breakthrough discovery could drastically reduce AI training\'s dependence on large-scale labeled datasets.'
    },
    {
        id: 'user-bots-3',
        conclusion: 'AI Research Timeline 2025: Major Developments and Milestones',
        url: '/articles/ai-research-timeline',
        botId: '2',
        botName: 'AI Researcher',
        botAvatarUrl: '/mock/avatars/ai.jpg',
        tags: ['AI', 'Research', 'Timeline'],
        grade: 'high',
        isChart: false,
        isTimeline: true,
        imageUrl: '/mock/bot3.jpg',
        chartData: [],
        timelineEvents: [
            {
                id: 'ai-timeline-1',
                title: 'GPT-6 Announcement',
                description: 'OpenAI reveals preliminary details about GPT-6 architecture and capabilities',
                timestamp: '2025-03-01T11:30:00Z',
                iconType: 'milestone'
            },
            {
                id: 'ai-timeline-2',
                title: 'Google DeepMind Breakthrough',
                description: 'New algorithm achieves state-of-the-art results in reinforcement learning with minimal supervision',
                timestamp: '2025-02-15T09:45:00Z',
                iconType: 'update'
            },
            {
                id: 'ai-timeline-3',
                title: "Meta's Multimodal Model Release",
                description: 'Meta launches advanced multimodal model with enhanced understanding of video content',
                timestamp: '2025-01-28T16:20:00Z',
                iconType: 'release'
            },
            {
                id: 'ai-timeline-4',
                title: 'AI Ethics Framework',
                description: 'Major tech companies agree on standardized ethics framework for generative AI development',
                timestamp: '2025-01-10T14:00:00Z',
                iconType: 'update'
            },
            {
                id: 'ai-timeline-5',
                title: 'Medical Diagnosis Milestone',
                description: 'AI system surpasses human experts in diagnosing rare conditions from medical imaging',
                timestamp: '2024-12-05T10:15:00Z',
                iconType: 'milestone'
            }
        ],
        createdAt: '2025-03-10T08:30:00Z',
        isFollowed: true,
        summary: 'A comprehensive overview of the most significant AI research breakthroughs and announcements from late 2024 through early 2025, highlighting major advancements across various domains.'
    }
]

// 社区推荐的内容
export const communityContents: (BotsContent & { isFollowed?: boolean; summary?: string })[] = [
    {
        id: 'community-bots-1',
        conclusion: 'Apple Announces Vision Pro Will Launch in Mainland China in Q2 2025',
        url: '/articles/vision-pro-china',
        botId: '3',
        botName: 'Tech Updates',
        botAvatarUrl: '/mock/avatars/news.jpg',
        tags: ['Apple', 'AR/VR', 'New Release'],
        grade: 'high',
        isChart: false,
        imageUrl: '/mock/bot1.jpg',
        chartData: [],
        createdAt: '2025-03-01T09:45:00Z',
        summary: 'Apple announced today that its revolutionary spatial computing device, Vision Pro, will officially launch in the mainland China market in the second quarter of 2025, with an expected price exceeding 25,000 yuan.'
    },
    {
        id: 'community-bots-2',
        conclusion: 'Global Smartphone Shipments Analysis for Q1 2025: Apple Reclaims First Place, Xiaomi Surpasses Samsung for the First Time',
        url: '/articles/smartphone-q1',
        botId: '4',
        botName: 'Market Observer',
        botAvatarUrl: '/mock/avatars/market.jpg',
        tags: ['Smartphone', 'Market Share', 'Analysis'],
        grade: 'medium',
        isChart: false,
        imageUrl: '/mock/bot2.jpg',
        chartData: [],
        createdAt: '2025-02-28T15:20:00Z',
    },
    {
        id: 'community-bots-3',
        conclusion: 'Tesla Model 3 Highland Version Receives High Consumer Praise, Delivery Volume Reaches Record High',
        url: '/articles/tesla-highland',
        botId: '5',
        botName: 'Automotive Technology',
        botAvatarUrl: '/mock/avatars/car.jpg',
        tags: ['Tesla', 'Electric Vehicles', 'Clean Energy'],
        grade: 'high',
        isChart: false,
        imageUrl: '/mock/bot3.jpg',
        chartData: [],
        createdAt: '2025-02-25T11:05:00Z',
    },
    {
        id: 'community-bots-4',
        conclusion: 'Major Breakthrough in Quantum Computing Research: First Achievement of 100 Qubit Error Correction',
        url: '/articles/quantum-computing',
        botId: '6',
        botName: 'Frontier Science',
        botAvatarUrl: '/mock/avatars/science.jpg',
        tags: ['Quantum Computing', 'Technological Progress', 'Research'],
        grade: 'high',
        isChart: false,
        imageUrl: '',
        chartData: [],
        createdAt: '2025-03-10T10:30:00Z',
        summary: 'Scientists recently announced the first experimental achievement of 100 qubit error correction, a milestone breakthrough in the field of quantum computing. This advancement will significantly improve the stability and practicality of quantum computers, potentially accelerating the realization of quantum advantage.'
    },
    {
        id: 'community-bots-5',
        conclusion: 'New Study Shows: Drinking Green Tea Daily May Reduce Cardiovascular Disease Risk by 25%',
        url: '/articles/green-tea',
        botId: '7',
        botName: 'Healthy Living',
        botAvatarUrl: '/mock/avatars/health.jpg',
        tags: ['Health', 'Research', 'Lifestyle'],
        grade: 'low',
        isChart: false,
        imageUrl: '/mock/bot2.jpg',
        chartData: [],
        createdAt: '2025-02-20T08:40:00Z',
    },
    {
        id: 'community-bots-6',
        conclusion: 'Ministry of Industry and Information Technology Releases "AI Industry Development Plan (2025-2030)", Focusing on Supporting Large Models and Chip R&D',
        url: '/articles/ai-policy',
        botId: '8',
        botName: 'Policy Interpretation',
        botAvatarUrl: '/mock/avatars/policy.jpg',
        tags: ['Artificial Intelligence', 'Industrial Policy', 'Development Planning'],
        grade: 'medium',
        isChart: false,
        imageUrl: '',
        chartData: [],
        createdAt: '2025-03-07T16:15:00Z',
        summary: 'The Ministry of Industry and Information Technology recently officially released the "AI Industry Development Plan (2025-2030)", proposing to focus on supporting large models and AI chip R&D, and plans to invest more than 500 billion yuan in the next five years to promote AI industry development and create trillion-level AI industry clusters.'
    },
    {
        id: 'community-bots-7',
        conclusion: 'Apple Product Roadmap 2025: Key Releases and Updates Timeline',
        url: '/articles/apple-roadmap-2025',
        botId: '9',
        botName: 'Apple Insights',
        botAvatarUrl: '/mock/avatars/apple.jpg',
        tags: ['Apple', 'Product Roadmap', 'Timeline'],
        grade: 'high',
        isChart: false,
        isTimeline: true,
        imageUrl: '/mock/bot3.jpg',
        chartData: [],
        timelineEvents: [
            {
                id: 'timeline-1',
                title: 'iPhone 16 Announcement',
                description: 'Apple announces iPhone 16 series with A18 chip and enhanced AI capabilities',
                timestamp: '2025-09-10T10:00:00Z',
                iconType: 'milestone'
            },
            {
                id: 'timeline-2',
                title: 'iOS 19 Release',
                description: 'iOS 19 released with major AI features and redesigned control center',
                timestamp: '2025-09-15T09:00:00Z',
                iconType: 'release'
            },
            {
                id: 'timeline-3',
                title: 'Vision Pro 2 Teaser',
                description: 'Apple teases next-generation Vision Pro with improved display technology',
                timestamp: '2025-10-12T14:30:00Z',
                iconType: 'update'
            },
            {
                id: 'timeline-4',
                title: 'Apple Watch Series 11',
                description: 'New health sensors and extended battery life featured in the Series 11',
                timestamp: '2025-09-18T10:00:00Z',
                iconType: 'release'
            },
            {
                id: 'timeline-5',
                title: 'MacBook Pro Refresh',
                description: 'M4 Pro and M4 Max chips debut in redesigned MacBook Pro models',
                timestamp: '2025-11-05T16:00:00Z',
                iconType: 'release'
            },
            {
                id: 'timeline-6',
                title: 'AirPods Pro 3',
                description: 'AirPods Pro 3 with advanced health monitoring and spatial audio improvements',
                timestamp: '2025-10-25T13:00:00Z',
                iconType: 'update'
            }
        ],
        createdAt: '2025-03-09T13:45:00Z',
        summary: 'A comprehensive timeline of Apple\'s expected product releases and updates throughout 2025, including iPhone 16, Vision Pro 2, and new Mac models with M4 chips.'
    },
    {
        id: 'community-bots-8',
        conclusion: 'Tech Industry Events Timeline 2025: Major Conferences and Announcements',
        url: '/articles/tech-events-2025',
        botId: '3',
        botName: 'Tech Updates',
        botAvatarUrl: '/mock/avatars/news.jpg',
        tags: ['Technology', 'Events', 'Timeline'],
        grade: 'medium',
        isChart: false,
        isTimeline: true,
        imageUrl: '',
        chartData: [],
        timelineEvents: [
            {
                id: 'tech-timeline-1',
                title: 'CES 2025',
                description: 'Consumer Electronics Show showcasing next-gen smart home and wearable technologies',
                timestamp: '2025-01-07T09:00:00Z',
                iconType: 'milestone'
            },
            {
                id: 'tech-timeline-2',
                title: 'Mobile World Congress',
                description: 'MWC Barcelona featuring 6G networking concepts and foldable device innovations',
                timestamp: '2025-02-24T10:30:00Z',
                iconType: 'update'
            },
            {
                id: 'tech-timeline-3',
                title: 'Google I/O 2025',
                description: "Google's developer conference focused on AI advancements and Android improvements",
                timestamp: '2025-05-10T17:00:00Z',
                iconType: 'release'
            },
            {
                id: 'tech-timeline-4',
                title: 'WWDC 2025',
                description: "Apple's Worldwide Developers Conference introducing new OS features",
                timestamp: '2025-06-06T10:00:00Z',
                iconType: 'milestone'
            },
            {
                id: 'tech-timeline-5',
                title: 'Computex Taipei',
                description: 'Major hardware announcements from leading PC and component manufacturers',
                timestamp: '2025-06-01T09:00:00Z',
                iconType: 'update'
            }
        ],
        createdAt: '2025-03-10T11:20:00Z',
        summary: 'A comprehensive calendar of major tech industry events in 2025, highlighting key conferences, product launches, and developer events across the global technology landscape.'
    }
]