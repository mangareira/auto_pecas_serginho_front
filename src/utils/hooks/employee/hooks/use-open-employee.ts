import { OpenType } from '@/utils/interfaces/open-type';
import { create } from 'zustand';

export const useOpenEmployee = create<OpenType>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));