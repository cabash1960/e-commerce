import { create } from "zustand";
import { CartItem } from "@/lib/types";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItems: (item: CartItem) => void;
  // addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearItems: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItems: (item) =>
        set((state) => {
          const existing = state.items.find((p) => p.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, item],
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          return { items: state.items.filter((i) => i.id !== id) };
        }),
      clearItems: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart" },
  ),
);
