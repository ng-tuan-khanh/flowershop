import api from "@/lib/api";
import { CartItem } from "@/lib/types/cart";
import { Product } from "@/lib/types/product";
import { mutate } from "swr";
import { create } from "zustand";

type CartStore = {
	addItem: (product: Product, quantity: number) => void;
	removeItem: (item: CartItem) => void;
	updateQuantity: (item: CartItem, quantity: number) => void;
};

export const useCartStore = create<CartStore>()(() => ({
	addItem: async (product: Product, quantity: number) => {
		await api.post("/cart-items/", {
			product_id: product.id,
			quantity: quantity,
		});
		mutate("/cart-items/");
	},
	removeItem: async (item: CartItem) => {
		await api.delete(`/cart-items/${item.id}/`);
		mutate("/cart-items/");
	},
	updateQuantity: async (item: CartItem, change: number) => {
		await api.patch(`/cart-items/${item.id}/`, {
			quantity: item.quantity + change,
		});
		mutate("/cart-items/");
	},
}));
