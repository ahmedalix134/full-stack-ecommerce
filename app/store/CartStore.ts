import { create } from "zustand";

type CartItem = {
  id: number | string;
  title: string;
  price: string;
  img?: string;
  category: string;
  size?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeFromCart: (id, size) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.size === size)
      ),
    })),
}));
