import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from 'valtio'
import { chatState } from '@/store/chat-demo'
import { useEffect, useRef } from 'react'
import { StreamingText } from "./StreamingTextDemo"
import { ThinkingSkeletonAnimation } from "./animations/ThinkingSkeletonAnimationDemo"
import { chatActions } from '@/store/chat-demo'
import { ArticleShowcase } from './ArticleShowcaseDemo'
import { Skeleton } from "@/components/ui/skeleton"
import { ConfettiAnimation } from './animations/ConfettiAnimationDemo'

export default function ChatMessages() {
  const snap = useSnapshot(chatState)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 当消息更新时滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [snap.messages])

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="space-y-6 py-8 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-none">
        {/* 历史消息 */}
        <AnimatePresence mode="wait">
          {snap.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-black/90 text-white' 
                    : 'bg-white text-gray-700 border border-gray-100' // 移除了问题的特殊样式，统一使用白色背景
                }`}
              >
                {message.content}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 骨架屏动画 */}
        <AnimatePresence mode="wait">
          {snap.isLoading && <ThinkingSkeletonAnimation />}
        </AnimatePresence>

        {/* 流式思考文本 */}
        <AnimatePresence mode="wait">
          {snap.isStreaming && snap.currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <motion.div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-gray-700 border border-gray-100">
                
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/image/think.gif" alt="thinking" className="w-5 h-5" />
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
               
                <StreamingText 
                  text={snap.currentQuestion.think} 
                  onComplete={() => {
                    chatState.isStreaming = false
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 当前问题的选项 */}
        <AnimatePresence mode="wait">
          {snap.currentQuestion && !snap.isStreaming && !snap.isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={snap.currentQuestion.id}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {snap.currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => chatActions.selectInvestmentOption(option.text)}
                    className="px-4 py-2 rounded-full bg-white border border-gray-200 
                      text-sm text-gray-700 hover:border-blue-300 hover:shadow-sm
                      transition-all duration-200"
                    disabled={snap.isSendingDisabled}
                  >
                    {`${option.id}. ${option.text}`}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 过渡内容和彩带 */}
        <AnimatePresence>
          {snap.showTransition && (
            <>
              <ConfettiAnimation />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-10"
              >
                <motion.div 
                  className="max-w-[80%] rounded-2xl px-6 py-4 bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="/image/great.gif" 
                      alt="great" 
                      className="w-6 h-6"
                    />
                    <span className="text-gray-800">
                      That&apos;s great! You have asked a perfect question.
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 结论轮播 */}
        <AnimatePresence>
          {snap.showConclusions && snap.currentConclusion && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-10"
            >
              <motion.div 
                className="max-w-[80%] rounded-2xl px-6 py-4 bg-white border border-gray-100 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={snap.currentConclusion.gif} 
                      alt="conclusion" 
                      className="w-6 h-6"
                    />
                    <span className="text-sm text-gray-500">
                      {snap.currentConclusion.text}
                    </span>
                  </div>
                  <StreamingText 
                    text={snap.currentConclusion.think} 
                    onComplete={() => {
                      // 当前结论播放完成后，延迟一会儿再播放下一个
                      setTimeout(() => {
                        chatActions.playNextConclusion();
                      }, 1000);
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 加载动画 */}
        <AnimatePresence>
          {snap.showArticleLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto space-y-4 px-4"
            >
              {/* 标题骨架屏 */}
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              
              {/* 内容骨架屏 */}
              <div className="space-y-3 mt-6">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Skeleton 
                    key={index} 
                    className={`h-4 ${
                      index % 3 === 0 ? 'w-full' : 
                      index % 3 === 1 ? 'w-11/12' : 'w-4/5'
                    }`} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 文章展示组件 */}
        <AnimatePresence>
          {snap.showArticleShowcase && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArticleShowcase />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 