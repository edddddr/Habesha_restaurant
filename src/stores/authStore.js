import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      signIn: ({ phone }) => set({ user: { phone, name: "Mesob Guest" } }),
      register: ({ fullName, email, phone }) => set({ user: { name: fullName, email, phone } }),
      signOut: () => set({ user: null }),
    }),
    { name: "mesob-house-auth" },
  ),
);
