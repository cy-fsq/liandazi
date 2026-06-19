import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Shuffle, CheckCircle2 } from 'lucide-react';
import { useMaterialStore } from '@/stores/materialStore';
import { usePracticeStore } from '@/stores/practiceStore';
import { TypingMaterial } from '@/types';
import TextDisplay from './TextDisplay';
import ProgressBar from './ProgressBar';

interface TypingAreaProps {
  onComplete?: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ onComplete }) => {
  const { currentMaterial, currentCategory, setCurrentMaterial, getRandomMaterial } = useMaterialStore();
  const { 
    isTyping, 
    typedText, 
    startTyping, 
    updateTypedText, 
    resetPractice, 
    completePractice,
    getStats 
  } = usePracticeStore();
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // 获取当前分类的样式
  const getCategoryStyle = () => {
    const categories = useMaterialStore.getState().categories;
    const category = categories.find(c => c.id === currentCategory);
    return category?.style || { 
      fontFamily: "'Noto Sans SC', sans-serif", 
      lineHeight: 1.8,
      backgroundDecoration: 'paper-texture',
      theme: 'literary' as const
    };
  };
  
  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isTyping && value.length > 0) {
      startTyping();
    }
    
    updateTypedText(value);
    
    // 检查是否完成
    if (currentMaterial && value.length >= currentMaterial.content.length) {
      setIsCompleted(true);
      completePractice(currentMaterial.id);
      if (onComplete) onComplete();
    }
  };
  
  // 重置练习
  const handleReset = () => {
    resetPractice();
    setIsCompleted(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };
  
  // 切换素材
  const handleShuffle = () => {
    const newMaterial = getRandomMaterial();
    if (newMaterial) {
      setCurrentMaterial(newMaterial);
      handleReset();
    }
  };
  
  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      inputRef.current.focus();
    }
  }, [currentMaterial, isCompleted]);
  
  // 定时更新统计
  useEffect(() => {
    if (isTyping && !isCompleted) {
      const interval = setInterval(() => {
        updateTypedText(typedText);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTyping, isCompleted, typedText]);
  
  if (!currentMaterial) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        请选择一个素材开始练习
      </div>
    );
  }
  
  const stats = getStats(currentMaterial.content.length);
  const style = getCategoryStyle();
  
  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 素材标题 */}
      <motion.div 
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-medium text-gray-700 mb-1" style={{ fontFamily: style.fontFamily }}>
          {currentMaterial.title}
        </h2>
        {currentMaterial.source && (
          <p className="text-sm text-gray-500">{currentMaterial.source}</p>
        )}
      </motion.div>
      
      {/* 进度条 */}
      <ProgressBar progress={stats.progress} />
      
      {/* 原文显示区 */}
      <TextDisplay 
        content={currentMaterial.content}
        typedText={typedText}
        style={style}
        isCompleted={isCompleted}
      />
      
      {/* 输入框 */}
      <motion.div 
        className="relative mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <textarea
          ref={inputRef}
          value={typedText}
          onChange={handleInputChange}
          disabled={isCompleted}
          placeholder="开始打字练习..."
          className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 resize-none
            ${isCompleted 
              ? 'border-green-300 bg-green-50' 
              : 'border-mint-200 bg-white/80 focus:border-mint-400 focus:ring-4 focus:ring-mint-100'
            }
            text-lg leading-relaxed
          `}
          style={{ 
            fontFamily: style.fontFamily,
            lineHeight: style.lineHeight,
            minHeight: '120px'
          }}
          rows={4}
          autoFocus
        />
        
        {/* 完成提示 */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-green-50/90 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* 操作按钮 */}
      <motion.div 
        className="flex justify-center gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-lavender-100 text-lavender-700 
            hover:bg-lavender-200 transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          重新开始
        </motion.button>
        
        <motion.button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-mint-100 text-mint-700 
            hover:bg-mint-200 transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle className="w-5 h-5" />
          切换素材
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TypingArea;