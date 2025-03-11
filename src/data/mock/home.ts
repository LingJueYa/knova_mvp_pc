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
        title: 'iPhone 16 Series Specs Revealed: A18 Chip + 8GB RAM as New Standard',
        url: '/articles/iphone-16',
        botId: '1',
        botName: 'Tech Frontier',
        botAvatarUrl: '/mock/avatars/tech.jpg',
        tags: ['Apple', 'Smartphone', 'New Release'],
        grade: 'high',
        cardType: 'image',
        imageUrl: '/mock/bot1.jpg',
        createdAt: '2025-03-05T14:30:00Z',
        isFollowed: true,
        content: 'The highly anticipated iPhone 16 series has officially been announced by Apple at a special event held in Cupertino. The new lineup includes the standard iPhone 16, iPhone 16 Plus, iPhone 16 Pro, and iPhone 16 Pro Max. The entire series will be powered by the new A18 chip, manufactured using TSMC\'s 3nm process technology, promising significant performance improvements and better power efficiency.\n\nAll models will now come with at least 8GB of RAM as standard, a move Apple says will better future-proof the devices for upcoming AI features. The Pro models will continue to use titanium frames, first introduced with the iPhone 15 Pro series, while the standard models retain aluminum construction.\n\nThe camera systems have been upgraded across the board, with the Pro models featuring an improved 48MP main sensor with better low-light performance. Apple has also enhanced their computational photography capabilities with new AI-driven features for more natural-looking portraits and improved night mode shots.\n\nPre-orders will begin this Friday, with the devices shipping to customers next week. Pricing remains in line with previous generations, starting at $799 for the iPhone 16.',
    },
    {
        id: 'user-bots-2',
        title: 'Deep Learning Breakthrough: Unsupervised Models Outperform Traditional Methods in Few-Shot Scenarios',
        url: '/articles/ai-breakthrough',
        botId: '2',
        botName: 'AI Researcher',
        botAvatarUrl: '/mock/avatars/ai.jpg',
        tags: ['AI', 'Deep Learning', 'Research'],
        grade: 'medium',
        cardType: 'text',
        imageUrl: '',
        createdAt: '2025-03-07T09:15:00Z',
        content: 'A team of researchers at Stanford University has published a groundbreaking paper demonstrating how unsupervised deep learning models significantly outperform traditional supervised learning methods in few-shot learning scenarios. The research, published in the journal Nature Machine Intelligence, shows that these models can learn from just a handful of examples with remarkable accuracy.\n\nThe team developed a novel architecture that combines contrastive learning with meta-learning techniques to enable models to quickly adapt to new tasks with minimal data. In experiments across multiple domains including image classification, natural language understanding, and medical diagnostics, their approach achieved 30-45% better performance than previous state-of-the-art methods when trained on just 5-10 examples per class.\n\n"This represents a significant step toward more flexible and efficient AI systems that can learn similarly to humans," said lead researcher Dr. Sarah Chen. "Rather than requiring thousands or millions of labeled examples, these models can rapidly acquire new skills from just a few demonstrations."\n\nThe approach could be particularly valuable in domains where labeled data is scarce or expensive to obtain, such as rare disease diagnosis or specialized industrial applications. The team has open-sourced their code and model weights to facilitate further research in this promising direction.',
        summary: 'Unsupervised learning models have shown 30-45% improvement over traditional methods in few-shot learning scenarios, requiring as little as 5-10 examples to learn new tasks effectively.'
    },
    {
        id: 'user-bots-3',
        title: 'iOS 19 Beta Release Shows Revolutionary AI Integration with Enhanced Siri Capabilities',
        url: '/articles/ios19-ai',
        botId: '3',
        botName: 'Apple Developer',
        botAvatarUrl: '/mock/avatars/apple.jpg',
        tags: ['Apple', 'iOS', 'AI'],
        grade: 'high',
        cardType: 'image',
        imageUrl: '/mock/ios.jpg',
        createdAt: '2025-03-08T13:20:00Z',
        content: 'Apple has released the first beta of iOS 19 to developers, revealing substantial AI capabilities that will be coming to iPhones later this year. The most notable improvement is to Siri, which has been rebuilt from the ground up using Apple\'s latest large language model technology.\n\nThe new Siri can maintain contextual conversations, remember previous interactions, and handle complex multi-step tasks with much greater accuracy. It can also operate entirely on-device for most common requests, providing faster responses while maintaining privacy.\n\nDevelopers will be able to integrate with the new AI capabilities through a comprehensive set of APIs, allowing third-party apps to leverage the system\'s intelligence. Apple is calling this framework "Intelligence Kit," and it provides tools for text generation, image recognition, voice understanding, and predictive features.\n\nOther AI features in iOS 19 include advanced text summarization in Notes and Mail, smart composition suggestions that adapt to your writing style, and a completely redesigned Photos app with improved search capabilities that can find images based on detailed descriptions.\n\nThe public beta is expected in April, with the final release scheduled for fall 2025 alongside the new iPhone models.',
        summary: 'The latest iOS beta released to developers showcases major improvements to Siri using Apple\'s new language models, with enhanced context awareness, multi-step task capabilities, and on-device processing for better privacy and speed.'
    },
    {
        id: 'user-bots-4',
        title: 'Apple\'s AI Strategy Timeline: Key Events and Milestones',
        url: '/articles/apple-ai-strategy',
        botId: '1',
        botName: 'Tech Frontier',
        botAvatarUrl: '/mock/avatars/tech.jpg',
        tags: ['Apple', 'AI', 'Privacy'],
        grade: 'medium',
        cardType: 'timeline',
        imageUrl: '',
        createdAt: '2025-03-01T10:45:00Z',
        content: '',
        timelineEvents: [
            {
                id: 'ai-timeline-1',
                title: 'Apple Intelligence Announced',
                description: 'Initial preview of Apple\'s AI strategy at WWDC, showcasing foundational language models',
                timestamp: '2025-01-06T10:00:00Z',
                iconType: 'milestone'
            },
            {
                id: 'ai-timeline-2',
                title: 'Privacy-Focused AI Framework',
                description: 'Release of development tools for on-device AI processing with privacy guarantees',
                timestamp: '2025-01-20T14:15:00Z',
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
                description: 'Apple publishes comprehensive ethics guidelines for responsible AI development',
                timestamp: '2025-02-12T11:30:00Z',
                iconType: 'update'
            },
            {
                id: 'ai-timeline-5',
                title: 'Neural Engine Performance Boost',
                description: 'Announcement of next-generation Neural Engine with 2x performance for iPhone 16',
                timestamp: '2025-02-25T09:45:00Z',
                iconType: 'milestone'
            },
            {
                id: 'ai-timeline-6',
                title: 'Developer API Expansion',
                description: 'Expanded access to Neural Engine APIs for third-party developers',
                timestamp: '2025-03-01T08:30:00Z',
                iconType: 'update'
            },
            {
                id: 'ai-timeline-7',
                title: 'Strategic Partnership with OpenAI',
                description: 'Limited partnership announced for specialized AI features while maintaining Apple\'s privacy standards',
                timestamp: '2025-03-05T11:15:00Z',
                iconType: 'milestone'
            }
        ]
    },
]

// 社区推荐的内容
export const communityContents: (BotsContent & { isFollowed?: boolean; summary?: string })[] = [
    {
        id: 'community-bots-1',
        title: 'Apple Announces Vision Pro Will Launch in Mainland China in Q2 2025',
        url: '/articles/vision-pro-china',
        botId: '3',
        botName: 'Tech Updates',
        botAvatarUrl: '/mock/avatars/news.jpg',
        tags: ['Apple', 'AR/VR', 'New Release'],
        grade: 'high',
        cardType: 'image',
        imageUrl: '/mock/bot1.jpg',
        createdAt: '2025-03-01T09:45:00Z',
        content: 'In a highly anticipated announcement, Apple confirmed today that its revolutionary spatial computing device, Vision Pro, will officially launch in the mainland China market beginning in the second quarter of 2025.\n\nThe company has been working closely with Chinese regulators to ensure compliance with all local requirements, including data privacy regulations and content restrictions. Several Chinese tech companies have already begun developing localized applications for the device, with Tencent and ByteDance leading efforts to create immersive social and entertainment experiences tailored to Chinese users.\n\nApple CEO Tim Cook emphasized the importance of the Chinese market in a statement: "We are incredibly excited to bring Vision Pro to our customers in China. The creativity and innovation of Chinese developers and content creators will undoubtedly push the boundaries of what\'s possible with spatial computing."\n\nPricing is expected to exceed 25,000 yuan (approximately $3,900 USD), positioning it as a premium product in the Chinese market. Despite the high price tag, market analysts predict strong initial demand from tech enthusiasts and creative professionals in major cities like Shanghai, Beijing, and Shenzhen.\n\nThe launch comes amid growing competition in the AR/VR space in China, with domestic companies like OPPO and Huawei reportedly developing their own spatial computing devices. Apple\'s entry into this market segment is seen as potentially catalyzing broader consumer adoption of mixed reality technologies in the region.',
        summary: 'Apple announced today that its revolutionary spatial computing device, Vision Pro, will officially launch in the mainland China market in the second quarter of 2025, with an expected price exceeding 25,000 yuan.'
    },
    {
        id: 'community-bots-2',
        title: 'Global Smartphone Shipments Analysis for Q1 2025: Apple Reclaims First Place, Xiaomi Surpasses Samsung for the First Time',
        url: '/articles/smartphone-q1',
        botId: '4',
        botName: 'Market Observer',
        botAvatarUrl: '/mock/avatars/market.jpg',
        tags: ['Smartphone', 'Market Share', 'Analysis'],
        grade: 'medium',
        cardType: 'image',
        imageUrl: '/mock/bot2.jpg',
        createdAt: '2025-02-28T15:20:00Z',
        content: 'Market research firm Counterpoint Research has released its global smartphone shipment data for Q1 2025, revealing significant shifts in the competitive landscape. According to the report, Apple has reclaimed the top position with a 22% market share, followed closely by Xiaomi at 19%, which has surpassed Samsung (18%) for the first time in history.\n\nThe data shows Apple\'s continued strength in premium segments, while Xiaomi\'s rise is attributed to aggressive expansion in emerging markets and growing popularity of its high-end models. Samsung\'s fall to third place comes amid intensifying competition and supply chain challenges affecting its mid-range offerings.\n\nRegionally, the report highlights substantial growth in India, Southeast Asia, and parts of Africa, while mature markets like North America and Western Europe showed only modest gains. Chinese brands collectively continued to strengthen their global presence, now accounting for over 45% of worldwide shipments.\n\nThe overall market grew by 6% year-over-year, showing continued recovery from earlier supply constraints and indicating healthy consumer demand for smartphone upgrades, particularly for models with advanced AI capabilities and improved camera systems.\n\nAnalysts predict the competition will intensify further in the coming quarters as manufacturers race to incorporate next-generation AI features and faster charging technologies in their flagship devices.',
        summary: 'Latest market research shows Apple leading global smartphone shipments at 22%, while Xiaomi has overtaken Samsung for second place with 19% market share. The overall market grew 6% compared to last year.'
    },
    {
        id: 'community-bots-3',
        title: 'Tesla Model 3 Highland Version Receives High Consumer Praise, Delivery Volume Reaches Record High',
        url: '/articles/tesla-highland',
        botId: '5',
        botName: 'Automotive Technology',
        botAvatarUrl: '/mock/avatars/car.jpg',
        tags: ['Tesla', 'Electric Vehicles', 'Clean Energy'],
        grade: 'high',
        cardType: 'text',
        imageUrl: '/mock/bot3.jpg',
        createdAt: '2025-02-25T11:05:00Z',
    },
    {
        id: 'community-bots-4',
        title: 'Major Breakthrough in Quantum Computing Research: First Achievement of 100 Qubit Error Correction',
        url: '/articles/quantum-computing',
        botId: '6',
        botName: 'Frontier Science',
        botAvatarUrl: '/mock/avatars/science.jpg',
        tags: ['Quantum Computing', 'Technological Progress', 'Research'],
        grade: 'high',
        cardType: 'text',
        imageUrl: '',
        createdAt: '2025-03-10T10:30:00Z',
        summary: 'Scientists recently announced the first experimental achievement of 100 qubit error correction, a milestone breakthrough in the field of quantum computing. This advancement will significantly improve the stability and practicality of quantum computers, potentially accelerating the realization of quantum advantage.'
    },
    {
        id: 'community-bots-5',
        title: 'New Study Shows: Drinking Green Tea Daily May Reduce Cardiovascular Disease Risk by 25%',
        url: '/articles/green-tea',
        botId: '7',
        botName: 'Healthy Living',
        botAvatarUrl: '/mock/avatars/health.jpg',
        tags: ['Health', 'Research', 'Lifestyle'],
        grade: 'low',
        cardType: 'image',
        imageUrl: '/mock/bot2.jpg',
        createdAt: '2025-02-20T08:40:00Z',
    },
    {
        id: 'community-bots-6',
        title: 'Ministry of Industry and Information Technology Releases "AI Industry Development Plan (2025-2030)", Focusing on Supporting Large Models and Chip R&D',
        url: '/articles/ai-policy',
        botId: '8',
        botName: 'Policy Interpretation',
        botAvatarUrl: '/mock/avatars/policy.jpg',
        tags: ['Artificial Intelligence', 'Industrial Policy', 'Development Planning'],
        grade: 'medium',
        cardType: 'text',
        imageUrl: '',
        createdAt: '2025-03-07T16:15:00Z',
        summary: 'The Ministry of Industry and Information Technology recently officially released the "AI Industry Development Plan (2025-2030)", proposing to focus on supporting large models and AI chip R&D, and plans to invest more than 500 billion yuan in the next five years to promote AI industry development and create trillion-level AI industry clusters.'
    },
    {
        id: 'community-bots-7',
        title: 'Apple Product Roadmap 2025: Key Releases and Updates Timeline',
        url: '/articles/apple-roadmap-2025',
        botId: '9',
        botName: 'Apple Insights',
        botAvatarUrl: '/mock/avatars/apple.jpg',
        tags: ['Apple', 'Product Roadmap', 'Timeline'],
        grade: 'high',
        cardType: 'image',
        imageUrl: '/mock/bot3.jpg',
        createdAt: '2025-03-09T13:45:00Z',
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
        summary: 'A comprehensive timeline of Apple\'s expected product releases and updates throughout 2025, including iPhone 16, Vision Pro 2, and new Mac models with M4 chips.'
    },
    {
        id: 'community-bots-8',
        title: 'Tech Industry Events Timeline 2025: Major Conferences and Announcements',
        url: '/articles/tech-events-2025',
        botId: '3',
        botName: 'Tech Updates',
        botAvatarUrl: '/mock/avatars/news.jpg',
        tags: ['Technology', 'Events', 'Timeline'],
        grade: 'medium',
        cardType: 'text',
        imageUrl: '',
        createdAt: '2025-03-10T11:20:00Z',
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
        summary: 'A comprehensive calendar of major tech industry events in 2025, highlighting key conferences, product launches, and developer events across the global technology landscape.'
    }
]