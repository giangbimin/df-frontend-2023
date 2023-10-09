'use client';

import { create } from 'zustand';

interface ToasterState {
  toaster:
    | {
        type: string;
        message: string;
        showAfterRedirect: boolean;
      }
    | undefined;
  success: (message: string, showAfterRedirect?: boolean) => void;
  error: (message: string, showAfterRedirect?: boolean) => void;
  clear: () => void;
}

const useToaster = create<ToasterState>((set) => ({
  toaster: undefined,
  success: (message, showAfterRedirect = false) => {
    const type = 'success';
    set({ toaster: { type, message, showAfterRedirect } });
  },
  error: (message, showAfterRedirect = false) => {
    const type = 'error';
    set({ toaster: { type, message, showAfterRedirect } });
  },
  clear: () => {
    set(() => ({
      toaster: undefined,
    }));
  },
}));

export function useToasterService() {
  const { toaster, success, error, clear } = useToaster();
  return {
    toaster,
    success,
    error,
    clear,
  };
}
