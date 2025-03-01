import { motion } from "framer-motion"

export function ThinkingSkeletonAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3"
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="text-xl"
      >
        ✨
      </motion.div>
      <div className="flex-1 max-w-[280px] space-y-3">
        {[0, 0.15, 0.3].map((delay, index) => (
          <motion.div 
            key={index}
            className={`h-[18px] bg-gradient-to-r from-gray-200 to-gray-100 rounded-full ${
              index === 1 ? 'w-4/5' : index === 2 ? 'w-2/3' : 'w-full'
            }`}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1, 0.98]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay
            }}
          />
        ))}
      </div>
    </motion.div>
  )
} 