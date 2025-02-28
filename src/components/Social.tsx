import { Send, Twitch, Instagram, Shield } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Social = () => {
  const socialItems = [
    { 
      icon: Shield, 
      label: "Guard your privacy", 
      color: "text-success hover:text-success/80",
      ariaLabel: "保护隐私"
    },
    { 
      icon: Send, 
      label: "Telegram", 
      color: "text-[#7D7D7D] hover:text-black/80",
      ariaLabel: "访问 Telegram 频道"
    },
    { 
      icon: Twitch, 
      label: "Twitch", 
      color: "text-[#7D7D7D] hover:text-black/80",
      ariaLabel: "访问 Twitch 频道"
    },
    { 
      icon: Instagram, 
      label: "Instagram", 
      color: "text-[#7D7D7D] hover:text-black/80",
      ariaLabel: "访问 Instagram 主页"
    },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div 
        className="flex items-center h-9 space-x-1"
        role="navigation"
        aria-label="社交媒体链接"
      >
        {socialItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button 
                className={`p-1.5 rounded-lg transition-all duration-300 ease-in-out ${item.color} focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-110`}
                aria-label={item.ariaLabel}
              >
                <item.icon className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default Social