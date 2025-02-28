import { queryExamples } from "@/data/queryExamples";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { chatActions } from '@/store/chat';

export default function GuessAsking() {
  return (
    <div className="w-full max-w-2xl px-4">
      <motion.h3 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-600 mb-4 text-base pl-1"
      >
        Guess what you&apos;re asking.
      </motion.h3>
      
      <div className="space-y-2">
        {queryExamples.map((query, index) => (
          <motion.button
            key={query.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ 
              x: 2,
              scale: 1.005,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30
              }
            }}
            whileTap={{ 
              scale: 0.995,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 20
              }
            }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: index * 0.05
            }}
            className="w-full group text-left"
            onClick={() => {
              chatActions.setInputValue(query.text)
              chatActions.setSearchMode(false)
            }}
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
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </motion.div>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
