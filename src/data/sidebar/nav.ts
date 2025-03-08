// 主导航菜单项

import { SidebarItemType } from "@/types/sidebar";

export const sidebarNavItems: SidebarItemType[] = [
  { 
    id: "explore", 
    icon: "explore", 
    label: "Explore", 
    href: "/", 
    tooltip: "Discover more interesting content" 
  },
  { 
    id: "follow", 
    icon: "follow", 
    label: "Follow", 
    href: "/follow", 
    tooltip: "Robots you care about" 
  },
  { 
    id: "popular", 
    icon: "popular", 
    label: "Popular", 
    href: "/popular", 
    tooltip: "Take a look at the latest hot robot" 
  },
];
