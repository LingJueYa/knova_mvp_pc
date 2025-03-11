import { Send, Shield } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import dynamic from "next/dynamic"
import { SocialItem, SocialProps } from "@/types/social"

// 动态导入SVG组件
const XIcon = dynamic(() => import("@/components/icons/XIcon"))
const YoutubeIcon = dynamic(() => import("@/components/icons/YoutubeIcon"))
const DiscordIcon = dynamic(() => import("@/components/icons/DiscordIcon"))

/**
 * 社交媒体图标组件
 * 默认灰色，hover时显示品牌特定颜色
 */
const Social = ({ className, additionalItems = [] }: SocialProps = {}) => {
  const socialItems: SocialItem[] = [
    { 
      type: 'lucide',
      icon: Shield, 
      tooltip: "Guard your privacy", 
      color: "text-emerald-600 hover:text-emerald-600",
      ariaLabel: "保护隐私"
    },
    { 
      type: 'lucide',
      icon: Send, 
      tooltip: "Telegram", 
      color: "text-gray-500 hover:text-[#229ED9]",
      ariaLabel: "访问 Telegram 频道"
    },
    { 
      type: 'component',
      icon: XIcon, 
      tooltip: "X", 
      color: "text-gray-500 hover:text-[#333333]",
      ariaLabel: "访问 X 主页"
    },
    { 
      type: 'component',
      icon: YoutubeIcon, 
      tooltip: "YouTube", 
      color: "text-gray-500 hover:text-[#CC0000]",
      ariaLabel: "访问 YouTube 频道"
    },
    { 
      type: 'component',
      icon: DiscordIcon, 
      tooltip: "Discord", 
      color: "text-gray-500 hover:text-[#5865F2]",
      ariaLabel: "加入 Discord 社区"
    },
  ]

  // 合并额外的社交媒体项（如果有）
  const allItems = [...socialItems, ...additionalItems]

  return (
    <TooltipProvider delayDuration={200}>
      <div 
        className={`flex items-center space-x-1 h-9 ${className || ''}`}
        role="navigation"
        aria-label="社交媒体链接"
      >
        {allItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button 
                className={`p-1.5 rounded-lg transition-all duration-300 ease-in-out ${item.color} focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-100`}
                aria-label={item.ariaLabel}
              >
                {item.type === 'lucide' ? (
                  // Lucide 图标渲染
                  <item.icon className="w-5 h-5" />
                ) : item.type === 'component' ? (
                  // 自定义SVG组件渲染
                  <item.icon className="w-5 h-5" />
                ) : (
                  // 其他情况（应该不会发生，只是为了类型安全）
                  <div className="w-5 h-5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default Social