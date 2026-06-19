import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useMaterialStore } from '@/stores/materialStore';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { usePracticeStore } from '@/stores/practiceStore';

const Practice: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();
  const { getAllMaterials, getCategoryById } = useMaterialStore();
  const { typedText, errors, startTime, setMaterial, updateTypedText, resetPractice, isCompleted, setCompleted } = usePracticeStore();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 找到当前素材
  const material = materialId ? getAllMaterials().find(m => m.id === materialId) : undefined;
  const category = material?.categoryId ? getCategoryById(material.categoryId) : undefined;
  
  const originalText = material?.content || '';
  const title = material?.title || '未找到素材';
  const source = material?.source || '';
  
  const [currentTime, setCurrentTime] = useState(0);
  
  // 初始化
  useEffect(() => {
    if (material) {
      setMaterial(material.content);
    }
  }, [material, setMaterial]);
  
  // 计时
  useEffect(() => {
    let interval: number | undefined;
    if (startTime && !isCompleted) {
      interval = window.setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, isCompleted]);
  
  // 完成判定
  useEffect(() => {
    if (typedText.length >= originalText.length && !isCompleted && originalText.length > 0) {
      setCompleted();
    }
  }, [typedText, originalText, isCompleted, setCompleted]);
  
  // 自动聚焦
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-cream-50 to-mint-50">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">未找到素材</p>
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    updateTypedText(newText);
  };
  
  const handleReset = () => {
    resetPractice();
    setCurrentTime(0);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // 计算统计
  const totalChars = originalText.length;
  const typedChars = typedText.length;
  const progress = Math.min((typedChars / Math.max(totalChars, 1)) * 100, 100);
  const accuracy = typedChars > 0 ? Math.max(((typedChars - errors.length) / Math.max(typedChars, 1)) * 100, 0) : 100;
  
  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 逐字符渲染（用于对话气泡样式）
  const renderColoredText = () => {
    return (
      <div className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed" style={{ fontFamily: category?.style.fontFamily }}>
        {Array.from(originalText).map((char, index) => {
          let colorClass = 'text-gray-300'; // 未输入
          if (index < typedText.length) {
            const typedChar = typedText[index];
            if (typedChar === char) {
              colorClass = 'text-green-600'; // 正确
            } else {
              colorClass = 'bg-red-100 text-red-600 rounded'; // 错误
            }
          } else if (index === typedText.length) {
            colorClass = 'bg-yellow-100 text-gray-800 rounded animate-pulse'; // 当前
          }
          return (
            <span key={index} className={colorClass}>{char}</span>
          );
        })}
      </div>
    );
  };
  
  const handleBack = () => {
    const catId = material.categoryId;
    navigate(`/category/${catId}`);
  };
  
  // 对话气泡（客服话术）
  const renderDialogue = () => {
    const lines = originalText.split('\n');
    return (
      <div className="space-y-3" style={{ fontFamily: category?.style.fontFamily }}>
        {lines.map((line, idx) => {
          if (line.trim() === '') return <div key={idx} className="h-2" />;
          const isCustomer = line.startsWith('顾客');
          const isService = line.startsWith('客服');
          const color = idx < typedText.length ? 'text-green-700' : 'text-gray-700';
          
          if (isCustomer || isService) {
            return (
              <div key={idx} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl ${isCustomer ? 'bg-violet-100 rounded-tl-sm' : 'bg-mint-100 rounded-tr-sm'} ${color}`}>
                  <span className="text-xs opacity-60 block mb-1">
                    {isCustomer ? '顾客' : '客服'}
                  </span>
                  <span className="whitespace-pre-wrap">{line.replace(/^顾客[:：]\s?/, '').replace(/^客服[:：]\s?/, '')}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="text-gray-700 text-sm px-2">
              {line}
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-cream-50 to-mint-50 pb-10">
      {/* 顶部 */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
          whileHover={{ x: -3 }}
          whileTap={{ x: -6 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回列表</span>
        </motion.button>
        
        {/* 标题与统计栏 */}
        <motion.div
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {title}
              </h2>
              {source && <p className="text-sm text-gray-400">{source}</p>}
            </div>
            
            {/* 统计卡片 */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-mint-50 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-mint-600" />
                <span className="text-sm text-gray-600 font-medium">
                  {formatTime(currentTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-violet-50 px-4 py-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                <span className="text-sm text-gray-600 font-medium">
                  {accuracy.toFixed(0)}% 准确率
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-gray-600 font-medium">
                  {errors.length} 错误
                </span>
              </div>
              
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span className="text-sm text-gray-600 font-medium">重置</span>
              </button>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="mt-5">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-mint-400 via-rose-400 to-violet-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-400 text-right">
              {typedChars} / {totalChars} 字
            </div>
          </div>
        </motion.div>
        
        {/* 完成提示 */}
        {isCompleted && (
          <motion.div
            className="bg-gradient-to-r from-mint-100 to-rose-100 rounded-3xl shadow-lg p-8 mb-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">完成啦！</h3>
            <p className="text-gray-600 mb-6">
              用时 {formatTime(currentTime)} · 准确率 {accuracy.toFixed(1)}% · 共 {totalChars} 字
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-mint-400 to-rose-400 text-white font-medium rounded-2xl hover:shadow-lg transition-all"
            >
              再来一遍
            </button>
          </motion.div>
        )}
        
        {/* 左右分栏：左边原文，右边打字区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左边：原文区 */}
          <motion.div
            className="bg-white rounded-3xl shadow-md p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
              📖 原文参考
            </h3>
            <div className="max-h-[600px] overflow-y-auto pr-2">
              {category?.style.theme === 'dialogue' ? (
                renderDialogue()
              ) : (
                renderColoredText()
              )}
            </div>
          </motion.div>
          
          {/* 右边：打字区 */}
          <motion.div
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
              ⌨️ 打字练习区
            </h3>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={handleInputChange}
              disabled={isCompleted}
              placeholder="点击这里开始输入..."
              className="flex-1 min-h-[600px] w-full bg-gradient-to-br from-cream-50 to-white rounded-2xl p-6 text-base text-gray-800 leading-relaxed resize-none outline-none focus:ring-2 focus:ring-mint-300 transition-all border-2 border-gray-100 hover:border-gray-200"
              style={{ fontFamily: category?.style.fontFamily }}
            />
            
            <div className="mt-4 text-xs text-gray-400 text-center">
              💡 提示：对照左边的原文进行输入，绿色表示正确，红色表示错误
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Practice;