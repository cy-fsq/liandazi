import { create } from 'zustand';
import { SearchResult, TypingMaterial } from '@/types';
import { useMaterialStore } from './materialStore';

interface SearchStore {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  
  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  search: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  isOpen: false,
  query: '',
  results: [],
  
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: [] }),
  
  setQuery: (query) => set({ query }),
  
  search: (query) => {
    if (!query.trim()) {
      set({ results: [] });
      return;
    }
    
    const allMaterials = useMaterialStore.getState().getAllMaterials();
    const lowerQuery = query.toLowerCase();
    
    const results: SearchResult[] = allMaterials
      .filter((material) => {
        const titleMatch = material.title.toLowerCase().includes(lowerQuery);
        const contentMatch = material.content.toLowerCase().includes(lowerQuery);
        const tagsMatch = material.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        return titleMatch || contentMatch || tagsMatch;
      })
      .map((material: TypingMaterial) => ({
        id: material.id,
        type: material.id.startsWith('ai-') ? 'ai-generated' : 'preset',
        categoryId: material.categoryId,
        title: material.title,
        contentPreview: material.content.slice(0, 100) + (material.content.length > 100 ? '...' : ''),
        fullContent: material.content,
      }));
    
    set({ results });
  },
}));