import { OpenAdminType } from '@/utils/interfaces/open-admin-type';
import { create } from 'zustand';

export const useOpenAdmin = create<OpenAdminType>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));