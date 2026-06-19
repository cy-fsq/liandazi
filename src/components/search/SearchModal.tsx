import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Music, BookOpen, Globe, MessageCircle, Film } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { useMaterialStore } from '@/stores/materialStore';

const SearchModal: React.FC = () => {
  const { isOpen, query, results, closeSearch, setQuery, search } = useSearchStore();
  const { setCurrentMaterial, setCurrentCategory } = useMaterialStore();
  
  // 分类图标映射
  const iconMap: Record<string, React.ReactNode> = {
    novels: <BookOpen className="w-4 h-4" />,
    lyrics: <Music className="w-4 h-4" />,
    essays: <FileText className="w-4 h-4" />,
    translations: <Globe className="w-4 h-4" />,
    vocabulary: <FileText className="w-4 h-4" />,
    dialogues: <Film className="w-4 h-4" />,
    customerService: <MessageCircle className="w-4 h-4" />,
  };
  
  // 搜索输入变化
  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);
  
  // 选择搜索结果
  const handleSelect = (result: typeof results[0]) => {
    const allMaterials = useMaterialStore.getState().getAllMaterials();
    const material = allMaterials.find(m => m.id === result.id);
    
    if (material) {
      setCurrentCategory(material.categoryId);
      setCurrentMaterial(material);
      closeSearch();
    }
  };
  
  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useSearchStore.getState().toggleSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSearch]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
          />
          
          {/* 搜索弹窗 */}
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 搜索输入 */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索素材..."
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <motion.button
                  onClick={closeSearch}
                  className="p-1 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>
            
            {/* 搜索结果 */}
            <div className="max-h-60 overflow-y-auto">
              {results.length === 0 && query && (
                <motion.div 
                  className="p-8 text-center text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>未找到相关素材</p>
                </motion.div>
              )}
              
              {results.length === 0 && !query && (
                <motion.div 
                  className="p-8 text-center text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm">输入关键词搜索素材</p>
                  <p className="text-xs mt-2 text-gray-400">支持搜索标题、内容和标签</p>
                </motion.div>
              )}
              
              {results.map((result, index) => (
                <motion.button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full p-3 hover:bg-mint-50 transition-colors flex items-start gap-3 text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-500">
                    {iconMap[result.categoryId]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-700 truncate">{result.title}</p>
                    <p className="text-sm text-gray-500 truncate">{result.contentPreview}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    result.type === 'ai-generated'
                      ? 'bg-lavender-100 text-lavender-600'
                      : 'bg-mint-100 text-mint-600'
                  }`}>
                    {result.type === 'ai-generated' ? 'AI生成' : '预设'}
                  </span>
                </motion.button>
              ))}
            </div>
            
            {/* 快捷键提示 */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between text-xs text-gray-400">
              <span>按 ESC 关闭</span>
              <span>按 ⌘K 快速搜索</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;