import api from "@/lib/api";
import { mutate } from "swr";
import { create } from "zustand";

type OrderStore = {
	createOrder: () => void;
	// updateOrderStatus: (orderId: number, status: string) => void;
};

export const useOrderStore = create<OrderStore>()(() => ({
	createOrder: async () => {
		await api.post("/orders/");
		mutate("/orders/");
	},
	// updateOrderStatus: async (orderId: number, status: string) => {
	// 	await api.patch(`/orders/${orderId}/`, { status });
	// 	mutate("/orders/");
	// },
}));
