import { create } from "zustand";

interface useApplicationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useApplicationModal = create<useApplicationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))