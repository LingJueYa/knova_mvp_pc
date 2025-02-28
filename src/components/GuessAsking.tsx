import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { chatActions } from '@/store/chat';
import { guessQuestionData } from "@/data/guessQuestionData";

// 动画配置常量
const SPRING_ANIMATION = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

export default function GuessAsking() {
  return (
    <section 
      className="w-full max-w-2xl px-4"
      aria-label="Suggested questions section"
    >
      {/* 标题区域 */}
      <motion.h3 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-600 mb-4 text-[18px] font-medium pl-1"
      >
        Guess what you&apos;re asking.
      </motion.h3>
      
      {/* 问题列表区域 */}
      <div className="space-y-2" role="list">
        {guessQuestionData.map((query, index) => (
          <motion.button
            key={query.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ 
              x: 2,
              scale: 1.005,
              transition: SPRING_ANIMATION
            }}
            whileTap={{ 
              scale: 0.995,
              transition: {
                ...SPRING_ANIMATION,
                damping: 20
              }
            }}
            transition={{ 
              ...SPRING_ANIMATION,
              delay: index * 0.05 
            }}
            className="w-full group text-left"
            onClick={() => {
              chatActions.setInputValue(query.text);
              chatActions.setguidedMode(false);
            }}
            role="listitem"
            aria-label={`Select question: ${query.text}`}
          >
            <motion.div 
              className="w-fit px-4 py-2 rounded-full border border-dashed border-gray-200 
                hover:border-solid hover:border-gray-300 hover:bg-white/50
                transition-all duration-200 ease-in-out cursor-pointer
                group-hover:shadow-sm"
              whileHover={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
              }}
            >
              <div className="flex items-center justify-between gap-2 text-gray-600 group-hover:text-gray-900">
                <span className="text-[15px]">{query.text}</span>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 1 }}
                  transition={SPRING_ANIMATION}
                  aria-hidden="true"
                >
                  <ChevronRight 
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600" 
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
