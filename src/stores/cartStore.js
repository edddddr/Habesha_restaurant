import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: {},
      addItem: (dishId) => set((state) => ({ items: { ...state.items, [dishId]: (state.items[dishId] || 0) + 1 } })),
      changeQuantity: (dishId, amount) => set((state) => {
        const quantity = Math.max(0, (state.items[dishId] || 0) + amount);
        const items = { ...state.items };
        if (quantity) items[dishId] = quantity; else delete items[dishId];
        return { items };
      }),
      clearCart: () => set({ items: {} }),
    }),
    { name: "mesob-house-cart" },
  ),
);
