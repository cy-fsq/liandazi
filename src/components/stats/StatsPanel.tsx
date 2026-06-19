import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Zap, Target, TrendingUp } from 'lucide-react';
import { usePracticeStore } from '@/stores/practiceStore';
import { useMaterialStore } from '@/stores/materialStore';

const StatsPanel: React.FC = () => {
  const { getStats, isTyping } = usePracticeStore();
  const { currentMaterial } = useMaterialStore();
  
  if (!currentMaterial) return null;
  
  const stats = getStats(currentMaterial.content.length);
  
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* WPM速度 */}
      <motion.div 
        className="flex flex-col items-center p-3 rounded-xl bg-mint-50 border border-mint-100"
        whileHover={{ scale: 1.02 }}
      >
        <Zap className="w-6 h-6 text-mint-500 mb-2" />
        <span className="text-2xl font-bold text-mint-600">{stats.wpm}</span>
        <span className="text-xs text-mint-400">WPM</span>
      </motion.div>
      
      {/* 正确率 */}
      <motion.div 
        className="flex flex-col items-center p-3 rounded-xl bg-lavender-50 border border-lavender-100"
        whileHover={{ scale: 1.02 }}
      >
        <Target className="w-6 h-6 text-lavender-500 mb-2" />
        <span className="text-2xl font-bold text-lavender-600">{stats.accuracy}%</span>
        <span className="text-xs text-lavender-400">正确率</span>
      </motion.div>
      
      {/* 用时 */}
      <motion.div 
        className="flex flex-col items-center p-3 rounded-xl bg-cream-50 border border-cream-100"
        whileHover={{ scale: 1.02 }}
      >
        <Timer className="w-6 h-6 text-cream-500 mb-2" />
        <span className="text-2xl font-bold text-cream-600">
          {Math.floor(stats.duration / 60)}:{String(Math.floor(stats.duration % 60)).padStart(2, '0')}
        </span>
        <span className="text-xs text-cream-400">用时</span>
      </motion.div>
      
      {/* 错误数 */}
      <motion.div 
        className="flex flex-col items-center p-3 rounded-xl bg-rose-50 border border-rose-100"
        whileHover={{ scale: 1.02 }}
      >
        <TrendingUp className="w-6 h-6 text-rose-500 mb-2" />
        <span className="text-2xl font-bold text-rose-600">{stats.errorCount}</span>
        <span className="text-xs text-rose-400">错误</span>
      </motion.div>
    </motion.div>
  );
};

export default StatsPanel;