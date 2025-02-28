"use client";

import { Compass, ArrowUp, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSnapshot } from 'valtio'
import { chatState, chatActions } from '@/store/chat'
import { chatInputSchema } from '@/schemas/chat'
import React from 'react'

interface AIInputWithSearchProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  onSubmit?: (value: string, withSearch: boolean) => void;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function AIInputWithSearch({
  id = "ai-input-with-search",
  placeholder = "Ask any questions",
  minHeight = 48,
  maxHeight = 164,
  onSubmit,
  className
}: AIInputWithSearchProps) {
  const snap = useSnapshot(chatState)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [localValue, setLocalValue] = React.useState("")

  // 使用 useEffect 来同步外部状态到本地状态
  React.useEffect(() => {
    setLocalValue(snap.inputValue)
  }, [snap.inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setLocalValue(value)
    if (!snap.isComposing) {
      chatActions.setInputValue(value)
    }
    adjustHeight()
  }

  const handleSubmit = () => {
    try {
      chatInputSchema.parse({ message: snap.inputValue.trim() })
      onSubmit?.(snap.inputValue, snap.searchMode)
      chatActions.reset()
      adjustHeight(true)
    } catch (error) {
      // 处理校验错误
      console.error(error)
    }
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-[800px] w-full mx-auto">
        <div className="flex w-full cursor-text flex-col rounded-[24px] border border-token-border-light px-3 py-2 
          shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]
          has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)]
          transition-all duration-150 ease-in-out bg-white"
        >
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
                  onCompositionStart={() => {
                    chatActions.setCompositionState(true)
                  }}
                  onCompositionEnd={(e: React.CompositionEvent<HTMLTextAreaElement>) => {
                    chatActions.setCompositionState(false)
                    const value = e.currentTarget.value
                    setLocalValue(value)
                    chatActions.setInputValue(value)
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-1 mt-2 flex items-center justify-between sm:mt-5">
            <div className="flex gap-x-1.5">
            <TooltipProvider delayDuration={200}>
            <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => chatActions.setSearchMode(!snap.searchMode)}
                className={cn(
                  "flex h-9 min-w-8 items-center justify-center rounded-full border p-2 text-[13px] gap-2 transition-colors",
                  snap.searchMode
                    ? "bg-[#EBF3FC] border-0"
                    : "border-token-border-light hover:bg-token-main-surface-secondary text-black/60"
                )}
              >
                <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={{
                      rotate: snap.searchMode ? 180 : 0,
                      scale: snap.searchMode ? 1.1 : 1,
                      translateY: 0,
                      translateX: 0
                    }}
                    whileHover={{
                      rotate: snap.searchMode ? 180 : 15,
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
                        snap.searchMode ? "text-[#3A83F7]" : "text-inherit"
                      )}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {snap.searchMode && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: "auto",
                        opacity: 1,
                      }}
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
                    <p>Help you ask questions quickly with a choice</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-x-1.5">
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  snap.inputValue
                    ? "bg-black text-white hover:opacity-70"
                    : "bg-black/5 text-black"
                )}
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

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
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
  );
}
