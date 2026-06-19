import { create } from 'zustand';
import { PracticeSession, PracticeStats } from '@/types';

interface PracticeStore {
  isTyping: boolean;
  startTime: number | null;
  typedText: string;
  originalText: string;
  errors: number[];
  wpm: number;
  accuracy: number;
  duration: number;
  sessions: PracticeSession[];
  isCompleted: boolean;
  
  startTyping: () => void;
  updateTypedText: (text: string) => void;
  setMaterial: (text: string) => void;
  resetPractice: () => void;
  completePractice: (materialId: string) => PracticeSession;
  setCompleted: () => void;
  getStats: (totalCharacters: number) => PracticeStats;
}

export const usePracticeStore = create<PracticeStore>((set, get) => ({
  isTyping: false,
  startTime: null,
  typedText: '',
  originalText: '',
  errors: [],
  wpm: 0,
  accuracy: 100,
  duration: 0,
  sessions: [],
  isCompleted: false,
  
  startTyping: () => {
    set({
      isTyping: true,
      startTime: Date.now(),
      typedText: '',
      errors: [],
      wpm: 0,
      accuracy: 100,
      duration: 0,
      isCompleted: false,
    });
  },
  
  updateTypedText: (text) => {
    const startTime = get().startTime;
    if (!startTime) {
      // 如果还没有 startTime，设置一个
      set({ startTime: Date.now() });
    }
    
    const now = startTime || Date.now();
    const duration = (Date.now() - now) / 1000;
    const charCount = text.length;
    
    const wpm = duration > 0 ? Math.round((charCount / 5) / (duration / 60)) : 0;
    
    const existingErrors = get().errors;
    const originalText = get().originalText;
    
    // 计算新的错误索引
    const newErrors: number[] = [];
    const len = Math.min(text.length, originalText.length);
    for (let i = 0; i < len; i++) {
      if (text[i] !== originalText[i]) {
        newErrors.push(i);
      }
    }
    
    const errors = newErrors;
    const correctCount = charCount - errors.length;
    const accuracy = charCount > 0 ? Math.round((correctCount / charCount) * 100) : 100;
    
    set({ typedText: text, errors, wpm, accuracy, duration });
  },
  
  setMaterial: (text) => {
    set({
      originalText: text,
      typedText: '',
      errors: [],
      wpm: 0,
      accuracy: 100,
      duration: 0,
      startTime: null,
      isCompleted: false,
      isTyping: false,
    });
  },
  
  resetPractice: () => {
    set({
      isTyping: false,
      startTime: null,
      typedText: '',
      errors: [],
      wpm: 0,
      accuracy: 100,
      duration: 0,
      isCompleted: false,
    });
  },
  
  setCompleted: () => {
    set({ isCompleted: true });
  },
  
  completePractice: (materialId) => {
    const state = get();
    const session: PracticeSession = {
      id: `session-${Date.now()}`,
      materialId,
      startTime: new Date(state.startTime || Date.now()).toISOString(),
      endTime: new Date().toISOString(),
      wpm: state.wpm,
      accuracy: state.accuracy,
      errorCount: state.errors.length,
      duration: state.duration,
      completed: true,
    };
    
    set((state) => ({
      sessions: [...state.sessions, session],
      isTyping: false,
      isCompleted: true,
    }));
    
    return session;
  },
  
  getStats: (totalCharacters) => {
    const state = get();
    const typedLength = state.typedText.length;
    const progress = totalCharacters > 0 ? Math.round((typedLength / totalCharacters) * 100) : 0;
    const correctCount = typedLength - state.errors.filter(e => e < typedLength).length;
    
    return {
      wpm: state.wpm,
      accuracy: state.accuracy,
      errorCount: state.errors.length,
      correctCount,
      totalCharacters,
      duration: state.duration,
      progress,
    };
  },
}));