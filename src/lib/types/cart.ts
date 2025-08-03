import { Product } from "@/lib/types/product";

export interface CartItem {
	id: number;
	product: Product;
	quantity: number;
}
