import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image?: string;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleItem: (item: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const { items } = get();
                if (!items.find((i) => i.id === item.id)) {
                    set({ items: [...items, item] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            isInWishlist: (id) => {
                return get().items.some((i) => i.id === id);
            },

            toggleItem: (item) => {
                const { items, isInWishlist, addItem, removeItem } = get();
                if (isInWishlist(item.id)) {
                    removeItem(item.id);
                } else {
                    addItem(item);
                }
            },
        }),
        {
            name: "wishlist-storage",
        }
    )
);
