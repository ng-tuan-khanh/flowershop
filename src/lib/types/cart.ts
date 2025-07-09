export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	color: string;
	colorHex: string;
	image: string;
}

export interface RecommendedProduct {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	discount?: number;
	image: string;
}
