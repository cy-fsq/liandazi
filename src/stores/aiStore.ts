import { create } from 'zustand';
import { AIMessage } from '@/types';

interface AIStore {
  isOpen: boolean;
  messages: AIMessage[];
  isGenerating: boolean;
  generatedText: string | null;
  
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  addMessage: (message: AIMessage) => void;
  clearMessages: () => void;
  setGenerating: (status: boolean) => void;
  setGeneratedText: (text: string | null) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  isOpen: false,
  messages: [],
  isGenerating: false,
  generatedText: null,
  
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  
  clearMessages: () => set({ messages: [] }),
  
  setGenerating: (status) => set({ isGenerating: status }),
  
  setGeneratedText: (text) => set({ generatedText: text }),
}));