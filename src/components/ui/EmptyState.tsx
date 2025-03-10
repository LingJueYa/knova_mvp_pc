import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No content found",
  message = "Take a break and try again later. Good content is being prepared...",
  icon,
  className = "",
}) => {
  return (
    <motion.div 
      className={`w-full flex flex-col items-center justify-center py-16 px-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 max-w-md mx-auto flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 text-orange-400 dark:text-orange-300">
          {icon ? (
            icon
          ) : (
            <div className="relative w-20 h-20">
              <Image
                src="/svg/empty-state.svg"
                alt="Empty state"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
        
        {/* Title */}
        {title && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
        )}
        
        {/* Message */}
        {message && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;
