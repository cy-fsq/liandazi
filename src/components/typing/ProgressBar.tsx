import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <motion.div 
      className="w-full mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        {/* 进度条背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-mint-100 via-lavender-100 to-cream-100" />
        
        {/* 进度条填充 */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-mint-400 via-mint-500 to-lavender-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* 进度条光效 */}
        {progress > 0 && progress < 100 && (
          <motion.div
            className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          />
        )}
        
        {/* 完成时的光效 */}
        {progress >= 100 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-300 via-mint-300 to-green-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
      </div>
      
      {/* 进度百分比 */}
      <motion.div 
        className="flex justify-between mt-1 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span>进度</span>
        <motion.span
          key={progress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="font-medium text-mint-600"
        >
          {progress}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default ProgressBar;