import { createStore } from './createStore';
import { persist } from './middleware';

export interface CartItemModel {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  variant?: string;
}

export interface CartState {
  items: CartItemModel[];
  isOpen: boolean;
  addItem: (item: Omit<CartItemModel, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

export const cartStore = createStore<CartState>(
  persist<CartState>('cart')((set, get) => ({
    items: [],
    isOpen: false,
    addItem: (item) => {
      const items = get().items;
      const existing = items.find((i) => i.id === item.id);
      const qty = item.quantity || 1;
      if (existing) {
        set({
          items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)),
          isOpen: true,
        });
      } else {
        set({ items: [...items, { ...item, quantity: qty }], isOpen: true });
      }
    },
    removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        set({ items: get().items.filter((i) => i.id !== id) });
      } else {
        set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)) });
      }
    },
    clearCart: () => set({ items: [] }),
    setOpen: (open) => set({ isOpen: open }),
    getTotalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }))
);

export interface WishlistState {
  items: Array<{ id: string; title: string; price: number; image?: string }>;
  toggleItem: (item: { id: string; title: string; price: number; image?: string }) => void;
  hasItem: (id: string) => boolean;
}

export const wishlistStore = createStore<WishlistState>(
  persist<WishlistState>('wishlist')((set, get) => ({
    items: [],
    toggleItem: (item) => {
      const exists = get().items.some((i) => i.id === item.id);
      if (exists) {
        set({ items: get().items.filter((i) => i.id !== item.id) });
      } else {
        set({ items: [...get().items, item] });
      }
    },
    hasItem: (id) => get().items.some((i) => i.id === id),
  }))
);
