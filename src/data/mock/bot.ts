// Mock Bots 数据

import { SidebarBotItemType } from "@/types/sidebar";

export const mockBots: SidebarBotItemType[] = [
  { id: "bot1", name: "Reddit Bot", avatarUrl: "/mock/bot1.jpg", href: "/bots/assistant", status: 'online', hasNewMessage: true },
  { id: "bot2", name: "Research Bot", avatarUrl: "/mock/bot2.jpg", href: "/bots/research", status: 'offline', hasNewMessage: false },
  { id: "bot3", name: "Creative Bot", avatarUrl: "/mock/bot3.jpg", href: "/bots/creative", status: 'busy', hasNewMessage: true },
  { id: "bot4", name: "Code Bot", avatarUrl: "/mock/bot4.jpg", href: "/bots/code", status: 'offline', hasNewMessage: false },
];
