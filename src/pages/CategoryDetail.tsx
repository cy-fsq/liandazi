import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useMaterialStore } from '@/stores/materialStore';
import { ArrowLeft, Plus, FileText, Clock, Tag } from 'lucide-react';
import AIAssistantPanel from '@/components/ai/AIAssistantPanel';
import { TypingMaterial } from '@/types';

const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { getCategoryById, getMaterialsForCategory, setCurrentMaterial } = useMaterialStore();
  const [showAI, setShowAI] = useState(false);
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const materials = categoryId ? getMaterialsForCategory(categoryId) : [];
  
  useEffect(() => {
    if (!category) {
      // 导航回首页
    }
  }, [category]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">分类不存在</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-mint-400 text-white rounded-xl hover:bg-mint-500 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }
  
  const handleMaterialClick = (material: TypingMaterial) => {
    setCurrentMaterial(material);
    navigate(`/practice/${material.id}`);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-cream-50 to-mint-50 pb-20">
      {/* 顶部导航 */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
          whileHover={{ x: -3 }}
          whileTap={{ x: -6 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </motion.button>
        
        {/* 标题信息 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {category.name}
            </h1>
          </div>
          <p className="text-gray-500 text-lg ml-16">{category.description}</p>
          <div className="flex items-center gap-3 mt-3 ml-16 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>共 {materials.length} 篇素材</span>
          </div>
        </motion.div>
      </div>
      
      {/* 素材列表网格 */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {materials.map((material) => (
            <motion.div
              key={material.id}
              variants={item}
              onClick={() => handleMaterialClick(material)}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 右上角小图标 */}
              <div className="absolute top-4 right-4 text-2xl opacity-30 group-hover:opacity-60 transition-opacity">
                📝
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 pr-8 line-clamp-2">
                  {material.title}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed" style={{ fontFamily: category.style.fontFamily }}>
                  {material.content.substring(0, 80)}...
                </p>
                
                {/* 底部信息 */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{material.wordCount} 字</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="truncate max-w-[100px]">
                      {material.tags?.[0] || '练习'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 悬停高亮 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mint-300 via-rose-300 to-violet-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
          
          {/* + 卡片 - AI添加 */}
          <motion.div
            variants={item}
            onClick={() => setShowAI(true)}
            className="group relative bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden border-2 border-dashed border-violet-200 hover:border-violet-400 flex items-center justify-center"
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{ minHeight: '200px' }}
          >
            <div className="text-center p-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-all"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Plus className="w-8 h-8 text-violet-400" />
              </motion.div>
              <p className="text-gray-700 font-bold text-lg mb-1">添加 AI 素材</p>
              <p className="text-xs text-gray-500">让 AI 助手为你生成打字内容<br/>或上传图片识别文字</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* AI 助手面板 */}
      <AIAssistantPanel
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        defaultCategory={categoryId}
      />
    </div>
  );
};

export default CategoryDetail;