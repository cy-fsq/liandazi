import { create } from 'zustand';
import { TypingMaterial, AIGeneratedMaterial, Category } from '@/types';
import { categories } from '@/data/categories';
import { novelsMaterials } from '@/data/novels';
import { lyricsMaterials } from '@/data/lyrics';
import { essaysMaterials } from '@/data/essays';
import { translationsMaterials } from '@/data/translations';
import { vocabularyMaterials } from '@/data/vocabulary';
import { dialoguesMaterials } from '@/data/dialogues';
import { customerServiceMaterials } from '@/data/customerService';

const allPresetMaterials: Record<string, TypingMaterial[]> = {
  novels: novelsMaterials,
  lyrics: lyricsMaterials,
  essays: essaysMaterials,
  translations: translationsMaterials,
  vocabulary: vocabularyMaterials,
  dialogues: dialoguesMaterials,
  'customer-service': customerServiceMaterials,
  custom: [],
};

interface MaterialStore {
  categories: Category[];
  currentCategory: string | null;
  currentMaterial: TypingMaterial | null;
  aiGeneratedMaterials: AIGeneratedMaterial[];
  
  setCurrentCategory: (categoryId: string | null) => void;
  setCurrentMaterial: (material: TypingMaterial | null) => void;
  addAIGeneratedMaterial: (material: AIGeneratedMaterial) => void;
  addCustomMaterial: (material: TypingMaterial) => void;
  getMaterialsForCategory: (categoryId: string) => TypingMaterial[];
  getAllMaterials: () => TypingMaterial[];
  getRandomMaterial: () => TypingMaterial | null;
  getCategoryById: (categoryId: string) => Category | undefined;
}

export const useMaterialStore = create<MaterialStore>((set, get) => ({
  categories: categories,
  currentCategory: null,
  currentMaterial: null,
  aiGeneratedMaterials: [],
  
  setCurrentCategory: (categoryId) => {
    set({ currentCategory: categoryId });
  },
  
  setCurrentMaterial: (material) => {
    set({ currentMaterial: material });
  },
  
  addAIGeneratedMaterial: (material) => {
    set((state) => ({
      aiGeneratedMaterials: [...state.aiGeneratedMaterials, material],
    }));
  },
  
  addCustomMaterial: (material) => {
    set((state) => ({
      aiGeneratedMaterials: [...state.aiGeneratedMaterials, material as AIGeneratedMaterial],
    }));
  },
  
  getMaterialsForCategory: (categoryId) => {
    if (categoryId === 'custom') {
      return [...get().aiGeneratedMaterials];
    }
    return [...(allPresetMaterials[categoryId] || [])];
  },
  
  getAllMaterials: () => {
    const all: TypingMaterial[] = [];
    Object.values(allPresetMaterials).forEach((materials) => {
      all.push(...materials);
    });
    all.push(...get().aiGeneratedMaterials);
    return all;
  },
  
  getRandomMaterial: () => {
    const all = get().getAllMaterials();
    if (all.length === 0) return null;
    const idx = Math.floor(Math.random() * all.length);
    return all[idx];
  },
  
  getCategoryById: (id) => {
    return categories.find(c => c.id === id);
  },
}));