import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { chatState } from "../store/chat-demo"

interface StreamingTextProps {
  text: string
  onComplete?: () => void
}

export function StreamingText({ text, onComplete }: StreamingTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // 重置状态
    setDisplayText('')
    setCurrentIndex(0)
    chatState.streamingComplete = false;
  }, [text]) // 当文本改变时重置

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 30)

      return () => clearTimeout(timer)
    } else {
      // 当文本完全显示后，标记为完成
      chatState.streamingComplete = true;
      onComplete?.();
    }
  }, [currentIndex, text, onComplete])

  // 将文本按换行符分割并渲染，添加动画效果
  return (
    <motion.div 
      className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {displayText.split('\n').map((line, index, array) => (
        <div key={index}>
          {line}
          {/* 如果不是最后一行，添加一个换行 */}
          {index < array.length - 1 && <br />}
        </div>
      ))}
    </motion.div>
  )
} 