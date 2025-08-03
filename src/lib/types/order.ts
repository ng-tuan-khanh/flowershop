import { CartItem } from "@/lib/types/cart";

export interface Order {
	id: number;
	user: number;
	total_price: number;
	status: string;
	created_at: string;
	cart_items: CartItem[];
}
