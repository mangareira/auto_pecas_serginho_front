import { NewType } from '@/utils/interfaces/new-type';
import { create } from 'zustand';

export const useNewEmployee = create<NewType>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));