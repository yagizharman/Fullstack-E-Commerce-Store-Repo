import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        if (existingItem) {
          return toast.error("Item already in cart.");
        }
        set({ items: [...get().items, item] });
        toast.success("Item added to cart.");
      },
      removeItem: (item) => {
        set({
          items: [...get().items.filter((i) => i.id !== item.id)],
        });
        toast.success("Item removed from cart.");
      },
      removeAll: () => {
        set({ items: [] });

      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
