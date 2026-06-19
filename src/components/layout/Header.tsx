import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Keyboard } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { useAIStore } from '@/stores/aiStore';

const Header: React.FC = () => {
  const { openSearch } = useSearchStore();
  const { openPanel } = useAIStore();
  
  return (
    <motion.header 
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-cream-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-400 to-lavender-400 flex items-center justify-center shadow-lg shadow-mint-200"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Keyboard className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">治愈打字</h1>
            <p className="text-xs text-gray-500">温柔练习，轻松提升</p>
          </div>
        </motion.div>
        
        {/* 操作按钮 */}
        <div className="flex items-center gap-3">
          {/* 搜索按钮 */}
          <motion.button
            onClick={openSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600 hidden sm:inline">搜索</span>
            <kbd className="hidden md:inline px-2 py-0.5 rounded bg-gray-200 text-xs text-gray-500">⌘K</kbd>
          </motion.button>
          
          {/* AI助手按钮 */}
          <motion.button
            onClick={openPanel}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-mint-400 to-lavender-400 text-white hover:from-mint-500 hover:to-lavender-500 transition-all shadow-lg shadow-mint-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI助手</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;