import { motion } from "framer-motion"
import { chatActions } from '@/store/chat-demo'
import type { InvestmentQuestion } from '@/data/investment-questions'

interface QuestionWithOptionsProps {
  question: InvestmentQuestion
  disabled?: boolean
}

export function QuestionWithOptions({ question, disabled }: QuestionWithOptionsProps) {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
    >
      {/* 问题 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 
          font-medium rounded-2xl px-4 py-3 border border-gray-200"
      >
        {question.question}
      </motion.div>

      {/* 选项 */}
      <div className="flex flex-wrap gap-2">
        {question.options.map((option: { id: string; text: string }, index: number) => (
          <motion.button
            key={option.id}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.3 + index * 0.1 }
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => chatActions.selectInvestmentOption(option.text)}
            className="px-4 py-2 rounded-full bg-white border border-gray-200 
              text-sm text-gray-700 hover:border-blue-300 hover:shadow-sm
              transition-all duration-200"
            disabled={disabled}
          >
            {`${option.id}. ${option.text}`}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
} 