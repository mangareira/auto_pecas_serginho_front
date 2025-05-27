import { NewAdminType } from '@/utils/interfaces/new-admin-type';
import { create } from 'zustand';

export const useNewAdmin = create<NewAdminType>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));