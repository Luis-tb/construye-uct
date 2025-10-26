import { create } from 'zustand';

/**
 * Interfaz que define el estado y las acciones de nuestro store para el modal de login.
 */
interface LoginModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

/**
 * Hook de Zustand para gestionar el estado global del modal de login.
 * Permite a cualquier componente abrir o cerrar el modal sin necesidad de pasar props.
 */
export const useLoginModalStore = create<LoginModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));