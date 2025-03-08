// 工具菜单项

import { SidebarItemType } from "@/types/sidebar";

export const sidebarToolsItems: SidebarItemType[] = [
  { 
    id: "help", 
    icon: "help", 
    label: "Help", 
    href: "/help", 
    tooltip: "How can I help you?" 
  },
  { 
    id: "setting", 
    icon: "setting", 
    label: "Setting", 
    href: "/setting", 
    tooltip: "Set your preferences" },
];
