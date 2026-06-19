import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Music, FileText, Globe, BookMarked, Film, MessageCircle } from 'lucide-react';
import { useMaterialStore } from '@/stores/materialStore';

const CategoryNav: React.FC = () => {
  const { categories, currentCategory, setCurrentCategory } = useMaterialStore();
  
  // 分类图标映射
  const iconMap: Record<string, React.ReactNode> = {
    novels: <BookOpen className="w-5 h-5" />,
    lyrics: <Music className="w-5 h-5" />,
    essays: <FileText className="w-5 h-5" />,
    translations: <Globe className="w-5 h-5" />,
    vocabulary: <BookMarked className="w-5 h-5" />,
    dialogues: <Film className="w-5 h-5" />,
    customerService: <MessageCircle className="w-5 h-5" />,
  };
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => setCurrentCategory(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
            ${currentCategory === category.id
              ? 'bg-mint-400 text-white shadow-lg shadow-mint-200'
              : 'bg-white/80 text-gray-600 hover:bg-mint-100 hover:text-mint-600 border border-gray-200'
            }
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {iconMap[category.id]}
          <span className="font-medium">{category.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryNav;