// 素材分类样式配置
export interface CategoryStyle {
  fontFamily: string;
  lineHeight: number;
  backgroundDecoration: string;
  theme: 'literary' | 'lyrics' | 'academic' | 'dialogue' | 'cards' | 'film';
}

// 素材分类
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  style: CategoryStyle;
}

// 打字素材
export interface TypingMaterial {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  source?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  wordCount: number;
  language: 'zh' | 'en' | 'mixed';
  tags: string[];
}

// AI生成素材
export interface AIGeneratedMaterial extends TypingMaterial {
  prompt: string;
  createdAt: string;
  isFavorite: boolean;
}

// 练习会话
export interface PracticeSession {
  id: string;
  materialId: string;
  startTime: string;
  endTime?: string;
  wpm: number;
  accuracy: number;
  errorCount: number;
  duration: number;
  completed: boolean;
}

// 用户设置
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  soundEnabled: boolean;
  showHints: boolean;
}

// AI对话消息
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// AI对话会话
export interface AIConversation {
  id: string;
  messages: AIMessage[];
  createdAt: string;
}

// 搜索结果
export interface SearchResult {
  id: string;
  type: 'preset' | 'ai-generated';
  categoryId: string;
  title: string;
  contentPreview: string;
  fullContent: string;
}

// 字符状态
export interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'pending' | 'current';
}

// 练习统计
export interface PracticeStats {
  wpm: number;
  accuracy: number;
  errorCount: number;
  correctCount: number;
  totalCharacters: number;
  duration: number;
  progress: number;
}