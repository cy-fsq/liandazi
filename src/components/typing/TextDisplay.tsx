import React from 'react';
import { motion } from 'framer-motion';
import { CategoryStyle } from '@/types';

interface TextDisplayProps {
  content: string;
  typedText: string;
  style: CategoryStyle;
  isCompleted: boolean;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ content, typedText, style, isCompleted }) => {
  const characters = content.split('');
  const typedChars = typedText.split('');
  
  // 客服话术：按行分割内容，判断每一行是"顾客"还是"客服"
  const renderDialogue = () => {
    const lines = content.split('\n');
    let currentCharIndex = 0;
    const lineElements: JSX.Element[] = [];
    
    lines.forEach((line, lineIndex) => {
      if (!line.trim()) {
        currentCharIndex += 1; // 换行符占一个字符位置
        const emptyKey = `empty-${lineIndex}-${currentCharIndex}`;
        lineElements.push(<div key={emptyKey} className="h-3" />);
        return;
      }
      
      let speaker = '';
      let displayText = line;
      let isCustomer = false;
      let isService = false;
      
      if (line.startsWith('顾客：') || line.startsWith('顾客:')) {
        speaker = '顾客';
        displayText = line.slice(3);
        isCustomer = true;
      } else if (line.startsWith('客服：') || line.startsWith('客服:')) {
        speaker = '客服';
        displayText = line.slice(3);
        isService = true;
      }
      
      // 计算这一行已经输入的字符数（包括前缀）
      const lineLength = line.length;
      const lineStart = currentCharIndex;
      const lineEnd = currentCharIndex + lineLength;
      const lineTypedLength = Math.max(0, Math.min(typedChars.length - lineStart, lineLength));
      const lineContent = line;
      const prefixLength = speaker ? (speaker.length + 1) : 0; // "顾客：" 3个字符
      
      lineElements.push(
        <motion.div
          key={`line-${lineIndex}`}
          className={`mb-3 flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: lineIndex * 0.05 }}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm
              ${isCustomer
                ? 'bg-mint-400 text-white rounded-tr-sm'
                : isService
                  ? 'bg-white border border-mint-200 text-gray-700 rounded-tl-sm'
                  : 'bg-gray-50 text-gray-600 rounded-xl'
              }
            `}
            style={{ fontFamily: style.fontFamily, lineHeight: style.lineHeight }}
          >
            {speaker && (
              <span className={`block text-xs mb-1 font-medium
                ${isCustomer ? 'text-mint-100' : 'text-mint-500'}
              `}>
                {speaker}
              </span>
            )}
            <div className="text-base">
              {lineContent.split('').map((char, charIndex) => {
                const globalIndex = lineStart + charIndex;
                const typedChar = typedChars[globalIndex];
                let status: 'correct' | 'incorrect' | 'pending' | 'current' = 'pending';
                
                if (globalIndex < typedChars.length) {
                  status = typedChar === char ? 'correct' : 'incorrect';
                } else if (globalIndex === typedChars.length) {
                  status = 'current';
                }
                
                let colorClass = '';
                if (isCustomer) {
                  if (status === 'correct') colorClass = 'text-white';
                  else if (status === 'incorrect') colorClass = 'text-red-200 bg-red-400/60 rounded px-0.5';
                  else if (status === 'current') colorClass = 'text-white bg-mint-600/50 rounded px-0.5';
                  else colorClass = 'text-white/70';
                } else if (isService) {
                  if (status === 'correct') colorClass = 'text-green-600';
                  else if (status === 'incorrect') colorClass = 'text-red-500 bg-red-100 rounded px-0.5';
                  else if (status === 'current') colorClass = 'text-gray-700 bg-mint-100 rounded px-0.5';
                  else colorClass = 'text-gray-400';
                } else {
                  if (status === 'correct') colorClass = 'text-green-600';
                  else if (status === 'incorrect') colorClass = 'text-red-500 bg-red-100 rounded px-0.5';
                  else if (status === 'current') colorClass = 'text-gray-700 bg-mint-100 rounded px-0.5';
                  else colorClass = 'text-gray-400';
                }
                
                return (
                  <span
                    key={`char-${globalIndex}`}
                    className={`inline-block transition-all duration-150 ${colorClass}
                      ${char === '\n' ? '' : ''}
                    `}
                  >
                    {char === '\n' ? ' ' : char}
                    {status === 'current' && char !== '\n' && (
                      <span className="inline-block w-0.5 h-5 -mb-1 bg-mint-400 animate-pulse" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      );
      
      currentCharIndex = lineEnd + 1; // +1 是换行符
    });
    
    return <div className="space-y-1">{lineElements}</div>;
  };
  
  // 普通渲染（非对话类）
  const renderNormal = () => (
    <div className="text-lg leading-relaxed tracking-wide">
      {characters.map((char, index) => {
        const typedChar = typedChars[index];
        let status: 'correct' | 'incorrect' | 'pending' | 'current' = 'pending';
        
        if (index < typedChars.length) {
          status = typedChar === char ? 'correct' : 'incorrect';
        } else if (index === typedChars.length) {
          status = 'current';
        }
        
        return (
          <motion.span
            key={index}
            className={`relative inline-block transition-all duration-150
              ${status === 'correct' && 'text-green-600'}
              ${status === 'incorrect' && 'text-red-500 bg-red-100 rounded px-0.5'}
              ${status === 'pending' && 'text-gray-400'}
              ${status === 'current' && 'text-gray-700 bg-mint-100 rounded px-0.5'}
            `}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: status === 'current' ? 1.05 : 1,
            }}
            transition={{ delay: index * 0.01 }}
          >
            {char === '\n' ? ' ' : char}
            {status === 'current' && char !== '\n' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mint-400 animate-pulse" />
            )}
          </motion.span>
        );
      })}
    </div>
  );
  
  return (
    <motion.div 
      className={`relative p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-500
        ${isCompleted 
          ? 'bg-green-50/50 border-green-200' 
          : style.theme === 'dialogue'
            ? 'bg-gradient-to-br from-mint-50/80 to-cream-50/50 border-mint-200'
            : 'bg-cream-50/50 border-cream-200'
        }
      `}
      style={{
        fontFamily: style.fontFamily,
        lineHeight: style.lineHeight,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {style.theme === 'literary' && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-transparent" />
        )}
        {style.theme === 'lyrics' && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200 to-transparent rounded-full blur-2xl" />
        )}
        {style.theme === 'academic' && (
          <div className="absolute inset-0 border-4 border-double border-gray-200 rounded-xl" />
        )}
        {style.theme === 'dialogue' && (
          <>
            <div className="absolute top-4 left-4 text-4xl opacity-20">💬</div>
            <div className="absolute bottom-4 right-4 text-3xl opacity-20">✨</div>
          </>
        )}
        {style.theme === 'film' && (
          <>
            <div className="absolute inset-0 border-4 border-double border-gray-300 rounded-xl" />
            <div className="absolute top-4 left-4 text-3xl opacity-20">🎬</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-20">📽️</div>
          </>
        )}
        {style.theme === 'cards' && (
          <div className="grid grid-cols-3 gap-2 p-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded" />
            ))}
          </div>
        )}
      </div>
      
      {/* 文字显示：客服话术用对话气泡，其他用普通文字 */}
      {style.theme === 'dialogue' ? renderDialogue() : renderNormal()}
      
      {/* 完成动画 */}
      {isCompleted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-100/70 via-mint-100/70 to-green-100/70 rounded-2xl"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
          <motion.span
            className="relative text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            ✅
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TextDisplay;