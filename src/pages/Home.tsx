import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMaterialStore } from '@/stores/materialStore';
import { BookOpen, Music, FileText, Globe, BookMarked, Film, MessageCircle, Sparkles } from 'lucide-react';

// 8个主题对应 春夏秋冬风花雪月
const themeDecorations = [
  { bg: 'from-pink-50 to-rose-50', emoji: '🌸', label: '春 · 小说', iconBg: 'bg-pink-200' },
  { bg: 'from-green-50 to-emerald-50', emoji: '🍃', label: '夏 · 歌词', iconBg: 'bg-green-200' },
  { bg: 'from-amber-50 to-orange-50', emoji: '🍂', label: '秋 · 作文', iconBg: 'bg-amber-200' },
  { bg: 'from-blue-50 to-indigo-50', emoji: '❄️', label: '冬 · 翻译', iconBg: 'bg-blue-200' },
  { bg: 'from-cyan-50 to-sky-50', emoji: '🌬️', label: '风 · 单词', iconBg: 'bg-cyan-200' },
  { bg: 'from-rose-50 to-pink-50', emoji: '🌺', label: '花 · 台词', iconBg: 'bg-rose-200' },
  { bg: 'from-slate-50 to-gray-50', emoji: '❄️', label: '雪 · 客服', iconBg: 'bg-slate-200' },
  { bg: 'from-violet-50 to-purple-50', emoji: '🌙', label: '月 · 自定义', iconBg: 'bg-violet-200' },
];

const iconMap = [
  BookOpen,
  Music,
  FileText,
  Globe,
  BookMarked,
  Film,
  MessageCircle,
  Sparkles,
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categories, getMaterialsForCategory } = useMaterialStore();
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-cream-50 to-mint-50">
      {/* 顶部标题 */}
      <motion.div
        className="pt-12 pb-8 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          打字练习乐园
        </h1>
        <p className="text-lg text-gray-500">选择主题，开始你的治愈之旅</p>
      </motion.div>
      
      {/* 8卡片网格 */}
      <motion.div
        className="max-w-6xl mx-auto px-4 pb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[index] || BookOpen;
            const theme = themeDecorations[index];
            const materialCount = getMaterialsForCategory(category.id).length;
            
            return (
              <motion.div
                key={category.id}
                variants={item}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl cursor-pointer transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 背景渐变 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-80`} />
                
                {/* 装饰元素 - 漂浮的emoji */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl opacity-40"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  {theme.emoji}
                </motion.div>
                
                {/* 圆形装饰 */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/30" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/20" />
                
                {/* 内容区 */}
                <div className="relative p-6">
                  {/* 图标 */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </motion.div>
                  
                  {/* 标题 */}
                  <div className="mb-1 text-xs text-gray-400 font-medium">
                    {theme.label}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  
                  {/* 描述 */}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {category.description}
                  </p>
                  
                  {/* 素材数量 */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                    <span className="text-xs text-gray-500">
                      {materialCount} 篇素材
                    </span>
                    <motion.span
                      className="text-sm font-medium text-gray-700 group-hover:text-mint-600 transition-colors"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      进入 →
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* 底部信息 */}
      <motion.div
        className="text-center py-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>💡 每一次练习，都是向更好的自己迈进</p>
      </motion.div>
    </div>
  );
};

export default Home;