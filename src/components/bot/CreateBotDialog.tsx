"use client";
/**
 * 创建机器人对话框组件
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Check, Copy, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { botActions, useBotStore } from "@/store/bot";
import { createBotSchema } from "@/schemas/bot";
import type { CreateBotSchema } from "@/schemas/bot";
import { throttle } from "lodash";
// 导入解耦后的组件和hooks
import { ConfettiEffect } from "@/components/animations/ConfettiEffect";
import { useSidebarSound } from "@/hooks/useSidebarSound";


export function CreateBotDialog() {
  // 全局状态管理 - 从Bot存储中获取数据
  const { createDialogOpen, bots, maxBots, isLoading } = useBotStore();
  const { playSound } = useSidebarSound();
  
  // 本地状态管理
  const [formData, setFormData] = useState<CreateBotSchema>({ 
    name: "", 
    theme: "",
    avatarUrl: "/mock/default-bot.jpg",
    status: "online",
    hasNewMessage: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false); // 添加成功动画状态
  const [playConfetti, setPlayConfetti] = useState(false); // 彩带动画控制状态
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 计算机器人限制数据
  const currentBotCount = bots.length;
  const remainingBots = maxBots - currentBotCount;
  const isLimitReached = remainingBots <= 0;

  // 生成分享链接
  const shareLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/bot/${Date.now().toString(36)}`;
  
  // 创建截流提交函数引用
  const throttledSubmitRef = useRef<ReturnType<typeof throttle>>(null);
  
  // 创建截流复制函数的引用
  const throttledCopyRef = useRef<ReturnType<typeof throttle>>(null);
  
  /**
   * 处理表单提交 - 带有截流的乐观式更新
   * 添加苹果风格动画反馈，立即关闭弹窗
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // 懒初始化截流函数 - 防止重复提交
    if (!throttledSubmitRef.current) {
      throttledSubmitRef.current = throttle(() => {
        try {
          // 使用Zod验证表单数据
          createBotSchema.parse(formData);
          
          // 播放苹果风格点击音效提供听觉反馈
          playSound("/music/takeout-click.mp3");
          
          // 触发成功动画效果
          setAnimateSuccess(true);
          
          // 触发彩带动画
          setPlayConfetti(true);
          
          // 创建机器人（乐观式更新）
          botActions.createBot({
            name: formData.name,
            avatarUrl: "/mock/default-bot.jpg",
            href: `/bots/${formData.theme.toLowerCase().replace(/\s+/g, '-')}`,
            status: "online",
            hasNewMessage: false
          });
          
          // 彩带动画完成后自动处理（动画组件会调用onComplete）
        } catch (error) {
          // 错误处理 - 格式化Zod验证错误
          if (error instanceof z.ZodError) {
            const formattedErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                formattedErrors[err.path[0] as string] = err.message;
              }
            });
            setErrors(formattedErrors);
            
            // 播放错误音效提供听觉反馈
            playSound("/music/error-sound.mp3");
          }
        }
      }, 1000, { leading: true, trailing: false }); // 只处理首次点击，防止重复提交
    }
    
    // 调用截流函数
    throttledSubmitRef.current();
  }, [formData, playSound]);
  
  /**
   * 彩带动画完成回调
   * 动画播放完成后关闭对话框
   */
  const handleConfettiComplete = useCallback(() => {
    // 关闭创建对话框
    botActions.closeCreateDialog();
    
    // 重置表单和动画状态（对话框关闭后）
    setTimeout(() => {
      setFormData({ 
        name: "", 
        theme: "",
        avatarUrl: "/mock/default-bot.jpg",
        status: "online",
        hasNewMessage: false
      });
      setErrors({});
      setAnimateSuccess(false);
      setPlayConfetti(false);
    }, 100);
  }, []);
  
  /**
   * 处理输入变化 - 实时更新表单数据
   * 更新表单状态并清除相关字段的错误
   */
  const handleInputChange = (field: keyof CreateBotSchema, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 清除当前字段的错误信息
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  /**
   * 处理复制链接功能 - 使用截流防止频繁点击
   * 带有视觉反馈动画
   */
  const handleCopy = useCallback(() => {
    // 懒初始化截流函数
    if (!throttledCopyRef.current) {
      throttledCopyRef.current = throttle(() => {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard.writeText(shareLink);
          setCopied(true);
          
          // 播放复制成功音效
          playSound("/music/copy-sound.mp3");
          
          // 重置复制状态
          setTimeout(() => setCopied(false), 1500);
        }
      }, 1000);
    }
    
    // 调用截流函数
    throttledCopyRef.current();
  }, [shareLink, playSound]);
  
  /**
   * 对话框状态管理
   * 当对话框关闭时重置表单状态
   */
  useEffect(() => {
    if (!createDialogOpen) {
      setFormData({ 
        name: "", 
        theme: "",
        avatarUrl: "/mock/default-bot.jpg",
        status: "online",
        hasNewMessage: false
      });
      setErrors({});
      setPlayConfetti(false);
    }
  }, [createDialogOpen]);
  
  /**
   * 处理对话框关闭
   */
  const handleClose = () => {
    // 播放关闭音效
    playSound("/music/close-sound.mp3");
    botActions.closeCreateDialog();
  };
  
  return (
    <Dialog 
      open={createDialogOpen && !isLimitReached} 
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      aria-labelledby="create-bot-dialog"
      aria-describedby="create-personalized-ai-assistant"
    >
      {/* 使用解耦的彩带动画组件 */}
      <ConfettiEffect 
        play={playConfetti} 
        duration={800}
        onComplete={handleConfettiComplete}
      />
      
      <DialogContent 
        className="sm:max-w-[425px] transform transition-all duration-300 animate-in fade-in-50 zoom-in-95 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95"
        aria-modal="true"
      >
        {/* 图标头部区域 */}
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e1e1e1] dark:border-gray-700 transition-transform duration-300 hover:scale-105"
            aria-hidden="true"
          >
            <Bot className="size-6 text-[#0071e3] dark:text-[#0A84FF]" />
          </div>
          
          {/* 对话框标题区域 */}
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-[#1d1d1f] dark:text-white">
              Create New Bot
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Design your personal AI assistant with custom theme
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {/* 表单区域 - 机器人信息输入 */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-4">
            {/* 机器人名称输入区域 */}
            <div className="space-y-2">
              <Label htmlFor="bot-name" className="text-[#1d1d1f] dark:text-gray-200">
                Bot Name
                <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </Label>
              <Input
                id="bot-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter bot name"
                className={cn(
                  "border-[#e1e1e1] dark:border-gray-700 bg-white dark:bg-gray-800",
                  "focus:border-[#0071e3] dark:focus:border-[#0A84FF] focus:ring-1 focus:ring-[#0071e3] dark:focus:ring-[#0A84FF]",
                  "transition-all duration-200 ease-in-out",
                  errors.name && "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                )}
                disabled={isLoading}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-500" role="alert">{errors.name}</p>
              )}
            </div>
            
            {/* 机器人主题输入区域 */}
            <div className="space-y-2">
              <Label htmlFor="bot-theme" className="text-[#1d1d1f] dark:text-gray-200">
                Bot Theme
                <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </Label>
              <Input
                id="bot-theme"
                value={formData.theme}
                onChange={(e) => handleInputChange("theme", e.target.value)}
                placeholder="Enter bot theme (e.g. Assistant, Research)"
                className={cn(
                  "border-[#e1e1e1] dark:border-gray-700 bg-white dark:bg-gray-800",
                  "focus:border-[#0071e3] dark:focus:border-[#0A84FF] focus:ring-1 focus:ring-[#0071e3] dark:focus:ring-[#0A84FF]",
                  "transition-all duration-200 ease-in-out",
                  errors.theme && "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                )}
                disabled={isLoading}
                required
                aria-required="true"
                aria-invalid={!!errors.theme}
                aria-describedby={errors.theme ? "theme-error" : undefined}
              />
              {errors.theme && (
                <p id="theme-error" className="text-xs text-red-500" role="alert">{errors.theme}</p>
              )}
            </div>
          </div>
          
          {/* 创建按钮 - 去除加载状态显示，采用乐观式更新 */}
          <Button 
            type="submit" 
            className={cn(
              "w-full bg-[#0071e3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#0A8DFF] text-white",
              "transition-all duration-300 transform active:scale-98",
              "focus:outline-none focus:ring-2 focus:ring-[#0071e3] dark:focus:ring-[#0A84FF] focus:ring-offset-2",
              animateSuccess && "animate-success" // 使用自定义动画类
            )}
            aria-busy={isLoading}
          >
            <Image 
              src="/svg/bot-default.svg" 
              alt="" 
              width={20} 
              height={20} 
              className="mr-2" 
              aria-hidden="true" 
            />
            Create Bot
          </Button>
        </form>

        {/* 分隔线 */}
        <hr className="border-t border-[#e1e1e1] dark:border-gray-700 my-4" />

        {/* 分享链接区域 */}
        <div className="space-y-2">
          <Label htmlFor="share-link" className="text-[#1d1d1f] dark:text-gray-200">Share Link</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              id="share-link"
              className="pe-9 border-[#e1e1e1] dark:border-gray-700 bg-white dark:bg-gray-800"
              type="text"
              value={shareLink}
              readOnly
              aria-readonly="true"
            />
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-gray-500 dark:text-gray-400 outline-offset-2 transition-colors hover:text-[#0071e3] dark:hover:text-[#0A84FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0071e3] dark:focus-visible:outline-[#0A84FF] disabled:pointer-events-none disabled:cursor-not-allowed"
                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                    disabled={copied}
                    type="button"
                  >
                    <div
                      className={cn(
                        "transition-all duration-200",
                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                      aria-hidden="true"
                    >
                      <Check
                        className="stroke-emerald-500"
                        size={16}
                        strokeWidth={2}
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all duration-200",
                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                      )}
                      aria-hidden="true"
                    >
                      <Copy size={16} strokeWidth={2} />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-1 text-xs" role="tooltip">
                  {copied ? "Copied!" : "Copy to clipboard"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 