import { motion } from "framer-motion";
import { useSnapshot } from 'valtio'
import { chatState, chatActions } from '@/store/chat'
import { useEffect, useRef } from 'react'

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
      <div 
        className="space-y-6 py-8 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-none"
      >
        {snap.messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-[15px] leading-normal whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </motion.div>
        ))}

        {/* 加载状态骨架屏 */}
        {snap.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: [0.76, 0, 0.24, 1], // 使用 easeInOutExpo 缓动函数
              }}
              className="text-xl"
            >
              ✨
            </motion.div>
            <div className="flex-1 max-w-[280px] space-y-3">
              <motion.div 
                className="h-[18px] bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.98, 1, 0.98]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="h-[18px] bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.98, 1, 0.98]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.15
                }}
              />
              <motion.div 
                className="h-[18px] bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-2/3"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.98, 1, 0.98]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Dify 推荐选项 */}
        {snap.difyResponse && !snap.isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <p className="text-sm text-gray-500">Questions that may be of interest to you：</p>
            <div className="flex flex-wrap gap-2">
              {snap.difyResponse.recommendations.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => chatActions.selectRecommendation(option)}
                  className={`px-4 py-2 border rounded-full transition-all duration-200
                    text-sm ${
                      snap.selectedQuestion === option
                        ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  disabled={snap.isSendingDisabled}
                >
                  {option.replace(/^您可能感兴趣的问题：\n/, '')}
                </motion.button>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm text-gray-500">If there is nothing you would like to ask, please continue with your question.</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => chatActions.refineQuestion()}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full 
                    hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
                    text-sm text-gray-700"
                  disabled={!snap.selectedQuestion || snap.isSendingDisabled}
                >
                  细化
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    chatActions.startNewQuestion()
                    chatState.difyResponse = null // 清除推荐问题
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full 
                    hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
                    text-sm text-gray-700"
                  disabled={!snap.selectedQuestion || snap.isSendingDisabled}
                >
                  提问
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 用于自动滚动的空白 div */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 