import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Image, FileText, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { useMaterialStore } from '@/stores/materialStore';
import { AIGeneratedMaterial } from '@/types';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

type MessageType = 'user' | 'ai';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
}

const samplePrompts = [
  '生成一首关于夏天的治愈歌词',
  '写一篇关于环境保护的英语短文',
  '生成一段经典电影独白',
  '生成一段电商客服对话话术',
];

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ isOpen, onClose, defaultCategory }) => {
  const { addAIGeneratedMaterial, addCustomMaterial, getCategoryById } = useMaterialStore();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是 AI 打字助手 ✨。你可以：\n1. 让我生成新的打字内容\n2. 上传图片，我会识别其中的文字\n3. 上传文本文件，快速导入素材\n\n请问需要什么帮助呢？',
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addMessage = (type: MessageType, content: string) => {
    const newMsg: Message = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };
  
  // 简单的 AI 内容生成（Mock）
  const generateContent = (prompt: string): { title: string; content: string; tags: string[] } => {
    const lower = prompt.toLowerCase();
    
    if (lower.includes('歌词') || lower.includes('歌曲')) {
      return {
        title: `AI生成：${prompt.substring(0, 20)}...`,
        content: '在那个有风的夏天\n我们一起走过的路\n每一朵花开的瞬间\n都有你的笑声陪伴\n\n阳光洒落在窗台上\n回忆轻轻地在歌唱\n那些美好的旧时光\n像星光照亮了远方\n\n风吹过麦田沙沙响\n时光带走了多少梦想\n而你依然在我心上\n温暖得像初升的太阳\n\n四季轮回光阴似箭\n愿你我都被温柔相待\n无论走到什么地方\n心中都有花开的期待',
        tags: ['AI生成', '歌词', '治愈'],
      };
    }
    
    if (lower.includes('英语') || lower.includes('english') || lower.includes('作文')) {
      return {
        title: `AI生成：英语短文`,
        content: 'How to Live a Happy and Meaningful Life\n\nMany people search for happiness throughout their lives, yet often overlook the simple treasures that surround them every day. Happiness is not a destination to be reached, but rather a journey to be experienced. It lies in the warmth of the morning sun, the fragrance of fresh coffee, and the comforting words of a true friend.\n\nTo live a meaningful life, we must first learn to appreciate what we already have. Gratitude opens the door to contentment and inner peace. When we stop comparing ourselves to others and start celebrating our own unique journey, life becomes lighter and more beautiful.\n\nSecondly, cultivate meaningful relationships. Human connections are the foundation of a fulfilling life. Spend quality time with family, be kind to strangers, and nurture friendships that stand the test of time. These relationships will support us through lifes challenges.\n\nFinally, pursue growth and purpose. Whether it is learning a new skill, helping others, or following a passion, having a sense of purpose gives life direction and meaning. When we grow, we become better versions of ourselves and inspire those around us.\n\nRemember, the best time to start living meaningfully is today.',
        tags: ['AI生成', '英语', '作文'],
      };
    }
    
    if (lower.includes('对话') || lower.includes('客服')) {
      return {
        title: `AI生成：客服对话示例`,
        content: '顾客：你好，我想咨询一下最近的新品\n客服：您好！欢迎光临，很高兴为您服务。请问您想了解哪方面的产品呢？\n顾客：我想看看有没有适合送给朋友的礼物\n客服：好的，请问您的朋友大概是什么年龄段的呢？我们有针对不同人群的精选推荐。\n顾客：二十多岁的女生\n客服：非常推荐您看看我们新上架的礼盒套装，包含手账本、香薰蜡烛和原创书签，特别适合这个年龄段的朋友哦。包装也很精美，不需要额外包装呢！\n顾客：听起来不错，多少钱呢？\n客服：这套礼盒原价是299元，现在有新品优惠，只要239元就能包邮到家啦。\n顾客：好的，那我就买这个吧\n客服：好的，非常感谢您的支持！您下单后我们会在24小时内为您发货的，预计3-5天可以送到。有任何问题随时联系我们哦！祝您生活愉快！',
        tags: ['AI生成', '客服', '对话'],
      };
    }
    
    if (lower.includes('电影') || lower.includes('独白') || lower.includes('台词')) {
      return {
        title: `AI生成：电影独白`,
        content: '人生就像一场漫长的旅行，我们在不同的车站遇见不同的人。有些人成为过客，匆匆擦肩而过；有些人却在心中留下深深的印记，成为一生难忘的风景。\n\n我一直相信，每一次相遇都是命中注定。无论是在春天花开的午后，还是在冬天下雪的清晨，那些来到你生命中的人，都带着某种使命。他们或许是来教你成长，或许是来陪你走过一段路，或许只是为了在某个瞬间温暖你。\n\n但旅途总是会有尽头。有些人到站了，他们微笑着挥手告别，然后下车开始新的旅程。而我们，依然要继续前行，带着那些美好的回忆和温暖的感动。\n\n所以，请珍惜每一次相遇。因为有些人，一旦错过，便是一辈子。而那些美好的时光，会成为夜空中最亮的星星，在我们最需要的时候，给予光和希望。\n\n愿你我都能在这条漫长的路上，遇见温暖，遇见爱，遇见那个更好的自己。',
        tags: ['AI生成', '台词', '治愈'],
      };
    }
    
    // 默认：散文段落
    return {
      title: `AI生成：${prompt.substring(0, 15)}...`,
      content: '生活中有许多美好的瞬间，常常在我们不经意间悄悄溜走。清晨的阳光透过窗帘洒在床上，新的一天带着希望悄然开始。窗外，鸟儿的歌声在枝头回响，空气中弥漫着花草的清香。\n\n我们常常因为忙碌而忽略了身边的风景。忙着追赶时间，忙着追逐梦想，却忘了停下脚步，好好感受一下当下的美好。其实，幸福并不在远方，它就藏在每一个平凡的日子里。\n\n一杯温热的茶，一本喜欢的书，一段安静的时光，这些看似微不足道的小事，却能给我们的心灵带来深深的滋养。当我们学会在平凡中发现不凡，在普通中寻找美好，生活便会变得丰盈而充实。\n\n愿你我都能保持一颗感恩的心，珍惜当下所拥有的一切。愿每一个平凡的日子，都能因为热爱而变得闪闪发光。',
      tags: ['AI生成', '散文', '治愈'],
    };
  };
  
  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    addMessage('user', prompt);
    setInputValue('');
    setIsLoading(true);
    
    // 模拟 AI 思考时间
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const result = generateContent(prompt);
    addMessage('ai', `好的，我为你生成了一段素材：\n\n标题：${result.title}\n字数：${result.content.length} 字\n\n你可以点击下方"添加到素材库"按钮把它保存起来，之后就可以在"自定义素材"分类中找到它啦！`);
    
    // 创建新素材
    const newMaterial: AIGeneratedMaterial = {
      id: `ai-${Date.now()}`,
      categoryId: defaultCategory || 'custom',
      title: result.title,
      content: result.content,
      source: 'AI生成素材',
      difficulty: 'easy',
      wordCount: result.content.length,
      language: result.content.includes(' ') && /[a-zA-Z]/.test(result.content) ? 'en' : 'zh',
      tags: result.tags,
      isFavorite: false,
      createdAt: String(Date.now()),
      prompt: prompt,
    };
    
    addAIGeneratedMaterial(newMaterial);
    if (defaultCategory) {
      addCustomMaterial(newMaterial);
    }
    
    setIsLoading(false);
  };
  
  const handleSend = () => {
    if (inputValue.trim()) {
      handleGenerate(inputValue.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // 图片处理（模拟 OCR）
  const handleImageUpload = (file: File) => {
    addMessage('user', `[图片] ${file.name}`);
    setIsLoading(true);
    
    setTimeout(() => {
      const mockText = `这是从图片中识别到的文字内容（模拟 OCR 识别）\n\n图片上传成功！以下是识别到的文字：\n\n春天来了，万物复苏。\n在这美好的季节里，\n让我们一起感受大自然的魅力。\n花儿在阳光下绽放，\n小鸟在枝头欢快地歌唱，\n春风拂过，带来阵阵花香。\n生活的美好，就藏在这些小小的瞬间里。\n\n希望这段文字能给你带来一点温暖和灵感。\n\n——来自 AI 助手的问候`;
      
      addMessage('ai', `图片识别完成！共识别到 ${mockText.length} 个字符。\n\n已为你生成以下素材，点击下方按钮即可添加到素材库：`);
      
      const newMaterial: AIGeneratedMaterial = {
        id: `ocr-${Date.now()}`,
        categoryId: defaultCategory || 'custom',
        title: `图片识别：${file.name.substring(0, 20)}`,
        content: mockText,
        source: '图片OCR识别',
        difficulty: 'easy',
        wordCount: mockText.length,
        language: 'zh',
        tags: ['OCR', '图片识别', '自定义'],
        isFavorite: false,
        createdAt: String(Date.now()),
        prompt: `图片识别：${file.name}`,
      };
      
      addAIGeneratedMaterial(newMaterial);
      if (defaultCategory) {
        addCustomMaterial(newMaterial);
      }
      
      setIsLoading(false);
    }, 2000);
  };
  
  // 文件处理（读取文本文件）
  const handleFileUpload = (file: File) => {
    addMessage('user', `[文件] ${file.name}`);
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      const preview = text.substring(0, 200);
      
      addMessage('ai', `文件读取成功！文件大小：${text.length} 个字符\n\n预览内容：\n${preview}${text.length > 200 ? '...' : ''}\n\n已为你添加到素材库，可以在"自定义素材"中找到它。`);
      
      const newMaterial: AIGeneratedMaterial = {
        id: `file-${Date.now()}`,
        categoryId: defaultCategory || 'custom',
        title: `导入文件：${file.name}`,
        content: text.substring(0, 5000), // 限制5000字
        source: '文件导入',
        difficulty: 'easy',
        wordCount: text.length,
        language: /[a-zA-Z]/.test(text) ? 'en' : 'zh',
        tags: ['文件导入', '自定义'],
        isFavorite: false,
        createdAt: String(Date.now()),
        prompt: `文件导入：${file.name}`,
      };
      
      addAIGeneratedMaterial(newMaterial);
      if (defaultCategory) {
        addCustomMaterial(newMaterial);
      }
      
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      addMessage('ai', '文件读取失败，请尝试其他文件。');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };
  
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };
  
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    e.target.value = '';
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    e.target.value = '';
  };
  
  // 拖拽
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        handleFileUpload(file);
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* 主面板 */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* 顶部栏 */}
            <div className="p-6 bg-gradient-to-r from-violet-100 to-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AI 打字助手</h3>
                  <p className="text-xs text-gray-500">智能生成 · 图片识别 · 文件导入</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* 消息区 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-mint-400 to-violet-400 text-white rounded-br-sm' : 'bg-gray-100 text-gray-700 rounded-bl-sm'}`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>正在处理中...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* 快捷提示 */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerate(p)}
                  className="text-xs px-3 py-1.5 bg-violet-50 text-violet-600 rounded-full hover:bg-violet-100 transition-colors"
                >
                  <Wand2 className="w-3 h-3 inline mr-1" />
                  {p}
                </button>
              ))}
            </div>
            
            {/* 拖拽提示区 */}
            <AnimatePresence>
              {dragActive && (
                <motion.div
                  className="absolute inset-0 bg-violet-100/90 flex items-center justify-center z-10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">📥</div>
                    <p className="text-xl font-bold text-violet-700">释放以上传文件</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* 输入区 */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={handleImageClick}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors text-sm"
                >
                  <Image className="w-4 h-4" />
                  <span>上传图片</span>
                </button>
                <button
                  onClick={handleFileClick}
                  className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-700 rounded-xl hover:bg-sky-100 transition-colors text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>上传文件</span>
                </button>
              </div>
              
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你想要生成的内容，或拖入文件/图片..."
                  rows={2}
                  disabled={isLoading}
                  className="flex-1 resize-none bg-gray-50 rounded-2xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-violet-300 transition-all disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-12 h-12 bg-gradient-to-r from-mint-400 to-violet-400 text-white rounded-2xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-2">
                💡 提示：按 Enter 发送，Shift + Enter 换行。生成的内容会自动保存到"自定义素材"分类。
              </p>
            </div>
            
            {/* 隐藏的文件输入 */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.doc,.docx,.html,.json,.csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIAssistantPanel;