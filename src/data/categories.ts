import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'novels',
    name: '小说段落',
    icon: '📖',
    description: '余华、莫言、刘震云等治愈清醒人生语录',
    style: {
      fontFamily: "'Noto Serif SC', serif",
      lineHeight: 1.8,
      backgroundDecoration: 'paper-texture',
      theme: 'literary'
    }
  },
  {
    id: 'lyrics',
    name: '歌曲歌词',
    icon: '🎵',
    description: '莲花楼、沉香如屑、赴山海等完整歌词',
    style: {
      fontFamily: "'Noto Serif SC', serif",
      lineHeight: 2.0,
      backgroundDecoration: 'music-notes',
      theme: 'lyrics'
    }
  },
  {
    id: 'essays',
    name: '四六级作文',
    icon: '📝',
    description: '四六级作文真题与范文完整内容',
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      lineHeight: 1.8,
      backgroundDecoration: 'academic-border',
      theme: 'academic'
    }
  },
  {
    id: 'translations',
    name: '四六级翻译',
    icon: '🌐',
    description: '中国传统文化、经济发展翻译真题',
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      lineHeight: 1.8,
      backgroundDecoration: 'bilingual-layout',
      theme: 'academic'
    }
  },
  {
    id: 'vocabulary',
    name: '四六级单词',
    icon: '📚',
    description: '四六级高频核心词汇',
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      lineHeight: 1.8,
      backgroundDecoration: 'word-cards',
      theme: 'cards'
    }
  },
  {
    id: 'dialogues',
    name: '影视剧台词',
    icon: '🎬',
    description: '莲花楼、赴山海等经典台词集',
    style: {
      fontFamily: "'Noto Serif SC', serif",
      lineHeight: 2.0,
      backgroundDecoration: 'film-border',
      theme: 'film'
    }
  },
  {
    id: 'customer-service',
    name: '客服话术',
    icon: '💬',
    description: '电商客服标准话术模板',
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      lineHeight: 1.8,
      backgroundDecoration: 'chat-bubbles',
      theme: 'dialogue'
    }
  },
  {
    id: 'custom',
    name: '自定义素材',
    icon: '✨',
    description: 'AI生成、图片识别上传自定义内容',
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      lineHeight: 1.8,
      backgroundDecoration: 'magic',
      theme: 'literary'
    }
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};