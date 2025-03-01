"use client";

import React from 'react'
import { useSnapshot } from 'valtio'
import { motion, AnimatePresence } from "framer-motion"
import { Compass, ArrowUp, Pencil } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { chatState, chatActions } from '@/store/chat-demo'
import { chatInputSchema } from '@/schemas/chat'
import { debounce, throttle } from 'lodash'

// 组件属性类型定义
interface AIInputWithSearchProps {
  /** 输入框唯一标识 */
  id?: string
  /** 输入框占位符文本 */
  placeholder?: string
  /** 输入框最小高度(px) */
  minHeight?: number
  /** 输入框最大高度(px) */
  maxHeight?: number
  /** 提交回调函数 */
  onSubmit?: (value: string, withSearch: boolean) => void
  /** 文件选择回调函数 */
  onFileSelect?: (file: File) => void
  /** 自定义类名 */
  className?: string
}

export function AIInputWithSearch({
  id = "ai-input-with-search",
  placeholder = "输入您的问题",
  minHeight = 48,
  maxHeight = 164,
  onSubmit,
  className
}: AIInputWithSearchProps) {
  // 状态和钩子初始化
  const snap = useSnapshot(chatState)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  })
  const [localValue, setLocalValue] = React.useState("")

  // 使用 useCallback 包装防抖的输入处理
  const debouncedInputChange = React.useCallback((value: string) => {
    const debouncedFn = debounce((val: string) => {
      if (!snap.isComposing) {
        chatActions.setInputValue(val)
      }
    }, 300)
    debouncedFn(value)
    return () => debouncedFn.cancel()
  }, [snap.isComposing])

  // 使用 useCallback 包装节流的提交处理
  const throttledSubmit = React.useCallback(() => {
    const throttledFn = throttle(() => {
      try {
        const trimmedValue = snap.inputValue.trim()
        chatInputSchema.parse({ message: trimmedValue })
        chatActions.submitMessage(trimmedValue)
        onSubmit?.(trimmedValue, snap.guidedMode)
        adjustHeight(true)
      } catch (error) {
        console.error(error)
      }
    }, 1000, { trailing: false })
    throttledFn()
    return () => throttledFn.cancel()
  }, [snap.inputValue, snap.guidedMode, onSubmit, adjustHeight])

  // 同步外部状态到本地状态
  React.useEffect(() => {
    setLocalValue(snap.inputValue)
  }, [snap.inputValue])

  // 输入处理函数
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setLocalValue(value)
    debouncedInputChange(value)
    adjustHeight()
  }

  // 提交处理函数
  const handleSubmit = () => {
    if (!snap.isSendingDisabled) {
      throttledSubmit()
    }
  }

  return (
    <div 
      className={cn("w-full py-4", className)}
      role="form"
      aria-label="AI 聊天输入区域"
    >
      <div className="relative max-w-[800px] w-full mx-auto">
        {/* 输入框容器 */}
        <div className="flex w-full cursor-text flex-col rounded-[24px] border border-token-border-light px-3 py-2 
          shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]
          has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]
          transition-all duration-150 ease-in-out bg-white"
          role="textbox"
          aria-label="消息输入框"
        >
          {/* 文本输入区域 */}
          <div className="flex flex-col justify-start">
            <div className="flex min-h-[46px] items-start pl-1">
              <div className="min-w-0 max-w-full flex-1">
                <Textarea
                  id={id}
                  value={localValue}
                  placeholder={placeholder}
                  className="block w-full resize-none border-0 bg-transparent px-0 py-3 
                    text-base placeholder:text-[#b7b7b7] focus-visible:ring-0 
                    outline-none focus:outline-none active:outline-none hover:outline-none
                    transition-all duration-200 ease-out"
                  style={{
                    height: '40px',
                    minHeight: '40px',
                    lineHeight: '20px',
                    outline: 'none',
                    boxShadow: 'none',
                    transform: snap.isComposing ? 'scale(1.001)' : 'scale(1)',
                  }}
                  ref={textareaRef}
                  onCompositionStart={() => chatActions.setCompositionState(true)}
                  onCompositionEnd={(e: React.CompositionEvent<HTMLTextAreaElement>) => {
                    chatActions.setCompositionState(false)
                    const value = e.currentTarget.value
                    setLocalValue(value)
                    chatActions.setInputValue(value)
                  }}
                  onChange={handleInputChange}
                  aria-label="聊天输入框"
                  role="textbox"
                  aria-multiline="true"
                />
              </div>
            </div>
          </div>

          {/* 底部工具栏 */}
          <div className="mb-1 mt-2 flex items-center justify-between sm:mt-5">
            {/* 引导模式切换按钮 */}
            <div className="flex gap-x-1.5">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => chatActions.setguidedMode(!snap.guidedMode)}
                      className={cn(
                        "flex h-9 min-w-8 items-center justify-center rounded-full border p-2 text-[13px] gap-2 transition-colors",
                        snap.guidedMode
                          ? "bg-[#EBF3FC] border-0"
                          : "border-token-border-light hover:bg-token-main-surface-secondary text-black/60"
                      )}
                      aria-label={`${snap.guidedMode ? '关闭' : '开启'}引导模式`}
                      aria-pressed={snap.guidedMode}
                    >
                      {/* 指南针图标动画 */}
                      <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                        <motion.div
                          animate={{
                            rotate: snap.guidedMode ? 180 : 0,
                            scale: snap.guidedMode ? 1.1 : 1,
                            translateY: 0,
                            translateX: 0
                          }}
                          whileHover={{
                            rotate: snap.guidedMode ? 180 : 15,
                            scale: 1.1,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            },
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25,
                          }}
                        >
                          <Compass
                            className={cn(
                              "h-[18px] w-[18px]",
                              snap.guidedMode ? "text-[#3A83F7]" : "text-inherit"
                            )}
                          />
                        </motion.div>
                      </div>
                      
                      {/* 引导模式文本动画 */}
                      <AnimatePresence>
                        {snap.guidedMode && (
                          <motion.span
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm overflow-hidden whitespace-nowrap text-[#3A83F7] flex-shrink-0"
                          >
                            Guided Mode
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help you ask questions quickly by selecting</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* 发送按钮 */}
            <div className="flex gap-x-1.5">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={snap.isSendingDisabled}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  snap.inputValue && !snap.isSendingDisabled
                    ? "bg-black text-white hover:opacity-70"
                    : "bg-black/5 text-black cursor-not-allowed"
                )}
                aria-label="发送消息"
              >
                <AnimatePresence mode="wait">
                  {snap.inputValue ? (
                    <motion.div
                      key="arrow"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowUp className="h-[18px] w-[18px] stroke-[2.5]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pencil"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pencil className="h-[18px] w-[18px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 输入法组合状态 */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
        role="status"
        aria-label="输入法组合状态"
        initial={false}
        animate={{
          width: snap.isComposing ? '100%' : '0%',
          opacity: snap.isComposing ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
    </div>
  )
}
